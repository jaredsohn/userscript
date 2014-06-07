// ==UserScript==
// @name           KOC Throne Room Organizer 
// @version        20120817
// @namespace      mmm
// @homepage       https://userscripts.org/scripts/show/
// @delay 1000
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*standAlone.php*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @updateURL      
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js
// @description    Organizes, upgrades and salvages KOC throne room items
// ==/UserScript==


var Version = '20120717b_mm';

var trPopUpTopClass = 'trPopTop';
var ResetAll = false;
var DEBUG_TRACE = false;

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;
var URL_CASTLE_BUT = "data:image/png;base64,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";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,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";

var upgradeData = {
        active : false,
        item : 0,
        retryInterval : 30,
        enhanceAction : false,
        enhanceItem : 0,
        enhanceMax  : 5,
        minStones : 100000,
        switchToUpgrade : true,
        salvageActive : false,
        throneSaveNum : 10,
        currentTab : null,
        trWinIsOpen : false,
        Opacity : 1.0,
        anyCity : true,
        uCityNum : 0,
        sCityNum : 0,
        repairAll : false,
        trWinPos : {},
};

var TRGlobalOptions = {
        trUpdate : false,
};

var TABLE_SCALE =0.47;

var upgradeStats = {
        upgradeSuccess: {0: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
            1: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
            2: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
            3: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
            4: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
            5: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}    },

            upgradeFailure: {0: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                1: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                2: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                3: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                4: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                5: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}    },

                enhanceSuccess: {0: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                    1: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                    2: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                    3: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                    4: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                    5: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}    },

                    enhanceFailure: {0: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                        1: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                        2: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                        3: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                        4: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
                        5: {0: 0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}    },
};

var salvageData = {
        salvageActive : false,
        throneSaveNum : 10,
        minQuality    : 3,
        ruleSet       : [{"type":"any","faction":"any","conditions":[{"mustHave":"true","number":"2","effect":"Range","buffType":"e","slots":[true,true,true,true,true]}]},{"type":"any","faction":"any","conditions":[{"mustHave":"true","number":"2","effect":"Troop Training Speed","buffType":"e","slots":[true,true,true,true,true]}]},{"type":"banner","faction":"any","conditions":[{"mustHave":"true","number":"2","effect":"Siege Range","buffType":"e","slots":[true,true,true,true,true]}]}],
        numSalvagedItems : 0,
        maxStones     : 980000,
        anyCity       : true,
};

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var uW = unsafeWindow;
//var firefoxVersion = getFirefoxVersion();
var CM = unsafeWindow.cm;
var Cities = {};

var trStartupTimer = null;

var trDispTimer = null;

