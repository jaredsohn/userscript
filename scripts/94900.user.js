// ==UserScript==
// @name           3gokushi-Beyond
// @namespace      3gokushi-hatt
// @description    ブラウザ三国志用便利機能色々ごった煮(No Pop-up) by hatt+ろむ+yen+α
// @include        http://*.3gokushi.jp/*
// @author         hatt,romer,yen,etc...
// @version        1.27.2.7
// @require        http://usocheckup.redirectme.net/94900.js
// ==/UserScript==
//
// FireFox / Google Chrome対応です。
// ver1.00 2010.03.19
// ver1.01 2010.03.20
// ver1.02 2010.03.20
// ver1.03 2010.03.21
// ver1.10 2010.03.22
// ver1.11 2010.03.23
// ver1.12 2010.03.25
// ver1.13 2010.03.26
// ver1.14 2010.03.27
// ver1.15 2010.03.28
// ver1.16 2010.03.29
// ver1.17 2010.03.31
// ver1.18 2010.04.02
// ver1.19 2010.04.05
// ver1.20 2010.04.08
// ver1.21 2010.04.09
// ver1.22 2010.04.13
// ver1.23 2010.04.19
// ver1.24 2010.04.28
// ver1.25 2010.05.02
// ver1.26 2010.05.10
// ver1.27 2010.05.
// ver1.27.0.1 2010.08.19
// ver1.27.0.2 2010.09.21
// ver1.27.0.4 2010.09.22
// ver1.27.1.0 2010.09.23
// ver1.27.1.2 2010.09.24
// ver1.27.1.4 2010.09.25
// ver1.27.1.7 2010.09.26
// ver1.27.2.2 2010.09.29
// ver1.27.2.3 2010.10.01
// ver1.27.2.4 2010.10.02
// ver1.27.2.5 2010.10.07
// ver1.27.2.6 2010.10.12
// ver1.27.2.7 2011.1.18 disabled annoying alert messages
( function(){

if(document.getElementById("beyond_basepanel") ) return ;

var VERSION_NAME = "ブラウザ三国志Beyond Ver1.27.2.7 by hatt+ろむ+yen+α";
var IMG_DIR = "/20100510-01/img/";

///////////////////////////////////////////////
//Chrome用GM_関数
// @copyright      2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    };

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    };

    GM_log = function(message) {
        if (window.opera) {
            opera.postError(message);
            return;
        }
        console.log(message);
    };

     GM_registerMenuCommand = function(name, funk) {
    //todo
    };

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    };
}
///////////////////////////////////////////////


///////////////////////////////////////////////
//配列のindexOf対策
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(dc,e,f) { if (!dc) return; dc.addEventListener(e, f, false); };
var isNarrow = location.host.match(/^[m|y]\d+\./i) ? true : false;

var MAP_X_MIN = -600;
var MAP_X_MAX = 600;
var MAP_Y_MIN = -600;
var MAP_Y_MAX = 600;

var OPT_VILLAGE = 0;
var OPT_BASELINK = 0;
var OPT_MAPLINK = 0;
var OPT_XYLINK = 0;
var OPT_XYLINK_NK = 0;
var OPT_LARGEICON = 0;
var OPT_TTBL = 0;
var OPT_MEMO = 0;

var OPT_DETAILS = 1;
var OPT_DETAILS_UP = 1;
var OPT_DECK = 1;
var OPT_DECK_SET = 0;

var OPT_CTIME_B = 1;
var OPT_CTIME_U = 1;

var OPT_ALLY = 1;
var OPT_ALLY_IS = 1;
var OPT_ALLY_XY = 0;
var OPT_ALLY_CSV = 0;

var OPT_RES_T = 0;
var OPT_RES_TIME = 0;
var OPT_REMOVELIST = 1;
var OPT_MAPLIST = 1;

var OPT_TTDISTANCE = 1;
var OPT_TTDISTANCE_ITEMS = new Array();

var OPT_TTALLYPRSN = 1;

var OPT_MEMO_FONT_SIZE = "10";
var OPT_MEMO_WIDTH = "20";
var OPT_MEMO_HEIGHT = "5";
var OPT_MEMO_COUNT = "1";

var OPT_MAPLINK_FONT_SIZE = "10";

var OPT_USER_STAR = 1;
var OPT_USER_LEVEL = 1;
//var OPT_REPORT_NP = 0;

var OPT_MAPCENTER = 0;
var OPT_TBREST = 0;
var OPT_DELMSG = 0;
var OPT_TSENDTIME = 0;
var OPT_SMALLBTN = 0;
var OPT_ATTACKMAP = 0;
var OPT_CARD_CMB = 0;

var OPT_PIKA_YOROZU = 0;
var OPT_PIKA_HPREST = 0;
var OPT_PIKA_MAPHELP = 0;
var OPT_PIKA_TRDHELP = 0;
var OPT_PIKA_BLINKBLD = 0;

var OPT_SUZAN_SEISAN = 0;

var OPT_CASTLE_AID = 0;
var OPT_NEXT_MEISEI = 0;
var OPT_TIMER_LINK_DEPOT = 0;

if (isNarrow) {
    var OPT_VILLAGE_LIST_BOX = 0;
}

var g_MD;
var g_MX;
var g_MY;

var BASE_X = -9999;
var BASE_Y = -9999;

var USER_ID = "";
var ALLY_ID = "";

var RES_NOW = [];
var RES_MAX = [];
var RES_GROW = [];
var RES_GROW_W = [];
var RES_GROW_B = [];

var PRE_LOAD_NODES = {};
var URL_PARAM = {};

var Pika_elementQueue = [];

var VILLAGES_INFO= {};

var SID = '';

if( !initPanel() ) return;

initUrlParams();
initStyle();
initPreLoadNode();
initResources();
getMyInfo();
loadOptions();
initImages();
disp_Options();

initVillages();
initCastleSend();

if (isNarrow) initNarrow();


if ( isNarrow && OPT_VILLAGE_LIST_BOX )  disp_villageListBox();

if( OPT_VILLAGE )   disp_village();
if( OPT_BASELINK )  disp_baseLink();
if( OPT_MAPLINK )   disp_mapLink();
if( OPT_MEMO )      disp_memo();
if( OPT_ALLY )      disp_AllianceInfo();//XYリンク加工前に呼ぶ
if( OPT_XYLINK )    disp_XYLink();
if( OPT_TTBL )      disp_TTable();
if( OPT_DETAILS )   disp_Details();
if( OPT_DECK )      disp_Deck();
if( OPT_CTIME_B )   disp_CompleteTimeBuild();
if( OPT_CTIME_U )   disp_CompleteTimeUnit();
if( OPT_RES_T )     disp_ResourcesTotal();
if( OPT_RES_TIME )  disp_ResourcesTime();
if( OPT_REMOVELIST) disp_RemoveList();
if( OPT_MAPLIST)    disp_MapList();

if( OPT_USER_STAR)  disp_UserStar();
if( OPT_USER_LEVEL) disp_UserLevel();
//if( OPT_REPORT_NP)    disp_ReportNextPrior();
if( OPT_MAPCENTER)  disp_MapCenter();
if( OPT_TBREST)     disp_ToubatsuRestTime();
if( OPT_DELMSG)     disp_DeleteMessages();
if( OPT_TSENDTIME)  disp_TSendTime();
if( OPT_SMALLBTN)   disp_SmallButton();
if( OPT_ATTACKMAP)  disp_AttackMap();
if( OPT_CARD_CMB)   disp_CardCombine();
if( OPT_PIKA_YOROZU ) disp_PikaYorozu();
if( OPT_PIKA_HPREST ) disp_PikaHPRestTime();
if( OPT_PIKA_MAPHELP ) Pika_installMapXYHelper();
if( OPT_PIKA_TRDHELP ) Pika_installTradeHelper();

if( OPT_SUZAN_SEISAN ) disp_SuzanSeisan();

if ( OPT_CASTLE_AID ) disp_castleAidLink();
if ( OPT_NEXT_MEISEI ) disp_nextFameTimer();
if ( OPT_TIMER_LINK_DEPOT ) disp_timerLinkDepot();

if( OPT_TTALLYPRSN) disp_ToolTipsAllyPerson();
if( OPT_TTDISTANCE) disp_ToolTipsDistance();

csortSideBox();
crenumberSideBox();
Pika_blinkElements();


//////////////////////
//イメージ初期化
//////////////////////
var img_mura, img_map, img_naisei, img_ken, img_hanma, img_user, img_mail;
function initImages()
{
    if( !OPT_LARGEICON ) {
        img_mura = 'data:image/gif;base64,'+
                'R0lGODlhCgAKAKIAAAAAAP/M/7Jlf2YAAMaAoLpxjceAoQAAACH5BAQUAP8ALAAAAAAKAAoAAAMd'+
                'CBDcumE0CeOcI2vJMunYYICgZDalwEFcQSkooyQAOw==';


        img_map = 'data:image/gif;base64,'+
                'R0lGODlhCgAKAJEAAAAAAP//zAAAmSAgGiH5BAQUAP8ALAAAAAAKAAoAAAIaBIJplz0hRItISojx'+
                'tbXuDn3ZFDANMhhnCRQAOw==';


        img_naisei = 'data:image/gif;base64,'+
                'R0lGODlhCgAKALMAAAAAAMPS5HWOi5kAZktYU7yw0BogILmjyMz//8LP4r641MXb6QAAAAAAAAAA'+
                'AAAAACH5BAQUAP8ALAAAAAAKAAoAAAQnEBiEBkUGgGsvqUMockgxKBWnDMewdKA1UkNwJTBMU9vl'+
                'CxofDxABADs=';

        img_ken = 'data:image/gif;base64,'+
                'R0lGODlhCgAKALMAAAAAALS0tE48PP///42NjTMzM+Li4nx8fBgAACYPD5mZmQkJCUZGRru7u+jo'+
                '6AAAACH5BAQUAP8ALAAAAAAKAAoAAAQkECBAq5C1qrEyIMPQUAMZllRwhtlinB4De+ExBFniFKQ3'+
                '+YAIADs=';
        img_hanma = 'data:image/gif;base64,'+
                'R0lGODlhCgAKAOYAAP////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pb29vX19fLy8vHx8fDw8O/v7+/u'+
                '7u3t7ezs7Obm5uLi4tra2tbW1tTU1NPT09LR0cjIyLq6ura0tLKysrCwsKmoqI+JiWxsbGdmZlVV'+
                'VUpKSkhFRUFBQUJBQT8/Py4uLiwsLCgoKCQkJCMjIyIhISoaGhsbGxkZGRkYGBYWFhoWFhkVFRMT'+
                'EyQODhQSEiILCw4ODgsLCwoKCgkJCQcGBgkGBgYGBhgAABYAAAQEBAMDAwEBAQAAAAEAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
                'BAQUAP8ALAAAAAAKAAoAAAdcgEQ3HiAoDwILJjRAMh0XDAgBCRkqRTYpAwCaBxE+REGZmgAFQUND'+
                'oqI7OEM+C5oEsAsnLzkWChAYHxINFCQ8LBUcISIlGxMPNT46LisxMSMaDkQ/RERC1zMtPYEAOw==';
        img_mail = 'data:image/gif;base64,'+
                'R0lGODlhCgAKAMQAAP///5mZmSoaGhoWFhkVFRMTEyQODiILCwsLCwYGBgcGBgkGBhgAABYAAAMD'+
                'AwEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQU'+
                'AP8ALAAAAAAKAAoAAAUvIHREZBkVzWCuQQC8QEsGkRvXz3PL7pO8tNorgoAZARHFERYxLIcRBmTq'+
                'iBAEixAAOw==';
        img_user = 'data:image/gif;base64,'+
                'R0lGODlhCgAKANUAADMAAPr3s+vhKdKwHr6DEal3EPPvPYJCA+XUI/HsLPbwUcejG9m+Mvn3M9m8'+
                'IP//tfj4NvXxMe/oK///M969IfLuMbR4EdzFL86wHv//O+XXKf//u//3tY5JBPj0Ue3iLvTwQu3l'+
                'L9fCIda3IKp4ENnDL+DHIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUACcALAAAAAAKAAoAAAZTwNMp'+
                'oEgkFAHhEASpVCCgZMAgEFVCDomBCBkBNBqACFJsaAqfD0nTSAhMkYaz7RAoLJhMJJIZEBQbJQcL'+
                'EhIjHRcbJw8XFgQEFgwPShseCAiAQkEAOw==';
    }else{
        img_mura = 'data:image/gif;base64,'+
                'R0lGODlhDgAOAOYAAAAAAP///+Hz/gid8Ame8gmg8gmb7wmc7wqe8gqg8gqb7wqc7wug8gud7wyh'+
                '8gyd7w2i8w2g8g2d7w2d7g6e8A6d7w6e7w6c7g6d7hCg8g+d7w+e7w+d7hWg7hag7huP0RyQ0h2Q'+
                '0h+V1iWq8yaq8yiq9Cis9AorPSms9QoqPCqs9Syu9QsrPS6v9S6t9C+t9DGv9TGw9TOw9Taw9EW3'+
                '9ke39ki49mbE+IXQ+YbQ+aLb+qPb+6Pc+8Ln/MTo/ODz/uL0/guh8g+j8xGj8iCa1yit9Cmt9Cuu'+
                '9C6v9DOx9TSz9Ue59ki59km69sLo/MTp/ODz/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
                'BAEAAFEALAAAAAAOAA4AAAeXgCkfHBZDK0IQLQ4LFx8pIB4WQUw4Kig5NggKHSAcGBVHPDcoKDc7'+
                'JQYTHBwXD0hAP7GxJQcYGBwNCU0/Ab0BPzUIEhwPCUtOvr49NQQVB0Y8yck6JBUVDEy80sARGxgD'+
                'RdrJUCMUhAVL4r4/NBkbFSbI0r09LxoWJurJAi4bIElPgAgcKNDHjBAsiCiJwZAhjIcyRJwIBAA7';

        img_map = 'data:image/gif;base64,'+
                'R0lGODlhDgAOAMQAAKmLAeHXp76oQP38+My7arSaIe/pz9jKi8SvUeffuK6SEdTFf7mhMci0XPTw'+
                '39zPl+Tbr8OuTcq4ZN7SnOniv72mPf///8++ccm3YdTFgP///wAAAAAAAAAAAAAAAAAAACH5BAEA'+
                'ABoALAAAAAAOAA4AAAVCoAaMZDmKZqqu5EIRVUUqWEkJl6XvkL2POkCmNPkBgpdS8gi0AA6lnfOX'+
                'qDWlOoegN0IMKCRBgRGxsgwPAyuFWmtCADs=';

        img_naisei = 'data:image/gif;base64,'+
                'R0lGODlhDgAOAOYAAAAAAP///zEwMTAvMC8uLy4tLiwrLCsqKzw7PH9+fysrLImKiSkpKCgoJyYm'+
                'JTk5OE5OTdvb2dfX1Xp6eXd3dnV1dGZmZWJiYebm5eLi4d7e3dra2dfX1tTU09PT0tHR0M/Pzs7O'+
                'zc3NzMTEw8PDwsDAv7e3tqOjopKSkff29eLh4NnY19PS0dHQz83My8rJyMfGxcPCwcLBwMC/vr++'+
                'vSkoKCYlJSUkJCsqKjQzM0xLS9DOzsnHx3t6enV0dHRzc1taWuTj4+Hg4N/e3t3c3Nva2tbV1dXU'+
                '1NTT09LR0dHQ0NDPz8/OzsvKysnIyMjHx8HAwMC/v6Cfn9zc3MnJycXFxb+/v729vZ+fn5aWloWF'+
                'hXNzc3FxcWpqalxcXFpaWlZWVlBQUE5OTkdHR0BAQDo6Ojg4ODc3NzExMTAwMC8vLy4uLi0tLSws'+
                'LCsrKygoKCcnJyYmJiUlJSQkJCMjIyIiIiAgIB8fHx4eHv///wAAAAAAAAAAAAAAAAAAAAAAACH5'+
                'BAEAAHkALAAAAAAOAA4AAAewgAKCA4SFhGkDggJuYAkUFT9cPhByBYpzCykYGRpFQhN4bIptZEVE'+
                'RkkfPA9yBopqa1hEK0cfKDUNboppcBcvJCUzX3UMB4psZh8RIU1LVmhxxoJtZR4bHS0gUDkOOKNn'+
                'IFMsTEpXaTYKrzdeIUQcJF93b66CdBYnWls9WFJidziJCAApEkTEmC5JXEDRYSfRABMqkLCAUeVJ'+
                'DCdZ7BAYgGCIBBY7QlAZIYNGlDBsAgEAOw==';

        img_ken = 'data:image/gif;base64,'+
                'R0lGODlhDgAOAMQAAP9MH/9lP/9AEP9ZMP9/X/+Zf/+yn/+lj//Zz//y7/9zUP+AYP+/r/+Lbv/P'+
                'w//q5f+fh//s5/9jPP+NcP/l3//Mv/////8zAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEA'+
                'ABgALAAAAAAOAA4AAAVCIHaNZDmKZqkYqVlZQEsORCBX1YLIhWVRstHB9wheDC8LApiC+HwES+og'+
                'uAAsCcNAcUMIfJVUVEoKpyjMUZWEMmJCADs=';

        img_hanma = 'data:image/gif;base64,'+
                'R0lGODlhDgAOALMAAAAAAP///8zMzL+/v5mZmWZmZjIyMiYmJgwMDP///wAAAAAAAAAAAAAAAAAA'+
                'AAAAACH5BAEAAAkALAAAAAAOAA4AAARF0Eg5yLxTEFE1lkIYCEGBEUMoBqyQqSQ7WlQ4mLFnDKPO'+
                'tyYeifYLEUc3AylkkrR6I+Qr2krRJISWqnlBFQId7kdgEhsiADs=';
        img_mail = 'data:image/gif;base64,'+
                'R0lGODlhDgAOANUAAP////n6+u3t7ezs7Ojo6Kurq6ampqWkpKCgoJ6enpaWloeHh4SEhHV1dWhn'+
                'Z2dmZioqKiodHR8eHh0cHBsaGiEUFBYTExMTExMSEh4NDRwKChsJCRoICAoKCgcHBwkGBhIDAwUF'+
                'BQUGBhMAAAYEBBIAAAMDAxEAAAICAgQCAgEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAAAOAA4AAAZxwNVm'+
                's1qxjkiW53I6FZ/Qoud0GACu2OvgUOQmrNhBYnU4Ah4URVZBcQBUKsBhglkIBAvM5PCOAwwTEwwM'+
                'EhIGVyohVwQIEEUQCARXLB1YAQUNDQUBWJRZn50ioKAsGaOfKxqnWSkpIyNQJiskFhEVH0EAOw==';
        img_user = 'data:image/gif;base64,'+
                'R0lGODlhDgAOAPcAAP7+v/3+vf39vf3+ofz6vvz9ofz5u/v8ofn2nv//O/3/Ofn3av76Nfn2af36'+
                'Nf75Nfj6Nvj5Nvj4N/n1U/fzaff4N/f4NPf4Lvfzavf1TPj0Tff3Lvb1NPX0NPb1LfXzNPXwTvXw'+
                'VPXwTfXyNPXyM/XuUPTyNPTyM/TxNPTwPPTwMvTwMfTvPfTvPPPxM/PwMPPwLvPvPfPvMvPwM/Pu'+
                'MvPuMPPuLfLtPfLuNfLuM/LuMvLuLvPtMfLtNfLtM/LtMfLtMPHtMvHsM/HsMfLsLfLsMPLsMfHp'+
                'LPDqKvHqLPDoLu7oLu/nLO3jK/HgNergK+rgKevfK+reKereKuvaM+bWJ+TRJOfOJOTOI+TJLN/K'+
                'IuHCIN3AK9/BH+G/IN6/K+C+H92+IN++INq9Ida1H9W0J9ayHNWxHM+xH8uqHc2kGs2jGs+iF8ug'+
                'GNGeGNCeGMmdF8WRE8SPFcSOFL+FFLt9ELp9EL59EKt0DKRyDKFwC6NpC4hdC4pVCoZQCpNFAJVE'+
                'AHtGCIVBB4A5AHk3BnozADQbAjQOADQOASkQAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAIoALAAAAAAOAA4A'+
                'AAjGABUJJEABBxEiPSgQEMgQQYgUOiLqaBECQcMbMC5wGDLEgoUdNywaAAEDChgsLlyECbPEhggD'+
                'GFhsEJOIDwMGgQxd8RADAw4cEbYg8uPAQZ9DXSCgQHHwwxM3Z0iQMPNmygggQJJYiaKiq9euVbQc'+
                'EdKmjZIKJowYMSGhSRw4PhZ8GYQmQQcZeBWQAcRlgQANegilkVKjBpMxgvBkCKDogJM8he6sWTPn'+
                'zx4qBRgemJBFTp06dMqUGMBQIIAFOZAgCdIAAMOAADs=';
    }
}
//////////////////////
//スタイル初期化
//////////////////////
function initStyle()
{
    GM_addStyle("span.beyond_panel_ctlbox {width:35px; height:14px; display:block; position:absolute; right:-5px; top:-4px; }" +
                "span.beyond_panel_ctlbox img {width:8px;height:9px; float:right; }" +
                "div#beyond_basepanel img{vertical-align:middle; margin:1px 1px 1px 0px; padding-left:2px}" +
                 "#beyond_basepanel fieldset{border:groove 1px black; margin:1px; padding:1px;}"
                );
}

//////////////////////
//リソース変数初期化
//////////////////////
function initResources()
{
    var nowNodes = PRE_LOAD_NODES['nowResources'];
    var names = ['wood','stone','iron','rice'];
    for (var i=0; i <names.length;i++) {
        var name = names[i];
        RES_NOW[name] = parseInt( nowNodes[name].innerHTML, 10 );
        RES_MAX[name] = parseInt( $(name+'_max').innerHTML, 10 );
        RES_GROW[name] = parseInt( $('output_'+name).innerHTML, 10 );
    }

    var spns = $a('(id("sidebar") | id("status_left")//p[@class="status_bottom"])//span[@class="increase" or @class="resource"]');
    for(var i=0 ; i<spns.length ; i++) {
        var str = spns[i].previousSibling.nodeValue.match(/(木|石|鉄|糧)\s+(-?\d+)/);
        if( str ) {
            var name = "";
            switch( str[1] ) {
            case "木":
                name = 'wood';
                break;
            case "石":
                name = 'stone';
                break;
            case "鉄":
                name = 'iron';
                break;
            case "糧":
                name = 'rice';
                break;
            }
            RES_GROW_W[name] = parseInt(str[2], 10);
            RES_GROW_B[name] = parseInt(spns[i].innerHTML, 10);
        }
    }

    //名声
    RES_NOW["fame"] = 0;
    RES_MAX["fame"] = 0;
    var fameText = $x('id("status_left")/img[contains(@src,"ico_fame.gif")]').nextSibling;
    if( fameText ) {
        var tmp = fameText.nodeValue.match(/\s*(\d+)\s*\/\s*(\d+)/);
        RES_NOW["fame"] = parseInt(tmp[1],10);
        RES_MAX["fame"] = parseInt(tmp[2],10);
    }
}


//////////////////////
//ベースパネル初期化
//////////////////////
function initPanel()
{
    var panelBox = $("sidebar");
    if (isNarrow) {
        var panelBoxWrapper = $x('id("wrapper")');

        if (!panelBoxWrapper) return false;

        panelBox = d.createElement("div");
        panelBox.id = "sidebar";
        panelBox.style.width = "auto";
        panelBox.style.cssFloat = "left";
        panelBox.style.marginTop = "10px";

        panelBoxWrapper.appendChild(panelBox);
    }

    if( !panelBox ) return false;


    var basepanel = d.createElement("div");
    basepanel.id = "beyond_basepanel";

    var fixpanel = d.createElement("div");
    fixpanel.id = "beyond_fixpanel";
    var floatpanel = d.createElement("div");
    floatpanel.id = "beyond_floatpanel";
    var tmppanel = d.createElement("div");
    tmppanel.id = "beyond_tmp";
    tmppanel.style.display = "none";

    basepanel.appendChild(fixpanel);
    basepanel.appendChild(floatpanel);
    basepanel.appendChild(tmppanel);

    panelBox.appendChild(basepanel);

    return true;
}


//////////////////////
//オプション処理
//////////////////////
function disp_Options()
{
    if( !location.pathname.match(/^(\/user\/|\/bbs\/personal_)/) ) return;

    if( location.pathname.match(/ranking\.php/) ) return;
    var ul = $("statMenu");
    if( !ul ) return;

    var cl = d.createElement("a");
    cl.href = "javascript:void(0);";
    cl.innerHTML = "三国志Beyond";
    $e(cl, "click", function() {openOptions();});

    var li = d.createElement("li");
    li.appendChild(cl);
    li.className = "last";
    ul.appendChild(li);

    var lst = $x("//li[@class=\"last\"]");
    if( lst ) {
        lst.className = "";
    }


}

function loadOptions()
{
    OPT_VILLAGE = cloadData( "OPT_VILLAGE", 1 );
    OPT_BASELINK = cloadData( "OPT_BASELINK", 0 );
    OPT_MAPLINK = cloadData( "OPT_MAPLINK", 1 );
    OPT_XYLINK = cloadData( "OPT_XYLINK", 1 );
    OPT_XYLINK_NK = cloadData( "OPT_XYLINK_NK", 0 );
    OPT_LARGEICON = cloadData( "OPT_LARGEICON", 0 );
    OPT_TTBL = cloadData( "OPT_TTBL", 1 );
    OPT_MEMO = cloadData( "OPT_MEMO", 1 );
    OPT_MEMO_FONT_SIZE = cloadData( "OPT_MEMO_FONT_SIZE", "10" );
    OPT_MEMO_WIDTH = cloadData( "OPT_MEMO_WIDTH", "20" );
    OPT_MEMO_HEIGHT = cloadData( "OPT_MEMO_HEIGHT", "5" );
    OPT_MEMO_COUNT = cloadData( "OPT_MEMO_COUNT", "1" );
    OPT_MAPLINK_FONT_SIZE = cloadData( "OPT_MAPLINK_FONT_SIZE", "10" );
    OPT_DETAILS = cloadData( "OPT_DETAILS", 1 );
    OPT_DETAILS_UP = cloadData( "OPT_DETAILS_UP", 0 );
//  OPT_DECK = cloadData( "OPT_DECK", 1 );
    OPT_DECK_SET = cloadData( "OPT_DECK_SET", 1 );
    OPT_CTIME_B = cloadData( "OPT_CTIME_B", 1 );
    OPT_CTIME_U = cloadData( "OPT_CTIME_U", 1 );
    OPT_ALLY = cloadData( "OPT_ALLY", 1 );
    OPT_ALLY_IS = cloadData( "OPT_ALLY_IS", 1 );
    OPT_ALLY_XY = cloadData( "OPT_ALLY_XY", 0 );
    OPT_ALLY_CSV = cloadData( "OPT_ALLY_CSV", 0 );
    OPT_RES_T = cloadData( "OPT_RES_T", 0 );
    OPT_RES_TIME = cloadData( "OPT_RES_TIME", 1 );
    OPT_REMOVELIST = cloadData( "OPT_REMOVELIST", 1 );
    OPT_MAPLIST = cloadData( "OPT_MAPLIST", 1 );
    OPT_TTDISTANCE = cloadData( "OPT_DISTANCE", 1 );
    OPT_TTDISTANCE_ITEMS = cloadData("OPT_DISTANCE_ITEMS", "[\"剣兵(6)\", \"槍兵(7)\", \"弓兵(5)\", \"騎兵(12)\", \"衝車(3)\"]", true, true);
    OPT_TTALLYPRSN = cloadData( "OPT_TTALLYPRSN", 1 );
    OPT_USER_STAR = cloadData( "OPT_USER_STAR", 1 );
    OPT_USER_LEVEL = cloadData( "OPT_USER_LEVEL", 1 );
//  OPT_REPORT_NP = cloadData( "OPT_REPORT_NP", 1 );
    OPT_MAPCENTER = cloadData( "OPT_MAPCENTER", 1 );
    OPT_TBREST = cloadData( "OPT_TBREST", 1 );
    OPT_DELMSG = cloadData( "OPT_DELMSG", 1 );
    OPT_TSENDTIME = cloadData( "OPT_TSENDTIME", 1 );
    OPT_SMALLBTN = cloadData( "OPT_SMALLBTN", 0 );
    OPT_ATTACKMAP = cloadData( "OPT_ATTACKMAP", 1 );
    OPT_CARD_CMB = cloadData( "OPT_CARD_CMB", 1 );

    OPT_PIKA_YOROZU = cloadData( "OPT_PIKA_YOROZU", 0 );
    OPT_PIKA_HPREST = cloadData( "OPT_PIKA_HPREST", 0 );
    OPT_PIKA_MAPHELP = cloadData( "OPT_PIKA_MAPHELP", 0 );
    OPT_PIKA_TRDHELP = cloadData( "OPT_PIKA_TRDHELP", 0 );
    OPT_PIKA_BLINKBLD = cloadData( "OPT_PIKA_BLINKBLD", 0 );

    OPT_SUZAN_SEISAN = cloadData( "OPT_SUZAN_SEISAN", 0 );

    OPT_CASTLE_AID = cloadData( "OPT_CASTLE_AID", 0 );
    OPT_NEXT_MEISEI = cloadData( "OPT_NEXT_MEISEI", 0 );
    OPT_TIMER_LINK_DEPOT = cloadData( "OPT_TIMER_LINK_DEPOT", 0 );
    if (isNarrow) {
        OPT_VILLAGE_LIST_BOX = cloadData( "OPT_VILLAGE_LIST_BOX", 0 );
    }
}
function saveOptions()
{
    OPT_VILLAGE = cgetCheckBoxValue("OPT_VILLAGE");
    OPT_BASELINK = cgetCheckBoxValue("OPT_BASELINK");
    OPT_MAPLINK = cgetCheckBoxValue("OPT_MAPLINK");
    OPT_XYLINK = cgetCheckBoxValue("OPT_XYLINK");
    OPT_XYLINK_NK = cgetCheckBoxValue("OPT_XYLINK_NK");
    OPT_LARGEICON = cgetCheckBoxValue("OPT_LARGEICON");
    OPT_TTBL = cgetCheckBoxValue("OPT_TTBL");
    OPT_MEMO = cgetCheckBoxValue("OPT_MEMO");
    OPT_MEMO_FONT_SIZE = cgetTextBoxValue("OPT_MEMO_FONT_SIZE");
    OPT_MEMO_WIDTH = cgetTextBoxValue("OPT_MEMO_WIDTH");
    OPT_MEMO_HEIGHT = cgetTextBoxValue("OPT_MEMO_HEIGHT");
    OPT_MEMO_COUNT = cgetTextBoxValue("OPT_MEMO_COUNT");
    OPT_MAPLINK_FONT_SIZE = cgetTextBoxValue("OPT_MAPLINK_FONT_SIZE");
    OPT_DETAILS = cgetCheckBoxValue("OPT_DETAILS");
    OPT_DETAILS_UP = cgetCheckBoxValue("OPT_DETAILS_UP");
//  OPT_DECK = cgetCheckBoxValue("OPT_DECK");
    OPT_DECK_SET = cgetCheckBoxValue("OPT_DECK_SET");
    OPT_CTIME_B = cgetCheckBoxValue("OPT_CTIME_B");
    OPT_CTIME_U = cgetCheckBoxValue("OPT_CTIME_U");
    OPT_ALLY = cgetCheckBoxValue("OPT_ALLY");
    OPT_ALLY_IS = cgetCheckBoxValue("OPT_ALLY_IS");
    OPT_ALLY_XY = cgetCheckBoxValue("OPT_ALLY_XY");
    OPT_ALLY_CSV = cgetCheckBoxValue("OPT_ALLY_CSV");
    OPT_RES_T = cgetCheckBoxValue("OPT_RES_T");
    OPT_RES_TIME = cgetCheckBoxValue("OPT_RES_TIME");
    OPT_REMOVELIST = cgetCheckBoxValue("OPT_REMOVELIST");
    OPT_MAPLIST = cgetCheckBoxValue("OPT_MAPLIST");
    OPT_TTDISTANCE = cgetCheckBoxValue("OPT_DISTANCE");
    OPT_TTDISTANCE_ITEMS = getDistanceBox(5);
    OPT_TTALLYPRSN = cgetCheckBoxValue("OPT_TTALLYPRSN");
    OPT_USER_STAR = cgetCheckBoxValue("OPT_USER_STAR");
    OPT_USER_LEVEL = cgetCheckBoxValue("OPT_USER_LEVEL");
//  OPT_REPORT_NP = cgetCheckBoxValue("OPT_REPORT_NP");
    OPT_MAPCENTER = cgetCheckBoxValue("OPT_MAPCENTER");
    OPT_TBREST = cgetCheckBoxValue("OPT_TBREST");
    OPT_DELMSG = cgetCheckBoxValue("OPT_DELMSG");
    OPT_TSENDTIME = cgetCheckBoxValue("OPT_TSENDTIME");
    OPT_SMALLBTN = cgetCheckBoxValue("OPT_SMALLBTN");
    OPT_ATTACKMAP = cgetCheckBoxValue("OPT_ATTACKMAP");
    OPT_CARD_CMB = cgetCheckBoxValue("OPT_CARD_CMB");
    OPT_PIKA_YOROZU = cgetCheckBoxValue("OPT_PIKA_YOROZU");
    OPT_PIKA_HPREST = cgetCheckBoxValue("OPT_PIKA_HPREST");
    OPT_PIKA_MAPHELP = cgetCheckBoxValue("OPT_PIKA_MAPHELP");
    OPT_PIKA_TRDHELP = cgetCheckBoxValue("OPT_PIKA_TRDHELP");
    OPT_PIKA_BLINKBLD = cgetCheckBoxValue("OPT_PIKA_BLINKBLD");
    OPT_SUZAN_SEISAN = cgetCheckBoxValue("OPT_SUZAN_SEISAN");

    OPT_CASTLE_AID = cgetCheckBoxValue("OPT_CASTLE_AID");
    OPT_NEXT_MEISEI = cgetCheckBoxValue("OPT_NEXT_MEISEI");
    OPT_TIMER_LINK_DEPOT = cgetCheckBoxValue("OPT_TIMER_LINK_DEPOT");
    if (isNarrow) {
        OPT_VILLAGE_LIST_BOX = cgetCheckBoxValue( "OPT_VILLAGE_LIST_BOX");
    }

    csaveData( "OPT_VILLAGE", OPT_VILLAGE );
    csaveData( "OPT_BASELINK", OPT_BASELINK );
    csaveData( "OPT_MAPLINK", OPT_MAPLINK );
    csaveData( "OPT_XYLINK", OPT_XYLINK );
    csaveData( "OPT_XYLINK_NK", OPT_XYLINK_NK );
    csaveData( "OPT_LARGEICON", OPT_LARGEICON );
    csaveData( "OPT_TTBL", OPT_TTBL );
    csaveData( "OPT_MEMO", OPT_MEMO );
    csaveData( "OPT_MEMO_FONT_SIZE", OPT_MEMO_FONT_SIZE );
    csaveData( "OPT_MEMO_WIDTH", OPT_MEMO_WIDTH );
    csaveData( "OPT_MEMO_HEIGHT", OPT_MEMO_HEIGHT );
    csaveData( "OPT_MEMO_COUNT", OPT_MEMO_COUNT );
    csaveData( "OPT_MAPLINK_FONT_SIZE", OPT_MAPLINK_FONT_SIZE );
    csaveData( "OPT_DETAILS", OPT_DETAILS );
    csaveData( "OPT_DETAILS_UP", OPT_DETAILS_UP );
//  csaveData( "OPT_DECK", OPT_DECK );
    csaveData( "OPT_DECK_SET", OPT_DECK_SET );
    csaveData( "OPT_CTIME_B", OPT_CTIME_B );
    csaveData( "OPT_CTIME_U", OPT_CTIME_U );
    csaveData( "OPT_ALLY", OPT_ALLY );
    csaveData( "OPT_ALLY_IS", OPT_ALLY_IS );
    csaveData( "OPT_ALLY_XY", OPT_ALLY_XY );
    csaveData( "OPT_ALLY_CSV", OPT_ALLY_CSV );
    csaveData( "OPT_RES_T", OPT_RES_T );
    csaveData( "OPT_RES_TIME", OPT_RES_TIME );
    csaveData( "OPT_REMOVELIST", OPT_REMOVELIST );
    csaveData( "OPT_MAPLIST", OPT_MAPLIST );
    csaveData( "OPT_DISTANCE", OPT_TTDISTANCE );
    csaveData( "OPT_DISTANCE_ITEMS", OPT_TTDISTANCE_ITEMS, true, true );
    csaveData( "OPT_TTALLYPRSN", OPT_TTALLYPRSN );
    csaveData( "OPT_USER_STAR", OPT_USER_STAR );
    csaveData( "OPT_USER_LEVEL", OPT_USER_LEVEL );
//  csaveData( "OPT_REPORT_NP", OPT_REPORT_NP );
    csaveData( "OPT_MAPCENTER", OPT_MAPCENTER );
    csaveData( "OPT_TBREST", OPT_TBREST );
    csaveData( "OPT_DELMSG", OPT_DELMSG );
    csaveData( "OPT_TSENDTIME", OPT_TSENDTIME );
    csaveData( "OPT_SMALLBTN", OPT_SMALLBTN );
    csaveData( "OPT_ATTACKMAP", OPT_ATTACKMAP );
    csaveData( "OPT_CARD_CMB", OPT_CARD_CMB );
    csaveData( "OPT_PIKA_YOROZU", OPT_PIKA_YOROZU );
    csaveData( "OPT_PIKA_HPREST", OPT_PIKA_HPREST );
    csaveData( "OPT_PIKA_MAPHELP", OPT_PIKA_MAPHELP );
    csaveData( "OPT_PIKA_TRDHELP", OPT_PIKA_TRDHELP );
    csaveData( "OPT_PIKA_BLINKBLD", OPT_PIKA_BLINKBLD );
    csaveData( "OPT_SUZAN_SEISAN", OPT_SUZAN_SEISAN );

    csaveData( "OPT_CASTLE_AID", OPT_CASTLE_AID );
    csaveData( "OPT_NEXT_MEISEI", OPT_NEXT_MEISEI );
    csaveData( "OPT_TIMER_LINK_DEPOT", OPT_TIMER_LINK_DEPOT );
    if (isNarrow) {
        csaveData( "OPT_VILLAGE_LIST_BOX", OPT_VILLAGE_LIST_BOX );
    }

    alert("設定を保存しました");
    deleteOptionsHtml();
}
function getMyInfo()
{
    if( (location.pathname == "/user/index.php" || location.pathname == "/user/" ) && !URL_PARAM.user_id ) {

        var uid=0, aid=0;
        var uidtd = $x("//table[@class=\"commonTables\"]//tr[2]//td[3]");
        if( uidtd ) {
            uid = uidtd.innerHTML.match(/\/bbs\/personal_topic_view\.php\?user_id\=(\d+)/);
        }
        var aidtd = $x("//table[@class=\"commonTables\"]//tr[3]//td[4]");
        if( aidtd ) {
            aid = d.body.innerHTML.match(/\/alliance\/info\.php\?id\=(\d+)/);
        }
        if( uid && aid ) {
            csaveData( "user_id", uid[1], true );
            csaveData( "ally_id", aid[1], true );
        }
    }

    USER_ID = cloadData( "user_id", "", true );
    ALLY_ID = cloadData( "ally_id", "", true );

}



