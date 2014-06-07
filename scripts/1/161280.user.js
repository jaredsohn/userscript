// ==UserScript==
// @name           GSubProject
// @namespace      GSP
// @author         GRaVe
// @version        0.2.1
// @description    GRaVe eRepublik Media Sub Project
// @include        http://www.erepublik.com/*/newspaper/*
// @include        http://www.erepublik.com/*/article/*
// @require        http://code.jquery.com/jquery-1.8.2.js
// ==/UserScript==

var gsphost = "http://gocza.eu/gsp/sub.php";
var gspLink = "http://www.erepublik.com/en/newspaper/h-and-code-192113/1";

var gm_pId = "gsp_pId";
var gm_eId = "gsp_eId";
var gm_mySub = "gsp_mysub";
var gm_subto = "gsp_subto"; //Get subs from project
var gm_subby = "gsp_subby"

var gm_subpId = "gsp_subpId";
var gm_subeId = "gsp_subeId"

var gm_subconfirm = "gsp_confirm";
var gm_update = "gsp_update";
var eDay = 0;

var gButton = { 0: "Start", 1: "Stop" }

var htmlMenu = '<div id="gsp_menu" class="newspaper_head">';
    htmlMenu +=    '<a href="' + gspLink + '" title="GSP" class="slick_grey bolded"><span>GSP</span></a>';
    htmlMenu +=    '<span class="gspcline" id="gsp_subs"></span>';
    htmlMenu +=    '<span class="gspcline" id="gsp_status"></span>';
    htmlMenu +=    '<div class="actions" >';
    htmlMenu +=    '<a id="gsp_start" href="#" title="Start GSP" class="slick_grey bolded"><span>Start</span></a>';
    htmlMenu += '</div></div>';
$('div.newspaper_head').before(htmlMenu);

var htmlStyle = '<style> span.gspcline {position:relative; top: -10px; margin-left: 5px;}';
htmlStyle += '</style>';
$('head').append(htmlStyle);

var uId = $('input#citizen_id').val();
var spURL = location.href.split('/');
var BASE_URL = spURL[0] + '/' + spURL[1] + '/' + spURL[2] + '/' + spURL[3] + '/';// http://www.erepublik.com/en/

var error = 0;
var mysubs = GM_getValue(gm_mySub, 0);
var pId    = GM_getValue(gm_pId, 0);
var subget = GM_getValue(gm_subto, 0);
var lastUpdate = GM_getValue(gm_update,0);
var subChecker = undefined;

function gspmain() {
    var eDay = parseInt($('span.eday>strong').text().replace(",", ""),10);

    if (pId == 0) {
        Log('GSP Init')
        pId = GetMyPaperId();
        if (pId != 0)
            GM_setValue(gm_pId, pId);
        else
            Error(1);
    }

    if (pId != 0 && eDay != lastUpdate) {
        mysubs = GetSub(pId);
        lastUpdate = eDay;
        GM_setValue(gm_mySub, mysubs);
        GM_setValue(gm_update, lastUpdate);
    }

    var subby = GM_getValue(gm_subby, 0);
    var subto = GM_getValue(gm_subto, 0);

    var subtext = "Subs: " + mysubs;
    if (subby > 0 || subto > 0)
        subtext += '(' + 1*subto + '/' + 1*subby + ')';
    subtext += " [" + lastUpdate + " eDay]";
    $('#gsp_subs').html(subtext);

    var subpId = GM_getValue(gm_subpId, 0);
    var subuId = GM_getValue(gm_subeId, 0);

    var openpId = $('input#newspaper_id').val();
    var cSubs = $('em.subscribers:first').text();
    var subsMode = subpId === openpId;
    
    if (subsMode) { //cel ujsag oldalan vagyunk
        $('#gsp_start > span').text(gButton[1]);
        //Log(cPaperId + " " + cSubs + " " + subsMode);
        var subed = $('div.actions > a[class*="subscribeToNewspaper"]').is(":visible") === false;

        if (subed)
            ReportSub(1, uId, subuId, cSubs, 0);
        else
        {
            subChecker = window.setInterval(function () {
                var subComp = $('div.actions > a[class*="subscribeToNewspaper"]').is(":visible") === false;
                if (subComp) {
                    window.clearInterval(subChecker);
                    var subsc = $('em.subscribers:first').text();
                    //alert("report " + $('em.subscribers:first').text());
                    ReportSub(1, uId, subuId, subsc, 0)
                }
            }, 2000);

            window.setTimeout(function () {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true);
                $('div.actions > a[class*="subscribeToNewspaper"]')[0].dispatchEvent(evt);
            }, 2500 );
        }
    }

    //start
    $('#gsp_start').click(function () {
        if (!subsMode) {
            $('#gsp_start > span').text(gButton[1]);
            $.ajax({
                type: "GET",
                url: gsphost,
                context: this,
                async:true,
                data: {
                    c: 0,
                    uid: uId,
                    pid: pId,
                    subs: mysubs
                },
                crossDomain: true,
                cache: false,
                success: function (data) { procNext(data); }
            });
        }
        else
        {
            $('#gsp_start > span').text(gButton[0]);
            GM_setValue(gm_subpId, 0);
            GM_setValue(gm_subeId, 0);
            if (subChecker != undefined)
                window.clearInterval(subChecker);
            //location.href = location.href;
        }
    });
}