function trStartup (){

    if (uW.trLoaded)
        return;

    var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
    if (metc.width==null || metc.width==0){
        trStartupTimer = setTimeout (trStartup, 1000);
        return;
    }

    uW.trLoaded = Version;

    readUpgradeData();
    readUpgradeStats();
    readSalvageData();

    logit ("Throne room organizer loaded");

    installHandlerFunctions();

    var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
        .xtabBR {padding-right: 5px; border:none; background:none;}\
        .semi_transparent { zoom: 1; filter: alpha(opacity=60); opacity: 0.6;}  \
        div.trTitle { margin-top: 4px; line-height: 24px; text-align: center; black: white; font:bold 1.3em Georiga; }\
        .rot45 { transform: rotate(-45deg); -ms-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); -o-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -moz-transform-origin: 50% 50%; z-index: 10;}\
        div.cardOverlay { font: cracked; width: 100%; font-size:3.5em; position: absolute; left: 0%; top: 30%; color: red; text-align: center; text-shadow: 2px 2px 4px #000;} \
        div.trCloseSpan {float: right; background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/close_icon.png"); background-repeat: no-repeat; height: 20px; width: 20px; }\
        body table.trMainTab tbody tr td {background: none;}\
        body table.trTabDef tbody tr td {background: none;}\
        #tr_footer {height: 50px; background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r3_c1.jpg") scroll no-repeat center bottom;}\
        table.trTab tr td {border:none; background:none; white-space:nowrap; padding:4px}\
        table.trTab#trDisplayTable tr th { border: 3px solid grey; font-size:1.2em; }\
        table.trStatTab tr td { background-color: #ffffff; white-space:nowrap; padding:5px; border-bottom:solid black 1px;}\
        table.trStatTab tr td:last-child { border-right:solid black 1px; }\
        table.trStatTab tr:first-child th { border-top:solid black 1px; }\
        table.trStatTab tr td.td0 { background-color: white; }\
        table.trStatTab tr td.td1 { background-color: #eeeeee; }\
        table.trStatTab tr td.td2 { background-color: white; }\
        table.trStatTab tr th {border:solid black 1px; border-top: none; background-color: #357; color: white; white-space:nowrap; padding:5px}\
        table.trStatTab tr:last-child td:first-child, table.trStatTab tr:last-child th:first-child { -moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; border-bottom-left-radius:10px} \
        table.trStatTab tr:last-child td:last-child, table.trStatTab tr:last-child th:last-child { -moz-border-radius-bottomright:10px; -webkit-border-bottom-right-radius:10px; border-bottom-right-radius:10px} \
        table.trStatTab tr:first-child th:first-child { -moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; border-top-left-radius:10px} \
        table.trStatTab tr:first-child th:last-child { -moz-border-radius-topright:10px; -webkit-border-top-right-radius:10px; border-top-right-radius:10px} \
        table.trTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
        table.trOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
        table.trSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
        table.trTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
        table.trTabPad tr td { padding-left: 8px; background: none;}\
        table.trTabPad2 tr td { padding-left: 20px; background: none;}\
        .trDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
        .trStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
        .trentry {padding: 7px; white-space:nowrap;}\
        button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
        .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
        .castleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
        .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
        .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
        input.trDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}\
        input.trDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}\
        table.trMainTab { empty-cells: show;  }\
        table.trMainTab tr td a {color:inherit }\
        table.trMainTab tr td   {height:60%; empty-cells:show; padding: 0px 0px 0px 0px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }\
        table.trMainTab tr td.spacer {padding: 0px 0px;}\
        table.trMainTab tr td.sel    {font-weight:bold; font-size:13px; }\
        table.trMainTab tr td.notSel {font-weight:bold; font-size:13px; }\
        tr.trPopTop td { background-color:transparent; border:none; height: 21px;  padding:0px;}\
        tr.trretry_trPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
        tr.trMainPopTop td { background-color:#ded; border:none; height: 42px;  padding:0px; } \
        tr.trretry_trMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
        .trPopMain  { -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}\
        .trPopup  {border:3px ridge #666; opacity:'+upgradeData.Opacity+'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000;}\
        div.trPopup { background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/modal/736_bg_tile.jpg") repeat transparent 0% 0%; }\
        div.trPopup { background: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/dialog_740_r2_c1.jpg") no-repeat transparent 0% 0%; }\
        /* this was needed because the css used a object id and not a class.  reusing the ID caused display issues w/ the TR tooltips */ \
        div.trCard {width: 200px;}\
        div.trCard div.description>div{width:70px;height:70px; }\
        div.trCard div.description div.briton.advisor{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_advisor_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.briton.banner{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_banner_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.briton.chair{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_chair_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.briton.table{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_table_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.briton.window{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_window_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.briton.trophy{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/briton_trophy_normal_1_5.png") top left no-repeat;}\
        div.trCard div.description div.druid.advisor{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_advisor_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.druid.banner{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_banner_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.druid.chair{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_chair_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.druid.table{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_table_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.druid.window{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_window_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.druid.trophy{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/druid_trophy_normal_1_5.png") top left no-repeat;}\
        div.trCard div.description div.fey.advisor{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_advisor_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.fey.banner{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_banner_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.fey.chair{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_chair_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.fey.table{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_table_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.fey.window{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_window_normal_1.png") top left no-repeat;}\
        div.trCard div.description div.fey.trophy{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/icons/70/fey_trophy_normal_1_5.png") top left no-repeat;}\
        div.trCard{font:bold 16px Georiga; overflow: hidden;}\
        div.trCard>div{float:left;border:1px solid #a56631;margin:0px;padding:0px;width:200px;background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/modal/modal_med_bg_4.png") -200px 0 no-repeat;}\
        div.trCard div.title{font:bold 16px Georgia;border-bottom:1px solid #703200;padding:4px 3px 5px 8px;background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/panel/modal/item_bg.png") -20px -100px no-repeat;}\
        div.trCard div.title span.icon{background:transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/equip.png") top right no-repeat;display:block;height:20px;width:20px;top:12px;right:12px;position:absolute;}\
        div.trCard .disabled{opacity:.5;}\   div.trCard ul{margin:0px;padding:0;list-style:none;}\
        div.trCard li{padding:0px 0 0 0px;color:#3f2300;font-weight:bold;font-size:16px;}\
        div.trCard div.description{overflow:hidden;border-bottom:1px solid #703200;padding:5px 0;}\
        div.trCard div.description{overflow:hidden;border-bottom:1px solid #703200;}\
        div.trCard div.description div.portrait{float:left;}\
        div.trCard div.description div.portrait{border:3px solid #deaf69;margin-right:10px;}\
        div.trCard div.description>ul{float:left;margin:3px 0 0 0;padding:0;}\
        div.trCard div.description>ul li{padding:0;font-weight:bold;font-size:13px;text-transform:capitalize;}\
        div.trRule {border:2px inset #c0c0c0; margin-right:10px; margin-left:10px; margin-bottom:2px; padding-left:5px; padding-bottom:5px} \
        div.trRuleCreate {margin-right:10px; padding-right: 5px; margin-bottom:2px; padding-bottom:5px} \
        div.trRule { background-color: #eeeeee; } \
        div.blueBorder { border: 3px solid blue; } \
        div.blueBorder2 { border: 10px solid blue; } \
        div.yellowBorder { outline: 3px solid yellow; outline-offset:0px; }\
        div.yellowBorder2 { outline: 10px solid yellow; outline-offset:0px; }\
        #trhammer {    background-image: url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/sm_hammer.png"); background-repeat: no-repeat; background-color: transparent; display: inline-block; width: 28px; height: 32px; margin: 2px; vertical-align: middle;}\
        ul#t_throneStatList li { float: left; width: 22px; height: 22px; text-align: center; color: white; }\
        ul#t_throneStatList li.active { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_active.png") top left no-repeat; } \
        ul#t_throneStatList li.selected { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_selected.png") top left no-repeat; }\
        ul#t_throneStatList li.locked { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_locked.png") top left no-repeat; text-indent: -999px; }\
        ul#t_throneStatList li.buy { background: transparent url("https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/throne/modal/set_buy.png") top left no-repeat; text-indent: -999px; }\
        div.indent25 {padding-left:25px}';

    window.name = 'TR';

    if (upgradeData.trWinPos==null ||  upgradeData.trWinPos.x==null || upgradeData.trWinPos.x=='' || isNaN(upgradeData.trWinPos.x)){
        var c = getClientCoords (document.getElementById('main_engagement_tabs'));
        upgradeData.trWinPos.x = 100;
        upgradeData.trWinPos.y = 100;
        saveUpgradeData();
    }

    mainPop = new trPopup ('tr', upgradeData.trWinPos.x, upgradeData.trWinPos.y, 720,800, true,
            function (){
        tabManager.hideTab();
        upgradeData.trWinIsOpen=false;
        saveUpgradeData();
    });

    mainPop.autoHeight (true);
    mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
    setCities();

    CM.cheatDetector.detect = foo;

    tabManager.init (mainPop.getMainDiv());
    if (upgradeData.trWinIsOpen){
        mainPop.show (true);
        tabManager.showTab();
    }
    window.addEventListener('unload', onUnload, false);

    AddMainTabLink('TR Organizer', trHideShow, trMainTab);
    attachTab();

    // set the labels on the new salvage tab
    $("a.throne").click( function() {
        Tabs.throneSalvage.updateTRTab();
        Tabs.upgrader.updateTRTab();
        Tabs.upgrader.updateTRSelect();
        $("ul#throneInventoryList > li > div").removeClass('blueBorder');
        $("ul#throneInventoryList > li > div").removeClass('yellowBorder');
        $("div#throneInventoryItem" + upgradeData.item).addClass('blueBorder');
        $("div#throneInventoryItem" + upgradeData.enhanceItem).addClass('yellowBorder');
        
        $("ul#throneInventoryList").css('height', '520px');
        $("div#throneInventoryContainer").css('height', '520px');
        

        // update the other presets buttons when clicked
        $('ul#throneStatList li.active, ul#throneStatList li.selected').click( 
                function () {
                    var s = $(this).attr('id').split('throneInventoryPreset')[1];
                    setPresetWidget(+s);
                });
    });
   
    // create a preset list on the main display
    buildPresetWidget();

    trDispTimer = setInterval(updateTimerDisp , 1000);
}

var foo = function() {
};


//callback handler when a preset button is presed
function processPresetClick(btn)
{
    // don't do anything if already the right preset
    if (btn == unsafeWindow.seed.throne.activeSlot) return;

    // send message
    unsafeWindow.AjaxCall.gPostRequest(
            "ajax/_dispatch53.php",
            {
                ctrl: "throneRoom\\ThroneRoomServiceAjax",
                action: "setPreset",
                presetId: btn
            },
            function (v) {
                if (v.ok === true)
                {
                    // success
                    var H = unsafeWindow.seed.throne.slotEquip[btn];
                    unsafeWindow.seed.throne.activeSlot = btn;

                    // set the right items as equiped
                    $.each(unsafeWindow.kocThroneItems, function (I, J) {
                        C = $.inArray(J.id, H) > -1;
                        if (C) {
                            J.isEquipped = true
                        } else {
                            J.isEquipped = false
                        }
                    });

                    // update the buttons
                    setPresetWidget(btn);
                    unsafeWindow.cm.ThroneView.renderThrone();
                    unsafeWindow.cm.ThroneView.renderStats();
                }
                else
                {
                    logit("Preset change failed. Error code: " + v.error_code);
                }
            }
    );
}

//update the preset list buttons
function setPresetWidget(slot)
{
    // logit("preset: " + slot);
    var x = ($("#t_throneStatList .selected, #throneStatList .selected"));
    x.removeClass('selected');
    x.addClass('active');
    x.bind("mouseenter", function (I) {
        unsafeWindow.cm.ThroneView.boostsTooltip(this, I, I.target.id)
    });
    x.bind("mouseleave", function (I) {
        unsafeWindow.removeTooltip()
    });

    var s = $("#t_throneInventoryPreset" + slot + ", #throneInventoryPreset" + slot);     
    s.removeClass('active');
    s.addClass('selected')
    s.unbind("mouseenter").unbind("mouseleave");
}

//create a preset list on the main display
function buildPresetWidget()
{
    var E = [];
    var J = unsafeWindow.seed.throne.activeSlot;
    var F = unsafeWindow.seed.throne.slotNum;

    for (var G = 0; G < 8; ++G) {
        var H = G + 1;
        var I = $("<li/>");
        if (H === J) {
            I.attr("id", "t_throneInventoryPreset" + H);
            I.addClass("selected");
            I.html(H);
            I.bind("click", {
                idx: G
            }, function (K) {
                var L = K.data.idx + 1;
                processPresetClick(L);
            });

        } else {
            if (H === (F + 1)) {
                I.attr("id", "t_throneInventoryPreset" + H);
                I.addClass("buy");
                I.html(H);
                I.bind("click", function () {
                    unsafeWindow.cm.ContextualMenuThrone.renderMenu(this, null);
                })
            } else {
                if (H <= F) {
                    I.attr("id", "t_throneInventoryPreset" + H);
                    I.addClass("active");
                    I.html(H);
                    I.bind("click", {
                        idx: G
                    }, function (K) {
                        var L = K.data.idx + 1;
                        processPresetClick(L);
                    });
                    I.bind("mouseenter", function (K) {
                        unsafeWindow.cm.ThroneView.boostsTooltip(this, K, K.target.id)
                    });
                    I.bind("mouseleave", function (K) {
                        removeTooltip()
                    })
                } else {
                    I.attr("id", "t_throneInventoryPreset" + H);
                    I.addClass("locked");
                    I.html(H)
                }
            }
        }
        E.push(I)
    }
    var C = $("<ul/>", {
        id: "t_throneStatList",
        addClass: "presetList",
        style: "padding: 0; margin: 5px; list-style: none; overflow: hidden; float: left; border: 5px outset tan;",
    });
    $.each(E, function (K, L) {
        C.append(L)
    })

    //$("div.tabs_engagement").append(C);
    //$("div#kocmain_bottom").append(C);
    var aa = $("<div/>", {height: '40px'});
    $(aa).append(C);
    $("div.mod_comm").prepend(aa);
    
    var p = $("div.mod_comm").css('top');
    if (+p.split('px')[0] < -611)
    {  
        $("div.mod_comm").css('top', "-610px");
        $("div.comm_body").css('top', '40px');
    }
    
    $("div.mod_comm").bind('DOMAttrModified', function ()
      {
        var p = $("div.mod_comm").css('top');
        if (+p.split('px')[0] < -611)
        {  
            $("div.mod_comm").css('top', "-610px");
            $("div.comm_body").css('top', '40px');
        }
      });
    

      
}

function updateTimerDisp () {

    var t = Tabs.upgrader;
    var timeUntilDone = 0;

    if (t.repairEnd != 0)
    {
        timeUntilDone = t.repairEnd - unixTime();
    }

    if (timeUntilDone > 0)
    {
        $("#trtimerdisp").html("<span id='trhammer'></span>  " + rectime(timeUntilDone))
        .css('text-align', 'left')
        .css('width', '100px');
    }
    else
    {
        $("#trtimerdisp").html("<span id='trhammer'></span> Done").css('width', '100px');
    }
}

function rectime(secs) {
    var min = Math.floor((secs)/60);
    var sec = Math.ceil(secs - (min * 60));

    if (sec < 10) {sec = "0" + sec;}
    return  min + ':' + sec;
}

function installHandlerFunctions() {

    var oldR = unsafeWindow.cm.ThroneView.renderInventory;

    var ri2 = function(l) {
        oldR(l);
        $("ul#throneInventoryList > li > div").removeClass('blueBorder');
        $("ul#throneInventoryList > li > div").removeClass('yellowBorder');
        $("div#throneInventoryItem" + upgradeData.item).addClass('blueBorder');
        $("div#throneInventoryItem" + upgradeData.enhanceItem).addClass('yellowBorder');
    };

    unsafeWindow.cm.ThroneView.renderInventory = ri2;


    // intercept the render menu call for our own uses

    // save the location of the old funtion
    var oldF = unsafeWindow.cm.ContextualMenuThrone.renderMenu;

    var renderMenu2 = function (l, j) {
        // call the old one
        oldF(l,j);

        if (j != null)
        {
            // create a button to set the item to auto-enhance
            var btn2 = document.createElement('a');
            $(btn2).addClass("buttonv2 h20 green")
            .html("Auto Enhance")
            .css('color', 'yellow')
            .bind("click", function () {
                Tabs.upgrader.setEnhanceItem(j.id);
                Tabs.upgrader.repaint();
                $("#contextMenu").remove();})
                $("#contextMenu div.title").after(btn2);

            // create a button to set the item to auto-update
            var btn = document.createElement('a');
            $(btn).addClass("buttonv2 h20 green")
            .html("Auto Upgrade")
            .css('color', 'blue')
            .bind("click", function () {
                Tabs.upgrader.setUpgradeItem(j.id);
                Tabs.upgrader.repaint();
                $("#contextMenu").remove();})
                $("#contextMenu div.title").after(btn);

            $(".buttonv2.red").click(function() { $(".mediumModal").css('z-index', 120000);});
        }

    };

    // hook up our new function
    unsafeWindow.cm.ContextualMenuThrone.renderMenu = renderMenu2;

    // add some new functionality here ...
    var F2 = CM.ThronePanelView.renderPanel;

    var renderPanel2 = function(v1, v2) {
        F2(v1,v2);
        // save off this data ...
        Tabs.organizer.panelId = v2.id;
        Tabs.organizer.panelType = v1;
        Tabs.organizer.panelNextLevel = 2;

        // register some callbacks when the buttons are pushed
        addPanelCb();
    };

    // hook up to the new function
    CM.ThronePanelView.renderPanel = renderPanel2;
}

function addPanelCb() {
    // these elements get rebuilt after every click so they have to reinstall
    // themselves ...
    $("ul.tabsv2 > li:contains('enhance')").click( function() {Tabs.organizer.panelType = "enhance"; Tabs.organizer.panelNextLevel = 2; addPanelCb();});
    $("ul.tabsv2 > li:contains('upgrade')").click( function() {Tabs.organizer.panelType = "upgrade"; Tabs.organizer.panelNextLevel = 2; addPanelCb();});
}

function trMainTab (me){
    if (me.button == 2){
        var c = getClientCoords (document.getElementById('main_engagement_tabs'));
        mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
    }
}

function onUnload (){
    upgradeData.trWinPos = mainPop.getLocation();
    if (!ResetAll) saveUpgradeData();
}

function mouseMainTab (me){   // right-click on main button resets window
    // location
    if (me.button == 2){
        var c = getClientCoords (document.getElementById('main_engagement_tabs'));
        mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
    }
}

function attachTab()
{

    unsafeWindow.hideShow     = trHideShow;
    unsafeWindow.execSelect   = Tabs.upgrader.toggleSelect;
    unsafeWindow.execSalvage  = Tabs.throneSalvage.togglePower;
    unsafeWindow.execUpgrade  = Tabs.upgrader.togglePower;
    unsafeWindow.clickNext    = Tabs.organizer.showNext;

    var str = unsafeWindow.cm.FETemplates.Throne.mainThrone.replace(
            '<li id="throneStatTab" class="inactive"> Stats </li>',
    '<li id="throneStatTab" class="inactive"> Stats </li><li id="throneTest" class="inactive" onclick="hideShow()"> Controls </li><li id="trexecselect" class="inactive" onclick="execSelect()">Select</li><li id="trexecupgrade" class="inactive" onclick="execUpgrade()">Upgrade</li><li id="trexecsalvage" class="inactive" onclick="execSalvage()">Salvage</li><li id="trtimerdisp" class="inactive">Timer</li>');

    str = str.replace( '<div id="thronePanelContainer">', '<div id="thronePanelContainer" style="z-index: 101">');
    unsafeWindow.cm.FETemplates.Throne.mainThrone = str;

    unsafeWindow.cm.FETemplates.Throne.throneInfo = unsafeWindow.cm.FETemplates.Throne.throneInfo.replace (
            '<div id="throneInfoContainer">',
    '<div id="throneInfoContainer" style="z-index: 100;">');

    unsafeWindow.cm.FETemplates.Throne.mainThrone = unsafeWindow.cm.FETemplates.Throne.mainThrone.replace (
            '<div id="throneInfoContainer">',
    '<div id="throneInfoContainer" style="z-index: 100;">');

    unsafeWindow.cm.FETemplates.Throne.thronePanel = unsafeWindow.cm.FETemplates.Throne.thronePanel.replace(
            '<div class="thronePanelContainer">',
    '<div class="thronePanelContainer" style="z-index: 101;">');

    unsafeWindow.cm.FETemplates.Throne.thronePanel = unsafeWindow.cm.FETemplates.Throne.thronePanel.replace(
            '<div id="nextStatContainer" class="nextStat"><span> Next </span>',
    '<div id="nextStatContainer" class="nextStat" onclick="clickNext()"><span> Next *Click Me* </span>');
}

function trHideShow (){
    if (mainPop.toggleHide(mainPop)){
        tabManager.showTab();
        upgradeData.trWinIsOpen = true;
    } else {
        tabManager.hideTab();
        upgradeData.trWinIsOpen = false;
    }
    saveUpgradeData();
}

function hideMe (){
    mainPop.show (false);
    tabManager.hideTab();
    upgradeData.trWinIsOpen = false;
    saveUpgradeData();
}

function showMe (){
    mainPop.show (true);
    tabManager.showTab();
    upgradeData.trWinIsOpen = true;
    saveUpgradeData();
}

function AddMainTabLink(text, eventListener, mouseListener) {

    var label = "Throne Room";

    var a=document.createElement('a');
    a.className='button20';
    a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
    a.id = 'trtab';
    a.className='tab';

    var tabs=document.getElementById('main_engagement_tabs');
    if(!tabs) {
        tabs=document.getElementById('topnav_msg');
        if (tabs)
            tabs=tabs.parentNode;
    }
    if (tabs) {
        var e = tabs.parentNode;
        var gmTabs = null;
        for (var i=0; i<e.childNodes.length; i++){
            var ee = e.childNodes[i];
            if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
                gmTabs = ee;
                break;
            }
        }
        if (gmTabs == null){
            gmTabs = document.createElement('div');
            gmTabs.className='tabs_engagement';
            // gmTabs.style.background='#ca5';
            tabs.parentNode.insertBefore (gmTabs, tabs);
            gmTabs.style.whiteSpace='nowrap';
            gmTabs.style.width='735px';
            gmTabs.lang = 'en_PT';
        }
        if (gmTabs.firstChild)
            gmTabs.insertBefore (a, gmTabs.firstChild);
        else
            gmTabs.appendChild(a);
        a.addEventListener('click',eventListener, false);
        if (mouseListener != null)
            a.addEventListener('mousedown',mouseListener, true);
        return a;
    }
    return null;
}

var tabManager = {
        tabList : {},           // {name, obj, div}
        currentTab : null,

        init : function (mainDiv){
            var t = tabManager;
            var sorter = [];
            for (k in Tabs){
                if (!Tabs[k].tabDisabled){
                    t.tabList[k] = {};
                    t.tabList[k].name = k;
                    t.tabList[k].obj = Tabs[k];
                    if (Tabs[k].tabLabel != null)
                        t.tabList[k].label = Tabs[k].tabLabel;
                    else
                        t.tabList[k].label = k;
                    if (Tabs[k].tabOrder != null)
                        sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
                    else
                        sorter.push([1000, t.tabList[k]]);
                    t.tabList[k].div = document.createElement('div');
                }
            }

            sorter.sort (function (a,b){return a[0]-b[0]});
            var m = '<TABLE cellspacing=1 class=trMainTab><TR class=tabsbar style="margin-top: 15px; margin-left: 0px;">';
            for (var i=0; i<sorter.length; i++) {
                m += '<TD class=spacer></td><TD align=center class=notSel id=trtc'+ sorter[i][1].name +' ><A class="tab trTab" style="width: 100px; margin-top: 0px;"><SPAN>'+ sorter[i][1].label +'</span></a></td>';
                // m += '<TD align=center class=notSel id=trtc'+
                // sorter[i][1].name +'
                // ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
                if ((i+1)%9 == 0) m+='</tr><TR>';
            }
            m+='</tr></table>';
            // m += '<TD class=spacer width=90% align=right>'+ Version
            // +'&nbsp;</td></tr></table>';
            mainPop.getMainTopDiv().innerHTML = m;

            for (k in t.tabList) {
                if (t.tabList[k].name == upgradeData.currentTab)
                    t.currentTab =t.tabList[k] ;
                document.getElementById('trtc'+ k).addEventListener('click', this.e_clickedTab, false);
                var div = t.tabList[k].div;
                div.style.display = 'none';
                div.style.height = '100%';
                mainDiv.appendChild(div);
                try {
                    t.tabList[k].obj.init(div);
                } catch (e){
                    div.innerHTML = "INIT ERROR: "+ e;
                }
            }

            if (t.currentTab == null)
                t.currentTab = sorter[0][1];
            t.setTabStyle (document.getElementById ('trtc'+ t.currentTab.name), true);
            t.currentTab.div.style.display = 'block';
                        
            $("a.trTab").click( function () {
                  $("a.trTab").removeClass("selected");
                  $(this).addClass("selected");
               }
            );
        },

        hideTab : function (){
            var t = tabManager;
            t.currentTab.obj.hide();
        },

        showTab : function (){
            var t = tabManager;
            t.currentTab.obj.show();
        },

        setTabStyle : function (e, selected){
            if (selected){
                e.className = 'sel';
                $(e).find("a.trTab").addClass("selected");
            } else {
                e.className = 'notSel';
                $(e).find("a.trTab").removeClass("selected");
            }
        },

        e_clickedTab : function (e){
            var t = tabManager;
            var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
            if (!newTab) return;
            if (t.currentTab.name != newTab.name){
                t.setTabStyle (document.getElementById ('trtc'+ t.currentTab.name), false);
                t.setTabStyle (document.getElementById ('trtc'+ newTab.name), true);
                t.currentTab.obj.hide ();
                t.currentTab.div.style.display = 'none';
                t.currentTab = newTab;
                newTab.div.style.display = 'block';
                upgradeData.currentTab = newTab.name;
            }
            newTab.obj.show();
        },
}

function getClientCoords(e){
    if (e==null)
        return {x:null, y:null, width:null, height:null};
        var x=0, y=0;
        ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
        while (e.offsetParent != null){
            ret.x += e.offsetLeft;
            ret.y += e.offsetTop;
            e = e.offsetParent;
        }
        return ret;
}

//emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
    var headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Prototype-Version': '1.6.1',
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };
    var ajax = null;

    if (window.XMLHttpRequest)
        ajax=new XMLHttpRequest();
    else
        ajax=new ActiveXObject("Microsoft.XMLHTTP");

    if (opts.method==null || opts.method=='')
        method = 'GET';
    else
        method = opts.method.toUpperCase();

    if (method == 'POST'){
        headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (method == 'GET'){
        addUrlArgs (url, opts.parameters);
    }

    ajax.onreadystatechange = function(){
//      ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
                if (opts.onSuccess) opts.onSuccess(ajax);
                else
                    if (opts.onFailure) opts.onFailure(ajax);
        } else {
            if (opts.onChange) opts.onChange (ajax);
        }
    }

    ajax.open(method, url, true);   // always async!

    for (var k in headers)
        ajax.setRequestHeader (k, headers[k]);
    if (matTypeof(opts.requestHeaders)=='object')
        for (var k in opts.requestHeaders)
            ajax.setRequestHeader (k, opts.requestHeaders[k]);

    if (method == 'POST'){
        var a = [];
        for (k in opts.parameters){
            if(matTypeof(opts.parameters[k]) == 'object')
                for(var h in opts.parameters[k])
                    a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
            else
                a.push (k +'='+ opts.parameters[k] );
        }
        ajax.send (a.join ('&'));
    } else               {
        ajax.send();
    }
}

function MyAjaxRequest (url, o, noRetryX){
    if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
    var opts = unsafeWindow.Object.clone(o);
    var wasSuccess = o.onSuccess;
    var wasFailure = o.onFailure;
    var retry = 0;
    var delay = 10;
    var noRetry = noRetry===true?true:false;
    opts.onSuccess = mySuccess;
    opts.onFailure = myFailure;

    new AjaxRequest(url, opts);
    return;

    function myRetry(){
        ++retry;
        new AjaxRequest(url, opts);
        delay = delay * 2.25;
    }
    function myFailure(){
        var o = {};
        o.ok = false;
        o.errorMsg = "AJAX Communication Failure";
        wasFailure (o);
    }
    function mySuccess (msg){
        var rslt = eval("(" + msg.responseText + ")");
        if (!rslt)
        {
            logit("Message error: " + inspect(msg,3,1));
            return;
        }
        var x;
        if (window.EmulateAjaxError){
            rslt.ok = false;
            rslt.error_code=8;
        }
        if (rslt.ok){
            if (rslt.updateSeed)
                unsafeWindow.update_seed(rslt.updateSeed);
            wasSuccess (rslt);
            return;
        }
        rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
        // if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
        // rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
        if (!noRetry && (rslt.error_code==0 || rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
            dialogRetry (inspect(rslt.errorMsg), delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
        } else {
            wasSuccess (rslt);
        }
    }
}

//example: https://www150.kingdomsofcamelot.com
var myServerId = null;
function getServerId() {
    if (myServerId == null){
        var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
        if (m)
            myServerId = m[1];
        else
            myServerId = '??';
    }
    return myServerId;
}

function logit (msg){
    var now = new Date();
    GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

function saveUpgradeData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('UpgradeDataMM2_'+serverID, JSON2.stringify(upgradeData));}, 0);
}

function saveSalvageData (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('SalvageDataMM2_'+serverID, JSON2.stringify(salvageData));}, 0);
}

function saveUpgradeStats (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('UpgradeStats_'+serverID, JSON2.stringify(upgradeStats));}, 0);
}

function readTRGlobalOptions (){
    TRGlobalOptions = JSON2.parse (GM_getValue ('TROptions_??', '{}'));
}

function readUpgradeData (){
    var serverID = getServerId();
    s = GM_getValue ('UpgradeDataMM2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    upgradeData[k][kk] = opts[k][kk];
            else
                upgradeData[k] = opts[k];
        }
    }
}

function readSalvageData (){
    var serverID = getServerId();
    s = GM_getValue ('SalvageDataMM2_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    salvageData[k][kk] = opts[k][kk];
            else
                salvageData[k] = opts[k];
        }
    }

    // recreate the objects w/ functions
    for (k in salvageData.ruleSet)
    {
        var r = salvageData.ruleSet[k];
        var rule = new Rule(r.type, r.faction, r.conditions);
        for (j in rule.conditions)
        {
            rule.conditions[j].checkCondition = checkCondition;
        }
        salvageData.ruleSet[k] = rule;
    }
}

