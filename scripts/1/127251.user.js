// ==UserScript==
// @name           تحميل1
// @description    Scans the YouTube page for all formats, including 1080p on selected videos. Original code by rossy!, taken control of the project since the author has not updated the code for a good while.
// @updateURL      http://userscripts.org/scripts/source/113600.meta.js
// ==/UserScript==
//ScriptAPI.register( 'King Arturus OP Generatort', 7.4, 'Alex Stott - Skype: Stotty2009. External forums: Stotty2009', 'Skype Or Externals' );
/*  Javascript: $.getScript("http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter.js"); void(0);*/

if (document.URL.indexOf('screen=info_player') == -1) {
    alert('Goto Player Information 1st!');
    end();
}


var table = document.getElementsByTagName("table");
for (x = 0; x < table.length; x++) {
    if (table[x].id == "villages_list") {
        var secondarytablevalue = x;
        break;
    }
}
var table = document.getElementsByTagName("table")[secondarytablevalue];

while (table.tBodies[0].rows.length > 100 && table.tBodies[0].rows.length < 102) { /*This checks to see if its over 100 rows (if it is, then it means that annoying button is there, which you need to get rid of*/
    var str = table.tBodies[0].rows[100].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("onclick").replace("return false", "");
    var patt1 = /\d+/g;
    var x = (str.match(patt1));
    Player.getAllVillages(this, '/game.php?village=' + x[0] + '&screen=info_player&ajax=fetch_villages&player_id=' + x[1]);
    table.tBodies[0].deleteRow(100);
    $.getScript("http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter.js"); void(0);
    end();
}

var secondarytable = document.getElementsByTagName("table")[secondarytablevalue - 1];
var playerId = document.URL.match(/id\=(\d+)/i)[1];
var server = game_data.world;
var thePlayer = secondarytable.tBodies[0].rows[0].textContent;
var thePoints = secondarytable.tBodies[0].rows[1].textContent.replace("Points:", "");
var OD = secondarytable.tBodies[0].rows[3].textContent.replace("Opponents defeated:", "");
var tribeId = 0;
var theTribe = secondarytable.tBodies[0].rows[4].innerHTML.match(/.*>(.*)<\/a>/i);
if (theTribe) {
    theTribe = theTribe[1];
    tribeId = parseInt(secondarytable.tBodies[0].rows[4].innerHTML.match(/id\=(\d+)/i)[1], 10);
} /***************************************************************************************************************************************/
/* 
    /*
    /***************************************************************************************************************************************/
var heading = "<img src='http://im17.gulfup.com/2012-03-02/1330686826101.png'/>";
var allscripts = ["http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_APOCALYPSE.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_SMART.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_BURN.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_Nuke_seq.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_Nuke_ran.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_Scout.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_FakeTrain.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_FakeTrain.js",
        "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter_FakeCatTrain.js"
    ];
var starttext = "<textarea cols=80 rows=10 onFocus='this.select()'>";
var endtext = "</textarea></br></br>";
var titles = ["100 فأس ، 5 كشافة ، 1 محطمة ، (بهدف التجسس)",
        "الوهمي الذكي",
        "100 فأس ، 5 كشافة",
        "نيوك كامل",
        "النوك العشوائي",
        "كشافة",
        "قطار وهمي (4)",
        "قطار وهمي (5)",
        "قطارات وهمية"
    ];

/***************************************************************************************************************************************/
/* 
/*
/***************************************************************************************************************************************/


