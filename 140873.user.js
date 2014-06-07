// ==UserScript==
// @name        MYSCRIPT
// @namespace   shaft
// @description Extra Tools for TRAVIAN 4 (T4)
// @author      faithshaft
// @include     http://*ts*.travian.*/*
// @include     http://ts*.travian.*.*/*
// @include     http://*tx*.travian.*/*
// @include     http://tx*.travian.*.*/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.22/jquery-ui.min.js
// @version     1
// ==/UserScript==

//#region global Variables

var CookiesExpiteDays = 365;
var scriptID = 123;

var LMID = "LeftMenu" + scriptID;
var LMClass = "LeftMenuClass" + scriptID;

var CropFinderTitle = "Crop Finder";
var CropFinderElID = "cdEl" + scriptID;

var ElephantFinderTitle = "Elephant Finder";
var ElephantFinderElID = "edEl" + scriptID;

//#endregion

//#region tools Functions

function setCookie(c_name, value) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + CookiesExpiteDays);
    document.cookie = c_name + "=" + escape(value) + ((CookiesExpiteDays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(c_name, def) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return def;
}

//#endregion

//#region div elements

function leftMenu() {
    var lm = "<ul class='leftMenuElement' style='list-style-type: none; margin:0; padding:0; width:150px'>";
    lm += "<li class='ui-state-default' style='text-align: center; width: 100%; margin-bottom: 3px'><a class='cropFinderOpen' style='width:100%'>" + CropFinderTitle + "</a></li>";
    lm += "<li class='ui-state-default' style='text-align: center; width: 100%; margin-bottom: 3px'><a class='elephantFinderOpen' style='width:100%'>" + ElephantFinderTitle + "</a></li>";
    lm += "</ul>";
    return lm;
}

function createCropDivContent() {
    var cc = "<table style='z-index:1000000'>";
    cc += "<tr class='ui-state-active'><td>Scanned</td><td><span id='crop_done'>0</span></td><td>from</td><td><span id='crop_tot'>0</span></td></tr>";
    cc += "<tr class='ui-state-default'><td>X:</td><td><input type='text' id='crop_x' maxsize='4' size='4' value='0'/></td><td>Y:</td><td><input type='text' id='crop_y' maxsize='4' size='4' value='0'/></td></tr>";
    cc += "<tr class='ui-state-default'><td>Radius:</td><td><select id='rad'><option value='4' selected>4</option><option value='8'>8</option><option value='15'>15</option></select></td></tr>";
    cc += "<tr class='ui-state-active'><td colspan='4'><table id='crop_fields' style='width:100%' class='ui-state-active'></table></td></tr>";
    cc += "</table>";
    return cc;
}

function createElephantDivContent() {
    var cc = "<table style='z-index:1000000'>";
    cc += "<tr class='ui-state-active'><td>Scanned</td><td><span id='ele_done'>0</span></td><td>from</td><td><span id='ele_tot'>0</span></td></tr>";
    cc += "<tr class='ui-state-default'><td><input type='checkbox' id='croc_check'/></td><td colspan='3'>Scan for crocodiles too.</td></tr>";
    cc += "<tr class='ui-state-default'><td>X:</td><td><input type='text' id='elep_x' maxsize='4' size='4' value='0'/></td><td>Y:</td><td><input type='text' id='elep_y' maxsize='4' size='4' value='0'/></td></tr>";
    cc += "<tr class='ui-state-default'><td>Radius:</td><td><select id='rad_elep'><option value='4' selected>4</option><option value='8'>8</option><option value='15'>15</option></select></td></tr>";
    cc += "<tr class='ui-state-active'><td colspan='4'><table id='elep_fields' style='width:100%' class='ui-state-active'></table></td></tr>";
    cc += "</table>";
    return cc;
}

function createElephantDiv() {
    $("body").append($("<div>").attr("id", ElephantFinderElID).css("position", "inherited").html(createElephantDivContent()));
}

function createCropDiv() {
    $("body").append($("<div>").attr("id", CropFinderElID).css("position", "inherited").html(createCropDivContent()));
}

function createLeftMenuDiv() {
    $("body").append($("<div>").attr("id", LMID).addClass(LMClass).html(leftMenu()));
}



//#endregion

//#region DIALOGS
function createDialogs() {
    $("#" + CropFinderElID).dialog({
        autoOpen: false,
        width: 300,
        height: 400,
        resizable: false,
        title: CropFinderTitle,
        closeOnEscape: false,
        buttons: {
            "Search": SearchCropFields
        },
        dialogClass: 'dialogFixed'
    });

    $("#" + ElephantFinderElID).dialog({
        autoOpen: false,
        width: 300,
        height: 400,
        resizable: false,
        title: ElephantFinderTitle,
        closeOnEscape: false,
        buttons: {
            "Search": SearchElephants
        },
        dialogClass: 'dialogFixed'
    });
}
//#endregion

//#region STYLES

function loadStyles() {
    GM_addStyle('@import "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.22/themes/sunny/jquery-ui.css";');
    GM_addStyle('.' + LMClass + ' {position: absolute !important; top: 70px; left: 20px;} ');
    GM_addStyle('.dialogFixed {position: absolute !important;} .dialogFixed table tbody tr td,.dialogFixed table tbody tr,.dialogFixed table tbody,.dialogFixed table,.dialogFixed table tbody td{background:inherit !important;padding:0px;font:1em;} ');
}

//#endregion

//#region EVENTS

function createEvents() {
    $(".cropFinderOpen").click(function () {
        $("#" + CropFinderElID).dialog("open");
    });

    $(".elephantFinderOpen").click(function () {
        $("#" + ElephantFinderElID).dialog("open");
    });

    $(".leftMenuElement li").hover(
        function () {
            $(this).removeClass("ui-state-default");
            $(this).addClass("ui-state-active");
        },
        function () {
            $(this).removeClass("ui-state-active");
            $(this).addClass("ui-state-default");
        }
    );
}

//#endregion

//#region cropFieelds Search

function SearchCropFields() {
    $("#crop_fields").empty();
    var originalX = parseInt($("#crop_x").val());
    var originalY = parseInt($("#crop_y").val());
    var radius = parseInt($("#rad").val());
    var tot = 0;
    switch (radius) {
        case 4:
            tot = 99;
            break;
        case 8:
            tot = 357;
            break;
        default:
            tot = 961;
            break;
    }
    $("#crop_tot").html(tot);
    $("#crop_done").html(0);
    getMap(originalX, originalY, radius);
}

function getMap(x, y, rad) {
    var tserver = 'http://'
    var zoom = 1;
    tserver += document.location.href.split('/')[2];
    tserver += '/ajax.php?cmd=mapPositionData';

    switch (rad) {
        case 4:
            zoom = 1;
            break;
        case 8:
            zoom = 2;
            break;
        default:
            zoom = 3;
            break;
    }

    $.getJSON(tserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=" + zoom + "&", function (data) {
        $(data.data.tiles).each(function (index, elem) {
            if (elem.c) {
                if (elem.c.match("{k.f1}")) {
                    $('<tr><td>Crop 9</td><td>' + elem.t + '</td></tr>').appendTo('#crop_fields');
                } else if (elem.c.match("{k.f6}")) {
                    $('<tr><td>Crop 15</td><td>' + elem.t + '</td></tr>').appendTo('#crop_fields');
                }
            }
            $('#crop_done').html(parseInt($('#crop_done').html()) + 1);
        });
    });
}