function readUpgradeStats (){
    var serverID = getServerId();
    s = GM_getValue ('UpgradeStats_'+serverID);
    if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
            if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                    upgradeStats[k][kk] = opts[k][kk];
            else
                upgradeStats[k] = opts[k];
        }
    }
}

function inspect(obj, maxLevels, level, doFunctions){
    var str = '', type, msg;
    if(level == null)  level = 0;
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)
        return 'Inspect Error: Levels number must be > 0';
    if(obj == null)
        return 'ERROR: Object is NULL\n';
    var indent = '';
    for (var i=0; i<level; i++)
        indent += '  ';
    for(property in obj) {
        try {
            type =  matTypeof(obj[property]);
            if (doFunctions==true && (type == 'function')){
                str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
            } else if (type != 'function') {
                str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
            }
            if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
                str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
        }
        catch(err) {
            // Is there some properties in obj we can't access? Print it red.
            if(typeof(err) == 'string') msg = err;
            else if(err.message)        msg = err.message;
            else if(err.description)    msg = err.description;
            else                        msg = 'Unknown';
            str += '(Error) ' + property + ': ' + msg +"\n";
        }
    }
    str += "\n";
    return str;
}

function matTypeof (v){
    if (typeof (v) == 'object'){
        if (!v)
            return 'null';
//      else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object
//      Array]')
        else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
            return 'array';
        else return 'object';
    }
    return typeof (v);
}


function unixTime (){
    return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}

/** ***************** Throne Savlager ********************* */

Tabs.throneSalvage = {
        tabOrder    : 200,
        tabLabel    : 'Salvage',
        tabDisabled : false,
        myDiv    : null,
        timer    : null,
        city     : null,
        cityNum  : 0,
        delItems        : [],
        rowNum   : 0,
        sTimer : null,

        init : function (div) {
            var t = Tabs.throneSalvage;
            t.myDiv = div;
            var m = '<Div><DIV id=trSalvage class=trStat>AUTOMATED SALVAGE</div>';
            m += "<div id='trInfoArea'>";
            m += '</div>';
            m += '<TABLE class=trTabDef id=trupgrader width =100% height=0% class=trTab style="padding-left: 20px;">';
            if (salvageData.salvageActive == false) {
                m += '<tr><TD><div><INPUT id=trSalvagerPower type=submit value="Salvager = OFF"/></div></td>';
            } else {
                m += '<tr><TD><div><INPUT id=trSalvagerPower type=submit value="Salvager = ON"/></div></td>';
            }
            m += '<td><b> City to put aetherstones: </b></td>';
            m += "<td><div id='trSalvageCity'></td><td></td></tr>";

            m += '<tr><td><div> Always keep: <select id="trSalvageQuality">';
            m += '<option value="1">Common</option>';
            m += '<option value="2">Uncommon</option>';
            m += '<option value="3">Rare</option>';
            m += '<option value="4">Epic</option>';
            m += '<option value="5">Wondrous</option>';
            m += '</select> and higher</div></td>';

            m += '<td>Keep the first <INPUT id=trSaveNum type=text size=3 maxlength=3 value="' + salvageData.throneSaveNum+ '"/> items</td>';
            m += '<td><div><INPUT id=trSalAnyCity type=checkbox '+ (salvageData.anyCity?' CHECKED':'') +'/> When full put stones in any city</div></td>';

            m += "</tr></table><hr>";

            m += "<div id='trRulesCreate' class='trRuleCreate'>";

            // rules definition
            m += '<TABLE class=trTabDef width=100% class=trTabPad style="padding-left: 10px;">';
            m += '<tr><td>  <b>Define the TR items to keep: </b> </td>';

            m += '<td alight="left"><div><span>Faction: <select id="trFactionType">';
            m += '  <option value="any">Any</option>';
            m += '  <option value="fey">Fey</option>';
            m += '  <option value="briton">Briton</option>';
            m += '  <option value="druid">Druid</option>';
            m += '</select></span></div></td>';
            m += '<td alight="left"><div><span>Card type: <select id="trCardType">';
            m += '  <option value="any">Any</option>';
            m += '  <option value="chair">Chair</option>';
            m += '  <option value="table">Table</option>';
            m += '  <option value="window">Window</option>';
            m += '  <option value="banner">Banner</option>';
            m += '  <option value="advisor">Advisor</option>';
            m += '  <option value="trophy">Trophy</option>';
            m += '</select></span></div></td>';
            m += '<td align="right"><INPUT id=trAddRule type=submit value="Create Rule"/></td>';
            m += '</tr></table>';
            m += '<TABLE  class=trTabPad width=100% id="trConditionTable"  style="padding-left: 5px;">';
            m += '<tr><td align=left colspan=1><INPUT id=trAddRow type=submit value="Add Row"/></td>';
            m += '<td></td><td></td><td></td><td></td><td></td></tr>';
            m += '</table>';
            m += '</div><hr/>';
            m += '<div id="trSalvStatus" style="text-align: center;" >Loading ... </div><hr/>';
            m += '<div class=trRulePane>';
            m += '<div align=center> <b> Salvager will keep items matching any of these rules </b></div><hr/>';
            m += "<div id='trRuleDisplay' style=' max-height:350px; height:250px; overflow-x: auto; overflow-y:scroll;'>";
            m += '</div></div>';
            t.myDiv.innerHTML = m;
            new CdispCityPicker ('trcitysel', document.getElementById('trSalvageCity'), true, t.e_CityButton, upgradeData.sCityNum);
            t.createRow();
            t.buildRuleDisplay();

            document.getElementById('trSaveNum').addEventListener('change', function(){
                salvageData.throneSaveNum = parseInt(document.getElementById('trSaveNum').value);
                if (upgradeData.retryInterval < 0) salvageData.throneSaveNum = 0;
                saveSalvageData();
            }, false);
            document.getElementById ('trSalvageQuality').addEventListener ('click', function() {t.setSalvageLevel(this.value);}, false);
            document.getElementById ('trSalvageQuality').value = salvageData.minQuality;

            document.getElementById ('trAddRow').addEventListener ('click', function() {t.createRow();}, false);
            document.getElementById ('trAddRule').addEventListener ('click', function() {t.createRule();}, false);

            document.getElementById('trSalAnyCity').addEventListener('change', function(){
                salvageData.anyCity = document.getElementById('trSalAnyCity').checked;
                saveSalvageData();
            }, false);

            t.start();
        },

        createRow : function()
        {
            var t = Tabs.throneSalvage;
            var table = document.getElementById('trConditionTable');
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount-1);
            var rowId = "r" + t.rowNum;
            t.rowNum++;
            row.id = rowId;

            var h  = "<td> <select id='" + rowId + "sel1'> <option value='true'> </option> <option value='false'>NOT</option></select></td>";
            h += "<td> <select id='" + rowId + "sel2'>";
            h += "  <option value='1'>1x</option>";
            h += "  <option value='2'>2x</option>";
            h += "  <option value='3'>3x</option>";
            h += "  <option value='4'>4x</option>";
            h += "  <option value='5'>5x</option>";
            h += "</select></td>";
            h += "<td> <select id='" + rowId + "sel3'>";
            h += "</select></td>";
            h += "<td> <select id='" + rowId + "sel4'>";
            h += "  <option value='e'>Either</option>";
            h += "  <option value='b'>Buff</option>";
            h += "  <option value='d'>Debuff</option>";
            h += "</select></td>";

            h += "<td> Slots: ";
            h += "  <input type=checkbox value='1' checked=true id='" + rowId + "slot1'/>1";
            h += "  <input type=checkbox value='2' checked=true id='" + rowId + "slot2'/>2";
            h += "  <input type=checkbox value='3' checked=true id='" + rowId + "slot3'/>3";
            h += "  <input type=checkbox value='4' checked=true id='" + rowId + "slot4'/>4";
            h += "  <input type=checkbox value='5' checked=true id='" + rowId + "slot5'/>5";
            h += "</td>";

            row.innerHTML = h;

            var effects = [];

            for (e in CM.thronestats.effects)
            {
                var effectName = CM.thronestats.effects[e][1].split(" Debuff")[0];
                if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }

            var select = document.getElementById(rowId + "sel3");
            for(index in effects) {
                select.options.add(new Option(effects[index], effects[index]));
            }

            var c = row.insertCell(5);
            var btn = document.createElement("input");
            btn.type = "submit";
            btn.value = "X";
            btn.onclick = function () { t.removeRow(row);};
            c.appendChild(btn);
        },

        setSalvageLevel : function(level)
        {
            salvageData.minQuality = level;
            saveSalvageData();
        },

        pickCity : function () {
            var t = Tabs.throneSalvage;
            var cid = upgradeData.sCityNum;
            if ( Seed.resources["city" + Seed.cities[cid][0]]["rec5"][0] <= salvageData.maxStones) return cid;

            if (salvageData.anyCity)
            {
                for (i= 0; i < Seed.cities.length; i++)
                {
                    if ( Seed.resources["city" + Seed.cities[i][0]]["rec5"][0] <= salvageData.maxStones) return i;
                }
            }
            return -1;
        },

        createRule : function()
        {
            var t = Tabs.throneSalvage;
            t.readRows();
            t.buildRuleDisplay();
        },

        buildRuleDisplay : function ()
        {
            var t = Tabs.throneSalvage;
            var rd = document.getElementById('trRuleDisplay');

            var m = '<TABLE  width=100% class="trTabPad">';

            for (i =0; i < salvageData.ruleSet.length; i++)
            {
                var rule = salvageData.ruleSet[i];

                m += '<tr>';
                m += "<td width=90%><div class='trRule'>";

                m += "Type: " + rule.type;
                m += " Faction: " + rule.faction;

                for (ii = 0; ii < rule.conditions.length; ii++)
                {
                    var condition = rule.conditions[ii];

                    if (ii ==0 )
                        m += "<br> Item";
                    else
                        m += "<br> <u>and</u>";

                    if (condition.mustHave != "false")
                        m += " must have ";
                    else
                        m += " must NOT have ";

                    m += condition.number + "x ";
                    m += condition.effect + " ";

                    if (condition.buffType == "b")
                        m += "buff ";
                    else if (condition.buffType == "d")
                        m += "debuff ";
                    else
                        m += "buff or debuff ";

                    m += " in slot(s): ";

                    for (j = 0; j < condition.slots.length; j++)
                    {
                        if (condition.slots[j] ) m += (j+1) + " ";
                    }

                }
                m += "</div></td>";
                m += "<td width=20%><INPUT id=trDelRule" + i + " type=submit value='Delete Rule' /></td>";
                m += '</tr>';
            }

            rd.innerHTML = m;

            for (var j=0; j < salvageData.ruleSet.length; j++)
            {
                document.getElementById('trDelRule' +j).v1 = j;
                document.getElementById('trDelRule' +j).addEventListener ('click', function() { t.deleteRule(this.v1)}, false);
            }

            document.getElementById('trSalvagerPower').addEventListener('click', function(){t.togglePower(this)} , false);

        },

        updateTRTab : function() {
            $("#trexecsalvage").html("Salvage " + (salvageData.salvageActive ? "ON" : "OFF"));
        },


        togglePower: function(obj){
            var t = Tabs.throneSalvage;
            if (salvageData.salvageActive == true) {
                var btn = document.getElementById('trSalvagerPower');
                salvageData.salvageActive = false;
                btn.value = "Salvager = OFF";
                clearInterval(t.sTimer);
            } else {
                salvageData.salvageActive = true;
                var btn = document.getElementById('trSalvagerPower');
                btn.value = "Salvager = ON";
                t.doSalvage();
                t.start();
            }
            t.updateTRTab();

            saveSalvageData();
        },

        // delete a rule from the ruleset
        deleteRule : function(i)
        {
            var t = Tabs.throneSalvage;
            salvageData.ruleSet.splice(i,1);
            saveSalvageData();
            t.buildRuleDisplay();
        },

        readRows : function()
        {
            var t = Tabs.throneSalvage;
            var table = document.getElementById('trConditionTable');
            var rowCount = table.rows.length;

            var cType = document.getElementById('trCardType').value;
            var faction = document.getElementById('trFactionType').value;

            var conditions = [];
            for (i=0; i < table.rows.length; i++)
            {
                var row = table.rows[i];
                if (row.id)
                {
                    var s1 = document.getElementById(row.id + "sel1");
                    var s2 = document.getElementById(row.id + "sel2");
                    var s3 = document.getElementById(row.id + "sel3");
                    var s4 = document.getElementById(row.id + "sel4");

                    var slots = [];
                    for (j =1; j <= 5; j++)
                    {
                        var ch = document.getElementById(row.id + "slot" + j);
                        slots.push(ch.checked);
                    }

                    var c = new Condition(s1.value, s2.value, s3.value, s4.value, slots );
                    conditions.push(c);
                }
            }
            var rule1 = new Rule(cType, faction, conditions);
            t.addRule(rule1);
        },

        removeRow : function(row)
        {
            var table = document.getElementById('trConditionTable');

            for (i=0; i < table.rows.length  ; i++ )
            {
                if (table.rows[i] == row)
                {
                    table.deleteRow(i);
                    break;
                }
            }
        },

        // add a new rule
        addRule : function(rule)
        {
            salvageData.ruleSet.push(rule);
            saveSalvageData();
        },

        // callback for when salvage city is changed
        e_CityButton : function (city, x, y){
            var t = Tabs.throneSalvage;
            upgradeData.sCityNum = city.idx;
            saveUpgradeData();
        },

        start : function(){
            var t = Tabs.throneSalvage;
            if(salvageData.salvageActive) {
                t.sTimer = setInterval(t.doSalvage, 1*60*1000);
            }
        },

        // do the actual discard of TR items
        doSalvage : function() {
            var t = Tabs.throneSalvage;
            if(!salvageData.salvageActive) {
                return;
            }

            if (t.deleting == true) return;
            t.deleting = true;
            t.setStatus('Salvaging items');        

            t.delItems = t.buildList(false);

            if (t.delItems.length > 0) {
                t.doDelete();
            } else {
                t.deleting = false;
                t.setStatus('No items to salvage.  Waiting for next cycle.');
            }
        },

        // Create the list of items to delete.
        // If 'test' is set to true, then broken/equipted items are included.
        buildList : function(test){
            var t = Tabs.throneSalvage;

            var throneSaveNum = salvageData.throneSaveNum;
            var countItem = 0;
            var retList = [];

            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                countItem++;

                // ignore these things
                if (throne_item.level !=0) continue;

                // in test mode, include these items
                // These items are at risk if they are repaired or unequiped.
                if (test != true)
                {
                    if (throne_item.isEquipped) continue;
                    if (throne_item.isBroken) continue;
                }

                // keep the first X items
                if ( countItem <= throneSaveNum) continue;

                // keep things w/ at least minQuality
                if (throne_item.quality >= salvageData.minQuality) continue;

                // check the rules
                if (t.applyRules(throne_item.id)) continue;

                // passes all tests
                retList.push(throne_item.id);
            }
            return retList;
        },

        setStatus : function(msg)
        {
            document.getElementById('trSalvStatus').innerHTML = msg;
        },

        // returns true if the item should be saved and not salvaged
        applyRules : function(id) {
            var t = Tabs.throneSalvage;
            for (r in salvageData.ruleSet)
            {
                var rule = salvageData.ruleSet[r];
                if ( rule.applyRule(id)) return true;
            }
            return false;
        },

        doDelete : function(){

            if(!salvageData.salvageActive) {
                return;
            }
            var t = Tabs.throneSalvage;
            var id = t.delItems[0];
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);


            var num_city = t.pickCity();
            if ( num_city < 0)
            {
                t.setStatus("All cities are (nearly) full of aetherstone");
                num_city = upgradeData.sCityNum;
            }

            t.setStatus('Salvaging ' + unsafeWindow.kocThroneItems[id].name);

            params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
            params.action = 'salvage';
            params.itemId = id;
            params.cityId = Seed.cities[num_city][0];

            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    var rslt = eval("(" + transport.responseText + ")");
                    var throne_item = unsafeWindow.kocThroneItems[id];
                    if(rslt.ok) {
                        trSalvageLog('Deleted Throne room item '+ throne_item.name);
                        salvageData.numSalvagedItems++;
                        saveSalvageData();

                        // temporarily set the city id
                        var tmp = unsafeWindow.currentcityid;
                        unsafeWindow.currentcityid = Seed.cities[num_city][0];
                        unsafeWindow.kocThroneItems[id].salvage();
                        unsafeWindow.currentcityid = tmp;
                    }
                    else
                    {
                        logit("salvage failed");
                        logit("rslt: " + inspect(rslt,3,1));
                        t.setStatus('Unable to salvage item ' + throne_item.name);
                        unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                        unsafeWindow.update_seed_ajax(true, function() {unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);});
                    }

                    var idx = t.delItems.indexOf(id);
                    if (idx >=0)
                    {
                        t.delItems.splice(idx,1); // Remove item from
                        // array
                        // regardless
                        // of success. Catch on next refresh
                    }
                    if (t.delItems.length > 0) { // Check if the array is
                        // empty
                        setTimeout (t.doDelete, 1200);
                    } else {
                        t.deleting = false;
                        t.setStatus('Salvaging complete.  Waiting for next cycle.');
                        return;
                    }
                },
                onFailure: function () {
                    t.delIems = [];
                    t.deleting = false;
                    logit("salvage failed for item " + unsafeWindow.kocThroneItems[id].name );
                    unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                    return;
                },
            });

        },

        show: function(){
        },

        hide: function(){
        },
}