function resetMapLink() {
    if( !confirm("登録済みリンクを全て削除します。\nよろしいですか？") ) return;

    var maplinks = cloadData( "links", 0, true );
    for(i=0 ; i<maplinks ; i++) {
        cdelData( "link" + i, true );
    }
    cdelData( "links", true);

    resetMapLinks();
}

function resetUserXY() {
    if( !confirm("同盟員一覧の座標情報を全て削除します。\nよろしいですか？") ) return;
    cresetUserXY();
}

function resetUserStar() {
    if( !confirm("君主の★情報と自領地のLevel情報を全て削除します。\nよろしいですか？") ) return;
    cresetUserStar();
    cdelData("MyLevelList",true);
}

function openOptions() {
    deleteOptionsHtml();
    addOptionsHtml();
}

function deleteOptionsHtml() {
    var elem = $("beyond_OptionsWindow");
    if (!elem ) return;
    $("beyond_floatpanel").removeChild(elem);
}

function addOptionsHtml() {

    var oc = d.createElement("div");
    oc.id = "beyond_OptionsWindow";
    oc.style.position = "absolute";
    oc.style.backgroundColor = "lightblue";
    oc.style.border = "outset 2px lightblue";
    oc.style.fontSize = "12px";
    oc.style.padding = "15px";
    oc.style.zIndex = 1000;

    var x = cloadData("config_window_x", 20);
    var y = cloadData("config_window_y", 20);
    if(x < 0) x = 0;
    if(y < 0) y = 0;
    oc.style.left = x + "px";
    oc.style.top = y + "px";

    $e(oc, "mousedown", function(event){
                if( event.target != $("beyond_OptionsWindow")) {return false;}
                g_MD="beyond_OptionsWindow";
                g_MX=event.pageX-parseInt(this.style.left,10);
                g_MY=event.pageY-parseInt(this.style.top,10);
                event.preventDefault();});
    $e(d, "mousemove", function(event){
                if(g_MD != "beyond_OptionsWindow") return true;
                var oc = $("beyond_OptionsWindow");
                if( !oc ) return true;
                var x = event.pageX - g_MX;
                var y = event.pageY - g_MY;
                oc.style.left = x + "px";
                oc.style.top = y + "px";
                csaveData("config_window_x", x);
                csaveData("config_window_y", y);
                });
    $e(d, "mouseup", function(event){g_MD="";});

    var tx = d.createElement("div");

    var ah = d.createElement("a");
    ah.href = "http://www1.ocn.ne.jp/~hatt/3gkb/";
    tx.title = ah.href;
    ah.target = "_blank";
    ah.appendChild(d.createTextNode(VERSION_NAME));
    tx.appendChild(ah);
    tx.style.padding = "4px";
    tx.style.fontSize = "10px";
    tx.style.color = "steelblue";
    oc.appendChild(tx);

    $("beyond_floatpanel").appendChild(oc);

    var tbl = d.createElement("table");
    tbl.style.border ="0px";
    var tr = d.createElement("tr");
    var td1 = d.createElement("td");
    td1.style.padding = "15px";
    td1.style.verticalAlign = "top";
    var td2 = d.createElement("td");
    td2.style.padding = "15px";
    td2.style.verticalAlign = "top";
    var td3 = d.createElement("td");
    td3.style.padding = "15px";
    td3.style.verticalAlign = "top";
    var td4 = d.createElement("td");
    td4.style.padding = "15px";
    td4.style.verticalAlign = "top";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbl.appendChild(tr);
    oc.appendChild(tbl);


    //設定項目
    ccreateCheckBox(td1, "OPT_VILLAGE", OPT_VILLAGE, "建築表示機能","村の表示で資源不足で建築不可能な場合、LV表示を黄色にします",0);
    ccreateCheckBox(td1, "OPT_BASELINK", OPT_BASELINK, "拠点リンク機能","城や村のリンクにマップ・内政などのリンクを追加します",0);
    ccreateCheckBox(td1, "OPT_MAPLINK", OPT_MAPLINK, "領地リンク機能","領地や敵地・NPC砦等へのリンク",0);
    ccreateTextBox(td1, "OPT_MAPLINK_FONT_SIZE", OPT_MAPLINK_FONT_SIZE, "フォントサイズ","領地リンクのフォントサイズを指定します。デフォルト=10", 5, 20);
    ccreateCheckBox(td1, "OPT_LARGEICON", OPT_LARGEICON, "大きめアイコン","拠点リンク・領地リンクなどのアイコンを14x14サイズにします（アイコン提供:ゆう＠てらおとめん様）",0);
    ccreateCheckBox(td1, "OPT_XYLINK", OPT_XYLINK, "座標リンク機能","掲示板などの(xx,yy)にリンク機能を追加します",0);
    ccreateCheckBox(td1, "OPT_XYLINK_NK", OPT_XYLINK_NK, "両端のカッコ無視","xx,yyだけでもリンクします。1,000などの数字もリンクになってしまいます",20);
    ccreateCheckBox(td1, "OPT_TTBL", OPT_TTBL, "兵力整形機能","掲示板に貼り付けた兵力一覧を整形します",0);
    ccreateCheckBox(td1, "OPT_MEMO", OPT_MEMO, "メモ機能","メモ機能",0);
    ccreateTextBox(td1, "OPT_MEMO_FONT_SIZE", OPT_MEMO_FONT_SIZE, "フォントサイズ","メモのフォントサイズを指定します。デフォルト=10",5,20);
    ccreateTextBox(td1, "OPT_MEMO_WIDTH", OPT_MEMO_WIDTH, "メモ幅","メモの幅を指定します。デフォルト=20",5,20);
    ccreateTextBox(td1, "OPT_MEMO_HEIGHT", OPT_MEMO_HEIGHT, "メモ高","メモの高さを指定します。デフォルト=5",5,20);
    ccreateTextBox(td1, "OPT_MEMO_COUNT", OPT_MEMO_COUNT, "メモ数(1?5)","メモ欄の数を指定します。デフォルト=1",5,20);
    ccreateCheckBox(td1, "OPT_DETAILS", OPT_DETAILS, "ログ合計表示機能","同盟ログの兵力＋援軍の合計を表示します",0);
    ccreateCheckBox(td1, "OPT_DETAILS_UP", OPT_DETAILS_UP, "合計を上に出す","合計表示を、下じゃなくて上に出します",20);
//  ccreateCheckBox(td1, "OPT_DECK", OPT_DECK, "デッキ画面改善","デッキ画面の改善を行います",0);
    ccreateCheckBox(td1, "OPT_DECK_SET", OPT_DECK_SET, "デッキセット先自動選択","初期表示のセット先拠点を現在選択中の拠点にします",0);
    ccreateCheckBox(td2, "OPT_CTIME_B", OPT_CTIME_B, "完了時刻の表示(建物)","建築作成時に完了予定日時を表示します。",0);
    ccreateCheckBox(td2, "OPT_CTIME_U", OPT_CTIME_U, "完了時刻の表示(ユニット)","ユニット作成時に完了予定日時を表示します。",0);
    ccreateCheckBox(td2, "OPT_ALLY", OPT_ALLY, "同盟表示改善","同盟員一覧の表示改善",0);
    ccreateCheckBox(td2, "OPT_ALLY_IS", OPT_ALLY_IS, "同盟表示のソート","同盟員一覧の並べ替えを追加します",20);
    ccreateCheckBox(td2, "OPT_ALLY_XY", OPT_ALLY_XY, "同盟員座標表示","同盟員一覧に本居城の座標を追加します",20);
    ccreateCheckBox(td2, "OPT_ALLY_CSV", OPT_ALLY_CSV, "同盟員情報CSV","同盟員一覧の詳細をCSV表示します。",20);
    ccreateCheckBox(td2, "OPT_RES_T", OPT_RES_T, "資源生産合計表示","資源生産量の合計を表示します",0);
    ccreateCheckBox(td2, "OPT_RES_TIME", OPT_RES_TIME, "資源時間の表示","資源の残り時間を表示します",0);
    ccreateCheckBox(td2, "OPT_REMOVELIST", OPT_REMOVELIST, "破棄中の領地表示","破棄中の領地一覧を表示し、マップにマークを付けます",0);
    ccreateCheckBox(td2, "OPT_MAPLIST", OPT_MAPLIST, "マップの地形一覧","マップ上の拠点・領地リストを表示します",0);
    ccreateCheckBox(td2, "OPT_DISTANCE", OPT_TTDISTANCE, "移動時間表示","全ての[兵を送る]リンクのToolTipsを移動時間の目安表示に変更します",0);
    createDistanceBox(td2, OPT_TTDISTANCE_ITEMS, 5);
    ccreateCheckBox(td2, "OPT_TTALLYPRSN", OPT_TTALLYPRSN, "同盟/君主表示","全ての[拠点/領地]リンクのToolTipsを同盟/君主表示に変更します",0);
    ccreateCheckBox(td3, "OPT_USER_STAR", OPT_USER_STAR, "君主★情報表示","プロフィール画面に領地の★表示を追加します",0);
    ccreateCheckBox(td3, "OPT_USER_LEVEL", OPT_USER_LEVEL, "領地レベル表示","プロフィール画面に領地のレベル表示を追加します",0);
//  ccreateCheckBox(td3, "OPT_REPORT_NP", OPT_REPORT_NP, "同盟ログ前後表示","同盟ログの詳細に、[前のログ]・[次のログ]を追加します（限定的）",0);
    ccreateCheckBox(td2, "OPT_MAPCENTER", OPT_MAPCENTER, "マップ中央表示","マップ中央に目印を表示し、中央座標を表示します",0);
    ccreateCheckBox(td3, "OPT_TBREST", OPT_TBREST, "討伐ゲージ回復時間予測機能","武将の討伐ゲージが300 or 500になる時間を表示します",0);
    ccreateCheckBox(td3, "OPT_DELMSG", OPT_DELMSG, "書簡/報告書削除機能","書簡や報告書の内容ページに、削除ボタンを付けます",0);
    ccreateCheckBox(td3, "OPT_TSENDTIME", OPT_TSENDTIME, "出発時刻計算","出兵画面で、到着希望時間から出発時刻を計算します",0);
    ccreateCheckBox(td3, "OPT_SMALLBTN", OPT_SMALLBTN, "小さいボタン","右上の4つのボタンを小さくします。状況も1行にします。",0);

    ccreateCheckBox(td3, "OPT_ATTACKMAP", OPT_ATTACKMAP, "出兵表示機能","マップ上に、現在出兵中の目印を付けます",0);
    ccreateCheckBox(td3, "OPT_CARD_CMB", OPT_CARD_CMB, "同一カード合成ボタン","カード合成後に、同一カードで合成を続けるボタンを追加します",0);

    td3.appendChild(d.createElement("br"));
    var fs = d.createElement("fieldset");
    var lg = d.createElement("legend");
    lg.appendChild(d.createTextNode("　プレゼンツ by ピカチュウ　") );
    fs.appendChild(lg);
    td3.appendChild(fs);
    ccreateCheckBox(fs, "OPT_PIKA_YOROZU", OPT_PIKA_YOROZU, "ヨロズダス引き忘れ防止機能","ヨロズダスがリセットされたら通知してくれます",0);
    ccreateCheckBox(fs, "OPT_PIKA_HPREST", OPT_PIKA_HPREST, "武将の回復時間予測機能","武将のHPが100になる時間を表示します",0);
    ccreateCheckBox(fs, "OPT_PIKA_MAPHELP", OPT_PIKA_MAPHELP, "マップ画面検索改善","X座標のところに999,999等を入れてもジャンプしてくれます",0);
    ccreateCheckBox(fs, "OPT_PIKA_TRDHELP", OPT_PIKA_TRDHELP, "トレード画面入力改善","4桁数字を入力するとカードNoとして検索します",0);
    ccreateCheckBox(fs, "OPT_PIKA_BLINKBLD", OPT_PIKA_BLINKBLD, "都市画面改善","建設中を点滅させます",0);

    td3.appendChild(d.createElement("br"));
    var fs = d.createElement("fieldset");
    var lg = d.createElement("legend");
    lg.appendChild(d.createTextNode("　プレゼンツ by su-zan　") );
    fs.appendChild(lg);
    td3.appendChild(fs);
    ccreateCheckBox(fs, "OPT_SUZAN_SEISAN", OPT_SUZAN_SEISAN, "拠点生産量表示","拠点の生産量を表示します",0);

    var fs = d.createElement("fieldset");
    var lg = d.createElement("legend");
    lg.appendChild(d.createTextNode("　プレゼンツ by ろむ　") );
    fs.appendChild(lg);
    td4.appendChild(fs);
    ccreateCheckBox(fs, "OPT_CASTLE_AID", OPT_CASTLE_AID, "拠点援軍ボタン機能","城や村のリンクの横に援軍ボタンを表示します",0);
    ccreateCheckBox(fs, "OPT_NEXT_MEISEI", OPT_NEXT_MEISEI, "名声獲得タイマー機能","次の名声値獲得までの時間を表示します",0);
    ccreateCheckBox(fs, "OPT_TIMER_LINK_DEPOT", OPT_TIMER_LINK_DEPOT, "ブラ三タイマー格納機能","浮浪プログラマさん作成のブラウザ三国志タイマーをサイドボックスに格納します",0);
    if (isNarrow) {
        ccreateCheckBox(fs, "OPT_VILLAGE_LIST_BOX", OPT_VILLAGE_LIST_BOX, "都市リスト表示機能","都市のタブ以外でも都市のリストを表示できるようにします",0);
    }


    ccreateButton(oc, "保存", "設定内容を保存します", function() {saveOptions();});
    ccreateButton(oc, "閉じる", "設定内容を保存せず閉じます", function() {deleteOptionsHtml();});
    ccreateButton(oc, "領地リンクのクリア", "領地・君主リンクの内容を初期化します", function() {resetMapLink();});
    ccreateButton(oc, "同盟員座標のクリア", "同盟員座標を全て初期化します", function() {resetUserXY();});
    ccreateButton(oc, "★/Level情報のクリア", "君主の★情報と自領地のLevel情報を全て初期化します", function() {resetUserStar();});
    ccreateButton(oc, "領地リンクの直接編集", "領地リンクをテキストで自由に変更できます", function(event) {mapLinkList(event);});
}

function createDistanceBox(container, items, num)
{
    var sels = ["その他", "無し", "剣兵(6)",
                "槍兵(7)", "弓兵(5)", "騎兵(12)", "斥候(9)", "衝車(3)",
                "矛槍兵(10)", "弩兵(8)", "近衛騎兵(15)", "斥候騎兵(20)", "投石機(6)"];
    for(var i=0 ; i<num ; i++ ) {
        var src = "";
        if( sels.indexOf(items[i]) != -1 ) src = items[i];
        var cb = ccreateComboBox(container, "OPT_DISTANCE_CB" + i , sels, src, "表示" + (i+1), (i+1) + "行目の表示", 20 );

        var tb = d.createElement("input");
        tb.type = "text";
        tb.id = "OPT_DISTANCE_TX" + i;
        tb.title = "例) 「超早い馬(50)」など、半角カッコの中に速度を入れて下さい";
        if( src == "" ) {
            tb.value = items[i];
        }else{
            tb.disabled ="disabled";
        }
        tb.size = 12;

        cb.parentNode.appendChild(d.createTextNode(" "));
        cb.parentNode.appendChild(tb);
        (function(no) {
            $e(cb, "change", function() {
                var cb = $("OPT_DISTANCE_CB" + no);
                var tb = $("OPT_DISTANCE_TX" + no);
                if( !cb || !tb ) return;
                if( cb.value == sels[0] ) {
                    tb.disabled ="";
                }else{
                    tb.disabled ="disabled";
                }
            });
        })(i);
    }
}
function getDistanceBox(num)
{
    var ret = new Array();
    for(var i=0 ; i<num ; i++ ) {
        var cb = $("OPT_DISTANCE_CB" + i);
        var tb = $("OPT_DISTANCE_TX" + i);
        if( !cb || !tb ) return null;
        if( cb.value == "その他" ) {
            ret.push( tb.value );
        }else if( cb.value == "無し" ) {
            ret.push("");
        }else {
            ret.push( cb.value );
        }
    }
    return ret;
}

