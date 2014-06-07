// ==UserScript==
// @name           Dollars tripfag avatars
// @namespace      dollars
// @include        http://junkuchan.org/a/*
// @include        http://junkuchan.org/a/res/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

GM_addStyle(".trip_avatar{left:-75px; position:absolute; top:0; z-index:120; background-color:#000;}");

var tripcodes = new Object();

function add_avatar(data) {
    //GM_log(data);
    if (data.table.rows.length == 0) return;
    data.table.rows.forEach(function(row) {
        var tripcode = row.c[0].v;
        var avatar = row.c[1].v;
        if (tripcodes[tripcode] == '') {
            tripcodes[tripcode] = avatar;
            var classname = safe_code(tripcode);
            //GM_addStyle("." + tripcode + ":before {content:url('" + row.c[1].v + "') !important; background:#000; -moz-background-size:50px 50px;}");
            $('.' + classname).before('<img src="' + avatar + '" class="trip_avatar" width="50px" height="50px">');
        }
    });
}

function call_avatars(query) {
    var the_url = 'http://spreadsheets.google.com/a/google.com/tq?key=tRFYXX6Urf2aK6Co4Xm7G1A&tq=' + escape(query) + '&tqx=responseHandler:add_avatar';
    GM_log(the_url);

    GM_xmlhttpRequest({
        method: "GET",
        url: the_url,
        onload: function(response) {
            //GM_log(response.responseText);
            eval(response.responseText);
        }
    });
}

function safe_code(tripcode) {
    return tripcode.replace(/[^a-z0-9]/ig, '_');
}

(function(){

    $('.postertrip').each(function(){
        var tripcode = $(this).text();
        $(this).addClass(safe_code(tripcode));
        if (typeof(tripcodes[tripcode]) == 'undefined') {
            tripcodes[tripcode] = '';
        }
    });

    var queries = new Array();
    var counter = 0;
    var pointer = 0;

    for (tripcode in tripcodes) {
        if (counter == 0) queries[pointer] = 'select B, C where';
        counter += 1;
        queries[pointer] += ' B="' + tripcode + '" or';
        if (counter == 10) {
            queries[pointer] = queries[pointer].replace(/ or$/,'');
            queries[pointer] += ' order by A desc';
            pointer += 1;
            counter = 0;
        }
    }
    if (counter != 0) {
        queries[pointer] = queries[pointer].replace(/ or$/,'');
        queries[pointer] += ' order by A desc';
    }

    //GM_log(queries.join('\n'));
    queries.forEach(call_avatars);
})();