//class definition for rules and conditions
function Rule(type, faction, conditions)
{
    this.type = type;
    this.faction = faction;
    if (conditions)
        this.conditions = conditions;
    else
        this.conditions = [];

    this.addCondition = addCondition;
    this.applyRule    = applyRule;
}

function cloneRule( rule)
{
    this.type = rule.type;
    this.faction = rule.faction;
    this.conditions = [];
    if (rule.conditions) this.conditions = rule.conditions;

    this.addCondition = addCondition;
    this.applyRule    = applyRule;
}

function addCondition(c)
{
    this.conditions.push(c);
}

function applyRule(id)
{
    var throne_item = unsafeWindow.kocThroneItems[id];

    if (this.type != "any" && (this.type != throne_item.type)) return false;
    if (this.faction != "any" && (this.faction != throne_item.faction)) return false;
    for (r in this.conditions)
    {
        if (!this.conditions[r].checkCondition(id)) return false;
    }
    return true;
}

function Condition(mustHave, number, effect, buffType, slots )
{
    this.mustHave = mustHave;
    this.number   = number;
    this.effect   = effect;
    this.buffType = buffType;
    this.slots    = slots;

    this.checkCondition = checkCondition;
}

function checkCondition(id)
{
    var numberFound  = 0;
    var effectsFound = false;
    // get card
    var throne_item = unsafeWindow.kocThroneItems[id];

    if (!throne_item) return false;

    // for loop for stat
    // count up occurances
    for (i in throne_item.effects)
    {
        var card_effect = CM.thronestats.effects[throne_item.effects[i].id][1];
        var slotid = i.split("slot")[1];

        if (!this.slots[slotid-1])
        {
            continue;
        }

        if ( (this.buffType == "e" || this.buffType == "b") && card_effect == this.effect)
        {
            numberFound++;
        }

        if ( (this.buffType == "e" || this.buffType == "d") && card_effect == (this.effect + " Debuff"))
        {
            numberFound++;
        }
    }

    if ( numberFound >= this.number)
    {
        effectsFound = true;
    }

    if (this.mustHave != "false")
        return effectsFound;
    else
        return (!effectsFound);
}



/** **************** Throne organizer ********************* */

Tabs.organizer = {
        tabOrder: 300,
        tabLabel: 'Organize',
        tabDisabled : false,
        myDiv : null,
        itemLists : [],
        itemTypes : { chair: 0, table: 1, window: 2, banner: 3, advisor: 4, trophy: 5},
        selectedItems : [],
        panelId: -1,
        panelType: "upgrade",
        panelNextLevel : 2,
        sortEffect: "none",
        sortType: "both",
        sortInactive: true,

        init : function (div){
            var t = Tabs.organizer;
            // setup the lists for tables, chairs, etc.
            t.fillLists();
            t.myDiv = div;

            // setup the tab
            var m = '<Div><DIV id=trOrganizer class=trStat style="width: 720px;">ORGANIZER</div>';

            var effects = [];
            for (e in CM.thronestats.effects)
            {
                var effectName = CM.thronestats.effects[e][1].split(" Debuff")[0];
                if (effects.indexOf(effectName) < 0) effects.push(effectName);
            }

            // m += "<div> Current preset: " + Seed.throne.activeSlot +
            // "</div>";

            // header stuff
            // m += '<TABLE id=trOrgHeader width=100% height=0% class=trTab><TR
            // align="center">';
            // m += '<TD><INPUT id=presetSelect type=submit value="Preset = "' +
            // '></td>';
            // m += '</tr>';
            // m += '<tr><td><div><br></div></td></tr></table>';

            // preset selector
            m += '<TABLE  width=90% class=trTabPad2><tr align=center><td width=50%><div><span>Preset: <select id="PresetList">';
            m += '<option value="0">--Presets--</option>';

            for (k= 1; k <= Seed.throne.slotNum; k++)
            {
                m += '<option value="'+k+'"> Preset:  '+ k +'</option>';
            }
            for (k= 1; k <= 10; k++)
            {
                m += '<option value="local'+k+'"> Local:  '+ k +'</option>';
            }

            m += '</select></span></div></td>';
            // m += '<TD width=10%><INPUT id=presetActive type=submit value="
            // Activate "/></td>';
            m += '<TD width=20%><INPUT id=testSalvage type=submit value=" Test Salvage "/></td><td id=trDelResults></td>';
            m += '</tr>';
            m += '<tr align=center><td><div><span>Sort: <select id="trSortList">';

            m += '<option value="none">--Effect--</option>';
            for (k in effects)
            {
                m += '<option value="' + effects[k] + '">'+ effects[k] +'</option>';
            }
            m += '</select></span></div></td>';

            m += "<td> <select id='trSortType'>";
            m += "  <option value='both'>Either</option>";
            m += "  <option value='buff'>Buff</option>";
            m += "  <option value='debuff'>Debuff</option>";
            m += "</select></td>";

            m += '<td><INPUT id=trSortInactive type=checkbox '+ (  t.sortInactive ?' CHECKED':'') +'/> Include Inactive</td>';
            m +='</tr></table>';

            m += "<div id='trScrollDiv' style='width: 720px; max-height:540px; height:540px; overflow-x: auto; overflow-y:scroll;'>";
            var ii = Math.max(t.itemLists['chair'].length, t.itemLists['table'].length, t.itemLists['window'].length, t.itemLists['banner'].length, t.itemLists['advisor'].length, t.itemLists['trophy'].length);

            m += "<div id='trTableDiv' style='width: 100%;'>";
            m += '<TABLE id=trDisplayTable width=100% height=0% class=trTab>';
            m += "<tr align=center><th>Chairs</th><th>Tables</th><th>Windows</th><th>Banners</th><th>Advisors</th><th>Trophies</th></tr>";
            m += '</table></div>';
            m += '</div>';
            m += '</div>';

            t.myDiv.innerHTML = m;
            t.paintTable();

            $("#PresetList").click( function() {t.selectPreset( $(this).val());});
            $("#testSalvage").click(function() {t.testSalvage();});

            // default to highlight the active preset
            t.selectPreset(Seed.throne.activeSlot);
            document.getElementById ('PresetList').value = Seed.throne.activeSlot;

            $("#trSortList").change( function () { 
                t.sortEffect = $(this).val();
                t.show();
            });

            $("#trSortType").change( function(){
                t.sortType = $(this).val();
                t.show();
            });

            $("#trSortInactive").change( function(){
                logit("change");
                t.show();
            });

        },

        showNext : function () {
            var t = Tabs.organizer;
            if (t.panelId < 0) return;
            var X = unsafeWindow.kocThroneItems[t.panelId];
            var V = "next";
            var P = t.panelType;

            var bump = t.panelNextLevel;

            if (P == "enhance")
            {
                if ( (X.quality + bump ) > 5)
                {
                    bump = 5 - X.quality;
                }
            }
            else if ( (X.level + bump) > 10)
            {
                bump =  10 - X.level;
            }

            var R = [],
            Q, Y, S, U, N = {},
            T, W;
            if (V == "next") {
                if (P == "enhance") {
                    X.quality += bump;
                    $("#nextStatContainer span").html('<span> ' + X.createPrefix() + ' </span>');
                } else {
                    if (P == "upgrade") {
                        X.level += bump;
                        $("#nextStatContainer span").html('<span> Level ' + X.level + ' </span>');
                    }
                }
            }
            $.each(X.effects, function (Z, aa) {
                Q = +(Z.split("slot")[1]);
                Y = CM.thronestats.effects[aa.id];
                S = CM.thronestats.tiers[aa.id][aa.tier];
                U = +(S.base) + ((X.level * X.level + X.level) * +(S.growth) / 2);
                U = U.toFixed(2);
                N[aa.id] = {};
                N[aa.id].percent = U;
                N[aa.id].name = Y[1];
                if (Q % 2 == 0) {
                    T = "even"
                } else {
                    T = "odd"
                }
                if (Q <= X.quality) {
                    if (U > 1) {
                        R.push("<li class='" + T + "'>" + Y[1] + " +" + U + "%</li>")
                    } else {
                        R.push("<li class='" + T + "'>" + Y[1] + " " + U + "%</li>")
                    }
                } else {
                    R.push("<li class='disabled " + T + "'>" + Y[1] + " + " + U + "%</li>")
                }
            });
            if (V == "next") {
                if (P == "enhance") {
                    X.quality -= bump
                } else {
                    if (P == "upgrade") {
                        X.level -= bump;
                    }
                }
            }
            if (V === "next") {
                if (CM.ThronePanelController.isLastLevel(X, P)) {
                    W = $("<div/>").addClass("lock").attr("id", "lockedStatIcon");
                    $("#nextStatContainer").append(W)
                } else {
                    $("#lockedStatIcon").remove()
                }
            }
            t.panelNextLevel++;
            $("#thronePanelStat2").html(R.join(""));

        },

        // highlight the items the salvager will target
        testSalvage : function() {
            var t = Tabs.organizer;
            var s = Tabs.throneSalvage;
            var toDelete = s.buildList(true);

            $('#trDelResults').html("<div> " + toDelete.length + " items targeted for deletion</div>");

            for (i =0; i < toDelete.length; i++)
            {
                var item = unsafeWindow.kocThroneItems[toDelete[i]];
                if (item.isBroken || item.isEquipped)
                {
                    t.selectCard(toDelete[i], "orange");
                }
                else
                {
                    t.selectCard(toDelete[i], "red");
                }
            }
        },

        paintTable : function() {
            // fill in the table
            var t = Tabs.organizer;
            var m = "";
            var mm;
            var tab = document.getElementById('trDisplayTable');
            var ii = Math.max(t.itemLists['chair'].length, t.itemLists['table'].length, t.itemLists['window'].length, t.itemLists['banner'].length, t.itemLists['advisor'].length, t.itemLists['trophy'].length);

            m += "<tr align=center valign=top><th width=17%>Chairs</th><th width=17%>Tables</th><th width=17%>Windows</th><th width=17%>Banners</th><th width=16%>Advisors</th><th width=16%>Throphies</th></tr>";
            for (var k= 0; k < ii ; k++)
            {
                mm = '<TR  align=left valign=top>';
                for (i in t.itemTypes)
                {
                    var item = t.itemLists[i][k];
                    var item_num = 0;
                    var id="card";
                    if (item != null)
                    {
                        id += item.id;
                        item_num = item.id;
                    }
                    mm += '<TD style="border: 4px solid white;" id="' + id +'" >';
                    mm += t.buildCard(t.itemLists[i][k]);
                    mm += '</TD>';
                }
                mm += '</TR>';
                m+= mm;
            }
            tab.innerHTML = m;
            // repair the height/width caused by the 2d transform
            var d = document.getElementById ('trTableDiv');
            var t = document.getElementById ('trDisplayTable');
            var nodes = t.getElementsByTagName('td');

            for (n=0; n < nodes.length; n++)
            {
                var d2 = nodes[n].childNodes[0];
                var h = d2.offsetHeight;
                var w = d2.offsetWidth;
                d2.style.height = (TABLE_SCALE * h) + "px";
                d2.style.width  = (TABLE_SCALE * w) + "px";
            }

            $(".trCardDisp").click( function( A){
                var theId = $(this).attr("id").split("trCardItem")[1];

                if ( $(this.tooltipDiv).length === 0) {
                    var i = document.createElement("div");
                    i.id = unsafeWindow.Tooltip.tooltipDiv;
                    i.className = "tooltipDiv";
                    document.body.appendChild(i);
                    m = $(this.tooltipDiv);
                    $(m).css(unsafeWindow.Tooltip.cssStyles);
                }
                unsafeWindow.cm.ContextualMenuThrone.renderMenu( $(this), unsafeWindow.kocThroneItems[theId]);
            });
            $("div.trCard").removeClass("blueBorder2");
            $("div#trCardItem" + upgradeData.item).find("div.trCard").addClass("blueBorder2");
            $("div.trCard").removeClass("yellowBorder2");
            $("div#trCardItem" + upgradeData.enhanceItem).find("div.trCard").addClass("yellowBorder2");
        },

        // select a kabam preset
        selectPreset : function (p)
        {
            var t = Tabs.organizer;
            // t.clearCards();
            t.clearHighlights();
            var equipedItems = Seed.throne.slotEquip[p];
            if (equipedItems != null)
            {
                for (ll =0; ll < equipedItems.length; ll++)
                {
                    t.selectCard(equipedItems[ll], "green");
                }
            }
        },

        // fill the lists w/ the current TR items
        fillLists : function ()
        {
            var t = Tabs.organizer;

            for (i in t.itemTypes)
            {
                t.itemLists[i] = new Array;
            }

            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                if (throne_item.isEquipped)
                    t.itemLists[throne_item.type].unshift(throne_item);
                else
                    t.itemLists[throne_item.type].push(throne_item);
            }
        },

        // sort the lists in the desired order
        sortLists : function ()
        {
            var t = Tabs.organizer;
            t.sortInactive = $("#trSortInactive").attr('checked');
            for (i in t.itemLists)
            {
                t.itemLists[i].sort( function (item1, item2) {
                    return t.sortValue(item2) - t.sortValue(item1);
                });
            }
        },

        sortValue : function (item)
        {
            var t = Tabs.organizer;
            var retValue = 0.0;
            for (e in item.effects)
            {
                var N = item.effects[e];
                var effect=CM.thronestats.effects[N.id][1];
                var tier=CM.thronestats.tiers[N.id][N.tier];
                var B=+(e.split("slot")[1]);

                if (B> item.quality && !t.sortInactive)
                {
                    return +retValue;
                }

                var percent=+(tier.base+((item.level*item.level+item.level)*tier.growth*0.5));  
                if ( (effect == (t.sortEffect + " Debuff")) && (t.sortType != "buff"))
                {
                    retValue -= percent;
                }
                else if (effect == t.sortEffect && t.sortType != "debuff")
                {
                    retValue += percent;
                }
            }
            return +retValue;
        },

        // clear all the highlists
        clearHighlights : function()
        {
            var t = Tabs.organizer;

            for (k in unsafeWindow.kocThroneItems)
            {
                var throne_item = unsafeWindow.kocThroneItems[k];
                t.selectCard(throne_item.id, "white");
            }

        },

        // highlight a card
        selectCard : function(itemId, color)
        {
            var t = Tabs.organizer;
            var item = unsafeWindow.kocThroneItems[itemId];

            t.selectedItems[item.type] = itemId;
            td = document.getElementById( "card"+itemId);
            if (td)
            {
                td.style.borderColor = color;
            }
        },

        clearCards : function()
        {
            var t = Tabs.organizer;
            for (k in t.selectedItems)
            {
                var td = document.getElementById( "card" + t.selectedItems[k]);
                if (td)
                {
                    td.style.borderColor = "white";
                }
            }
            t.selectedItems = [];
        },

        // create the card to display
        buildCard : function(I){
            var t = Tabs.organizer;
            var D = [];
            var w=CM.thronestats.mightByQuality;
            var z=CM.thronestats.mightByLevel;
            if (I == null)
            {
                D.push("<div>");
                D.push("</div>");
                return D.join("");
            }
            D.push("<div class='trCardDisp' id='trCardItem" + I.id + "' style='overflow: visible; position: relative; left: 0px; top: 0px; -moz-transform: scale(" + TABLE_SCALE + ", "+ TABLE_SCALE + "); -moz-transform-origin: 0% 0%;  -webkit-transform: scale(" + TABLE_SCALE + ", "+ TABLE_SCALE + ");  -webkit-transform-origin: 0% 0%;);'>");
            if (I.isBroken)
            {
                D.push(" <div class='cardOverlay semi_transparent rot45'> Broken </div>");
            }
            D.push(" <div class='trCard' style='white-space: normal; padding: 0px;'> ");
            D.push("<div class='section' style='overflow: visible;' id = 'idsection'>");
            D.push(" <div class='title "+I.createPrefix().toLowerCase()+"' style='text-transform: capitalize;'> ");
            D.push(I.name);
            D.push(" </div> ");
            D.push(" <div class='description'> ");
            D.push(" <div class='portrait "+I.faction+" "+I.type+"'> </div> ");
            D.push("<ul>");
            D.push("<li>"+uW.g_js_strings.commonstr.faction+": "+I.faction+"</li>");
            D.push("<li>"+uW.g_js_strings.commonstr.quality+": "+I.createPrefix()+"</li>");
            D.push("<li>"+uW.g_js_strings.commonstr.type+": "+I.type+"</li>");
            D.push("<li>"+uW.g_js_strings.commonstr.level+": "+I.level+"</li>");
            D.push("<li>"+uW.g_js_strings.commonstr.might+": "+(w[I.quality].Might+z[I.level].Might)+"</li>");
            D.push("</ul>");
            D.push(" </div> ");
            D.push(" <ul> ");

            for (M in I.effects)
            {
                var N = I.effects[M];
                effect=CM.thronestats.effects[N.id];
                tier=CM.thronestats.tiers[N.id][N.tier];
                percent=+(tier.base+((I.level*I.level+I.level)*tier.growth*0.5));
                percent=(percent>0)?"+"+percent:+percent;
                percent= parseFloat(percent).toFixed(2);
                // percent=Math.ceil(percent);
                css=(M%2===0)?"even":"odd";
                B=+(M.split("slot")[1]);
                if(B<=I.quality){
                    D.push(" <li class='effect "+css+"'> "+percent+"% "+effect[1]+" </li> ");
                }else{
                    D.push(" <li class='effect disabled "+css+"'> "+percent+"% "+effect[1]+" </li> ");
                }
            }
            D.push(" </ul> ");
            D.push(" </div> ");
            D.push(" </ul> ");
            D.push(" </div> ");
            D.push(" </div> ");
            return D.join("");

        },

        show: function(){
            var t = Tabs.organizer;
            t.fillLists();
            t.sortLists()
            t.paintTable();
            t.selectPreset(Seed.throne.activeSlot);
            document.getElementById ('PresetList').value = Seed.throne.activeSlot;
        },

        hide: function(){
        },
}


/** ********************************* Log Tab ********************************** */
Tabs.trActionLog = {
        tabOrder: 600,
        tabLabel : 'Log',
        myDiv : null,
        logTab : [null, null, null],
        maxEntries: 300,
        saveEntries : [[],[],[]],
        state : null,

        init : function (div){
            var t = Tabs.trActionLog;
            t.myDiv = div;
            t.myDiv.innerHTML = '<INPUT id=trupdate type=checkbox '+ (TRGlobalOptions.trUpdate?'CHECKED ':'') +'/>Check updates on userscripts.org (all domains) &nbsp; &nbsp; <INPUT id=trupdatenow type=submit value="Update Now" />\
            <DIV class=trStat>UPGRADE LOG - VERSION: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
            <TABLE cellpadding=0 cellspacing=0 id=trsuccesslog class=trTabLined><TR><TD></td><TD width=95%></td></table>\
            <DIV class=trStat>Action Log</div>\
            <TABLE cellpadding=0 cellspacing=0 id=tractionlog class=trTabLined><TR><TD></td><TD width=95%></td></table>\
            <DIV class=trStat>Salvage Log</div>\
            <TABLE cellpadding=0 cellspacing=0 id=trsalvagelog class=trTabLined><TR><TD></td><TD width=95%></td></table></div>';
            t.logTab[0]  = document.getElementById('trsuccesslog');
            t.logTab[1]  = document.getElementById('tractionlog');
            t.logTab[2]  = document.getElementById('trsalvagelog');
            t.state = 1;

            for (var j=0; j<3; j++)
            {
                var logVar = 'trlog_';
                if (j !=0)  logVar += (j + "_")
                logVar += getServerId();

                var a = JSON2.parse(GM_getValue (logVar, '[]'));

                if (matTypeof(a) == 'array'){
                    t.saveEntries[j] = a;
                    for (var i=0; i<t.saveEntries[j].length; i++)
                        t._addTab(j, t.saveEntries[j][i].msg, t.saveEntries[j][i].ts);
                }
            }

            window.addEventListener('unload', t.onUnload, false);

            document.getElementById('trupdate').addEventListener ('change', function (){
                TRGlobalOptions.trUpdate = document.getElementById('trupdate').checked;
                GM_setValue ('TROptions_??', JSON2.stringify(TRGlobalOptions));
            }, false);

            document.getElementById('trupdatenow').addEventListener ('click',
                    function() { AutoUpdater_132329.call(true,true); } ,false);

        },

        hide : function (){
        },

        show : function (){
        },

        onUnload : function (){
            var t = Tabs.trActionLog;
            if (!ResetAll) GM_setValue ('trlog_'+getServerId(),  JSON2.stringify(t.saveEntries[0]));
            if (!ResetAll) GM_setValue ('trlog_1_'+getServerId(), JSON2.stringify(t.saveEntries[1]));
            if (!ResetAll) GM_setValue ('trlog_2_'+getServerId(), JSON2.stringify(t.saveEntries[2]));
        },

        _addTab : function (lnum, msg, ts){
            var t = Tabs.trActionLog;
            if (t.state != 1)
                return;
            if (t.logTab[lnum].rows.length >= t.maxEntries)
                t.logTab[lnum].deleteRow(t.maxEntries-1);
            var row = t.logTab[lnum].insertRow(0);
            row.vAlign = 'top';
            row.insertCell(0).innerHTML = ts;
            row.insertCell(1).innerHTML = msg;
        },

        log : function (lnum, msg){
            var t = Tabs.trActionLog;
            var d = new Date();
            var ts = d.toDateString().substring(3,10) + " "+ d.toTimeString().substring(0,8);
            t._addTab (lnum, msg, ts);
            while (t.saveEntries[lnum].length >= 30)
                t.saveEntries[lnum].shift();
            t.saveEntries[lnum].push ({msg:msg, ts:ts});
        },
}

function trSuccessLog (msg){
    if (!Tabs.trActionLog.tabDisabled)
        Tabs.trActionLog.log (0,msg);
}

function trActionLog (msg){
    if (!Tabs.trActionLog.tabDisabled)
        Tabs.trActionLog.log (1,msg);
}

function trSalvageLog (msg){
    if (!Tabs.trActionLog.tabDisabled)
        Tabs.trActionLog.log(2,msg);
}

/** ***************** Throne upgrade ********************* */

Tabs.upgrader = {
        tabOrder: 100,
        tabLabel: 'Upgrade',
        tabDisabled : false,
        myDiv : null,
        timer : null,
        repairId : 0,
        repairEnd : 0,
        timerH : null,
        clearTimerH : null,

        repaint : function() {
            var t = Tabs.upgrader;
            t.init(t.myDiv);
        },

        init : function (div){
            var t = Tabs.upgrader;
            t.myDiv = div;

            // header stuff
            var m = '<Div id=trfield><DIV id=trUpgrader class=trStat>AUTOMATED UPGRADER</div><TABLE id=trupgrader width=100% height=0% class=trTab>';
            m   += '<TR>';
            if (upgradeData.active == false) {
                m += '<TD><div class=indent25><INPUT id=trUpgraderPower type=submit value="Upgrade = OFF"/></div></td>';
            } else {
                m += '<TD><div class=indent25><INPUT id=trUpgraderPower type=submit value="Upgrader = ON"/></div></td>';
            }

            if (upgradeData.enhanceAction == false) {
                m += '<TD><INPUT id=trUpgraderSelect type=submit value="Action = Upgrade"/></td>';
            } else {
                m += '<TD><INPUT id=trUpgraderSelect type=submit value="Action = Enhance"/></td>';
            }

            // retry interval entry
            m += '<td>Retry interval (seconds): <INPUT id=trUpRefresh type=text size=3 maxlength=3 value="' +upgradeData.retryInterval+ '"/></td>';
            m += '</tr>';
            m += '<tr><td><div><br></div></td></tr>';
            m+= '</table></div>';

            // upgrade selector
            m += '<TABLE id=trupdtable class=trTabPad2><tr><td width=40%><div><span>Upgrade: <select id="trUpgradeList">';
            m += '<option value="0">--Items--</option>';
            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                m += '<option value="'+k+'">'+throne_item.name+'</option>';
            }
            m += '</select></span></div></td><td width=50%></td>';
            m += '<td width=10%><div id=trUpgradeCost> <br> </div></td>';
            m += '</tr>';

            // enhance selector
            // m += '<TABLE class=trTabPad2><tr
            // align="center"><td><div><span>Enhance: <select
            // id="trEnhanceList">';
            m += '<tr><td><div><span>Enhance: <select id="trEnhanceList">';
            m += '<option value="0">--Items--</option>';
            for (k in unsafeWindow.kocThroneItems) {
                var throne_item = unsafeWindow.kocThroneItems[k];
                m += '<option value="'+k+'">'+throne_item.name+'</option>';
            }
            m += '</select></span></div></td>';
            m += '<td><div> Maximum quality: <select id="trMaxQuality">';
            m += '<option value="1">Common</option>';
            m += '<option value="2">Uncommon</option>';
            m += '<option value="3">Rare</option>';
            m += '<option value="4">Epic</option>';
            m += '<option value="5">Wondrous</option>';
            m += '</select></div></td>';
            m += '<td><div id=trEnhanceCost> </div></td></tr>';
            m += '<tr><TD><INPUT id=trSwithUpgrade type=checkbox '+ (upgradeData.switchToUpgrade?' CHECKED':'') +'/>  Switch from enchance to upgrade when complete</td>';
            m += '<td><INPUT id=trRepairAll type=checkbox '+ (upgradeData.repairAll?' CHECKED':'') +'/>  Repair all items first</td></tr>';
            m += '<tr><td colspan=3><hr></td></tr>';
            m += '  <tr><td colspan=2><div ><b>City to use aetherstones from: </b><span id="trUpgradeCity"></span></div></td>';
            m += '  <td><div id=trStoneRemain></div></td></td>';
            m += '  <tr><td><div><INPUT id=trAnyCity type=checkbox '+ (upgradeData.anyCity?' CHECKED':'') +'/> When low use from any city</div></td></tr>';
            m += '<tr><td><div>  </div></td></tr>';
            m += '<tr><td colspan=3><hr></td></tr>';
            m += '<tr align="center"><td colspan=2><div id=trLastResult class=indent25> <br> </div></td><td><a id=trpplink><img id=trpp /></a></td></tr>';
            m += '<tr align="center"><td colspan=2><div id=trUpgradeStatus class=indent25> <br> </div></td></tr>';
            // m += '<tr align=center><td colspan=2><div id=trpp></div></tr>'
            m += '</table>';

            m+='</div>';
            t.myDiv.innerHTML = m;

            $("#trpplink")
            .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FDW4NZ6PRMDMJ&lc=US&item_name=TR%20Organizer%20Donations&item_number=1001&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted')
            .attr('target', '_blank');
            $("#trpp")
            .attr( 'src', 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif')
            .attr( 'alt', 'dontae')
            .css( 'cursor', 'pointer');

            document.getElementById ('trUpgradeList').addEventListener ('click', function() {t.setUpgradeItem(this.value);}, false);
            document.getElementById ('trEnhanceList').addEventListener ('click', function() {t.setEnhanceItem(this.value);}, false);

            document.getElementById ('trMaxQuality').addEventListener ('click', function() {
                if (this.value >= 0) {
                    logit(" Enhance max set to: " + this.value);
                    upgradeData.enhanceMax = this.value;
                    saveUpgradeData();
                }
            }, false);

            document.getElementById('trUpRefresh').addEventListener('change', function(){
                upgradeData.retryInterval = parseInt(document.getElementById('trUpRefresh').value);
                if (upgradeData.retryInterval < 15) upgradeData.retryInterval = 15;
                saveUpgradeData();
            }, false);

            document.getElementById('trUpgraderPower').addEventListener('click', function(){t.togglePower(this)} , false);
            document.getElementById('trUpgraderSelect').addEventListener('click', function(){t.toggleSelect(this)} , false);

            if (unsafeWindow.kocThroneItems[upgradeData.item] != null)
            {
                document.getElementById('trUpgradeList').value = upgradeData.item;
                t.setUpgradeItem(upgradeData.item);
            }

            if (unsafeWindow.kocThroneItems[upgradeData.enhanceItem] != null)
            {
                document.getElementById('trEnhanceList').value = upgradeData.enhanceItem;
                t.setEnhanceItem(upgradeData.enhanceItem);
            }

            document.getElementById('trMaxQuality').value = upgradeData.enhanceMax;

            document.getElementById('trSwithUpgrade').addEventListener('change', function(){
                upgradeData.switchToUpgrade = document.getElementById('trSwithUpgrade').checked;
                saveUpgradeData();
            }, false);

            document.getElementById('trRepairAll').addEventListener('change', function(){
                upgradeData.repairAll = document.getElementById('trRepairAll').checked;
                saveUpgradeData();
            }, false);

            document.getElementById('trAnyCity').addEventListener('change', function(){
                upgradeData.anyCity = document.getElementById('trAnyCity').checked;
                saveUpgradeData();
            }, false);

            new CdispCityPicker ('trupcitysel', document.getElementById('trUpgradeCity'), true, t.e_CityButton, upgradeData.uCityNum);

            // wait for the current repair to finish before starting
            t.setStones(Seed.resources["city" + Seed.cities[upgradeData.uCityNum][0]]["rec5"][0]);
            t.setStatus("Loading ....");
            var d = 2 + Math.random() * 8;
            if (Seed.queue_throne != null && Seed.queue_throne.end != null)
            {
                var repairTimeLeft = Seed.queue_throne.end- unixTime();
                t.repairEnd = Seed.queue_throne.end;
                t.repairId = Seed.queue_throne.itemId;
                var n = new Date(t.repairEnd *1000);

                t.setStatus("Waiting until " + n.toLocaleTimeString() + " for repair to complete");
                // setTimeout(t.clearRepair, (repairTimeLeft+1)*1000);
                if (repairTimeLeft >0) d += repairTimeLeft;
            }

            if (t.timerH == null)
                t.timerH = setTimeout(t.doAction, d*1000);
        },

        e_CityButton : function (city, x, y){
            var t = Tabs.upgrader;
            upgradeData.uCityNum = city.idx;
            saveUpgradeData();
            t.setStones(Seed.resources["city" + Seed.cities[upgradeData.uCityNum][0]]["rec5"][0]);
        },

        setUpgradeItem : function(item)
        {
            if (item <1) item =0;
            upgradeData.item = item;
            if (item > 0 && unsafeWindow.kocThroneItems[item] != null)
            {
                logit(" Item selected to upgrade: " + item + "/" + unsafeWindow.kocThroneItems[item].name);
                var lev = unsafeWindow.kocThroneItems[item].level;
                if (lev == 10) lev =9;
                document.getElementById('trUpgradeCost').innerHTML = "<div> Cost = " + addCommas(unsafeWindow.cm.thronestats.upgrade[lev+1].Stones) + " stones</div>";
                $("ul#throneInventoryList > li > div").removeClass('blueBorder');
                $("div#throneInventoryItem" + item).addClass('blueBorder');

                $("div.trCard").removeClass("blueBorder2");
                $("div#trCardItem" + upgradeData.item).find("div.trCard").addClass("blueBorder2");
            }
            else
            {
                document.getElementById('trUpgradeCost').innerHTML = "<div></div>";
            }
            saveUpgradeData();
        },

        setEnhanceItem : function(item)
        {
            if (item <1) item =0;
            upgradeData.enhanceItem = item;

            if (item > 0 && unsafeWindow.kocThroneItems[item] != null)
            {
                logit(" Item selected to enhance: " + item + "/" + unsafeWindow.kocThroneItems[item].name);
                var q = unsafeWindow.kocThroneItems[item].quality;
                if (q == 5) q =4;
                document.getElementById('trEnhanceCost').innerHTML = "<div> Cost = " + addCommas(unsafeWindow.cm.thronestats.enhance[q+1].Stones) + " stones</div>";
            }
            else
            {
                document.getElementById('trEnhanceCost').innerHTML = "<div></div>";
            }
            $("ul#throneInventoryList > li > div").removeClass('yellowBorder');
            $("div#throneInventoryItem" + upgradeData.enhanceItem).addClass('yellowBorder');

            $("div.trCard").removeClass("yellowBorder2");
            $("div#trCardItem" + upgradeData.enhanceItem).find("div.trCard").addClass("yellowBorder2");

            saveUpgradeData();
        },

        updateTRTab : function() {
            $("#trexecupgrade").html("Upgrade " + (upgradeData.active ? "ON" : "OFF"));
        },

        updateTRSelect : function() {
            if (upgradeData.enhanceAction == false)
            {
                $("#trexecselect").html("Upgrading")
                .css("color", "blue");
            }
            else
            {
                $("#trexecselect").html("Enhancing")
                .css("color", "yellow");
            }
        },

        togglePower: function(obj){
            var t = Tabs.upgrader;
            var btn = document.getElementById('trUpgraderPower');
            if (upgradeData.active == true) {
                upgradeData.active = false;
                btn.value = "Upgrade = OFF";
                t.setStatus("Powered off");
            } else {
                upgradeData.active = true;
                btn.value = "Upgrade = ON";
                t.setStatus("Power on");
            }

            t.updateTRTab();

            if (upgradeData.active == false)
            {
                // logit("cm log: " + inspect(unsafeWindow.cm.log,3,1));
            }

            saveUpgradeData();
        },

        toggleSelect: function(obj){
            var btn = document.getElementById('trUpgraderSelect');
            var t = Tabs.upgrader;
            if (upgradeData.enhanceAction == true) {
                upgradeData.enhanceAction = false;
                btn.value = "Action = Upgrade";
            } else {
                upgradeData.enhanceAction = true;
                btn.value = "Action = Enhance";
            }
            t.updateTRSelect();
            saveUpgradeData();
        },

        setStatus : function (s)
        {
            document.getElementById('trUpgradeStatus').innerHTML = "<div>" + s + "</div>";
        },

        setResult : function (s)
        {
            document.getElementById('trLastResult').innerHTML = "<div>" + s + "</div>";
        },

        setStones : function(n)
        {
            var st = addCommas(n) + " stones";
            document.getElementById('trStoneRemain').innerHTML = "<div>" + st + "</div>";
        },

        doAction :function ()
        {
            var t = Tabs.upgrader;
            var retryTime = upgradeData.retryInterval;

            try {
                // check if repair is done
                var ti = t.clearRepair();
                if ( ti <= 0)
                {
                    // do something
                    if (upgradeData.repairAll == true)
                    {
                        for (k in unsafeWindow.kocThroneItems)
                        {
                            var throne_item = unsafeWindow.kocThroneItems[k];
                            if (throne_item.isBroken)
                            {
                                t.doRepair(throne_item.id);
                                t.timerH = setTimeout(t.doAction, retryTime*1000);
                                return;
                            }
                        }
                    }

                    if (upgradeData.enhanceAction == true)
                    {
                        // for (kk = 0; kk < 3; kk++)
                        t.doEnhance();
                    }
                    else
                    {
                        // for (jj = 0; jj < 3; jj++)
                        t.doUpgrade();
                    }
                } else {
                    // come back after repair is complete
                    retryTime = ti + 5;
                    var n = new Date(t.repairEnd *1000);
                    t.setStatus("Waiting until " + n.toLocaleTimeString() + " for repair to complete");
                }
                unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
            } catch(e) {
                logit ("exception: " + inspect(e,3,1));
            }
            // recycle
            t.timerH = setTimeout(t.doAction, retryTime*1000);
        },

        pickCity : function () {
            var t = Tabs.upgrader;
            var cid = upgradeData.uCityNum;
            if ( Seed.resources["city" + Seed.cities[cid][0]]["rec5"][0] >= upgradeData.minStones) return cid;

            if (upgradeData.anyCity)
            {
                for (i= 0; i < Seed.cities.length; i++)
                {
                    if ( Seed.resources["city" + Seed.cities[i][0]]["rec5"][0] >= upgradeData.minStones) return i;
                }
            }
            return -1;
        },

        doEnhance : function() {
            var t = Tabs.upgrader;
            var eItem = upgradeData.enhanceItem;
            try {
                if (upgradeData.active == false || upgradeData.enhanceAction == false || eItem ==0)
                {
                    t.setStatus("Powered off");
                    return;
                }
                var y = unsafeWindow.kocThroneItems[eItem];

                if (!y) return;
                if ( y.quality >= upgradeData.enhanceMax)
                {
                    t.setStatus("Enhancing complete");
                    trActionLog('Throne room item '+unsafeWindow.kocThroneItems[eItem].name + ' is already at quality ' + y.quality);

                    // switch to upgrade
                    if (upgradeData.switchToUpgrade == true && upgradeData.enhanceAction == true)
                    {
                        t.toggleSelect(document.getElementById('trUpgraderSelect'));
                    }
                    return;
                }
                if (y.isBroken)
                {
                    // repair and then try again later
                    t.doRepair(eItem);
                    return;
                }

                var num_city = t.pickCity();
                if ( num_city < 0)
                {
                    t.setStatus("Not enough aetherstones to enhance.  Minimum 100k needed.  Waiting for more ...");
                    return;
                }

                var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
                params.action = 'upgradeQuality';
                params.throneRoomItemId = eItem;
                params.buffItemId = 0;
                params.payment = "aetherstone";
                params.cityId = Seed.cities[num_city][0];

                t.setStatus("Sending enhance request");
                new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                    method: "post",
                    parameters: params,
                    loading: true,
                    onSuccess: function (transport) {
                        var rslt = eval("(" + transport.responseText + ")");
                        // logit("rslt: " + inspect(rslt,3,1));
                        if(rslt.ok){
                            Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] -= rslt.aetherstones;

                            if (rslt.success)
                            {
                                trSuccessLog('Enhanced Throne room item '+unsafeWindow.kocThroneItems[eItem].name + ' to quality ' + rslt.item.quality);
                                upgradeStats.enhanceSuccess[y.quality][y.level]++;
                                y.level = rslt.item.level;
                                y.quality = rslt.item.quality
                                y.status = rslt.item.status;
                                saveUpgradeStats();
                                y.name = y.createName();
                                t.repaint();
                                t.setResult("Enhance successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                                t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                t.setStatus("Attempting next enhancement");
                                // update the cost line
                                t.setEnhanceItem(upgradeData.enhanceItem);
                                clearTimeout(t.timerH);
                                t.doAction();
                            }
                            else
                            {
                                trActionLog('Enhance failed Throne room item '+unsafeWindow.kocThroneItems[eItem].name);
                                upgradeStats.enhanceFailure[y.quality][y.level]++;
                                y.level = rslt.item.level;
                                y.quality = rslt.item.quality
                                y.status = rslt.item.status;
                                unsafeWindow.cm.HeatUpModel.attemptCallback(+(rslt.heatupModifier));
                                saveUpgradeStats();
                                y.isBroken = true;
                                y.brokenType = "quality";
                                y.name = y.createName();
                                t.setResult("Enhance failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");
                                t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                                t.setStatus("Starting repair ...");
                                t.doRepair(y.id);
                            }
                            if (rslt.gems > 0)
                            {
                                trActionLog('Upgrader accidentally spent gems!  Turning upgrader off');
                                t.setStatus("Error ... shutting down");
                                upgradeData.active = false;
                                saveUpgradeData();
                            }
                            unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                        }
                        else
                        {
                            logit("Enhance result:" + inspect (rslt, 3, 1));
                            t.setStatus("Unable to enhance at this time ... waiting for next cycle");
                        }
                        return;
                    },
                    onFailure: function () {
                        logit("Enhance error.  Waiting for next cycle.");
                        t.setStatus("Unable to send enhance request.  Waiting for next cycle");
                        return;
                    },
                });
            } catch (e) {
                logit ("exception: "+ inspect(e,3,1));
            }
            return;
        },

        doUpgrade : function() {
            var t = Tabs.upgrader;
            var uItem = upgradeData.item;
            var y = unsafeWindow.kocThroneItems[uItem];
            if (upgradeData.active == false || upgradeData.enhanceAction == true || uItem ==0 || y == null)
            {
                t.setStatus("Powered off.");
                return;
            }
            if (y.isBroken)
            {
                // repair and then try again later
                t.doRepair(uItem);
                return;
            }
            var num_city = t.pickCity();
            if ( num_city < 0)
            {
                t.setStatus("Not enough aetherstones to upgrade.  Minimum 100k needed.  Waiting for more ...");
                return;
            }

            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
            params.action = 'upgradeLevel';
            params.throneRoomItemId = uItem;
            params.buffItemId = 0;
            params.payment = "aetherstone";
            params.cityId = Seed.cities[num_city][0];
            t.setStatus("Sending upgrade request ...");
            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    var rslt = eval("(" + transport.responseText + ")");
                    // logit("rslt: " + inspect(rslt,3,1));
                    if(rslt.ok){
                        Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0] -= rslt.aetherstones;
                        if (rslt.success)
                        {
                            trSuccessLog('Upgraded Throne room item '+unsafeWindow.kocThroneItems[uItem].name + ' to level ' + rslt.item.level);
                            upgradeStats.upgradeSuccess[y.quality][y.level]++;
                            saveUpgradeStats();
                            y.level = rslt.item.level;
                            y.quality = rslt.item.quality;
                            y.name = y.createName();
                            t.repaint();
                            t.setResult("Upgrade successful.  "  + addCommas(rslt.aetherstones) + " aetherstones used.");
                            t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                            t.setStatus("Attempting next upgrade");
                            // update the cost line
                            t.setUpgradeItem(upgradeData.item);
                            clearTimeout(t.timerH);
                            t.doAction();
                        }
                        else
                        {
                            trActionLog('Upgrade failed Throne room item '+unsafeWindow.kocThroneItems[uItem].name);
                            upgradeStats.upgradeFailure[y.quality][y.level]++;
                            saveUpgradeStats();
                            y.isBroken = true;
                            y.brokenType = "level";
                            y.status = rslt.item.status;
                            y.name = y.createName();
                            unsafeWindow.cm.HeatUpModel.attemptCallback(+(rslt.heatupModifier));
                            t.setResult("Upgrade failed.  "  + addCommas(rslt.aetherstones) + " aetherstones used");
                            t.setStones(Seed.resources["city" + Seed.cities[num_city][0]]["rec5"][0]);
                            t.setStatus("Starting repair ... ");
                            t.doRepair(uItem);  // fix item
                        }
                        unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                        if (rslt.gems > 0)
                        {
                            t.setStatus("Error .... Shutting down.");
                            trActionLog('Upgrader accidentally spent gems!  Turning upgrader off');
                            upgradeData.active = false;
                            saveUpgradeData();
                        }
                        return;
                    }
                    else
                    {
                        t.setStatus("Upgrade request not accepted.  Waiting for next cycle.");
                        logit("Upgrade result:" + inspect (rslt, 3, 1));
                    }
                    return;
                },
                onFailure: function () {
                    t.setStatus("Unable to transmitt upgrade request.  Waiting for next cycle.");
                    unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                    return;
                },
            });

            return;
        },

        doRepair : function( rItem) {
            var t = Tabs.upgrader;
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

            if (upgradeData.active == false || rItem == 0 || unsafeWindow.kocThroneItems[rItem] == null)
            {
                logit("repair is turned off");
                return;
            }
            var theItem = unsafeWindow.kocThroneItems[rItem];

            // var rItem = upgradeData.item;
            params.ctrl = 'throneRoom\\ThroneRoomServiceAjax';
            params.action = 'timeRepair';
            params.throneRoomItemId = rItem;
            params.cityId = Seed.cities[upgradeData.uCityNum][0];

            new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch53.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                loading: true,
                onSuccess: function (transport) {
                    var rslt = eval("(" + transport.responseText + ")");
                    // logit("rslt: " + inspect(rslt,3,1));
                    if(rslt.ok){
                        trActionLog('Starting repair for Throne room item '+unsafeWindow.kocThroneItems[rItem].name);
                        Seed.queue_throne.itemId= rItem;
                        Seed.queue_throne.start=unixTime();
                        Seed.queue_throne.end= rslt.eta;
                        t.repairId = rItem;
                        t.repairEnd = rslt.eta;
                        var n = new Date(t.repairEnd *1000);
                        t.setStatus("Repair begun ... Repair will be complete at " + n.toLocaleTimeString());
                        var x = rslt.eta - unixTime();
                        unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
                        t.clearTimerH = setTimeout(t.clearRepair, (x+1)*1000);
                        var item = unsafeWindow.kocThroneItems[rItem];
                        // uW.cm.ThronePanelView.clickSpeedUp(item);
                    }
                    else
                    {
                        if (rslt.msg == "Item is not broken")
                        {
                            t.setStatus("Item is repaired.");
                            t.repairId = rItem;
                            t.repairEnd = 0;
                            t.clearRepair();
                        }
                    }
                    return;
                },
                onFailure: function () {
                    logit("repair error");
                    // this usually means a repair is in progress (such as a
                    // manual
                    // repair). Grab the seed data (if possible)
                    if (Seed.queue_throne && Seed.queue_throne.Seed.queue_throne.end)
                    {
                        t.repairEnd = Seed.queue_throne.end;
                        t.repairId = Seed.queue_throne.itemId;
                    }
                    return;
                },
            });
            return;
        },

        clearRepair : function () {
            var t = Tabs.upgrader;
            var timeUntilDone = 0;

            if (t.repairEnd == 0)
            {
                return timeUntilDone;
            }
            timeUntilDone = t.repairEnd - unixTime();

            if (timeUntilDone <= 0)
            {
                // logit("clearing repair");
                if (t.repairId != 0 && unsafeWindow.kocThroneItems[t.repairId]  != null)
                {
                    if (unsafeWindow.kocThroneItems[t.repairId].isBroken == true)
                    {
                        t.setStatus("Repair time complete.");
                    }
                    unsafeWindow.kocThroneItems[t.repairId].isBroken = false;
                    unsafeWindow.kocThroneItems[t.repairId].brokenType = "";
                    t.repairId = 0;
                }

            }
            unsafeWindow.cm.ThroneView.renderInventory(unsafeWindow.kocThroneItems);
            return timeUntilDone;
        },

        show: function(){
            Tabs.upgrader.repaint();
        },

        hide: function(){
        },
};