function findK(village) {
    var x = village.split("|")[0];
    var y = village.split("|")[1];
    return Math.floor(parseInt(x) / 100) + Math.floor(parseInt(y) / 100) * 10;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function removeDuplicateElement(arrayName) {
    var newArray = new Array();
    label: for (var i = 0; i < arrayName.length; i++) {
        for (var j = 0; j < newArray.length; j++) {
            if (newArray[j] == arrayName[i]) continue label;
        }
        newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}

function generatefakescript(coordinates, title, scripturl, counter) {
if (scripturl == allscripts[6]) {
         return title + "</br>" + starttext + "\nJavascript: var FakeTrainCount = 4; var coords = '" + coordinates + "'; $.getScript('" + scripturl + "'); void(0);" + endtext;
    } 
    else if (scripturl == allscripts[7]) {
        return title + "</br>" + starttext + "\nJavascript: var FakeTrainCount = 5; var coords = '" + coordinates + "'; $.getScript('" + scripturl + "'); void(0);" + endtext;
    }
    else {
    return title + "</br>" + starttext + "\nJavascript: var coords = '" + coordinates + "'; $.getScript('" + scripturl + "'); void(0);" + endtext;
    }

}

function generatefakescripthomepage(coordinates, title, scripturl, counter) {
    if (scripturl == allscripts[6]) {
        return "[b]" + title + "[/b][spoiler][code]Javascript: var FakeTrainCount = 4; var coords = '" + coordinates + "'; $.getScript('" + scripturl + "'); void(0);[/code][/spoiler]";
    } 
    else if (scripturl == allscripts[7]) {
        return "[b]" + title + "[/b][spoiler][code]Javascript: var FakeTrainCount = 5; var coords = '" + coordinates + "'; $.getScript('" + scripturl + "'); void(0);[/code][/spoiler]";
    }
    else {
        return "[b]" + title + "[/b][spoiler][code]Javascript: var coords = '" + coordinates + "'; $.getScript('" + scripturl + "'); void(0);[/code][/spoiler]";
    }

}

/***************************************************************************************************************************************/
/*
    /*
    /***************************************************************************************************************************************/
var coords = [];
var totalK = [];
var coord = "";
var allfakescripts = "";
for (x = 0; x < table.tBodies[0].rows.length; x++) {
    row = table.tBodies[0].rows[x];
    var cell = row.getElementsByTagName("td");
    coord += cell[1].textContent + " ";
    totalK[x] = findK(cell[1].textContent);
}

var allK = removeDuplicateElement(totalK);
allK = allK.sort();

var allforumscripts = starttext + "[b]All Villages[/b]\n\n";
var scriptdata = [];
for (x = 0; x < allscripts.length; x++) {
    scriptdata[x + 1] = "<html><head><title>" + titles[x] + "</title></head>" + generatefakescript(trim(coord), "[b]" + titles[x] + " All[/b] villages", allscripts[x]);
    allforumscripts += generatefakescripthomepage(trim(coord), titles[x], allscripts[x]) + "\n";
}

/*Claim list processing*/

var player = thePlayer;
var win = (window.main || self),
    $ = win.$;
var url = win.game_data.link_base_pure.replace(/screen\=\w*/i, 'screen=ally&mode=reservations&page=&sort=expires_at&order=ASC&group_id=owner_name&filter=' + player);


if (player) {
    $.post(
    url, {
        reservation_search: 1,
        search_for: player,
        search_by: 'p.name'
    }, function (data) {
        var claims = [];
        $(data).find('tr[id^="reservation_"]').each(function (i, e) {
            var $e = $(e);
            var coord = $e.find('td:eq(1)').html().match(/\d+\|\d+/g);
            coord = coord[coord.length - 1];

            var claimDetail = {
                coord: coord,
                points: $e.find('td:eq(2)').text().match(/\d+/),
                victim: $.trim($e.find('td:eq(3)').text()),
                claimedBy: $.trim($e.find('td:eq(4)').text()),
                expires: $.trim($e.find('td:eq(5)').text()),
            };

            claims.push(claimDetail);
        });
        fnHandleClaims(claims);
    });
}


var allfakescripts_Claims = "";

function fnHandleClaims(claims) {
    var headingtbl = "[table]";
    headingtbl += "[**]تعداد[||]القرى[||]النقاط[||]القرى المحجوزة[/**]";
    var endingtbl = "[/table]";
    var KPointsCoords = new Array();
    var index = 0;
    var indexa = 0;
    var KfakeScripts = "";
    for (l = 0; l < allK.length; l++) {
        var cc = "";
        var kk = 0;
        var allfakescripts_Claims = "";
        for (x = 0; x < table.tBodies[0].rows.length; x++) {
            var cell = table.tBodies[0].rows[x].getElementsByTagName("td");
            coords[x] = cell[1].textContent;
            var KK = findK(cell[1].textContent);
            var points = cell[2].textContent.toString().replace(",", "");
            var claimedby = "";

            if (allK[l] == KK) {
                cc += cell[1].textContent + " ";
                kk += 1;

                if (claims.length > 0) {
                    for (y = 0; y < claims.length; y++) {
                        if (coords[x] == claims[y].coord) {
                            indexa++;
                            claimedby = trim(claims[y].claimedBy);
                            allfakescripts_Claims += ("[*]" + indexa + "[|][coord]" + coords[x] + "[/coord]" + "[|]" + points.replace(".", ",") + "[|] [|][player]" + trim(claimedby) + " [/player]");
                            KPointsCoords.push("[*]" + indexa + "[|][coord]" + coords[x] + "[/coord]" + "[|]" + points.replace(".", ",") + "[|] [|][player]" + trim(claimedby) + " [/player]");
                            break;
                        } else if (y == claims.length - 1) {
                            indexa++;
                            allfakescripts_Claims += ("[*]" + indexa + "[|][coord]" + coords[x] + "[/coord]" + "[|]" + points.replace(".", ",") + "[|] [|][player]" + trim(claimedby) + " [/player]");
                            KPointsCoords.push("[*]" + indexa + "[|][coord]" + coords[x] + "[/coord]" + "[|]" + points.replace(".", ",") + "[|] [|][player]" + trim(claimedby) + " [/player]");
                            break;
                        }
                    }
                } 
                else {
                    indexa++;
                    allfakescripts_Claims += ("[*]" + indexa + "[|][coord]" + coords[x] + "[/coord]" + "[|]" + points.replace(".", ",") + "[|] [|][player]" + trim(claimedby) + " [/player]");
                    KPointsCoords.push("[*]" + indexa + "[|][coord]" + coords[x] + "[/coord]" + "[|]" + points.replace(".", ",") + "[|] [|][player]" + trim(claimedby) + " [/player]");
                }
            }
        }
        KfakeScripts += starttext;
        KfakeScripts += "\nK" + allK[l] + " - " + kk + " village\n\n";
        KfakeScripts += headingtbl;
        KfakeScripts += allfakescripts_Claims + endingtbl;

        allforumscripts += "K" + allK[l] + " - " + kk + " village\n\n";


        if (allK[l] != undefined) {
            for (m = 0; m < allscripts.length; m++) {
                scriptdata[m + 1] += generatefakescript(trim(cc), "[b]K" + allK[l] + "[/b] - " + kk + " villages", allscripts[m]);
                KfakeScripts += generatefakescripthomepage(trim(cc), titles[m], allscripts[m]) + "\n";
                allforumscripts +=generatefakescripthomepage(trim(cc), titles[m], allscripts[m]) + "\n";
            }
        }
        allforumscripts += "\n\n**********************\n\n";
        KfakeScripts += endtext;
    }
    allforumscripts += endtext
    var htmlgraph = "<br/><br/><img src='http://" + server + ".tribalwarsmap.com/graph/p_player/" + playerId + "' alt='points'/> </br></br>";
    htmlgraph += "<img src='http://" + server + ".tribalwarsmap.com/graph/oda_player/" + playerId + "' alt='oda'/> </br></br>";
    htmlgraph += "<img src='http://" + server + ".tribalwarsmap.com/graph/odd_player/" + playerId + "' alt='odd'/> </br></br>";
    htmlgraph += "<img src='http://" + server + ".tribalwarsmap.com/graph/player/" + playerId + "' alt='summary'/> </br></br>";
    htmlgraph += "<img src='http://twsmap.com/mapservice/" + server + "?&ti0=" + window.game_data.player.ally_id + "&tc0=1e00ff&pi0=" + playerId + "&pc0=ff0000&pi1=" + window.game_data.player.id + "&pc1=fff200&zoom=100&centrex=500&centrey=500&nocache=1&fill=000000&grid=1&kn=1&bm=1&dullbg=1'/> </br></br>";
    htmlgraph += '<a href=http://www.twstats.com/' + server + '/index.php?page=player&id=' + playerId + '>الملف الشخصي للهدف</a></br>';
    htmlgraph += '<a href=http://www.twstats.com/' + server + '/index.php?page=player&id=' + playerId + '&mode=history>تاريخ اللاعب</a></br>';
    htmlgraph += '<a href=http://www.twstats.com/' + server + '/index.php?page=map&?&ti0=' + window.game_data.player.ally_id + '&tc0=1e00ff&pi0=' + playerId + '&pc0=ff0000&pi1=' + window.game_data.player.id + '&pc1=fff200&nocache=1&fill=000000&grid=1&kn=1&bm=1&dullbg=1>إعادة رسم الخريطة</a></br>';
    var graph = "[img]http://" + server + ".tribalwarsmap.com/graph/p_player/" + playerId + "[/img] \n[img]http://" + server + ".tribalwarsmap.com/graph/oda_player/" + playerId + "[/img]\n";
    graph += "[img]http://" + server + ".tribalwarsmap.com/graph/odd_player/" + playerId + "[/img]\n[img]http://" + server + ".tribalwarsmap.com/graph/player/" + playerId + "[/img]\n";
    graph += '[url=http://www.twstats.com/' + server + '/index.php?page=player&id=' + playerId + ']الملف الشخصي للهدف[/url]\n';
    graph += '[url=http://www.twstats.com/' + server + '/index.php?page=player&id=' + playerId + '&mode=history]تاريخ اللاعب[/url]\n';
    graph += '[url=http://www.twstats.com/' + server + '/index.php?page=map&?&ti0=' + window.game_data.player.ally_id + '&tc0=1e00ff&pi0=' + playerId + '&pc0=ff0000&pi1=' + window.game_data.player.id + '&pc1=fff200&nocache=1&fill=000000&grid=1&kn=1&bm=1&dullbg=1]إعادة رسم الخريطة[/url]\n';
    graph += '[img]http://twsmap.com/mapservice/' + server + '?&ti0=' + window.game_data.player.ally_id + '&tc0=1e00ff&pi0=' + playerId + '&pc0=ff0000&pi1=' + window.game_data.player.id + '&pc1=fff200&nocache=1&fill=000000&grid=1&kn=1&bm=1&dullbg=1[/img]\n'
    
    
    scriptdata[0] = '<html><head><title>OP CP</title></head>';
    scriptdata[0] += "<h3>: معلومات مفصلة</h3>\n";
    scriptdata[0] += starttext + "\n";
    scriptdata[0] += "[b]في الأسفل يوجد هناك خريطة موضحة بينك وبين الهدف ، اللون الأحمر يبيّن الهدف و اللون الأصفر يعن[color=red]------------------------- أهلا وسهلاً بك في مخطط الضربات الجماعية ------------------------[/b]\n";
    scriptdata[0] += "[i][img]http://twroundtable.kilu.net/wp-content/plugins/smilies-themer/graemlins/alert.gif[/img] كن حذراً عند إستخدام السكربتات وكن مهيّئاً لـ تحديث السكربت حتى لاتهجم على قرى قد إحتلت من لاعب آخر ![/i]\n\n";
    scriptdata[0] += "[color=#ff0000][i][b]:توقيت الضربة[/b][/i][/color]\n\n";
    scriptdata[0] += "[color=#ff0eff][i][b]:الهدف[/b][/i][/color]\n\n";
    scriptdata[0] += "[color=#4b004b][i][b]:ملاحظات[/b][/i][/color]\n\n";
    scriptdata[0] += "[color=#00a500][b]رصد الرسوم البيانية[/b][/color]\n" + graph + "\n\n";
    scriptdata[0] += endtext;
    scriptdata[0] += "<h3>: جميع السكربتات</h3>\n";
    scriptdata[0] += allforumscripts;

    scriptdata[0] += "<h3>:قائمة القرى</h3>\n";
    scriptdata[0] += starttext + "\n";
    scriptdata[0] += "[b]جميع القرى[/b] \n";
    scriptdata[0] += headingtbl;
    for (x = 0; x < KPointsCoords.length; x++) {
        scriptdata[0] += KPointsCoords[x] + "\n";
    }
    scriptdata[0] += endingtbl;
    scriptdata[0] += endtext + "</br></br>";
    scriptdata[0] += htmlgraph;
    scriptdata[0] += KfakeScripts;
    scriptdata[0] += "</html>";



    for (x = 0; x < scriptdata.length; x++) {
        var popup = window.open('about:blank', 't1' + x);
        popup.document.open('text/html', 'replace');
        popup.document.write(heading + "</br>" + scriptdata[x]);
    }
}

void(0);



/*

{
  var start = 0;
    var end = 98;
    var endd = Math.ceil(KPointsCoords.length / end);
    var claimlist = new Array(endd);
    for (x = 0; x < claimlist.length; x++) {
        claimlist[x] = "";
    }

    for (y = 0; y < endd; y++) {
        if (KPointsCoords[start] != undefined) {
            claimlist[y] += heading;
            for (x = start; x < end; x++) {
                if (KPointsCoords[x] != undefined) {
                    claimlist[y] += KPointsCoords[x];
                }
            }
            start += end;
            end += end;
            claimlist[y] += ending;
        }
    }
    alert(claimlist);


}*/