function ReportSub(c, uid, subuId, subs, conf) {
    $.ajax({
        type: "POST",
        url: gsphost,
        context: this,
        data: {
            c: c,
            uid: uid,
            subuid: subuId,
            subs: subs,
            con: conf
        },
        crossDomain: true,
        cache: false,
        success: function (data) { procNext(data); }
    });
}

function GetMyPaperId() {
    Log('HTTP: Get MyProfile');
    var getpid = 0;
    $.ajax({
        url:  BASE_URL + "citizen/profile/" + uId,
        type: 'GET',
        async: false,
        context: this,
        cache: false,
        timeout: 30000,
        error: function(){
            Log(status);
            return -1;
        },
        success: function (data) {
            var purl = $(data).find('div.one_newspaper > a[href*="newspaper"]').attr('href'); ///en/newspaper/code-report-192113/1"
            if ( purl )
                getpid = purl.match(/-([0-9]+)\//)[1];
        }
    });
    return getpid;
}

function GetSub(paperId) {
    Log('HTTP: Get NewsPaper');
    var subs = 0;
    $.ajax({
        url: BASE_URL + "newspaper/" + paperId,
        type: 'GET',
        async: false,
        cache: false,
        context: this,
        timeout: 30000,
        error: function(){
            Log(status);
        },
        success: function (data) {
            subs = $(data).find('div.actions > p > em').text();
        }
    });
    return subs;
}

function procNext(data) {
    Log("Proccess response DATA");
    if (subChecker != undefined)
        window.clearInterval(subChecker);
    var o = JSON.parse(data);
    var subpId = o["subpid"];
    var subuId = o["subuid"];
    var subby = o["subby"];
    var subto = o["subto"];
    var con = o["con"];
    if(con == -1)
    {
        Log('All paper subed');
        $('#gsp_start > span').text(gButton[0]);
        return;
    }
    else if (subpId != undefined && subuId != undefined) {
        GM_setValue(gm_subpId, subpId);
        GM_setValue(gm_subeId, subuId);
        GM_setValue(gm_subconfirm, con);

        var cpId = location.href.match(/-([0-9]+)\//)[1];
        if (subpId != cpId)
            location.href = BASE_URL + "newspaper/" + subpId;
    }
    else
        Error(2);

    GM_setValue(gm_subby, subby);
    GM_setValue(gm_subto, subto);
}

function Log(msg) {
    $('#gsp_status').text(msg);
    GM_log(msg);
}

function Error(erc) {
    $('#gsp_start > span').text(gButton[0]);
    error = erc;
    if (erc == 1) Log('Init failed');
    if (erc == 2) Log('Invalid Serverdata');
}

gspmain();