/** ***************** Throne Enhancing Stats ********************* */

Tabs.estats = {
        tabOrder: 300,
        tabLabel: 'Enhance Stats',
        tabDisabled : false,
        myDiv : null,

        init : function (div){
            var t = Tabs.estats;
            t.myDiv = div;
            t.buildDisplay();
        },

        buildDisplay :function()   {
            var t = Tabs.estats;
            var m = '<DIV class=trstat style="margin-top:5px; margin-bottom:5px;"><DIV id=trStatsMain class=trStat>ENHANCEMENT STATISTICS</div>';
            m += '<DIV id= trStatsTabDiv align=left style="margin-top:10px; margin-bottom:10px; margin-left: 30px;">';
            m += '<TABLE class=trStatTab align=center cellspacing=0>';

            m += '<TR valign=top align=center><TH colspan=6>Enhancing Numbers  (successes/failures)</TH></TR>';

            var qstrings = new Array(uW.g_js_strings.throneRoom.simple,  uW.g_js_strings.throneRoom.common, uW.g_js_strings.throneRoom.uncommon,
                    uW.g_js_strings.throneRoom.rare,    uW.g_js_strings.throneRoom.epic,   uW.g_js_strings.throneRoom.wondrous);


            m += '<TR valign=top align=center><th></th>';
            for( q =1; q <=5; q++)
            {
                m += "<td style='font-weight: bold;' class='td" + (q%2+1) +"'  >";
                m += qstrings[q];
                m += '</td>';
            }

            m += '</tr>';


            var st = [0,0,0,0,0];
            var ft = [0,0,0,0,0];

            for (l=0; l<=10; l++)
            {
                m += '<TR valign=top align=center>';
                m += "<th>";
                if (l !=0) m += "+";
                m+=  l + '</th>';
                for( q =0; q <5; q++)
                {
                    if (upgradeStats.enhanceSuccess[q][l] == null) upgradeStats.enhanceSuccess[q][l] =0;
                    if (upgradeStats.enhanceFailure[q][l] == null) upgradeStats.enhanceFailure[q][l] =0;
                    st[q] += upgradeStats.enhanceSuccess[q][l];
                    ft[q] += upgradeStats.enhanceFailure[q][l];

                    m += "<td class='td" + (q%2) +"'  >";
                    m += upgradeStats.enhanceSuccess[q][l] + " / " + upgradeStats.enhanceFailure[q][l];
                    m += "</td>";
                }
                m += '</TR>';
            }

            m += '<TR valign=top align=center><th> Totals: </th>';
            for( q =0; q <5; q++)
            {
                m += "<td style='font-weight: bold;' class='td" + (q%2) +"'  >";
                m += st[q] + " / " + ft[q];
                m += "</td>";
            }
            m += '</TR>';

            m += '<TR valign=top align=center><th> Percents: </th>';
            for( q =0; q <5; q++)
            {
                m += "<td style='font-weight: bold;' class='td" + (q%2) +"'  >";
                if ( (st[q] + ft[q]) == 0 )
                    m += "--";
                else
                {
                    var p = (100* st[q] / (st[q] + ft[q]));
                    m += p.toFixed(2) + "%";
                }
                m += "</td>";
            }
            m += '</TR>';

            m += '</TABLE></DIV>';

            m += "<div id='trStats'></div>";
            m += '</div>';
            t.myDiv.innerHTML = m;
        },

        show: function(){
            var t = Tabs.estats;
            t.buildDisplay();
        },

        hide: function(){
        },
}

/** ***************** Throne Upgrade Stats ********************* */

Tabs.ustats = {
        tabOrder: 400,
        tabLabel: 'Upgrade Stats',
        tabDisabled : false,
        myDiv : null,

        init : function (div){
            var t = Tabs.ustats;
            t.myDiv = div;
            t.buildTab();
        },

        buildTab : function ()
        {
            var t = Tabs.ustats;
            var m = '<DIV class=trstat style="margin-top:5px; margin-bottom:5px;"><DIV id=trStatsMain2 class=trStat>UPGRADE STATISTICS</div>';
            m += '<DIV id= trStatsTabDiv2 align=left style="margin-top:10px; margin-bottom:10px; margin-left: 30px;">';
            m += '<TABLE class=trStatTab align=center cellspacing=0>';

            m += '<TR valign=top align=center><TH colspan=12>Upgrading Numbers  (successes/failures)</TH></TR>';

            var qstrings = new Array(uW.g_js_strings.throneRoom.simple,  uW.g_js_strings.throneRoom.common, uW.g_js_strings.throneRoom.uncommon,
                    uW.g_js_strings.throneRoom.rare,    uW.g_js_strings.throneRoom.epic,   uW.g_js_strings.throneRoom.wondrous);


            m += '<TR valign=top align=center><th></th>';

            for (l= 0; l<10; l++)
            {
                m += "<td style='font-weight: bold;' class='td" + (l%2) +"'  >";
                m+= "+" +(l+1) + "</td>";
            }
            m += '</TR>';
            var st = [0,0,0,0,0,0,0,0,0,0,0];
            var ft = [0,0,0,0,0,0,0,0,0,0,0];

            for( q =0; q <=5; q++)
            {
                m += '<TR valign=top align=center><th>' + qstrings[q] + '</th>';
                for (l=0; l<10; l++)
                {
                    if (upgradeStats.upgradeSuccess[q][l] == null) upgradeStats.upgradeSuccess[q][l] =0;
                    if (upgradeStats.upgradeFailure[q][l] == null) upgradeStats.upgradeFailure[q][l] =0;
                    st[l] += upgradeStats.upgradeSuccess[q][l];
                    ft[l] += upgradeStats.upgradeFailure[q][l];

                    m += "<td class='td" + (l%2) +"'  >";
                    m += upgradeStats.upgradeSuccess[q][l] + " / " + upgradeStats.upgradeFailure[q][l];
                    m += "</td>";
                }
                m += '</TR>';
            }

            m += '<TR valign=top align=center><th> Totals: </th>';
            for( l =0; l<10; l++)
            {
                m += "<td style='font-weight: bold;' class='td" + (l%2) +"'  >";
                m += st[l] + " / " + ft[l];
                m += "</td>";
            }
            m += '</TR>';

            m += '<TR valign=top align=center><th> Percents: </th>';
            for( l =0; l <10; l++)
            {
                m += "<td style='font-weight: bold;' class='td" + (l%2) +"'  >";
                if ( (st[l] + ft[l]) == 0 )
                    m += "--";
                else
                {
                    var p = (100* st[l] / (st[l] + ft[l]));
                    m += p.toFixed(2) + "%";
                }
                m += "</td>";
            }
            m += '</TR>';

            m += '</TABLE></DIV>';

            m += "<div id='trStats2'></div>";
            m += '</div>';
            t.myDiv.innerHTML = m;

        },

        show: function(){
            var t = Tabs.ustats;
            t.buildTab();
        },

        hide: function(){
        },
}


var WinManager = {
        wins : {},    // prefix : trPopup obj
        didHide : [],


        get : function (prefix){
            var t = WinManager;
            return t.wins[prefix];
        },

        add : function (prefix, pop){
            var t = WinManager;
            t.wins[prefix] = pop;
            if (unsafeWindow.cpopupWins == null)
                unsafeWindow.cpopupWins = {};
            unsafeWindow.cpopupWins[prefix] = pop;
        },

        hideAll : function (){
            var t = WinManager;
            t.didHide = [];
            for (k in t.wins){
                if (t.wins[k].isShown()){
                    t.didHide.push (t.wins[k]);
                    t.wins[k].show (false);
                }
            }
        },
        restoreAll : function (){
            var t = WinManager;
            for (var i=0; i<t.didHide.length; i++)
                t.didHide[i].show (true);
        },

        delete : function (prefix){
            var t = WinManager;
            delete t.wins[prefix];
            delete unsafeWindow.cpopupWins[prefix];
        }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
    var t=this;
    this.setEnable = setEnable;
    this.setBoundRect = setBoundRect;
    this.debug = debug;
    this.dispEvent = dispEvent;
    this.lastX = null;
    this.lastY = null;
    this.enabled = true;
    this.moving = false;
    this.theDiv = movingDiv;
    this.body = document.body;
    this.ce = clickableElement;
    this.moveHandler = new CeventMove(this).handler;
    this.outHandler = new CeventOut(this).handler;
    this.upHandler = new CeventUp(this).handler;
    this.downHandler = new CeventDown(this).handler;
    this.clickableRect = null;
    this.boundRect = null;
    this.bounds = null;
    this.enabled = false;
    if (enabled == null)
        enabled = true;
    this.setEnable (enabled);

    function setBoundRect (b){    // this rect (client coords) will not go
        // outside
        // of current body
        this.boundRect = boundRect;
        this.bounds = null;
    }

    function setEnable (enable){
        if (enable == t.enabled)
            return;
        if (enable){
            clickableElement.addEventListener('mousedown',  t.downHandler, false);
            t.body.addEventListener('mouseup', t.upHandler, false);
        } else {
            clickableElement.removeEventListener('mousedown', t.downHandler, false);
            t.body.removeEventListener('mouseup', t.upHandler, false);
        }
        t.enabled = enable;
    }

    function CeventDown (that){
        this.handler = handler;
        var t = that;
        function handler (me){
            if (t.bounds == null){
                t.clickableRect = getClientCoords(clickableElement);
                t.bodyRect = getClientCoords(document.body);
                if (t.boundRect == null)
                    t.boundRect = t.clickableRect;
                t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
            }
            if (me.button==0 && t.enabled){
                t.body.addEventListener('mousemove', t.moveHandler, true);
                t.body.addEventListener('mouseout', t.outHandler, true);
                t.lastX = me.clientX;
                t.lastY = me.clientY;
                t.moving = true;
            }
        }
    }

    function CeventUp  (that){
        this.handler = handler;
        var t = that;
        function handler (me){
            if (me.button==0 && t.moving)
                _doneMoving(t);
        }
    }

    function _doneMoving (t){
        t.body.removeEventListener('mousemove', t.moveHandler, true);
        t.body.removeEventListener('mouseout', t.outHandler, true);
        t.moving = false;
    }

    function CeventOut  (that){
        this.handler = handler;
        var t = that;
        function handler (me){
            if (me.button==0){
                t.moveHandler (me);
            }
        }
    }

    function CeventMove (that){
        this.handler = handler;
        var t = that;
        function handler (me){
            if (t.enabled && !t.wentOut){
                var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
                var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
                if (newTop < t.bounds.top){     // if out-of-bounds...
                    newTop = t.bounds.top;
                    _doneMoving(t);
                } else if (newLeft < t.bounds.left){
                    newLeft = t.bounds.left;
                    _doneMoving(t);
                } else if (newLeft > t.bounds.right){
                    newLeft = t.bounds.right;
                    _doneMoving(t);
                } else if (newTop > t.bounds.bot){
                    newTop = t.bounds.bot;
                    _doneMoving(t);
                }
                t.theDiv.style.top = newTop + 'px';
                t.theDiv.style.left = newLeft + 'px';
                t.lastX = me.clientX;
                t.lastY = me.clientY;
            }
        }
    }

    function debug  (msg, e){
        logit ("*************** "+ msg +" ****************");
        logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
        logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
        logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
    }

    function dispEvent (msg, me){
        logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
    }
}