//#endregion

//#region Elephants Search

function SearchElephants() {
    $("#elep_fields").empty();
    var originalX = parseInt($("#elep_x").val());
    var originalY = parseInt($("#elep_y").val());
    var radius = parseInt($("#rad_elep").val());
    var tot = 0;
    switch (radius) {
        case 4:
            tot = 99;
            break;
        case 8:
            tot = 357;
            break;
        default:
            tot = 961;
            break;
    }
    $("#ele_tot").html(tot);
    $("#ele_done").html(0);
    getElephant(originalX, originalY, radius);
}

function getElephant(x, y, rad) {
    var tserver = 'http://';
    var zoom = 1;
    tserver += document.location.href.split('/')[2];
    mserver = tserver;
    mserver += '/ajax.php?cmd=mapPositionData';
    tserver += '/ajax.php';

    switch (rad) {
        case 4:
            zoom = 1;
            break;
        case 8:
            zoom = 2;
            break;
        default:
            zoom = 3;
            break;
    }

    $.getJSON(mserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=" + zoom + "&", function (data) {
        $(data.data.tiles).each(function (index, elem) {
            if (elem.c) {
                if (elem.c.match("{k.fo}")) {
                    $.ajax({
                        url: tserver,
                        data: "cmd=viewTileDetails&x=" + elem.x + "&y=" + elem.y,
                        dataType: "text",
                        success: function (data) {
                            if (data.split('u40')[1])
                                $('<tr><td>Elephants</td><td>' + elem.t.split('</span></span>')[0] + '</span></span></td></tr>').appendTo('#elep_fields');
                            if ((data.split('u38')[1]) && ($("#croc_check").attr('checked')))
                                $('<tr><td>Crocodile</td><td>' + elem.t.split('</span></span>')[0] + '</span></span></td></tr>').appendTo('#elep_fields');
                        }
                    });
                }
            }
            $('#ele_done').html(parseInt($('#ele_done').html()) + 1);
        });
    });
}

//#endregion

//#region onLoad

$(function () {
    loadStyles();
    createLeftMenuDiv();
    createCropDiv();
    createElephantDiv();
    createDialogs();
    createEvents();
    //alert("1");
});

//#endregion