//////////////////////
//建築表示処理
//////////////////////
function disp_village() {
    if( location.pathname != "/village.php" ) {
        return ;
    }

    //costs
    var cost_wood = [
        [10,35,40,15],
        [25, 88, 100, 38],
        [58, 202, 230, 86],
        [173, 604, 690, 259],
        [431, 1510, 1725, 647],
        [1466, 2847, 3019, 1294],
        [2493, 4839, 5132, 2200],
        [3490, 6775, 7186, 3080],
        [4537, 8807, 9341, 4003],
        [5898, 11450, 12144, 5204],
        [8119, 14434, 15787, 6766],
        [11366, 20207, 22101, 9472],
        [17050, 30311, 33152, 14208],
        [25575, 45467, 49729, 21312],
        [38362, 68199, 74593, 31698]
    ];
    var cost_stone= [
        [40, 10, 35, 15],
        [100, 25, 88, 38],
        [230, 58, 202, 86],
        [690, 173, 604, 259],
        [1725, 431, 1510, 647],
        [3019, 1466, 2847, 1294],
        [5132, 2493, 4839, 2200],
        [7186, 3490, 6775, 3080],
        [9341, 4537, 8807, 4003],
        [12144, 5898, 11450, 5204],
        [15787, 8119, 14434, 6766],
        [22101, 11366, 20207, 9472],
        [33152, 17050, 30311, 14208],
        [49729, 25575, 45467, 21312],
        [74593, 38362, 68199, 31968]
    ];
    var cost_iron=[
        [35, 40, 10, 15],
        [88, 100, 25, 38],
        [202, 230, 58, 86],
        [604, 690, 173, 259],
        [1510, 1725, 431, 647],
        [2847, 3019, 1466, 1294],
        [4839, 5132, 2493, 2200],
        [6775, 7186, 3490, 3080],
        [8807, 9341, 4537, 4003],
        [11450, 12144, 5898, 5204],
        [14434, 15787, 8119, 6766],
        [20207, 22101, 11366, 9472],
        [30311, 33152, 17050, 14208],
        [45467, 49729, 25575, 21312],
        [68199, 74593, 38362, 31968]
    ];
    var cost_rice=[
        [35, 35, 30, 0],
        [88, 88, 75, 0],
        [202, 202, 173, 0],
        [604, 604, 518, 0],
        [1510, 1510, 1294, 0],
        [3019, 3019, 2588, 0],
        [5132, 5132, 4399, 0],
        [7186, 7186, 6159, 0],
        [9341, 9341, 8007, 0],
        [12144, 12144, 10409, 0],
        [15787, 15787, 13532, 0],
        [22101, 22101, 18944, 0],
        [33152, 33152, 28416, 0],
        [49729, 49729, 42625, 0],
        [74593, 74593, 63937, 0]
    ];
    var cost_souko=[
        [83, 141, 83, 63],
        [167, 281, 167, 126],
        [300, 506, 300, 226],
        [479, 810, 479, 362],
        [671, 1134, 671, 507],
        [1044, 1253, 1044, 835],
        [1462, 1754, 1462, 1169],
        [1973, 2368, 1973, 1578],
        [2664, 3196, 2664, 2131],
        [3596, 4315, 3596, 2877],
        [4854, 5825, 4854, 3883],
        [6311, 7573, 6311, 5048],
        [8204, 9845, 8204, 6563],
        [10255, 12306, 10255, 8204],
        [12819, 15382, 12819, 10255],
        [15382, 18459, 15382, 12306],
        [18459, 22151, 18459, 14767],
        [21228, 21228, 25473, 16982],
        [24412, 29294, 24412, 19529],
        [28074, 33688, 28074, 22459]
    ];
    var cost_syukusya=[
        [35, 20, 35, 80],
        [53, 30, 53, 120],
        [89, 51, 89, 204],
        [147, 84, 147, 337],
        [228, 130, 228, 522],
        [336, 192, 336, 767],
        [476, 272, 476, 1089],
        [653, 373, 653, 1492],
        [868, 496, 868, 1984],
        [1129, 645, 1129, 2580],
        [2032, 1161, 2032, 4644],
        [3658, 2090, 3658, 4644],
        [6951, 3971, 6950, 15882],
        [13205, 7544, 13205, 30177],
        [25090, 14334, 25090, 57336]
    ];
    var cost_kojo=[
        [780, 1560, 1560, 3900],
        [1248, 2496, 2496, 6240],
        [1997, 3994, 3994, 9984],
        [4193, 6290, 6290, 11182],
        [5871, 8806, 8806, 15655],
        [10958, 13698, 13698, 16437],
        [15342, 19177, 19177, 23013],
        [19944, 24930, 24930, 29916],
        [25928, 32410, 32410, 38891],
        [33706, 42132, 42132, 50559]
    ];
    var cost_suisya=[
        [2940, 980, 980, 4900],
        [4704, 1568, 1568, 7840],
        [7526, 2509, 2509, 12544],
        [10537, 5268, 5268, 14049],
        [14751, 7376, 7376, 19668],
        [20652, 13768, 13768, 20652],
        [28913, 19275, 19275, 28913],
        [37587, 25058, 25058, 37587],
        [48863, 32576, 32576, 48863],
        [63523, 42348, 42348, 63523]
    ];
    var cost_ichiba=[
        [100, 100, 50, 50],
        [334, 334, 191, 191],
        [1035, 1035, 592, 592],
        [2795, 2795, 1600, 1600],
        [6328, 6328, 4218, 4218],
        [13288, 13288, 8859, 8859],
        [25248, 25248, 16832, 16832],
        [42921, 42921, 28614, 28614],
        [64381, 64381, 42921, 42921],
        [90134, 90134, 60089, 60089]
    ];
    var cost_kenkyu=[
        [275, 110, 110, 55],
        [413, 165, 165, 83],
        [619, 248, 248, 124],
        [1486, 836, 836, 557],
        [2228, 1253, 1253, 836],
        [7521, 6267, 6267, 5015],
        [13538, 11282, 11282, 9025],
        [21436, 17862, 17862, 14290],
        [44675, 37228, 37228, 29784],
        [87725, 73104, 73104, 58483]
    ];
    var cost_kunren=[
        [1500, 1600, 2500, 3300],
        [2100, 2240, 3500, 3300],
        [2940, 3136, 4900, 6468],
        [6629, 7326, 13955, 6978],
        [13257, 14653, 27910, 13955],
        [32097, 37679, 55821, 13955],
        [64194, 75358, 111642, 27910],
        [128388, 150716, 223283, 55821],
        [256776, 301432, 446566, 111642],
        [513551, 602865, 893133, 223283]
    ];
    var cost_kajiba=[
        [150, 200, 340, 170],
        [400, 300, 680, 340],
        [780, 585, 1326, 663],
        [1482, 1112, 2519, 1260],
        [2742, 2056, 4661, 2330],
        [4935, 3701, 8390, 4195],
        [8636, 6477, 14682, 7341],
        [17640, 14112, 28223, 10584],
        [31566, 25253, 50506, 18940],
        [50506, 40404, 80809, 30303]
    ];
    var cost_bougu=[
        [150, 200, 340, 170],
        [300, 400, 680, 340],
        [585, 780, 1326, 663],
        [1112, 1482, 2519, 1260],
        [2056, 2742, 4661, 2330],
        [3701, 4935, 8390, 4195],
        [6477, 8636, 14682, 7341],
        [14112, 17640, 28223, 10584],
        [25253, 31566, 50506, 18940],
        [40404, 50506, 80809, 30303]
    ];
    var cost_heiki=[
        [216, 216, 216, 72],
        [432, 432, 432, 144],
        [864, 864, 864, 288],
        [1224, 1224, 1224, 648],
        [1836, 1836, 1836, 972],
        [2662, 2662, 2662, 1409],
        [3860, 3860, 3860, 2044],
        [7357, 7357, 7357, 2452],
        [13242, 13242, 13242, 4414],
        [23836, 23836, 23836, 7945],
        [42905, 42905, 42905, 14302],
        [77229, 77229, 77229, 25743],
        [139013, 139013, 139013, 46338],
        [278026, 278026, 278026, 92675],
        [556051, 556051, 556051, 185350]
    ];
    var cost_doujaku=[
        [700, 3500, 2100, 700],
        [1120, 5600, 3360, 1120],
        [1792, 8960, 5376, 1792],
        [3763, 10035, 7526, 3763],
        [5263, 14049, 10537, 5268],
        [9834, 14752, 14752, 9834],
        [13768, 20652, 20652, 13768],
        [17899, 26848, 26848, 17899],
        [23268, 34902, 34902, 23268],
        [30249, 45373, 45373, 30249]
    ];
    var cost_renpei=[
        [112, 107, 107, 122],
        [224, 214, 214, 244],
        [448, 428, 428, 488],
        [759, 725, 725, 826],
        [1214, 1160, 1160, 1322],
        [2209, 2110, 2110, 2406],
        [3331, 3182, 3182, 3627],
        [4958, 4736, 4736, 5400],
        [8091, 7729, 7729, 8813],
        [11130, 10632, 10632, 12122]
    ];
    var cost_heisya=[
        [72, 360, 72, 216],
        [144, 720, 144, 432],
        [288, 1440, 288, 864],
        [648, 1728, 648, 1296],
        [972, 2592, 972, 1944],
        [1409, 3758, 1409, 2819],
        [2725, 4088, 2725, 4088],
        [6744, 9810, 5518, 2453],
        [12140, 17658, 9933, 4415],
        [21852, 31784, 17879, 7946],
        [39333, 57212, 32182, 14303],
        [70800, 96545, 64364, 25745],
        [127440, 173781, 115854, 46342],
        [254879, 324392, 254879, 92683],
        [509759, 648784, 509759, 185367]
    ];
    var cost_yumi=[
        [360, 72, 72, 216],
        [720, 144, 144, 432],
        [1440, 288, 288, 864],
        [1728, 648, 648, 1296],
        [2592, 972, 972, 1944],
        [3758, 1409, 1409, 2819],
        [5450, 2044, 2044, 4087],
        [9810, 6131, 6131, 2453],
        [17658, 12140, 9933, 4415],
        [31784, 21852, 17879, 7946],
        [57212, 39333, 32182, 14303],
        [96545, 70800, 64364, 25745],
        [173781, 127440, 115854, 46342],
        [324392, 254879, 254879, 92683],
        [648784, 509759, 509759, 185367]
    ];
    var cost_uma=[
        [72, 72, 360, 216],
        [144, 144, 720, 432],
        [288, 288, 1440, 864],
        [648, 648, 1728, 1296],
        [972, 972, 2592, 1944],
        [1409, 1409, 3758, 2891],
        [2044, 2044, 5450, 4087],
        [5518, 6744, 9810, 2453],
        [9933, 12140, 17658, 4415],
        [17879, 21852, 31784, 7946],
        [32182, 39333, 57212, 14303],
        [64364, 70800, 96545, 25745],
        [115854, 127440, 173781, 46342],
        [254879, 254879, 324392, 92683],
        [509759, 509759, 648784, 185367]
    ];

    var cost_shiro=[
        [0, 0, 0, 0],
        [1404, 546, 390, 780],
        [2570, 1000, 714, 1428],
        [4161, 2081, 2081, 2081],
        [7102, 3552, 3552, 3552],
        [9056, 9056, 6037, 6037],
        [14384, 14384, 9589, 9589],
        [22773, 22773, 15183, 15183],
        [33562, 33562, 22374, 22374],
        [44402, 57559, 32890, 29602],
        [65122, 84418, 48239, 43415],
        [95317, 123558, 70605, 63544],
        [113458, 154716, 154716, 92830],
        [150418, 150418, 315878, 135375],
        [219008, 219008, 492770, 164258],
        [294820, 294820, 663345, 221115],
        [488220, 488220, 827854, 318406],
        [839130, 839130, 915414, 457707],
        [1307581, 1307581, 1354280, 700491],
        [1901938, 1901938, 1969864, 1018896]
    ];
    var cost_toride=[
        [104, 400, 136, 160],
        [243, 936, 319, 374],
        [438, 1685, 573, 673],
        [1110, 2467, 1357, 1233],
        [1887, 4194, 2307, 2097],
        [3236, 7191, 3954, 3596],
        [5177, 11505, 6327, 5753],
        [10430, 18776, 13560, 9387],
        [18839, 33912, 24492, 16956],
        [33914, 61043, 44087, 30523],
        [66939, 106495, 85196, 45640],
        [119786, 190570, 152456, 81672],
        [213820, 340166, 272133, 145786],
        [423566, 505021, 456148, 244365],
        [708513, 844765, 763014, 408756]
    ];
    var cost_mura=[
        [400, 136, 104, 160],
        [936, 319, 243, 374],
        [1685, 573, 438, 673],
        [2467, 1357, 1110, 1233],
        [4194, 2307, 1887, 2097],
        [7191, 3954, 3236, 3596],
        [11505, 6327, 5177, 5753],
        [18776, 13560, 10430, 9387],
        [33912, 24492, 18839, 16956],
        [61043, 44087, 33914, 30523],
        [106495, 85196, 66939, 45640],
        [190570, 152456, 119786, 81672],
        [340166, 272133, 213820, 145786],
        [505021, 456148, 423566, 244365],
        [844765, 763014, 708513, 408756]
    ];

    var cost_mihari = [
        [600,840,600,360],
        [960,1344,960,576],
        [1536,2150,1536,922],
        [2458,3441,2458,1475],
        [3932,5505,3932,2359],
        [6291,8808,6291,3775],
        [9437,13212,9437,5662],
        [14156,19818,14156,8493],
        [21233,29727,21233,12740],
        [31850,44590,31850,19110],
        [44590,62426,44590,26754],
        [62426,87396,62426,37456],
        [87397,122355,87397,52438],
        [122355,171297,122355,73413],
        [159062,222686,159062,95437],
        [206780,289492,206780,124068],
        [,,,],
        [349458,489242,349458,209675],
        [419350,587090,419350,251610],
        [503220,704508,503220,301932]
    ];
    var cost_daisyukusya = [
        [200,114,200,438],
        [320,183,320,701],
        [512,293,512,1121],
        [768,439,768,1682],
        [1152,658,1152,2523],
        [1728,987,1728,3784],
        [2419,1382,2419,5298],
        [3387,1935,3387,7418],
        [4741,2709,4741,10385],
        [6637,3793,6637,14538],
        [8628,4930,8628,18900],
        [11217,6409,11217,24570],
        [14582,8332,14582,31941],
        [18956,11735,18956,40620],
        [25817,16429,25817,49286],
        [32271,22003,32271,60141],
        [42172,29337,42172,69675],
        [52715,38963,52715,84803],
        [66009,49506,66009,93512],
        [79211,62708,79211,108914]
    ];
    var cost_enseikunren = [
        [2884,4486,5977,2723],
        [4614,7177,9484,4357],
        [7382,11483,15174,6972],
        [11811,18373,24279,11155],
        [18898,29397,38846,17848],
        [28347,44096,58269,26772],
        [42521,66143,87404,40158],
        [63781,99215,131105,60238],
        [89294,138901,183548,84333],
        [125011,194461,256967,118066],
        [175015,272246,359754,165292],
        [227520,353920,467680,214880],
        [295776,460096,607984,279344],
        [384509,598125,790379,363147],
        [512678,692116,897187,461410],
        [645974,830539,1045863,553692],
        [,,,],
        [,,,],
        [,,,],
        [,,,]
    ];
    var cost_syuugyousyo = [
        [1600,1200,600,600],
        [2240,1680,840,840],
        [3136,2352,1176,1176],
        [4390,3293,1646,1646],
        [6146,4610,2305,2305],
        [8605,6454,3227,3227],
        [11186,8390,4195,4195],
        [14542,10907,5453,5453],
        [18905,14179,7089,7089],
        [24577,18433,9216,9216],
        [31950,23963,11981,11981],
        [38340,28755,14378,14378],
        [46008,34506,17253,17253],
        [55210,41407,20704,20704],
        [66252,49689,24844,24844],
        [72877,54658,27329,27329],
        [80164,60123,30062,30062],
        [88181,66136,33068,33068],
        [96999,72749,36375,36375],
        [106699,80024,40012,40012]
    ];


    var costs = [];
    costs["伐採所"] = cost_wood;
    costs["石切り場"] = cost_stone;
    costs["製鉄所"] = cost_iron;
    costs["畑"] = cost_rice;
    costs["倉庫"] = cost_souko;
    costs["宿舎"] = cost_syukusya;
    costs["工場"] = cost_kojo;
    costs["水車"] = cost_suisya;
    costs["市場"] = cost_ichiba;
    costs["研究所"] = cost_kenkyu;
    costs["訓練所"] = cost_kunren;
    costs["鍛冶場"] = cost_kajiba;
    costs["防具工場"] = cost_bougu;
    costs["兵器工房"] = cost_heiki;
    costs["銅雀台"] = cost_doujaku;
    costs["練兵所"] = cost_renpei;
    costs["兵舎"] = cost_heisya;
    costs["弓兵舎"] = cost_yumi;
    costs["厩舎"] = cost_uma;
    costs["城"] = cost_shiro;
    costs["砦"] = cost_toride;
    costs["村"] = cost_mura;

    costs["見張り台"] = cost_mihari;
    costs["大宿舎"] = cost_daisyukusya;
    costs["遠征訓練所"] = cost_enseikunren;
    costs["修行所"] = cost_syuugyousyo;

    var img_lv = new Array();

    img_lv[0] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWAMQAAKiTADs9BK+dAN7aALGjAMO2QernwPT038CzLOvmANfQgfn577OjDeLbnsjE'+
        'AOXkrrCtALurPsS7FvDtztXOau/qANXRAMf/If/6CLy4ACAgIL+sAGFyB7WdAP///////yH5BAEA'+
        'AB8ALAAAAAAXABYAAAW24PdxZGmepShyWOu+sMutcV3PXKXvSTL8v8Rux9FwLMikxSGhGAwUhxJZ'+
        '5GSu2Azk4el6FJBspropmwmIxUFS6DLMZTJ8Q5gcBPiGpzCXwxFfAhsCCh4IfUZzG20NAI4GBwSI'+
        'HIoMXRQRXAWScH5whV0LBYKTHaanHQARChQMAKinVbCnjo6zpkUjt7uxGhorKBy3Jb4qH77IvrDJ'+
        'xcbOIqgBAc/UxqfS1dkfptja1R3d3tXT2iEAOw==';
    img_lv[1] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWAMQAAEBCAP//IbKcAP7+6mZ5AMjEAPnnRKiTANXRAO3YALy4AP/6CP/zgb+sAO/q'+
        'ACAgIP/6Et7aAP7xV9C2AP///7WdANXRAPLVB6+sALqhAP/7JevmAK2YAP/mAd7aAP///yH5BAEA'+
        'AB8ALAAAAAAXABYAAAWh4PcRZGmepSgSQeu+sEusS23fOD4TTu/7keDm5yM8CJakMlnwaCCFpdJI'+
        'UFivCgxiQJFgsFdqY0xuCBKMrqBMFrPHgo763XC/OXIJh25n47t7b31lHAaAfEd0DRwSh4JHFZGS'+
        'kRwTFxkck5JUmpMHnwKdFUYjoqabDw8rKASiJakqH6mzqZq0sLG5IpMAALq/sZK9wMQfkcPFwBXI'+
        'ycC+xSEAOw==';
    img_lv[2] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPz4Lr+vALKcAGZ5AP/5wP//Ie/qAKeSAP/zlenkAP////7xa7y4AP/n'+
        'F//6CP7+6t7aACAgIL+sAPXTBf/zgf/8TdXRAP7zq7WdAKyaAP381v3rQ+XHAMjEAOvmAMKtAPrn'+
        'Bf36VuzXAP/n5//8c/7yl////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbDwNOJ'+
        'QCwaj0WhkGBoOp9QJ2H5qFqvWOyUcOh6u5Fw+PPtEiSEi3p98ShKGIzFw1afCY28viFa+P0BGnsN'+
        'dxOGhwMVDCMaDgscA4eGhZKGAxqYCRsgkZKUlRkaAhUQjBmVn5IaIQUFIwgIp55olRMaDAsQFXEY'+
        'Gqi0lRoFubwmnYd3GcrLGhQdsNADy8rJ08qY0tbTZ0Pa3tZnEktIBN5FEuJK6Ovo1uzoSvHy0wAA'+
        '8vf3y/X4/ErK+/36ZQAYsJ+9gEEAADs=';
    img_lv[3] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPXZMcjEAKyaAP7+6mZ5AP//If32lu/qANfBAKeSALy4AP/5wP/8Tfnh'+
        'BP/6CLWdACAgIN7aAL+sAP/5rP3rQ/TXHP/////8Yf381uzXANXRALGjAL2rAPflWuvmAPzpLunk'+
        'AP7xa//WQvzkAv36Vv/0l//nF////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAXABYAAAbEQBSq'+
        'QCwaj0WhsGBoOp9QZ2H5qFqvWOy0gOh6u5Jw+PPtFiKFjXq9EYQaJgpGwFafC4u8nlO6+P0gHHp5'+
        'dxOGhxwmIhoDJxcVHIeGhZKGHBwJFRkUAwOVlJWdFH8MHZ9olRMcIA4dChp+DqcFlRwkFweuFRcE'+
        'ppJ3EMHCEAx/FxmMwxDAyhAKAR4eFgoKzczNnZ3NwWdD29/CZxFLSAXbRRHjSuns6crt6Ury88MA'+
        'APP4+ML2+f1Kwfz8+YMQUKC/ewKDAAA7';
    img_lv[4] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAP/8TbWdALqhAKiTAP381mZ5AP//If32gurlAO/qAL+vAP/6CLy4AP/5'+
        'wP///7+sAOHdANTBAP/7JSAgINXRAP74q7CtAP7xa/LVB7GjAP756sjEAP7xV6yaAOvmAMKtAP//'+
        '/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACEALAAAAAAXABYAAAa/wFDI'+
        'QCwaj0Wh0HBoOp9Qp2HJqFqvWOzUoOh6v4pI5ANWGCiGinq95nACEw5bfTY07vj7JVF4dC55d3UQ'+
        'hIUQGgkbGH4ahoSDjhogDg4ejI4QkIYeGBsSBH4eHgKGmoSIDxsOD6yXhaaHCw4WGAgPFh0Lja9o'+
        'Ar6/AqIeGX4EBMACdcjABAMZA8fIysu/xtHSFEPU279n2UNIBtRFFN9C5ejlyOnlSu7vwAAA7/T0'+
        'v/L1+Uq++Pr6Av386ZvnLwgAOw==';
    img_lv[5] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPXZMbWdAL+pAKeSAP/5wGZ5AP//If/zgb+vAPz3AP/6CP///+/qAPfl'+
        'WrKcAP/5rL+sAN7aACAgIPXTBdXRALy4AKyaAP/7OP/8YdXRAP381v/6EMjEAP/sLOvmANK/APnn'+
        'RP7xa/vuWcKtAP/mAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAXABYAAAbGQJPJ'+
        'QCwaj0Wh0HBoOp9Qp2G5qFqvWOzU0Oh6u5Kw+PNtGCaGinpd6Sg4HExG0WFXzgaLfm/RMP4MEBoX'+
        'fBZ4EYiJDx4MJRePFwKJiIeTEQ8iDB4IEAgkD5aVkxcQDAUjpRAXoWiWERcJHgSzf6uToomkGyAE'+
        'IYG2iXgCw8QCBYCmAw/FAsLMAgQBDg4Us8vFzs+QF9fMZ0PP4d4TE0tIBuFF5Eom5O7kzO/r7PRC'+
        'xQAA9frsxPj7/yaG+QO4T8BAgvvyAQwCADs=';
    img_lv[6] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPzlQsjEAKypAP7+6mZ5AP//If/6CP/9iNfTAKeSANfBALy4AP/5rP7x'+
        'a/nhBLWdAL+sAP///yAgIP/5wN7aAO/qAOXHANK/APflWv/zgbKcANXRAP381r+vAPTXHPz3AP37'+
        'luvmAP/mA66eAP/n572fAP/WQv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAXABYAAAa/QBSq'+
        'QCwaj0WhsGBoOp9QZ2F5qFqvWOy0YOl6vZWw6OstTAqctDotACESgrXaXGDY7wyShxAa4PF0EYKD'+
        'ESQhBAskioSCgYwbIxIaDg0aCxuMjoSGEhIUHRINJJlnjIWeDwoenaOEmoMkBAQYCgESIa2DdBC8'+
        'vRC2nZ4eJL4Qu8UQChcZGR8KChvFx8jPz9HIZkPI29ITE0tIBdtF3koo3ujexenl5u5CvgAA7/Tm'+
        'vfL1+Si8+Pr1EP381ZunLwgAOw==';
    img_lv[7] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPvkLb2rALGjAP/+wGZ5AP//Ie/qAP/8daiTANC2AP///7y4AP7xV/LV'+
        'B+HdAP/5rP/6CL+sACAgINXRAP756vz3ALWdAK+sAP/6Ev3xlvrtRcjEAPrpbOvmAL2fAKyaAP/s'+
        'LP/mAf/dvda4AMKtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAXABYAAAbAQJOp'+
        'QCwaj0WhsGBoOp9QZ2EZqVqvWOy0cOh6D4+HxxP2fLuFSYHCbnMsCA4nk+G02+kCY8/HQBYEC4IQ'+
        'GHx7eRKJigN/DSIhCw0DiomIlBKMCyAgEBUlk5SWlAMhGwkikSAXl6KjAwMaCwqgoWqXiiACgKq3'+
        'rZQgAQsdILcSeRfIycgJCg4CCcrJx9HJCdbUyGlD2NzSExNLSAXYRd9KJt/p39Hq5ufvQsoAAPD1'+
        '58nz9vomyPn79hf8/bNHb18QADs=';
    img_lv[8] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPXZMbWdANbSAKiTAP381mZ5AP32lv//IeznAL+vAPv4bf/////+wN7a'+
        'AP/6CLy4APflWtXRAL+sACAgIPnhBP/5rP3xgv/8Ta+dAP7+6u/qAPTXHLGjAP/7OsjEAL2fAOvm'+
        'AP/uV//dvcGuAP/n5//mAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbNwNPJ'+
        'QCwaj0Wh0IBoOp9Qp2H5qFqvWOzUsOl6u46wOPTdGCgGiXot+XgOlgNm8GFLzgaIft+5MBYRDQwa'+
        'CR17EHgTiosZDAwJJg0FIhmLiomWExkLjgwWJBmVlpiWGQkaGo4WCh2ZpIodChoNChUFDBeii6+a'+
        'FX8EBJwHupdoAsfIGYINggUJGcjHeNHIBAERERwKBNQC090CwOLgZ0Pg58hnFEtIBuREFOtK8fTx'+
        '1PXxSvr70QAA+wABIvMXsKCSYwQNGhSQUKHBfwqDAAA7';
    img_lv[9] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPXZRbWdANXRAKiTAP7+6mZ5AP//If/5rNC2AL2oAP/6CP3xgv381vTX'+
        'HLy4AN7aAL+sAO/qAP///yAgINXRAK+sAPvuWezXALGjAP/8Tf3xlsjEAOvmAKyaAP/n597aAMGu'+
        'ANa4AP/8Yf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACQALAAAAAAXABYAAAbAQBLJ'+
        'QCwaj0Wh0HBoOp9Qp2G5qFqvWOzUIOl6u5CwuPOVGCiGinpd4YA0CMQIxGFXzoaHfm8ZNBoIBRMI'+
        'Fnt6eBGJihkIDR4eGBMTGYqJiJURGRMNIY+blJWXlYybgRMMoIqiiwoXCBuCA6mWaJiJjx4Opx62'+
        'eAK/wL8eCgUFCRnBv77JvwQJAQ4EzALL0wTX09QUQ9nd2ttDSAbTRRTgQubp5snq5krv8MEAAPD1'+
        '9cDz9vpKv/n7+wL8/dtH718QADs=';
    img_lv[10] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAP/7OsjEALCtAP7+6mZ5AO3YAP37lv//If/6CKiTAP77a7WdAN7aAP/5'+
        'wPLVB/flWr+sAO/qALGjANXRAP/6EiAgIP////z2rsKtANXRAP/8Tf/zgby4AL+vAP381vnnROvm'+
        'AK+dAP/mAfvjGd7aAPXZRdC2AP7xV//n572fANfBAP/7Jf///wAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAbhwFar'+
        'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0IOlKGuCQOAQuh7wFS0HDFpRYFUG7tMFgAnJ2utDpDCgEFygD'+
        'fQMHF4gXC4QdexEREwYcghOQBgQfKyOIGY+OjxObKJUTDh8iqJMjnmqPkKKVBoIiESIoFwasBa6h'+
        'lBGbHArCGB+VEZ+1IL4eiCAPhyPGewzUtrOot4gEJCLUDNPUCicPHgrhDxAm5d7fauzC5t7w8d5p'+
        'Q+z4+fUWFktIBfqK8FPSgp9BfvgODiTIUAg7AAAaSiToDeLEiy2oWcQ4kcFGjhMjYgwCADs=';
    img_lv[11] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWAMQAAEBCAP/7JdXRALKcAP7+6mZ5AP//IdC2AKiTAO/qAP7xV7y4APLVB7qhAP/z'+
        'gf/6CCAgIPnnRL+sAP///97aANXRAO3YAK+sAP/6ErWdAMjEAOvmAK2YAP/mAd7aAP///yH5BAEA'+
        'AB8ALAAAAAAXABYAAAW54PcVZGmepSgWRuu+sFusT23fOD4XSd9TwI0vAaQIewVIQcAUaDwBjKb5'+
        'jE6ZycJie6kQJooL1wsWb7OS9MDiAA/UbHdagp4POnI1XvFO19McexxzgWCDfkpzEoUKh4uCc3+L'+
        'EYaElI2RiYQKlYCcmIgFGaMZHAcMDRykpqiqo1mkowizA7GzCLWvECOxvb6kSbsjKKK+JRDCIsjL'+
        'yL3MyCrR0rEAANLX16TV2Nwqo9vd3Rng4d3W4SEAOw==';
    img_lv[12] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPz4Lr+vAK+sAP/5wGZ5AP//Ie/qAP/zgenkAKeSAP///7WdAP/nF/7z'+
        'q97aAP7xV7y4AP7+6vLVB9XRAP/6CCAgIL+sAP7xa7KcAP3rQ//zldXRAPrnBf381sjEAOvmAOXH'+
        'AN7aAPnnRL2fAP/n5//8TdC2AKyaAO3YAP/mAf/8c//7Jf7yl//6EsKtAP///wAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAXABYAAAbfQBis'+
        'QCwaj0WhsGBoOp9QZ2FZqVqvWOy0cOgeHmCQGAQug7wFS4HC/ohYrk87sXI4THJ2uhCJDDgSCxAD'+
        'fhALh4cBhBF7FxcZKQiCGY8IGCkoDQsajheNjhkqk6AopRseL52fFygdgiiODCgCCBKYqmqdra+O'+
        'rQQEKQoKuAW6I7woGAsSCHYOxAzRKIYQKLIEy84tGdx70bInEwLWKBMhwujcGd7fpSjq6t/yaUPy'+
        '9vffaRZLSAX4RRb2KQlIMKC9ggGVKFwoDwCAhRAhfnMYsaKSaBQtWmSQUaPFhxqDAAA7';
    img_lv[13] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPzpLsjEAK+sAP7+6mZ5AO3YAP7xa///If/6CKeSAP/5rN7aALWdAP/6'+
        'EvflWr+sANXRAP/5wO/qACAgILGjAP32lv////LVB/3rQ/XZMdXRANC2AP381r2rALy4AP/zgfTX'+
        'HP7xV//8TenkAOvmAP/7Jf/mAdfBAP/WQqyaAP/8Yb2fAP/0l97aAP/nF////wAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAXABYAAAblQBis'+
        'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0MOlOGOCSuAQul7wFSmHDFrhMDkGbNGotVnJ2uvD5DCIEFyID'+
        'fiIXh4cBhB97EBAVBiCCFY8tBwYqLxcZlBCNjhUnk6AVKBkdCyoqjp+PoiKdqguIEh6sao6ugqsV'+
        'ASceCgaHJ7cFuSoZuxCiFsDJBLaeag3UKoYiKtQSiBcdBtQNe+AqHBge2Q0KGg8PIQoK4OLjquAN'+
        'qvT1aUP1/P3xFBSWICngrwhAJTAAKgTIb+FBhBCF1AMAIKJFhOAoXtwIg5pGjhcbfAR5sSLHIAA7';
    img_lv[14] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPnnRL+vALCtAP381mZ5AP//Ie/qAP7xa9C2AKiTAP74q7WdAN7aAP/7'+
        'JfLVB////7y4ANXRAP/6CCAgIL+sAOrlAP/zgf7xV7GjAP/5wNXRAP7+6v/6EsjEAKyaAOvmAL2f'+
        'AN7aAP/8Tf/mAf/n58KtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAXABYAAAbZwNOp'+
        'QCwaj0WhsGBoOp9QZ2E5qVqvWOy0cOgeGmCQ1xv2FigFidojcnQ86rVn5ICrz4VIZLDhQDADensW'+
        'BH+BengVFRkWF38ZiowcCI+KFYmRJJUZJhoaH5WKmIuaGB8VHwgcCQp/H6eXaJYZpacWEBwaELt/'+
        'orKKHwF/ChUCGgsIjgsYAr4FDNAfGK7Rrw/DCtB40AwKCQ8C2dwKAuDiDNvjCufq7GdD3PHy82cU'+
        'S0jP9EQU9kr8//zkAeSnpKDBeAAAGFy4kFtChhCVQHsYMSIDihUjKqwYBAA7';
    img_lv[15] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPXZMb+vAK+sAP/5wGZ5AP//If7xa+vmANC2AKeSAP/6Ev///7WdAPfl'+
        'Wv/5rL2fAP/6CPLVB7y4AP/7JSAgIL+sAN7aAO3YAP381tXRANXRAPnnRLKcAPfyAP/zgcjEAP7x'+
        'V//sLP7+6v/mAayaAP/8Yd7aAP/7OPz3AMKtAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACsALAAAAAAXABYAAAbowNWq'+
        'QCwaj0WhsGBoOp9QZ2EZqVqvWOy0gOgiLmDvF0z2FiqFjRp0oixA69RigTKl4JtzYTIZaEYMIQN9'+
        'GgyGDA8agxN6FhYdGB+BHY8iDCQlmSUNjo2OHSSTjwcMIh8PHyqUFp4WJaEhJa4PDAQhtA+yrGiO'+
        'rrCyJQIiCsSGuq0lHIHADxkJCsq5nWgN1SUhy9UEh7UCHd961Q0lCRICmw0KAQ4OEsTfHeHimvDf'+
        'xAod4g1nQ/r+/+LOVFiCpADAIhUGKknIMKG/hgmVSJyoDwCAiRgxirOYsaOSahw9emwQUqTHiyKD'+
        'AAA7';
    img_lv[16] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPzlQsjEAKypAP7+6mZ5AP//IdfBAP/zgf/6CKeSAP/5rLWdAO/qAP/m'+
        'A7+sAN7aAP////LVB/flWrKcACAgINXRAP/5wNC2AOXHALy4AP37lr+vANXRAPTXHP7xa/381uvm'+
        'APz3AP/7Ja6eAP7xV72fAP/mAf/n5//9jN7aAP/WQv/6Eu3YAP///wAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC4ALAAAAAAXABYAAAblQJer'+
        'QCwaj0WhsGBoOp9QZ2GZqFqvWOy00Og2IOCQ9xseFyoFi1qgGrEEaotAlFLB4+eCRkPqECIlA3sk'+
        'HAQbgnt7eQ8PFC0IgBSMJBsEBySYjA+LkyeRjQ4RCB8LCAeSm2iaJJ4lJA+UEREXIBELr6kFq62v'+
        'JLMnChyyuJywAYC9BAQYCscbxGgM0iQlyNLHsrMcJNJ50gwKGBIcCtIKGRMTHgoKFO7e3+zt7hTy'+
        '7d8MZ0P4/P3fZxWWICngr0iFgEoOKjzIb+FBJRAj4gMAIKJFi98oXtyoRJpGjhwZfATJsSLIIAA7';
    img_lv[17] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPvkLb2rAK+sAP/+wP//IWZ5ANC2AP/zge/qAKiTALy4AP////7xV/LV'+
        'B97aALWdAP/7JdXRAP7+6v/5rP/6CCAgIL+sAPrpbO3YAP/6ErGjAPrtRdXRAMjEAOvmAKyaAN7a'+
        'AMKtAP3xlv/8df/mAb2fAP/sLNa4AP/dvf/n5/z3AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAXABYAAAbeQBbL'+
        'QCwaj0Wh0FBoOp9Qp2FZqVqvWOzUkOgmHuCPOPwJew0Wg2TtCUU0HolnRfJ4NPC1BG1YLAYdEwwN'+
        'A38UDAQMihSFC3wXFxsZCIMbkYcNJSeVkI+QGyWcG4cgIBQTIpYXnpGhDZYbJxwKriCQq2m3oJyR'+
        'GxsjDB2quAa3IByDtpAgAojKnWkQ0iANydIQIAEMGCDXEHzXCgcOAgrh4+Xe4OEK5t7t7tdoQ971'+
        '9vIWFktIBvdF+UpY5BuYrx5BgAETCvEGAIDChwGvNYRIkYW0iRUhQsCYEaLDikEAADs=';
    img_lv[18] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPnnRMjEAK+sAP381mZ5AOznAP32lv//If/6CKiTAPTXHLWdAN7aAPv4'+
        'bf/////+wL+sAO/qAPLVByAgILGjANXRAP/zgf/5rPXZMfflWv7+6tC2AL+vALy4ANXRAP/mAevm'+
        'AP/7Ov/7Jf7xV//8Tf/6Er2fAP/n58GuAK+dAP/dvd7aAP///wAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAbowFar'+
        'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0IOlKGuCQOAQuN8YFSsHCFrBGJkFbdMAcSiy5JV3weAYfGw8k'+
        'A38XDw4kEA8bBoV8EREVBockFZIPDwYgEASWkZCRFSCDlxUOmQ8YKSqREaGSpJ+TG4KqHZevaq6j'+
        'pREdGxAdIAQPF7mwKgG+EYgKCqgHrboFDNYqJIMq24sQiwQGFdZ81gwKHBMdCtYKGRoaC+rl5OXP'+
        '6/X29+MUQ+X+/wDT8BuCpFpAIhQGCknIMOG/hgmVSJzoDwCAiRgxlrOYsaMSaxw9emQQUqTHiyKD'+
        'AAA7';
    img_lv[19] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPnnRLqhAK+sAP381v//IWZ5AOvmAP/zgdXRAKiTAPTXHP///7WdAP/6'+
        'CO3YAP/5rPfyAN7aALy4AP/6EtXRAL+sACAgIP/8Tf7+6rGjANC2APLVB8jEAP7xV//7Jf3xlqya'+
        'AMGuAP/n597aAPXZRf/8Yda4AP/mAb2fAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAXABYAAAbeQJXK'+
        'QCwaj0Wh0FBoOp9Qp2HpqFqvWOzUcOgeJGDvF0z2Gi6GirpD+lA6axIGAjGR4JWzYTIZJDIMHgN9'+
        'CQQEEIAQgxN6FhYaDwiBGo8QBCEhDwwMlBaNjhook48MBCKYpZ2fj6IelBoQpYgMCKpojqyjGiIe'+
        'ECCACbYGDcQhAYEhxZgLtMnEesQNIR7I0SECGRkbGtHQxAobHAIK0eAlC+TdaNENCu7s7e/sZ0Pw'+
        '9vdnF0tIw/ZFF/qUABwIEB5BgEoSKmQHAIDChw+jNYRIUQmxiRUrNsCYsaLDjEEAADs=';
    img_lv[20] = 'data:image/gif;base64,'+
        'R0lGODlhFwAWANUAAEBCAPXZRcjEAKypAP381mZ5AOXHAP37lv//If/6CKShAP/nF/77a////97a'+
        'ALWdAP/5wNXRAPXTBfz2ru/qACAgIP/zgb+sAPz4LrGjAP7+6vflWt7aALy4AL2rAP/8Tf/mAevm'+
        'AMGuANfBAP3rQ6yaAOnkAKeSAOzXAP/n5/vuWc/LAP7yl//8c/v2C72fAP/WQv/7OsaqAP///wAA'+
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADMALAAAAAAXABYAAAb0wNms'+
        'QCwaj0WhsIBoOp9QZ2GZqFqvWOy0QOlSHGBwaBwWjwuVQmQtMLUmk49gJeB84DHBGl3odDIqDYKC'+
        'GAMDB4MNDAMdfBcXGRYMKCULDSQlKBoEIyCCIheOjxklpSwEIiUQBKUlFg0goWmPFw8lHhYaKCco'+
        'DSolFyWBKLIFtBkgEBC7J54WrROsxaMMDRoWcBMeggESiLHFD7YQ1tkswoMaCxkZD3ziJRIGJ/T0'+
        '7BIbAR4n4u5p/aX6CWxVQiCaIQITKuyHpsISJAUWFqngUAnFixQTYqSopKNHgQAAeBw5sl9IkiiV'+
        'iDuZMuUDli1TimwZBAA7';

    Pika_prepareForDisplayBuildStatus();//Lv0表示

    var xybld_a = new Array();
    var allbld = $a("//li/span[@class=\"buildStatus\" and contains(text(),\"建設\")]/a");
    for(var idx=0 ; idx<allbld.length ; idx++) {
        var tmp = allbld[idx].href.match(/x=([\-0-9]+).*y=([\-0-9]+)/);
        if( tmp != null ) {
            xybld_a.push(tmp);
        }
    }

    allbld = $a("//li[contains(text(), \"削除中\")]/span[@class=\"buildStatus\"]/a");
    var xybld_d = new Array();
    for(var idx=0 ; idx<allbld.length ; idx++) {
        var tmp = allbld[idx].href.match(/x=([\-0-9]+).*y=([\-0-9]+)/);
        if( tmp != null ) {
            xybld_d.push(tmp);
        }
    }
    var allarea = $a("//area");
    for(var idx=0 ; idx < allarea.length ; idx++) {
        var title = allarea[idx].getAttribute("title").match(/^(.*) LV\.([0-9]+)$/);
        if( !title ) {
            title = [allarea[idx].getAttribute("title"), allarea[idx].getAttribute("title"), 0];
        }
        if( costs[title[1]] ) {
            if(costs[title[1]][title[2]]) {
                var xy = allarea[idx].getAttribute("href").match(/^.*(?:\?|&)x=([\-0-9]+)&y=([\-0-9]+)+(?:&[^=]+=[^&]+)*$/);
                var level = parseInt(title[2],10);
                var blding = 0;
                var dlting = 0;
                for ( var xxx=0 ; xxx < xybld_a.length ; xxx++){
                    if( xy[1] == xybld_a[xxx][1] && xy[2] == xybld_a[xxx][2] ) {
                        level ++ ;
                        blding += 2;
                    }
                }
                for ( var xxx=0 ; xxx < xybld_d.length ; xxx++){
                    if( xy[1] == xybld_d[xxx][1] && xy[2] == xybld_d[xxx][2] ) {
                        dlting ++;
                    }
                }
                try {
                    if( costs[title[1]].length <= level || // maxinum level reached
                        RES_NOW.wood < costs[title[1]][level][0] ||
                        RES_NOW.stone< costs[title[1]][level][1] ||
                        RES_NOW.iron < costs[title[1]][level][2] ||
                        RES_NOW.rice < costs[title[1]][level][3] ) {
                            //lvを黄色に
                            var thisimg = getLevelImageHTML(xy[1], xy[2], "mapicon");
                            if( thisimg  ) {
                                thisimg.src = img_lv[parseInt(title[2],10)];
                            }
                    }
                }catch(e) {
                    GM_log("catched");
                }
                if( (blding || dlting) && !OPT_PIKA_BLINKBLD ) {
                    //建築中
                    var thisimg = getLevelImageHTML(xy[1], xy[2], "mapicon");
                    if( thisimg  ) {
                        thisimg.style.outlineColor = (blding) ? "red" : "blue";
                        thisimg.style.outlineStyle = "dotted";
                        thisimg.style.outlineWidth = "2px";
                    }
                }
            }
        }
    }
    if( OPT_PIKA_BLINKBLD) Pika_displayBuildStatus();

    function getLevelImageHTML(x, y, cls) {
        var xdom = "";
        var no = (101 + parseInt(x,10) * 7 + parseInt(y,10)).toString().substr(-2);
        xdom = "//img[@class=\"" + cls + no + "\"]";

//      var maps = document.getElementById("maps");

        return $x(xdom, $("maps") );
    }
}


//////////////////////
//メモ処理
//////////////////////
function disp_memo()
{
    var icon_memo = 'data:image/gif;base64,'+
                    'R0lGODlhEQAPAKIAAP///+np6dXV1VpaWlhYWEVFRURERDMzMyH5BAQUAP8ALAAAAAARAA8AAAM7'+
                    'eLrcXGTIOYo7RITNAyEWMwRAaQIj0YynOaAr2aKwKLfvEM+0bvO53Sz4G9YWEMrEcCziLknlwHCp'+
                    'NhIAOw==';

    var cnt = parseInt(OPT_MEMO_COUNT, 10);
    if( isNaN(""+cnt) || cnt < 1 ) cnt = 1;
    if( cnt > 5 ) cnt = 5;
    for(var i=0 ; i<cnt ; i++){
        createMemoTab(i);
    }

    function createMemoTab(no)
    {
        if( !no ) no = "";

        var title = "メモ";
        if( no ) title += (no +1 );
        var elms = ccreateSideBox("beyond_sidebox_memo" + no, icon_memo, title);

        var ta = d.createElement("textarea");
        ta.id = "beyond_memobox" + no;
        ta.rows = OPT_MEMO_HEIGHT;
        ta.cols = OPT_MEMO_WIDTH;

        if (isNarrow) {
            ta.rows = OPT_MEMO_HEIGHT - 1;
            ta.cols = OPT_MEMO_WIDTH - 4;
        }

        ta.style.fontSize= OPT_MEMO_FONT_SIZE + "px";
        ta.value= cloadData( "memo" + no, "", true );

        elms.sideBoxInner.appendChild(ta);


        var sv = d.createElement("a");
        sv.href = "javascript:void(0);";
        sv.innerHTML = "保存";
        $e(sv, "click", function() {
            var memoBox = $("beyond_memobox" + no);
            if( memoBox ) {
                csaveData( "memo" + no, memoBox.value, true );
                alert("保存しました");
            }
        });
        var dv = d.createElement("div");
        dv.appendChild(sv);
        elms.sideBoxInner.appendChild(dv);
    }
}
//////////////////////
//拠点リンク機能
//////////////////////
function disp_baseLink()
{
    var elm = $x('id("lodgment")/div[@class="floatInner"] | //div[@class="sideBoxInner basename"]');
    if( !elm ) return;

    var bases = $a("//li/child::*", elm);

    for( var idx=0 ; idx < bases.length ; idx++) {
        addBaseLink(bases[idx]);
    }

    function addBaseLink(elem) {

        var thistitle = elem.title;
        if( !thistitle ) return;

        var xy = thistitle.match(/^.*\(([\-0-9]+)\,([\-0-9]+)+\)$/);

        if( !xy ) return;

        var a_m, a_v, a_n;

        var a_m_img = d.createElement("img");
        a_m_img.style.paddingLeft = "3px";
        a_m_img.src = img_map;
        var a_v_img = d.createElement("img");
        a_v_img.style.paddingLeft = "3px";
        a_v_img.src = img_mura;
        var a_n_img = d.createElement("img");
        a_n_img.style.paddingLeft = "3px";
        a_n_img.src = img_naisei;

        a_m = d.createElement("a");
        a_m.href = caddSessionId("/map.php?x=" + xy[1] + "&y=" + xy[2]);
        a_m.title = "マップ(" + xy[1] + "," + xy[2] + ")" ;
        a_m.appendChild(a_m_img);

        a_v = d.createElement("a");
        a_v.title = "表示";
        a_v.appendChild(a_v_img);
        a_n = d.createElement("a");
        a_n.title = "内政";
        a_n.appendChild(a_n_img);

        if( elem.href ) {
            var id = elem.href.match(/^.*\?village_id=([0-9]+).*$/);
            if( id ) {
                a_v.href = caddSessionId("/village_change.php?village_id=" + id[1] + "&from=menu&page=/village.php#ptop");
                a_n.href = caddSessionId("/village_change.php?village_id=" + id[1] + "&from=menu&page=/card/domestic_setting.php#ptop");
            }
        } else {
            a_v.href = caddSessionId("/village.php#ptop");
            a_n.href = caddSessionId("/card/domestic_setting.php#ptop");
        }

        var spn = d.createElement("span");
        spn.appendChild(a_v);
        spn.appendChild(a_m);
        spn.appendChild(a_n);
        elem.parentNode.insertBefore(spn, elem.nextSibling);

    }
}

//////////////////////
//領地リンク機能
//////////////////////
function disp_mapLink()
{

    //暫定的にsplit("\n")で3なら領地リンク、4なら君主リンクに
    if( location.pathname == "/land.php" ) {

        var div = $("tMenu");
        if( div ) {
            var lnk = d.createElement("a");
            lnk.href = "javascript:void(0);";
            lnk.innerHTML = "領地リンクの追加";
            div.appendChild(lnk);
            $e(lnk, "click", function() {saveMapLink();});

        }
    }else if( location.pathname == "/user/index.php" || location.pathname == "/user/" ) {

        var table = $x("//table[@class=\"commonTables\"]");
        if( table ) {
            var lnk = d.createElement("a");
            lnk.href = "javascript:void(0);";
            lnk.innerHTML = "君主リンクの追加";
            $e(lnk, "click", function() {saveMapLink();});
            table.parentNode.insertBefore(lnk, table.nextSibling);
        }
    }


    var icon_map = 'data:image/gif;base64,'+
                'R0lGODlhEQAPALMAANO3SayTQ3drPFxQsFNTUUA3uTMzMxoamBgYnxsNxg0G8ggC9AAA/wAAAAAA'+
                'AAAAACH5BAQUAP8ALAAAAAARAA8AAARL0MhJq50InVsT+wknIctnIhZZmmZYIWy8CAFATLGpADwQ'+
                'TCuGYljo9W4Gz2dnNP4MMNOgaQRKqT3BJJFACLC9C1bLqfWeIpqATIkAADs=';

    var elms = ccreateSideBox("beyond_sidebox_xylink", icon_map, "領地/君主ﾘﾝｸ");
    elms.sideBoxInner.id = "beyond_sidebox_xylink_inner";

    resetMapLinks();


}

function saveMapLink( )
{
    if( location.pathname == "/land.php" ) {
        var allDivs, thisDiv;
        var v_name = "";

        var basename = $x("//span[@class=\"basename\"]");

        var xy = location.search.match(/^\?x=([\-0-9]+)\&y=([\-0-9]+)+$/);

        if( basename ) {
            v_name = basename.innerHTML;
            if( v_name =="空き地" ) {
                v_name += xy[1] + "," + xy[2];
            }
        }

        v_name = prompt("名前を入力してください", v_name);
        if( !v_name ) return;

        var maplinks = cloadData( "links", 0, true );
        var value = v_name + "\n" + xy[1] + "\n" + xy[2];
        csaveData( "link" + maplinks  , value, true );
        maplinks++;
        csaveData( "links"  , maplinks, true );

        resetMapLinks();

    }else if( location.pathname == "/user/index.php" || location.pathname == "/user/" ) {
        var user_id = URL_PARAM.user_id;
        var tmp = d.body.innerHTML.match(/<td>君主<\/td>[^<]*?<td>(.+)<\/td>/);
        if( !tmp ) return;
        var user_name = tmp[1];

        var comment = "";

        disp_name = prompt("名前を入力してください", user_name);
        if( !disp_name ) return;

        comment = prompt("コメントを入力してください", comment);

        var maplinks = cloadData( "links", 0, true );
        var value = user_id + "\n" + user_name + "\n" + disp_name + "\n" + comment;
        csaveData( "link" + maplinks  , value, true );
        maplinks++;
        csaveData( "links"  , maplinks, true );

        resetMapLinks();

    }
}

function configMapLinkClose()
{
    var elem = $("beyond_mapLinkWindow");
    if( !elem ) return;
    $("beyond_floatpanel").removeChild(elem);
}

function configMapLink(n, evt)
{
    var tmp = cloadData( "link" + n , "", true );
    if( !tmp ) return ;

    configMapLinkClose();

    data = tmp.split("\n");

    var lw = d.createElement("div");
    lw.id = "beyond_mapLinkWindow";
    lw.style.position = "absolute";
    if( data.length == 3 ) {
        lw.style.backgroundColor = "thistle";
        lw.style.border = "outset 2px thistle";
    }else if( data.length == 4 ) {
        lw.style.backgroundColor = "lightgreen";
        lw.style.border = "outset 2px lightgreen";
    }
    lw.style.fontSize = "10px";
    lw.style.padding = "10px";
    lw.style.zIndex = 1000;
    lw.style.left = evt.pageX - 176 + "px";
    lw.style.top = evt.pageY - 111 + "px";

    if( data.length == 3 ) {
        ccreateTextBox(lw, "LINK_TITLE", data[0], "名称","名称",20, 0);
        ccreateTextBox(lw, "LINK_X", data[1], "X座標","X座標",10, 0);
        ccreateTextBox(lw, "LINK_Y", data[2], "Y座標","Y座標",10, 0);
    }else if( data.length == 4 ) {
        var dv = d.createElement("div");
        dv.innerHTML = "id=" + data[0] + "　　" + data[1] + "<br>";
        lw.appendChild(dv);
        ccreateTextBox(lw, "LINK_TITLE", data[2], "表示名","表示名",20, 0);
        ccreateTextBox(lw, "LINK_COMMENT", data[3], "コメント","コメント",20, 0);
    }
    //設定ボタン
    ccreateButton(lw, "保存", "内容を保存します", function() {
        var v = "";
        if( data.length == 3 ) {
            v = cgetTextBoxValue("LINK_TITLE") + "\n"
                + cgetTextBoxValue("LINK_X") + "\n"
                + cgetTextBoxValue("LINK_Y");
        }else if( data.length == 4 ) {
            v = data[0] + "\n" + data[1] + "\n"
                + cgetTextBoxValue("LINK_TITLE") + "\n"
                + cgetTextBoxValue("LINK_COMMENT");
        }
        csaveData( "link" + n  , v, true );
        configMapLinkClose();
        resetMapLinks();
    });

    //削除
    ccreateButton(lw, "削除", "削除", function() {
        if(!confirm("削除してよろしいですか？") ) return false;

        var maplinks = cloadData( "links", 0, true );
        for(var i = n+1 ; i < maplinks ; i++) {
            var tmp = cloadData( "link" + i, "", true );
            csaveData( "link" + (i-1), tmp, true );
        }
        csaveData( 'links'  , maplinks-1, true );
        configMapLinkClose();
        resetMapLinks();
    });

    //上に移動
    if( n != 0 ) {
        ccreateButton(lw, "▲", "上に移動", function() {
            var tmp = cloadData( "link" + (n-1), "", true );
            csaveData( "link" + (n-1), cloadData( "link" + n, "", true ), true );
            csaveData( "link" + n, tmp, true );
            configMapLinkClose();
            resetMapLinks();
        });
    }
    //下に移動
    var maplinks = cloadData( "links", 0, true );
    if( n + 1 < maplinks ) {
        ccreateButton(lw, "▼", "下に移動", function() {
            var tmp = cloadData( "link" + (n+1), "", true );
            csaveData( "link" + (n+1), cloadData( "link" + n, "", true ), true );
            csaveData( "link" + n, tmp, true );
            configMapLinkClose();
            resetMapLinks();
        });
    }

    //閉じる
    ccreateButton(lw, "閉じる", "閉じる", function() {configMapLinkClose();});

    $("beyond_floatpanel").appendChild(lw);
}

function resetMapLinks()
{
    var ul = $("beyond_sidebox_xylink_ul");
    if( ul ) {
        ul.parentNode.removeChild(ul);
    }
    ul = d.createElement("ul");
    ul.id = "beyond_sidebox_xylink_ul";

    var maplinks = cloadData( "links", 0, true );
    for(var i=0 ; i<maplinks ; i++) {
        var tmp = cloadData( "link" + i , "", true );
        if( tmp != "" ) {
            var li = d.createElement("li");

            var data = tmp.split("\n");

            if( data.length == 3 ) {
                //領地リンク
                var link1 = d.createElement("a");
                link1.href = caddSessionId("/land.php?x=" + data[1] + "&y=" + data[2] + "#ptop");
                link1.title = "表示(" + data[1] + "," + data[2] + ")";
                link1.innerHTML = data[0];
                link1.style.fontSize = OPT_MAPLINK_FONT_SIZE + "px";

                var link2 = d.createElement("a");
                link2.href = caddSessionId("/map.php?x=" + data[1] + "&y=" + data[2] + "#ptop");
                link2.title="マップ(" + data[1] + "," + data[2] + ")";

                var a_m_img = d.createElement("img");
                a_m_img.src = img_map;
                link2.appendChild(a_m_img);

                var m = "";
                var dist = cgetDistanceFromBase(data[1], data[2]);
                if( dist != -1 ) {
                    m ="　距離[" + dist.toFixed(2) + "]";
                }
                var link3 = d.createElement("a");
                link3.href = caddSessionId("/facility/castle_send_troop.php?x=" + data[1] + "&y=" + data[2] + "#ptop");
                link3.title = "兵を送る(" + data[1] + "," + data[2] + ")" + m;

                var a_s_img = d.createElement("img");
                a_s_img.src = img_ken;
                link3.appendChild(a_s_img);

                var link4 = d.createElement("a");
                link4.href="javascript:void(0)";
                link4.title="設定";

                var a_d_img = d.createElement("img");
                a_d_img.src = img_hanma;
                link4.appendChild(a_d_img);
                (function(n){
                    $e(link4, "click", function(event){configMapLink(n,event);});
                })(i);

                li.appendChild(link1);
                li.appendChild(link2);
                li.appendChild(link3);
                li.appendChild(link4);
                ul.appendChild(li);
            }else if( data.length == 4 ) {
                //君主リンク
                var img = d.createElement("img");
                img.src = img_user;
                li.appendChild(img);

                var link1 = d.createElement("a");
                link1.href = caddSessionId("/user/index.php?user_id=" + data[0] + "#ptop");
                link1.title = data[3];
                link1.innerHTML = data[2];
                link1.style.fontSize = OPT_MAPLINK_FONT_SIZE + "px";

                var link2 = d.createElement("a");
                link2.href=caddSessionId("/message/new.php?user_id=" + data[0] + "#ptop");
                link2.title="[" + data[1] + "]宛に書簡を送る";

                var a_m_img = d.createElement("img");
                a_m_img.src = img_mail;
                link2.appendChild(a_m_img);

                var link3 = d.createElement("a");
                link3.href="javascript:void(0)";
                link3.title="設定";

                var a_d_img = d.createElement("img");
                a_d_img.src = img_hanma;
                link3.appendChild(a_d_img);
                (function(n){
                    $e(link3, "click", function(event){configMapLink(n,event);});
                })(i);

                li.appendChild(link1);
                li.appendChild(link2);
                li.appendChild(link3);
                ul.appendChild(li);
            }
        }
    }

    $("beyond_sidebox_xylink_inner").appendChild(ul);

}

//////////////////////
//領地リンクの読み込み・保存機能
//////////////////////
function mapLinkList(evt)
{
    if( $("beyond_SaveMapLinkWindow") ) return;

    var mc = d.createElement("div");
    mc.id = "beyond_SaveMapLinkWindow";
    mc.style.position = "absolute";
    mc.style.backgroundColor = "blueviolet";
    mc.style.border = "outset 2px blueviolet";
    mc.style.fontSize = "12px";
    mc.style.padding = "15px";
    mc.style.zIndex = 1000+1;
    mc.style.left = evt.pageX - 250 + "px";
    mc.style.top = evt.pageY - 220 + "px";
    var ta = d.createElement("textarea");
    ta.id = "beyond_SaveMapLinkWindow_text";
    ta.rows = 10;
    ta.cols = 40;
    var txt = "";
    var maplinks = cloadData( "links", 0, true );
    for(var i=0 ; i<maplinks ; i++) {
        var tmp = cloadData( "link" + i , "", true );
        if( tmp ) {
            txt += tmp.replace(/\n/g, "\t" ) + "\n";
        }
    }
    ta.value = txt;

    mc.appendChild(ta);
    $e(ta, "keydown", function(event) {
        //TAB入力
        var kC = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
        if (kC == 9 && !event.shiftKey && !event.ctrlKey && !event.altKey)
        {
            var oS = this.scrollTop;
            var sS = this.selectionStart;
            var sE = this.selectionEnd;
            this.value = this.value.substring(0, sS) + "\t" + this.value.substr(sE);
            this.setSelectionRange(sS + 1, sS + 1);
            this.focus();
            this.scrollTop = oS;
            if (event.preventDefault)
            {
                event.preventDefault();
            }
            return false;
        }
        return true;
    } );

    var sv = d.createElement("a");
    sv.href = "javascript:void(0);";
    sv.innerHTML = "保存";
    $e(sv, "click", function() {
        if( confirm("上書き保存します。よろしいですか？") == false) return;
        var  ta = $("beyond_SaveMapLinkWindow_text");
        if( ta ) {
            var lines = ta.value.split("\n");
            var saveLines = new Array();
            for( var i=0 ; i<lines.length ; i++) {
                if( lines[i] == "" ) continue;
                var dat = lines[i].split("\t");
                if( dat.length != 3 && dat.length != 4 ) {
                    alert("解析エラーです。処理を中断します。\n( " + lines[i] + " )" );
                    return;
                }
                //チェック
                if( dat.length == 3 ) {
                    if( !dat[1].match(/[\-0-9]+/g)  || !dat[2].match(/[\-0-9]+/g) ) {
                        alert("解析エラーです。処理を中断します。\n( " + lines[i] + " )" );
                        return;
                    }
                }else if ( dat.length == 4 ) {
                    if( dat[3] == "" && dat[1].match(/[\-0-9]+/g) && dat[2].match(/[\-0-9]+/g) ) {
                        dat.pop();
                    }else  if( !dat[0].match(/[\-0-9]+/g) ) {
                        alert("解析エラーです。処理を中断します。\n( " + lines[i] + " )" );
                        return;
                    }
                }else{
                    alert("解析エラーです。処理を中断します。\n( " + lines[i] + " )" );
                    return;
                }
                var linedata = "";
                for( var j=0 ; j<dat.length ; j++ ){
                    dat[j] = dat[j].replace(/(^\s+)|(\s+$)/g, "");
                    if( linedata != "" ) {
                        linedata += "\n";
                    }
                    linedata += dat[j];
                }
                saveLines.push(linedata);
            }

            //削除
            var maplinks = cloadData( "links", 0, true );
            for(i=0 ; i<maplinks ; i++) {
                cdelData( "link" + i, true );
            }
            //追加
            for(var i=0 ; i<saveLines.length ; i++ ) {
                csaveData( "link" + i  , saveLines[i], true );
            }
            csaveData( "links"  , saveLines.length, true );


            alert("上書き保存しました");
            resetMapLinks();
        }
    });

    var cl = d.createElement("a");
    cl.href = "javascript:void(0);";
    cl.innerHTML = "閉じる";
    $e(cl, "click", function() {
        var mc = $("beyond_SaveMapLinkWindow");
        if( mc ) {
            mc.parentNode.removeChild(mc);
        }
    });
    var dv = d.createElement("div");
    dv.appendChild(sv);
    dv.appendChild(d.createTextNode(" ") );
    dv.appendChild(cl);


    mc.appendChild(dv);
    $("beyond_floatpanel").appendChild(mc);

}

//////////////////////
//座標リンク処理
//////////////////////
function disp_XYLink()
{
    var flg_profile_xy = false;
    var flg_include_a = false;

    //1行コメント
    var comment = $a("//*[@id=\"commentList\"]//tr/td[2]");

    for(var i=0 ; i< comment.length ; i++) {
        setXYLink( comment[i] );
    }

    //各エレメント
    var targetPath = new Array();

    if( location.pathname == "/alliance/chat_view.php" ) {
        targetPath.push( "//div[@class=\"hitokotoList\"]/p[2]" );
    }
    if( location.pathname == "/alliance/info.php" ) {
        targetPath.push( "//tr[th[contains(text(),\"コメント\")]]/td" );
    }
    if( location.pathname == "/message/detail.php" ) {
        targetPath.push( "//tr[th[contains(text(),\"件名\")]]/td" );
        targetPath.push( "//tr[th[contains(text(),\"本文\")]]/td" );
    }
    if( location.pathname == "/bbs/res_view.php" ||
        location.pathname == "/bbs/personal_res_view.php" ) {
        targetPath.push( "//th[@class=\"mainTtl\"]/div[@class=\"threadTtl\"]" );
        targetPath.push( "//td[@class=\"contents\"]" );
        targetPath.push( "//table[@class=\"commonTables\"]//tr[2]/td[1]" );
    }
    if( location.pathname == "/user/index.php" || location.pathname == "/user/" ) {
        if( URL_PARAM.user_id && USER_ID != URL_PARAM.user_id ) {
            targetPath.push( "//table[@class=\"commonTables\"]//tr[position()>12]/td[2]" );
            flg_profile_xy = true;
        }
    }

    for(var i=0 ; i< targetPath.length ; i++) {
        var elms = $a(targetPath[i]);
        for(var j=0 ; j<elms.length ; j++) {
            setXYLink(elms[j]);
        }
    }

    function setXYLink(elm) {
        var tmpHTML = elm.innerHTML;

        var reg = /[\(|（|【]([\-0-9０-９]+)( *[,&、・，] *)([\-0-9０-９]+)[\)|）|】]/g;
        if(OPT_XYLINK_NK || flg_profile_xy ) {
            reg = /([\-0-9０-９]+)( *[\,&、・，] *)([\-0-9０-９]+)/g;
        }

        var elm_child_a = null;
        if( flg_include_a ) {
            elm_child_a = $x("descendant::a", elm);
        }

        tmpHTML = tmpHTML.replace(reg, XYLinkReg );

        elm.innerHTML = tmpHTML;

        function XYLinkReg() {

            var img_send = IMG_DIR + "report/icon_go.gif";
            var img_mp = IMG_DIR + "report/icon_scout.gif";
            var m = "";
            var dist = cgetDistanceFromBase(arguments[2], arguments[4]);
            if( dist != -1 ) {
                m = "　距離[" + dist.toFixed(2) + "]";
            }
            var x = toHankaku(arguments[1]);
            var y = toHankaku(arguments[3]);
            var disp = x + arguments[2] + y;
            if( !OPT_XYLINK_NK && !flg_profile_xy) disp = "(" + disp + ")";
            var txt = '<a href="'+caddSessionId('/land.php?x=' + x + '&y=' + y + '#ptop')+'" title="表示" style="display:inline;">' + disp + '</a>';
            txt += '<a href="'+caddSessionId('/map.php?x=' + x + '&y=' + y + '#ptop')+'" title="マップ' + x + ',' + y + '" style="display:inline;"><img src="' + img_mp + '" style="width:14px; height:14px; vertical-align:middle;"></a>';
            txt += '<a href="'+caddSessionId('/facility/castle_send_troop.php?x=' + x + '&y=' + y + '#ptop')+'" title="兵を送る' + x + ',' + y + m + '" style="display:inline;"><img src="' + img_send + '" style="width:14px; height:14px; vertical-align:middle;"></a>';

            //Aの入れ子は連結し直してみる
            if( elm_child_a ) {
                txt = '</a>' + txt + '<a href="' + elm_child_a.href +  '">';
            //    GM_log(txt);
            }

            return txt;

            function toHankaku(str) {
                return str.replace(/[０-９]/g, function(str){return String.fromCharCode(str.charCodeAt(0)-65248);});
            }
        }
    }

}

//////////////////////
//兵力整形
//////////////////////
function disp_TTable()
{
    if( location.pathname == "/message/inbox.php" ||
        location.pathname == "/message/outbox.php"  ||
        location.pathname == "/message/new.php" ||
        location.pathname == "/bbs/topic_view.php"  ||
        location.pathname == "/facility/unit_status.php" ||
        location.pathname == "/facility/castle_send_troop.php") {
        return ;
    }

    //■仮対処
    var ta = $a("//textarea");
    for(var i=0 ; i<ta.length ; i++) {
        if( ta[i].innerHTML != "" ) return;
    }

    var targetPath = [
        "//div[@id='commentList']",
//      "//td[@class='contents']",
        "//table[@class='commonTables']",
        "//p[@class='hitokoto']",
//      "//span[@class='xy']"
    ];

    for(var i=0 ; i<targetPath.length ; i++) {
        var elms = $a(targetPath[i]);
        for(var j=0 ; j<elms.length ; j++) {
            setTTable(elms[j]);
        }
    }

    function setTTable(elm) {

        var tmpHTML = elm.innerHTML;
    //  tmpHTML = tmpHTML.replace(/[\n\r]/g,"");
        var reg = /剣兵\s+槍兵\s+弓兵\s+騎兵\s+矛槍兵\s+弩兵\s+近衛騎兵\s+斥候\s+斥候騎兵\s+衝車\s+投石機\s+武将.*(\n兵士\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+).*(\n死傷\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
        tmpHTML = tmpHTML.replace(reg,
            function() {
                var txt = "<table class='tables'><tr><th class='solClass'>　</th>" +
                            "<th class='solClass'>剣兵</th><th class='solClass'>槍兵</th><th class='solClass'>弓兵</th><th class='solClass'>騎兵</th>" +
                            "<th class='solClass'>矛槍兵</th><th class='solClass'>弩兵</th><th class='solClass'>近衛騎兵</th><th class='solClass'>斥候</th>" +
                            "<th class='solClass'>斥候騎兵</th><th class='solClass'>衝車</th><th class='solClass'>投石機</th><th class='solClass'>武将</th>" +
                            "</tr><tr><th class='solClass'>兵士</th>";
                for(var i = 2 ; i<= 13 ; i++) {
                    txt += "<td>" + arguments[i] + "</td>";
                }

                txt += "</tr><tr><th class='solClass'>死傷</th>";
                for(var i = 15 ; i<= 26 ; i++) {
                    txt += "<td>" + arguments[i] + "</td>";
                }
                txt += "</tr></table>";
                return txt;
            } );

        reg = /剣兵\s+槍兵\s+弓兵\s+騎兵\s+矛槍兵\s+弩兵\s+近衛騎兵\s+斥候\s+斥候騎兵\s+衝車\s+投石機\s+武将.*(\n兵士\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
        tmpHTML = tmpHTML.replace(reg ,
            function() {
                var txt = "<table class='tables'><tr><th class='solClass'>　</th>" +
                            "<th class='solClass'>剣兵</th><th class='solClass'>槍兵</th><th class='solClass'>弓兵</th><th class='solClass'>騎兵</th>" +
                            "<th class='solClass'>矛槍兵</th><th class='solClass'>弩兵</th><th class='solClass'>近衛騎兵</th><th class='solClass'>斥候</th>" +
                            "<th class='solClass'>斥候騎兵</th><th class='solClass'>衝車</th><th class='solClass'>投石機</th><th class='solClass'>武将</th>" +
                            "</tr><tr><th class='solClass'>兵士</th>";
                for(var i = 2 ; i<= 13 ; i++) {
                    txt += "<td>" + arguments[i] + "</td>";
                }
                txt += "</tr></table>";

                return txt;
            } );


        elm.innerHTML = tmpHTML;
    }
}

//////////////////////
//兵力合計
//////////////////////
function disp_Details()
{
    if( location.pathname != "/alliance/detail.php" &&
        location.pathname != "/report/detail.php") return ;

    var troops = [[0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0]] ;
    var tbls = $a("//table[@class=\"tables\"][@summary=\"防御者\"]");

    if(tbls.length <2 ) return;

    for(var i=0 ; i<tbls.length ; i++) {
        var trs = $a("descendant::tr", tbls[i]);
        if( trs.length >=4 ) {
            for(var j=0; j < 2 ; j++) {
                var tds = $a("descendant::td", trs[j+2]);
                if(tds.length != 12) continue;
                for(var k=0 ; k<tds.length ; k++) {
                    troops[j][k] += parseInt(tds[k].innerHTML,10);
                }
            }
        }
    }

    var tbl = d.createElement("table");
    tbl.className = "tables";

    var tr = d.createElement("tr");
    var th = d.createElement("th");
    th.className = "attacker";
    th.appendChild(d.createTextNode("防御合計"));
    tr.appendChild(th);
    th = d.createElement("th");
    th.className = "attackerBase";
    th.setAttribute("colspan","12");
    tr.appendChild(th);
    tbl.appendChild(tr);

    var tr = d.createElement("tr");
    var thtxt = ["剣兵","槍兵","弓兵","騎兵","矛槍兵","弩兵","近衛騎兵","斥候","斥候騎兵","衝車","投石機","武将" ];
    var th = d.createElement("th");
    th.className = "blank";
    tr.appendChild(th);
    for(var i=0; i<12 ; i++){
        th = d.createElement("th");
        th.className = "solClass";
        th.appendChild(d.createTextNode(thtxt[i]));
        tr.appendChild(th);
    }
    tbl.appendChild(tr);

    var hd =["兵士","死傷"];
    for(var i=0 ; i<2 ; i++) {
        var tr = d.createElement("tr");
        var th = d.createElement("th");
        th.className = "blank";
        th.appendChild(d.createTextNode(hd[i]));
        tr.appendChild(th);
        for(var j=0; j<12 ; j++){
            var td = d.createElement("td");
            td.appendChild(d.createTextNode(troops[i][j]));
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }

    if( OPT_DETAILS_UP == 0 ) {
        tbls[tbls.length-1].parentNode.insertBefore(tbl, tbls[tbls.length-1].nextSibling);
    } else {
        tbls[0].parentNode.insertBefore(tbl, tbls[0]);
    }
}

//////////////////////
//デッキ
//////////////////////
function disp_Deck()
{
    if( location.pathname != "/card/deck.php" ) return ;


    if( OPT_DECK_SET ) dispDeckSet();

    function dispDeckSet() {
        var nam = cgetCurrentBaseName();

        var sels = $a("//select",d);
        for(var i=0 ; i<sels.length ; i++) {
            if( !sels[i].id.match(/selected_village_/) ) continue;
            var opts = $a("descendant::option",sels[i]);
            for(var j=0 ; j<opts.length ; j++) {
                if(opts[j].innerHTML == nam ) {
                    opts[j].selected = true;
                }
            }
        }
    }
}


//////////////////////
//完了時刻の表示（建物）
//////////////////////
function disp_CompleteTimeBuild()
{
    var lastTime = cgetNow();
    var villageId = cgetCurrentVillageId();

    if( location.pathname == "/village.php" ) {
        //最終建築時間の保存
        var spans = $a('id("actionLog")//li//span[@class="buildStatus" and (contains(text(),"建設中") or contains(text(),"建設準備中"))]/../span[@class="buildClock"]');
        if (!spans || spans.length == 0) {
            cdelData("lastBuildTime"+villageId,true);
            return;
        }

        var saveDate = new Date(caddDate(lastTime, spans[spans.length - 1].innerHTML.replace(/^[\s|　]*|[\s|　]*$/,"")).replace(/-/g,"/"));
        saveDate.setMinutes(saveDate.getMinutes() + 1);
        csaveData( "lastBuildTime"+villageId, saveDate.toString(), true);
        return;
    }


    var reg = /\/facility\/facility.php|\/facility\/select_facility.php|\/facility\/castle.php/;
    if(!location.pathname.match(reg) || d.referrer.match(reg)) {
        return;
    }

    var spans = new Array();
    var tds = $a('id("gray02Wrapper")//th[contains(text(),"所要時間")]//..//td[@class="contents"]');
    for(var i=0 ; i<tds.length ; i++){
        var td = tds[i];
        var th = $x('.//th[contains(text(),"建設に必要な食糧消費量") or contains(text(),"建設に必要な資材")]', td.parentNode.parentNode);
        if (th) {
            var span = d.createElement("span");
            td.appendChild(span);
            spans.push(span);
        }
    }

    if (!spans.length) return;

    lastTime = new Date(cloadData( "lastBuildTime"+villageId, lastTime.toString(), true));

    timerfunc();

    function timerfunc() {
        var now = cgetNow();
        if (lastTime < now) {
            lastTime = now;
        }

        for(var i = 0 ; i<spans.length ; i++){
            var span = spans[i];
            var ctime = caddDate(lastTime, span.parentNode.firstChild.nodeValue);
            if( ctime ) {
                span.innerHTML = "　(" + ctime + "完了)";
            }
        }

        setTimeout(timerfunc,1000);
    }
}

//////////////////////
//完了時刻の表示（ユニット）
//////////////////////
function disp_CompleteTimeUnit()
{
    if( location.pathname == "/facility/facility.php" ) {

        //ユニット作成の最終時刻の保存
        var lastTd = $x('id("gray02Wrapper")/table[@class="commonTables"][2]//tr[last()]/td');
        if( !lastTd ) {
            cdelData("lastUnitTime",true);
            return;
        }
        csaveData( "lastUnitTime", new Date(lastTd.innerHTML.replace(/^[\s|\n|\r|\t]*|[\s|\n|\r|\t]*$/,"").replace(/-/g,"/")).toString(), true);
        return;
    }

    if( location.pathname != "/facility/unit_confirm.php" ) {
        return;
    }

    var td = $x('//table[@class="commonTables" and @summary="object"]//th[contains(text(),"作成するまでに必要な時間")]/../td');

    if (!td) return;
    var span = d.createElement("span");
    td.appendChild(span);

    var lastTime = new Date(cloadData( "lastUnitTime", null, true ));

    timerfunc();

    function timerfunc() {
        var now = cgetNow();
        if (lastTime < now) {
            lastTime = now;
        }

        var ctime = caddDate(lastTime, span.parentNode.firstChild.nodeValue);
        if( ctime ) {
            span.innerHTML = "　(" + ctime + "完了)";
        }
        setTimeout( timerfunc, 1000);
    }
}

//////////////////////
//同盟表示の改善
//////////////////////
function disp_AllianceInfo()
{
    if( OPT_ALLY_XY )   allianceXY();
    if( OPT_ALLY_IS )   allianceSort();
    if( OPT_ALLY_CSV )  allianceCSV();


    //同盟表示のソート
    function allianceSort()
    {
        if( location.pathname != "/alliance/info.php" ) return;

        var sort_kind, sort_order;

        var sort_list = ["num", "str", "num", "num", "num", "str", "str"];

        for(var i=0 ; i<8 ; i++) {
            var th = $x("//table[@summary=\"ランキング\"]//tr[2]//th[" + (i+1) + "]");
            if( th ) {

                sort_kind = sort_list[i];
                if( th.id == "beyond_ally_xy" ) sort_kind = "xy";

                th.appendChild(d.createElement("br"));

                var a = d.createElement("a");
                a.href = "javascript:void(0)";
                (function(n, k){
                    $e(a, "click", function(){row_sort(n, k, "asc"); } );
                })(i+1, sort_kind);

                var img = d.createElement("img");
                img.src= IMG_DIR + "trade/icon_up.gif";
                img.alt = "昇順に並べ替え";
                img.title = img.alt;
                a.appendChild(img);

                th.appendChild(a);
                th.appendChild(d.createTextNode(" "));
                a = d.createElement("a");
                a.href = "javascript:void(0)";
                (function(n, k){
                    $e(a, "click", function(){row_sort(n, k, "dsc"); } );
                })(i+1, sort_kind);

                img = d.createElement("img");
                img.src= IMG_DIR + "trade/icon_down.gif";
                img.alt = "降順に並べ替え";
                img.title = img.alt;
                a.appendChild(img);

                th.appendChild(a);

            }
        }

        function row_sort(col, kind, order) {
            var tbl = $x("//table[@summary=\"ランキング\"]");
            var trs = $a("descendant::tr[position()>2]", tbl);
            sort_kind = kind;
            sort_order = order;

            var strs = new Array();
            if( col == 2 || kind == "xy" ) {
                //名前 or座標はaの下
                for(var i=0; i<trs.length ; i++) {
                    var td = $x("descendant::td[" + col + "]", trs[i]);
                    var a = $x("descendant::a", td);
                    if( a ) strs.push({"node":trs[i], "value":a.innerHTML});
                    else strs.push({"node":trs[i], "value":""});
                }
            } else {
                for(var i=0; i<trs.length ; i++) {
                    var td = $x("descendant::td[" + col + "]", trs[i]);
                    strs.push({"node":trs[i], "value":td.innerHTML});
                }
            }

            strs.sort(row_cmp);

            for(var i=0 ; i<trs.length ; i++) {
                strs[i].node.parentNode.removeChild(strs[i].node);
                tbl.appendChild(strs[i].node);
            }
        }

        function row_cmp(a, b)
        {
            var ret = 0;
            if( sort_kind == "num" ){
                ret = parseInt(a.value, 10) - parseInt(b.value, 10);
            }else if (sort_kind == "xy") {
                //座標
                if( !a.value && !b.value ) ret =  0;
                else if( !a.value ) ret = 1;
                else if( !b.value ) ret = -1;
                else {
                    var a_xy = a.value.split(",");
                    var b_xy = b.value.split(",");
                    ret = ( Math.pow(parseInt(a_xy[0], 10), 2) + Math.pow(parseInt(a_xy[1], 10), 2) ) -
                          ( Math.pow(parseInt(b_xy[0], 10), 2) + Math.pow(parseInt(b_xy[1], 10), 2) );
                }
            }else {
                if( a.value == b.value ) {
                    ret = 0;
                } else if( a.value > b.value ) {
                    ret = 1;
                }else {
                    ret = -1;
                }
            }
            if( sort_order == "dsc") {
                ret = 0 - ret;
            }
            return ret;

        }
    }

    //同盟員座標表示
    function allianceXY()
    {
        //座標の収集
        if( location.pathname =="/user/" || location.pathname == "/user/index.php" ) {
            if( USER_ID || URLPARAM.user_id ) {
                var uid, aid;
                if( URL_PARAM.user_id ) uid = URL_PARAM.user_id;
                else uid = USER_ID;
                var allytd = $x("//table[@class=\"commonTables\"]//tr[3]//td[4]");
                if( !allytd ) return;
                var aids = allytd.innerHTML.match(/\/alliance\/info\.php\?id\=(\d+)/);
                if( !aids ) return;
                aid = aids[1];
                var table = $x("//table[@class=\"commonTables\"]");
                if( table ) {
                    var xy = getXYfromUserHTML(table.innerHTML);
                    if( xy ) {
                        csetUserXY(aid, uid, xy.x, xy.y);
                    }
                }
            }
        }

        //表示
        if( location.pathname == "/alliance/info.php" ) {
            if( ALLY_ID || URL_PARAM.id ) {
                var aid;
                if( URL_PARAM.id ) aid = URL_PARAM.id;
                else aid = ALLY_ID;

                var head1 = $x("//table[@summary=\"ランキング\"]//tr[1]//th[@class=\"ttl\"]");
                if( head1 ) {
                    head1.setAttribute("colspan", parseInt(head1.getAttribute("colspan"),10) + 1 + "");
                }
                var head2 = $x("//table[@summary=\"ランキング\"]//tr[2]");
                if( head2 ) {
                    var th = d.createElement("th");
                    th.className = "all";
                    th.style.width = "110px";
                    th.id = "beyond_ally_xy";
                    th.innerHTML = "座標";
                    var lnk = d.createElement("a");
                    lnk.href = "javascript:void(0)";
                    lnk.innerHTML ="(GET)";
                    lnk.style.fontSize = "9px";

                    var running = false;

                    $e(lnk, "click", function() {

                        if( running ) return ;

                        if( confirm("同盟員の情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false ) return;
                        running = true;
//                      cdeleteUserXY(aid);
                        var trs = $a("//table[@summary=\"ランキング\"]//tr[position()>2]");

                        var now_num = 0;
                        var all_num = trs.length;
                        window.setTimeout(timerFunc, 0);

                        function timerFunc()
                        {
                            var idtd = $x("descendant::td[2]",trs[now_num]);
                            if( !idtd ) {
                                alert("ページフォーマットが変わったみたい");
                                return ;
                            }
                            var ids = idtd.innerHTML.match(/\/user\/\?user_id\=(\d+)/);
                            if( !ids ) {
                                alert("ページフォーマットが変わったみたい");
                                return ;
                            }

                            var tmp = $("beyond_xylink_" + ids[1] );
                            if( tmp.innerHTML != "　" ) {
                                now_num ++;
                                if( now_num < all_num ) {
                                    window.setTimeout(timerFunc, 0);
                                }else{
                                    running = false;
                                    alert("全ての座標を取得しました");
                                }
                                return ;
                            }

                            cajaxRequest("/user/?user_id=" + ids[1], "GET", "", function(req) {
                                var xytd = $("beyond_xylink_" + ids[1] );
                                if(xytd) {
                                    var xy = getXYfromUserHTML(req.responseText);
                                    if( xy ) {
                                        csetUserXY(aid, ids[1], xy.x, xy.y);
                                        xytd.innerHTML = cgetXYHtml(xy.x, xy.y );
                                    }
                                }
                                now_num ++;
                                if( now_num < all_num ) {
                                    window.setTimeout(timerFunc, 0);
                                }else{
                                    running = false;
                                    alert("全ての座標を取得しました");
                                }
                            });
                        }
                    });

                    th.appendChild(lnk);
                    head2.appendChild(th);
                }

                var trs = $a("//table[@summary=\"ランキング\"]//tr[position()>2]");
                var xylists = cloadData( "allyXYList" + aid, "[]", true, true );

                //ハッシュに書き換え
                var xylist = new Array();
                for(var i=0 ; i<xylists.length ; i++) {
                    xylist["id" + xylists[i].id ] = {"x":xylists[i].x, "y":xylists[i].y};
                    if( xylist["id" + xylists[i].id].x == null )  xylist["id" + xylists[i].id].x = 0;
                    if( xylist["id" + xylists[i].id].y == null )  xylist["id" + xylists[i].id].y = 0;
                }

                for(var i=0; i<trs.length ; i++) {
                    var idtd = $x("descendant::td[2]",trs[i]);
                    if( !idtd ) continue;
                    var ids = idtd.innerHTML.match(/\/user\/\?user_id\=(\d+)/);
                    if( !ids ) continue;

                    var td = d.createElement("td");
                    td.id = "beyond_xylink_" + ids[1];
                    if( xylist["id" + ids[1] ] ) {
                        td.innerHTML = cgetXYHtml(xylist["id" + ids[1] ].x, xylist["id" + ids[1] ].y);
                    }else{
                        td.innerHTML ="　";
                    }
                    trs[i].appendChild(td);

                    var yaku = $x("descendant::td[7]",trs[i]);
                    if( yaku.innerHTML.match(/盟主補佐/) ) {
                        //盟主補佐がぎりぎり2行になるので後ろの空白カット
                        yaku.innerHTML = yaku.innerHTML.replace(/[ 　\t\r\n]+$/g, "");

                    }
                }
            }
        }
    }

    function getXYfromUserHTML(html)
    {
        var xy = html.match(/<\/a>\(本拠地\)<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>/);
        if( xy ) {
            return {"x":parseInt(xy[1],10),"y":parseInt(xy[2],10)};
        }
        return null;
    }

    function getDatafromUserHTML(html)
    {
        var ret = [];
        var tmp = html.match(/<td[^>]*>ランク<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["all_rank"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<td[^>]*>総合<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["all_point"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<td[^>]*>総人口<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["jinko"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<td[^>]*>攻撃<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["attack"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<td[^>]*>防御<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["defence"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<td[^>]*>撃破スコア<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["attack_score"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<td[^>]*>防衛スコア<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
        if( !tmp ) return null;
        ret["defence_score"] = parseInt(tmp[1] ,10);

        tmp = html.match(/<\/a>\(本拠地\)<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>/);
        if ( !tmp ) return null;
        ret["x"] = parseInt(tmp[1],10);
        ret["y"] = parseInt(tmp[2],10);

        return ret;
    }

    function getXYListfromUserHTML(html)
    {
        var ret = new Array();
        var tmp = html.match(/<td[^>]*>君主<\/td>[^<]*<td[^>]*>([^<\s]+)/);
        if( !tmp ) return null;
        var user_name = tmp[1];

        tmp = html.match(/<td[^>]*>同盟<\/td>[^<]*<td[^>]*><a href="[^"]*">([^<]+)<\/a><\/td>/);
        if( !tmp ) return;
        var ally_name = tmp[1];

        var pos;
        //var reg = /<a href=\"(?:\.\.\/land\.php|\.\.\/village_change\.php).*\">([\s\S]+?)<\/a>[\s\S]+?<td>([\-0-9]+),([\-0-9]+)<\/td>[\s\S]+?<td>([0-9]+|\&nbsp\;)<\/td>/;
        var reg = /<a href="\.\.\/(?:land|village_change)\.php[^"]*">\s*([^<\s]+)\s*<\/a>[^<]*<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>[^<]*<td[^>]*>([0-9]+|&nbsp;)<\/td>/;
        var honkyo = 1;
        while((pos = html.search(reg) ) != -1 ) {

            html = html.substr(pos);

            var dat = html.match(reg);
            if( !dat ) break;

            if( dat[4] == "&nbsp;" ) dat[4] = "";

            ret.push({"user_name":user_name, "ally_name":ally_name, "area_name":dat[1].replace(/(^\s+|\s+$)/g, ""), "x":dat[2], "y":dat[3], "jinko":dat[4], "honkyo":honkyo});
            honkyo="";
            html = html.substr(dat[0].length);

        }

        return ret;
    }

    function allianceCSV()
    {
        if( location.pathname != "/alliance/info.php" ) return;
/*
        if( URL_PARAM.id ) {
            if( ALLY_ID != URL_PARAM.id ) {
                return;
            }
        }
*/
        var aid;
        if( URL_PARAM.id ) aid = URL_PARAM.id;
        else aid = ALLY_ID;

        //CSV出力用
        var tbl = $x("//table[@summary=\"ランキング\"]");
        if( !tbl ) return;

        var lnk = d.createElement("a");
        lnk.href = "javascript:void(0)";
        lnk.innerHTML ="同盟員詳細情報csv";
        tbl.parentNode.insertBefore(lnk, tbl.nextSibling);
        $e(lnk, "click", function() {

            if( $("beyond_csvWindow") ) return;

            if( confirm("同盟員の情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false ) return;

            //窓作成
            var elm_xy = cgetElementXY( this );
            var yy = elm_xy.y - 420;
            if( yy < 0 ) yy = 0;
            createCSVWindow(10, yy);

            var trs = $a("//table[@summary=\"ランキング\"]//tr[position()>2]");

            var elm_msg = $("beyond_csvWindow_message");
            if( !elm_msg ) return;
            var elm_csv = $("beyond_csvWindow_csv");
            if( !elm_csv ) return;

            var now_num = 0;
            var all_num = trs.length;

            if( all_num == 0 ) return;

            var csv_txt = "同盟内ランク\tuser_id\t名前\t同盟内point\t寄付\t拠点\t全体ランク\t全体point\t人口\t攻撃\t防御\t撃破スコア\t防御スコア\t本拠X座標\t本拠Y座標\n";

            window.setTimeout(timerFunc ,0 );

            function timerFunc()
            {
                if( !$("beyond_csvWindow") ) return;
                var tds = $a("descendant::td",trs[now_num]);
                if( tds.length < 5 ) {
                    alert("ページフォーマットが変わったみたい");
                    return ;
                }

                var ids = tds[1].innerHTML.match(/\/user\/\?user_id\=(\d+).*\">(.+)<\/a>/);
                if( !ids ) {
                    alert("ページフォーマットが変わったみたい");
                    return ;
                }

                var uid = parseInt(ids[1], 10);

                cajaxRequest("/user/?user_id=" + uid, "GET", "", function(req) {
                    var dt = getDatafromUserHTML(req.responseText);
                    if( dt ) {
                        csv_txt += parseInt(tds[0].innerHTML, 10) + "\t";
                        csv_txt += uid + "\t";
                        csv_txt += ids[2]  + "\t";
                        csv_txt += parseInt(tds[2].innerHTML, 10)  + "\t";
                        csv_txt += parseInt(tds[3].innerHTML, 10)  + "\t";
                        csv_txt += parseInt(tds[4].innerHTML, 10)  + "\t";
                        csv_txt += dt.all_rank  + "\t";
                        csv_txt += dt.all_point  + "\t";
                        csv_txt += dt.jinko  + "\t";
                        csv_txt += dt.attack  + "\t";
                        csv_txt += dt.defence  + "\t";
                        csv_txt += dt.attack_score  + "\t";
                        csv_txt += dt.defence_score  + "\t";
                        csv_txt += dt.x  + "\t";
                        csv_txt += dt.y  + "\n";

                        var xytd = $("beyond_xylink_" + uid );
                        if(xytd) {
                            csetUserXY(aid, uid, dt.x, dt.y);
                            xytd.innerHTML = cgetXYHtml(dt.x, dt.y );
                        }

                        now_num ++;
                        elm_msg.innerHTML = "取得中... ( " + now_num + " / " + all_num + " )";
                        if( now_num < all_num ) {
                            window.setTimeout(timerFunc, 0);
                        }else{
                            elm_msg.innerHTML += ".. 完了しました。CTRL + A → CTRL + Cでコピーし、Excelなどに貼りつけてください";
                            elm_csv.value = csv_txt;
                            elm_csv.focus();
                        }
                    } else {
                        alert("取得に失敗しました" );
                    }

                }, function(req){
                    alert("サーバからエラーが返りましたよ" );
                });
            }
        });


        var lnk2 = d.createElement("a");
        lnk2.href = "javascript:void(0)";
        lnk2.innerHTML ="同盟員全領地座標csv";
        tbl.parentNode.insertBefore(lnk2, lnk.nextSibling);
        tbl.parentNode.insertBefore(d.createTextNode("　　"), lnk2);
        $e(lnk2, "click", function() {

            if( $("beyond_csvWindow") ) return;

            if( confirm("同盟員の情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false ) return;

            if( navigator.userAgent.toLowerCase().indexOf('chrome') == -1 ) {
                if( confirm("終盤の巨大同盟だと、CTRL+AやCTRL+Cの操作で10分くらい掛かります。\nChromeだとそんなに時間掛からないみたいです。続けますか？") == false ) return;
            }
            //窓作成
            var elm_xy = cgetElementXY( this );
            var yy = elm_xy.y - 420;
            if( yy < 0 ) yy = 0;
            createCSVWindow(10, yy);

            var trs = $a("//table[@summary=\"ランキング\"]//tr[position()>2]");

            var elm_msg = $("beyond_csvWindow_message");
            if( !elm_msg ) return;
            var elm_csv = $("beyond_csvWindow_csv");
            if( !elm_csv ) return;

            var now_num = 0;
            var all_num = trs.length;

            if( all_num == 0 ) return;

            var csv_txt = "同盟\t君主\t領地名\tX\tY\t人口\t本拠\n";

            window.setTimeout(timerFunc ,0 );

            function timerFunc()
            {
                if( !$("beyond_csvWindow") ) return;
                var tds = $a("descendant::td",trs[now_num]);
                if( tds.length < 5 ) {
                    alert("ページフォーマットが変わったみたい");
                    return ;
                }

                var ids = tds[1].innerHTML.match(/\/user\/\?user_id\=(\d+).*\">(.+)<\/a>/);
                if( !ids ) {
                    alert("ページフォーマットが変わったみたい");
                    return ;
                }

                var uid = parseInt(ids[1], 10);

                cajaxRequest("/user/?user_id=" + uid, "GET", "", function(req) {
                    var dt = getXYListfromUserHTML(req.responseText);
                    if( dt ) {
                        for(var i=0 ; i<dt.length ; i++) {
                            csv_txt += dt[i].ally_name  + "\t";
                            csv_txt += dt[i].user_name  + "\t";
                            csv_txt += dt[i].area_name  + "\t";
                            csv_txt += dt[i].x  + "\t";
                            csv_txt += dt[i].y  + "\t";
                            csv_txt += dt[i].jinko  + "\t";
                            csv_txt += dt[i].honkyo  + "\n";
                        }

                        now_num ++;
                        elm_msg.innerHTML = "取得中... ( " + now_num + " / " + all_num + " )";
                        if( now_num < all_num ) {
                            window.setTimeout(timerFunc, 0);
                        }else{
                            elm_msg.innerHTML += ".. 完了しました。CTRL + A → CTRL + Cでコピーし、Excelなどに貼りつけてください";
                            elm_csv.value = csv_txt;
                            elm_csv.focus();
                        }
                    } else {
                        alert("取得に失敗しました" );
                    }
                }, function(req){
                    alert("サーバからエラーが返りましたよ" );
                });
            }
        });

        function createCSVWindow(x, y)
        {
            var cc = $("beyond_csvWindow");
            if( cc ) cc.parentNode.removeChild(cc);
            cc = d.createElement("div");
            cc.id = "beyond_csvWindow";
            cc.style.left = x + "px";
            cc.style.top = y + "px";
            cc.style.position = "absolute";
            cc.style.backgroundColor = "lightgray";
            cc.style.border = "outset 2px lightgray";
            cc.style.fontSize = "12px";
            cc.style.padding = "15px";
            cc.style.zIndex = 1000;

            cc.style.padding = "10px";
            var dv = d.createElement("div");
            dv.id = "beyond_csvWindow_message";
            cc.appendChild(dv);
            var tx = d.createElement("textarea");
            tx.id = "beyond_csvWindow_csv";
            tx.rows = 25;
            tx.cols = 140;
            tx.style.overflow = "scroll";
            cc.appendChild(tx);

            cc.appendChild(d.createElement("br") );
            ccreateButton(cc, "閉じる", "", function(){
                var cc = $("beyond_csvWindow");
                if( cc ) cc.parentNode.removeChild(cc);
            });

            $("beyond_floatpanel").appendChild(cc);
        }

    }
}

//////////////////////
//資源の合計
//////////////////////
function disp_ResourcesTotal()
{
    var white_all = RES_GROW_W.wood + RES_GROW_W.stone + RES_GROW_W.iron + RES_GROW_W.rice;
    var blue_all = RES_GROW_B.wood + RES_GROW_B.stone + RES_GROW_B.iron + RES_GROW_B.rice;
    var all_all = RES_GROW.wood + RES_GROW.stone + RES_GROW.iron + RES_GROW.rice;

    var box = $x('id("sidebar")//span[@class="increase" or @class="resource"]/../.. | id("status_left")//p[@class="status_bottom"]');
    if( !box ) return;

    var txt = d.createTextNode("合計 " + white_all);

    var sp = d.createElement("span");
        sp.className = "increase";
        sp.appendChild(d.createTextNode(" +" + blue_all) );

    var item = txt;
    var addSpDoc = box;
    if (!isNarrow) {
        item = d.createElement("li");
        item.appendChild(txt);
        item.title = "総合計 " + all_all;
        addSpDoc = item;
    }

    box.appendChild(item);
    addSpDoc.appendChild(sp);
}

//////////////////////
//建設/破棄一覧
//////////////////////
function disp_RemoveList()
{
    var img_x = 'data:image/gif;base64,'+
                'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAJ4jI+py+0Po5y02ouz3rz7D4bi'+
                'SJbmiabqyrbuC8fyTNf2jef6zvf+DQgGJwCV8PgQro7IRXPJLCqerGjCCmMaotIsVzv7KmtiHNd8'+
                'tpVp4nEsDX6lt+7W/EBNfRl1PZY/ZPTXEOjXR1iIcuiQ+OP4CBkpOUlZWVMAADs=';
    var img_m = 'data:image/gif;base64,'+
                'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAKpjI+py+0Po5y02ouz3rz7D4bi'+
                'SJbmiabqyrbuC8fyTNf2jef6zvc5AAwKacJiMTZcJFnLRvP0dAZT0wOQcQ1UTVkrAPs1dElbcVjR'+
                'LYuuxmGbfV7D31q6+jM2582JvSdvhBZXRxYHR4gAOIh3luWIqFj4lWYYNnbHKJhoWckVqdToB/Kp'+
                'yQd1uVjHmSrnmNq24saqOlsSpVd7+nbbspvrAxwsPExcbBxQAAA7';
    var img_t = 'data:image/gif;base64,'+
                'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAKnjI+py+0Po5y02ouz3rz7D4bi'+
                'SJbmiabqyrbuC8fyTNf2jef6zvc5AAwKacJiMTZcJFnLAxDRPA2fTkAiSgpWoVaFVto1JI1ccDhA'+
                'FR+rZ1Hamka3y9m3XBu/5j9x8j265/HW5EfnFhYIkcgxaOTYNydI9UjJVrL39bDYkfn3yBUJ0kh5'+
                'tikJh6qEaHraRYrKyof32qmCpRZbR0tU6eP7CxwsPEz8UAAAOw==';
    var img_lup = 'data:image/gif;base64,'+
                'R0lGODlhPAA8AIAAAP/MM////yH5BAUUAAEALAAAAAA8ADwAAAKfjI+py+0Po5y02ouz3rz7D4bi'+
                'SJbmiabqyrbuC8fyTNf2jef6zvc9APgBg7rhMGc03o7AwJH2bDqlsef0YH1Rr1iiaqsAJ8SfbNi7'+
                'MJfRafaZRK7EOVtw867kiups/DTq5mFlF+SHFyjoRXiVpDcCOFYo2YW4ZqAkyaRYuZZZ+Of3l5IH'+
                'QYpiyoA6qnbJ+pUEO7cS6+pje4ubq7vLi1AAADs=';

    if( location.pathname == "/land.php" && URL_PARAM.x && URL_PARAM.y ) {

        var rmtime = d.body.innerHTML.match(/(現在領地を破棄中です|現在村を建設中です|現在砦を建設中です).*\n(\d+-\d+-\d+ \d+:\d+:\d+)/ );
        if( rmtime ) {
            if( rmtime[1] == "現在領地を破棄中です" ) {
                addList(rmtime[2], 0, URL_PARAM.x, URL_PARAM.y );
            }else if( rmtime[1] == "現在村を建設中です" ) {
                addList(rmtime[2], 3, URL_PARAM.x, URL_PARAM.y );
            }else if( rmtime[1] == "現在砦を建設中です" ) {
                addList(rmtime[2], 4, URL_PARAM.x, URL_PARAM.y );
            }
        }else{
            rmtime = d.body.innerHTML.match(/現在領地をレベルアップ中です.*\n(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/ );
            if( rmtime ) {
                addList(rmtime[1], 5, URL_PARAM.x, URL_PARAM.y );
            }else {
                delList(0, URL_PARAM.x, URL_PARAM.y);
            }
        }
    }

    if( location.pathname == "/facility/castle.php" ) {
        var xy = cgetCurrentBaseXY();
        var rmtime = d.body.innerHTML.match(/(村を削除中です。|砦を削除中です。)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
        if( rmtime ) {
            if( rmtime[1] == "村を削除中です。" ) {
                addList(rmtime[2], 1, xy.x, xy.y );
            }else if( rmtime[1] == "砦を削除中です。" ) {
                addList(rmtime[2], 2, xy.x, xy.y );
            }
        }else{
            delList(1,xy.x, xy.y);
        }
    }


    if( location.pathname == "/map.php" ) {
        //地図に表示
        var type = 1;
        if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) type=2;
        else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) type=3;

        var lists = cloadData("RemoveList", "[]", true, true);
        lists = checkList(lists);       //時間を過ぎたものを削除

        if( lists.length ) {
            var cx = parseInt(URL_PARAM.x,10);
            var cy = parseInt(URL_PARAM.y,10);
            if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
            if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
            if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
            if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;

            var map = $x("//div[@id=\"mapsAll\"]");
            for(var i=0 ; i<lists.length ; i++) {
                var no = cgetMapNofromXY(lists[i].x, lists[i].y, cx, cy, type );
                if( !no ) continue;
                var img_src;
                if( lists[i].kind == 3) img_src = img_m;
                else if(lists[i].kind == 4 ) img_src = img_t;
                else if(lists[i].kind == 5 ) img_src = img_lup;
                else img_src = img_x;

                var img = document.createElement("img");
                img.className = "mapAll" + no;
                img.src = img_src;

                map.appendChild(img);
            }
        }
    }


    //パネルに表示

    var icon_rl = 'data:image/gif;base64,'+
                'R0lGODlhEQAPALMAAAD/ANO3SQbOKKyTQxqvSjKgYAivNwCZAHdrPBVwFVNTUS1NLTMzMwAAAAAA'+
                'AAAAACH5BAQUAP8ALAAAAAARAA8AAARKkMlJq50npzuXAKDALYsBnoBhHWgrVmyLIkOgSIl8Bnww'+
                'TDpCr3djfHbD4Y9hOhWSQ8kC9YTyEFKBwICw9i5WLKfWW3IYNISYEgEAOw==';
    var elms = ccreateSideBox("beyond_sidebox_removelist", icon_rl, "建設/破棄ﾘｽﾄ");

    var lists = cloadData("RemoveList", "[]", true, true);
    lists = checkList(lists);       //時間を過ぎたものを削除

    if( lists.length == 0 ) return;

    var ul = d.createElement("ul");

    for(var i=0 ; i<lists.length ; i++) {
        var li = d.createElement("li");
        //アイコン
        var title = "";
        switch(lists[i].kind){
        case 0: title = "領地破棄"; break;
        case 1: title = "村破棄"; break;
        case 2: title = "砦破棄"; break;
        case 3: title = "村作成"; break;
        case 4: title = "砦作成"; break;
        case 5: title = "レベルアップ"; break;
        }
        var icon = "";
        if( lists[i].kind == 1 || lists[i].kind == 3 ) {        //村破棄or村作成
            icon = IMG_DIR + "panel/village_b_l.png";
        }else if( lists[i].kind == 2 || lists[i].kind == 4 ) {  //砦破棄or砦作成
            icon = IMG_DIR + "panel/fort_b_l.png";
        }else{
            icon = IMG_DIR + "panel/territory_b_s.png";
        }

        var addHtml = '<img src="' + icon + '" style="width:20px; height:20px;" title="' + title + '">';

        var sizestyle = "";
        if( lists[i].kind == 0 || lists[i].kind == 1 || lists[i].kind == 2 ) {      //領地破棄or村破棄or砦破棄
            addHtml += '<img src ="' + img_x + '" style="position:relative; left:-20px; width:20px; height:20px;" title="' + title + '">';
            sizestyle = ' style="position:relative; left:-20px;"';
        }
        if( lists[i].kind == 5 ) {                              //領地LvUp
            addHtml += '<img src ="' + img_lup + '" style="position:relative; left:-20px; width:20px; height:20px;" title="' + title + '">';
            sizestyle = ' style="position:relative; left:-20px;"';
        }


        addHtml += '<a href="'+caddSessionId('/land.php?x=' + lists[i].x + '&y=' + lists[i].y +'#ptop')+'" title="表示"'+ sizestyle + '>' + lists[i].time.substr(-8) + '</a>';
        addHtml += '<a href="'+caddSessionId('/map.php?x=' + lists[i].x + '&y=' + lists[i].y +'#ptop')+'" title="マップ(' + lists[i].x + ',' + lists[i].y + ')"' + sizestyle + '>';
        addHtml += '<img src="' +  img_map + '" style="padding-left:2px;"></a>';

        li.innerHTML = addHtml;

        ul.appendChild(li);
    }
    elms.sideBoxInner.appendChild(ul);

    function addList(tim, kind, x, y) //kind=0:領地破棄 1:村破棄 2:砦破棄 3:村作成 4:砦作成 5:領地LvUp
    {
        var lists = cloadData("RemoveList", "[]", true, true);

        for(var i=0 ; i<lists.length ; i++) {
            if(lists[i].x == x && lists[i].y == y ) {
                return;
            }
        }
        lists.push({"x":x, "y":y, "time":tim, "kind":kind } );
        lists.sort( function(a,b){

                if(a.time > b.time) return 1;
                if(a.time < b.time) return -1;
                return 0;});

        csaveData( "RemoveList", lists, true, true );
    }
    function delList(kind, x, y) //kind=0:land 1:castle
    {
        var lists = cloadData("RemoveList", "[]", true, true);

        for(var i=0 ; i<lists.length ; i++) {
            if(lists[i].x == x && lists[i].y == y ) {
                if( ( ( lists[i].kind == 1 || lists[i].kind == 2 ) && kind == 1 ) ||
                    ( ( lists[i].kind == 0 || lists[i].kind == 3 || lists[i].kind == 4 || lists[i].kind == 5 ) && kind == 0 ) ) {

                    lists.splice(i,1);
                    csaveData( "RemoveList", lists, true, true );
                    break;
                }
            }
        }
    }

    function checkList(lists)
    {
        var dt = new Date();
        var ntime = dt.getFullYear() + "-" +
                    (dt.getMonth()+101).toString().substr(-2) + "-" +
                    (dt.getDate()+100).toString().substr(-2) + " " +
                    (dt.getHours()+100).toString().substr(-2)  + ":" +
                    (dt.getMinutes()+100).toString().substr(-2)  + ":" +
                    (dt.getSeconds()+100).toString().substr(-2);
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var str4 = "";
        for(var i=0 ; i<lists.length ; i++) {
            if( lists[i].time < ntime ) {
                if ( lists[i].kind == 1 || lists[i].kind == 2 ) {
                    str2 += "(" + lists[i].x + "," + lists[i].y + ")\n";
                }else if ( lists[i].kind == 3 || lists[i].kind == 4 ) {
                    str3 += "(" + lists[i].x + "," + lists[i].y + ")\n";
                }else if ( lists[i].kind == 5 ) {
                    //LevelUp完了
                    str4 += "(" + lists[i].x + "," + lists[i].y + ")\n";
                    csetMyLevel(lists[i].x, lists[i].y, -1);
                }else {
                    str1 += "(" + lists[i].x + "," + lists[i].y + ")\n";
                }
                lists.splice(i,1);
                i--;
            }
        }
        if( str1 || str2 || str3 || str4 ) {
/*          var msg = "";
            if( str1) msg += "以下の領地が破棄されました\n" + str1;
            if( str2) msg += "以下の拠点が破棄されました\n" + str2;
            if( str3) msg += "以下の拠点が作成されました\n" + str3;
            if( str4) msg += "以下の拠点がレベルアップしました\n" + str4;
*/

            csaveData( "RemoveList", lists, true, true );
//          alert(msg);
        }
        return lists;
    }
}



//////////////////////
//資源の残り時間
//////////////////////
function disp_ResourcesTime()
{

    var flag_cost = false;
    if( location.pathname == "/facility/facility.php" ||
        location.pathname == "/facility/select_facility.php" ||
        location.pathname == "/facility/castle.php" ||
        location.pathname == "/facility/unit_confirm.php") {
        flag_cost = true;
    }

    var names = ["wood", "stone", "iron", "rice"];
    var resources = {
        wood : {
            base : null,
            timer : null
        },
        stone : {
            base : null,
            timer : null
        },
        iron : {
            base : null,
            timer : null
        },
        rice : {
            base : null,
            timer : null
        },
        fame : {
            base : null,
            timer : null
        }
    };

    //status_leftとstatus_rightの幅を変更
    var stat_left = $("status_left");
    var stat_right = $("status_right");
    if( stat_left && stat_right ) {
        stat_left.style.width = "725px";    //670 + 55
        stat_right.style.width = "200px";   //255 - 55
    }

    for(var i = 0; i < names.length;i++) {
        var name = names[i];
        var base = $(name);
        var dv = d.createElement("div");
        dv.id = "beyond_restime_" + name;
        dv.style.top = (base.offsetTop + 12) + "px";
        dv.style.left = base.offsetLeft + "px";
        dv.style.position = "absolute";
        base.parentNode.appendChild( dv );

        resources[name].base = base;
        resources[name].timer = dv;
    }

    //名声
    var villageCount = 0;
    for (var key in VILLAGES_INFO) {
        villageCount++;
    }

    var bldtbl = [17, 35, 54, 80, 112, 150, 195, 248, 310, 999];

    var addTop = 12;
    if (OPT_NEXT_MEISEI) {
        addTop = -12;
    }

    for( var i=0 ; i< bldtbl.length ; i++ ){
        if( RES_MAX.fame < bldtbl[i] ) {
            var base = $x('id("status_left")/img[@title="名声"]');
            if( base ) {
                var dv = d.createElement("div");

                dv.id = "beyond_restime_meisei";
                dv.style.top = (base.offsetTop + addTop) + "px";
                dv.style.left = (base.offsetLeft + 10) + "px";
                dv.style.position = "absolute";
                dv.style.color="lightgreen";
                if( bldtbl[i] != 999 ) {
                    dv.innerHTML = "次拠点:" +  bldtbl[i];
                }

                if( villageCount < i + 1 ) {
                    dv.innerHTML += "(+" + (i + 1 - villageCount ) + ")";
                }

                base.parentNode.appendChild( dv );
                resources.fame.base = base;
                resources.fame.timer = dv;
            }
            break;
        }
    }

    if( flag_cost ) {
        var facilityResources = new Array();
        var tds = $a('//td[@class="cost"]');
        for(var i=0 ; i<tds.length ; i++) {
            var td = tds[i];
            var spn = $a('./span[@class="normal" or @class="max90"]', td);
            if( spn.length != 4 ) continue;

            var addObj = new Object();

            for(var j=0 ; j < names.length ; j++ ) {
                var name = names[j];
                var base = spn[j];
                var dv = d.createElement("div");
                dv.id = "beyond_restime_" + i + "_" + name;
                var elem_xy = cgetElementXY(base);
                dv.style.top = (elem_xy.y + 9) + "px";
                dv.style.left = (elem_xy.x - 18 )+ "px";
                dv.style.fontSize = "9px";
                dv.style.position = "absolute";
                td.appendChild( dv );

                addObj[name] = {base : base , timer : dv};
            }
            facilityResources.push(addObj);
        }
    }

    function ResourcesTimer()
    {
        cupdateCurrentResources();
        //各資源
        for(var i=0 ; i<names.length ; i++) {
            var name = names[i];
            var base = resources[name].base;
            var dv = resources[name].timer;

            if( dv && base ){
                var tim;
                if( RES_GROW[ name ] == 0 ) {
                    tim = "XX:XX:XX";
                }else if( RES_GROW[ name ] > 0 ){
                    tim = getTime(RES_MAX[ name ] - RES_NOW[ name ], RES_GROW[ name ]);
                }else{
                    tim = "-" + getTime(RES_NOW[ name ], 0 - RES_GROW[ name ]);
                }
                if( tim == "00:00:00" || tim.substr(0,1) == "-" ) dv.style.color="red";
                else if( parseInt(tim.substr(0,2), 10) < 1 ) dv.style.color="orange";
                else dv.style.color="lightgreen";

                dv.innerHTML = "(" + tim + ")";
                dv.style.top = (base.offsetTop + 12) + "px";
                dv.style.left = base.offsetLeft + "px";
            }
        }

        //名声
        var base = resources.fame.base;
        var dv = resources.fame.timer;
        if( base && dv) {
            dv.style.top = (base.offsetTop + addTop) + "px";
            dv.style.left = (base.offsetLeft + 10) + "px";
        }

        if( flag_cost ) {
            for(var i=0 ; i < facilityResources.length ; i++) {
                var facilityObj = facilityResources[i];
                for(var j=0 ; j<names.length ; j++ ) {
                    var name = names[j];
                    var base = facilityObj[name].base;
                    var dv = facilityObj[name].timer;
                    var needed = parseInt(base.innerHTML,10);
                    if( needed > RES_MAX[ name ] ) {
                        dv.style.color="red";
                        dv.innerHTML = "倉庫不足";
                    }else if( needed > RES_NOW[ name ] ) {
                        var tim = getTime(needed - RES_NOW[ name ], RES_GROW[ name ]);
                        dv.style.color="orange";
                        dv.innerHTML = "(" + tim + ")";
                    }else{
                        dv.style.color="lightgreen";
                        dv.innerHTML = "残" + (RES_NOW[ name ] - needed);
                    }
                    var elem_xy = cgetElementXY(base);
                    dv.style.top = (elem_xy.y + 9) + "px";
                    dv.style.left = (elem_xy.x - 18 )+ "px";
                }
            }
        }


        window.setTimeout( ResourcesTimer, 1000);
    }

    ResourcesTimer();

    function getTime(res, grow )
    {
        var tmp = res * 3600 / grow;
        var h = Math.floor(tmp / 3600);
        var m = Math.floor((tmp - h*3600 ) / 60 );
        var s = Math.floor(tmp - h*3600 - m*60 );
        var tim = h + ":" +
                  (m+100).toString().substr(-2)  + ":" +
                  (s+100).toString().substr(-2);
        return tim;
    }

}

//////////////////////
//地形一覧
//////////////////////
function disp_MapList()
{
    if( location.pathname != "/map.php" ) return;


    var map_type = 1;
    if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) map_type=2;
    else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) map_type=3;

    var base = $("mapbox");

    var div =d.createElement("div");
    div.id = "beyond_maplist";
    div.align = "center";
    div.appendChild(d.createElement("br"));

    var tmp_t = d.createElement("table");
    var tmp_r = d.createElement("tr");
    var tmp_d1 = d.createElement("td");
    ccreateCheckBox(tmp_d1, "beyond_maplist_kyoten", "1", "拠点","拠点を含めます",0);
    var tmp_d2 = d.createElement("td");
    ccreateCheckBox(tmp_d2, "beyond_maplist_ryouchi", "1", "領地","領地を含めます",0);
    var tmp_d3 = d.createElement("td");
    ccreateCheckBox(tmp_d3, "beyond_maplist_akichi", "1", "空き地","空き地を含めます",0);
    var tmp_d4 = d.createElement("td");

    var a = d.createElement("a");
    a.href = "javascript:void(0)";
    a.style.color = "black";
    a.appendChild(d.createTextNode("<地形一覧表示>"));
    tmp_d4.appendChild(a);

    tmp_r.appendChild(tmp_d1);
    tmp_r.appendChild(tmp_d2);
    tmp_r.appendChild(tmp_d3);
    tmp_r.appendChild(tmp_d4);
    tmp_t.appendChild(tmp_r);

    div.appendChild(tmp_t);
    base.appendChild(div);

    var sheet = d.styleSheets[d.styleSheets.length-1];
    sheet.insertRule("table#beyond_maplist_table {border:2px solid black; border-collapse:collapse;}", sheet.cssRules.length);
    sheet.insertRule("table#beyond_maplist_table th {background:lightgray; padding: 5px; text-align:center; border:1px solid black;}", sheet.cssRules.length);
    sheet.insertRule("table#beyond_maplist_table td {padding: 2px; border:1px solid black;}", sheet.cssRules.length);

    $e(a, "click", function() {

        var flag_akichi = cgetCheckBoxValue("beyond_maplist_akichi");
        var flag_ryouchi = cgetCheckBoxValue("beyond_maplist_ryouchi");
        var flag_kyoten = cgetCheckBoxValue("beyond_maplist_kyoten");

        var area = $a("//map[@id=\"mapOverlayMap\"]//area");
        var lists = new Array();
        for(var i=0; i<area.length ; i++) {
            var dat = area[i].getAttribute("onmouseover");
            dat = dat.replace(/^.*rewrite/, "getTRData");
            dat = dat.replace(/\); .*$/, ");");
            var trdata;
            eval("trdata = " + dat);
            if( trdata ) {
                lists.push(trdata);
            }
        }

        lists.sort( function(a,b){
                if(a.ally == "" && b.ally != "") return 1;
                else if(a.ally != "" && b.ally == "") return -1;

                if(a.ally > b.ally) return 1;
                else if(a.ally < b.ally) return -1;
                else{
                    if( a.user_name > b.user_name) return 1;
                    else if(a.user_name < b.user_name) return -1;
                    else{
                        if( a.kyoten_kind > b.kyoten_kind ) return -1;
                        else if( a.kyoten_kind < b.kyoten_kind ) return 1;
                        else {
                            if( parseInt(a.jinko,10) > parseInt(b.jinko,10) ) return -1;
                            else if( parseInt(a.jinko,10) < parseInt(b.jinko,10) ) return 1;
                            else {
                                if( parseFloat(a.kyori) > parseFloat(b.kyori) ) return 1;
                                else if( parseFloat(a.kyori) < parseFloat(b.kyori) ) return -1;
                                else {
                                    if( a.name > b.name ) return 1;
                                    else if( a.name < b.name ) return -1;
                                    else return 0;
                                }
                            }
                        }
                    }
                }
                return 0;
            });

        var tbl = initTable();

        for(var i=0 ; i<lists.length ; i++) {
            var tr = d.createElement("tr");
            var td;
            td = d.createElement("td");
            td.innerHTML = lists[i].ally;
            tr.appendChild(td);
            td = d.createElement("td");
            td.innerHTML = lists[i].user_name;
            tr.appendChild(td);
            td = d.createElement("td");
            if( lists[i].kyoten_img ) td.innerHTML = "<img src=\"" + lists[i].kyoten_img +  "\" style=\"width:30px; height:30px;\" />";
            tr.appendChild(td);
            td = d.createElement("td");
            td.style.display = "none";
            td.innerHTML = lists[i].kyoten_kind;
            tr.appendChild(td);
            td = d.createElement("td");
            td.innerHTML = lists[i].jinko;
            tr.appendChild(td);
            td = d.createElement("td");
            td.innerHTML = lists[i].name;
            tr.appendChild(td);

            td = d.createElement("td");
            var xy = lists[i].xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
            if( xy ) td.innerHTML = cgetXYHtml(xy[1], xy[2]);
            else td.innerHTML = lists[i].xy;
            tr.appendChild(td);
            td = d.createElement("td");
            td.innerHTML = lists[i].kyori;
            tr.appendChild(td);
            td = d.createElement("td");
            if( lists[i].npc ) td.style.color = "red";
            td.innerHTML = lists[i].star;
            tr.appendChild(td);

            tbl.appendChild(tr);
        }

        if( OPT_TTDISTANCE) disp_ToolTipsDistance();//試し

        function getTRData(name, user_name, jinko, xy, ally, star, kyori, wood, stone, iron, rice, npc)
        {
            if( !flag_akichi && ally == "" ) return null;

            if( jinko == "-") jinko = "";
            var kyoten_img = "";
            var kyoten_kind = 0;
            if( jinko || npc) {
                var tmp = xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
                if( tmp ) {
                    var cx = parseInt(URL_PARAM.x,10);
                    var cy = parseInt(URL_PARAM.y,10);
                    if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
                    if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
                    if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
                    if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;
                    var no = cgetMapNofromXY(parseInt(tmp[1], 10), parseInt(tmp[2], 10), cx, cy, map_type);
                    if( no ) {
                        var img = $x("//div[@id=\"mapsAll\"]//img[@class=\"mapAll" + no + "\"]");
                        if( img ) {
                            kyoten_img = img.getAttribute("src");
                            if( npc ) kyoten_kind = 4;
                            else if( kyoten_img.match(/village/) ) kyoten_kind = 1;
                            else if( kyoten_img.match(/fort/) ) kyoten_kind = 2;
                            else if( kyoten_img.match(/capital/) ) kyoten_kind = 3;

                        }
                    }
                }
            }

            if( !flag_ryouchi && ally != "" && kyoten_kind == 0 ) return null;
            if( !flag_kyoten && ally != "" && kyoten_kind != 0 ) return null;

            return {"kyoten_kind":kyoten_kind, "kyoten_img":kyoten_img,
                    "jinko":jinko , "ally":ally, "user_name":user_name,
                    "name":name, "xy":xy, "kyori":kyori, "star":star, "npc":npc};
        }

        var sort_kind, sort_order;

        function row_sort(col, kind, order) {
            var tbl = $("beyond_maplist_table");
            var trs = $a("descendant::tr[position()>1]",tbl);
            sort_kind = kind;
            sort_order = order;

            var strs = new Array();
            if( kind == "xy" ) {
                //座標はaの下
                for(var i=0; i<trs.length ; i++) {
                    var td = $x("descendant::td[" + col + "]", trs[i]);
                    var a = $x("descendant::a", td);
                    if( a ) strs.push({"node":trs[i], "value":a.innerHTML});
                    else strs.push({"node":trs[i], "value":""});
                }
            } else {
                for(var i=0; i<trs.length ; i++) {
                    var td = $x("descendant::td[" + col + "]", trs[i]);
                    if(td.style.color=="red") {
                        strs.push({"node":trs[i], "value":"★★★★★★★★★★" + td.innerHTML});//NPC砦だけ特別に
                    }else{
                        strs.push({"node":trs[i], "value":td.innerHTML});
                    }
                }
            }

            strs.sort( function(a,b) {
                var ret = 0;
                if( sort_kind == "num" ){
                    if( a.value == "" && b.value == "" ) return 0;
                    else if( a.value == "" ) return 1;
                    else if( b.value == "" ) return -1;
                    else ret = parseInt(a.value, 10) - parseInt(b.value, 10);
                }else if( sort_kind == "kyo" ){
                    if( parseInt(a.value, 10) == 0 && parseInt(b.value, 10) == 0) return 0;
                    else if( parseInt(a.value, 10) == 0 ) return 1;
                    else if( parseInt(b.value, 10) == 0 ) return -1;
                    else ret = parseInt(a.value, 10) - parseInt(b.value, 10);
                }else if( sort_kind == "float" ){
                    ret = parseFloat(a.value, 10) - parseFloat(b.value, 10);
                }else if (sort_kind == "xy") {
                    //座標
                    if( !a.value && !b.value ) ret =  0;
                    else if( !a.value ) ret = 1;
                    else if( !b.value ) ret = -1;
                    else {
                        var a_xy = a.value.split(",");
                        var b_xy = b.value.split(",");
                        ret = ( Math.pow(parseInt(a_xy[0], 10), 2) + Math.pow(parseInt(a_xy[1], 10), 2) ) -
                              ( Math.pow(parseInt(b_xy[0], 10), 2) + Math.pow(parseInt(b_xy[1], 10), 2) );
                    }
                }else {
                    if( a.value == b.value ) {
                        ret = 0;
                    }else if( a.value == "" ) {
                        return 1;
                    }else if( b.value == "" ) {
                        return -1;
                    }else if( a.value > b.value ) {
                        ret = 1;
                    }else {
                        ret = -1;
                    }
                }
                if( sort_order == "dsc") {
                    ret = 0 - ret;
                }
                return ret;
            });

            tbl = initTable();

            for(var i=0 ; i<trs.length ; i++) {
                tbl.appendChild(strs[i].node);
            }
        }

        function appendSortButton(col, sortcol, kind )
        {
            var tbl = $("beyond_maplist_table");
            var th = $x("descendant::tr[1]//th[" + col + "]", tbl);
            if( !th ) return;
            th.appendChild(d.createElement("br"));

            var a = d.createElement("a");
            a.href = "javascript:void(0);";
            var img = d.createElement("img");
            img.src= IMG_DIR + "trade/icon_up.gif";
            img.alt = "昇順に並べ替え";
            img.title = img.alt;
            a.appendChild(img);
            th.appendChild(a);

            (function(n, k){
                $e(a, "click", function(){row_sort(n, k, "asc"); } );
            })(sortcol, kind);


            th.appendChild(d.createTextNode(" "));

            a = d.createElement("a");
            a.href = "javascript:void(0)";
            img = d.createElement("img");
            img.src= IMG_DIR + "trade/icon_down.gif";
            img.alt = "降順に並べ替え";
            img.title = img.alt;

            a.appendChild(img);
            th.appendChild(a);

            (function(n, k){
                $e(a, "click", function(){row_sort(n, k, "dsc"); } );
            })(sortcol, kind);

        }

        function initTable()
        {
            var dv = $("beyond_maplist");

            var tbl = $("beyond_maplist_table");
            if( tbl ) {
                tbl.parentNode.removeChild(tbl);
            }else{
                var a = d.createElement("a");
                a.href = "#ptop";
                a.style.color="black";
                a.appendChild(d.createTextNode("▲トップに戻る"));
                a.id = "beyond_maplist_table_gotop";
                dv.appendChild(a);
            }

            tbl = d.createElement("table");
            tbl.id = "beyond_maplist_table";

            tbl.innerHTML = "<tr>" +
                    "<th>同盟</th><th>君主</th><th>拠点</th><th style=\"display:none;\">拠点Kind</th>" +
                    "<th>人口</th><th>領地名</th><th>座標</th><th>距離</th><th>戦力</th>" +
                    "</tr>";

            dv.insertBefore(tbl, $("beyond_maplist_table_gotop"));

            appendSortButton(1, 1, "str" );
            appendSortButton(2, 2, "str" );
            appendSortButton(3, 4, "kyo" );
            appendSortButton(5, 5, "num" );
            appendSortButton(7, 7, "xy" );
            appendSortButton(8, 8, "float" );
            appendSortButton(9, 9, "str" );

            return tbl;
        }
    });
}

//////////////////////
//距離/時間表示（ToolTips）
//////////////////////
function disp_ToolTipsDistance()
{
    if( location.pathname == "/village.php" ) {
        saveTrainingLevel();
    }

    var links = $a('//a[contains(@href,"castle_send_troop.php") and not(contains(@href,"TB_inline"))]');
    if (!links.length) {
        return;
    }


    var TL = 0;
    var ETL = 0;
    var vid = cgetCurrentVillageId();
    var lists = cloadData("TrainingLevels", "[]", true, true);

    for (var i = 0;i < lists.length;i++) {
        if (lists[i].id == vid) {
            TL = parseInt(lists[i].level,10);
            ETL = parseInt(lists[i].elevel,10);
            break;
        }
    }

    if (isNaN(""+TL)) {
        TL = 0;
    }
    if (isNaN(""+ETL)) {
        ETL = 0;
    }


    var reg = /x=(-?\d+)&y=(-?\d+)/;
    for(var i=0 ; i<links.length ; i++) {
        if(!reg.test(links[i].href)) continue;

        links[i].alt = "";
        links[i].title = "";
        $e(links[i], "mouseover", function (event) {
            var xy = this.href.match(reg);
            var distance = cgetDistanceFromBase(xy[1], xy[2] );
            showToolTips(event, distance, TL, ETL);
        });

        $e(links[i], "mouseout", function () { hideToolTips(); } );

    }

    function showToolTips( evt, distance, trainingLevel , eTrainingLevel)
    {
        hideToolTips();
        var sp = 0.05 * trainingLevel + 1+ (eTrainingLevel*0.001*distance);

        var tw = d.createElement("div");
        tw.id = "beyond_ToolTipsWindow";
        tw.style.position = "absolute";
        tw.style.backgroundColor = "lightyellow";
        tw.style.border = "outset 2px lightyellow";
        tw.style.fontSize = "10px";
        tw.style.padding = "10px";
        tw.style.zIndex = 1000;
        var xxx = evt.pageX + 5;
        if( xxx > 700 ) xxx -=175;
        tw.style.left = xxx + "px";
        tw.style.top = (evt.pageY +5) + "px";

        var dv = d.createElement("div");
        dv.innerHTML = "時間の目安　　遠征訓練所Lv."+eTrainingLevel+" (+"+(eTrainingLevel*0.1*distance).toFixed(3)+"%)<br>距離 [" + distance.toFixed(2) + "]　訓練所Lv." + trainingLevel + " (+" + (TL*5) + "%)" ;
        tw.appendChild(dv);

        var tbl = d.createElement("table");
        tbl.style.border = "2px solid black";
        tbl.style.borderCollapse = "collapse";
        tbl.style.width = "100%";

        var now = cgetNow();

        for(var i=0 ; i<OPT_TTDISTANCE_ITEMS.length ; i++){

            var tmp = OPT_TTDISTANCE_ITEMS[i].match(/.*\((-?[0-9]+([\.]{1}[0-9]+)?)\)/);
            if( !tmp ) continue;
            var speed = parseFloat(tmp[1]);
            if( speed < 0 ) continue;

            var tr = d.createElement("tr");
            var td = d.createElement("td");
            td.style.border = "1px solid black";
            td.style.textAlign = "left";
            td.appendChild(d.createTextNode( OPT_TTDISTANCE_ITEMS[i] ));
            tr.appendChild(td);

            var timeText = getTime(speed * sp, distance);

            td = d.createElement("td");
            td.style.border = "1px solid black";
            td.style.textAlign = "right";
            td.appendChild(d.createTextNode(timeText));
            tr.appendChild(td);

            var dayText = caddDate(now, timeText);
            dayText = dayText.substring(5, dayText.length - 3).replace("-", "/");


            td = d.createElement("td");
            td.style.border = "1px solid black";
            td.style.textAlign = "right";
            td.appendChild(d.createTextNode(dayText));
            tr.appendChild(td);

            tbl.appendChild(tr);
        }

        tw.appendChild(tbl);
        $("beyond_floatpanel").appendChild(tw);



        function getTime(speed, dist)
        {
            var tmp = dist * 3600 / speed;
            var h = Math.floor(tmp / 3600);
            var m = Math.floor((tmp - h*3600 ) / 60 );
            var s = Math.floor(tmp - h*3600 - m*60 );
            var tim = h + ":" +
                      (m+100).toString().substr(-2)  + ":" +
                      (s+100).toString().substr(-2);
            return tim;
        }

    }
    function hideToolTips()
    {
        var tw = $("beyond_ToolTipsWindow");
        if( tw ){
            tw.parentNode.removeChild(tw);
        }
    }


    function saveTrainingLevel()
    {
        var vil_id = cgetCurrentVillageId();
        if( !vil_id ) return;
        var basename = cgetCurrentBaseName();
        if( !basename ) return;

        var level = 0;
        var elevel = 0;
        var map = $a('//area[contains(@alt, "訓練所")]');;
        if(0 < map.length) {
            for (var i = 0;i < map.length;i++) {
                var lv = map[i].alt.match(/((?:遠征)?訓練所) LV.([0-9]+)/);
                if(lv[1] == "訓練所") {
                    level = parseInt(lv[2],10);
                }
                else if (lv[1] == "遠征訓練所") {
                    elevel = parseInt(lv[2],10);
                }
            }
        }


        var lists = cloadData("TrainingLevels", "[]", true, true);
        var newLists = new Array();
        var isNewItem = true;
        for (var i = 0;i < lists.length;i++) {
            if (chasVillageId(lists[i].id)) {
                var data = lists[i];
                if (data.id == vil_id) {
                    data.basename = basename;
                    data.level = level;
                    data.elevel = elevel;
                    isNewItem = false;
                }
                newLists.push({id:data.id,basename:data.basename,level:data.level,elevel:data.elevel});
            }
            if (newLists.length == 10) {
                break;
            }
        }

        if (isNewItem) {
            newLists.push({id:vil_id,basename:basename,level:level,elevel:elevel});
        }

        csaveData( "TrainingLevels", newLists, true, true );
    }


}

//////////////////////
//同盟/君主表示（ToolTips）
//////////////////////
function disp_ToolTipsAllyPerson()
{
    var links = $a('//a[(contains(@href,"village_change.php") or contains(@href,"land.php")) and not(contains(@href,"TB_inline") or contains(@href,"from"))]');
    if (links.length == 0) return;

    var selfVillages =cgetVillageIds();

    for(var i=0 ; i<links.length ; i++) {
        if(links[i].href.match(/village_change\.php/)) {
            var tmp = links[i].href.match(/village_id=([0-9]+)/);
            if( tmp && selfVillages[tmp[1]]) {
                continue;
            }
        }

        links[i].alt = "";
        links[i].title = "";

        $e(links[i], "mouseover", function(event){ showToolTips(event, this.href); } );
        $e(links[i], "mouseout", function(){ hideToolTips(); } );
    }

    function showToolTips( evt, url )
    {
        hideToolTips();
        var tw = d.createElement("div");
        tw.id = "beyond_ToolTipsWindow";
        tw.style.position = "absolute";
        tw.style.backgroundColor = "lightyellow";
        tw.style.border = "outset 2px lightyellow";
        tw.style.fontSize = "10px";
        tw.style.padding = "10px";
        tw.style.zIndex = 1000;
        var xxx = evt.pageX + 5;
        if( xxx > 700 ) xxx -=50;
        tw.style.left = xxx + "px";
        tw.style.top = (evt.pageY +5) + "px";
        var dv = d.createElement("div");
        dv.id = "beyond_ToolTipsWindow_base";
        dv.appendChild(d.createTextNode("領地 : ..."));
        tw.appendChild( dv );

        dv = d.createElement("div");
        dv.id = "beyond_ToolTipsWindow_ally";
        dv.appendChild(d.createTextNode("同盟 : ..."));
        tw.appendChild( dv );

        dv = d.createElement("div");
        dv.id = "beyond_ToolTipsWindow_user";
        dv.appendChild(d.createTextNode("君主 : ..."));
        tw.appendChild( dv );
        $("beyond_floatpanel").appendChild(tw);


        cajaxRequest(url, "GET", "", function(req){
            var tw = $("beyond_ToolTipsWindow");
            if( !tw ) return ;

            var dom = d.createElement("html");
            dom.innerHTML = req.responseText;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                $("beyond_tmp").appendChild(dom);
            }
            var dt = getDatafromLandElm(dom);
            if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                $("beyond_tmp").removeChild(dom);
            }
            if( !dt ) return ;

            if( $("beyond_ToolTipsWindow_base") ) {
                $("beyond_ToolTipsWindow_base").innerHTML = "領地 : " + dt.base + "(" + dt.x + "," + dt.y + ")";
                $("beyond_ToolTipsWindow_ally").innerHTML = "同盟 : " + dt.ally;
                $("beyond_ToolTipsWindow_user").innerHTML = "君主 : " + dt.user;
            }
        }, function(req){
//          alert("サーバからエラーが返りましたよ" );
        });

    }
    function hideToolTips()
    {
        var tw = $("beyond_ToolTipsWindow");
        if( tw ){
            tw.parentNode.removeChild(tw);
        }
    }
    function getDatafromLandElm(dom)
    {
        var ret = new Array();

        var nam = $x('.//span[@class="basename"]', dom);

        if( !nam ) return null;
        ret["base"] = nam.innerHTML;

        var xy = $x('.//span[@class="xy"]', dom);
        if( !xy ) return null;
        xy = xy.innerHTML.match(/([\-0-9]+),([\-0-9]+)/);
        if( !xy ) return null;
        ret["x"] = parseInt(xy[1], 10);
        ret["y"] = parseInt(xy[2], 10);

        var a = $a('.//div[@class="status"]//a', dom);
        if( a.length < 2 ) {
            ret["user"] = "";
            ret["ally"] = "";
        }else{
            ret["user"] = a[0].innerHTML;
            ret["ally"] = a[1].innerHTML;
        }
        return ret;
    }

}


//////////////////////
//プロフィール画面星表示
//////////////////////
function disp_UserStar()
{
    if( location.pathname == "/user/" || location.pathname == "/user/index.php" ) {
        showProfile();
    }


    function showProfile()
    {
        //君主名取得
        var uname_td = $x("//table[@class=\"commonTables\"]//tr[2]/td[2]");
        if( !uname_td ) return;
        var uname = uname_td.textContent;
        var uid = USER_ID;
        if( URL_PARAM.user_id ) uid = URL_PARAM.user_id;

        //table★欄追加
        cappendColumnForProfile("★", "beyond_star" );

        //内容初期設定
        lists = cloadData( "UserStarList" + uid, "[]", true, true );

        for( var i=0 ; i<lists.length ; i++){
            var td = $("beyond_star_" + lists[i].x + "_" + lists[i].y);
            if( td && td.innerHTML == "" ) {
                if( lists[i].npc ) {
                    td.innerHTML = "★" + lists[i].star;
                    td.style.color = "red";
                }else{
                    td.innerHTML = "★" + lists[i].star + " (" + lists[i].wood + "," + lists[i].stone + "," + lists[i].iron + "," + lists[i].rice + ")";
                }
                td.style.opacity = lists[i].star * 0.05 + 0.5;
            }
        }
        //タイトルにGETを追加
        var th = $("beyond_star_title");
        if( th ) {
            var lnk = d.createElement("a");
            lnk.href = "javascript:void(0)";
            lnk.innerHTML ="(GET)";
            lnk.style.fontSize = "9px";

            var running = false;
            $e(lnk, "click", function() {

                if( running ) return ;

                if( confirm("☆情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false ) return;
                running = true;

                window.setTimeout(timerFunc, 0);

                function timerFunc()
                {
                    var tds = $a("//td[contains(@id, \"beyond_star_\")]");
                    var targettd = "";
                    var targetid = "";
                    for( var i=0 ; i< tds.length ; i++) {
                        if( tds[i].innerHTML == "" ) {
                            targettd = tds[i];
                            targetid = tds[i].id;
                            break;
                        }
                    }
                    if( !targetid ) {
                        alert("全ての☆情報を取得しました");
                        running = false;
                        return;
                    }

                    var xy = targetid.match(/beyond_star_([\-0-9]+)_([\-0-9]+)/);
                    if( !xy ) {
                        GM_log("err");;
                        return ;
                    }

                    cajaxRequest("/map.php?x=" + xy[1] + "&y=" + xy[2], "GET", "", function(req) {
                        var dom = d.createElement("html");
                        dom.innerHTML = req.responseText;
                        if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                            $("beyond_tmp").appendChild(dom);
                        }

                        var area = $a("//map[@id=\"mapOverlayMap\"]//area", dom);
                        for(var i=0 ; i<area.length ; i++){
                            var dat = area[i].getAttribute("onmouseover");
                            dat = dat.replace(/^.*rewrite/, "setStar");
                            dat = dat.replace(/\); .*$/, ");");
                            //evalの中ではGM_set/getValueが出来ないので、変数を一旦外に出す形に
                            eval("dat = " + dat);
                            if( !dat ) continue;

                            var td = $("beyond_star_" + dat.x + "_" + dat.y);
                            if( !td ) { GM_log("td null err?:" + dat.x + "," + dat.y); return;};
                            if( td.innerHTML) continue;

                            csetUserStar( uid, dat.x, dat.y, dat.star.length, dat.wood, dat.stone, dat.iron, dat.rice, dat.npc );
                            if( dat.npc ) {
                                td.innerHTML = "★" + dat.star.length;
                                td.style.color = "red";
                            }else{
                                td.innerHTML = "★" + dat.star.length + " (" + dat.wood + "," + dat.stone + "," + dat.iron + "," + dat.rice + ")";
                            }
                            td.style.opacity = dat.star.length * 0.05 + 0.5;
                        }

                        if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                            $("beyond_tmp").removeChild(dom);
                        }

                        window.setTimeout(timerFunc, 0);

                    });
                }
            });

            th.appendChild(lnk);
        }
        function setStar(name, user_name, jinko, xy, ally, star, kyori, wood, stone, iron, rice, npc)
        {
            if( uname == user_name) {
                var tmp = xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
                if( tmp ) {
                    var x = tmp[1];
                    var y = tmp[2];
                    return {"user_name":user_name, "x":x, "y":y, "star":star, "wood":wood, "stone":stone, "iron":iron, "rice":rice, "npc":npc};
                }
            }
            return null;
        }
    }
}

//////////////////////
//プロフィール画面Level表示
//////////////////////
function disp_UserLevel()
{

    if( location.pathname == "/user/" || location.pathname == "/user/index.php" ) {
        if( !URL_PARAM.user_id || USER_ID == URL_PARAM.user_id ) {
            showProfile();
        }
    }
    if( location.pathname == "/land.php" || location.pathname == "/village.php" ) {
        //保存
        var spnxy = $x("//span[@class=\"xy\"]");
        if( !spnxy ){
            return;
        }
        var xy = spnxy.innerHTML.match(/\(([\-0-9]+),([\-0-9]+)\)/);
        if( !xy ) {
            return;
        }
        var tmp = spnxy.innerHTML.match(/レベル(\d+)/);
        if( tmp ) {
    //        GM_log("add:" + xy[1] + "," + xy[2]);
            csetMyLevel(xy[1], xy[2], tmp[1] );
        }else {
     //       GM_log("del:" + xy[1] + "," + xy[2]);
            cdelMyLevel(xy[1], xy[2]);
        }
    }


    function showProfile()
    {
        //tableLevel欄追加
        cappendColumnForProfile("Level", "beyond_level" );

        //内容初期設定
        lists = cloadData( "MyLevelList", "[]", true, true );
        for( var i=0 ; i<lists.length ; i++){
            var td = $("beyond_level_" + lists[i].x + "_" + lists[i].y);
            if( td ) {
                td.innerHTML = lists[i].level;
            }
        }
        updateLevelUp();
        updateLevelUpLink();

        //タイトルにGETを追加
        var th = $("beyond_level_title");
        if( th ) {
            var lnk = d.createElement("a");
            lnk.href = "javascript:void(0)";
            lnk.innerHTML ="(GET)";
            lnk.style.fontSize = "9px";

            var running = false;
            $e(lnk, "click", function() {
                if( running ) return ;

                if( confirm("Level情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false ) return;
                running = true;
                window.setTimeout(timerFunc, 0);

                function timerFunc()
                {
                    var tds = $a("//td[contains(@id, \"beyond_level_\")]");
                    var targettd = "";
                    var targetid = "";
                    for( var i=0 ; i< tds.length ; i++) {
                        if( tds[i].innerHTML == "" ) {
                            targettd = tds[i];
                            targetid = tds[i].id;
                            break;
                        }
                    }
                    if( !targetid ) {
                        updateLevelUp();
                        updateLevelUpLink();
                        running = false;
                        alert("全てのレベル情報を取得しました");
                        return;
                    }

                    var xy = targetid.match(/beyond_level_([\-0-9]+)_([\-0-9]+)/);
                    if( !xy ) {
                        GM_log("err");;
                        return ;
                    }

                    cajaxRequest("/land.php?x=" + xy[1] + "&y=" + xy[2], "GET", "", function(req) {
                        var dom = d.createElement("html");
                        dom.innerHTML = req.responseText;
                        if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                            $("beyond_tmp").appendChild(dom);
                        }
                        var spnxy = $x("//span[@class=\"xy\"]", dom);
                        if( !spnxy ){
                            GM_log("span class=xy err");
                            return;
                        }
                        var xy = spnxy.innerHTML.match(/\(([\-0-9]+),([\-0-9]+)\)/);
                        if( !xy ) {
                            GM_log("xy match err");
                            return;
                        }
                        var level = 0;
                        var tmp = spnxy.innerHTML.match(/レベル(\d+)/);
                        if( tmp ) {
                            level = tmp[1];
                        }
                        var td = $("beyond_level_" + xy[1] + "_" + xy[2]);
                        if( !td ) { GM_log("td null err?:" + xy[1] + "," + xy[2]); return;};
                        if( !td.innerHTML ) {
                            csetMyLevel(xy[1], xy[2], level);
                            td.innerHTML = level;
                        }
                        if (navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
                            $("beyond_tmp").removeChild(dom);
                        }

                        window.setTimeout(timerFunc, 0);

                    });
                }
            });

            th.appendChild(lnk);

        }

        function updateLevelUp()
        {
            //建設/破棄リストから
            var lists = cloadData("RemoveList", "[]", true, true);
            for(var i=0 ; i<lists.length ; i++) {
                if( lists[i].kind != 5 ) continue;
                var td = $("beyond_level_" + lists[i].x + "_" + lists[i].y);
                if( !td ) continue;
    //           GM_log("td:" + td.innerHTML);
                var level = parseInt(td.innerHTML,10);
                if( isNaN( ""+level ) ) continue;
                td.innerHTML =  level + " (+)";
            }
        }
        function updateLevelUpLink()
        {
            var img_lvup = 'data:image/gif;base64,'+
                'R0lGODlhFQAVAJEAAIaT6////////wAAACH5BAUUAAIALAAAAAAVABUAAAJDlICpi3YM14u0WhVY'+
                'Rjn4zWlJx4HgiJrooqohm67A+c727GLpp8MhXZORRD4b8NYzQj4k5pDF2/CQl6pVclU4sgBDAQA7';
            var tds = $a("//td[contains(@id, \"beyond_level_\")]");
            for( var i=0 ; i<tds.length ; i++){
                if( "" + parseInt(tds[i].innerHTML,10) == tds[i].innerHTML ) {
                    var lv = parseInt(tds[i].innerHTML,10);
                    if( lv < 1 || lv > 4 ) continue;
                    var mtbl = [2, 2, 2, 4];
                    var meisei = mtbl[lv - 1];
                    if( RES_NOW.fame >= meisei ) {
                        var xy = tds[i].id.match(/beyond_level_([\-0-9]+)_([\-0-9]+)/);
                        if( xy ) {
                            var lnk =  '<a href="'+caddSessionId('/territory_proc.php?x=' + xy[1] + '&y=' + xy[2] + '&mode=lvup')+'" title="レベルアップ" onclick="';
                                lnk += "return confirm('名声" + meisei + "を消費し、領地をレベルアップしますか？');";
                                lnk += '"><img src="' + img_lvup + '" style="width:14px; height:14px; vertical-align:middle;"></a>';
                            tds[i].innerHTML += lnk;
                        }
                    }
                }
            }
        }
    }
}


//////////////////////
//同盟ログ前後リンク追加
//////////////////////
/***
function disp_ReportNextPrior()
{
    if( location.pathname == "/alliance/alliance_log.php" ) {
        var elms = $a("//table[@class=\"commonTables\"]//tr/td[2]/a");
        var lists = new Array();
        for( var i=0; i<elms.length ; i++) {
            var ids = elms[i].href.match(/id=(\d+)/);
            if( ids ) {
                lists.push(ids[1]);
            }
        }
        csaveData("AllyReports", lists, true, true);
    }
    if( location.pathname == "/alliance/detail.php" ) {
        var lists = cloadData("AllyReports", "[]", true, true);

        var pos =lists.indexOf( URL_PARAM.id );
        if( pos != -1 ) {
            var tbl = d.createElement("table");
            tbl.width = "100%";
            var tmpHTML = "<tr>";
            if( pos < lists.length -1  ) {
                var params = "id=" + lists[pos + 1] +
                            "&m=" + ( (URL_PARAM.m) ? URL_PARAM.m : ""  ) +
                            "&p=" + ( (URL_PARAM.p) ? URL_PARAM.p : ""  );
                tmpHTML += "<td align=\"left\"><a href=\"/alliance/detail.php?" + params + "\">前の報告書へ</a></td>"
            }
            if( pos > 0 ) {
                var params = "id=" + lists[pos - 1] +
                            "&m=" + ( (URL_PARAM.m) ? URL_PARAM.m : ""  ) +
                            "&p=" + ( (URL_PARAM.p) ? URL_PARAM.p : ""  );
                tmpHTML += "<td align=\"right\"><a href=\"/alliance/detail.php?" + params + "\">次の報告書へ</a></td>"
            }
            tmpHTML += "</tr>";
            tbl.innerHTML = tmpHTML;
            var ct = d.createElement("center");
            ct.appendChild(tbl);
            var inspos = $x("//table[@summary=\"件名\"]");
            if( inspos ) {
                inspos.parentNode.insertBefore(ct, inspos);
            }
        }
    }

}
***/
//////////////////////
//マップ中央表示
//////////////////////
function disp_MapCenter()
{
    if( location.pathname != "/map.php" ) return;
    var cx = parseInt(URL_PARAM.x, 10);
    var cy = parseInt(URL_PARAM.y, 10);
    if( isNaN(""+cx) ) cx = 0;
    if( isNaN(""+cy) ) cy = 0;
    if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
    if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
    if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
    if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;
    var area_center = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + cx + "&y=" + cy + "\"]");
    if( !area_center ) return;

    var dat = area_center.getAttribute("onmouseover");
    dat = dat.replace(/^.*overOperation/, "setCenter");
    dat = dat.replace(/\); .*$/, ");");
    eval(dat);

    var dv = d.createElement("div");
    dv.style.fontSize= "10px";
    dv.appendChild(d.createTextNode("中央:( " + cx + " , " + cy + " )"));
    $("mapXY").appendChild(dv);

    function setCenter(act, x, y )
    {
        var rollover = $("rollover");
        var icon_c = 'data:image/png;base64,'+
                'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz'+
                'AAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMy8yNi8wOQlCSeUAAAAldEVYdFNv'+
                'ZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1YIDIwMDSHdqzPAAAEd0lEQVR4nO3by2+UVRjH'+
                '8U9LC0UUoqIBRAxCQUWRS0mUiBfEe70tdKMb48aYmPCfuDMmxoVrF97AiAFUEF1wURCNEUQTNQXR'+
                'KEpVGMq4eN6XmXlnOk7bGcCX95eckPcy532+55znck5KV7lcdiGp+1wbcLZVAOddBXDeVQDnXQVw'+
                '3lUA510FcN5VAOddBXDeVQDnXQVw3lUA510FcN51wQH31FwdeL5T35mOZbgiaXAUR7Afv3fkq/0v'+
                '1d3qafBaO7UEazEfM9CLruRZGSUcx0/YhL0dtqdjwEsxiEWYVHW/hGMC+lJMxmVJW4Jv8A72dciu'+
                'tgOvxANYqBb0NA7iQ7GEYTluxzWJHd24Lvntt3gXe9psX9uAB/AQrlUbCEcE6CbsFuCptooBWIl7'+
                '0S8GqQeLk+tDAnxnm+ycMPBqAXq1im/CKRzABnwh/LWRTguYXbgp6WuRyowvxAv4ARvxyQTtHRdw'+
                'D9bgfsxWCzqCz/G6CEStqiz8dh+uwhMiqk9K+p+H5/CwWC07RDwYl/GtajLuFFF3jlrQVF1JuxJ/'+
                '4o8x2jM9+W3aT7bvuXhWxIktwiVOjuUDrQBPxjoBOytjyHF8JWZ6rliGK5L2Jt5Q67fN1I178FjV'+
                'vbJYzodxAy5O7s/B08n7W0Q8aAm8GfBFSYd3qBQLqf4RQegtDImltw73Jc+2Cb9sFVby7kcYFtG7'+
                'D+8JoBExqI+KINcnBn4Wnkrs3Ib38Xezj3TV/FFLVFq9wj/XYmbm/WHhoyloVlNFwBqXf1WpV0xG'+
                'I+NT8GWYlnn2ixigTSi1UmlNxTO4Re3SHRYzukFj0FRNR3cMKhl90IbwsgAfFDOegs/EkyLwvSZW'+
                'W42ym4eluLXquiyW5nq8ojns2daQsGm9mIzq1LdapLk6ZYFL6v2uW+OIfL6oS+NdX8P4kV3S+/Gp'+
                'GKG0sxV4Ucz0RufPLM8WhcqAel/eLgqeOmWBT+JV/Cii7uXJ/WkiWg/gM7zt3AatR0QtngX9FZul'+
                'QauBGqWlkghOW0WaWaOSlqbhNgG+R+TaIbGk7hbRPU1Lu0XUHItmiiCUTUun1aelah1VSUt/NftA'+
                'o7SU1RQx23epVEGphsXSmS3Kv+pn4yk8Htda4ZE++1lMzGaNCo8GaakV4FRTBPRa9RVXqlNiE79d'+
                '7JKONeuwgWZggXCf5aN8g6jTPxCl5YlRe5vgiccJlSW2Riz3OZl3usWMHjZ2WMlvhsTslQVw+i+V'+
                'k5HtYnDHrPHslkpiGW0V/vygqKPT9LBKVEEH/ff2MFWXyJuDYkvYm3mebg93jMPeGk10P/xx0lYJ'+
                'Y+cL43txvdjbjnYAQAxQ9gAgVRnfiUE7bw4AUu1M2oDKEU+3AFicXB8Sm4OvBcxisQNboP446IBw'+
                'n11tsu+M2n2mtStpN4vNer8KeL84Akr3yJdkvj8iQP9Xh3ip9ibtRpFT54kipk+cVqY6gd/wvYi4'+
                'X3bInjPq9Ln0/qT1CfhZImcT0fiIOEAY7rAdZ9RV/CePnKsAzrsK4LzrggP+F1IbDJgkELkdAAAA'+
                'AElFTkSuQmCC';
        var img = d.createElement("img");
        img.src = icon_c;
        img.style.zIndex = 200;
        img.style.position = "absolute";

        img.style.left = x;
        img.style.top = y;
        if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) {
            img.style.width = "44px";
            img.style.height = "44px";
        } else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) {
            img.style.width = "33px";
            img.style.height = "33px";
        } else {
            img.style.width = "60px";
            img.style.height = "60px";
        img.style.zIndex = 121;
        }
        rollover.parentNode.insertBefore(img, rollover.nextSibling);
    }

}

//////////////////////
//討伐ゲージ回復時間表示
//////////////////////
function disp_ToubatsuRestTime()
{
    if(location.pathname != "/card/deck.php") return ;

    ToubatsuRecoveryEstimates();

    function ToubatsuRecoveryEstimates()
    {
        var now = cgetNow();
        //デッキ
        var decks = $a("//div[@id=\"cardListDeck\"]//div[@class=\"control\"]");
        for( var i=0; i<decks.length ; i++ ){
            var stat = $x("descendant::dl/dd[3]", decks[i]);
            if( !stat ) continue;
            if( stat.textContent == "内政セット済" )  continue;

            var tb = $x("descendant::dl/dd[1]/div[1]", decks[i]);
            if( !tb ) continue;
            tb = 500 - parseInt( tb.textContent, 10 );

            if( tb != 0 ) {
                var timeText = getTime( tb );
                var dayText = caddDate(now, timeText);
                var txt = "500まで" + timeText + "後 (" + dayText + "完了)";

                $x("descendant::dl/dt[1]", decks[i]).title = txt;
                $x("descendant::dl/dd[1]", decks[i]).title = txt;
            }

        }
        //ファイル（カード表示）
        var files = $a("//div[@id=\"cardFileList\"]//div[@class=\"control\"]");
        for( var i=0; i<files.length ; i++ ){
            var tb = $x("descendant::dl/dd[1]/div[1]", files[i]);
            if( !tb ) continue;
            tb = 300 - parseInt( tb.textContent, 10 );

            if( tb != 0 ) {
                var timeText = getTime( tb );
                var dayText = caddDate(now, timeText);
                var txt = "300まで" + timeText + "後 (" + dayText + "完了)";

                $x("descendant::dl/dt[1]", files[i]).title = txt;
                $x("descendant::dl/dd[1]", files[i]).title = txt;
            }

        }
        //ファイル（ｘ枚表示）
        var files = $a("//table[@class=\"statusParameter1\"]//tr[7]");
        for( var i=0; i<files.length ; i++ ){

            var tb = $x("descendant::td[1]", files[i]);
            if( !tb ) continue;
            tb = 300 - parseInt( tb.textContent, 10 );

            if( tb != 0 ) {
                var timeText = getTime( tb );
                var dayText = caddDate(now, timeText);
                var txt = "300まで" + timeText + "後 (" + dayText + "完了)";

                $x("descendant::th[1]", files[i]).title = txt;
                $x("descendant::td[1]", files[i]).title = txt;
            }

        }

        window.setTimeout(function() { ToubatsuRecoveryEstimates(); }, 60*1000);
    }

    function getTime(toubatsu)
    {
        var tmp = toubatsu * 216;
        var h = Math.floor(tmp / 3600);
        var m = Math.floor((tmp - h*3600 ) / 60 );
        var s = Math.floor(tmp - h*3600 - m*60 );
        var tim = h + ":" +
                  (m+100).toString().substr(-2)  + ":" +
                  (s+100).toString().substr(-2);
        return tim;
    }
}

//////////////////////
//書簡/報告書削除機能
//////////////////////
function disp_DeleteMessages()
{
    if( location.pathname == "/message/detail.php" ) {
        //書簡削除ボタン
        addDeleteMessageButton();
    }
    if( location.pathname == "/report/detail.php" ) {
        //報告書削除ボタン
        addDeleteReportButton();
    }

    function addDeleteMessageButton()
    {
        var frm = d.createElement("form");
        frm.method = "post";
        frm.action = "/message/delete.php";
        var m = d.createElement("input");
        m.type = "hidden";
        m.name = "mode";
        m.value = URL_PARAM.m;
        var p = d.createElement("input");
        p.type = "hidden";
        p.name = "p";
        p.value = URL_PARAM.p;
        var c = d.createElement("input");
        c.type = "hidden";
        c.name = "chk[]";
        c.value = URL_PARAM.id;

        var btn = d.createElement("input");
        btn.type = "submit";
        btn.value = "削除";
        btn.setAttribute("onClick", "return window.confirm('この書簡を削除します。よろしいですか？');" );
        frm.appendChild(m);
        frm.appendChild(p);
        frm.appendChild(c);
        frm.appendChild(btn);

        var li = d.createElement("li");
        li.className = "last";
        li.appendChild(frm);
        var menu = $x("//ul[@id=\"statMenu\"]");
        menu.appendChild(li);
    }
    function addDeleteReportButton()
    {
        var frm = d.createElement("form");
        frm.method = "post";
        frm.action = "/report/list.php";
        var m = d.createElement("input");
        m.type = "hidden";
        m.name = "m";
        m.value = URL_PARAM.m;
        var p = d.createElement("input");
        p.type = "hidden";
        p.name = "p";
        p.value = URL_PARAM.p;
        var u = d.createElement("input");
        u.type = "hidden";
        u.name = "u";
        u.value = URL_PARAM.u;
        var c = d.createElement("input");
        c.type = "hidden";
        c.name = "chk[]";
        c.value = URL_PARAM.id;

        var btn = d.createElement("input");
        btn.type = "submit";
        btn.name = "remove_checked";
        btn.value = "削除";
        btn.setAttribute("onClick", "return window.confirm('この報告書を削除します。よろしいですか？');" );
        frm.appendChild(m);
        frm.appendChild(p);
        frm.appendChild(c);
        frm.appendChild(u);
        frm.appendChild(btn);
  //      GM_log("a");
        var h2 = $x("//h2");
        h2.parentNode.insertBefore(frm, h2.nextSibling);
    }

}

//////////////////////
//出発時刻計算
//////////////////////
function disp_TSendTime()
{
    if( location.pathname != "/facility/castle_send_troop.php" ) return;

    var td = $x('//table[@class="fighting_about"]//tr[1]/td[1]');
    if( !td ) return ;

    var tim = td.textContent.match(/到着まで[:|：][\s|　]*(\d+):(\d+):(\d+)[\s|　]*到達時間/);
    if( !tim ) return;

    var area_up_timer = $("area_up_timer0");
    if( !area_up_timer ) return;
    var day = area_up_timer.textContent.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
    if( !day ) return;

    //ベース作成
    var div = d.createElement("div");
    div.style.margin = "5px";
    div.appendChild(d.createTextNode("到着時刻："));
    createText(div, "beyond_send_y", day[1]);
    div.appendChild(d.createTextNode("-"));
    createText(div, "beyond_send_m", day[2]);
    div.appendChild(d.createTextNode("-"));
    createText(div, "beyond_send_d", day[3]);
    div.appendChild(d.createTextNode("　"));
    createText(div, "beyond_send_h", "");
    div.appendChild(d.createTextNode(":"));
    createText(div, "beyond_send_mi", "");
    div.appendChild(d.createTextNode(":"));
    createText(div, "beyond_send_s", "");
    div.appendChild(d.createTextNode("　"));
    var btn = d.createElement("input");
    btn.type = "button";
    btn.id = "beyond_send_button";
    btn.value = "出発時刻計算";
    div.appendChild(btn);

    div.appendChild(d.createElement("br"));
    div.appendChild(d.createTextNode("出発時刻："));

    var spn = d.createElement("span");
    spn.id = "beyond_send_time";
    div.appendChild(spn);

    td.appendChild(div);

    $e(btn, "click", function() {
        if( $("beyond_send_y").value == "" ) $("beyond_send_y").value = "0";
        if( $("beyond_send_m").value == "" ) $("beyond_send_m").value = "0";
        if( $("beyond_send_d").value == "" ) $("beyond_send_d").value = "0";
        if( $("beyond_send_h").value == "" ) $("beyond_send_h").value = "0";
        if( $("beyond_send_mi").value == "" ) $("beyond_send_mi").value = "0";
        if( $("beyond_send_s").value == "" ) $("beyond_send_s").value = "0";
        var y = $("beyond_send_y").value;
        var m = $("beyond_send_m").value;
        var d = $("beyond_send_d").value;
        var h = $("beyond_send_h").value;
        var mi =$("beyond_send_mi").value;
        var s = $("beyond_send_s").value;
//      if( !y || !m || !d || !h || !mi || !s ) {
//          alert("全て入力して下さい");
//          return;
//      }
        y = parseInt(y, 10);
        m = parseInt(m, 10);
        d = parseInt(d, 10);
        h = parseInt(h, 10);
        mi =parseInt(mi, 10);
        s = parseInt(s, 10);
        if( isNaN(""+y) || isNaN(""+m) || isNaN(""+d) || isNaN(""+h) || isNaN(""+mi) || isNaN(""+s) ) {
            alert("数字で入力して下さい");
            return;
        }



        var dt = new Date(y, m - 1, d, h - parseInt(tim[1],10) , mi - parseInt(tim[2],10), s - parseInt(tim[3],10) );

        $("beyond_send_time").innerHTML =
            dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " +
            (dt.getHours()+100).toString().substr(-2)  + ":" +
            (dt.getMinutes()+100).toString().substr(-2)  + ":" +
            (dt.getSeconds()+100).toString().substr(-2);




    } );

    function createText(container, id, def)
    {
        var tb = d.createElement("input");
        tb.type = "text";
        tb.value = def;
        tb.id = id;
        tb.size = 3;
        container.appendChild(tb);
    }

}
//////////////////////
//小さいボタン
//////////////////////
function disp_SmallButton()
{

    var btnConfs = {
            btn_buycp : {
                width : 26,
                start : -8
            },
            btn_special : {
                width : 26,
                start : -29
            },
            btn_getbusho : {
                width : 20,
                start : -2
            },
            btn_yorodudas : {
                width : 25,
                start : -2
            },
            btn_bushoduel : {
                width : 27,
                start : -1
            },
            btn_cpdeposit : {
                width : 20,
                start : -20
            },
            btn_invitefriend : {
                width : 27,
                start : -9
            }
    };

    if (isNarrow) {
        btnConfs.btn_buycp.start = -6;
        btnConfs.btn_special.start = -26;
    }

    var btnImages = $a('(id("sidebar")/ul/li | id("btn_area_box"))//img');

    for (var i =0; i < btnImages.length;i++) {
        var btnImage = btnImages[i];
        for (var key in btnConfs) {
            if (btnImage.src.indexOf(key) < 0) {
                continue;
            }
            var btnConf = btnConfs[key];
            var btn = btnImage.parentNode;
            var btnHeight = 22;
            if (isNarrow) btnHeight = 25;
            btnImage.style.display = "none";

            btn.style.width = btnConf.width+"px";
            btn.style.height = btnHeight+"px";
            btn.style.marginLeft = "2px";
            btn.style.marginBottom = "2px";
            btn.style.background = 'url("'+btnImage.src+'") no-repeat '+btnConf.start+'px 0px';
            btn.style.display = "block";

            var floatNode = btn;
            if (!isNarrow) floatNode = btn.parentNode;

            floatNode.style.cssFloat = "left";

            if (i == 0) {
                btn.style.marginLeft = "0px";
            }
        }
    }

    if (!isNarrow) cgetElementSibling(floatNode.parentNode,0).style.clear = "both";



    //状況の縮小
    var tr = $x('//table[@class="situationTable"]//tr[1]');
    var tds = $a('//table[@class="situationTable"]//tr[2]//img[not(contains(@src,"sit_blank"))]/ancestor::td');
    if( tr && tds ) {
        for( var i=0; i< tds.length ; i++) {
            tr.appendChild(tds[i]);
        }

        cgetElementSibling(tr,0).style.display = "none";

        var imgs = $a(".//img", tr);
        for( var i=0; i< imgs.length ; i++) {
            imgs[i].style.width = "20px";
            imgs[i].style.height = "20px";
            if( !imgs[i].src.match(/(_no\.gif)$/) ) {
                Pika_elementQueue.push(imgs[i]);
            }
        }
    }

    //拠点・生産・簡易出兵先の伸縮
    var targetNames = ["base","production","easydeploy"];
    var targets = {
            base : {
                img : '(id("lodgment") | id("sidebar"))//img[contains(@src,"icon_base")]',
                inner : 'ancestor::div[contains(@class,"Head")]/following-sibling::div[contains(@class,"Inner")]'
            },
            production : {
                img : 'id("sidebar")//img[contains(@src,"icon_production")]',
                inner : 'ancestor::div[contains(@class,"Head")]/following-sibling::div[contains(@class,"Inner")]'
            },
            easydeploy : {
                img : '(//div[@class="footer_box"] | id("sidebar"))//img[contains(@src,"icon_easydeploy")]',
                inner : 'ancestor::div[contains(@class,"Head")]/following-sibling::div[contains(@class,"Inner")] | id("map_bookmark")'
            }
    };
    for(var i = 0;i < targetNames.length;i++) {
        if (isNarrow && targetNames[i] == 'base' && location.pathname.search(/^\/(village|map|land)\.php/) < 0) {
            continue;
        }

        var target = targets[targetNames[i]];

        var base_img = $x(target.img);
        if( !base_img ) continue;

        var base_inner = $x(target.inner, base_img);
        if( !base_inner ) continue;

        var oc = cloadData( "sidebox_oc" + i , "", true);
        if( oc ) {
            base_inner.style.display = "none";
            base_img.style.opacity = 0.3;
        }
        (function(inner, no) {
            $e(base_img, "click", function(e) {
                var ocs = "";
                if( inner.style.display == "none" ){
                    inner.style.display = "";
                    this.style.opacity = 1;
                }else{
                    inner.style.display = "none";
                    this.style.opacity = 0.3;
                    ocs = "1";
                }
                csaveData( "sidebox_oc" + no , ocs, true);
            });
        })(base_inner, i);
    }

}

//////////////////////
//出兵マップ表示
//////////////////////
function disp_AttackMap()
{
    var img_atk = 'data:image/gif;base64,'+
            'R0lGODlhPAA8AIAAAP/M/////yH5BAUUAAEALAAAAAA8ADwAAAJ7jI+py+0Po5y02ouz3rz7D4bi'+
            'SJbmiabqyrbuC8fyTNf2jef6zvc8AATsgsEckYg7Fm9KoPE4XCakMCeDqmpCoSxt0yBsWQNj6bgb'+
            'dmJl6jUN+RSe3+V59ayMYZdwevjQd/c3ZbfiRlaYlXiYcsglFugjOUlZaXmJWVEAADs=';
    var img_mov = 'data:image/gif;base64,'+
            'R0lGODlhPAA8AIAAADP//////yH5BAUUAAEALAAAAAA8ADwAAAJ7jI+py+0Po5y02ouz3rz7D4bi'+
            'SJbmiabqyrbuC8fyTNf2jef6zvc8AATsgsEckYg7Fm9KoPE4XCakMCeDqmpCoSxt0yBsWQNj6bgb'+
            'dmJl6jUN+RSe3+V59ayMYZdwevjQd/c3ZbfiRlaYlXiYcsglFugjOUlZaXmJWVEAADs=';
    if( location.pathname == "/facility/unit_status.php" ) {
        var tds = $a("//table[@summary=\"出撃中の兵士\" or @summary=\"移動中の兵士\"]/tbody/tr[position()>1]/td[1]");

        for(var i=0; i<tds.length ; i+=3) {
            //0：場所　1：時間　２：兵種
//            GM_log(tds[i+0].textContent);
            var xy = tds[i+0].innerHTML.match(/[\(|（](-?\d+),(-?\d+)[）|\)]$/);
            if( !xy ) continue;
            var tim = tds[i+1].innerHTML.match(/(\d+\-\d+\-\d+ \d+:\d+:\d+)/);
            if( !tim ) continue;
            var kind = 0;
            if( tds[i].parentNode.parentNode.parentNode.getAttribute("summary") == "移動中の兵士" )
                kind = 1;
            addList(tim[1], parseInt(xy[1],10), parseInt(xy[2],10), kind );

            var a = $x("descendant::div/a[contains(text(), \"キャンセルする\")]", tds[i+1]);
            if( a ) {
                (function(tim, x, y) {
                    $e(a, "click", function(){
                        var lists = cloadData("AttackList", "[]", true, true);
                        for(var i=0 ; i<lists.length ; i++) {
                            if( lists[i].x == x && lists[i].y == y && lists[i].time == tim ) {
                                lists.splice(i,1);
                                csaveData( "AttackList", lists, true, true );
              //                  GM_log("deleted");
                                break;
                            }
                        }
                    } );
                })(tim[1], parseInt(xy[1],10), parseInt(xy[2],10));
            }
        }
        return;
    }

    var lists = cloadData("AttackList", "[]", true, true);
    lists = checkList(lists);       //時間を過ぎたものを削除

    if( location.pathname == "/map.php" ) {
        //地図に表示
        var type = 1;
        if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ) type=2;
        else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ) type=3;

        if( lists.length ) {
            var cx = parseInt(URL_PARAM.x,10);
            var cy = parseInt(URL_PARAM.y,10);
            if( cx > MAP_X_MAX ) cx = MAP_X_MAX;
            if( cx < MAP_X_MIN ) cx = MAP_X_MIN;
            if( cy > MAP_Y_MAX ) cy = MAP_Y_MAX;
            if( cy < MAP_Y_MIN ) cy = MAP_Y_MIN;

            var map = $x("//div[@id=\"mapsAll\"]");
            for(var i=0 ; i<lists.length ; i++) {
                var no = cgetMapNofromXY(lists[i].x, lists[i].y, cx, cy, type );
                if( !no ) continue;
                var img = document.createElement("img");
                img.className = "mapAll" + no;
                if( lists[i].kind == 1 ) {
                    img.src = img_mov;
                }else{
                    img.src = img_atk;
                }
                img.title = lists[i].time;
//              img.style.zIndex = 1000;

                map.appendChild(img);

                var area = $x("//map[@id=\"mapOverlayMap\"]/area[contains(@href, \"?x=" + lists[i].x + "&y=" + lists[i].y + "\")]");
                if( area ){
                    area.title += "　到着予定:" + lists[i].time;
                    area.alt += "　到着予定:" + lists[i].time;
                }

            }
        }
    }


    function addList(tim, x, y, kind)
    {
        var lists = cloadData("AttackList", "[]", true, true);

        var i;
        for(i=0 ; i<lists.length ; i++) {
            if(lists[i].x == x && lists[i].y == y ) {
                if( lists[i].time < tim ) {
                    lists[i].time = tim;
                    lists[i].kind = kind;
                    break;
                }else{
                    return;
                }
            }
        }
        if( i == lists.length ) {
            lists.push({"x":x, "y":y, "time":tim, "kind":kind } );
        }
        csaveData( "AttackList", lists, true, true );
    }

    function checkList(lists)
    {
        var dt = new Date();
        var ntime = dt.getFullYear() + "-" +
                    (dt.getMonth()+101).toString().substr(-2) + "-" +
                    (dt.getDate()+100).toString().substr(-2) + " " +
                    (dt.getHours()+100).toString().substr(-2)  + ":" +
                    (dt.getMinutes()+100).toString().substr(-2)  + ":" +
                    (dt.getSeconds()+100).toString().substr(-2);
        var deleted = false;
        for(var i=0 ; i<lists.length ; i++) {
            if( lists[i].time < ntime ) {
                lists.splice(i,1);
                i--;
                deleted = true;
            }
        }
        if( deleted ) {
            if( lists.length ) {
                csaveData( "AttackList", lists, true, true );
            } else {
                cdelData("AttackList", true );
            }
        }
        return lists;
    }
}

//////////////////////
//同一カード合成ボタン
//////////////////////
function disp_CardCombine()
{
    if( location.pathname != "/union/result_lv.php" &&
        location.pathname != "/union/result_learn.php" &&
        location.pathname != "/union/result_remove.php") {
        return;
    }

    var ins = $a("//div[@class=\"back\"]")[1];
    var skill2 = $x("//div[@class=\"skill2\"]");
    var skill3 = $x("//div[@class=\"skill3\"]");

    var div1 = d.createElement("div");
    div1.className = "cardColmn";
    div1.align = "center";
    var div2 = d.createElement("div");
    div2.className = "control";
    div1.appendChild(div2);

    var a = d.createElement("a");
    a.href = caddSessionId("lvup.php?cid=" + URL_PARAM.cid);
    a.title = "スキルLvを上げる";
    a.className = "skillLvUp";
    a.appendChild(d.createTextNode("スキルLvを上げる"));
    div2.appendChild(a);

    if( !skill3 ) {
        a = d.createElement("a");
        a.href = caddSessionId("learn.php?cid=" + URL_PARAM.cid);
        a.title = "新しいスキルを習得する";
        a.className = "skillLearn";
        a.appendChild(d.createTextNode("新しいスキルを習得する"));
        div2.appendChild(a);
    }
    if( skill2 ) {
        a = d.createElement("a");
        a.href = caddSessionId("remove.php?cid=" + URL_PARAM.cid);
        a.title = "スキルを削除する";
        a.className = "skillDelete";
        a.appendChild(d.createTextNode("スキルを削除する"));
        div2.appendChild(a);
    }

    ins.parentNode.insertBefore(div1, ins.nextSibling);
}

//////////////////////
//ヨロズダス表示
//////////////////////
function disp_PikaYorozu()
{
    if( location.pathname == "/busyodas/b3kuji.php" ) {
        Pika_updateYorozudasState();
    }
    if( location.pathname == "/busyodas/b3kuji_result.php") {
        Pika_updateYorozudasState2();
    }

    Pika_displayYorozudasState();
}

//////////////////////
//HP回復時間表示
//////////////////////
function disp_PikaHPRestTime()
{
    if(location.pathname != "/card/deck.php") return ;

    Pika_displayRecoveryEstimates();

}

//////////////////////
//拠点生産量表示
//////////////////////
function disp_SuzanSeisan()
{
    var icon = IMG_DIR  + "common/sidebar/icon_production.gif";
    var elms = ccreateSideBox("beyond_sidebox_suzanseisan", icon, "拠点生産");

    if(location.pathname == "/village.php") {
        Suzan_Seisan(elms.sideBoxInner);
    }

}


/////////////////////////////////////////////////////////////////////////////
//common functions
/////////////////////////////////////////////////////////////////////////////
function cgetCurrentBaseName()
{
    var xy = cgetCurrentBaseXY();
    return VILLAGES_INFO[(xy.x+"_"+xy.y).replace(/-/g,"m")].basename;
}

function cgetCurrentBaseXY()
{
    var nowLoc = $x('id("gnavi")//a[contains(@href,"map.php")]');
    if (!nowLoc) return null;

    var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
    if( xy ) {
        return {'x':parseInt(xy[1], 10), 'y':parseInt(xy[2], 10)};
    }
}

function cgetDistanceFromBase(x, y)
{
    if( BASE_X == -9999 ) {
        var xy = cgetCurrentBaseXY();
        if( xy ) {
            BASE_X = xy.x;
            BASE_Y = xy.y;
        }
    }
    if( BASE_X != -9999 ) {
        var a = parseInt(x, 10);
        var b = parseInt(y, 10);
        return Math.sqrt(Math.pow(BASE_X - a, 2) + Math.pow(BASE_Y - b, 2));
    }
    return -1;
}

function cupdateCurrentResources()
{
    var nowNodes = PRE_LOAD_NODES['nowResources'];
    RES_NOW["wood"] = parseInt( nowNodes["wood"].innerHTML, 10 );
    RES_NOW["stone"] = parseInt( nowNodes["stone"].innerHTML, 10 );
    RES_NOW["iron"] = parseInt( nowNodes["iron"].innerHTML, 10 );
    RES_NOW["rice"] = parseInt( nowNodes["rice"].innerHTML, 10 );
}

function cgetNow()
{
    var stimeText = PRE_LOAD_NODES['serverTime'].innerHTML;
    var now = new Date();
    var nowTimeAry = stimeText.replace(/^\s*|\s*$/,'').split(":");
    now.setHours(parseInt(nowTimeAry[0],10),parseInt(nowTimeAry[1],10),parseInt(nowTimeAry[2],10));
    return now;
}

function caddDate(baseDate, timetxt)
{
    var tim = timetxt.match(/^(\d+):(\d+):(\d+)/);
    if( !tim ) return "";

    var dt = new Date(baseDate.getFullYear(),
                      baseDate.getMonth(),
                      baseDate.getDate(),
                      baseDate.getHours() + parseInt(tim[1],10),
                      baseDate.getMinutes() + parseInt(tim[2],10),
                      baseDate.getSeconds() + parseInt(tim[3],10) );

    return dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " +
            (dt.getHours()+100).toString().substr(-2)  + ":" +
            (dt.getMinutes()+100).toString().substr(-2)  + ":" +
            (dt.getSeconds()+100).toString().substr(-2);
}

//状態保存用のクッキー
function csetCookie(key, data)
{
    sday = new Date();
    sday.setTime(sday.getTime() + (120 * 1000 * 60 * 60 * 24));
    d.cookie = key + "=" + escape(data) + ";expires=" + sday.toGMTString() + "; path=/";
}

function cgetCookie(key)
{
    var data = "";
    var start = d.cookie.indexOf(key + "=");
    if (start != -1){
        var end = d.cookie.indexOf(";", start);
        data = unescape(d.cookie.substring(start + key.length + 1, end));
    }
    return data;
}
function cdelCookie(key)
{
    d.cookie = key + "=;expires=Thu,01-Jan-70 00:00:01 GMT; path=/";
}

function csetUserXY(aid, uid, x, y)
{
    var allylists = cloadData( "allyXYAllyList", "[]", true, true );

    if( allylists.indexOf(aid) == -1 ) {
        allylists.push(aid);
        csaveData( "allyXYAllyList", allylists, true, true );
    }

    var lists = cloadData( "allyXYList" + aid, "[]", true, true );

    for(var i=0 ; i<lists.length ; i++) {
        if( lists[i].id == uid ) {
            return;
        }
    }
    lists.push({"id":uid, "x":x, "y":y});
    csaveData( "allyXYList" + aid, lists, true, true );
}

function cdeleteUserXY(aid)
{
    var allylists = cloadData( "allyXYAllyList", "[]", true, true );

    var idx = allylists.indexOf(aid);
    if( idx != -1 ) {
        allylists.splice(idx,1);
        csaveData( "allyXYAllyList", allylists, true, true );
    }
    cdelData( "allyXYList" + aid, true );


}

function cresetUserXY()
{
    var allylists = cloadData( "allyXYAllyList", "[]", true, true );

    for(var i=0 ; i<allylists.length ; i++) {
        cdelData( "allyXYList" + allylists[i], true );
    }
    cdelData( "allyXYAllyList", true );
}

function cgetXYHtml(x,y)
{
    var img_send = IMG_DIR + "report/icon_go.gif";
    var img_mp = IMG_DIR + "report/icon_scout.gif";
    var m = "";
    var dist = cgetDistanceFromBase(x, y);
    if( dist != -1 ) {
        m = "　距離[" + dist.toFixed(2) + "]";
    }
    var txt = '';
    txt += '<a href="'+caddSessionId('/land.php?x=' + x + '&y=' + y + '#ptop')+'" title="表示" style="color:#0099cc; text-decoration: none;" onmouseover="';
    txt += "this.style.textDecoration='underline';"+'" onmouseout="'+"this.style.textDecoration='none';"+'">' + x + ',' + y + '</a>';
    txt += '<a href="'+caddSessionId('/map.php?x=' + x + '&y=' + y + '#ptop')+'" title="マップ' + x + ',' + y + '"><img src="' + img_mp + '" style="width:12px; height:12px; vertical-align:middle;"></a>';
    txt += '<a href="'+caddSessionId('/facility/castle_send_troop.php?x=' + x + '&y=' + y + '#ptop')+'" title="兵を送る' + x + ',' + y + m + '">';
    txt += '<img src="' + img_send + '" style="width:12px; height:12px; vertical-align:middle;"></a>';

    return txt;
}

function cajaxRequest(url, method, param, func_success, func_fail){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200){
            func_success(req);
        }
        else if (req.readyState == 4 && req.status != 200){
            func_fail(req);
        }
    };

    if (SID) {
        var sdata = method.toLowerCase() == 'get' ? url : param;
        if (sdata.search(/(\?|&)SSID=[^&]+&?/i) < 0) {
           if (method.toLowerCase() == 'get') {
               url += (0 <= url.indexOf('?')) ? '&' : '?';
               url += SID;
           }
           else {
               if (typeof param != 'string') param = '';
               if (0 < param.length) param += '&';
               param += SID;
           }
        }
    }

    req.open(method, url, true);
    if (method == 'POST'){
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    req.send(param);
}
function str2csvstr(str) {
    var csvstr;

    csvstr =  str.replace(/^[\s　]+|[\s　]+$/g, "");
    csvstr = csvstr.replace(/\"/g, "\"\"");

    if (csvstr.indexOf(",") != -1) {
        csvstr = "\"" + csvstr + "\"";
    }

    return csvstr;
}

function cgetElementXY(elm) {
    if( !elm ) return null;

    var xx = 0;
    var yy = 0;
    while(elm){
        xx += elm.offsetLeft;
        yy += elm.offsetTop;
        elm = elm.offsetParent;
    }
    return {"x":xx, "y":yy};
}

function cgetMapNofromXY(x, y, base_x, base_y, type)
{
    if( isNaN(""+base_x) ) base_x = 0;
    if( isNaN(""+base_y) ) base_y = 0;

    //map.php専用のXY座標→mapAll999
    var sc = 11;
    var hosei = 0;
    if( type == 2 ) {
        sc = 15;
    } else if( type == 3 ) {
        sc = 20;
        hosei = 1;
    }
    var hw = Math.floor( (sc - 1) / 2 );
    var no = "";
    if( x >= base_x - hw && x <= base_x - hw + sc - 1 &&
        y >= base_y - hw - hosei && y <= base_y - hw + sc - 1 - hosei  ) {
        no = (x - base_x + hw) * sc + (base_y + hw - y ) + 1;
        if( no < 10 ) no = "0" + no;
        else no = "" + no;
    }
    return no;
}

function ccreateCheckBox(container, id, def, text, title, left )
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "2px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var cb = d.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.value = 1;
    if( def ) cb.checked = true;

    var lb = d.createElement("label");
    lb.htmlFor = id;

    var tx = d.createTextNode(text);
    lb.appendChild( tx );

    dv.appendChild(cb);
    dv.appendChild(lb);
    container.appendChild(dv);
    return cb;
}
function ccreateTextBox(container, id, def, text, title, size, left )
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "2px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var tb = d.createElement("input");
    tb.type = "text";
    tb.id = id;
    tb.value = def;
    tb.size = size;

    var tx = d.createTextNode(text);
    tx.title = title;

    dv.appendChild(tx);
    dv.appendChild(tb);
    container.appendChild(dv);
    return tb;
}

function ccreateComboBox(container, id, sels, def, text, title, left )
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "2px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var sel = d.createElement("select");
    sel.id = id;
    for(var i=0; i<sels.length; i++){
        var opt = d.createElement("option");
        opt.value = sels[i];
        opt.appendChild(d.createTextNode(sels[i]));
        sel.appendChild(opt);
    }
    if( def ) sel.value = def;

    var tx = d.createTextNode(text);
    tx.title = title;

    dv.appendChild(tx);
    dv.appendChild(sel);
    container.appendChild(dv);
    return sel;
}

function ccreateButton(container, text, title, func)
{
    var btn = d.createElement("input");
    btn.style.padding = "1px";
    btn.type = "button";
    btn.value = text;
    btn.title = title;
    container.appendChild(d.createTextNode(" "));
    container.appendChild(btn);
    container.appendChild(d.createTextNode(" "));
    $e(btn, "click", func);
    return btn;
}

function cgetCheckBoxValue(id)
{
    var c = $(id);
    if( !c ) return 0;
    if( !c.checked ) return 0;
    return 1;
}

function cgetTextBoxValue(id)
{
    var c = $(id);
    if( !c ) return "";
    return c.value;
}

function ccreateSideBox(id, img, title)
{
    var icon_box = 'data:image/gif;base64,'+
        'R0lGODlhCwALAJEAAP///zMzM////wAAACH5BAUUAAIALAAAAAALAAsAAAIVjI8Gy6z5AoAyplkh'+
        'xteiTW1NQyUFADs=';

    var conf = cloadData( id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );

    var elm_box = d.createElement("div");
    elm_box.id = id;
    elm_box.className = "sideBox";

    var elm_boxHead = d.createElement("div");
    elm_boxHead.className = "sideBoxHead";
    elm_box.appendChild(elm_boxHead);

    if (isNarrow) {
        elm_box.style.cssFloat = "left";
        elm_box.style.marginLeft = "10px";
    }

    var elm_h3 = d.createElement("h3");

    var elm_strong = d.createElement("strong");

    var elm_img = d.createElement("img");
    elm_img.src = img;
    elm_strong.appendChild(elm_img);
    elm_strong.appendChild(d.createTextNode(title));

    var elm_span=d.createElement("span");
    elm_span.className = "beyond_panel_ctlbox";
    var elm_img_up = d.createElement("img");
    elm_img_up.src= IMG_DIR + "trade/icon_up.gif";
    elm_img_up.title = "パネルを上に";
    elm_img_up.id = id + "up";
    var elm_img_down = d.createElement("img");
    elm_img_down.src= IMG_DIR + "trade/icon_down.gif";
    elm_img_down.title = "パネルを下に";
    elm_img_down.id = id + "down";
    var elm_img_box = d.createElement("img");
    elm_img_box.src= icon_box;
    elm_img_box.title = "フローティング/ドッキングの切り替え";
    elm_span.appendChild(elm_img_up);
    elm_span.appendChild(elm_img_box);
    elm_span.appendChild(elm_img_down);

    elm_strong.appendChild(elm_span);
    elm_h3.appendChild(elm_strong);
    elm_boxHead.appendChild(elm_h3);

    var elm_boxInner = d.createElement("div");
    elm_boxInner.className = "sideBoxInner";
    if( !conf.open ) {
        elm_boxInner.style.display = "none";
        elm_img.style.opacity = 0.3;
    }
    elm_box.appendChild(elm_boxInner);

    $e(elm_img, "click", function(){
        var sidebox = $(id);
        var op = false;
        if( !sidebox ) return;
        var inner = $x('.//div[contains(@class,"sideBoxInner")]', sidebox);
        if( !inner ) return;
        if( inner.style.display == "none" ){
            inner.style.display = "";
            this.style.opacity = 1;
            op = true;
        }else{
            inner.style.display = "none";
            this.style.opacity = 0.3;
        }

        var conf = cloadData( id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );
        conf.open = op;
        csaveData( id + "conf", conf, true, true );
    } );

    $e(elm_img_up, "click", function(){
        var sidebox = $(id);
        if( sidebox.parentNode.id != "beyond_fixpanel" ) return;
        var target = sidebox.previousSibling;
        if( !target ) return;
        sidebox.parentNode.removeChild(sidebox);
        target.parentNode.insertBefore(sidebox, target);
        crenumberSideBox();
    });

    $e(elm_img_down, "click", function(){
        var sidebox = $(id);
        if( sidebox.parentNode.id != "beyond_fixpanel" ) return;
        var target = sidebox.nextSibling;
        if( !target ) return;
        sidebox.parentNode.removeChild(sidebox);
        target.parentNode.insertBefore(sidebox, target.nextSibling);
        crenumberSideBox();
    });

    $e(elm_img_box, "click", function(){
        var sidebox = $(id);
        if( !sidebox ) return;

        var conf = cloadData( id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );

        if( sidebox.parentNode.id == "beyond_fixpanel" ) {
            if( isNaN(""+conf.x) || conf.x == "" || isNaN(""+conf.y) || conf.y == "" ) {
                var xy = cgetElementXY(sidebox);
                conf.x = xy.x;
                conf.y = xy.y;
            }

            var cx = d.body.clientWidth;
            var cy = d.body.clientHeight;
            var eW = elm_box.clientWidth;
            var eH = elm_box.clientHeight;

            elm_box.style.left = conf.x + "px";
            elm_box.style.top = conf.y + "px";

            if ((conf.x + eW) <= 0) {
                elm_box.style.left = "0px";
            }
            else if (cx <= conf.x ) {
                elm_box.style.left = (cx - eW) + "px";
            }
            if ((conf.y + eH) <= 0) {
                elm_box.style.top = "0px";
            }
            else if (cy <= conf.y) {
                elm_box.style.top = (cy - eH) + "px";
            }

            sidebox.parentNode.removeChild(sidebox);
            $("beyond_floatpanel").appendChild(sidebox);
            sidebox.style.position = "absolute";
            sidebox.style.top = conf.y + "px";
            sidebox.style.left = conf.x + "px";
            sidebox.style.zIndex = 1000;
            conf.float = true;
            $(id + "up").style.display = "none";
            $(id + "down").style.display = "none";
        }else {
            sidebox.parentNode.removeChild(sidebox);
            $("beyond_fixpanel").appendChild(sidebox);
            sidebox.style.position = "";
            sidebox.style.top = "";
            sidebox.style.left = "";
            sidebox.style.backgroundColor = "";
            sidebox.style.border = "";
            sidebox.style.zIndex = "";
            conf.float = false;
            $(id + "up").style.display = "";
            $(id + "down").style.display = "";
            csortSideBox();
        }
        csaveData( id + "conf", conf, true, true );
    } );


    var movedNode = null;
    var currentZIndex = 0;

    $e(elm_boxHead, "mousedown", function(event){
        movedNode = $(id);
        if( movedNode.parentNode.id != "beyond_floatpanel" ) return true;

        g_MD = id;
        g_MX = event.pageX-parseInt(movedNode.style.left,10);
        g_MY = event.pageY-parseInt(movedNode.style.top,10);
        currentZIndex = document.defaultView.getComputedStyle(movedNode, '').zIndex;
        movedNode.style.zIndex = 9999;
        if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
            event.preventDefault();
        }

        conf = cloadData( id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );
    });
    $e(d, "mousemove", function(event){
        if(g_MD != id) return true;
        if( movedNode.parentNode.id != "beyond_floatpanel" ) return true;

        var x = event.pageX - g_MX;
        var y = event.pageY - g_MY;
        movedNode.style.left = x + "px";
        movedNode.style.top = y + "px";

        conf.x = x;
        conf.y = y;

    });
    $e(d, "mouseup", function(event){
        if(g_MD != id) return true;

        g_MD = "";
        movedNode.style.zIndex = currentZIndex;
        movedNode = null;

        csaveData( id + "conf", conf, true, true );
    });


    if( conf.float && !(isNaN(""+conf.x) || isNaN(""+conf.y))) {
        elm_box.style.position = "absolute";
        elm_box.style.zIndex = 1000;
        elm_img_up.style.display = "none";
        elm_img_down.style.display = "none";
        $("beyond_floatpanel").appendChild(elm_box);

        var cx = d.body.clientWidth;
        var cy = d.body.clientHeight;
        var eW = elm_box.clientWidth;
        var eH = elm_box.clientHeight;

        elm_box.style.left = conf.x + "px";
        elm_box.style.top = conf.y + "px";

        if ((conf.x + eW) <= 0) {
            elm_box.style.left = "0px";
        }
        else if (cx <= conf.x ) {
            elm_box.style.left = (cx - eW) + "px";
        }
        if ((conf.y + eH) <= 0) {
            elm_box.style.top = "0px";
        }
        else if (cy <= conf.y) {
            elm_box.style.top = (cy - eH) + "px";
        }

    } else {
        $("beyond_fixpanel").appendChild(elm_box);
    }

    return {"sideBox":elm_box, "sideBoxHead":elm_boxHead, "sideBoxInner":elm_boxInner };

}

function csortSideBox()
{
    var sideboxes = $a("//div[@id=\"beyond_fixpanel\"]/div[@class=\"sideBox\"]");
    var srt = new Array();
    for(var i=0 ; i<sideboxes.length ; i++) {
        var pos = 0;

        var conf = cloadData( sideboxes[i].id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );
        pos = conf.pos;
        srt.push({"node":sideboxes[i], "pos":pos});
    }

    srt.sort( function(a,b) {return a.pos - b.pos;});

    for(var i=0 ; i<srt.length ; i++){
        srt[i].node.parentNode.removeChild(srt[i].node);
    }
    var fixpanel = $("beyond_fixpanel");
    for(var i=0 ; i<srt.length ; i++){
        fixpanel.appendChild(srt[i].node);
    }
}

function crenumberSideBox()
{
    var sideboxes = $a("//div[@id=\"beyond_fixpanel\"]/div[@class=\"sideBox\"]");

    for(var i=0 ; i<sideboxes.length ; i++) {
        var conf = cloadData( sideboxes[i].id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );
        conf.pos = i;
        csaveData( sideboxes[i].id + "conf", conf, true, true );

    }
}

function cappendColumnForProfile(title, id)
{
    var tds = $a('//table[@class="commonTables"]//th[contains(text(),"座標")]/../preceding-sibling::tr/*[contains("tdTDthTH",name())][last()]');
    for(var i=0 ; i<tds.length ; i++) {
        tds[i].colSpan++;
    }

    var tr = $x('//table[@class="commonTables"]//th[contains(text(),"座標")]/..');
    var th = d.createElement("th");
    th.className = "ttl4";
    th.id = id + "_title";
    th.appendChild( d.createTextNode( title ) );
    tr.appendChild( th );

    var trs = $a('//table[@class="commonTables"]//th[contains(text(),"座標")]/../following-sibling::tr');
    for(var i=0 ; i<trs.length ; i++) {
        var xytd = trs[i].childNodes[3];
        if( !xytd ) continue;
        var xy = xytd.innerHTML.match(/([\-0-9]+),([\-0-9]+)/);
        if( !xy ) continue;

        var td = d.createElement("td");
        td.id = id + "_" + xy[1] + "_" + xy[2];
        trs[i].appendChild(td);

        var pstd = trs[i].childNodes[5];
        if( !pstd ) continue;
        if( pstd.innerHTML != "&nbsp;" ) {
            td.textContent = "-";
        }
    }
}

function csetUserStar(uid, x, y, star, wood, stone, iron, rice, npc)
{
    var userlists = cloadData( "UserStarUserList", "[]", true, true );
    if( userlists.indexOf(uid) == -1 ) {
        userlists.push(uid);
        csaveData( "UserStarUserList", userlists, true, true );
    }

    var lists = cloadData( "UserStarList" + uid, "[]", true, true );

    for(var i=0 ; i<lists.length ; i++) {
        if( lists[i].x == x && lists[i].y == y ) {
            return;
        }
    }
    lists.push({"star":star, "x":x, "y":y, "wood":wood, "stone":stone, "iron":iron, "rice":rice, "npc":npc });
    csaveData( "UserStarList" + uid, lists, true, true );
}

function cresetUserStar()
{
    var userlists = cloadData( "UserStarUserList", "[]", true, true );

    for(var i=0 ; i<userlists.length ; i++) {
        cdelData( "UserStarList" + userlists[i], true );
    }
    cdelData( "UserStarUserList", true );
}

function csetMyLevel(x, y, level)
{
    var lists = cloadData( "MyLevelList", "[]", true, true );

    var ins = true;
    for(var i=0 ; i<lists.length ; i++) {
        if( lists[i].x == x && lists[i].y == y ) {
            if( level == -1 ) {
                lists[i].level++;
            }else{
                lists[i].level = level;
            }
            ins = false;
            break;
        }
    }
    if( ins && level != -1) {
        lists.push({"x":x, "y":y, "level":level});
    }
    csaveData( "MyLevelList", lists, true, true );
}
function cdelMyLevel(x, y)
{
    var lists = cloadData( "MyLevelList", "[]", true, true );

    for(var i=0 ; i<lists.length ; i++) {
        if( lists[i].x == x && lists[i].y == y ) {
            lists.splice(i,1);
            csaveData( "MyLevelList", lists, true, true );
            break;
        }
    }
}

function csaveData(key, value, local, ev)
{
    if( local ) key = location.hostname + key;
    if( ev ) {
        if (window.opera || typeof JSON != 'object') {
            value = toJSON(value);
        }
        else {
            value = JSON.stringify( value );
        }
    }
    GM_setValue(key, value );
}

function cloadData(key, value, local, ev)
{
    if( local ) key = location.hostname + key;
    var ret = GM_getValue(key, value);
    return ev ? eval('ret='+ret) : ret;
}

function cdelData(key, local )
{
    if( local ) key = location.hostname + key;
    GM_deleteValue( key );
}

//////////////////////////////////////////////////////////////////
//プレゼンツbｙピカチュウ関数群
//http://shigematsu.org/
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//////////////////////////////////////////////////////////////////
function Pika_blinkElements()
{
    // Drift-free blinking routine
    var opacity = Math.round((new Date() % 1000) / 1000);
    for (var i = 0; i < Pika_elementQueue.length; ++i) {
        Pika_elementQueue[i].style.opacity = opacity;
    }
    window.setTimeout(function() { Pika_blinkElements(); }, 500);
}

function Pika_updateYorozudasState() {
    var x = $a('//div[@class="sysMes"]/strong');
    if( x.length < 3 ) return;

    var nextUpdate = new Date(x[2].textContent.replace(/-/g, '/')).getTime();
    var info = {
        current:    +x[0].textContent,
        nextUpdate: nextUpdate,
        confirm:    nextUpdate - (24 * 60 * 60)
    };
    csaveData('yorozudas_state', info, true, true);
    Pika_displayYorozudasState();

/* 設定メニューでON/OFFできるのでここでON/OFFは必要ないかな
    var button  = d.createElement('input');
    with (button) {
        id      = 'beyond_yorozudas_notification';
        type    = 'checkbox';
        checked = cloadData('yorozudas_notification', false, true);
        addEventListener('click', function() {
            var state = $('beyond_yorozudas_notification').checked;
            csaveData('yorozudas_notification', state, true, true);
            Pika_displayYorozudasState();
        }, false);
    }
    var text    = d.createTextNode(' ヨロズダスの状態を通知する');
    var p       = d.createElement('p');
    var lb      = d.createElement("label");
    lb.htmlFor = button.id;
    lb.appendChild(text);
    with (p) {
        style.backgroundColor = '#aaaaaa';
        appendChild(button);
        appendChild(lb);
    }
    d.getElementsByClassName('sysMes')[0].appendChild(p);
*/
}
function Pika_updateYorozudasState2() { //result用を追加
    var x = $a('//div[@class="sysMes2"]/strong');
    if( x.length < 3 ) return;

    var nextUpdate = new Date(x[1].textContent.replace(/-/g, '/')).getTime();
    var info = {
        current:    +x[0].textContent,
        nextUpdate: nextUpdate,
        confirm:    nextUpdate - (24 * 60 * 60)
    };
    csaveData('yorozudas_state', info, true, true);
    Pika_displayYorozudasState();
}
function Pika_displayYorozudasState() {
    var xpath = '(id("sidebar")/ul/li | id("btn_area_box"))/a[contains(@href, "/busyodas/b3kuji.php")]/img';
    if (OPT_SMALLBTN) {
        xpath += '/..';
    }

    var img_yorozu = $x(xpath);
//設定メニューでON/OFFできるのでここでON/OFFは必要ないかな
//  var enabled = cloadData('yorozudas_notification', false, true);
//  if (enabled) {
        var info = cloadData('yorozudas_state', '{}', true, true);
        var now = new Date().getTime();
        if (info.nextUpdate < now) {
            Pika_elementQueue.push(img_yorozu);
        } else {
            if (info.current <= 0) {
                img_yorozu.style.opacity = 0.5;
            } else {
                if (info.confirm > 0
                 && info.confirm < now) {
                    if (confirm('ヨロズダスが引けますが、まだ引いていません。\n後でまた通知しますか?')) {
                        var delta = (info.nextUpdate - now) / 3600;
                        if (delta < 4) {
                            info.confirm += 1 * 60 * 60; // 1 hour later
                        } else if (delta < 8) {
                            info.confirm += 2 * 60 * 60; // 2 hours later
                        } else {
                            info.confirm += 4 * 60 * 60;
                        }
                    } else {
                        info.confirm = 0;
                    }
                    csaveData('yorozudas_state', info, true, true);
                }
            }
        }
//  } else {
//      img_yorozu.style.opacity = 1;
//  }
}

function Pika_displayRecoveryEstimates() {
    var
    candidates = $a('//*[@id="deck_file"]//*[div[@class="setPlace false"]]');
    for (var i = 0; i < candidates.length; ++i) {
        var level = + $x('*//*[starts-with(@class,"level_")]', candidates[i]).innerHTML;
//      var level = + candidates[i].getElementsByClassName('level')
//                      [0].textContent;
        var hp    = + candidates[i].getElementsByClassName('status_hp')
                        [0].textContent.toString().split(/[\/]/)[0];
        if (hp >= 100) continue;
//          var hours = (level * (100 - hp)) / 60;
        var hours = (level <= 5) ? Math.pow(2, level - 2) * (100 - hp) / 100 :
                        (level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
                            (level + 20) * (100 - hp) / 100;

        var msg  = Pika_formatEstimate(hours, false) + 'にHP全回復';
        candidates[i].getElementsByClassName('setPlace false')[0].innerHTML = msg;
    }

    candidates = $a('//*[@id="deck_file"]//*[div[@class="control"]/dl/dd[contains(text(),"治療中")]]');
     for (var i = 0; i < candidates.length; ++i) {
        var level = + $x('*//*[starts-with(@class,"level_")]', candidates[i]).innerHTML;
//      var level = + candidates[i].getElementsByClassName('level')
//                      [0].textContent;
        var hp    = + candidates[i].getElementsByClassName('status_hp')
                        [0].textContent.toString().split(/[\/]/)[0];
        if (hp >= 100) continue;
//          var hours = (level * (100 - hp)) / 60;
        var hours = (level <= 5) ? Math.pow(2, level - 2) * (100 - hp) / 100 :
                        (level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
                            (level + 20) * (100 - hp) / 100;
        var msg  = Pika_formatEstimate(hours, false) + '<br>にHP全回復';
        candidates[i].getElementsByTagName('dd')[2].innerHTML = msg;
        candidates[i].getElementsByTagName('dd')[2].style.fontSize = "10px";
        candidates[i].getElementsByTagName('dd')[2].style.margin = "0px";
    }

    window.setTimeout(function() { Pika_displayRecoveryEstimates(); }, 60*1000);
}
function Pika_formatEstimate(hours, displaySecs) {
    var msg   = '';
    var now   = new Date();
    var xday  = new Date(now.getTime() + hours * 60 * 60 * 1000);
    var days  = Math.floor(hours / 24);

    var delta = Math.floor(
        (
        new Date(xday.getYear(), xday.getMonth(), xday.getDate()) -
        new Date(now .getYear(), now .getMonth(), now .getDate())
        )
        / (24 * 60 * 60 * 1000));

    if (delta == 0) msg = '';
    else if (delta == 1) msg = '明日';
    else if (delta == 2) msg = '明後日';
    else msg = delta + '日後';

    msg += xday.getHours() + '時';
    msg += xday.getMinutes() + '分 ';

    if (days == 0) {
        var seconds = Math.floor((hours * 3600) % 60);
        var minutes = Math.floor((hours *   60) % 60);
        hours = Math.floor(hours);

        if (hours == 0) {
            if (displaySecs) {
                msg += '(' + minutes + '分' + seconds + '秒後) ';
            }
            else {
                msg += '(' + minutes + '分後) ';
            }
        }
        else {
            msg += '(' + hours+ '時間' + minutes +'分後) ';
        }
    }
    return msg;
}


function Pika_installMapXYHelper()
{
    // http://javascript.g.hatena.ne.jp/emergent/20081122/1227329941
    // https://developer.mozilla.org/ja/XPCNativeWrapper
    // use event listener to set 'onlcick' functon

    if( location.pathname != '/map.php' ) return;

    var btn = $x('//div[@id="mapXY"]//input[@type="submit"]');
    if( !btn ) return;
    btn.addEventListener('click',
            function() {
                var xpath = '//div[@id="mapXY"]//input[@type="text"]';
                var xy = $a(xpath);
                var x  = xy[0].value.toString();

                if (x.match(/(-?\d+)[ .,&、](?:y=)?(-?\d+)/)) {
                    xy[0].value = RegExp.$1;
                    xy[1].value = RegExp.$2;
                }
            }, false);
}

function Pika_installTradeHelper() {

    if( location.pathname != '/card/trade.php' ) return;

    $('button')
        .addEventListener('click',
            function() {
                var element = $x('//div[@class="formSearch"]/select');
                var index = element.selectedIndex;
                if (index == 0 || index == 3) {
                    if ($('k').value.toString().match(/[1-4]\d{3}/)) {
                        element.selectedIndex = 2;
                    }
                }
            }, false);
}


function Pika_prepareForDisplayBuildStatus()
{
    var maps = $('maps');
    var xpath = 'img[contains(@src, "/img_lv0.gif")]/@class';
    var nodes = $a(xpath, maps);
    for (var i = 0; i < nodes.length; ++i) {
        var index = nodes[i].value.toString().substr(-2);
        var xpath = 'img[@class="map' + index +'" and contains(@src, "/facility_10")]';
        var isResourceProducingLot = $a(xpath, maps).length;
        if (!isResourceProducingLot) {
            $x('//img[@class="mapicon'+index+'"]').src =
                'data:image/gif;base64,'+
                'R0lGODlhFwAWAMQfADp1MxYsFzp7NEGdQTp7Nm2bac7dzebu5l6TWkWmRZ69nPL2'+
                '8kWAQLXNszuNO7/UvzV7NWqVZU6PTNrm2Y20i0apRj+WP1LOc0y7TDmDOSAgID+G'+
                'OShRLz9+N////////yH5BAEAAB8ALAAAAAAXABYAAAW74PdxZGmepShyV+u+sMut'+
                'WG3fOD5zVe8niYFQmPD5OBqOZcm0OCQUg4HiaC6RnIx2m4E8PGCPAsLNYDfoNAGx'+
                'OEgKYEYafZ5vCJODYN/wFOx1cwhiAhsCCh4IgEl2G3ANAJEGBwSLWWUMYBQRXwUE'+
                'XARYHaOkh2ELBQKkpKKrowARChQMAK6jrbaRkba3GiO8wKwaviMoHLwlwyofw83D'+
                'rs7Ky9MiqwEB1NnLpNfa3h+j3d/aHeLj2tjfIQA7';
        }
    }
}

function Pika_displayBuildStatus() {

    var xpath = 'id("actionLog")//li/span[@class="buildStatus" and contains(.,"建設")]/a';
    var nodes = $a(xpath);
    var facilities = {};
    for (var i = 0; i < nodes.length; ++i) {
        nodes[i].href.match(/x=(\d+)&y=(\d+)/);
        var x = parseInt(RegExp.$1,10);
        var y = parseInt(RegExp.$2,10);
        var index = (101 + x * 7 + y).toString().substr(-2);
        facilities[index] = index;
    }

    for (var index in facilities) {
        Pika_elementQueue.push(document.getElementsByClassName('map'+index)[0]);
        Pika_elementQueue.push(document.getElementsByClassName('mapicon'+index)[0]);
    }

    var deleting = $x('//*[@id="actionLog"]/ul/li[contains(text(), "削除中")]/span[@class="buildStatus"]/a');
    if (deleting && deleting.href.match(/x=(\d+)&y=(\d+)/)) {
        var x = +RegExp.$1;
        var y = +RegExp.$2;
        var index = (101 + x * 7 + y).toString().substr(-2);
        document.getElementsByClassName('map'+index)[0]
            .style.opacity = 0.5;
        document.getElementsByClassName('mapicon'+index)[0]
            .style.opacity = 0.5;
    }
}
//////////////////////////////////////////////////////////////////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//プレゼンツbｙピカチュウ関数群
//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
//プレゼンツbｙsu-zan関数群
//http://shigematsu.org/
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//////////////////////////////////////////////////////////////////
function Suzan_Seisan(inner)
{

    var yieldList = {
            other : [0,6,14,25,50,80,117,162,214,272,335,404,476,550,626,702],
            rice : [0,6,18,36,72,114,167,231,305,388,479,577,680,786,894,1003]
        };


    var yieldExtends = [
        {
            name : '水車',
            facility : {
                match : '畑',
                data : [0,0.03,0.06,0.09,0.12,0.15,0.18,0.21,0.24,0.27,0.3]
            },
            resource : {
                match : '穀物',
                data : [0,40,60,80,110,140,180,220,270,350,450]
            }
        },
        {
            name : '工場',
            facility : {
                match : '伐採所石切り場製鉄所',
                data : [0,0.03,0.05,0.08,0.1,0.13,0.15,0.18,0.2,0.23,0.25]
            },
            resource : {
                match : '森林岩山鉄鉱山',
                data : [0,55,65,75,95,115,145,185,235,300,380]
            }
        }
    ];

    var seisan = { w:0, s:0, i:0, r:0 };


    for (var i = 0; i < 2;i++) {
        var yieldExtend = yieldExtends[i];
        var yieldExtendArea = $x('//area[starts-with(@alt,"'+yieldExtend.name+'")]');
        if (!yieldExtendArea) {
            continue;
        }
        var yieldExtendAreaInfo = cgetFacilityInfoFromArea(yieldExtendArea);
        var yieldExtendResource = yieldExtend.resource.data[yieldExtendAreaInfo.lv];
        var yieldExtendFacility = yieldExtend.facility.data[yieldExtendAreaInfo.lv];

        var squreaAreas = cgetSquareElementFromArea(yieldExtendArea);
        for (var key in squreaAreas) {
            if (!squreaAreas[key]) {
                continue;
            }
            var squreaArea = squreaAreas[key];
            var squreaAreaInfo = cgetFacilityInfoFromArea(squreaArea);
            var dataKey = nameToDataKey(squreaAreaInfo.name);
            if (0 <= yieldExtend.resource.match.indexOf(squreaAreaInfo.name)) {
                seisan[dataKey] += yieldExtendResource;
            }
            else if (0 <= yieldExtend.facility.match.indexOf(squreaAreaInfo.name)) {
                seisan[dataKey] += Math.ceil(yieldExtendFacility * yieldList[getYieldKeyFromDataKey(dataKey)][squreaAreaInfo.lv]);
            }
        }
    }


    var areas = $a('//area[contains(@alt,"畑") or contains(@alt,"穀") or contains(@alt,"伐") or contains(@alt,"森") or contains(@alt,"石") or contains(@alt,"岩") or contains(@alt,"製") or contains(@alt,"鉱")]');
    for(var i=0; i<areas.length; i++){
        var areaInfo = cgetFacilityInfoFromArea(areas[i]);
        var dataKey = nameToDataKey(areaInfo.name);
        switch(areaInfo.name){
            case '森林':
            case '岩山':
            case '鉄鉱山':
            case '穀物':
                seisan[dataKey] += 10;
                break;
            case '伐採所':
            case '石切り場':
            case '製鉄所':
            case '畑':
                var yieldKey = getYieldKeyFromDataKey(dataKey);
                seisan[dataKey] += yieldList[yieldKey][areaInfo.lv];
                break;
        }
    }

    var text = '<ul>';
    text += '<li><img align="middle" alt="木" src="' + IMG_DIR + 'common/ico_wood2.gif"> 木  ' + seisan.w + '</li>';
    text += '<li><img align="middle" alt="石" src="' + IMG_DIR + 'common/ico_stone2.gif"> 石  ' + seisan.s + '</li>';
    text += '<li><img align="middle" alt="鉄" src="' + IMG_DIR + 'common/ico_iron2.gif"> 鉄  ' + seisan.i + '</li>';
    text += '<li><img align="middle" alt="糧" src="' + IMG_DIR + 'common/ico_lice2.gif"> 糧  ' + seisan.r + '</li>';
    text += '<li>　合計 ' + (seisan.w+seisan.s+seisan.i+seisan.r) +'</li></ul>';
    inner.innerHTML = text;

    function getYieldKeyFromDataKey(dataKey) {
        var ret = 'other';
        if (dataKey == 'r') {
            ret = 'rice';
        }
        return ret;
    }

    function nameToDataKey(name) {
        switch(name){
            case '森林':
            case '伐採所':
                return "w";
            case '岩山':
            case '石切り場':
                return "s";
            case '鉄鉱山':
            case '製鉄所':
                return "i";
            case '穀物':
            case '畑':
                return "r";
        }
    }
}
//////////////////////////////////////////////////////////////////
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//プレゼンツbｙsu-zan関数群
//////////////////////////////////////////////////////////////////


function disp_castleAidLink()
{
    var bases = $a('(id("lodgment")/div[@class="floatInner"] | //div[@class="sideBoxInner basename"])//li/*[@title]');
    if( !bases ) return;

    for( var i=0 ; i < bases.length ; i++) {
        var elem = bases[i];
        var thistitle = elem.title;
        if( !thistitle ) continue;
        var xy = thistitle.match(/\((-?\d+),(-?\d+)\)$/);
        if( !xy ) continue;

        var a_k_img = d.createElement("img");
        a_k_img.style.paddingLeft = "3px";
        a_k_img.src = img_ken;

        var a_k = d.createElement("a");
        a_k.title = "援軍";
        a_k.appendChild(a_k_img);

        if( elem.href ) {
            a_k.href = caddSessionId("/facility/castle_send_troop.php?x="+xy[1]+"&y="+xy[2]+"&radio_move_type=301");
            a_k.style.visibility = 'visible';
        } else {
            a_k.style.visibility = 'hidden';
        }

        var spn = cgetElementSibling(elem,0);
        if (!spn) {
            spn = d.createElement("span");
            elem.parentNode.appendChild(spn);
        }

        spn.appendChild(a_k);
    }
}

function disp_nextFameTimer() {
    var nextDate = new Date(cloadData("NextFameTime",null,true,true));
    var preCheckTime = new Date(cloadData("NextFamePreCheckTime",null,true,true));
    nextDate = loadNextDate();
    var seps = $a('id("status_left")/span[@class="sep"]');
    for (var i = 0; i < seps.length;i++) {
        seps[i].innerHTML = seps[i].innerHTML.replace(/^([\s|\u3000]*)|([\s|\u3000]*)$/g,"");
    }

    var img = $x('id("status_left")/img[@title="名声"]');
    var fameTimer = document.createElement('DIV');
    fameTimer.setAttribute("id","Beyond_nextFameTimer");
    fameTimer.appendChild(createTimerText(getTimeDiffNow(nextDate)));
    fameTimer.style.color = 'lightgreen';
    fameTimer.style.position = 'absolute';
    fameTimer.style.top = (img.offsetTop + 12) + "px";
    fameTimer.style.left = (img.offsetLeft + 10) + "px";

    img.parentNode.appendChild(fameTimer);

    var timerId = setInterval(function(){
        fameTimer.style.top = (img.offsetTop + 12) + "px";
        fameTimer.style.left = (img.offsetLeft + 10) + "px";
        fameTimer.replaceChild(createTimerText(getTimeDiffNow(loadNextDate())), fameTimer.firstChild);
    },1000);

    function createTimerText(date) {
        return document.createTextNode("("+date.toLocaleTimeString().replace(/^0?/,"")+")");
    }
    function getTimeDiffNow(date) {
        var now = cgetNow();
        var oldDate = now, newDate = date;
        if (date.getTime() < now.getTime()) {
            return new Date(1970,1,1,0,0,0);
        }
        return new Date(1970,1,1,0,0,0,newDate.getTime() - oldDate.getTime());
    }

    var nextFameDateCheckErrorCount = 0;
    var nextFameRefreshCount = 0;
    function loadNextDate() {

        var nowDate = new Date();
        var isNextFameDateOver = false;
        if (nextDate.getTime() < nowDate.getTime()) {
            isNextFameDateOver = true;
        }

        var isPreCheckDateOver = false;
        if (preCheckTime.getTime() < (nowDate.getTime() - 1800000)) {
            isPreCheckDateOver = true;
        }

        if (5 < nextFameDateCheckErrorCount) {
            if (isNextFameDateOver) {
                clearInterval(timerId);
            }
            return nextDate;
        }

        if ((isPreCheckDateOver || isNextFameDateOver) && nextFameRefreshCount === 0) {
            nextFameTimeRefresher();
        }

        return nextDate;

        function nextFameTimeRefresher() {
            cajaxRequest("/facility/castle.php" , "GET", "", function(req) {
                var dom = d.createElement("html");
                dom.innerHTML = req.responseText;
                var nextFameNode = $x('.//div[@id="gray02Wrapper"]/table[contains(concat(" ",normalize-space(@class)," ")," commonTables ") and @summary="object"]//td[contains(concat(" ",normalize-space(@class)," ")," center ") and not(@colspan)]/div[not(@class)]',dom);
                if (!nextFameNode) {
                    nextFameDateCheckErrorCount++;
                    return;
                }

                var matches = null;
                if (!(matches = nextFameNode.innerHTML.match(/\d+-\d+-\d+\s\d+:\d+/))) {
                    nextFameDateCheckErrorCount++;
                    return;
                }

                var tmpDate = new Date(matches[0].replace(/-/g,"/")+":00");
                if (isPreCheckDateOver == false && nextDate.getTime() == tmpDate.getTime()) {
                    if (12 <= nextFameRefreshCount) {
                        clearInterval(timerId);
                    }
                    else {
                        nextFameRefreshCount++;
                        setTimeout(nextFameRefresher,5000);
                    }
                    return;
                }
                else if (!(nextDate.getTime() == tmpDate.getTime())) {
                    nextDate = tmpDate;
                    if (cloadData("NextFameTime",null,true,true)) {
                        var fameText = $x('id("status_left")//img[@title="名声"]').nextSibling;
                        matches = fameText.nodeValue.match(/(\d+)[^\d]*(\d+)/);
                        fameText.nodeValue = fameText.nodeValue.replace(/\d+[^\d]*\d+/,(parseInt(matches[1],10)+1) + " / " + (parseInt(matches[2],10)+1));
                    }

                    csaveData("NextFameTime",nextDate.toString(),true,true);
                }

                nextFameRefreshCount = 0;
                preCheckTime = new Date();
                csaveData("NextFamePreCheckTime",preCheckTime.toString(),true,true);
            },
            function() {
                nextFameDateCheckErrorCount++;
            });
        }
    }
}

function disp_timerLinkDepot() {
    var timerIcon = 'data:image/gif;base64,'+
                'R0lGODlhEAAQANUAACAcHfDx8enp6oCAg8jJyoSGiZCSlNDR0YuNkGlrbXh5e46Qkh8aG+Dg4Xx9'+
                'gIiKjDMwMfj5+XBxc9jZ2ZiYmWFhY1hYWrO0tMXFxt/g4ENCRHV2efjq6Li5up6eoKKjpPf4+CUh'+
                'InJXV1FOTyMfIU5MTTg0NUE+Pzs4OTMvMEpHSCgkJUhFRtHGxc7HyLe4ub/AwefX1tjT09bJyOHY'+
                '2Kumpu7x8W5vcV5eYGdoaoeJjL+cm/rw7/bn5QAAAAAAACH5BAEAAD4ALAAAAAAQABAAAAawwMLg'+
                'gVgsDEaD0oAYWgrEpmMwmBYRj0piINwYMAQXwaMY6AqSikIhuRwatFmgQVA4HDmcJEERBAI8HBEB'+
                'ES83GxUWCRIEGIQcPSARDQcFCRYQGgV+DTAtMX8BAh8aEAAABQR+HiI7Nn8HHyGnDAoCAhcDNTKh'+
                'AhSnAAwjEx0HAiChExMJDMArFBm3vbimwAAoHdECDQIHBCXWwBADBN4HBifh4SksKiYk6uoMzfH1'+
                '8UEAOw==';
    var sidboxId = 'beyond_sidebox_timerOpenLinkconf';
    var timeId = null;

    timeId = setInterval(function(){
        var doc = $x('id("timerOpenLink")/..');
        if (!doc) return;

        clearInterval(timeId);
        doc.style.display = 'none';

        var img = $x('.//img',doc);
        if (img) {
            timerIcon = img.src;
        }

        var box = ccreateSideBox(sidboxId,timerIcon,"タイマーボタン");
        var adoc = d.createElement("a");
        adoc.href = "javascript:void(0);";
        adoc.innerHTML = "タイマー表示";
        adoc.addEventListener("click", function() {
            var doc = $x('id("timerOpenLink")');
            if (!doc) return;
            var event = d.createEvent( "MouseEvents" );
            event.initEvent( "click", false, true );
            doc.dispatchEvent( event );
        }, true);
        box.sideBoxInner.appendChild(adoc);

        var conf = cloadData( sidboxId + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );
        cinsertSideBox(conf.pos,box);
    },100);

    setTimeout(function(){clearInterval(timeId);},500);
}

function disp_villageListBox() {
    if (0 <= location.pathname.search(/^\/(village|map|land)\.php/)) {
        return;
    }

    var isOpen = cloadData('sidebox_oc0', false,true) ? false : true;
    var sidBoxId = 'beyond_sidebox_villageListBox';
    var conf = cloadData( sidBoxId+'conf' , "null", true, true );

    if (!OPT_SMALLBTN) {
        isOpen = (conf == null) ? true : conf.open;
    }

    if (conf != null && typeof conf == 'object') {
        conf.open = isOpen;
        csaveData(sidBoxId+'conf',conf,true,true);
    }

    var box = ccreateSideBox(sidBoxId,IMG_DIR+'common/sidebar/icon_base.gif',"拠点");
    box.sideBoxInner.className += " basename";
    var ul = d.createElement("ul");
    box.sideBoxInner.appendChild(ul);

    var boxImage = $x('.//img[contains(@src,"icon_base")]', box.sideBoxHead);
    $e(boxImage,'click',function(){
        var saveData = isOpen ? "1" : "";
        isOpen = !isOpen;
        csaveData('sidebox_oc0', saveData,true);
    });

    var cvid = cgetCurrentVillageId();
    for (var key in VILLAGES_INFO) {
        var village = VILLAGES_INFO[key];
        var li = d.createElement("li");
        li.style.paddingBottom = "0px";
        ul.appendChild(li);

        var item;
        if (village.vid == cvid) {
            li.className = "on";
            item = d.createElement("span");

        }
        else {
            item = d.createElement("a");
            item.href = caddSessionId('/village_change.php?village_id='+village.vid+'&from=menu&page=' + encodeURIComponent(location.pathname + location.search));
        }

        li.appendChild(item);
        item.title = village.basename + " ("+village.x+","+village.y+")";
        item.appendChild(d.createTextNode(village.basename));
    }
}





// 初期化拡張
function initVillages() {
    if (0 <= location.pathname.search(/^\/(village|map|land)\.php/)) {
        _villageInit();
        return;
    }
    else if (location.pathname == "/user/" && $("statMenu")) {
        _profileInit();
        return;
    }

    VILLAGES_INFO = cloadData("villagesInfo","{}",true,true);

    function _villageInit() {
        var villages = $a('(id("lodgment")/div[@class="floatInner"] | //div[@class="sideBoxInner basename"])//li/*[@title]');

        var compList = new Object();

        var reg = new RegExp(/^([^ ]+) \((-?\d+),(-?\d+)\)$/);
        var matches = null;
        var noVids = new Array();

        for (var i=0;i < villages.length;i++) {
            var village = villages[i];
            var addObj = new Object();
            if ((matches = village.title.match(reg))) {
                addObj.basename = matches[1];
                addObj.x = parseInt(matches[2],10);
                addObj.y = parseInt(matches[3],10);
            }

            if (typeof village.href == 'string' && (matches = village.href.match(/village_id=(\d+)/))) {
                addObj.vid = parseInt(matches[1],10);
            }
            else {
                var viDoc = $x('//input[@name="village_id"]');
                if (viDoc) {
                    addObj.vid = parseInt(viDoc.value,10);
                }
                else {
                    noVids.push(addObj);
                }
            }
            compList[(addObj.x+"_"+addObj.y).replace(/-/g,"m")] = addObj;
        }

        _compData(compList);


        if (0 < noVids.length) {
            cajaxRequest("/user/" , "GET", "", function(req) {
                var dom = d.createElement("html");
                dom.innerHTML = req.responseText;
                for (var i = 0;i < noVids.length;i++) {
                    var td = $x('.//td[text()="'+noVids[i].x+","+noVids[i].y+'"]',dom);
                    var linkTd = cgetElementSibling(td,1);
                    var link = $x('.//a',linkTd);
                    if ((matches = link.href.match(/village_id=(\d+)/))) {
                        VILLAGES_INFO[(noVids[i].x+"_"+noVids[i].y).replace(/-/g,"m")].vid = parseInt(matches[1],10);
                    }
                }

                csaveData("villagesInfo",VILLAGES_INFO,true,true);
            });
        }
    }

    function _profileInit() {
        var compList = new Object();
        var matches = null;
        var villageLinks = $a('//table[@class="commonTables"]//th[contains(text(),"座標")]/../following-sibling::tr[position() <= 10]/td[not(@*) and 1 <= normalize-space(text())]/..//a');
        for (var i = 0;i < villageLinks.length;i++) {
            var villageLink = villageLinks[i];

            var addObj = new Object();
            var loc = cgetElementSibling(villageLink.parentNode,0);
            if ((matches = loc.innerHTML.match(/(-?\d+),(-?\d+)/))) {
                addObj.x = parseInt(matches[1],10);
                addObj.y = parseInt(matches[2],10);
            }

            if ((matches = villageLink.href.match(/village_id=(\d+)/))) {
                addObj.vid = parseInt(matches[1],10);
            }
            addObj.basename = villageLink.innerHTML.replace(/^\s*|\s*$/g,"");
            compList[(addObj.x+"_"+addObj.y).replace(/-/g,"m")] = addObj;
        }

        _compData(compList);
    }

    function _compData(compList) {
        var nowVillageList = cloadData("villagesInfo","{}",true,true);
        for (var key in compList) {
            VILLAGES_INFO[key] = compList[key];
            if (typeof nowVillageList[key] == 'object') {
                VILLAGES_INFO[key] = nowVillageList[key];
                if (typeof VILLAGES_INFO[key].vid != 'number' && typeof compList[key].vid == 'number') {
                    VILLAGES_INFO[key].vid = compList[key].vid;
                }
                VILLAGES_INFO[key].basename = compList[key].basename;
            }
        }

        csaveData("villagesInfo",VILLAGES_INFO,true,true);
    }
}

function initCastleSend() {
    if( location.pathname != '/facility/castle_send_troop.php' || location.search.indexOf("radio_move_type") < 0) return;

    var radioMoveType = location.search.match(/radio_move_type=(\d+)/)[1];
    var ary = $a('//input[@name="radio_move_type"]');
    var elem;
    for (var i = 0; i < ary.length;i++) {
        elem = ary[i];
        if (elem.value == radioMoveType) {
            elem.checked = "checked";
        }
        else {
            elem.checked = "";
        }
    }
}

function initNarrow() {

    if (0 <= location.pathname.search(/^\/(village|map|land)\.php/)) {
        $x('id("lodgment")/div[@class="floatHead"]//a').href = 'javascript:void(0);';
    }
    GM_addStyle(".footer_box { height:auto !important;}");
}

function initPreLoadNode() {
    PRE_LOAD_NODES['nowResources'] = {wood:$('wood'),stone:$('stone'),iron:$('iron'),rice:$('rice')};
    PRE_LOAD_NODES['serverTime'] = $('server_time_disp');
}

function initUrlParams() {
    var matches = location.search.match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/g);

    if (matches) {
        var param;
        var key;
        var data;
        for(var i = 0 ; i < matches.length ; i++) {
            param = matches[i].match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/);
            key = param[1];
            data = param[2];

            URL_PARAM[key] = '';
            if( param.length == 3 && typeof data == 'string') {
                URL_PARAM[key] = decodeURIComponent(data);

                // session id
                if (key.toLowerCase() == 'ssid') {
                    SID = key + '=' +data;
                }
            }
        }
    }
}









// common関数拡張

function cinsertSideBox(insPos,insNode) {
    var sideboxes = $a(".//div[@id=\"beyond_fixpanel\"]/div[@class=\"sideBox\"]");
    var srt = new Array();
    var pos = 0;
    var insNodeId = insNode.sideBox.id;
    for(var i=0 ; i<sideboxes.length ; i++) {
        var conf = cloadData( sideboxes[i].id + "conf" , '{"float":false, "open":true, "x":"", "y":"", "pos":99 }', true, true );
        pos = conf.pos;
        if (insPos <= conf.pos && insNodeId != sideboxes[i].id) {
            pos++;
        }
        else if (insNodeId == sideboxes[i].id) {
            pos = insPos;
        }
        srt.push({"node":sideboxes[i], "pos":pos});
    }

    srt.sort( function(a,b) {return a.pos - b.pos;});

    for(var i=0 ; i<srt.length ; i++){
        srt[i].node.parentNode.removeChild(srt[i].node);
    }
    var fixpanel = $("beyond_fixpanel");
    for(var i=0 ; i<srt.length ; i++){
        fixpanel.appendChild(srt[i].node);
    }
}

function cgetCurrentVillageId() {
    var xy = cgetCurrentBaseXY();
    return VILLAGES_INFO[(xy.x+"_"+xy.y).replace(/-/g,"m")].vid;
}

function chasVillageId(vid) {
    vid = parseInt(vid,10);
    var vids = cgetVillageIds();
    return vids[vid] ? true : false;
}

function cgetVillageIds() {
    var ret = new Object();
    for (var key in VILLAGES_INFO) {
        if (isNaN(""+VILLAGES_INFO[key].vid)) {
            continue;
        }
        ret[VILLAGES_INFO[key].vid] = VILLAGES_INFO[key].vid;
    }
    return ret;
}


// element , pre 1:next0,skipCount
function cgetElementSibling(element,direction,skipCount) {
    var hasElementSibling = (typeof element.nextElementSibling == 'object' || typeof element.previousElementSibling == 'object') ? true : false;
    if (!skipCount) skipCount = 1;
    for (var i = 0;i < skipCount;) {
        if (hasElementSibling) {
            i++;
            if (direction == 1) {
                element = element.previousElementSibling;
            }
            else {
                element = element.nextElementSibling;
            }
        }
        else {
            if (direction == 1) {
                element = element.previousSibling;
            }
            else {
                element = element.nextSibling;
            }
            if (element.nodeType == 1) {
                i++;
            }
        }

        if (element == null) {
            break;
        }
    }
    return element;
}

// areaから四方のareaを取得
function cgetSquareElementFromArea(area) {
    var coords = area.getAttribute('coords');
    var matches = null;
    if (!coords || !(matches = coords.match(/^(\d+),(\d+)/))) return false;
    var base = new Object();
    base.x = parseInt(matches[1],10);
    base.y = parseInt(matches[2],10);

    var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };

    var add = new Object();
    add.x = 50;
    add.y = 25;

    var isMap = false;

    if (0 <= location.pathname.indexOf("map.php")) {
        isMap = true;
        var size = parseInt($x('id("changemapscale")//li[contains(concat(" ",normalize-space(@class)," ")," now ")]').className.match(/sort(\d+) /)[1],10);
        switch (size) {
        case 20:
            add.x = 16;
            add.y = 8;
            break;
        case 15:
            add.x = 22;
            add.y = 11;
            break;
        default:
            add.x = 30;
            add.y = 15;
            break;
        }

        base.y += add.y * 2;
    }

    var xpaths = {ne:calc(base,add,0),nw:calc(base,add,1),se:calc(base,add,2),sw:calc(base,add,3)};

    var ret = new Object();
    for (var key in xpaths) {
        ret[key] = $x('//area[@coords="' + xpaths[key] + '"]');
    }
    return ret;

    // direction ne:0 nw:1 se:2 sw:3
    function calc(base,add,direction) {
        var addX = (direction % 2) == 0 ? add.x : - add.x;
        var addY = direction < 2 ? - add.y : add.y;

        var retBaseX = base.x + addX;
        var retBaseY = base.y + addY;

        var top = [retBaseX, retBaseY - (add.y * 2)];
        var left = [retBaseX - add.x, retBaseY - add.y];
        var bottom = [retBaseX, retBaseY];
        var right = [retBaseX + add.x, retBaseY - add.y];
        var ret = isMap ? top.concat(left,bottom,right) : bottom.concat(left,top,right);
        return ret.join(",");
    }
}

// areaからx,y,name,lvを返す
function cgetFacilityInfoFromArea(area) {
    var retObj = {name:"",lv:0,x:-1,y:-1};
    var matches = null;
    if (area.alt) {
        if ((matches = area.alt.match(/^([^ ]+)[^\d]+(\d+)/))) {
            retObj.name = matches[1];
            retObj.lv = parseInt(matches[2],10);
        }
        else {
            retObj.name = area.alt;
        }
    }

    if (area.href && (matches = area.href.match(/(?:x=(\d+)&y=(\d+))/))) {
        retObj.x = parseInt(matches[1],10);
        retObj.y = parseInt(matches[2],10);
    }

    return retObj;
}

function caddSessionId(url) {
    if (0 < SID.length && url.search(/(\?|&)SSID=[^&]+&?/i) < 0) {
        var anchor = '';
        var matches;
        if ((matches = url.match(/#[^#]+$/))) {
            url = url.substring(0,url.lastIndexOf('#'));
            anchor = matches[0];
        }
        url += 0 <= url.indexOf('?') ? '&' : '?';
        url += SID;
        url += anchor;
    }
    return url;
}


// その他拡張
//JSONとprototype.jsの衝突回避用
function toJSON(obj) {
    switch (typeof obj) {
    case 'string':
        return quote(obj);
    case 'number':
        return isFinite(obj) ? String(obj) : 'null';
    case 'boolean':
    case 'null':
        return String(obj);
    case 'object':
        if (!obj) {
            return 'null';
        }

        if (obj instanceof Date) {
            return isFinite(obj) ? obj.getUTCFullYear() + '-'
                    + complementZero(obj.getUTCMonth() + 1) + '-'
                    + complementZero(obj.getUTCDate()) + 'T'
                    + complementZero(obj.getUTCHours()) + ':'
                    + complementZero(obj.getUTCMinutes()) + ':'
                    + complementZero(obj.getUTCSeconds()) + 'Z' : 'null';
        }

        var partial = new Array();
        var prefix = '{';
        var suffix = '}';
        if (obj instanceof Array) {
            prefix = '[';
            suffix = ']';

            length = obj.length;
            for ( var i = 0; i < length; i++) {
                partial[i] = toJSON(obj[i]) || 'null';
            }
        } else {
            for ( var key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    partial.push(quote(key) + ':'
                            + (toJSON(obj[key]) || 'null'));
                }
            }
        }

        return prefix + partial.join(',') + suffix;
        break;
    default:
        return null;
    }

    function quote(str) {
        var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var meta = { // table of character substitutions
            '\b' : '\\b',
            '\t' : '\\t',
            '\n' : '\\n',
            '\f' : '\\f',
            '\r' : '\\r',
            '"' : '\\"',
            '\\' : '\\\\'
        };

        return escapable.test(str) ? '"'
                + str.replace(escapable,
                        function(a) {
                            var c = meta[a];
                            return typeof c === 'string' ? c : '\\u'
                                    + ('0000' + a.charCodeAt(0).toString(16))
                                            .slice(-4);
                        }) + '"' : '"' + str + '"';
    }

    function complementZero(number) {
        return number < 10 ? '0' + number : number;
    }
}
}) ();