//creates a 'popup' div
//prefix must be a unique (short) name for the popup window
function trPopup (prefix, x, y, width, height, enableDrag, onClose) {
    var pop = WinManager.get(prefix);
    if (pop){
        pop.
        (false);
        return pop;
    }
    // this.BASE_ZINDEX = 100402; // value should put it in front of the TR and
    // behind the salvage popup
    this.BASE_ZINDEX = 111111;

    // protos ...
    this.show = show;
    this.toggleHide = toggleHide;
    this.getTopDiv = getTopDiv;
    this.getMainTopDiv = getMainTopDiv;
    this.getMainDiv = getMainDiv;
    this.getLayer = getLayer;
    this.setLayer = setLayer;
    this.setEnableDrag = setEnableDrag;
    this.getLocation = getLocation;
    this.setLocation = setLocation;
    this.focusMe = focusMe;
    this.isShown = isShown;
    this.unfocusMe = unfocusMe;
    this.centerMe = centerMe;
    this.destroy = destroy;
    this.autoHeight = autoHeight;

    // object vars ...
    this.div = document.createElement('div');
    this.prefix = prefix;
    this.onClose = onClose;

    var t = this;
    this.div.className = 'trPopup '+ prefix +'_trPopup';
    this.div.id = prefix +'_outer';
    // this.div.style.background = "#fff";
    this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
    this.div.style.display = 'none';
    this.div.style.width = width + 'px';
    this.div.style.height = height + 'px';
    this.div.style.maxHeight = height + 'px';
    this.div.style.overflowY = 'show';
    this.div.style.position = "absolute";
    this.div.style.top = y +'px';
    this.div.style.left = x + 'px';
    this.div.style.padding = '5px 9px 0px 9px';

    if (trPopUpTopClass==null)
        topClass = 'trPopupTop '+ prefix +'_trPopupTop';
    else
        topClass = trPopUpTopClass +' '+ prefix +'_'+ trPopUpTopClass;
 
    var m = '<TABLE class=trTabDef cellspacing=0 width=100% height=100%>';
    m += '<TR vAlign=top id="'+ prefix +'_bar" class="'+ topClass +'"><td><div class="trTitle">Throne Room Organizer</div></td><TD><div id='+ prefix +'_X align=right valign=top onmouseover="this.style.cursor=\'pointer\'" class=trCloseSpan> </span></td></tr>';
    m += '<tr><td colspan=2 id="'+ prefix +'_top"></td></tr>';
    m += '<TR><TD colspan=2 height=100% valign=top class="trPopMain '+ prefix +'_trPopMain" id="'+ prefix +'_main"></td></tr>';
    m += '<tr><td colspan=2><div id=tr_footer></div></td>';
    m += '</tr></table>';
    
    document.body.appendChild(this.div);
    this.div.innerHTML = m;
    document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
    this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

    this.div.addEventListener ('mousedown', e_divClicked, false);
    WinManager.add(prefix, this);

    function e_divClicked (){
        t.focusMe();
    }
    function e_XClose (){
        t.show(false);
        if (t.onClose != null)
            t.onClose();
    }
    function autoHeight (onoff){
        if (onoff)
            t.div.style.height = '';
        else
            t.div.style.height = t.div.style.maxHeight;
    }
    function focusMe (){
        t.setLayer(5);
        for (k in unsafeWindow.cpopupWins){
            if (k != t.prefix)
                unsafeWindow.cpopupWins[k].unfocusMe();
        }
    }
    function unfocusMe (){
        t.setLayer(-5);
    }
    function getLocation (){
        return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
    }
    function setLocation (loc){
        t.div.style.left = loc.x +'px';
        t.div.style.top = loc.y +'px';
    }
    function destroy (){
        document.body.removeChild(t.div);
        WinManager.delete (t.prefix);
    }
    function centerMe (parent){
        if (parent == null){
            var coords = getClientCoords(document.body);
        } else
            var coords = getClientCoords(parent);
        var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
        var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
        if (x<0)
            x = 0;
        if (y<0)
            y = 0;
        t.div.style.left = x +'px';
        t.div.style.top = y +'px';
    }
    function setEnableDrag (tf){
        t.dragger.setEnable(tf);
    }
    function setLayer(zi){
        t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
    }
    function getLayer(){
        return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
    }
    function getTopDiv(){
        return document.getElementById(this.prefix+'_top');
    }
    function getMainDiv(){
        return document.getElementById(this.prefix+'_main');
    }
    function getMainTopDiv(){
        return document.getElementById(this.prefix+'_top');
    }
    function isShown (){
        return t.div.style.display == 'block';
    }
    function show(tf){
        if (tf){
            t.div.style.display = 'block';
            t.focusMe ();
        } else {
            t.div.style.display = 'none';
        }
        return tf;
    }
    function toggleHide(t){
        if (t.div.style.display == 'block') {
            return t.show (false);
        } else {
            return t.show (true);
        }
    }
}


//onClick (city{name, id, x, y}, x, y) city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
    function CcityButHandler (t){
        var that = t;
        this.clickedCityBut = clickedCityBut;
        function clickedCityBut (e){
            if (that.selected != null)
                that.selected.className = "castleBut castleButNon";
            that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
            if (that.dispName)
                document.getElementById(that.id+'cname').innerHTML = that.city.name;
            e.target.className = "castleBut castleButSel";
            that.selected = e.target;
            if (that.coordBoxX){
                that.coordBoxX.value = that.city.x;
                that.coordBoxY.value = that.city.y;
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent('change', true, true ); // event
                // type,bubbling,cancelable
                that.coordBoxX.dispatchEvent(evt);
                that.coordBoxY.dispatchEvent(evt);
                that.coordBoxX.style.backgroundColor = '#ffffff';
                that.coordBoxY.style.backgroundColor = '#ffffff';
            }
            if (that.notify != null)
                that.notify(that.city, that.city.x, that.city.y);
        }
    }

    function selectBut (idx){
        document.getElementById(this.id+'_'+idx).click();
    }

    function bindToXYboxes (eX, eY){
        function CboxHandler (t){
            var that = t;
            this.eventChange = eventChange;
            if (that.city){
                eX.value = that.city.x;
                eY.value = that.city.y;
            }
            function eventChange (){
                var xValue=that.coordBoxX.value.trim();
                var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);
                if(xI) {
                    that.coordBoxX.value=xI[1]
                    that.coordBoxY.value=xI[2]
                }
                var x = parseInt(that.coordBoxX.value, 10);
                var y = parseInt(that.coordBoxY.value, 10);
                if (isNaN(x) || x<0 || x>750){
                    that.coordBoxX.style.backgroundColor = '#ff8888';
                    return;
                }
                if (isNaN(y) || y<0 || y>750){
                    that.coordBoxY.style.backgroundColor = '#ff8888';
                    return;
                }
                that.coordBoxX.style.backgroundColor = '#ffffff';
                that.coordBoxY.style.backgroundColor = '#ffffff';
                if (that.notify != null)
                    that.notify (null, x, y);
            }
            return false;
        }
        this.coordBoxX = eX;
        this.coordBoxY = eY;
        var bh = new CboxHandler(this);
        eX.maxLength=8;
        eY.maxLength=3;
        eX.style.width='2em';
        eY.style.width='2em';
        eX.addEventListener('change', bh.eventChange, false);
        eY.addEventListener('change', bh.eventChange, false);
    }

    this.selectBut = selectBut;
    this.bindToXYboxes = bindToXYboxes;
    this.coordBoxX = null;
    this.coordBoxY = null;
    this.id = id;
    this.dispName = dispName;
    this.prefixLen = id.length+1;
    this.notify = notify;
    this.selected = null;
    this.city = null;
    var m = '';
    for (var i=0; i<Cities.cities.length; i++)
        m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit />';
    if (dispName)
        m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
    span.innerHTML = m;
    var handler = new CcityButHandler(this);
    for (var i=0; i<Cities.cities.length; i++)
        document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
    if (selbut != null)
        this.selectBut(selbut);
};

function setCities(){
    Cities.numCities = Seed.cities.length;
    Cities.cities = [];
    Cities.byID = {};
    for (i=0; i<Cities.numCities; i++){
        city = {};
        city.idx = i;
        city.id = parseInt(Seed.cities[i][0]);
        city.name = Seed.cities[i][1];
        city.x = parseInt(Seed.cities[i][2]);
        city.y = parseInt(Seed.cities[i][3]);
        city.tileId = parseInt(Seed.cities[i][5]);
        city.provId = parseInt(Seed.cities[i][4]);
        // getTroopDefTrainEstimates('city'+ city.id, city);
        Cities.cities[i] = city;
        Cities.byID[Seed.cities[i][0]] = city;
    }
}

function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/** *********** Updater code ************ */
//Function for displaying a confirmation message modal popup similar to the
//default javascript confirm() function
//but with the advantage being that it won't halt all other javascript being
//executed on the page.
//Original Author: Thomas Chapin (April 6, 2011)
function display_confirm(confirm_msg,ok_function,cancel_function){
    if(!confirm_msg){confirm_msg="";}

    var container_div = document.getElementById('modal_js_confirm');
    var div;
    if(!container_div) {
        container_div=document.createElement('div');
        container_div.id='modal_js_confirm';
        container_div.style.position='absolute';
        container_div.style.top='0px';
        container_div.style.left='0px';
        container_div.style.width='100%';
        container_div.style.height='1px';
        container_div.style.overflow='visible';
        container_div.style.zIndex=2000005;

        div=document.createElement('div');
        div.id='modal_js_confirm_contents';
        div.style.zIndex=2000005;
        div.style.backgroundColor='#eee';
        div.style.fontFamily='"lucida grande",tahoma,verdana,arial,sans-serif';
        div.style.fontSize='11px';
        div.style.textAlign='center';
        div.style.color='#333333';
        div.style.border='2px outset #666';
        div.style.padding='10px';
        div.style.position='relative';
        div.style.width='300px';
        div.style.height='100px';
        div.style.margin='300px auto 0px auto';
        div.style.display='block';

        container_div.appendChild(div);
        document.body.appendChild(container_div);

        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK to continue.</div><br><button id="modal_js_confirm_ok_button">OK</button> <button id="modal_js_confirm_cancel_button">Cancel</button></div>';
        var ok_button = document.getElementById('modal_js_confirm_ok_button');
        ok_button.addEventListener('click',function() {
            if(ok_function && typeof(ok_function) == "function"){
                ok_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
        var cancel_button = document.getElementById('modal_js_confirm_cancel_button');
        cancel_button.addEventListener('click',function() {
            if(cancel_function && typeof(cancel_function) == "function"){
                cancel_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
    }
}

//The following code is released under public domain.

var AutoUpdater_132329 = {
        id: 132329,
        days: 1,   // check every 1 day
        name: "KOC Throne Room Organizer",
        version: Version,
        time: new Date().getTime(),
        call: function(response, secure) {
            logit("checking version");
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
                onload: function(xpr) {AutoUpdater_132329.compare(xpr, response);},
                onerror: function(xpr) {if (secure) AutoUpdater_132329.call(response, false);}
            });
        },
        enable: function() {
            GM_registerMenuCommand("Enable "+this.name+" updates", function() {
                GM_setValue('updated_132329', new Date().getTime()+'');
                AutoUpdater_132329.call(true, true)
            });
        },
        compareVersion: function(r_version, l_version) {
            var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
            for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
                r = +(r_parts[i] || '0');
                l = +(l_parts[i] || '0');
            }
            return (r !== l) ? r > l : false;
        },
        compare: function(xpr,response) {
            this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
            this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);

            if ( (this.xversion) && (this.xname[1] == this.name) ) {
                this.xversion = this.xversion[1];
                this.xname = this.xname[1];
            } else {
                if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) {
                    // GM_setValue('updated_132329', 'off');
                }
                return false;
            }

            var updated = this.compareVersion(this.xversion, this.version);

            if ( updated ) {
                display_confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?',
                        // Ok
                        function(){
                    try {
                        location.href = 'https://userscripts.org/scripts/source/132329.user.js';
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_132329.xversion ) {
                        if(confirm('Do you want to turn off auto updating for this script?')) {
                            // GM_setValue('updated_132329', 'off');
                            TRGlobalOptions.trUpdate = false;
                            GM_setValue ('TROptions_??', JSON2.stringify(TRGlobalOptions));
                            AutoUpdater_132329.enable();
                            alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                        }
                    }
                }
                );

            } else if (response){
                alert('No updates available for '+this.name);
            }
        },
        check: function(tf) {
            if (!tf){
                this.enable();
            } else {
                // convert days to milliseconds and compare
                if (+this.time > (+GM_getValue('updated_132329', 0) + 1000*60*60*24*this.days)) {
                    GM_setValue('updated_132329', this.time+'');
                    this.call(false, true);
                }
                GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                    GM_setValue('updated_132329', new Date().getTime()+'');
                    AutoUpdater_132329.call(true, true)
                });
            }
        }
};

readTRGlobalOptions();

//even though Scriptish provides its own update mechanism (GM_updatingEnbled ==
//true), lets us this method.
if (typeof(GM_xmlhttpRequest) !== 'undefined' /*
 * && typeof(GM_updatingEnabled)
 * === 'undefined'
 */) {
    try {
        if (unsafeWindow.frameElement === null) {
            AutoUpdater_132329.check(TRGlobalOptions.trUpdate);
        }
    } catch(e) {
        AutoUpdater_132329.check(TRGlobalOptions.trUpdate);
    }
}


/** ******* End updater code ************ */

trStartup ();

