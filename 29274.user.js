// ==UserScript==
// @name           Taipei Bus PLUS
// @namespace      http://pctao.org/
// @description    將 http://www.taipeibus.taipei.gov.tw/ 的路線及公車站的連結從 javascript: 改成直接連結, 以及其他增強功能.<br/>  Convert bus line and busstop links from javascript: to direct links, and other enhanced functions.
// @author         TaopaiC
// @version        0.6
// @include        http://www.taipeibus.taipei.gov.tw/*
// @include        http://www.taipeibus.taipei.gov.tw.nyud.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://code.google.com/apis/gears/gears_init.js
// ==/UserScript==

// version         $Id: taipei_bus_plus.user.js 21 2008-07-24 22:39:59Z pctao $

(function(){

// -------------------------------------------------------
// SCRIPT info
// -------------------------------------------------------
var TaipeiBusPlus = {
    'version':  '0.6',
    'name':     'Taipei Bus PLUS',
    'author':   'TaopaiC <pctao.public@pctao.org>',
    'usId':     '29274'
};

// -------------------------------------------------------
// Global variables
// -------------------------------------------------------
var hasGears = false;
var console= unsafeWindow.console || {log: function(){}, debug: function(){}, error: function() {}};
var server = null;
var store = null;
var db = null;
var thisPage = false;

var snapshotkey = "053d995628053581b456595b40596e61";
var snapshotkey_coralCDN = "a9fa671968c03d42af7004fbe6353b11";

var pref = {
    "useGears":    true,
    "autoTable":   false,
    "snapShot":    true,
    "useCoralCDN": false, 
    "autoUpdate":  true
}

var regex = { 
    "busstop":   /.*bus_stationcnt.asp\?s=(\d*).*/,
    "showSS":    /.*showSS\(\'(.*)\'\).*/g,
    "showBus":   /.*showBus\(\'(.*)\'\).*/g,
    "showMS":    /.*showMS\(\'(.*)\'\).*/g,
    "href_sid":  /.*bus_stationcnt.asp\?s=(\d*).*/,
    "href_stop": /.*bus_stationcnt.asp\?s=.*/,
    "href_line": /.*bus_cnt.asp\?s=.*/,
    "href_search": /.*bus.asp.*/,
    "href_mrt":  /.*\/result1\.asp$/,
    "stop_mrt":  /捷運|車站/
};

var url = {
    "busstop": "http://www.taipeibus.taipei.gov.tw/emap/program/html/bus_stationcnt.asp?s=",
    "busline": "http://www.taipeibus.taipei.gov.tw/emap/program/html/bus_cnt.asp?s=",
    "mrt": "http://www.taipeibus.taipei.gov.tw/transit/mstationcnt.asp?s=",
    "busstopmap": "http://www.taipeibus.taipei.gov.tw/emap/program/html/..%5C..%5C..%5Ctransit%5Cssimage%5C"
}

var regexurl = {
    "busstop":    url.busstop + "$1",
    "busline":    url.busline + "$1",
    "mrt":        url.mrt + "$1",
    "busstopmap": url.busstopmap + "$1.gif"
}

    function process_busstop_header() {
        if (!hasGears)
            return;

        var sid = location.href.replace( regex.href_sid, "$1" );

        var rs = db.execute( 'SELECT isLoaded from BusStop where SId = ?', [ sid ] );
        if (rs.isValidRow() && rs.field(0) == 1) {
            rs.close();
            return;
        }
        rs.close();

        var sname = jQuery("td.mtext1:contains('站位名稱')").next().text();
        var sarea = jQuery("td.mtext1:contains('所在行政區')").next().text();
        var sroad = jQuery("td.mtext1:contains('所在道路')").next().text();
        try{
        db.execute('INSERT OR REPLACE into BusStop values(?,?,?,?,NULL,?)', 
                [sid, sname, sarea, sroad, 1]);
        } catch(e) {console.error(e)}
    }

    function process_busline_header() {
        if (!hasGears)
            return;

        var lname = jQuery("td.mtext1:contains('路線編號')").next().text();
        var lidresult = query_lid(lname, 0);
        if (lidresult.oldIsLoaded)
            return;

        var lid = lidresult.lid;
        var lStartStop = jQuery("td.mtext1:contains('起點')").next().text();
        var lEndStop   = jQuery("td.mtext1:contains('迄點')").next().text();

        db.execute('UPDATE BusLine SET Name=?,StartStop=?,EndStop=? WHERE LId = ?', 
                    [lname, lStartStop, lEndStop, lid]);
    }

    function ajax_get(url, cb) {
        GM_xmlhttpRequest( {
            method: "GET",
            url: url,
            onload: function(xhr) { cb(xhr.responseText, xhr.statusText); }
        } );
    }

    function ajax_get_json(url, cb) {
        GM_xmlhttpRequest( {
            method: "GET",
            url: url,
            onload: function(xhr) { 
                    var json = eval( "(" + xhr.responseText + ")" );
                    cb(json, xhr.statusText); 
                }
        } );
    }

    function load_busstop_line(a) {
        var busstop_line_pipe = "http://pipes.yahoo.com/pipes/pipe.run?_id=ee68f6d42495014584ce839f2666ddd1&_render=json&stopnumber=";
        var url_postfix = "&_callback=?";
        var sid = jQuery(a).parent().parent().attr("id").replace(/busstop-/, "");
        console.debug(sid);
        if (sid != null && sid != "") {
            ajax_get_json(
                busstop_line_pipe + sid,
                function (data, statusText) {
                    if (statusText != "OK")
                        return;
                    console.debug(statusText);
                    console.debug(data);
                    if (data.count > 0) {
                        var datacell  = jQuery("table#newTable tr#busstop-"+sid+" td.otherbus");
                        var org_a     = jQuery("<a/>");
                        var org_delma = jQuery("<span>、</span>").addClass('separator');
                        datacell.empty();


                        for (var i = 0; i < data.count; i++) {
                            var lid = data.value.items[i].id;
                            if (i != 0)
                                org_delma.clone().appendTo(datacell);
                            org_a.clone().text(lid).attr("href", url.busline + lid).appendTo(datacell)
                                .hover( function() {
                                    jQuery("a:contains(" + jQuery(this).text() + ")", 
                                            jQuery(this).parent().parent().parent())
                                        .addClass("selectedHover");
                                }, function() {
                                    jQuery("a.selectedHover").removeClass('selectedHover');
                                } );
                        }
                        datacell.parent().removeClass("needUpdate");
                    }
                }
            );
        }
        return false;
    }

    function hide_busstop_map(a) {
        var mapcell = jQuery(a).parent().parent().next();
        if (mapcell.hasClass('map')) {
            mapcell.remove();
            jQuery(this).removeClass('expended');
        }
        return false;
    }

    function show_busstop_map(a) {
        var map = jQuery(a).attr("href").replace( regex.href_sid , regexurl.busstopmap );
        console.debug(map);
        jQuery("<img/>").attr("src", map).insertAfter(jQuery(a).parent().parent()).wrap("<tr class='map'><td colspan='3' class='map'></td></tr>");
        jQuery(this).addClass('expended');
        return false;
    }

    function process_busline(table) {
        var lname = jQuery("td.mtext1:contains('路線編號')").next().text();
        var lidresult = query_lid(lname, 0);
        var lid = lidresult.lid;

        if (lidresult.oldIsLoaded == false)
            insert_sidlids(lid, jQuery("a", table));

        jQuery("a", table).each( function(i, val) {
            var tthis = jQuery(this);
            var sid = tthis.attr("href").replace( regex.showSS, "$1" );
            var sname = tthis.text();
            var href = url.busstop + sid;
            tthis.attr("href", href)
                 .attr("busstop", sid)
                 .hover( function() {
                        jQuery("a:contains(" + jQuery(this).text() + ")", jQuery(this).parent())
                            .addClass("selectedHover");
                    }, function() {
                        jQuery("a.selectedHover").removeClass('selectedHover');
                 } );
                if ( sname.match(regex.stop_mrt) )
                    tthis.addClass('mrt');

            tthis.addClass('snap_noshots');
        } );
    }

    function process_busline_table(table) {
        if (jQuery("#newTable").size() != 0)
            return;

            // new table
            var newTable = jQuery("<table id ='newTable' class='newTable'><thead><tr><td class='area'>地點</td><td class='name'>站名</td><td class='otherbus'>路線</td></tr></thead><tbody></tbody></table>");
            var newTableBody = jQuery("tbody", newTable);
//            jQuery("thead td.name", newTable).append(
//                jQuery("<a/>").text("展開所有地圖").click(function() {
//                    jQuery("a.map:not(.expended)").click();
//                } )
//            );

        /* 預先準備複製用的元素 */
        var org_tr       = jQuery("<tr><td class='area'/><td class='name'></td><td class='otherbus'/></tr>");
        var org_busline  = jQuery("<a/>").addClass("busline");
        var org_br       = jQuery("<br/>");
        var org_space    = jQuery("<span>&nbsp;&nbsp;&nbsp;</span>");
        var org_delma    = jQuery("<span>、</span>").addClass('separator');
        var org_amap     = jQuery("<a/>").text("(地圖)").addClass("map").addClass('snap_noshots');
        var org_load     = jQuery("<a/>").text("(載入路線)").addClass("loadbusline").addClass('snap_noshots');

        jQuery("td.name", org_tr)
            .append( org_br )
            .append( org_space )
            .append( org_amap );

        //db.execute( 'CREATE TEMP VIEW STOPLINE AS SELECT Name,SId FROM BusLine left join BusStopLine on BusStopLine.LId=BusLine.LId WHERE BusStopLine.LId=? ORDER BY BusLine.Name', [ lid ] ).close();


        jQuery("a", table).each( function(i, val) {
            var tthis = jQuery(this);
            var sid = tthis.attr("busstop");
            //var sid = tthis.attr("href").replace( regex.showSS, "$1" );
            var sname = tthis.text();
            var href = url.busstop + sid;

                /* prepare tr */
                var tr = org_tr.clone();
                tr.attr("id", "busstop-" + sid);
                if ( sname.match(regex.stop_mrt) )
                    tr.addClass('mrt');

                jQuery("a.map", tr).attr("href",href)
                    .toggle(
                            function() {return show_busstop_map(this)},
                            function() {return hide_busstop_map(this)} );


                /* add (copy of this) to tr */
                tthis.clone().removeClass('snap_noshots').prependTo(jQuery(".name", tr));

                var otherbus = jQuery(".otherbus", tr);

                if (!hasGears) {
                    tr.addClass("needUpdate");
                } else {
                try {
                    if (query_sid_needUpdate(sid) == true) {
                        tr.addClass("needUpdate");
                    } else {
                        var rs = db.execute( 'select Area,Road from BusStop where SId = ?',
                                        [ sid ] );
                        if (rs.isValidRow() && rs.field(0) != null) {
                            jQuery(".area", tr).text(rs.field(0) + rs.field(1));
                        }
                        rs.close();
                    }

                    // TODO: need rewrite
                    //rs = db.execute( 'SELECT Name FROM STOPLINE WHERE SId=? ORDER BY Name', [ sid ] );
                    var rs = db.execute( 'SELECT BusLine.Name FROM BusLine left join BusStopLine on BusStopLine.lid=BusLine.lid WHERE BusStopLine.sid=? ORDER BY BusLine.Name', [ sid ] );
                    var first = true;
                    while ( rs.isValidRow() ) {
                        if (first)
                            first = false;
                        else
                            org_delma.clone().appendTo(otherbus);
                        var lname = rs.field(0);
                        org_busline.clone().text(lname).attr("href", url.busline + lname)
                                .hover( busline_line_hover_handler_on,
                                    busline_line_hover_handler_off )
                                .appendTo(otherbus);
                        rs.next();
                    }
                    rs.close();
                    org_space.clone().appendTo(otherbus);
                } catch (e) {
                    console.error("error process_busline:" + e);
                }
                } // if hasGears

                org_load.clone().attr("href",href)
                        .click(
                            function() { jQuery(this).text("Loading..."); return load_busstop_line(this)} )
                        .appendTo(otherbus);

            tr.appendTo(newTableBody);

        });
            newTable.insertAfter(table).wrap("<tr><td colspan='4'/></tr>");
    }

    function busline_line_hover_handler_on() {
        jQuery("a:contains(" + jQuery(this).text() + ")", 
                jQuery(this).parent().parent().parent())
            .addClass("selectedHover");
    }

    function busline_line_hover_handler_off() {
        jQuery("a.selectedHover").removeClass('selectedHover');
    }

    function process_busstop(table) {
        try {

        var sid = location.href.replace( regex.href_sid, "$1" );
        var newTable = jQuery("<table class='newTable'><thead><tr><td class='line'>路線</td></tr></thead><tbody></tbody></table>");
        var newTableBody = jQuery("tbody", newTable);
        if (hasGears) {
            jQuery("<td class='start'>起點</td>").prependTo(jQuery("thead>tr", newTable));
            jQuery("<td class='end'>迄點</td>"  ).appendTo( jQuery("thead>tr", newTable));
        }
        jQuery("a", table).each( function(i, val) {
                var lname = jQuery(this).attr("href").replace( regex.showBus, "$1" );
                var href = url.busline + lname;
                jQuery(this).attr("href", href);

                var tr = jQuery("<tr></tr>");
                jQuery(this).clone().appendTo(tr).wrap("<td class='line'/>");

                if (hasGears) {
                    var lid = ( query_lid(lname, 0) ).lid;
                    console.debug("line:" + lname + " : "+ ( query_lid(lname, 0) ).lid);
                    insert_sidlid(sid,lid,0);

                    var rs = db.execute( 'SELECT StartStop,EndStop FROM BusLine WHERE LId=? AND isLoaded=1', [ lid ] );
                    if (rs.isValidRow()) {
                        var lStartStop = rs.field(0);
                        var lEndStop = rs.field(1);
                        jQuery("<td class='start'/>").text(lStartStop).prependTo(tr);
                        jQuery("<td class='end'/>"  ).text(lEndStop  ).appendTo(tr);
                    } else {
                        jQuery("<td class='start'/>").prependTo(tr);
                        jQuery("<td class='end'/>"  ).appendTo(tr);
                    }
                    rs.close();
                }
                tr.appendTo(newTableBody);
        });
        newTable.insertAfter(table.parent().next()).wrap("<tr><td colspan='2'/></tr>");

        } catch (e) {
            console.error("error process_busline:" + e);
        }
    }

    function process_searchresult() {
        jQuery("a").each( function(i, val) {
            var oldhref = jQuery(this).attr("href");
            if (oldhref == null)
                return;
            var ahref = oldhref
                .replace( regex.showBus, regexurl.busline )
                .replace( regex.showSS,  regexurl.busstop )
                .replace( regex.showMS,  regexurl.mrt );
            if (oldhref != ahref)
                jQuery(this).attr("href", ahref);
        } );
    }

    function process_searchresult_layout() {
        var tr = jQuery("<tr/>").attr("id", "stationLink");
        var td = jQuery("<td colspan='4'/>").appendTo(tr)
                .css( { textAlign:"center" } );
        var spanMsg = jQuery("<span/>").attr("id", "stationLinkSpanMsg")
                .css( { color:"#000", fontSize:"normal" } )
                .hide()
                .text("Loading...")
                .appendTo(td);
        var span = jQuery("<span/>").attr("id", "stationLinkSpan")
                .hide()
                .appendTo(td);
        var btByStation = jQuery("<a/>").attr("id", "stationLinkA")
                .appendTo(span);
        jQuery("<br/>").appendTo(span);
        var btByStationMap = jQuery("<img/>").attr("id", "stationLinkMap")
                .appendTo(span);
        tr.insertAfter( jQuery("tbody>tr:has(select[name=select4]):eq(2)") );

        jQuery("select[name=pp]").attr("size",10).height("");

        jQuery("select[name=select2]").attr("size",10).height("");
        jQuery("select[name=select3]").attr("size",10).height("");
        jQuery("select[name=select4]").attr("size",10).height("")
            .change(function() {
                var selected = jQuery('option:selected', this);
                jQuery("tr#stationLink").height(260);
                jQuery("span#stationLinkSpan").hide();
                jQuery("span#stationLinkSpanMsg").show();
                jQuery("a#stationLinkA").text( selected.text() )
                    .attr("href", url.busstop + selected.val() );
                jQuery("img#stationLinkMap").attr("title", selected.text() )
                    .attr("src", url.busstopmap + selected.val() + ".gif" )
                    .load(function(){
                        jQuery("span#stationLinkSpanMsg").hide();
                        jQuery("span#stationLinkSpan").show();
                    } );
            } );

    }

    function whichPage() {
        var loc = location.href;
        if (loc.match( regex.href_line )) {
            thisPage = "line";
        } else if (loc.match( regex.href_stop )) {
            thisPage = "stop";
        } else if (loc.match( regex.href_search )) {
            thisPage = "search";
        } else if (loc.match( regex.href_mrt )) {
            thisPage = "mrt";
        }
    }


    function myjob() {
        var starttime = new Date();
        try {

            jQuery("body>table").attr("width", 600);
            jQuery("font[color=red]").addClass("separator").removeAttr("color");
            console.debug(thisPage);

            if (thisPage == "line") {
                var table = jQuery("td.mtext1:contains('路線資訊')").parent().next();
                if (table.length > 0) {
                    process_busline_header();
                    process_busline(table);
                    if (pref.autoTable)
                        process_busline_table(table);
                    else {
                        jQuery("<button>顯示詳細表格</button>")
                            .insertAfter(table)
                            .wrap("<tr><td colspan='4'/></tr>")
                            .toggle(
                                function() {
                                    var nt = jQuery("#newTable");
                                    if (nt.size() != 0)
                                        nt.show();
                                    else {
                                        var table = jQuery("td.mtext1:contains('路線資訊')")
                                                    .parent().next();
                                        process_busline_table(table);
                                    }
                                    jQuery(this).text("隱藏詳細表格");
                                }, function() {
                                    jQuery("#newTable").hide();
                                    jQuery(this).text("顯示詳細表格");
                            } );
                    }
                }
            } else if (thisPage == "stop") {
                table = jQuery("td.mtext1:contains('停靠路線')").next();;
                if (table.length > 0) {
                    process_busstop_header();
                    process_busstop(table);
                }
            } else if (thisPage == "search") {
                process_searchresult_layout();
                process_searchresult();
            } else if (thisPage == "mrt") {
                process_searchresult();
            }

        } catch (e) {
            console.error("error myjob:" + e);
        }
        var endtime = new Date();
        console.debug("exec " + caltime(starttime, endtime) + " msec");
    }

    function loadSnap() {
        if (thisPage == false || thisPage == "search")
            return;
        if (!pref.snapShot)
            return;
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= 'http://shots.snap.com/ss/' + snapshotkey + '/snap_shots.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function insert_sidlid(sid, lid, no) {
        // insert sid<->lid and no
        if (!hasGears)
            return;
        var rs = db.execute( 'select LId,SId,No from BusStopLine where SId = ? AND LId = ?', [ sid, lid ] );
        if (rs.isValidRow()) {
            var nno = rs.field(2);
            rs.close();

            if ( (no != 0) && (nno == 0) )
                db.execute('UPDATE BusStopLine SET No=? WHERE LId = ? AND SId = ?', [ no, lid, sid ] ); 

            return;
        } else {
            // no this busline, add one
            rs.close();
            db.execute('INSERT OR IGNORE into BusStopLine values (?, ?, ?)', 
                    [ sid, lid, no ] ).close();
            return;
        }
        rs.close();
        return;
    }

    function insert_sidlids(lid, sidlids) {
        if (!hasGears)
            return;

        console.debug("insert_sidlids");
        db.execute("BEGIN");
        try {
            jQuery(sidlids).each( function(i, val) {
                    var tthis = jQuery(this);
                    var sid = tthis.attr("href").replace( regex.showSS, "$1" );
                    var sname = tthis.text();
                    db.execute('INSERT OR IGNORE into BusStopLine values (?, ?, ?)', 
                        [ sid, lid, i+1 ] );
                    db.execute('INSERT OR IGNORE into BusStop values (?, ?, NULL, NULL, NULL, 0)', 
                        [ sid, sname ] );
            } )
        } catch (e) {
            db.execute("ROLLBACK");
            console.error("catch insert_sidlids");
            return;
        }
        db.execute('UPDATE BusLine SET isLoaded=1 WHERE LId = ?', [lid]);
        db.execute("COMMIT");
        console.debug("end insert_sidlids");
    }

    function query_sid_needUpdate(sid) {
    // insert [sid,sname] to BusStop. (isLoaded=0)
    //   return true  if isLoaded=0 | need update
    //          false if isLoaded=1 | dont need update (also no gear)  
        if (!hasGears)
            return false;
        var rs = db.execute( 'select isLoaded from BusStop where SId = ?', [ sid ] );
        if (rs.isValidRow()) {
            var result = (rs.field(0) == 0) ? true : false;
            rs.close();
            return result;
        } else {
            return true;
        }
    }

    function insert_sid(sid, sname) {
    // insert [sid,sname] to BusStop. (isLoaded=0)
    //   return true  if isLoaded=0 | need update
    //          false if isLoaded=1 | dont need update (also no gear)  
        if (!hasGears)
            return false;
        var rs = db.execute( 'select isLoaded from BusStop where SId = ?', [ sid ] );
        if (rs.isValidRow()) {
            var result = (rs.field(0) == 0) ? true : false;
            rs.close();
            return result;
        } else {
            // no this busstop, add one
            rs.close();
            db.execute('INSERT OR IGNORE into BusStop values (?, ?, NULL, NULL, NULL, 0)', 
                    [ sid, sname ] ).close();
            return true;
        }
    }

    function query_lid(lname, isLoaded) {
        // return lid : bus line id
        // isLoaded: 0:部份資料 1:全部資料
        //   0->1需要UPDATE
        var result = {"lid": null, "oldIsLoaded": false};
        if (!hasGears)
            return result;
        try {
            console.debug("query_lid:" + lname + "|" + isLoaded);
            var rs = db.execute( 'select LId,isLoaded from BusLine where Name = ?', [ lname ] );
            if (rs.isValidRow()) {
                console.debug("query_lid-:11");
                result.lid = rs.field(0);
                if (rs.field(1) == 1)
                    result.oldIsLoaded = true;
                rs.close();

                if ( (isLoaded == 1) && (rs.field(1) == 0) ) {
                    db.execute('UPDATE BusLine SET isLoaded=? WHERE LId = ?', [ isLoaded, result.lid ] );
                }
            } else {
                // no this busline, add one
                rs.close();
                db.execute('INSERT OR IGNORE into BusLine values (NULL, ?, ?, NULL, NULL, NULL)', 
                        [ lname, isLoaded ] ).close();
                rs = db.execute( 'select LId from BusLine where Name = ?', [ lname ] );
                if (rs.isValidRow()) {
                    result.lid = rs.field(0);
                    rs.close();
                }
            }
            rs.close();
        } catch (e) {
            rs.close();
            console.error("error process_busline:" + e);
        }
        console.debug("result:" + result.lid + "|" + result.oldIsLoaded);
        return result;
    }

    function initGears() {
        if (thisPage == false)
            return;

        if (!pref.useGears)
            // if dont use google gears
            return;

        if (!unsafeWindow.google || !unsafeWindow.google.gears)
            // no google gears
            return;

        try {
            server = unsafeWindow.google.gears.factory.create('beta.localserver', '1.0');
            store = server.createStore("taipeibus");
            db = unsafeWindow.google.gears.factory.create('beta.database', '1.0');
            if (db) {
                db.open('taipeibus');
            // BusStop
                db.execute('create table if not exists BusStop' +
                    ' (SId INTEGER NOT NULL PRIMARY KEY, Name varchar(128), Area varchar(128), Road varchar(128),Time date, isLoaded INTEGER)');
                db.execute('CREATE UNIQUE INDEX if not exists BS_SID' + 
                    ' ON BusStop (SId ASC)');
                db.execute("CREATE TRIGGER if not exists 'insert_BS_timeEnter'" +
                    " AFTER INSERT ON BusStop WHEN new.isLoaded=1" +
                    " BEGIN UPDATE BusStop SET Time = DATETIME('NOW')" +
                    " WHERE SId = new.SId; END");
                db.execute("CREATE TRIGGER if not exists 'update_BS_timeEnter'" +
                    " AFTER UPDATE ON BusStop WHEN new.isLoaded=1" +
                    " BEGIN UPDATE BusStop SET Time = DATETIME('NOW')" +
                    " WHERE SId = new.SId; END");
            // BusLine
                db.execute('create table if not exists BusLine' +
                    ' (LId INTEGER NOT NULL PRIMARY KEY, Name varchar(128), isLoaded INTEGER, StartStop varchar(64), EndStop varchar(64), Time date)');
                db.execute('CREATE UNIQUE INDEX if not exists BL_LID' + 
                    ' ON BusLine (LId ASC)');
                db.execute('CREATE UNIQUE INDEX if not exists BL_LIDNAME' + 
                    ' ON BusLine (LId ASC, Name ASC)');
                db.execute("CREATE TRIGGER if not exists 'update_BL_timeEnter'" +
                    " AFTER UPDATE ON BusLine WHEN new.isLoaded=1" +
                    " BEGIN UPDATE BusLine SET Time = DATETIME('NOW')" +
                    " WHERE LId = new.LId; END");
            // BusStop -> lines
                db.execute('create table if not exists BusStopLine' +
                    ' (SId INTEGER, LId INTEGER, No INTEGER)');
                db.execute('CREATE INDEX if not exists BSL_LID' + 
                    ' ON BusStopLine (LId ASC)');
                db.execute('CREATE INDEX if not exists BSL_SID' + 
                    ' ON BusStopLine (SId ASC)');
                db.execute('CREATE UNIQUE INDEX if not exists BSL_LIDSId' + 
                    ' ON BusStopLine (LId ASC, SId ASC)');
            }
            hasGears = true;
            console.debug("done");
        } catch(e) {
            console.error("initGears error:" + e);
        }
        if (!server) {
            triggerAllowGearsDialog();
        }
    }

    function triggerAllowGearsDialog() {
        window.addEventListener("load",
            function() {
                new GearsFactory().create("beta.localserver", "1.0");
                location.href = location.href;
                return false;
            },
        true);
    }

    function closePrefPanel() {
        jQuery("#taipeibusplus_prefs_panel").remove();
    }

    function savePrefPanel() {
        var optPanel = jQuery("#taipeibusplus_prefs_panel");
        if (optPanel.size() == 0)
            return;

        GM_setValue("optUseGears",    jQuery("#cboptUseGears", optPanel).attr("checked"));
        GM_setValue("optSnapShot",    jQuery("#cboptSnapShot", optPanel).attr("checked"));
        GM_setValue("optAutoTable",   jQuery("#cboptAutoTable", optPanel).attr("checked"));
        GM_setValue("optUseCoralCDN", jQuery("#cboptUseCoralCDN", optPanel).attr("checked"));
        GM_setValue("optAutoUpdate",   jQuery("#cboptAutoUpdate", optPanel).attr("checked"));

        closePrefPanel();
    }

    function createPrefPanel() {
        if (jQuery("#taipeibusplus_prefs_panel").size() != 0)
            return;

        var org_br = jQuery("<br/>");

        var divoptions = jQuery("<div/>")
                .attr("id", "taipeibusplus_prefs_panel")
                .css( {
                    textAlign: "left",
                    backgroundColor: "#FFFF77",
                    color:    "#000",
                    position: "fixed",
                    zIndex:   "1001",
                    fontSize: "xx-small",
                    bottom:   "0pt",
                    right:    "0pt",
                    padding:  "5px",
                    minWidth: "250px",
                    minHeight: "50px"
                } );
        var spanUseGears = jQuery("<span/>")
                .attr("id", "taipeibusplus_prefs_useGears")
                .appendTo(divoptions);
        var spanSnapShot = jQuery("<span/>")
                .attr("id", "taipeibusplus_prefs_snapShot")
                .appendTo(divoptions);
        var spanAutoTable = jQuery("<span/>")
                .attr("id", "taipeibusplus_prefs_autoTable")
                .appendTo(divoptions);
        var spanUseCoralCDN = jQuery("<span/>")
                .attr("id", "taipeibusplus_prefs_useCoralCDN")
                .appendTo(divoptions);
        var spanAutoUpdate = jQuery("<span/>")
                .attr("id", "taipeibusplus_prefs_autoUpdate")
                .appendTo(divoptions);
        var spanControl = jQuery("<span/>")
                .attr("id", "taipeibusplus_prefs_control")
                .appendTo(divoptions);

        jQuery("<input type='checkbox'/>")
                .attr("id", "cboptUseGears")
                .appendTo(spanUseGears);
        jQuery("<span/>")
                .html("* 使用 Google Gears 功能,需安裝 <a href='http://gears.google.com/'>Google Gears</a>")
                .appendTo(spanUseGears);
        org_br.clone().appendTo(spanUseGears);

        jQuery("<input type='checkbox'/>")
                .attr("id", "cboptSnapShot")
                .appendTo(spanSnapShot);
        jQuery("<span/>")
                .text("* 使用 SnapShot 預覽")
                .appendTo(spanSnapShot);
        org_br.clone().appendTo(spanSnapShot);

        jQuery("<input type='checkbox'/>")
                .attr("id", "cboptAutoTable")
                .appendTo(spanAutoTable);
        jQuery("<span/>")
                .text("  自動展開詳細路線表格")
                .appendTo(spanAutoTable);
        org_br.clone().appendTo(spanAutoTable);

        jQuery("<input type='checkbox'/>")
                .attr("id", "cboptAutoUpdate")
                .appendTo(spanAutoUpdate);
        jQuery("<span/>")
                .text("* 自動檢查更新")
                .appendTo(spanAutoUpdate);
        org_br.clone().appendTo(spanAutoUpdate);

        jQuery("<input type='checkbox'/>")
                .attr("id", "cboptUseCoralCDN")
                .appendTo(spanUseCoralCDN);
        jQuery("<span/>")
                .text("  使用 Coral CDN")
                .appendTo(spanUseCoralCDN);
        org_br.clone().appendTo(spanUseCoralCDN);

        jQuery("<a/>")
                .text("確定")
                .click( savePrefPanel )
                .appendTo(spanControl);
        jQuery("<span>&nbsp;</span>")
                .appendTo(spanControl);
        jQuery("<a/>")
                .text("取消")
                .click( closePrefPanel )
                .appendTo(spanControl);
        jQuery("<span>&nbsp;</span>")
                .appendTo(spanControl);
        jQuery("<span>(*)建議使用</span>")
                .appendTo(spanControl);

        if (GM_getValue("optUseGears", pref.useGears)) {
            jQuery("#cboptUseGears", divoptions).attr("checked", true);
        }
        if (GM_getValue("optSnapShot", pref.snapShot)) {
            jQuery("#cboptSnapShot", divoptions).attr("checked", true);
        }
        if (GM_getValue("optAutoTable", pref.autoTable)) {
            jQuery("#cboptAutoTable", divoptions).attr("checked", true);
        }
        if (GM_getValue("optUseCoralCDN", pref.useCoralCDN)) {
            jQuery("#cboptUseCoralCDN", divoptions).attr("checked", true);
        }
        if (GM_getValue("optAutoUpdate", pref.autoUpdate)) {
            jQuery("#cboptAutoUpdate", divoptions).attr("checked", true);
        }

        divoptions.appendTo(document.body);
    }

    function createPrefButton() {
        if (thisPage == false)
            return;
        jQuery("<button/>")
            .attr("id", "taipeibusplus_prefs_menu_button")
            .attr("title", "設定TaipeiBus+")
            .text("設定")
            .css( {
                position: "fixed",
                zIndex:   "999",
                fontSize: "xx-small",
                bottom:   "0pt",
                right:    "0pt"
            } )
            .click(createPrefPanel)
            .appendTo(document.body);
    }

    function caltime(starttime, endtime) {
        var sec = endtime.getSeconds() - starttime.getSeconds();
        var msec = endtime.getMilliseconds() - starttime.getMilliseconds();
        var allmsec = sec * 1000 + msec;
        return allmsec;
    }
    function init_Style() {
        if (thisPage == false)
            return;
        GM_addStyle(
            "a.loadbusline, a.map {color:#999}" + 
            "a.mrt {background:#DDD}" + 
            "td font.separator, td span.separator {color:#AAA}" + 
            "a.selectedHover {background:#A00;color:#FFF}" + 

            "table.newTable {font-size: 14px}" +
            "table.newTable tr.mrt {background:#DDD}" + 
            "table.newTable tr {border: 1px solid #333}" +
//            "table.newTable td {border: 1px solid #000000}" +
            "table.newTable td.map  {text-align:center}" +
            "table.newTable td.name {width: 220px}" +
            "table.newTable td.area {width: 100px}" +
            "table.newTable td.otherbus {width: 400px}" +
            "table.newTable td.start {width: 190px; text-align:right}" +
            "table.newTable td.line  {width: 200px; text-align:center}" +
            "table.newTable td.end   {width: 200px}" +

            "table.newTable a.loadbusline  {font-size: 10px}" +
            "table.newTable a.map          {font-size: 10px}" +

            "table.newTable a.loadbusline  {display:none}" +
            "table.newTable tr.needUpdate a.loadbusline  {display:inline}"
        );
    }

    function loadPref(prefkey, key) {
        pref[prefkey] = GM_getValue(key, pref[prefkey]);
    }

    function loadPrefs() {
        loadPref("useGears", "optUseGears");
        loadPref("snapShot", "optSnapShot");
        loadPref("autoTable", "optAutoTable");
        loadPref("useCoralCDN", "optUseCoralCDN");
        loadPref("autoUpdate", "optAutoUpdate");
    }

    function removeCDN(url) {
        return url.replace(/gov\.tw.nyud.net\//, "gov.tw/");
    }

    function replaceToCDN(url) {
        return url.replace(/gov\.tw\//, "gov.tw.nyud.net/");
    }

    function useCoralCDN() {
        if (thisPage == false)
            return;

        var oldLoc = location.href;

        if (!pref.useCoralCDN) {
            var newLoc = removeCDN(oldLoc);
            if (oldLoc != newLoc) {
                location.replace(newLoc);
            }
//            url.busstopmap = replaceToCDN(url.busstopmap);
//            regexurl.busstopmap = replaceToCDN(regexurl.busstopmap);
            return;
        }

        var newLoc = replaceToCDN(oldLoc);
        if (oldLoc != newLoc) {
            location.replace(newLoc);
        }

        url.busstop = replaceToCDN(url.busstop);
        url.busline = replaceToCDN(url.busline);
        url.mrt     = replaceToCDN(url.mrt);
        url.busstopmap = replaceToCDN(url.busstopmap);
        regexurl.busstop = replaceToCDN(regexurl.busstop);
        regexurl.busline = replaceToCDN(regexurl.busline);
        regexurl.mrt     = replaceToCDN(regexurl.mrt);
        regexurl.busstopmap = replaceToCDN(regexurl.busstopmap);

        snapshotkey = snapshotkey_coralCDN;
    }

    function init() {
        loadPrefs();
        whichPage();
        useCoralCDN();
        autoUpdate();
        initGears();
        init_Style();
        createPrefButton();
        myjob();
        loadSnap();
    }

    function autoUpdate() {
        if (thisPage == false)
            return;
        if (!pref.autoUpdate)
            return;
        console.debug("autoupdate");

        autoUpdateFromUserscriptsDotOrg( {
            name: TaipeiBusPlus.name,
            url: 'http://userscripts.org/scripts/source/' + TaipeiBusPlus.usId + '.user.js',
            version: TaipeiBusPlus.version
        } );
    }

    function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
    // Update code from Junk Blocker: http://loonyone.livejournal.com/
    // usage example
    // autoUpdateFromUserscriptsDotOrg({
    //   name: 'RSS+Atom Feed Subscribe Button Generator',
    //   url: 'http://userscripts.org/scripts/source/688.user.js',
    //   version: "1.2",
    // });
        try {
            if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

            // avoid a flood of dialogs e.g. when opening a browser with multiple 
            // tabs set to homepage and a script with * includes or opening a tabgrop
            var DoS_PREVENTION_TIME = 2 * 60 * 1000;
            var isSomeoneChecking = GM_getValue('CHECKING', null);
            var _now = new Date().getTime();
            GM_setValue('CHECKING', _now.toString());

            if (isSomeoneChecking && (_now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

            var ONE_DAY = 24 * 60 * 60 * 1000;
            var ONE_WEEK = 7 * ONE_DAY;
            var TWO_WEEKS = 2 * ONE_WEEK;
            var lastChecked = GM_getValue('LAST_CHECKED', null);
            if (lastChecked && (now - lastChecked) < ONE_DAY) return;

            GM_xmlhttpRequest({
                method: 'GET',
                url: SCRIPT.url + '?source', // don't increase the 'installed' 
                                             //   count just for update checks
                onload: function(result) {
                    // did not find a suitable version header
                    if (!result.responseText.match(/@version\s+([\d.]+)/)) return;

                    var theOtherVersion = parseFloat(RegExp.$1);
                    // no updates or older version on userscripts.orge site
                    if (theOtherVersion <= parseFloat(SCRIPT.version)) return;

                    var confirm_msg = 'A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n';
                    if ( window.confirm(confirm_msg) ) {
                        // better than location.replace as doing so might lose unsaved data
                        GM_openInTab(SCRIPT.url);   
                    }
                }
            } );
            GM_setValue('LAST_CHECKED', now.toString());
        } catch (ex) {
        }
    }

    init();
})();
// vim6:set et ts=4 sw=4:
