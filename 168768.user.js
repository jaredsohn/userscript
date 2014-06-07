// ==UserScript==
// @name           3gokushi-Beyond
// @namespace      http://www1.ocn.ne.jp/~hatt/3gkb/
// @description    ブラウザ三国志Beyond ゆ
// @author         hatt, romer, aro, et al.
// @include        http://*.3gokushi.jp/*
// @include        https://*.3gokushi.jp/*
// @icon           http://asunaro.com/en/tools/beyond/icon.png
// @version        1.29.4.27
// @delay 100

// ==/UserScript==

// 2012.01.12 暫定対応(6841行付近)
// 2012.04.27 兵士作成の完了時間、マップ上の兵士到着時間、アイテムショップの小さいボタン

( function() {
    if (document.getElementById('beyond_basepanel')) return ;

    var PROGRAM_NAME = 'ブラウザ三国志Beyond';
    var VERSION = '1.29.1.4';
    var DIST_SRC = 'http://www1.ocn.ne.jp/~hatt/3gkb/';
    var IMG_DIR = '/20110427-01/img/';

    var crossBrowserUtility = initCrossBrowserSupport();

    var d = document;
    var $ = function (id, pd) {return pd ? pd.getElementById(id) : document.getElementById(id);};

    /**
     * $x
     * @description 以前の$a xpathを評価し結果を配列で返す
     * @param {String} xp
     * @param {HTMLElement|HTMLDocument} dc
     * @returns {Array}
     * @throws
     * @function
     */
    var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};

    /**
     * $s
     * @description 以前の$x xpathを評価し1つの結果を返す
     * @param {String} xp
     * @param {HTMLElement|HTMLDocument} dc
     * @returns {Node}
     * @throws
     * @see $x
     * @function
     */
    var $s = function(xp, dc) {return $x(xp, dc).shift();};

    /**
     * $e
     * @param {HTMLElement|HTMLDocument|Window} doc
     * @param {String|Object} event string or event.click=f or event.click=[f, f, f]
     * @param {Function} event handler
     * @param {Boolean} [useCapture=false]
     * @function
     */
    var $e = function(doc, event, func, useCapture) {var eventList = event; var eType = null; var capture = useCapture || false; if (typeof event == 'string') {eventList = new Object(); eventList[event] = new Array(func);} else {for (eType in eventList) {if (typeof eventList[eType] == 'object'&& eventList[eType] instanceof Array) {continue;} eventList[eType] = [ event[eType] ];}} for (eType in eventList) {var eventName = eType; for (var i = 0; i < eventList[eType].length; i++) {doc.addEventListener(eventName, eventList[eType][i], capture);}}};

    var isNarrow = location.host.match(/^(?:[m|y]\d+\.3gokushi)\.jp/i) ? true : false;

    var MAP_X_MIN = -600;
    var MAP_X_MAX = 600;
    var MAP_Y_MIN = -600;
    var MAP_Y_MAX = 600;

    var OPT_VILLAGE = 1;
    var OPT_BASELINK = 1;
    var OPT_BOOKMARK = 1;
    var OPT_BOOKMARK_FONT_SIZE = '10';
    var OPT_XYLINK = 1;
    var OPT_XYLINK_NK = 0;
    var OPT_LARGEICON = 0;
    var OPT_TTBL = 1;
    var OPT_MEMO = 0;
    var OPT_MEMO_FONT_SIZE = '10';
    var OPT_MEMO_WIDTH = '20';
    var OPT_MEMO_HEIGHT = '5';
    var OPT_MEMO_COUNT = '1';

    var OPT_DETAILS = 1;
    var OPT_DETAILS_UP = 0;
    var OPT_DECK = 1;
    var OPT_DECK_SET = 1;

    var OPT_CTIME_B = 1;
    var OPT_CTIME_U = 1;

    var OPT_ALLY = 1;
    var OPT_ALLY_IS = 1;
    var OPT_ALLY_XY = 1;
    var OPT_ALLY_CSV = 0;

    var OPT_RES_T = 0;
    var OPT_RES_TIME = 1;
    var OPT_REMOVELIST = 1;
    var OPT_MAPLIST = 0;

    var OPT_TTDISTANCE = 0;
    var OPT_TTDISTANCE_ITEMS = new Array();

    var OPT_TTALLYPRSN = 1;

    var OPT_USER_STAR = 1;
    var OPT_USER_LEVEL = 1;

    var OPT_MAPCENTER = 1;
    var OPT_TBREST = 1;
    var OPT_DELMSG = 1;
    var OPT_TSENDTIME = 1;
    var OPT_SMALLBTN = 0;
    var OPT_ATTACKMAP = 1;
    var OPT_CARD_CMB = 1;

    var OPT_YOROZU = 0;
    var OPT_HPREST = 1;
    var OPT_MAPHELP = 1;
    var OPT_TRDHELP = 1;
    var OPT_BLINKBLD = 0;

    var OPT_SEISAN = 1;

    var OPT_NO_ALERT = 0;
    var OPT_LOGBOX = 0;
    var OPT_LOGBOX_FONT_SIZE = '9';
    var OPT_LOGBOX_WIDTH = '20';
    var OPT_LOGBOX_HEIGHT = '5';
    var OPT_LOG_EXP_TIME = '30';

    var OPT_CASTLE_AID = 0;
    var OPT_NEXT_FAME = 1;
    var OPT_TIMER_DEPOT = 0;

    if (isNarrow) var OPT_VILLAGE_LIST_BOX = 1;

    var g_MD;
    var g_MX;
    var g_MY;

    var BASE_X = -9999;
    var BASE_Y = -9999;

    var USER_ID = '';
    var ALLY_ID = '';

    var RES_NOW = [];
    var RES_MAX = [];
    var RES_GROW = [];
    var RES_GROW_W = [];
    var RES_GROW_B = [];

    var PRE_LOAD_NODES = {};
    var URL_PARAM = {};

    var elementQueue = [];

    var VILLAGES_INFO= {};

    var SID = '';

    var MAP_TYPE = {
            TYPE11 : 0x1,
            TYPE15 : 0x2,
            TYPE20 : 0x4,
            TYPE51 : 0x10,
            NORMAL : 0x07,
            BIG : 0x10,
            ALL : 0x17
    };

    if (!initPanel()) return;

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

    if (isNarrow && OPT_VILLAGE_LIST_BOX) disp_villageListBox();
    if (OPT_VILLAGE)     disp_village();
    if (OPT_BASELINK)    disp_baseLink();
    if (OPT_MEMO)        disp_memo();
    if (OPT_ALLY)        disp_AllianceInfo(); //XYリンク加工前に呼ぶ
    if (OPT_BOOKMARK)    disp_bookmark();
    if (OPT_XYLINK)      disp_XYLink();
    if (OPT_TTBL)        disp_TTable();
    if (OPT_DETAILS)     disp_Details();
    if (OPT_DECK)        disp_Deck();

    if (OPT_CTIME_B)     disp_CompleteTimeBuild();

    if (OPT_CTIME_U)     disp_CompleteTimeUnit();
    if (OPT_RES_T)       disp_ResourcesTotal();
    if (OPT_RES_TIME)    disp_ResourcesTime();
    if (OPT_REMOVELIST)  disp_RemoveList();
    if (OPT_MAPLIST)     disp_MapList();
    if (OPT_USER_STAR)   disp_UserStar();
    if (OPT_USER_LEVEL)  disp_UserLevel();
    if (OPT_MAPCENTER)   disp_MapCenter();
    if (OPT_TBREST)      disp_ToubatsuRestTime();
    if (OPT_DELMSG)      disp_DeleteMessages();
    if (OPT_TSENDTIME)   disp_TSendTime();
    if (OPT_SMALLBTN)    disp_SmallButton();
    if (OPT_ATTACKMAP)   disp_AttackMap();
    if (OPT_CARD_CMB)    disp_CardCombine();
    if (OPT_YOROZU)      disp_Yorozu();
    if (OPT_HPREST)      disp_HPRestTime();
    if (OPT_MAPHELP)     installMapXYHelper();
    if (OPT_TRDHELP)     installTradeHelper();
    if (OPT_SEISAN)      disp_Seisan();
    if (OPT_NEXT_FAME)   disp_nextFameTimer();
    if (OPT_TIMER_DEPOT) disp_timerLinkDepot();
    if (OPT_LOGBOX)      disp_logMessageBox();
    if (OPT_TTALLYPRSN)  disp_ToolTipsAllyPerson();
    if (OPT_TTDISTANCE)  disp_ToolTipsDistance();

    csortSideBox();
    crenumberSideBox();
    blinkElements();
function rewriteTimer() { if(1==rewrite_flg) { mapInfoView(); rewrite_flg=0 } setTimeout("rewriteTimer()",500) }
window.addEventListener("load",function(){setTimeout("rewriteTimer()",500);},false);
    //アイコン画像の初期化
    var img_mura, img_naisei, img_unit, img_troop, img_map, img_edit, img_user, img_mail, img_ally;
    function initImages() {
        if (!OPT_LARGEICON) {
            //標準アイコン 10x10px
            img_mura = 'data:image/gif;base64,'+
            /**
                    'R0lGODlhCgAKAKIAAAAAAP/M/7Jlf2YAAMaAoLpxjceAoQAAACH5BAQUAP8ALAAAAAAKAAoAAAMd'+
                    'CBDcumE0CeOcI2vJMunYYICgZDalwEFcQSkooyQAOw==';
            */
                    'R0lGODlhCgAJAKIGAP///8zM/5nM/2bM/zOZ/wCZ/////wAAACH5BAEAAAYALAAAAAAKAAkAAAMk'+
                    'aBVURaGoNRoRw4HNtytAkV3fAAQDKnxC5JAP9MGOm2bSp0sJADs=';
            img_naisei = 'data:image/gif;base64,'+
            /**
                    'R0lGODlhCgAKALMAAAAAAMPS5HWOi5kAZktYU7yw0BogILmjyMz//8LP4r641MXb6QAAAAAAAAAA'+
                    'AAAAACH5BAQUAP8ALAAAAAAKAAoAAAQnEBiEBkUGgGsvqUMockgxKBWnDMewdKA1UkNwJTBMU9vl'+
                    'CxofDxABADs=';
            */
                    'R0lGODlhCgAJAKIFAP///8zMzJmZmWZmZjMzM////wAAAAAAACH5BAEAAAUALAAAAAAKAAkAAAMi'+
                    'WEMkS6M0QGtgrq0h8ArBwHlCF5TYyUCdtrLeKoSE9K5FAgA7';
            img_unit = 'data:image/gif;base64,'+
                    'R0lGODlhCgAJAKIFAP/MzP+ZmcxmZswzM8wAAP///wAAAAAAACH5BAEAAAUALAAAAAAKAAkAAAMh'+
                    'WLQrQooIQMNjYLChF/3ARWReN4BgN2qBeqpAAMnMEhQJADs=';
            img_troop = 'data:image/gif;base64,'+
                    'R0lGODlhCgAKAPIAAAAAAAkJCRgAADMzM1hYWKqqqv///+jo6CH5BAAAAAAALAAAAAAKAAoAAAMh'+
                    'CALcvA4UEyIwplTTMGcT4UUTFolY5WBi4QzHwHwN5CwJADs=';
            img_map = 'data:image/gif;base64,'+
                    'R0lGODlhCgAJAPAAAAAAANS4SSH5BAAAAAAALAAAAAAKAAkAAAINjI+pAdb6XorTVbayLgA7';
            img_edit = 'data:image/gif;base64,'+
                    'R0lGODlhCgAKAPMPAAAAAAQEBAoJCRUPDysrKyILC2pqakJBQbi4uI6MjP7+/v39/fr6+vX19efn'+
                    '59TU1CH5BAAAAAAALAAAAAAKAAoAAAQ3EBRkiGGIDKEUbUqTAUNnggYQGKbCpADbwrLLKI8ACI9p'+
                    'ODgCgNAjBAgIhQOwGzBVCcUz8FQJIgA7';
            img_mail = 'data:image/gif;base64,'+
                    'R0lGODlhCgAKAMQAAP///5mZmSoaGhoWFhkVFRMTEyQODiILCwsLCwYGBgcGBgkGBhgAABYAAAMD'+
                    'AwEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQU'+
                    'AP8ALAAAAAAKAAoAAAUvIHREZBkVzWCuQQC8QEsGkRvXz3PL7pO8tNorgoAZARHFERYxLIcRBmTq'+
                    'iBAEixAAOw==';
            img_user = 'data:image/gif;base64,'+
                    'R0lGODlhCgAKAPMAADMAAIhFA693EL6DEc2rHde6I9nDKeTTJu3kK/HsLPLuNPj3NPbwUfTwQvz7'+
                    'tv///yH5BAUUAA8ALAAAAAAKAAoAAAQ98D3HUmJOzraSWkrmKIhBFkhDLQRwHICxVMshIIhwdOWn'+
                    'fAkUQ0DofAoDjCFAsBQCBpFBMBgIohrKCyOJAAA7';
            img_ally = 'data:image/gif;base64,'+
                    'R0lGODlhCgAKAPEAAAAAAACZAJnMmf///yH5BAEAAAAALAAAAAAKAAoAAAIZRI5nJyN/3JiUSers'+
                    'bDmKlDRg0o1isoxAAQA7';
        } else {
            //大きめアイコン 14x14px
            img_mura = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAPQfAAoqPBuP0RyQ0h+V1gmc7w6c7g2d7gmb7wqd8Qug8hWg7hCh8iCa1yms9Cys'+
                    '9CWq8zGv9TGw9TWx9Ea39ke59ki59mbE+IXQ+aLb+sPo/MLn/ODz/uHz/uDz/eL0/v///yH5BAAA'+
                    'AAAALAAAAAAOAA4AAAVyIBAUxuIkCZQchQAISpFQl+NcFXIoQuE7GIujYcE8WD6Sw7NpNo8+gyFR'+
                    '2Xyun80EEZ1psFjNtnB4YMBgI2lmRW8qCRLh0QZvHl1KHatdFBAPX2hXGg4kdINXGxAtEhkekJAc'+
                    'kxkSLgwSEZqbERARAwAhADs=';
            img_naisei = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAPQfAB4eHiQjIyopKS0tLSsrLCgoJzAvMDEwMTAwMDU1NTk5OUlJSVhYWGZmZXZ2'+
                    'dpmZmYeHh6Cfn7y8u6OjosC/vsDAv8PCwszMy8jHx9DOztPS0tzb29nY19HQz+Pi4ff29SH5BAAA'+
                    'AAAALAAAAAAOAA4AAAV/4HEgxEEQhkAghiEeAQM5NL0UpRhAn+dtG48DgHgRFkBNp3NRBFAi0mTD'+
                    'UT4Cz+Ko0MBYvgyASktQdDaXS6YCW4nKmo0mbUlk32Z5Zo24HwYxF1QWYWM6DRMzDhERCwBuAwxB'+
                    'FwsNGhkWCwEvEh5LGKAWGA9EBwpUS3QVqwsEIQA7';
            img_unit = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAPIAAAAAAGYAAMwAAMwzM//MzP///wAAAAAAACH5BAEAAAAALAAAAAAOAA4AAAM0'+
                    'CCHcHkqUSatYsmpXx7ANRTAExTlnWIxNWXAT677Nt5LTgLpejAq2zg/oIugamCEyorwAEgA7';
            img_troop = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAMQAAP9MH/9lP/9AEP9ZMP9/X/+Zf/+yn/+lj//Zz//y7/9zUP+AYP+/r/+Lbv/P'+
                    'w//q5f+fh//s5/9jPP+NcP/l3//Mv/////8zAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEA'+
                    'ABgALAAAAAAOAA4AAAVCIHaNZDmKZqkYqVlZQEsORCBX1YLIhWVRstHB9wheDC8LApiC+HwES+og'+
                    'uAAsCcNAcUMIfJVUVEoKpyjMUZWEMmJCADs=';
            img_map = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAMQAAKmLAeHXp76oQP38+My7arSaIe/pz9jKi8SvUeffuK6SEdTFf7mhMci0XPTw'+
                    '39zPl+Tbr8OuTcq4ZN7SnOniv72mPf///8++ccm3YdTFgP///wAAAAAAAAAAAAAAAAAAACH5BAEA'+
                    'ABoALAAAAAAOAA4AAAVCoAaMZDmKZqqu5EIRVUUqWEkJl6XvkL2POkCmNPkBgpdS8gi0AA6lnfOX'+
                    'qDWlOoegN0IMKCRBgRGxsgwPAyuFWmtCADs=';
            img_edit = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOALMAAAAAAP///8zMzL+/v5mZmWZmZjIyMiYmJgwMDP///wAAAAAAAAAAAAAAAAAA'+
                    'AAAAACH5BAEAAAkALAAAAAAOAA4AAARF0Eg5yLxTEFE1lkIYCEGBEUMoBqyQqSQ7WlQ4mLFnDKPO'+
                    'tyYeifYLEUc3AylkkrR6I+Qr2krRJISWqnlBFQId7kdgEhsiADs=';
            img_mail = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAPIAAAAAABsaGh0cHB8eHioqKmdmZvn6+v///yH5BAEAAAAALAAAAAAOAA4AAAMx'+
                    'CLrc/qCcSWtRRdQqLjhFsB3doUyCRqXTiarCQLkTkRIVbYDS3n6jDS34I+YgyCQgAQA7';
            img_user = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAPU/ACkQADQOADQbAnk1A3tGCIA5AIVBB4hWCpREAKJxC6t0DLx9EKNpC7+FFMSO'+
                    'FMeXFdCeGMugGM2jGsuqHc+xH9WyHd2+INq9Idm5KeC+H9/BH97FJuXOI+LFJuXTJereKuvaM+zi'+
                    'Ku7oLvLsLfDpK/LuMvHsMfLtNfPuPPHgNfTzLff4LvTwMvXyM/TxNPTyM/f4Nfv5Nf7/OvTwPPXu'+
                    'UPXxTfj0TfXwVPn1U/fzafn2afn2nvv8of39vvz5vP///yH5BAUUAD8ALAAAAAAOAA4AAAadwJ/Q'+
                    'lzuNRqecT8jc3VCl6Gh22zVRqtWrJILBRiirrzb6VDguV6ciGtWIqFUGcJDFCALOCqU7nWIaAQcx'+
                    'MQcBGjFpRy0fEBUrLRUQH1slJB4fLVEtLSOcHhskJhAQXS6bMB8PD0kbAxQylSUyFQgbOT04CQMT'+
                    'HyNcFwYKNT0/PCm7CxISDggMIDxMPDgdDgsLDhQ00Uw/PX0kSLhMQQA7';
            img_ally = 'data:image/gif;base64,'+
                    'R0lGODlhDgAOAPEAAAAAAACZAJnMmf///yH5BAEAAAAALAAAAAAOAA4AAAIoRI55liIKhxQzDSqz'+
                    'tFfnh1yY13RDgIGh00AUBF+w8s6WatcKYwdAAQA7';
        }
    }

    //スタイルの初期化
    function initStyle() {
        GM_addStyle('span.beyond_panel_ctlbox {width:35px; height:14px; display:block; position:absolute; right:-5px; top:-4px;}'+
                    'span.beyond_panel_ctlbox img {width:8px;height:9px; float:right;}'+
                    'div#beyond_basepanel img{vertical-align:middle; margin:1px 1px 1px 0px; padding-left:2px}'+
                    '#beyond_basepanel fieldset{border:groove 1px black; margin:1px; padding:1px;}'+
                    'div#map51-content div li {width:auto !important;}'
                    );
    }

    //リソース変数の初期化
    function initResources() {
        var nowNodes = PRE_LOAD_NODES['nowResources'];
        var names = ['wood', 'stone', 'iron', 'rice'];
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            RES_NOW[name] = parseInt(nowNodes[name].innerHTML, 10);
            RES_MAX[name] = parseInt($(name+'_max').innerHTML, 10);
            RES_GROW[name] = parseInt($('output_'+name).innerHTML, 10);
        }

        var spns = $x('(id("sidebar") | id("status_left")//p[contains(concat(" ", normalize-space(@class), " "), " status_bottom ")])//span[contains(concat(" ", normalize-space(@class), " "), " increase ") or contains(concat(" ", normalize-space(@class), " "), " resource ")]');
        for (var i = 0; i < spns.length; i++) {
            var str = spns[i].previousSibling.nodeValue.match(/(木|石|鉄|糧)\s+(-?\d+)/);
            if (str) {
                var name = '';
                switch (str[1]) {
                    case '木': name = 'wood'; break;
                    case '石': name = 'stone'; break;
                    case '鉄': name = 'iron'; break;
                    case '糧': name = 'rice'; break;
                }
                RES_GROW_W[name] = parseInt(str[2], 10);
                RES_GROW_B[name] = parseInt(spns[i].innerHTML, 10);
            }
        }

        //名声
        RES_NOW['fame'] = 0;
        RES_MAX['fame'] = 0;
        var fameText = $s('id("status_left")/img[contains(@src, "ico_fame.gif")]').nextSibling;
        if (fameText) {
            var tmp = fameText.nodeValue.match(/\s*(\d+)\s*\/\s*(\d+)/);
            RES_NOW['fame'] = parseInt(tmp[1], 10);
            RES_MAX['fame'] = parseInt(tmp[2], 10);
        }
    }

    //ベースパネルの初期化
    function initPanel() {
        var panelBox = $('sidebar');
        if (isNarrow) {
            var panelBoxWrapper = $s('id("wrapper")');

            if (!panelBoxWrapper) return false;

            panelBox = d.createElement('div');
            panelBox.id = 'sidebar';
            panelBox.style.width = 'auto';
            panelBox.style.cssFloat = 'left';
            panelBox.style.marginTop = '10px';

            panelBoxWrapper.appendChild(panelBox);
        }

        if (!panelBox) return false;

        var basepanel = d.createElement('div');
        basepanel.id = 'beyond_basepanel';

        var fixpanel = d.createElement('div');
        fixpanel.id = 'beyond_fixpanel';
        var floatpanel = d.createElement('div');
        floatpanel.id = 'beyond_floatpanel';
        var tmppanel = d.createElement('div');
        tmppanel.id = 'beyond_tmp';
        tmppanel.style.display = 'none';

        basepanel.appendChild(fixpanel);
        basepanel.appendChild(floatpanel);
        basepanel.appendChild(tmppanel);

        panelBox.appendChild(basepanel);

        return true;
    }

    //オプション処理
    function disp_Options() {
        if (!location.pathname.match(/^(\/user\/|\/bbs\/personal_)/)) return;

        if (location.pathname.match(/ranking\.php/)) return;
        var ul = $('statMenu');
        if (!ul) return;

        var cl = d.createElement('a');
        cl.href = 'javascript:void(0);';
        cl.innerHTML = '三国志Beyond';
        $e(cl, 'click', function() {openOptions();});

        var hasLastDocs = $x('//li[contains(concat(" ", normalize-space(@class), " "), " last ")]');
        hasLastDocs.forEach(function(hasLastDoc) {
            hasLastDoc.removeAttribute('class');
        });

        var li = d.createElement('li');
        li.appendChild(cl);
        li.className = 'last';
        ul.appendChild(li);
    }

    function loadOptions() {
        OPT_VILLAGE = cloadData('OPT_VILLAGE', 1);
        OPT_BASELINK = cloadData('OPT_BASELINK', 1);
        OPT_BOOKMARK = cloadData('OPT_BOOKMARK', 1);
        OPT_BOOKMARK_FONT_SIZE = cloadData('OPT_BOOKMARK_FONT_SIZE', '10');
        OPT_XYLINK = cloadData('OPT_XYLINK', 1);
        OPT_XYLINK_NK = cloadData('OPT_XYLINK_NK', 0);
        OPT_LARGEICON = cloadData('OPT_LARGEICON', 0);
        OPT_TTBL = cloadData('OPT_TTBL', 1);
        OPT_MEMO = cloadData('OPT_MEMO', 0);
        OPT_MEMO_FONT_SIZE = cloadData('OPT_MEMO_FONT_SIZE', '10');
        OPT_MEMO_WIDTH = cloadData('OPT_MEMO_WIDTH', '20');
        OPT_MEMO_HEIGHT = cloadData('OPT_MEMO_HEIGHT', '5');
        OPT_MEMO_COUNT = cloadData('OPT_MEMO_COUNT', '1');
        OPT_DETAILS = cloadData('OPT_DETAILS', 1);
        OPT_DETAILS_UP = cloadData('OPT_DETAILS_UP', 0);
//      OPT_DECK = cloadData('OPT_DECK', 1);
        OPT_DECK_SET = cloadData('OPT_DECK_SET', 1);
        OPT_CTIME_B = cloadData('OPT_CTIME_B', 1);
        OPT_CTIME_U = cloadData('OPT_CTIME_U', 1);
        OPT_ALLY = cloadData('OPT_ALLY', 1);
        OPT_ALLY_IS = cloadData('OPT_ALLY_IS', 1);
        OPT_ALLY_XY = cloadData('OPT_ALLY_XY', 1);
        OPT_ALLY_CSV = cloadData('OPT_ALLY_CSV', 0);
        OPT_RES_T = cloadData('OPT_RES_T', 0);
        OPT_RES_TIME = cloadData('OPT_RES_TIME', 1);
        OPT_REMOVELIST = cloadData('OPT_REMOVELIST', 1);
        OPT_MAPLIST = cloadData('OPT_MAPLIST', 0);
        OPT_TTDISTANCE = cloadData('OPT_DISTANCE', 0);
        OPT_TTDISTANCE_ITEMS = cloadData('OPT_DISTANCE_ITEMS', '["槍兵(7)", "弓兵(5)", "騎兵(12)", "矛槍兵(10)", "弩兵(8)", "近衛騎兵(15)", "衝車(3)", "投石機(6)"]', true, true);
        OPT_TTALLYPRSN = cloadData('OPT_TTALLYPRSN', 1);
        OPT_USER_STAR = cloadData('OPT_USER_STAR', 1);
        OPT_USER_LEVEL = cloadData('OPT_USER_LEVEL', 1);
        OPT_MAPCENTER = cloadData('OPT_MAPCENTER', 1);
        OPT_TBREST = cloadData('OPT_TBREST', 1);
        OPT_DELMSG = cloadData('OPT_DELMSG', 1);
        OPT_TSENDTIME = cloadData('OPT_TSENDTIME', 1);
        OPT_SMALLBTN = cloadData('OPT_SMALLBTN', 0);
        OPT_ATTACKMAP = cloadData('OPT_ATTACKMAP', 1);
        OPT_CARD_CMB = cloadData('OPT_CARD_CMB', 1);
        if (isNarrow) OPT_YOROZU = cloadData('OPT_YOROZU', 0);
        OPT_HPREST = cloadData('OPT_HPREST', 1);
        OPT_MAPHELP = cloadData('OPT_MAPHELP', 1);
        OPT_TRDHELP = cloadData('OPT_TRDHELP', 1);
        OPT_BLINKBLD = cloadData('OPT_BLINKBLD', 0);
        OPT_SEISAN = cloadData('OPT_SEISAN', 1);
        OPT_NO_ALERT = cloadData('OPT_NO_ALERT', 0);
        OPT_LOGBOX = cloadData('OPT_LOGBOX', 0);
        OPT_LOGBOX_FONT_SIZE = cloadData('OPT_LOGBOX_FONT_SIZE', '9');
        OPT_LOGBOX_WIDTH = cloadData('OPT_LOGBOX_WIDTH', '20');
        OPT_LOGBOX_HEIGHT = cloadData('OPT_LOGBOX_HEIGHT', '5');
        OPT_LOG_EXP_TIME = cloadData('OPT_LOG_EXP_TIME', '180');
        OPT_CASTLE_AID = cloadData('OPT_CASTLE_AID', 0);
        OPT_NEXT_FAME = cloadData('OPT_NEXT_FAME', 0);
        OPT_TIMER_DEPOT = cloadData('OPT_TIMER_DEPOT', 0);
        if (isNarrow) OPT_VILLAGE_LIST_BOX = cloadData('OPT_VILLAGE_LIST_BOX', 1);
    }

    function saveOptions() {
        OPT_VILLAGE = cgetCheckBoxValue('OPT_VILLAGE');
        OPT_BASELINK = cgetCheckBoxValue('OPT_BASELINK');
        OPT_BOOKMARK = cgetCheckBoxValue('OPT_BOOKMARK');
        OPT_BOOKMARK_FONT_SIZE = cgetTextBoxValue('OPT_BOOKMARK_FONT_SIZE');
        OPT_XYLINK = cgetCheckBoxValue('OPT_XYLINK');
        OPT_XYLINK_NK = cgetCheckBoxValue('OPT_XYLINK_NK');
        OPT_LARGEICON = cgetCheckBoxValue('OPT_LARGEICON');
        OPT_TTBL = cgetCheckBoxValue('OPT_TTBL');
        OPT_MEMO = cgetCheckBoxValue('OPT_MEMO');
        OPT_MEMO_FONT_SIZE = cgetTextBoxValue('OPT_MEMO_FONT_SIZE');
        OPT_MEMO_WIDTH = cgetTextBoxValue('OPT_MEMO_WIDTH');
        OPT_MEMO_HEIGHT = cgetTextBoxValue('OPT_MEMO_HEIGHT');
        OPT_MEMO_COUNT = cgetTextBoxValue('OPT_MEMO_COUNT');
        OPT_DETAILS = cgetCheckBoxValue('OPT_DETAILS');
        OPT_DETAILS_UP = cgetCheckBoxValue('OPT_DETAILS_UP');
//      OPT_DECK = cgetCheckBoxValue('OPT_DECK');
        OPT_DECK_SET = cgetCheckBoxValue('OPT_DECK_SET');
        OPT_CTIME_B = cgetCheckBoxValue('OPT_CTIME_B');
        OPT_CTIME_U = cgetCheckBoxValue('OPT_CTIME_U');
        OPT_ALLY = cgetCheckBoxValue('OPT_ALLY');
        OPT_ALLY_IS = cgetCheckBoxValue('OPT_ALLY_IS');
        OPT_ALLY_XY = cgetCheckBoxValue('OPT_ALLY_XY');
        OPT_ALLY_CSV = cgetCheckBoxValue('OPT_ALLY_CSV');
        OPT_RES_T = cgetCheckBoxValue('OPT_RES_T');
        OPT_RES_TIME = cgetCheckBoxValue('OPT_RES_TIME');
        OPT_REMOVELIST = cgetCheckBoxValue('OPT_REMOVELIST');
        OPT_MAPLIST = cgetCheckBoxValue('OPT_MAPLIST');
        OPT_TTDISTANCE = cgetCheckBoxValue('OPT_DISTANCE');
        OPT_TTDISTANCE_ITEMS = getDistanceBox(8);
        OPT_TTALLYPRSN = cgetCheckBoxValue('OPT_TTALLYPRSN');
        OPT_USER_STAR = cgetCheckBoxValue('OPT_USER_STAR');
        OPT_USER_LEVEL = cgetCheckBoxValue('OPT_USER_LEVEL');
        OPT_MAPCENTER = cgetCheckBoxValue('OPT_MAPCENTER');
        OPT_TBREST = cgetCheckBoxValue('OPT_TBREST');
        OPT_DELMSG = cgetCheckBoxValue('OPT_DELMSG');
        OPT_TSENDTIME = cgetCheckBoxValue('OPT_TSENDTIME');
        OPT_SMALLBTN = cgetCheckBoxValue('OPT_SMALLBTN');
        OPT_ATTACKMAP = cgetCheckBoxValue('OPT_ATTACKMAP');
        OPT_CARD_CMB = cgetCheckBoxValue('OPT_CARD_CMB');
        if (isNarrow) OPT_YOROZU = cgetCheckBoxValue('OPT_YOROZU');
        OPT_HPREST = cgetCheckBoxValue('OPT_HPREST');
        OPT_MAPHELP = cgetCheckBoxValue('OPT_MAPHELP');
        OPT_TRDHELP = cgetCheckBoxValue('OPT_TRDHELP');
        OPT_BLINKBLD = cgetCheckBoxValue('OPT_BLINKBLD');
        OPT_SEISAN = cgetCheckBoxValue('OPT_SEISAN');
        OPT_NO_ALERT = cgetCheckBoxValue('OPT_NO_ALERT');
        OPT_LOGBOX = cgetCheckBoxValue('OPT_LOGBOX');
        OPT_LOGBOX_FONT_SIZE = cgetTextBoxValue('OPT_LOGBOX_FONT_SIZE');
        OPT_LOGBOX_WIDTH = cgetTextBoxValue('OPT_LOGBOX_WIDTH');
        OPT_LOGBOX_HEIGHT = cgetTextBoxValue('OPT_LOGBOX_HEIGHT');
        OPT_LOG_EXP_TIME = cgetTextBoxValue('OPT_LOG_EXP_TIME');
        OPT_CASTLE_AID = cgetCheckBoxValue('OPT_CASTLE_AID');
        OPT_NEXT_FAME = cgetCheckBoxValue('OPT_NEXT_FAME');
        OPT_TIMER_DEPOT = cgetCheckBoxValue('OPT_TIMER_DEPOT');
        if (isNarrow) OPT_VILLAGE_LIST_BOX = cgetCheckBoxValue('OPT_VILLAGE_LIST_BOX');

        csaveData('OPT_VILLAGE', OPT_VILLAGE);
        csaveData('OPT_BASELINK', OPT_BASELINK);
        csaveData('OPT_BOOKMARK', OPT_BOOKMARK);
        csaveData('OPT_BOOKMARK_FONT_SIZE', OPT_BOOKMARK_FONT_SIZE);
        csaveData('OPT_XYLINK', OPT_XYLINK);
        csaveData('OPT_XYLINK_NK', OPT_XYLINK_NK);
        csaveData('OPT_LARGEICON', OPT_LARGEICON);
        csaveData('OPT_TTBL', OPT_TTBL);
        csaveData('OPT_MEMO', OPT_MEMO);
        csaveData('OPT_MEMO_FONT_SIZE', OPT_MEMO_FONT_SIZE);
        csaveData('OPT_MEMO_WIDTH', OPT_MEMO_WIDTH);
        csaveData('OPT_MEMO_HEIGHT', OPT_MEMO_HEIGHT);
        csaveData('OPT_MEMO_COUNT', OPT_MEMO_COUNT);
        csaveData('OPT_DETAILS', OPT_DETAILS);
        csaveData('OPT_DETAILS_UP', OPT_DETAILS_UP);
//      csaveData('OPT_DECK', OPT_DECK);
        csaveData('OPT_DECK_SET', OPT_DECK_SET);
        csaveData('OPT_CTIME_B', OPT_CTIME_B);
        csaveData('OPT_CTIME_U', OPT_CTIME_U);
        csaveData('OPT_ALLY', OPT_ALLY);
        csaveData('OPT_ALLY_IS', OPT_ALLY_IS);
        csaveData('OPT_ALLY_XY', OPT_ALLY_XY);
        csaveData('OPT_ALLY_CSV', OPT_ALLY_CSV);
        csaveData('OPT_RES_T', OPT_RES_T);
        csaveData('OPT_RES_TIME', OPT_RES_TIME);
        csaveData('OPT_REMOVELIST', OPT_REMOVELIST);
        csaveData('OPT_MAPLIST', OPT_MAPLIST);
        csaveData('OPT_DISTANCE', OPT_TTDISTANCE);
        csaveData('OPT_DISTANCE_ITEMS', OPT_TTDISTANCE_ITEMS, true, true);
        csaveData('OPT_TTALLYPRSN', OPT_TTALLYPRSN);
        csaveData('OPT_USER_STAR', OPT_USER_STAR);
        csaveData('OPT_USER_LEVEL', OPT_USER_LEVEL);
        csaveData('OPT_MAPCENTER', OPT_MAPCENTER);
        csaveData('OPT_TBREST', OPT_TBREST);
        csaveData('OPT_DELMSG', OPT_DELMSG);
        csaveData('OPT_TSENDTIME', OPT_TSENDTIME);
        csaveData('OPT_SMALLBTN', OPT_SMALLBTN);
        csaveData('OPT_ATTACKMAP', OPT_ATTACKMAP);
        csaveData('OPT_CARD_CMB', OPT_CARD_CMB);
        if (isNarrow) csaveData('OPT_YOROZU', OPT_YOROZU);
        csaveData('OPT_HPREST', OPT_HPREST);
        csaveData('OPT_MAPHELP', OPT_MAPHELP);
        csaveData('OPT_TRDHELP', OPT_TRDHELP);
        csaveData('OPT_BLINKBLD', OPT_BLINKBLD);
        csaveData('OPT_SEISAN', OPT_SEISAN);
        csaveData('OPT_NO_ALERT', OPT_NO_ALERT);
        csaveData('OPT_LOGBOX', OPT_LOGBOX);
        csaveData('OPT_LOGBOX_FONT_SIZE', OPT_LOGBOX_FONT_SIZE);
        csaveData('OPT_LOGBOX_WIDTH', OPT_LOGBOX_WIDTH);
        csaveData('OPT_LOGBOX_HEIGHT', OPT_LOGBOX_HEIGHT);
        csaveData('OPT_LOG_EXP_TIME', OPT_LOG_EXP_TIME);
        csaveData('OPT_CASTLE_AID', OPT_CASTLE_AID);
        csaveData('OPT_NEXT_FAME', OPT_NEXT_FAME);
        csaveData('OPT_TIMER_DEPOT', OPT_TIMER_DEPOT);
        if (isNarrow) csaveData('OPT_VILLAGE_LIST_BOX', OPT_VILLAGE_LIST_BOX);

        alert('設定を保存しました');
        deleteOptionsHtml();
    }

    function getMyInfo() {
        if ((location.pathname == '/user/index.php' || location.pathname == '/user/') && !URL_PARAM.user_id) {

            var uid=0, aid=0;
            var uidtd = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[2]//td[3]');
            if (uidtd) {
                uid = uidtd.innerHTML.match(/\/bbs\/personal_topic_view\.php\?user_id\=(\d+)/);
            }
            var aidtd = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[3]//td[4]');
            if (aidtd) {
                aid = d.body.innerHTML.match(/\/alliance\/info\.php\?id\=(\d+)/);
            }
            if (uid && aid) {
                csaveData('user_id', uid[1], true);
                csaveData('ally_id', aid[1], true);
            }
        }

        USER_ID = cloadData('user_id', '', true);
        ALLY_ID = cloadData('ally_id', '', true);
    }

    function resetBookmark() {
        if (!confirm('登録済みリンクを全て削除します。\nよろしいですか？')) return;

        var bookmarks = cloadData('links', 0, true);
        for (var i = 0; i < bookmarks; i++) {
            cdelData('link' + i, true);
        }
        cdelData('links', true);

        resetBookmark();
    }

    function resetUserXY() {
        if (!confirm('同盟員一覧の座標情報を全て削除します。\nよろしいですか？')) return;
        cresetUserXY();
    }

    function resetUserStar() {
        if (!confirm('君主の★情報と自領地のLevel情報を全て削除します。\nよろしいですか？')) return;
        cresetUserStar();
        cdelData('MyLevelList', true);
    }

    function openOptions() {
        deleteOptionsHtml();
        addOptionsHtml();
    }

    function deleteOptionsHtml() {
        var elem = $('beyond_OptionsWindow');
        if (!elem) return;
        $('beyond_floatpanel').removeChild(elem);
    }

    function addOptionsHtml() {
        var oc = d.createElement('div');
        oc.id = 'beyond_OptionsWindow';
        oc.style.position = 'absolute';
        oc.style.backgroundColor = '#333333';
        oc.style.border = 'outset 2px #333333';
        oc.style.color = '#dddddd';
        oc.style.fontSize = '12px';
        oc.style.padding = '15px';
        oc.style.zIndex = 1000;

        var x = cloadData('config_window_x', 20);
        var y = cloadData('config_window_y', 20);
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        oc.style.left = x + 'px';
        oc.style.top = y + 'px';

        $e(oc, 'mousedown', function(event) {
                    if (event.target != $('beyond_OptionsWindow')) return false;
                    g_MD='beyond_OptionsWindow';
                    g_MX=event.pageX-parseInt(this.style.left, 10);
                    g_MY=event.pageY-parseInt(this.style.top, 10);
                    event.preventDefault();
                    });
        $e(d, 'mousemove', function(event) {
                    if (g_MD != 'beyond_OptionsWindow') return true;
                    var oc = $('beyond_OptionsWindow');
                    if (!oc) return true;
                    var x = event.pageX - g_MX;
                    var y = event.pageY - g_MY;
                    oc.style.left = x + 'px';
                    oc.style.top = y + 'px';
                    csaveData('config_window_x', x);
                    csaveData('config_window_y', y);
                    });
        $e(d, 'mouseup', function(event) {g_MD='';});

        var tx = d.createElement('div');

        var ah = d.createElement('a');
        ah.href = DIST_SRC;
        tx.title = ah.href;
        ah.target = '_blank';
        ah.appendChild(d.createTextNode(PROGRAM_NAME + ' Ver ' + VERSION));

        tx.appendChild(ah);
        tx.style.padding = '4px';
        tx.style.fontSize = '10px';
        tx.style.fontWeight = 'bolder';
        tx.style.color = 'white';
        oc.appendChild(tx);

        $('beyond_floatpanel').appendChild(oc);

        var tbl = d.createElement('table');
        tbl.style.border ='0px';
        var tr = d.createElement('tr');
        var td1 = d.createElement('td');
        td1.style.padding = '15px';
        td1.style.verticalAlign = 'top';
        var td2 = d.createElement('td');
        td2.style.padding = '15px';
        td2.style.verticalAlign = 'top';
        var td3 = d.createElement('td');
        td3.style.padding = '15px';
        td3.style.verticalAlign = 'top';
        var td4 = d.createElement('td');
        td4.style.padding = '15px';
        td4.style.verticalAlign = 'top';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbl.appendChild(tr);
        oc.appendChild(tbl);

        //設定項目
        ccreateCheckBox(td1, 'OPT_VILLAGE', OPT_VILLAGE, '建築可否表示', '都市画面で、資源不足で建築できない施設を黄色でLV表示します', 0);
        ccreateCheckBox(td1, 'OPT_BLINKBLD', OPT_BLINKBLD, '建設中施設の点滅表示', '建設中の施設を点滅させます', 0);
        ccreateCheckBox(td1, 'OPT_CTIME_B', OPT_CTIME_B, '完了時刻表示(建物)', '建築時に完了予定日時を表示します', 0);
        ccreateCheckBox(td1, 'OPT_CTIME_U', OPT_CTIME_U, '完了時刻表示(兵)', '造兵時に完了予定日時を表示します', 0);
        ccreateCheckBox(td1, 'OPT_RES_TIME', OPT_RES_TIME, '倉庫残時間表示', '資源が倉庫から溢れるまでの時間を表示します', 0);
        ccreateCheckBox(td1, 'OPT_RES_T', OPT_RES_T, '総生産量表示', '資源生産量の合計を表示します', 0);
        ccreateCheckBox(td1, 'OPT_SEISAN', OPT_SEISAN, '拠点生産力表示', '拠点の資源生産力を表示します', 0);
        ccreateCheckBox(td1, 'OPT_NEXT_FAME', OPT_NEXT_FAME, '名声タイマー', '次の名声値獲得までの時間を表示します', 0);
        ccreateCheckBox(td1, 'OPT_BASELINK', OPT_BASELINK, '拠点リンク', '拠点リストにマップ、内政などのリンクを追加します', 0);
        ccreateCheckBox(td1, 'OPT_CASTLE_AID', OPT_CASTLE_AID, '援軍リンク', '拠点リンクに援軍出兵リンクを追加します', 16);
        if (isNarrow) ccreateCheckBox(td1, 'OPT_VILLAGE_LIST_BOX', OPT_VILLAGE_LIST_BOX, '拠点リスト常時表示', '都市画面、地図画面以外でも拠点リストを表示します', 0);
        ccreateBlankRow(td1, 0);
//      ccreateCheckBox(td1, 'OPT_DECK', OPT_DECK, 'デッキ画面改善', 'デッキ画面の改善を行います', 0);
        ccreateCheckBox(td1, 'OPT_DECK_SET', OPT_DECK_SET, '武将セット先自動選択', '武将のセット先として現在選択中の拠点を初期表示します', 0);
        ccreateCheckBox(td1, 'OPT_HPREST', OPT_HPREST, 'HP回復予測', 'ファイル内の武将が全回復する時間を表示します', 0);
        ccreateCheckBox(td1, 'OPT_TBREST', OPT_TBREST, '討伐ゲージ回復予測', '武将の討伐ゲージが300または500になる時間を表示します', 0);
        ccreateCheckBox(td1, 'OPT_CARD_CMB', OPT_CARD_CMB, '合成支援ボタン', 'カード合成後の画面に、同一カードで合成を続けるためのボタンを追加します', 0);
        ccreateCheckBox(td1, 'OPT_TRDHELP', OPT_TRDHELP, 'トレード画面入力支援', '4桁数字を入力するとカードNoとして検索します', 0);

        ccreateCheckBox(td2, 'OPT_ALLY', OPT_ALLY, '同盟表示強化', '同盟員一覧の表示を強化します', 0);
        ccreateCheckBox(td2, 'OPT_ALLY_IS', OPT_ALLY_IS, '同盟員のソート', '同盟員一覧の並べ替えを可能にします', 16);
        ccreateCheckBox(td2, 'OPT_ALLY_XY', OPT_ALLY_XY, '同盟員座標表示', '同盟員一覧に本拠地の座標を表示します', 16);
        ccreateCheckBox(td2, 'OPT_ALLY_CSV', OPT_ALLY_CSV, '同盟員情報CSV', '同盟員一覧をCSV形式で出力します', 16);
        ccreateCheckBox(td2, 'OPT_USER_STAR', OPT_USER_STAR, '領地★情報表示', 'プロフィール画面に領地の★情報を表示します', 0);
        ccreateCheckBox(td2, 'OPT_USER_LEVEL', OPT_USER_LEVEL, '領地レベル表示', 'プロフィール画面に領地のレベルを表示します', 0);
        ccreateCheckBox(td2, 'OPT_XYLINK', OPT_XYLINK, '座標リンク', '掲示板や書簡に記載された座標(xxx,yyy)をリンク化します', 0);
        ccreateCheckBox(td2, 'OPT_XYLINK_NK', OPT_XYLINK_NK, 'カッコ不要', 'xxx,yyyだけでもリンク化します（注：1,000などの数字もリンク化されます）', 16);
        ccreateCheckBox(td2, 'OPT_TTALLYPRSN', OPT_TTALLYPRSN, '同盟/君主表示', 'すべての[拠点/領地]リンクのツールチップを同盟/君主表示に変更します', 0);
        ccreateCheckBox(td2, 'OPT_DETAILS', OPT_DETAILS, 'ログ合計表示', '同盟ログの詳細画面で、兵力＋援軍の合計を表示します', 0);
        ccreateCheckBox(td2, 'OPT_DETAILS_UP', OPT_DETAILS_UP, '合計を先に表示', '合計を詳細画面の下部ではなく上部に表示します', 16);
        ccreateCheckBox(td2, 'OPT_TTBL', OPT_TTBL, '兵力整形', '掲示板や書簡に転載された兵力一覧を表形式に整形して表示します', 0);
        ccreateCheckBox(td2, 'OPT_DELMSG', OPT_DELMSG, '書簡/報告書削除ボタン', '書簡や報告書の詳細ページに削除ボタンを追加します', 0);

        ccreateCheckBox(td3, 'OPT_MAPCENTER', OPT_MAPCENTER, 'マップ中央表示', 'マップ中央に目印を、座標検索欄の下に中央座標を表示します', 0);
        ccreateCheckBox(td3, 'OPT_MAPHELP', OPT_MAPHELP, '座標入力支援', 'X座標のところに999,999等と入力してジャンプできるようにします', 0);
        ccreateCheckBox(td3, 'OPT_MAPLIST', OPT_MAPLIST, 'マップの地形一覧', 'マップ上の拠点/領地を一覧表示します', 0);
        ccreateCheckBox(td3, 'OPT_REMOVELIST', OPT_REMOVELIST, '建設/破棄リスト', '建設/撤去中の拠点、破棄中の領地を一覧表示し、マップに目印を付けます', 0);
        ccreateCheckBox(td3, 'OPT_NO_ALERT', OPT_NO_ALERT, 'アラート抑制', '拠点、領地に関するアラートを抑制します(Auto_Bilder等への対策)', 16);
        ccreateCheckBox(td3, 'OPT_LOGBOX', OPT_LOGBOX, 'ログBOX', '抑制したアラートのログ（履歴）を表示します', 16);
        ccreateTextBox(td3, 'OPT_LOGBOX_FONT_SIZE', OPT_LOGBOX_FONT_SIZE, 'フォントサイズ', 'ログBOXのフォントサイズを指定します（初期値：9）', 2, 34);
        ccreateTextBox(td3, 'OPT_LOGBOX_WIDTH', OPT_LOGBOX_WIDTH, '幅', 'ログBOXの幅を指定します（初期値：20）', 4, 34);
        ccreateTextBox(td3, 'OPT_LOGBOX_HEIGHT', OPT_LOGBOX_HEIGHT, '高', 'ログBOXの高さを指定します（初期値：5）', 4, 34);
        ccreateTextBox(td3, 'OPT_LOG_EXP_TIME', OPT_LOG_EXP_TIME, '時間(分)', 'ログの保存期間(分)を指定します（初期値：180）', 4, 34);
        ccreateCheckBox(td3, 'OPT_ATTACKMAP', OPT_ATTACKMAP, '出兵先表示', 'マップ画面で、現在出兵中の領地/拠点に目印を付けます', 0);
        ccreateCheckBox(td3, 'OPT_TSENDTIME', OPT_TSENDTIME, '出発時刻計算', '出兵画面で、到着希望時間から出発時刻を逆算します', 0);
        ccreateCheckBox(td3, 'OPT_DISTANCE', OPT_TTDISTANCE, '移動時間表示', 'すべての[出兵]リンクのツールチップを移動時間の目安表示に変更します', 0);
        createDistanceBox(td3, OPT_TTDISTANCE_ITEMS, 8);
        ccreateBlankRow(td3, 0);

        ccreateCheckBox(td4, 'OPT_LARGEICON', OPT_LARGEICON, '大きめアイコン', '拠点リンク、ブックマークのアイコンを14x14サイズにします', 0);
        ccreateCheckBox(td4, 'OPT_SMALLBTN', OPT_SMALLBTN, '小さいボタン', 'CP購入、ブショーデュエルなどのボタンを小さくします', 0);
        ccreateCheckBox(td4, 'OPT_TIMER_DEPOT', OPT_TIMER_DEPOT, 'ブラ三タイマー格納', '浮浪プログラマ氏のブラウザ三国志タイマーをサイドボックスに格納します', 0);
        if (isNarrow) ccreateCheckBox(td4, 'OPT_YOROZU', OPT_YOROZU, 'ヨロズダス引き忘れ防止', 'ヨロズダスの回数がリセットされると通知します', 0);
        ccreateCheckBox(td4, 'OPT_BOOKMARK', OPT_BOOKMARK, 'ブックマーク', '領地、君主、同盟へのリンクを保存できます', 0);
        ccreateTextBox(td4, 'OPT_BOOKMARK_FONT_SIZE', OPT_BOOKMARK_FONT_SIZE, 'フォントサイズ', 'ブックマークのフォントサイズを指定します（初期値：10）', 2, 18);
        ccreateCheckBox(td4, 'OPT_MEMO', OPT_MEMO, 'メモ機能', '全画面で利用可能なメモ機能です', 0);
        ccreateTextBox(td4, 'OPT_MEMO_FONT_SIZE', OPT_MEMO_FONT_SIZE, 'フォントサイズ', 'メモのフォントサイズを指定します（初期値：10）', 2, 18);
        ccreateTextBox(td4, 'OPT_MEMO_WIDTH', OPT_MEMO_WIDTH, 'メモ幅', 'メモの幅を指定します（初期値：20）', 4, 18);
        ccreateTextBox(td4, 'OPT_MEMO_HEIGHT', OPT_MEMO_HEIGHT, 'メモ高', 'メモの高さを指定します（初期値：5）', 4, 18);
        ccreateTextBox(td4, 'OPT_MEMO_COUNT', OPT_MEMO_COUNT, 'メモ数(1-5)', 'メモ欄の数を指定します（初期値：1）', 2, 18);

        ccreateButton(oc, '保存', '設定内容を保存します', function() {saveOptions();});
        ccreateButton(oc, '閉じる', '設定内容を保存せずに閉じます', function() {deleteOptionsHtml();});
        ccreateButton(oc, 'ブックマークの直接編集', 'ブックマークをテキストとして編集します', function(event) {bookmarkList(event);});
        ccreateButton(oc, 'ブックマークの消去', 'ブックマークの内容を初期化します', function() {resetBookmark();});
        ccreateButton(oc, '同盟員座標の消去', '同盟員座標をすべて初期化します', function() {resetUserXY();});
        ccreateButton(oc, '★/レベル情報の消去', '君主プロフィールの★情報と領地レベル情報をすべて初期化します', function() {resetUserStar();});
    }

    function createDistanceBox(container, items, num) {
        var sels = ['その他', '無し', '剣兵(6)',
                    '槍兵(7)', '弓兵(5)', '騎兵(12)', '斥候(9)', '衝車(3)',
                    '矛槍兵(10)', '弩兵(8)', '近衛騎兵(15)', '斥候騎兵(20)', '投石機(6)'];
        for (var i = 0; i < num; i++) {
            var src = '';
            if (sels.indexOf(items[i]) != -1) src = items[i];
            var cb = ccreateComboBox(container, 'OPT_DISTANCE_CB' + i, sels, src, '表示' + (i+1), (i+1) + '行目の表示', 20);

            var tb = d.createElement('input');
            tb.type = 'text';
            tb.id = 'OPT_DISTANCE_TX' + i;
            tb.title = '例)「高速騎馬武将(50)」のように、半角カッコ内に移速を記入して下さい';
            if (src == '') {
                tb.value = items[i];
            } else {
                tb.disabled ='disabled';
            }
            tb.size = 12;

            cb.parentNode.appendChild(d.createTextNode('\u00A0'));
            cb.parentNode.appendChild(tb);
            (function(no) {
                $e(cb, 'change', function() {
                    var cb = $('OPT_DISTANCE_CB' + no);
                    var tb = $('OPT_DISTANCE_TX' + no);
                    if (!cb || !tb) return;
                    if (cb.value == sels[0]) {
                        tb.disabled ='';
                    } else {
                        tb.disabled ='disabled';
                    }
                });
            })(i);
        }
    }

    function getDistanceBox(num) {
        var ret = new Array();
        for (var i = 0; i < num; i++) {
            var cb = $('OPT_DISTANCE_CB' + i);
            var tb = $('OPT_DISTANCE_TX' + i);
            if (!cb || !tb) return null;
            if (cb.value == 'その他') {
                ret.push(tb.value);
            } else if (cb.value == '無し') {
                ret.push('');
            } else {
                ret.push(cb.value);
            }
        }
        return ret;
    }

    //建築表示処理
    function disp_village() {
        if (location.pathname != '/village.php') {
            return ;
        }

        //LVごとの建築コスト
        //資源施設
        var cost_wood = [
            [10, 35, 40, 15],
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
        //軍事施設
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
        var cost_daisyukusya = [
            [200, 114, 200, 438],
            [320, 183, 320, 701],
            [512, 293, 512, 1121],
            [768, 439, 768, 1682],
            [1152, 658, 1152, 2523],
            [1728, 987, 1728, 3784],
            [2419, 1382, 2419, 5298],
            [3387, 1935, 3387, 7418],
            [4741, 2709, 4741, 10385],
            [6637, 3793, 6637, 14538],
            [8628, 4930, 8628, 18900],
            [11217, 6409, 11217, 24570],
            [14582, 8332, 14582, 31941],
            [18956, 11735, 18956, 40620],
            [25817, 16429, 25817, 49286],
            [32271, 22003, 32271, 60141],
            [42172, 29337, 42172, 69675],
            [52715, 38963, 52715, 84803],
            [66009, 49506, 66009, 93512],
            [79211, 62708, 79211, 108914]
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
        var cost_enseikunren = [
            [2884, 4486, 5977, 2723],
            [4614, 7177, 9484, 4357],
            [7382, 11483, 15174, 6972],
            [11811, 18373, 24279, 11155],
            [18898, 29397, 38846, 17848],
            [28347, 44096, 58269, 26772],
            [42521, 66143, 87404, 40158],
            [63781, 99215, 131105, 60238],
            [89294, 138901, 183548, 84333],
            [125011, 194461, 256967, 118066],
            [175015, 272246, 359754, 165292],
            [227520, 353920, 467680, 214880],
            [295776, 460096, 607984, 279344],
            [384509, 598125, 790379, 363147],
            [512678, 692116, 897187, 461410],
            [645974, 830539, 1045863, 553692],
            [812082, 959734, 1218123, 701344],
            [1018794, 1151680, 1417453, 841613],
            [1275708, 1382016, 1647789, 1009935],
            [1594635, 1658420, 1913561, 1211922]
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
        var cost_mihari = [
            [600, 840, 600, 360],
            [960, 1344, 960, 576],
            [1536, 2150, 1536, 922],
            [2458, 3441, 2458, 1475],
            [3932, 5505, 3932, 2359],
            [6291, 8808, 6291, 3775],
            [9437, 13212, 9437, 5662],
            [14156, 19818, 14156, 8493],
            [21233, 29727, 21233, 12740],
            [31850, 44590, 31850, 19110],
            [44590, 62426, 44590, 26754],
            [62426, 87396, 62426, 37456],
            [87397, 122355, 87397, 52438],
            [122355, 171297, 122355, 73413],
            [159062, 222686, 159062, 95437],
            [206780, 289492, 206780, 124068],
            [268814, 376340, 268814, 161288],
            [349458, 489242, 349458, 209675],
            [419350, 587090, 419350, 251610],
            [503220, 704508, 503220, 301932]
        ];
        //一般施設
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
        var cost_syuugyousyo = [
            [1600, 1200, 600, 600],
            [2240, 1680, 840, 840],
            [3136, 2352, 1176, 1176],
            [4390, 3293, 1646, 1646],
            [6146, 4610, 2305, 2305],
            [8605, 6454, 3227, 3227],
            [11186, 8390, 4195, 4195],
            [14542, 10907, 5453, 5453],
            [18905, 14179, 7089, 7089],
            [24577, 18433, 9216, 9216],
            [31950, 23963, 11981, 11981],
            [38340, 28755, 14378, 14378],
            [46008, 34506, 17253, 17253],
            [55210, 41407, 20704, 20704],
            [66252, 49689, 24844, 24844],
            [72877, 54658, 27329, 27329],
            [80164, 60123, 30062, 30062],
            [88181, 66136, 33068, 33068],
            [96999, 72749, 36375, 36375],
            [106699, 80024, 40012, 40012]
        ];
        //城・砦・村
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

        var costs = [];
        costs['伐採所'] = cost_wood;
        costs['石切り場'] = cost_stone;
        costs['製鉄所'] = cost_iron;
        costs['畑'] = cost_rice;
        costs['練兵所'] = cost_renpei;
        costs['兵舎'] = cost_heisya;
        costs['弓兵舎'] = cost_yumi;
        costs['厩舎'] = cost_uma;
        costs['兵器工房'] = cost_heiki;
        costs['宿舎'] = cost_syukusya;
        costs['大宿舎'] = cost_daisyukusya;
        costs['訓練所'] = cost_kunren;
        costs['遠征訓練所'] = cost_enseikunren;
        costs['鍛冶場'] = cost_kajiba;
        costs['防具工場'] = cost_bougu;
        costs['見張り台'] = cost_mihari;
        costs['倉庫'] = cost_souko;
        costs['研究所'] = cost_kenkyu;
        costs['市場'] = cost_ichiba;
        costs['水車'] = cost_suisya;
        costs['工場'] = cost_kojo;
        costs['銅雀台'] = cost_doujaku;
        costs['修行所'] = cost_syuugyousyo;
        costs['城'] = cost_shiro;
        costs['砦'] = cost_toride;
        costs['村'] = cost_mura;

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

        prepareForDisplayBuildStatus(); //Lv0表示

        var xybld_a = new Array();
        var allbld = $x('//li/span[contains(concat(" ", normalize-space(@class), " "), " buildStatus ") and contains(text(), "建設")]/a');
        for (var idx = 0; idx < allbld.length; idx++) {
            var tmp = allbld[idx].href.match(/x=([\-0-9]+).*y=([\-0-9]+)/);
            if (tmp != null) {
                xybld_a.push(tmp);
            }
        }

        allbld = $x('//li[contains(text(), "削除中")]/span[contains(concat(" ", normalize-space(@class), " "), " buildStatus ")]/a');
        var xybld_d = new Array();
        for (var idx = 0; idx < allbld.length; idx++) {
            var tmp = allbld[idx].href.match(/x=([\-0-9]+).*y=([\-0-9]+)/);
            if (tmp != null) {
                xybld_d.push(tmp);
            }
        }

        var allarea = $x('//area');
        for (var idx = 0; idx < allarea.length; idx++) {
            var title = allarea[idx].getAttribute('title').match(/^(.*) LV\.([0-9]+)$/);
            if (!title) {
                title = [allarea[idx].getAttribute('title'), allarea[idx].getAttribute('title'), 0];
            }
            if (costs[title[1]]) {
                if (costs[title[1]][title[2]]) {
                    var xy = allarea[idx].getAttribute('href').match(/^.*(?:\?|&)x=([\-0-9]+)&y=([\-0-9]+)+(?:&[^=]+=[^&]*)*#?.*/);
                    var level = parseInt(title[2], 10);
                    var blding = 0;
                    var dlting = 0;
                    for (var xxx = 0; xxx < xybld_a.length; xxx++) {
                        if (xy[1] == xybld_a[xxx][1] && xy[2] == xybld_a[xxx][2]) {
                            level ++ ;
                            blding += 2;
                        }
                    }
                    for (var xxx = 0; xxx < xybld_d.length; xxx++) {
                        if (xy[1] == xybld_d[xxx][1] && xy[2] == xybld_d[xxx][2]) {
                            dlting ++;
                        }
                    }
                    try {
                        if (costs[title[1]].length <= level || // maximum level reached
                            RES_NOW.wood < costs[title[1]][level][0] ||
                            RES_NOW.stone< costs[title[1]][level][1] ||
                            RES_NOW.iron < costs[title[1]][level][2] ||
                            RES_NOW.rice < costs[title[1]][level][3]) {
                                //LV表示を黄色に
                                var thisimg = getLevelImageHTML(xy[1], xy[2], 'mapicon');
                                if (thisimg) {
                                    thisimg.src = img_lv[parseInt(title[2], 10)];
                                }
                        }
                    } catch(e) {
                        GM_log('catched');
                    }
                    if ((blding || dlting) && !OPT_BLINKBLD) {
                        //建築中
                        var thisimg = getLevelImageHTML(xy[1], xy[2], 'mapicon');
                        if (thisimg) {
                            thisimg.style.outlineColor = (blding) ? 'red' : 'blue';
                            thisimg.style.outlineStyle = 'dotted';
                            thisimg.style.outlineWidth = '2px';
                        }
                    }
                }
            }
        }
        if (OPT_BLINKBLD) displayBuildStatus();

        function getLevelImageHTML(x, y, cls) {
            var xdom = '';
            var no = (101 + parseInt(x, 10) * 7 + parseInt(y, 10)).toString().substr(-2);
            xdom = '//img[contains(concat(" ", normalize-space(@class), " "), " ' + cls + no + ' ")]';

            return $s(xdom, $('maps'));
        }
    }

    //メモ処理
    function disp_memo() {
        var icon_memo = 'data:image/gif;base64,'+
                        'R0lGODlhEQAPAKIAAP///+np6dXV1VpaWlhYWEVFRURERDMzMyH5BAQUAP8ALAAAAAARAA8AAAM7'+
                        'eLrcXGTIOYo7RITNAyEWMwRAaQIj0YynOaAr2aKwKLfvEM+0bvO53Sz4G9YWEMrEcCziLknlwHCp'+
                        'NhIAOw==';

        var cnt = parseInt(OPT_MEMO_COUNT, 10);
        if (isNaN(''+cnt) || cnt < 1) cnt = 1;
        if (cnt > 5) cnt = 5;
        for (var i = 0; i < cnt; i++) {
            createMemoTab(i);
        }

        function createMemoTab(no) {
            if (!no) no = '';

            var title = 'メモ';
            if (no) title += (no + 1);
            var elms = ccreateSideBox('beyond_sidebox_memo' + no, icon_memo, title);

            var ta = d.createElement('textarea');
            ta.id = 'beyond_memobox' + no;
            ta.rows = OPT_MEMO_HEIGHT;
            ta.cols = OPT_MEMO_WIDTH;

            ta.style.fontSize= OPT_MEMO_FONT_SIZE + 'px';
            ta.value= cloadData('memo' + no, '', true);

            elms.sideBoxInner.appendChild(ta);

            var sv = d.createElement('a');
            sv.href = 'javascript:void(0);';
            sv.innerHTML = '保存';
            $e(sv, 'click', function() {
                var memoBox = $('beyond_memobox' + no);
                if (memoBox) {
                    csaveData('memo' + no, memoBox.value, true);
                    alert('保存しました');
                }
            });
            var dv = d.createElement('div');
            dv.appendChild(sv);
            elms.sideBoxInner.appendChild(dv);
        }
    }

    //拠点リンク機能
    function disp_baseLink() {
        var elm = $s('id("lodgment")/div[contains(concat(" ", normalize-space(@class), " "), " floatInner ")] | //div[contains(concat(" ", normalize-space(@class), " "), " sideBoxInner ") and contains(concat(" ", normalize-space(@class), " "), " basename ")]');
        if (!elm) return;

        var bases = $x('.//li/child::*', elm);

        for (var i = 0; i < bases.length; i++) {
            addBaseLink(bases[i]);
        }


        $x('//a[contains(concat(" ", normalize-space(@class), " "), " map-basing ")]').forEach(function(bookmark) {
            bookmark.style.display = 'none';
        });

        function addBaseLink(elem) {

            var thistitle = elem.title;
            if (!thistitle) return;

            var xy = thistitle.match(/^.*\(([\-0-9]+)\,([\-0-9]+)+\)$/);
            if (!xy) return;

            var a_v, a_n, a_u, a_t, a_m;

            var a_v_img = d.createElement('img');
            a_v_img.src = img_mura;
            a_v_img.style.paddingLeft = '2px';
            var a_n_img = d.createElement('img');
            a_n_img.src = img_naisei;
            a_n_img.style.paddingLeft = '2px';
            var a_u_img = d.createElement('img');
            a_u_img.src = img_unit;
            a_u_img.style.paddingLeft = '2px';
            var a_t_img = d.createElement('img');
            a_t_img.src = img_troop;
            a_t_img.style.paddingLeft = '2px';
            var a_m_img = d.createElement('img');
            a_m_img.src = img_map;
            a_m_img.style.paddingLeft = '2px';

            a_v = d.createElement('a');
            a_v.title = '拠点を操作';
            a_v.appendChild(a_v_img);
            a_n = d.createElement('a');
            a_n.title = '拠点の内政を設定';
            a_n.appendChild(a_n_img);
            a_u = d.createElement('a');
            a_u.title = '拠点の兵士を管理';
            a_u.appendChild(a_u_img);
            a_t = d.createElement('a');
            a_t.href = caddSessionId('/facility/castle_send_troop.php?x=' + xy[1] + '&y=' + xy[2] + '&radio_move_type=301');
            a_t.title = '拠点に援軍を送る';
            a_t.appendChild(a_t_img);
            a_m = d.createElement('a');
            a_m.href = caddSessionId('/map.php?x=' + xy[1] + '&y=' + xy[2]);
            a_m.title = '拠点を中心に地図を表示' ;
            a_m.appendChild(a_m_img);

            if (elem.href) {
                var id = elem.href.match(/^.*\?village_id=([0-9]+)[^&]*/);
                if (id) {
                    a_v.href = caddSessionId('/village_change.php?village_id=' + id[1] + '&from=menu&page=/village.php');
                    a_n.href = caddSessionId('/village_change.php?village_id=' + id[1] + '&from=menu&page=/card/domestic_setting.php');
                    a_u.href = caddSessionId('/village_change.php?village_id=' + id[1] + '&from=menu&page=/facility/unit_status.php');
                }
            } else {
                a_v.href = caddSessionId('/village.php');
                a_n.href = caddSessionId('/card/domestic_setting.php');
                a_u.href = caddSessionId('/facility/unit_status.php');
            }

            var spn = d.createElement('span');
            if (0 <= location.pathname.search(/^\/(village|map|big_map|land)\.php/) && !OPT_LARGEICON) {
                spn.style.marginTop = '4px';
            }
            spn.style.noWrap = true;
            //都市画面では拠点リンクを表示しない
            if (location.pathname != '/village.php') {
                spn.appendChild(a_v);
            }
            spn.appendChild(a_n);
            spn.appendChild(a_u);
            if (OPT_CASTLE_AID) spn.appendChild(a_t);
            spn.appendChild(a_m);

            elem.parentNode.insertBefore(spn, elem.nextSibling);

        }
    }

    //ブックマーク
    function disp_bookmark() {
        //暫定的にsplit("\n")で3なら領地リンク、4なら君主リンク、5なら同盟リンクに
        //他の手法を導入すべきだが、既存リンクの保持を容易にするためとりあえず
        if (location.pathname == '/land.php') {
            var div = $('tMenu');
            if (div) {
                var lnk = d.createElement('a');
                lnk.href = 'javascript:void(0);';
                lnk.innerHTML = '領地リンクの追加';
                div.appendChild(lnk);
                $e(lnk, 'click', function() {saveBookmark();});
            }
        } else if (location.pathname == '/user/' || location.pathname == '/user/index.php') {
            if (location.search.length < 1) return;

            var table = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]');
            if (table) {
                var lnk = d.createElement('a');
                lnk.href = 'javascript:void(0);';
                lnk.innerHTML = '君主リンクの追加';
                $e(lnk, 'click', function() {saveBookmark();});
                table.parentNode.insertBefore(lnk, table.nextSibling);
            }
        } else if (location.pathname == '/alliance/info.php') {
            var table = $s('//table[contains(concat(" ", normalize-space(@class), " "), " tables ")]');
            if (table) {
                var lnk = d.createElement('a');
                lnk.href = 'javascript:void(0);';
                lnk.innerHTML = '同盟リンクの追加　　';
                $e(lnk, 'click', function() {saveBookmark();});
                table.parentNode.insertBefore(lnk, table.nextSibling);
            }
        }

        var icon_map = 'data:image/gif;base64,'+
                    'R0lGODlhEQAPALMAANO3SayTQ3drPFxQsFNTUUA3uTMzMxoamBgYnxsNxg0G8ggC9AAA/wAAAAAA'+
                    'AAAAACH5BAQUAP8ALAAAAAARAA8AAARL0MhJq50InVsT+wknIctnIhZZmmZYIWy8CAFATLGpADwQ'+
                    'TCuGYljo9W4Gz2dnNP4MMNOgaQRKqT3BJJFACLC9C1bLqfWeIpqATIkAADs=';

        var elms = ccreateSideBox('beyond_sidebox_xylink', icon_map, 'ブックマーク');
        elms.sideBoxInner.id = 'beyond_sidebox_xylink_inner';

        resetBookmark();
    }

    function saveBookmark() {
        if (location.pathname == '/land.php') {
            var allDivs, thisDiv;
            var v_name = '';

            var basename = $s('//span[contains(concat(" ", normalize-space(@class), " "), " basename ")]');

            var xy = location.search.match(/^\?x=([\-0-9]+)\&y=([\-0-9]+)[^&]*/);

            if (basename) {
                v_name = basename.innerHTML;
                if (v_name =='空き地') {
                    v_name += xy[1] + ',' + xy[2];
                }
            }

            v_name = prompt('表示名を入力してください', v_name);
            if (!v_name) return;

            var bookmarks = cloadData('links', 0, true);
            var value = v_name + '\n' + xy[1] + '\n' + xy[2];
            csaveData('link' + bookmarks, value, true);
            bookmarks++;
            csaveData('links', bookmarks, true);

            resetBookmark();
        } else if (location.pathname == '/user/' || location.pathname == '/user/index.php') {
            if (location.search.length < 1) return;

            var user_id = URL_PARAM.user_id;
            var tmp = d.body.innerHTML.match(/<td>君主<\/td>[^<]*?<td>(.+)<\/td>/);
            if (!tmp) return;
            var user_name = tmp[1];

            var comment = '';

            disp_name = prompt('表示名を入力してください', user_name);
            if (!disp_name) return;

            comment = prompt('コメントを入力してください', comment);

            var bookmarks = cloadData('links', 0, true);
            var value = user_id + '\n' + user_name + '\n' + disp_name + '\n' + comment;
            csaveData('link' + bookmarks, value, true);
            bookmarks++;
            csaveData('links', bookmarks, true);

            resetBookmark();
        } else if (location.pathname == '/alliance/info.php') {
            var ally_id = URL_PARAM.id;
            var tmp = d.body.innerHTML.match(/<th class=\"ttl w80\">略称<\/th>[^<]*?<td class=\"contents\">(.+)<\/td>/);
            if (!tmp) return;
            var ally_name = tmp[1];

            var comment = '';

            disp_name = prompt('表示名を入力してください', ally_name);
            if (!disp_name) return;

            comment = prompt('コメントを入力してください', comment);

            var bookmarks = cloadData('links', 0, true);
            var value = ally_id + '\n' + ally_name + '\n' + disp_name + '\n' + comment + '\n同盟';
            csaveData('link' + bookmarks, value, true);
            bookmarks++;
            csaveData('links', bookmarks, true);

            resetBookmark();
        }
    }

    function configBookmarkClose() {
        var elem = $('beyond_bookmarkWindow');
        if (!elem) return;
        $('beyond_floatpanel').removeChild(elem);
    }

    function configBookmark(n, evt) {
        var tmp = cloadData('link' + n, '', true);
        if (!tmp) return ;

        configBookmarkClose();

        data = tmp.split('\n');

        var lw = d.createElement('div');
        lw.id = 'beyond_bookmarkWindow';
        lw.style.position = 'absolute';
        if (data.length == 3) {
            lw.style.backgroundColor = 'thistle';
            lw.style.border = 'outset 2px thistle';
        } else if (data.length == 4) {
            lw.style.backgroundColor = 'lightgreen';
            lw.style.border = 'outset 2px lightgreen';
        } else if (data.length == 5) {
            lw.style.backgroundColor = 'lightskyblue';
            lw.style.border = 'outset 2px lightskyblue';
        }
        lw.style.fontSize = '10px';
        lw.style.padding = '10px';
        lw.style.zIndex = 1000;
        lw.style.left = evt.pageX -60 + 'px';
        lw.style.top = evt.pageY - 100 + 'px';

        if (data.length == 3) {
            ccreateTextBox(lw, 'LINK_TITLE', data[0], '名称', '名称', 20, 0);
            ccreateTextBox(lw, 'LINK_X', data[1], 'X座標', 'X座標', 10, 0);
            ccreateTextBox(lw, 'LINK_Y', data[2], 'Y座標', 'Y座標', 10, 0);
        } else if (data.length == 4 || data.length == 5) {
            var dv = d.createElement('div');
            dv.innerHTML = 'id=' + data[0] + '　　' + data[1] + '<br>';
            lw.appendChild(dv);
            ccreateTextBox(lw, 'LINK_TITLE', data[2], '表示名', '表示名', 20, 0);
            ccreateTextBox(lw, 'LINK_COMMENT', data[3], 'コメント', 'コメント', 20, 0);
        }
        //設定ボタン
        ccreateButton(lw, '保存', '内容を保存します', function() {
            var v = '';
            if (data.length == 3) {
                v = cgetTextBoxValue('LINK_TITLE') + '\n'
                    + cgetTextBoxValue('LINK_X') + '\n'
                    + cgetTextBoxValue('LINK_Y');
            } else if (data.length == 4) {
                v = data[0] + '\n' + data[1] + '\n'
                    + cgetTextBoxValue('LINK_TITLE') + '\n'
                    + cgetTextBoxValue('LINK_COMMENT');
            } else if (data.length == 5) {
                v = data[0] + '\n' + data[1] + '\n'
                    + cgetTextBoxValue('LINK_TITLE') + '\n'
                    + cgetTextBoxValue('LINK_COMMENT') + '\n同盟';
            }
            csaveData('link' + n, v, true);
            configBookmarkClose();
            resetBookmark();
        });

        //削除
        ccreateButton(lw, '削除', '削除', function() {
            if (!confirm('削除してよろしいですか？')) return false;

            var bookmarks = cloadData('links', 0, true);
            for (var i = n+1; i < bookmarks; i++) {
                var tmp = cloadData('link' + i, '', true);
                csaveData('link' + (i-1), tmp, true);
            }
            csaveData('links', bookmarks-1, true);
            configBookmarkClose();
            resetBookmark();
        });

        //上に移動
        if (n != 0) {
            ccreateButton(lw, '▲', '上に移動', function() {
                var tmp = cloadData('link' + (n-1), '', true);
                csaveData('link' + (n-1), cloadData('link' + n, '', true), true);
                csaveData('link' + n, tmp, true);
                configBookmarkClose();
                resetBookmark();
            });
        }
        //下に移動
        var bookmarks = cloadData('links', 0, true);
        if (n + 1 < bookmarks) {
            ccreateButton(lw, '▼', '下に移動', function() {
                var tmp = cloadData('link' + (n+1), '', true);
                csaveData('link' + (n+1), cloadData('link' + n, '', true), true);
                csaveData('link' + n, tmp, true);
                configBookmarkClose();
                resetBookmark();
            });
        }

        //閉じる
        ccreateButton(lw, '閉じる', '閉じる', function() {configBookmarkClose();});

        $('beyond_floatpanel').appendChild(lw);
    }

    function resetBookmark() {
        var ul = $('beyond_sidebox_xylink_ul');
        if (ul) {
            ul.parentNode.removeChild(ul);
        }
        ul = d.createElement('ul');
        ul.id = 'beyond_sidebox_xylink_ul';

        var bookmarks = cloadData('links', 0, true);
        for (var i = 0; i < bookmarks; i++) {
            var tmp = cloadData('link' + i, '', true);
            if (tmp != '') {
                var li = d.createElement('li');

                var data = tmp.split('\n');

                if (data.length == 3) {
                    //領地リンク
                    var link1 = d.createElement('a');
                    link1.href = caddSessionId('/land.php?x=' + data[1] + '&y=' + data[2]);
                    link1.title = '表示(' + data[1] + ',' + data[2] + ')';
                    link1.innerHTML = data[0];
                    link1.style.fontSize = OPT_BOOKMARK_FONT_SIZE + 'px';

                    var link2 = d.createElement('a');
                    link2.href = caddSessionId('/map.php?x=' + data[1] + '&y=' + data[2]);
                    link2.title='(' + data[1] + ',' + data[2] + ')を中心に地図を表示';

                    var a_m_img = d.createElement('img');
                    a_m_img.src = img_map;
                    link2.appendChild(a_m_img);

                    var m = '';
                    var dist = cgetDistanceFromBase(data[1], data[2]);
                    if (dist != -1) {
                        m ='　距離[' + dist.toFixed(2) + ']';
                    }
                    var link3 = d.createElement('a');
                    link3.href = caddSessionId('/facility/castle_send_troop.php?x=' + data[1] + '&y=' + data[2]);
                    link3.title = '(' + data[1] + ',' + data[2] + ')に出兵する' + m;

                    var a_s_img = d.createElement('img');
                    a_s_img.src = img_troop;
                    link3.appendChild(a_s_img);

                    var link4 = d.createElement('a');
                    link4.href='javascript:void(0)';
                    link4.title='設定';

                    var a_d_img = d.createElement('img');
                    a_d_img.src = img_edit;
                    link4.appendChild(a_d_img);
                    (function(n) {
                        $e(link4, 'click', function(event) {configBookmark(n, event);});
                    })(i);

                    li.appendChild(link1);
                    li.appendChild(link2);
                    li.appendChild(link3);
                    li.appendChild(link4);
                    ul.appendChild(li);
                } else if (data.length == 4) {
                    //君主リンク
                    var img = d.createElement('img');
                    img.src = img_user;
                    img.style.paddingLeft = '0px';
                    img.style.paddingRight = '1px';
                    li.appendChild(img);

                    var link1 = d.createElement('a');
                    link1.href = caddSessionId('/user/index.php?user_id=' + data[0]);
                    link1.title = data[3];
                    link1.innerHTML = data[2];
                    link1.style.fontSize = OPT_BOOKMARK_FONT_SIZE + 'px';

                    var link2 = d.createElement('a');
                    link2.href=caddSessionId('/message/new.php?user_id=' + data[0]);
                    link2.title='[' + data[1] + ']宛に書簡を送る';

                    var a_m_img = d.createElement('img');
                    a_m_img.src = img_mail;
                    link2.appendChild(a_m_img);

                    var link3 = d.createElement('a');
                    link3.href='javascript:void(0)';
                    link3.title='設定';

                    var a_d_img = d.createElement('img');
                    a_d_img.src = img_edit;
                    link3.appendChild(a_d_img);
                    (function(n) {
                        $e(link3, 'click', function(event) {configBookmark(n, event);});
                    })(i);

                    li.appendChild(link1);
                    li.appendChild(link2);
                    li.appendChild(link3);
                    ul.appendChild(li);
                } else if (data.length == 5) {
                    //同盟リンク
                    var img = d.createElement('img');
                    img.src = img_ally;
                    img.style.paddingLeft = '0px';
                    img.style.paddingRight = '1px';
                    li.appendChild(img);

                    var link1 = d.createElement('a');
                    link1.href = caddSessionId('/alliance/info.php?id=' + data[0]);
                    link1.title = data[3];
                    link1.innerHTML = data[2];
                    link1.style.fontSize = OPT_BOOKMARK_FONT_SIZE + 'px';

                    var link3 = d.createElement('a');
                    link3.href='javascript:void(0)';
                    link3.title='設定';

                    var a_d_img = d.createElement('img');
                    a_d_img.src = img_edit;
                    link3.appendChild(a_d_img);
                    (function(n) {
                        $e(link3, 'click', function(event) {configBookmark(n, event);});
                    })(i);

                    li.appendChild(link1);
                    li.appendChild(link3);
                    ul.appendChild(li);
                }
            }
        }

        $('beyond_sidebox_xylink_inner').appendChild(ul);

    }

    //ブックマークの読み込み・保存
    function bookmarkList(evt) {
        if ($('beyond_SaveBookmarkWindow')) return;

        var mc = d.createElement('div');
        mc.id = 'beyond_SaveBookmarkWindow';
        mc.style.position = 'absolute';
        mc.style.backgroundColor = 'blueviolet';
        mc.style.border = 'outset 2px blueviolet';
        mc.style.fontSize = '12px';
        mc.style.padding = '15px';
        mc.style.zIndex = 1000+1;
        mc.style.left = evt.pageX -100 + 'px';
        mc.style.top = evt.pageY - 220 + 'px';
        var ta = d.createElement('textarea');
        ta.id = 'beyond_SaveBookmarkWindow_text';
        ta.rows = 10;
        ta.cols = 40;
        var txt = '';
        var bookmarks = cloadData('links', 0, true);
        for (var i = 0; i < bookmarks; i++) {
            var tmp = cloadData('link' + i, '', true);
            if (tmp) {
                txt += tmp.replace(/\n/g, '\t') + '\n';
            }
        }
        ta.value = txt;

        mc.appendChild(ta);
        $e(ta, 'keydown', function(event) {
            //TAB入力
            var kC = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
            if (kC == 9 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
                var oS = this.scrollTop;
                var sS = this.selectionStart;
                var sE = this.selectionEnd;
                this.value = this.value.substring(0, sS) + '\t' + this.value.substr(sE);
                this.setSelectionRange(sS + 1, sS + 1);
                this.focus();
                this.scrollTop = oS;
                if (event.preventDefault) {
                    event.preventDefault();
                }
                return false;
            }
            return true;
        });

        var sv = d.createElement('a');
        sv.href = 'javascript:void(0);';
        sv.innerHTML = '保存';
        $e(sv, 'click', function() {
            if (confirm('上書き保存します。よろしいですか？') == false) return;
            var ta = $('beyond_SaveBookmarkWindow_text');
            if (ta) {
                var lines = ta.value.split('\n');
                var saveLines = new Array();
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i] == '') continue;
                    var dat = lines[i].split('\t');
                    if (dat.length != 3 && dat.length != 4 && dat.length != 5) {
                        alert('解析に失敗しました。処理を中断します。\n( ' + lines[i] + ' )');
                        return;
                    }
                    //チェック
                    if (dat.length == 3) {
                        if (!dat[1].match(/[\-0-9]+/g)  || !dat[2].match(/[\-0-9]+/g)) {
                            alert('解析に失敗しました。処理を中断します。\n( ' + lines[i] + ' )');
                            return;
                        }
                    } else if (dat.length == 4) {
                        if (dat[3] == '' && dat[1].match(/[\-0-9]+/g) && dat[2].match(/[\-0-9]+/g)) {
                            dat.pop();
                        } else  if (!dat[0].match(/[\-0-9]+/g)) {
                            alert('解析に失敗しました。処理を中断します。\n( ' + lines[i] + ' )');
                            return;
                        }
                    } else if (dat.length == 5) {
                        if (dat[3] == '' && dat[1].match(/[\-0-9]+/g) && dat[2].match(/[\-0-9]+/g)) {
                            dat.pop();
                        } else  if (!dat[0].match(/[\-0-9]+/g)) {
                            alert('解析に失敗しました。処理を中断します。\n( ' + lines[i] + ' )');
                            return;
                        }
                    } else {
                        alert('解析に失敗しました。処理を中断します。\n( ' + lines[i] + ' )');
                        return;
                    }
                    var linedata = '';
                    for (var j = 0; j < dat.length; j++) {
                        dat[j] = dat[j].replace(/(^\s+)|(\s+$)/g, '');
                        if (linedata != '') {
                            linedata += '\n';
                        }
                        linedata += dat[j];
                    }
                    saveLines.push(linedata);
                }

                //削除
                var bookmarks = cloadData('links', 0, true);
                for (var i = 0; i < bookmarks; i++) {
                    cdelData('link' + i, true);
                }
                //追加
                for (var i = 0; i < saveLines.length; i++) {
                    csaveData('link' + i, saveLines[i], true);
                }
                csaveData('links', saveLines.length, true);

                alert('上書き保存しました');
                resetBookmark();

                // 保存後にウィンドウを閉じる
                var mc = $('beyond_SaveBookmarkWindow');
                if (mc) {
                    mc.parentNode.removeChild(mc);
                }
            }
        });

        var cl = d.createElement('a');
        cl.href = 'javascript:void(0);';
        cl.innerHTML = '閉じる';
        $e(cl, 'click', function() {
            var mc = $('beyond_SaveBookmarkWindow');
            if (mc) {
                mc.parentNode.removeChild(mc);
            }
        });
        var dv = d.createElement('div');
        dv.appendChild(sv);
        dv.appendChild(d.createTextNode(' '));
        dv.appendChild(cl);

        mc.appendChild(dv);
        $('beyond_floatpanel').appendChild(mc);
    }

    //座標リンク処理
    function disp_XYLink() {
    
//----------------------------------------------------------------------
//----------------------------------------------------------------------    
    
    
    
        var flg_profile_xy = false;
        var flg_include_a = false;

        //1行コメント
        var comment = $x('id("commentList")//tr/td[2]');

        for (var i = 0; i < comment.length; i++) {
            setXYLink(comment[i]);
        }

        //各エレメント
        var targetPath = new Array();

        if (location.pathname == '/alliance/chat_view.php') {
            targetPath.push('//div[contains(concat(" ", normalize-space(@class), " "), " hitokotoList ")]/p[2]');
        }
        if (location.pathname == '/alliance/info.php') {
            targetPath.push('//tr[th[contains(text(), "コメント")]]/td');
        }
        if (location.pathname == '/message/detail.php') {
            targetPath.push('//tr[th[contains(text(), "件名")]]/td');
            targetPath.push('//tr[th[contains(text(), "本文")]]/td');
        }
        if (location.pathname == '/bbs/res_view.php' ||
            location.pathname == '/bbs/personal_res_view.php') {
            targetPath.push('//th[contains(concat(" ", normalize-space(@class), " "), " mainTtl ")]/div[contains(concat(" ", normalize-space(@class), " "), " threadTtl ")]');
            targetPath.push('//td[contains(concat(" ", normalize-space(@class), " "), " contents ")]');
            targetPath.push('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[2]/td[1]');
        }
        if (location.pathname == '/user/index.php' || location.pathname == '/user/') {
            targetPath.push('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[position()>12]/td[2]');
            flg_profile_xy = true;
        }

        for (var i = 0; i < targetPath.length; i++) {
            var elms = $x(targetPath[i]);
            for (var j = 0; j < elms.length; j++) {
                setXYLink(elms[j]);
            }
        }

        function setXYLink(elm) {
            var tmpHTML = elm.innerHTML;

            var reg = /[\(|（|【]([\-0-9０-９]+)( *[,&、・，] *)([\-0-9０-９]+)[\)|）|】]/g;
            if (OPT_XYLINK_NK || flg_profile_xy) {
                reg = /([\-0-9０-９]+)( *[\,&、・，] *)([\-0-9０-９]+)/g;
            }

            var elm_child_a = null;
            if (flg_include_a) {
                elm_child_a = $s('descendant::a', elm);
            }

            tmpHTML = tmpHTML.replace(reg, XYLinkReg);

            elm.innerHTML = tmpHTML;

            function XYLinkReg() {
            
            
            
            
            
            
            

                var img_send = IMG_DIR + 'report/icon_go.gif';
                var img_mp = IMG_DIR + 'report/icon_scout.gif';
                var m = '';
                var dist = cgetDistanceFromBase(arguments[1], arguments[3]);
                if (dist != -1) {
                    m = '　距離[' + dist.toFixed(2) + ']';
                }
                var x = toHankaku(arguments[1]);
                var y = toHankaku(arguments[3]);
                var disp = x + arguments[2] + y;
                if (!OPT_XYLINK_NK && !flg_profile_xy) disp = '(' + disp + ')';
                
//console.log(disp);
                
                var txt = '<a href="'+caddSessionId('/land.php?x=' + x + '&y=' + y)+'" title="表示" style="display:inline;">' + disp + '</a>';
                txt += '<a href="'+caddSessionId('/map.php?x=' + x + '&y=' + y)+'" title="この座標を中心に地図を表示" style="display:inline;"><img src="' + img_mp + '" style="width:14px; height:14px; vertical-align:middle;"></a>';
                txt += '<a href="'+caddSessionId('/facility/castle_send_troop.php?x=' + x + '&y=' + y)+'" title="この座標に出兵する' + m + '" style="display:inline;"><img src="' + img_send + '" style="width:14px; height:14px; vertical-align:middle;"></a>';

                //Aの入れ子は連結し直してみる
                if (elm_child_a) {
                    txt = '</a>' + txt + '<a href="' + elm_child_a.href +  '">';
                }

                return txt;

                function toHankaku(str) {
                    return str.replace(/[０-９]/g, function(str) {return String.fromCharCode(str.charCodeAt(0)-65248);});
                }
            }
        }
    }

    //兵力整形
    function disp_TTable() {
        if (location.pathname == '/message/inbox.php' ||
            location.pathname == '/message/outbox.php' ||
            location.pathname == '/message/new.php' ||
            location.pathname == '/bbs/topic_view.php' ||
            location.pathname == '/facility/unit_status.php' ||
            location.pathname == '/facility/castle_send_troop.php') {
            return ;
        }

        //仮対処
        var ta = $x('//textarea');
        for (var i = 0; i < ta.length; i++) {
            if (ta[i].innerHTML != '') return;
        }

        var targetPath = [
            'id("commentList")',
            '//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]',
            '//p[contains(concat(" ", normalize-space(@class), " "), " hitokoto ")]',
        ];

        for (var i = 0; i < targetPath.length; i++) {
            var elms = $x(targetPath[i]);
            for (var j = 0; j < elms.length; j++) {
                setTTable(elms[j]);
            }
        }

        function setTTable(elm) {

            var tmpHTML = elm.innerHTML;
            var reg = /剣兵\s+槍兵\s+弓兵\s+騎兵\s+矛槍兵\s+弩兵\s+近衛騎兵\s+斥候\s+斥候騎兵\s+衝車\s+投石機\s+武将.*(\n兵士\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+).*(\n死傷\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables"><tr><th class="solClass">　</th>' +
                                '<th class="solClass">剣兵</th><th class="solClass">槍兵</th><th class="solClass">弓兵</th><th class="solClass">騎兵</th>' +
                                '<th class="solClass">矛槍兵</th><th class="solClass">弩兵</th><th class="solClass">近衛騎兵</th><th class="solClass">斥候</th>' +
                                '<th class="solClass">斥候騎兵</th><th class="solClass">衝車</th><th class="solClass">投石機</th><th class="solClass">武将</th>' +
                                '</tr><tr><th class="solClass">兵士</th>';
                    for (var i = 2; i <= 13; i++) {
                        txt += '<td>' + arguments[i] + '</td>';
                    }

                    txt += '</tr><tr><th class="solClass">死傷</th>';
                    for (var i = 15; i <= 26; i++) {
                        txt += '<td>' + arguments[i] + '</td>';
                    }
                    txt += '</tr></table>';
                    return txt;
                });

            reg = /剣兵\s+槍兵\s+弓兵\s+騎兵\s+矛槍兵\s+弩兵\s+近衛騎兵\s+斥候\s+斥候騎兵\s+衝車\s+投石機\s+武将.*(\n兵士\s+|\n)(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables"><tr><th class="solClass">　</th>' +
                                '<th class="solClass">剣兵</th><th class="solClass">槍兵</th><th class="solClass">弓兵</th><th class="solClass">騎兵</th>' +
                                '<th class="solClass">矛槍兵</th><th class="solClass">弩兵</th><th class="solClass">近衛騎兵</th><th class="solClass">斥候</th>' +
                                '<th class="solClass">斥候騎兵</th><th class="solClass">衝車</th><th class="solClass">投石機</th><th class="solClass">武将</th>' +
                                '</tr><tr><th class="solClass">兵士</th>';
                    for (var i = 2; i <= 13; i++) {
                        txt += '<td>' + arguments[i] + '</td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

// 2012.07.22 ここから
            // 施設９個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass">' + arguments[4] + '</th>' +
                                '<th class="solClass">' + arguments[5] + '</th>' +
                                '<th class="solClass">' + arguments[6] + '</th>' +
                                '<th class="solClass">' + arguments[7] + '</th>' +
                                '<th class="solClass">' + arguments[8] + '</th>' +
                                '<th class="solClass">' + arguments[9] + '</th>' +
                                '</tr><tr>';
                    for (var i = 10; i <= 18; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設８個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass">' + arguments[4] + '</th>' +
                                '<th class="solClass">' + arguments[5] + '</th>' +
                                '<th class="solClass">' + arguments[6] + '</th>' +
                                '<th class="solClass">' + arguments[7] + '</th>' +
                                '<th class="solClass">' + arguments[8] + '</th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 9; i <= 16; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設７個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass">' + arguments[4] + '</th>' +
                                '<th class="solClass">' + arguments[5] + '</th>' +
                                '<th class="solClass">' + arguments[6] + '</th>' +
                                '<th class="solClass">' + arguments[7] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 8; i <= 14; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設６個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass">' + arguments[4] + '</th>' +
                                '<th class="solClass">' + arguments[5] + '</th>' +
                                '<th class="solClass">' + arguments[6] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 7; i <= 12; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設５個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass">' + arguments[4] + '</th>' +
                                '<th class="solClass">' + arguments[5] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 6; i <= 10; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設４個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass">' + arguments[4] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 5; i <= 8; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設３個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass">' + arguments[3] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 4; i <= 6; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設２個
            reg = /\n(城\s+|砦\s+|村\s+|伐採所\s+|石切り場\s+|製鉄所\s+|畑\s+|倉庫\s+|銅雀台\s+|鍛冶場\s+|防具工場\s+|練兵所\s+|兵舎\s+|弓兵舎\s+|厩舎\s+|宿舎\s+|兵器工房\s+|市場\s+|訓練所\s+|水車\s+|工場\s+|研究所\s+|大宿舎\s+|遠征訓練所\s+|見張り台\s+)(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)\s+(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass">' + arguments[2] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                    for (var i = 3; i <= 4; i++) {
                        txt += '<td><center>' + arguments[i] + '</center></td>';
                    }
                    txt += '</tr></table>';

                    return txt;
                });

            // 施設１個
            reg = /\n(城|砦|村|伐採所|石切り場|製鉄所|畑|倉庫|銅雀台|鍛冶場|防具工場|練兵所|兵舎|弓兵舎|厩舎|宿舎|兵器工房|市場|訓練所|水車|工場|研究所|大宿舎|遠征訓練所|見張り台).*\n(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables">' +
                                '<th class="solClass">' + arguments[1] + '</th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '<th class="solClass"></th>' +
                                '</tr><tr>';
                        txt += '<td><center>' + arguments[2] + '</center></td>';
                        txt += '</tr></table>';

                    return txt;
                });

            // 耐久力と忠誠心
            reg = /情報\s+(城|砦|村|領地)の(耐久力|忠誠心)(\d+).(\d+)/g;
            tmpHTML = tmpHTML.replace(reg,
                function() {
                    var txt = '<table class="tables" summary="情報"><tr>' +
                              '<th class="defenserFacility w120">情報</td>';
                        txt += '<td class="result"><center>' + arguments[1] + 'の' + arguments[2] + ' ' + arguments[3] + '/' + arguments[4] + '</center></td>';
                        txt += '</tr></table>';

                    return txt;
                });

// 2012.07.22 ここまで

            elm.innerHTML = tmpHTML;
        }
    }

    //兵力合計
    function disp_Details() {
        if (location.pathname != '/alliance/detail.php' &&
            location.pathname != '/report/detail.php') return ;

        var troops = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] ;
        var tbls = $x('//table[contains(concat(" ", normalize-space(@class), " "), " tables ")][@summary="防御者"]');

        if (tbls.length < 2) return;

        for (var i = 0; i < tbls.length; i++) {
            var trs = $x('descendant::tr', tbls[i]);
            if (trs.length >= 4) {
                for (var j = 0; j < 2; j++) {
                    var tds = $x('descendant::td', trs[j+2]);
                    if (tds.length != 12) continue;
                    for (var k = 0; k < tds.length; k++) {
                        troops[j][k] += parseInt(tds[k].innerHTML, 10);
                    }
                }
            }
        }

        var tbl = d.createElement('table');
        tbl.className = 'tables';

        var tr = d.createElement('tr');
        var th = d.createElement('th');
        th.className = 'attacker';
        th.appendChild(d.createTextNode('防御合計'));
        tr.appendChild(th);
        th = d.createElement('th');
        th.className = 'attackerBase';
        th.setAttribute('colspan', '12');
        tr.appendChild(th);
        tbl.appendChild(tr);

        var tr = d.createElement('tr');
        var thtxt = ['剣兵', '槍兵', '弓兵', '騎兵', '矛槍兵', '弩兵', '近衛騎兵', '斥候', '斥候騎兵', '衝車', '投石機', '武将'];
        var th = d.createElement('th');
        th.className = 'blank';
        tr.appendChild(th);
        for (var i = 0; i < 12; i++) {
            th = d.createElement('th');
            th.className = 'solClass';
            th.appendChild(d.createTextNode(thtxt[i]));
            tr.appendChild(th);
        }
        tbl.appendChild(tr);

        var hd =['兵士', '死傷'];
        for (var i = 0; i < 2; i++) {
            var tr = d.createElement('tr');
            var th = d.createElement('th');
            th.className = 'blank';
            th.appendChild(d.createTextNode(hd[i]));
            tr.appendChild(th);
            for (var j = 0; j < 12; j++) {
                var td = d.createElement('td');
                td.appendChild(d.createTextNode(troops[i][j]));
                tr.appendChild(td);
            }
            tbl.appendChild(tr);
        }

        if (OPT_DETAILS_UP == 0) {
            tbls[tbls.length-1].parentNode.insertBefore(tbl, tbls[tbls.length-1].nextSibling);
        } else {
            tbls[0].parentNode.insertBefore(tbl, tbls[0]);
        }
    }

    //デッキ
    function disp_Deck() {
        if (location.pathname != '/card/deck.php') return ;

        if (OPT_DECK_SET) dispDeckSet();

        function dispDeckSet() {
            var name = cgetCurrentBaseName();
            var cardFolder = $s('id("cardFileList")|id("rotate")');

            var changeSelect = function () {
                var selectNodes = $x('(.//div[contains(concat(" ", normalize-space(@class), " "), " cardColmn ")]|.//div[contains(concat(" ", normalize-space(@class), " "), " cardStatusDetail ")])//select', cardFolder);
                selectNodes.forEach(function(selectNode) {
                    var option = $s('descendant::option[normalize-space(text())="'+name+'" and not(@selected)]', selectNode);
                    option.selected = true;
                });
            };

            changeSelect();

            $e(cardFolder, 'DOMNodeInserted', function(e) {
                var timerId = null;
                if (timerId != null) {
                    return;
                }
                timerId = setTimeout(function() {
                    changeSelect();
                    clearTimeout(timerId);
                    timerId = null;
                }, 30);
            });
        }
    }

    //完了時刻の表示（建物）
    function disp_CompleteTimeBuild() {
        var lastTime = cgetNow();
        var villageId = cgetCurrentVillageId();
        if (location.pathname == '/village.php') {
            //最終建築時間の保存
            var spans = $x('id("actionLog")//li//span[contains(concat(" ", normalize-space(@class), " "), " buildStatus ") and (contains(text(), "建設中") or contains(text(), "建設準備中"))]/../span[contains(concat(" ", normalize-space(@class), " "), " buildClock ")]');
            if (!spans || spans.length == 0) {
                cdelData('lastBuildTime'+villageId, true);
                return;
            }

            var saveDate = new Date(caddDate(lastTime, spans[spans.length - 1].innerHTML.replace(/^[\s|　]*|[\s|　]*$/, '')).replace(/-/g, '/'));
            saveDate.setMinutes(saveDate.getMinutes() + 1);
            csaveData('lastBuildTime'+villageId, saveDate.toString(), true);
            return;
        }

        var reg = /\/facility\/facility.php|\/facility\/select_facility.php|\/facility\/castle.php/;
        if (!location.pathname.match(reg) || d.referrer.match(reg)) {
            return;
        }

        var spans = new Array();
        var tds = $x('id("gray02Wrapper")//th[contains(text(), "所要時間")]//..//td[contains(concat(" ", normalize-space(@class), " "), " contents ")]');
        for (var i = 0; i < tds.length; i++) {
            var td = tds[i];
            var th = $s('.//th[contains(text(), "建設に必要な食糧消費量") or contains(text(), "建設に必要な資材")]', td.parentNode.parentNode);
            if (th) {
                var span = d.createElement('span');
                td.appendChild(span);
                spans.push(span);
            }
        }

        if (!spans.length) return;

        lastTime = new Date(cloadData('lastBuildTime'+villageId, lastTime.toString(), true));

        timerfunc();

        function timerfunc() {
            var now = cgetNow();
            if (lastTime < now) {
                lastTime = now;
            }

            for (var i = 0; i < spans.length; i++) {
                var span = spans[i];
                var ctime = caddDate(lastTime, span.parentNode.firstChild.nodeValue);
                if (ctime) {
                    span.innerHTML = '　(' + ctime + '完了)';
                }
            }

            setTimeout(timerfunc, 1000);
        }
    }

    //完了時刻の表示（兵）
    function disp_CompleteTimeUnit() {
        if (location.pathname == '/facility/facility.php') {

            //ユニット作成の最終時刻の保存
            var lastTd = $s('id("gray02Wrapper")/table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")][2]//tr[last()]/td');
            if (!lastTd) {
                cdelData('lastUnitTime', true);
                return;
            }
            csaveData('lastUnitTime', new Date(lastTd.innerHTML.replace(/^[\s|\n|\r|\t]*|[\s|\n|\r|\t]*$/, '').replace(/-/g, '/')).toString(), true);
            return;
        }

        if (location.pathname != '/facility/unit_confirm.php') {
            return;
        }

        var td = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ") and @summary="object"]//th[contains(text(), "作成するまでに必要な時間")]/../td');

        if (!td) return;
        var span = d.createElement('span');
        td.appendChild(span);

        var lastTime = new Date(cloadData('lastUnitTime', null, true));

        timerfunc();

        function timerfunc() {
            var now = cgetNow();
            if (lastTime < now) {
                lastTime = now;
            }

            var ctime = caddDate(lastTime, span.parentNode.firstChild.nodeValue);
            if (ctime) {
                span.innerHTML = '　(' + ctime + '完了)';
            }
            setTimeout(timerfunc, 1000);
        }
    }

    //同盟表示の改善
    function disp_AllianceInfo() {
        if (OPT_ALLY_XY)  allianceXY();
        if (OPT_ALLY_IS)  allianceSort();
        if (OPT_ALLY_CSV) allianceCSV();

        //同盟表示のソート
        function allianceSort() {
            if (location.pathname != '/alliance/info.php') return;

            var sort_kind, sort_order;

            var sort_list = ['num', 'str', 'num', 'num', 'num', 'str', 'str'];

            for (var i = 0; i < 8; i++) {
                var th = $s('//table[@summary="ランキング"]//tr[2]//th[' + (i+1) + ']');
                if (th) {

                    sort_kind = sort_list[i];
                    if (th.id == 'beyond_ally_xy') sort_kind = 'xy';

                    th.appendChild(d.createElement('br'));

                    var a = d.createElement('a');
                    a.href = 'javascript:void(0)';
                    (function(n, k) {
                        $e(a, 'click', function() {row_sort(n, k, 'asc');});
                    })(i+1, sort_kind);

                    var img = d.createElement('img');
                    img.src= IMG_DIR + 'trade/icon_up.gif';
                    img.alt = '昇順に並べ替え';
                    img.title = img.alt;
                    a.appendChild(img);

                    th.appendChild(a);
                    th.appendChild(d.createTextNode(' '));
                    a = d.createElement('a');
                    a.href = 'javascript:void(0)';
                    (function(n, k) {
                        $e(a, 'click', function() {row_sort(n, k, 'dsc');});
                    })(i+1, sort_kind);

                    img = d.createElement('img');
                    img.src= IMG_DIR + 'trade/icon_down.gif';
                    img.alt = '降順に並べ替え';
                    img.title = img.alt;
                    a.appendChild(img);

                    th.appendChild(a);

                }
            }

            function row_sort(col, kind, order) {
                var tbl = $s('//table[@summary="ランキング"]');
                var trs = $x("descendant::tr[position()>2]", tbl);
                sort_kind = kind;
                sort_order = order;

                var strs = new Array();
                if (col == 2 || kind == 'xy') {
                    //名前 or座標はaの下
                    for (var i = 0; i < trs.length; i++) {
                        var td = $s('descendant::td[' + col + ']', trs[i]);
                        var a = $s('descendant::a', td);
                        if (a) strs.push({'node':trs[i], 'value':a.innerHTML});
                        else strs.push({'node':trs[i], 'value':''});
                    }
                } else {
                    for (var i = 0; i < trs.length; i++) {
                        var td = $s('descendant::td[' + col + ']', trs[i]);
                        strs.push({'node':trs[i], 'value':td.innerHTML});
                    }
                }

                strs.sort(row_cmp);

                for (var i = 0; i < trs.length; i++) {
                    strs[i].node.parentNode.removeChild(strs[i].node);
                    tbl.appendChild(strs[i].node);
                }
            }

            function row_cmp(a, b) {
                var ret = 0;
                if (sort_kind == 'num') {
                    ret = parseInt(a.value, 10) - parseInt(b.value, 10);
                } else if (sort_kind == 'xy') {
                    //座標
                    if (!a.value && !b.value) ret =  0;
                    else if (!a.value) ret = 1;
                    else if (!b.value) ret = -1;
                    else {
                        var a_xy = a.value.split(',');
                        var b_xy = b.value.split(',');
                        ret = (Math.pow(parseInt(a_xy[0], 10), 2) + Math.pow(parseInt(a_xy[1], 10), 2)) -
                              (Math.pow(parseInt(b_xy[0], 10), 2) + Math.pow(parseInt(b_xy[1], 10), 2));
                    }
                } else {
                    if (a.value == b.value) {
                        ret = 0;
                    } else if (a.value > b.value) {
                        ret = 1;
                    } else {
                        ret = -1;
                    }
                }
                if (sort_order == 'dsc') {
                    ret = 0 - ret;
                }
                return ret;

            }
        }

        //同盟員座標表示
        function allianceXY() {
            //座標の収集
              //  console.log( 'APIの解説はじめるよー' );                       

            if (location.pathname =='/user/' || location.pathname == '/user/index.php') {
                if (USER_ID || URL_PARAM.user_id) {
                    var uid, aid;
                    if (URL_PARAM.user_id) uid = URL_PARAM.user_id;
                    else uid = USER_ID;
//                    var allytd = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[3]//td[4]');
                    var allytd = $s("//table[@class=\"commonTables\"]//tr[3]//td[4]");
                    if (!allytd) return;
                    var aids = allytd.innerHTML.match(/\/alliance\/info\.php\?id\=(\d+)/);
                    
                    if (!aids) return;
                    aid = aids[1];
                    var table = $s("//table[@class=\"commonTables\"]");
                    if (table) {
                        var xy = getXYfromUserHTML(table.innerHTML);
                        if (xy) {
                            csetUserXY(aid, uid, xy.x, xy.y);
                        }
                    }
                }
            }

            //表示
            if (location.pathname == '/alliance/info.php') {
                if (ALLY_ID || URL_PARAM.id) {
                    var aid;
                    if (URL_PARAM.id) aid = URL_PARAM.id;
                    else aid = ALLY_ID;

                    var head1 = $s("//table[@summary=\"ランキング\"]//tr[1]//th[@class=\"ttl\"]");
                    if (head1) {
                        head1.setAttribute('colspan', parseInt(head1.getAttribute('colspan'), 10) + 1 + '');
                    }
                    var head2 = $s("//table[@summary=\"ランキング\"]//tr[2]");
                    if (head2) {
                        var th = d.createElement('th');
                        th.className = 'all';
                        th.style.width = '110px';
                        th.id = 'beyond_ally_xy';
                        th.innerHTML = '座標';
                        var lnk = d.createElement('a');
                        lnk.href = 'javascript:void(0)';
                        lnk.innerHTML ='(GET)';
                        lnk.style.fontSize = '9px';

                        var running = false;

                        $e(lnk, 'click', function() {

                            if (running) return ;

                            if (confirm('同盟員の情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい') == false) return;
                            running = true;
                            var trs = $x("//table[@summary=\"ランキング\"]//tr[position()>2]");

                            var now_num = 0;
                            var all_num = trs.length;
                            window.setTimeout(timerFunc, 0);

                            function timerFunc() {
                                var idtd = $s('descendant::td[2]', trs[now_num]);
                                if (!idtd) {
                                    alert('ページフォーマットが変更されたようです');
                                    return ;
                                }
                                var ids = idtd.innerHTML.match(/\/user\/\?user_id\=(\d+)/);
                                if (!ids) {
                                    alert('ページフォーマットが変更されたようです');
                                    return ;
                                }

                                var tmp = $('beyond_xylink_' + ids[1]);
                                if (tmp.innerHTML != '　') {
                                    now_num ++;
                                    if (now_num < all_num) {
                                        window.setTimeout(timerFunc, 0);
                                    } else {
                                        running = false;
                                        alert('全ての座標を取得しました');
                                    }
                                    return ;
                                }

                                cajaxRequest('/user/?user_id=' + ids[1], 'GET', '', function(req) {
                                    var xytd = $('beyond_xylink_' + ids[1]);
                                    if (xytd) {
                                        var xy = getXYfromUserHTML(req.responseText);
                                        if (xy) {
                                            csetUserXY(aid, ids[1], xy.x, xy.y);
                                            xytd.innerHTML = cgetXYHtml(xy.x, xy.y);
                                        }
                                    }
                                    now_num ++;
                                    if (now_num < all_num) {
                                        window.setTimeout(timerFunc, 0);
                                    } else {
                                        running = false;
                                        alert('全ての座標を取得しました');
                                    }
                                });
                            }
                        });

                        th.appendChild(lnk);
                        head2.appendChild(th);
                    }

                    var trs = $x('//table[@summary="ランキング"]//tr[position()>2]');
                    var xylists = cloadData("allyXYList" + aid, "[]", true, true);

                    //ハッシュに書き換え
                    var xylist = new Array();
                    for (var i = 0; i < xylists.length; i++) {
                        xylist['id' + xylists[i].id ] = {'x':xylists[i].x, 'y':xylists[i].y};
                        if (xylist['id' + xylists[i].id].x == null) xylist['id' + xylists[i].id].x = 0;
                        if (xylist['id' + xylists[i].id].y == null) xylist['id' + xylists[i].id].y = 0;
                    }

                    for (var i = 0; i < trs.length; i++) {
                        var idtd = $s('descendant::td[2]', trs[i]);
                        if (!idtd) continue;
                        var ids = idtd.innerHTML.match(/\/user\/\?user_id\=(\d+)/);
                        if (!ids) continue;

                        var td = d.createElement('td');
                        td.id = 'beyond_xylink_' + ids[1];
                        if (xylist['id' + ids[1] ]) {
                            td.innerHTML = cgetXYHtml(xylist['id' + ids[1] ].x, xylist['id' + ids[1] ].y);
                        } else {
                            td.innerHTML ='　';
                        }
                        trs[i].appendChild(td);

                        var yaku = $s('descendant::td[7]', trs[i]);
                        if (yaku.innerHTML.match(/盟主補佐/)) {
                            //盟主補佐がぎりぎり2行になるので後ろの空白カット
                            yaku.innerHTML = yaku.innerHTML.replace(/[ 　\t\r\n]+$/g, '');

                        }
                    }
                }
            }
        }

        function getXYfromUserHTML(html) {
//            var xy = html.match(/<\/a>\(本拠地\)<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>/);
              
              var xy = html.match(/<\/a>\n\(本拠地\)\t+<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>/);

 //           var xy = html.match(/<\/a>\(本拠地\)<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>/);
            if (xy) {
                return {'x':parseInt(xy[1], 10), 'y':parseInt(xy[2], 10)};
            }
            return null;
        }

        function getDatafromUserHTML(html) {
            var ret = [];
            var tmp = html.match(/<td[^>]*>ランク<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['all_rank'] = parseInt(tmp[1], 10);

            tmp = html.match(/<td[^>]*>総合<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['all_point'] = parseInt(tmp[1], 10);

            tmp = html.match(/<td[^>]*>総人口<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['jinko'] = parseInt(tmp[1], 10);

            tmp = html.match(/<td[^>]*>攻撃<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['attack'] = parseInt(tmp[1], 10);

            tmp = html.match(/<td[^>]*>防御<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['defence'] = parseInt(tmp[1], 10);

            tmp = html.match(/<td[^>]*>撃破スコア<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['attack_score'] = parseInt(tmp[1], 10);

            tmp = html.match(/<td[^>]*>防衛スコア<\/td>[^<]*<td[^>]*>([0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['defence_score'] = parseInt(tmp[1], 10);

            tmp = html.match(/<\/a>\(本拠地\)<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>/);
            if (!tmp) return null;
            ret['x'] = parseInt(tmp[1], 10);
            ret['y'] = parseInt(tmp[2], 10);

            return ret;
        }

        function getXYListfromUserHTML(html) {
            var ret = new Array();
            var tmp = html.match(/<td[^>]*>君主<\/td>[^<]*<td[^>]*>([^<\s]+)/);
            if (!tmp) return null;
            var user_name = tmp[1];

            tmp = html.match(/<td[^>]*>同盟<\/td>[^<]*<td[^>]*><a href="[^"]*">([^<]+)<\/a><\/td>/);
            if (!tmp) return;
            var ally_name = tmp[1];

            var pos;
            var reg = /<a href="\.\.\/(?:land|village_change)\.php[^"]*">\s*([^<\s]+)\s*<\/a>[^<]*<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>[^<]*<td[^>]*>([0-9]+|&nbsp;)<\/td>/;
            var honkyo = 1;
            while ((pos = html.search(reg)) != -1) {

                html = html.substr(pos);

                var dat = html.match(reg);
                if (!dat) break;

                if (dat[4] == '&nbsp;') dat[4] = '';

                ret.push({'user_name':user_name, 'ally_name':ally_name, 'area_name':dat[1].replace(/(^\s+|\s+$)/g, ''), 'x':dat[2], 'y':dat[3], 'jinko':dat[4], 'honkyo':honkyo});
                honkyo='';
                html = html.substr(dat[0].length);

            }

            return ret;
        }

        function allianceCSV() {
            if (location.pathname != '/alliance/info.php') return;

            var aid;
            if (URL_PARAM.id) aid = URL_PARAM.id;
            else aid = ALLY_ID;

            //CSV出力用
            var tbl = $s('//table[@summary="ランキング"]');
            if (!tbl) return;

            var lnk = d.createElement('a');
            lnk.href = 'javascript:void(0)';
            lnk.innerHTML ='同盟員詳細情報CSV';
            tbl.parentNode.insertBefore(lnk, tbl.nextSibling);
            $e(lnk, 'click', function() {

                if ($('beyond_csvWindow')) return;

                if (confirm('同盟員の情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい') == false) return;

                //窓作成
                var elm_xy = cgetElementXY(this);
                var yy = elm_xy.y - 420;
                if (yy < 0) yy = 0;
                createCSVWindow(10, yy);

                var trs = $x('//table[@summary="ランキング"]//tr[position()>2]');

                var elm_msg = $('beyond_csvWindow_message');
                if (!elm_msg) return;
                var elm_csv = $('beyond_csvWindow_csv');
                if (!elm_csv) return;

                var now_num = 0;
                var all_num = trs.length;

                if (all_num == 0) return;

                var csv_txt = '同盟内ランク\tuser_id\t名前\t同盟内point\t寄付\t拠点\t全体ランク\t全体point\t人口\t攻撃\t防御\t撃破スコア\t防御スコア\t本拠X座標\t本拠Y座標\n';

                window.setTimeout(timerFunc, 0);

                function timerFunc() {
                    if (!$('beyond_csvWindow')) return;
                    var tds = $x('descendant::td', trs[now_num]);
                    if (tds.length < 5) {
                        alert('ページフォーマットが変更されたようです');
                        return ;
                    }

                    var ids = tds[1].innerHTML.match(/\/user\/\?user_id\=(\d+).*">(.+)<\/a>/);
                    if (!ids) {
                        alert('ページフォーマットが変更されたようです');
                        return ;
                    }

                    var uid = parseInt(ids[1], 10);

                    cajaxRequest('/user/?user_id=' + uid, 'GET', '', function(req) {
                        var dt = getDatafromUserHTML(req.responseText);
                        if (dt) {
                            csv_txt += parseInt(tds[0].innerHTML, 10) + '\t';
                            csv_txt += uid + '\t';
                            csv_txt += ids[2]  + '\t';
                            csv_txt += parseInt(tds[2].innerHTML, 10)  + '\t';
                            csv_txt += parseInt(tds[3].innerHTML, 10)  + '\t';
                            csv_txt += parseInt(tds[4].innerHTML, 10)  + '\t';
                            csv_txt += dt.all_rank  + '\t';
                            csv_txt += dt.all_point  + '\t';
                            csv_txt += dt.jinko  + '\t';
                            csv_txt += dt.attack  + '\t';
                            csv_txt += dt.defence  + '\t';
                            csv_txt += dt.attack_score  + '\t';
                            csv_txt += dt.defence_score  + '\t';
                            csv_txt += dt.x  + '\t';
                            csv_txt += dt.y  + '\n';

                            var xytd = $('beyond_xylink_' + uid);
                            if (xytd) {
                                csetUserXY(aid, uid, dt.x, dt.y);
                                xytd.innerHTML = cgetXYHtml(dt.x, dt.y);
                            }

                            now_num ++;
                            elm_msg.innerHTML = '取得中... ( ' + now_num + ' / ' + all_num + ' )';
                            if (now_num < all_num) {
                                window.setTimeout(timerFunc, 0);
                            } else {
                                elm_msg.innerHTML += '.. 完了しました。CTRL + A → CTRL + Cでコピーし、Excelなどに貼りつけてください';
                                elm_csv.value = csv_txt;
                                elm_csv.focus();
                            }
                        } else {
                            alert('取得に失敗しました');
                        }

                    }, function(req) {
                        alert('サーバからエラーが返されました');
                    });
                }
            });

            var lnk2 = d.createElement('a');
            lnk2.href = 'javascript:void(0)';
            lnk2.innerHTML ='同盟員全領地座標CSV';
            tbl.parentNode.insertBefore(lnk2, lnk.nextSibling);
            tbl.parentNode.insertBefore(d.createTextNode('　　'), lnk2);
            $e(lnk2, 'click', function() {

                if ($('beyond_csvWindow')) return;

                if (confirm('同盟員の情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい') == false) return;

                if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
                    if (confirm('同盟員数が多い場合、CTRL+AやCTRL+Cの処理に10分以上かかることがあります。\n続けますか？') == false) return;
                }
                //窓作成
                var elm_xy = cgetElementXY(this);
                var yy = elm_xy.y - 420;
                if (yy < 0) yy = 0;
                createCSVWindow(10, yy);

                var trs = $x('//table[@summary="ランキング"]//tr[position()>2]');

                var elm_msg = $('beyond_csvWindow_message');
                if (!elm_msg) return;
                var elm_csv = $('beyond_csvWindow_csv');
                if (!elm_csv) return;

                var now_num = 0;
                var all_num = trs.length;

                if (all_num == 0) return;

                var csv_txt = '同盟\t君主\t領地名\tX\tY\t人口\t本拠\n';

                window.setTimeout(timerFunc, 0);

                function timerFunc() {
                    if (!$('beyond_csvWindow')) return;
                    var tds = $x('descendant::td', trs[now_num]);
                    if (tds.length < 5) {
                        alert('ページフォーマットが変更されたようです');
                        return ;
                    }

                    var ids = tds[1].innerHTML.match(/\/user\/\?user_id\=(\d+).*">(.+)<\/a>/);
                    if (!ids) {
                        alert('ページフォーマットが変更されたようです');
                        return ;
                    }

                    var uid = parseInt(ids[1], 10);

                    cajaxRequest('/user/?user_id=' + uid, 'GET', '', function(req) {
                        var dt = getXYListfromUserHTML(req.responseText);
                        if (dt) {
                            for (var i = 0; i < dt.length; i++) {
                                csv_txt += dt[i].ally_name  + '\t';
                                csv_txt += dt[i].user_name  + '\t';
                                csv_txt += dt[i].area_name  + '\t';
                                csv_txt += dt[i].x  + '\t';
                                csv_txt += dt[i].y  + '\t';
                                csv_txt += dt[i].jinko  + '\t';
                                csv_txt += dt[i].honkyo  + '\n';
                            }

                            now_num ++;
                            elm_msg.innerHTML = '取得中... ( ' + now_num + ' / ' + all_num + ' )';
                            if (now_num < all_num) {
                                window.setTimeout(timerFunc, 0);
                            } else {
                                elm_msg.innerHTML += '.. 完了しました。CTRL + A → CTRL + Cでコピーし、Excelなどに貼りつけてください';
                                elm_csv.value = csv_txt;
                                elm_csv.focus();
                            }
                        } else {
                            alert('取得に失敗しました');
                        }
                    }, function(req) {
                        alert('サーバからエラーが返されました');
                    });
                }
            });

            function createCSVWindow(x, y) {
                var cc = $('beyond_csvWindow');
                if (cc) cc.parentNode.removeChild(cc);
                cc = d.createElement('div');
                cc.id = 'beyond_csvWindow';
                cc.style.left = x + 'px';
                cc.style.top = y + 'px';
                cc.style.position = 'absolute';
                cc.style.backgroundColor = 'lightgray';
                cc.style.border = 'outset 2px lightgray';
                cc.style.fontSize = '12px';
                cc.style.padding = '15px';
                cc.style.zIndex = 1000;

                cc.style.padding = '10px';
                var dv = d.createElement('div');
                dv.id = 'beyond_csvWindow_message';
                cc.appendChild(dv);
                var tx = d.createElement('textarea');
                tx.id = 'beyond_csvWindow_csv';
                tx.rows = 25;
                tx.cols = 140;
                tx.style.overflow = 'scroll';
                cc.appendChild(tx);

                cc.appendChild(d.createElement('br'));
                ccreateButton(cc, '閉じる', '', function() {
                    var cc = $('beyond_csvWindow');
                    if (cc) cc.parentNode.removeChild(cc);
                });

                $('beyond_floatpanel').appendChild(cc);
            }

        }
    }

    //資源の合計
    function disp_ResourcesTotal() {
        var white_all = RES_GROW_W.wood + RES_GROW_W.stone + RES_GROW_W.iron + RES_GROW_W.rice;
        var blue_all = RES_GROW_B.wood + RES_GROW_B.stone + RES_GROW_B.iron + RES_GROW_B.rice;
        var all_all = RES_GROW.wood + RES_GROW.stone + RES_GROW.iron + RES_GROW.rice;

        var box = $s('id("sidebar")//span[contains(concat(" ", normalize-space(@class), " "), " increase ") or contains(concat(" ", normalize-space(@class), " "), " resource ")]/../.. | id("status_left")//p[contains(concat(" ", normalize-space(@class), " "), " status_bottom ")]');
        if (!box) return;

        var txt = d.createTextNode('合計 ' + white_all);

        var sp = d.createElement('span');
            sp.className = 'increase';
            sp.appendChild(d.createTextNode(' +' + blue_all));

        var item = txt;
        var addSpDoc = box;
        if (!isNarrow) {
            item = d.createElement('li');
            item.appendChild(txt);
            item.title = '総合計 ' + all_all;
            addSpDoc = item;
        }

        box.appendChild(item);
        addSpDoc.appendChild(sp);
    }

    //建設/破棄一覧
    function disp_RemoveList() {
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

        if (location.pathname == '/land.php' && URL_PARAM.x && URL_PARAM.y) {

            var rmtime = d.body.innerHTML.match(/(現在領地を破棄中です|現在村を建設中です|現在砦を建設中です)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
            console.log(rmtime);
            if (rmtime) {
                if (rmtime[1] == '現在領地を破棄中です') {
                    addList(rmtime[2], 0, URL_PARAM.x, URL_PARAM.y);
                } else if (rmtime[1] == '現在村を建設中です') {
                    addList(rmtime[2], 3, URL_PARAM.x, URL_PARAM.y);
                } else if (rmtime[1] == '現在砦を建設中です') {
                    addList(rmtime[2], 4, URL_PARAM.x, URL_PARAM.y);
                }
            } else {
                rmtime = d.body.innerHTML.match(/現在領地をレベルアップ中です.*\n(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
                if (rmtime) {
                    addList(rmtime[1], 5, URL_PARAM.x, URL_PARAM.y);
                } else {
                    delList(0, URL_PARAM.x, URL_PARAM.y);
                }
            }
        }

        if (location.pathname == '/facility/castle.php') {
            var xy = cgetCurrentBaseXY();
            var rmtime = d.body.innerHTML.match(/(村を削除中です。|砦を削除中です。)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
            if (rmtime) {
                if (rmtime[1] == '村を削除中です。') {
                    addList(rmtime[2], 1, xy.x, xy.y);
                } else if (rmtime[1] == '砦を削除中です。') {
                    addList(rmtime[2], 2, xy.x, xy.y);
                }
            } else {
                delList(1, xy.x, xy.y);
            }
        }

        var mapType = cgetMapType();
        if (mapType & MAP_TYPE.ALL) {
            //地図に表示
            var lists = cloadData('RemoveList', '[]', true, true);
            lists = checkList(lists);       //時間を過ぎたものを削除

            if (lists.length) {
                var cx = parseInt(URL_PARAM.x, 10);
                var cy = parseInt(URL_PARAM.y, 10);
                if (cx > MAP_X_MAX) cx = MAP_X_MAX;
                if (cx < MAP_X_MIN) cx = MAP_X_MIN;
                if (cy > MAP_Y_MAX) cy = MAP_Y_MAX;
                if (cy < MAP_Y_MIN) cy = MAP_Y_MIN;

                var map = null;
                if (mapType & MAP_TYPE.NORMAL) {
                    map = $s('id("mapsAll")');
                }

                var messagesObjs = {
                    remove : {
                        'full' : '破棄',
                        'short' : '×'
                    },
                    scrap : {
                        'full' : '削除',
                        'short' : '削'
                    },
                    fBuild : {
                        'full' : '砦建設',
                        'short' : '建'
                    },
                    vBuild : {
                        'full' : '村建設',
                        'short' : '建'
                    },
                    lvup : {
                        'full' : 'LvUp',
                        'short' : '↑'
                    }
                };

                for (var i = 0; i < lists.length; i++) {
                    if (mapType & MAP_TYPE.NORMAL) {
                        var no = cgetMapNofromXY(lists[i].x, lists[i].y, cx, cy, mapType);
                        if (!no) continue;
                        var img_src;
                        if (lists[i].kind == 3) img_src = img_m;
                        else if (lists[i].kind == 4) img_src = img_t;
                        else if (lists[i].kind == 5) img_src = img_lup;
                        else img_src = img_x;

                        var img = document.createElement('img');
                        img.className = 'mapAll' + no;
                        img.src = img_src;

                        map.appendChild(img);

                        csetMapStarDisable(no);
                    } else if (mapType & MAP_TYPE.BIG) {
                        var mapAreaContents = $x('id("map51-content")//li/div/a[contains(@href, "?x=' + lists[i].x + '&y=' + lists[i].y + '")]');
                        var setMapAreaContents = null;
                        if (mapAreaContents.length <= 0) {
                            continue;
                        } else if (mapAreaContents.length == 1) {
                            setMapAreaContents = mapAreaContents[0].cloneNode(true);
                        } else {
                            setMapAreaContents = mapAreaContents[1];
                        }

                        var message = null;
                        if(lists[i].kind == 1 || lists[i].kind == 2) {
                            message = messagesObjs.scrap;
                        } else if(lists[i].kind == 3) {
                            message = messagesObjs.vBuild;
                        } else if (lists[i].kind == 4) {
                            message = messagesObjs.fBuild;
                        } else if(lists[i].kind == 5 ) {
                            message = messagesObjs.lvup;
                        } else {
                            message = messagesObjs.remove;
                        }

                        setMapAreaContents.innerHTML = message.short;

                        mapAreaContents[0].style.display = 'none';
                        mapAreaContents[0].parentNode.appendChild(setMapAreaContents);

                        var match = null;
                        if ((match = mapAreaContents[0].parentNode.parentNode.className.match(/bg_[^\s]*/g)) && match.length == 1) {
                            setMapAreaContents.style.color = 'red';
                        } else {
                            setMapAreaContents.style.color = 'moccasin';
                        }

                        (function (time, message) {
                            $e(setMapAreaContents, 'mouseover', function(e) {
                                var toolTipCaption = $s('id("overDiv")//dl[contains(concat(" ", normalize-space(@class), " "), " bigmap ")]//dt[contains(concat(" ", normalize-space(@class), " "), " bigmap-caption ")]');
                                if (!toolTipCaption) {
                                    return;
                                }

                                toolTipCaption.appendChild(document.createTextNode('\u00A0'+message.full+'中'));

                                var toolTips = $x('id("overDiv")//dl[contains(concat(" ", normalize-space(@class), " "), " bigmap ")]//*[contains(concat(" ", normalize-space(@class), " "), " bottom-popup-")]');
                                if (toolTips.length == 0) {
                                    return;
                                }
                                for (var i = 0; i < toolTips.length; i++) {
                                    toolTips[i].className = '';
                                }

                                var dt = document.createElement('dt');
                                dt.className = 'bottom-popup-l';
                                dt.appendChild(document.createTextNode(message.full+'完了予定'));

                                var dd = document.createElement('dd');
                                dd.className = 'bottom-popup-r';
                                dd.appendChild(document.createTextNode(time));

                                toolTips[toolTips.length - 1].parentNode.appendChild(dt);
                                toolTips[toolTips.length - 1].parentNode.appendChild(dd);

                            });
                        })(lists[i].time, message);
                    }
                }
            }
        }

        //パネルに表示
        var icon_rl = 'data:image/gif;base64,'+
                    'R0lGODlhEQAPALMAAAD/ANO3SQbOKKyTQxqvSjKgYAivNwCZAHdrPBVwFVNTUS1NLTMzMwAAAAAA'+
                    'AAAAACH5BAQUAP8ALAAAAAARAA8AAARKkMlJq50npzuXAKDALYsBnoBhHWgrVmyLIkOgSIl8Bnww'+
                    'TDpCr3djfHbD4Y9hOhWSQ8kC9YTyEFKBwICw9i5WLKfWW3IYNISYEgEAOw==';
        var elms = ccreateSideBox('beyond_sidebox_removelist', icon_rl, '建設/破棄ﾘｽﾄ');

        var lists = cloadData('RemoveList', '[]', true, true);
        lists = checkList(lists); //時間を過ぎたものを削除

        if (lists.length == 0) return;

        var ul = d.createElement('ul');

        for (var i = 0; i < lists.length; i++) {
            var li = d.createElement('li');
            //アイコン
            var title = '';
            switch (lists[i].kind) {
                case 0: title = '領地破棄'; break;
                case 1: title = '村破棄'; break;
                case 2: title = '砦破棄'; break;
                case 3: title = '村作成'; break;
                case 4: title = '砦作成'; break;
                case 5: title = 'レベルアップ'; break;
            }
            var icon = '';
            if (lists[i].kind == 1 || lists[i].kind == 3) {        //村破棄or村作成
                icon = IMG_DIR + 'panel/village_b_l.png';
            } else if (lists[i].kind == 2 || lists[i].kind == 4) { //砦破棄or砦作成
                icon = IMG_DIR + 'panel/fort_b_l.png';
            } else {
                icon = IMG_DIR + 'panel/territory_b_s.png';
            }

            var addHtml = '<img src="' + icon + '" style="width:20px; height:20px;" title="' + title + '">';

            var sizestyle = '';
            if (lists[i].kind == 0 || lists[i].kind == 1 || lists[i].kind == 2) {      //領地破棄or村破棄or砦破棄
                addHtml += '<img src ="' + img_x + '" style="position:relative; left:-20px; width:20px; height:20px;" title="' + title + '">';
                sizestyle = ' style="position:relative; left:-20px;"';
            }
            if (lists[i].kind == 5) {                              //領地LvUp
                addHtml += '<img src ="' + img_lup + '" style="position:relative; left:-20px; width:20px; height:20px;" title="' + title + '">';
                sizestyle = ' style="position:relative; left:-20px;"';
            }

            addHtml += '<a href="'+caddSessionId('/land.php?x=' + lists[i].x + '&y=' + lists[i].y)+'" title="表示"'+ sizestyle + '>' + lists[i].time.substr(-8) + '</a>';
            addHtml += '<a href="'+caddSessionId('/map.php?x=' + lists[i].x + '&y=' + lists[i].y)+'" title="(' + lists[i].x + ',' + lists[i].y + ')を中心に地図を表示"' + sizestyle + '>';
            addHtml += '<img src="' +  img_map + '" style="padding-left:2px;"></a>';

            li.innerHTML = addHtml;

            ul.appendChild(li);
        }
        elms.sideBoxInner.appendChild(ul);

        function addList(tim, kind, x, y) { //kind=0:領地破棄 1:村破棄 2:砦破棄 3:村作成 4:砦作成 5:領地LvUp
            var lists = cloadData('RemoveList', '[]', true, true);

            for (var i = 0; i < lists.length; i++) {
                if (lists[i].x == x && lists[i].y == y) {
                    return;
                }
            }
            lists.push({'x':x, 'y':y, 'time':tim, 'kind':kind});
            lists.sort( function(a, b) {

                    if (a.time > b.time) return 1;
                    if (a.time < b.time) return -1;
                    return 0;});

            csaveData('RemoveList', lists, true, true);
        }
        function delList(kind, x, y) { //kind=0:land 1:castle
            var lists = cloadData('RemoveList', '[]', true, true);

            for (var i = 0; i < lists.length; i++) {
                if (lists[i].x == x && lists[i].y == y) {
                    if (((lists[i].kind == 1 || lists[i].kind == 2) && kind == 1) ||
                        ((lists[i].kind == 0 || lists[i].kind == 3 || lists[i].kind == 4 || lists[i].kind == 5) && kind == 0)) {

                        lists.splice(i, 1);
                        csaveData('RemoveList', lists, true, true);
                        break;
                    }
                }
            }
        }

        function checkList(lists) {
            var dt = new Date();
            var ntime = dt.getFullYear() + '-' +
                        (dt.getMonth()+101).toString().substr(-2) + '-' +
                        (dt.getDate()+100).toString().substr(-2) + ' ' +
                        (dt.getHours()+100).toString().substr(-2)  + ':' +
                        (dt.getMinutes()+100).toString().substr(-2)  + ':' +
                        (dt.getSeconds()+100).toString().substr(-2);
            var str1 = '';
            var str2 = '';
            var str3 = '';
            var str4 = '';
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].time < ntime) {
                    if (lists[i].kind == 1 || lists[i].kind == 2) {
                        str2 += '(' + lists[i].x + ',' + lists[i].y + ')\n';
                    } else if (lists[i].kind == 3 || lists[i].kind == 4) {
                        str3 += '(' + lists[i].x + ',' + lists[i].y + ')\n';
                    } else if (lists[i].kind == 5) {
                        //LevelUp完了
                        str4 += '(' + lists[i].x + ',' + lists[i].y + ')\n';
                        csetMyLevel(lists[i].x, lists[i].y, -1);
                    } else {
                        str1 += '(' + lists[i].x + ',' + lists[i].y + ')\n';
                    }
                    lists.splice(i, 1);
                    i--;
                }
            }
            if (str1 || str2 || str3 || str4) {
                var msg = '';
                if (str1) msg += '以下の領地が破棄されました\n' + str1;
                if (str2) msg += '以下の拠点が破棄されました\n' + str2;
                if (str3) msg += '以下の拠点が作成されました\n' + str3;
                if (str4) msg += '以下の拠点がレベルアップしました\n' + str4;

                csaveData('RemoveList', lists, true, true);
                if (!OPT_NO_ALERT) {
                    alert(msg);
                } else {
                    if (OPT_LOGBOX) {
                        PRE_LOAD_NODES['logConsole'] = msg;
                        caddLogMessage(msg);
                    }
                }
            }
            return lists;
        }
    }

    //資源の残り時間
    function disp_ResourcesTime() {

        var flag_cost = false;
        if (location.pathname == '/facility/facility.php' ||
            location.pathname == '/facility/select_facility.php' ||
            location.pathname == '/facility/castle.php' ||
            location.pathname == '/facility/unit_confirm.php') {
            flag_cost = true;
        }

        var names = ['wood', 'stone', 'iron', 'rice'];
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
        var stat_left = $('status_left');
        var stat_right = $('status_right');
        if (stat_left && stat_right) {
            stat_left.style.width = '725px';    //670 + 55
            stat_right.style.width = '200px';   //255 - 55
        }

        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var base = $(name);
            var dv = d.createElement('div');
            dv.id = 'beyond_restime_' + name;
            dv.style.top = (base.offsetTop + 12) + 'px';
            dv.style.left = base.offsetLeft + 'px';
            dv.style.position = 'absolute';
            base.parentNode.appendChild(dv);

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
        if (OPT_NEXT_FAME) {
            addTop = -12;
        }

        for (var i = 0; i < bldtbl.length; i++) {
            if (RES_MAX.fame < bldtbl[i]) {
                var base = $s('id("status_left")/img[@title="名声"]');
                if (base) {
                    var dv = d.createElement('div');

                    dv.id = 'beyond_restime_meisei';
                    dv.style.top = (base.offsetTop + addTop) + 'px';
                    dv.style.left = (base.offsetLeft + 10) + 'px';
                    dv.style.position = 'absolute';
                    dv.style.color='lightgreen';
                    if (bldtbl[i] != 999) {
                        dv.innerHTML = '다음 거점:' +  bldtbl[i];
                    }

                    if (villageCount < i + 1) {
                        dv.innerHTML += '(+' + (i + 1 - villageCount) + ')';
                    }

                    base.parentNode.appendChild(dv);
                    resources.fame.base = base;
                    resources.fame.timer = dv;
                }
                break;
            }
        }

        if (flag_cost) {
            var facilityResources = new Array();
            var tds = $x('//td[contains(concat(" ", normalize-space(@class), " "), " cost ")]');
            for (var i = 0; i < tds.length; i++) {
                var td = tds[i];
                var spn = $x('./span[contains(concat(" ", normalize-space(@class), " "), " normal ") or contains(concat(" ", normalize-space(@class), " "), " max90 ")]', td);
                if (spn.length != 4) continue;

                var addObj = new Object();

                for (var j = 0; j < names.length; j++) {
                    var name = names[j];
                    var base = spn[j];
                    var dv = d.createElement('div');
                    dv.id = 'beyond_restime_' + i + '_' + name;
                    var elem_xy = cgetElementXY(base);
                    dv.style.top = (elem_xy.y + 9) + 'px';
                    dv.style.left = (elem_xy.x - 18)+ 'px';
                    dv.style.fontSize = '9px';
                    dv.style.position = 'absolute';
                    td.appendChild(dv);

                    addObj[name] = {base : base, timer : dv};
                }
                facilityResources.push(addObj);
            }
        }

        function ResourcesTimer() {
            cupdateCurrentResources();
            //各資源
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                var base = resources[name].base;
                var dv = resources[name].timer;

                if (dv && base) {
                    var tim;
                    if (RES_GROW[ name ] == 0) {
                        tim = 'XX:XX:XX';
                    } else if (RES_GROW[ name ] > 0) {
                        tim = getTime(RES_MAX[ name ] - RES_NOW[ name ], RES_GROW[ name ]);
                    } else {
                        tim = '-' + getTime(RES_NOW[ name ], 0 - RES_GROW[ name ]);
                    }
                    if (tim == '00:00:00' || tim.substr(0, 1) == '-') dv.style.color='red';
                    else if (parseInt(tim.substr(0, 2), 10) < 1) dv.style.color='orange';
                    else dv.style.color='lightgreen';

                    dv.innerHTML = '(' + tim + ')';
                    dv.style.top = (base.offsetTop + 12) + 'px';
                    dv.style.left = base.offsetLeft + 'px';
                }
            }

            //名声
            var base = resources.fame.base;
            var dv = resources.fame.timer;
            if (base && dv) {
                dv.style.top = (base.offsetTop + addTop) + 'px';
                dv.style.left = (base.offsetLeft + 10) + 'px';
            }

            if (flag_cost) {
                for (var i = 0; i < facilityResources.length; i++) {
                    var facilityObj = facilityResources[i];
                    for (var j = 0; j < names.length; j++) {
                        var name = names[j];
                        var base = facilityObj[name].base;
                        var dv = facilityObj[name].timer;
                        var needed = parseInt(base.innerHTML, 10);
                        if (needed > RES_MAX[ name ]) {
                            dv.style.color='red';
                            dv.innerHTML = '倉庫不足';
                        } else if (needed > RES_NOW[ name ]) {
                            var tim = getTime(needed - RES_NOW[ name ], RES_GROW[ name ]);
                            dv.style.color='orange';
                            dv.innerHTML = '(' + tim + ')';
                        } else {
                            dv.style.color='lightgreen';
                            dv.innerHTML = '+ ' + (RES_NOW[ name ] - needed);
                        }
                        var elem_xy = cgetElementXY(base);
                        dv.style.top = (elem_xy.y + 9) + 'px';
                        dv.style.left = (elem_xy.x - 18)+ 'px';
                    }
                }
            }

            window.setTimeout(ResourcesTimer, 1000);
        }

        ResourcesTimer();

        function getTime(res, grow) {
            var tmp = res * 3600 / grow;
            var h = Math.floor(tmp / 3600);
            var m = Math.floor((tmp - h*3600) / 60);
            var s = Math.floor(tmp - h*3600 - m*60);
            var tim = h + ':' +
                      (m+100).toString().substr(-2)  + ':' +
                      (s+100).toString().substr(-2);
            return tim;
        }
    }

function disp_MapList()
{
	if( location.pathname != "/map.php" ) return;
	
	if(OPT_MAP_GRAPIC)
	{   
		var imgdata = $a("//div[@id=\"mapsAll\"]//img");
		for(var i=0 ; i < imgdata.length ; i++)
		{
			if(imgdata[i].src.indexOf("resource") > 1)
			{
				imgdata[i].src = "/20111012-06/extend_project/korean/img/facility/x.gif";
			}
		}
	}
	var map_type = 1;
	if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort15 now\"]") ) map_type=2;
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort20 now\"]") ) map_type=3;

	var base = $("mapbox");

	var div =d.createElement("div");
	div.id = "beyond_maplist";
	div.align = "center";
	div.appendChild(d.createElement("br"));
	
	var tmp_t = d.createElement("table");
	var tmp_r = d.createElement("tr");
	var tmp_d1 = d.createElement("td");
	ccreateCheckBox(tmp_d1, "beyond_maplist_kyoten", "1", "거점","거점 포함",0);
	var tmp_d2 = d.createElement("td");
	ccreateCheckBox(tmp_d2, "beyond_maplist_ryouchi", "1", "영지","영지 포함",0);
	var tmp_d3 = d.createElement("td");
	ccreateCheckBox(tmp_d3, "beyond_maplist_akichi", "1", "빈 땅","빈 땅 포함",0);
	var tmp_d4 = d.createElement("td");
	
	var a = d.createElement("a");
	a.href = "javascript:void(0)";
	a.style.color = "black";
	a.appendChild(d.createTextNode("<지형일람 표시>"));
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
		if( OPT_TTDISTANCE)	disp_ToolTipsDistance();  // 테스트용
		
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
				// 좌표는 a 뒤에
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
						strs.push({"node":trs[i], "value":"★★★★★★★★★★" + td.innerHTML}); // NPC요새는 특수
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
					// 좌표
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
			img.alt = "오름차순 정렬";
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
			img.alt = "내림차순 정렬";
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
				a.appendChild(d.createTextNode("▲맨 위로"));
				a.id = "beyond_maplist_table_gotop";
				dv.appendChild(a);
			}

			tbl = d.createElement("table");
			tbl.id = "beyond_maplist_table";

			tbl.innerHTML = "<tr>" +
					"<th>동맹</th><th>군주</th><th>거점</th><th style=\"display:none;\">거점Kind</th>" +
					"<th>인구</th><th>영지명</th><th>좌표</th><th>거리</th><th>전력</th>" +
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

    //距離/時間表示（ツールチップ）
    function disp_ToolTipsDistance() {
        if (location.pathname == '/village.php') {
            saveTrainingLevel();
        }

        var links = $x('//a[contains(@href, "castle_send_troop.php") and not(contains(@href, "TB_inline"))]');
        if (!links.length) return;

        var TL = 0;
        var ETL = 0;
        var vid = cgetCurrentVillageId();
        var lists = cloadData('TrainingLevels', '[]', true, true);

        for (var i = 0;i < lists.length;i++) {
            if (lists[i].id == vid) {
                TL = parseInt(lists[i].level, 10);
                ETL = parseInt(lists[i].elevel, 10);
                break;
            }
        }

        if (isNaN(''+TL)) {
            TL = 0;
        }
        if (isNaN(''+ETL)) {
            ETL = 0;
        }

        var reg = /x=(-?\d+)&y=(-?\d+)/;
        for (var i = 0; i < links.length; i++) {
            if (!reg.test(links[i].href)) continue;

            links[i].alt = '';
            links[i].title = '';
            $e(links[i], 'mouseover', function (event) {
                var xy = this.href.match(reg);
                var distance = cgetDistanceFromBase(xy[1], xy[2]);
                showToolTips(event, distance, TL, ETL);
            });

            $e(links[i], 'mouseout', function () {hideToolTips();});
        }

        function showToolTips(evt, distance, trainingLevel, eTrainingLevel) {
            hideToolTips();
            var sp = 0.05 * trainingLevel + 1+ (eTrainingLevel*0.001*distance);

            var tw = d.createElement('div');
            tw.id = 'beyond_ToolTipsWindow';
            tw.style.position = 'absolute';
            tw.style.backgroundColor = 'lightyellow';
            tw.style.border = 'outset 2px lightyellow';
            tw.style.fontSize = '10px';
            tw.style.padding = '10px';
            tw.style.zIndex = 1000;
            var xxx = evt.pageX + 5;
            if (xxx > 700) xxx -=175;
            tw.style.left = xxx + 'px';
            tw.style.top = (evt.pageY +5) + 'px';

            var dv = d.createElement('div');
            dv.innerHTML = '移動時間/到着時刻の目安　　　　距離 [' + distance.toFixed(2) + ']<br>訓練所Lv.' + trainingLevel + ' (+' + (TL*5) + '%)<br>遠征訓練所Lv.'+eTrainingLevel+' (+'+(eTrainingLevel*0.1*distance).toFixed(3)+'%)' ;
            tw.appendChild(dv);

            var tbl = d.createElement('table');
            tbl.style.border = '2px solid black';
            tbl.style.borderCollapse = 'collapse';
            tbl.style.width = '100%';

            var now = cgetNow();

            for (var i = 0; i < OPT_TTDISTANCE_ITEMS.length; i++) {

                var tmp = OPT_TTDISTANCE_ITEMS[i].match(/.*\((-?[0-9]+([\.]{1}[0-9]+)?)\)/);
                if (!tmp) continue;
                var speed = parseFloat(tmp[1]);
                if (speed < 0) continue;

                var tr = d.createElement('tr');
                var td = d.createElement('td');
                td.style.border = '1px solid black';
                td.style.textAlign = 'left';
                td.appendChild(d.createTextNode( OPT_TTDISTANCE_ITEMS[i]));
                tr.appendChild(td);

                var timeText = getTime(speed * sp, distance);

                td = d.createElement('td');
                td.style.border = '1px solid black';
                td.style.textAlign = 'right';
                td.appendChild(d.createTextNode(timeText));
                tr.appendChild(td);

                var dayText = caddDate(now, timeText);
                dayText = dayText.substring(5, dayText.length - 3).replace('-', '/');

                td = d.createElement('td');
                td.style.border = '1px solid black';
                td.style.textAlign = 'right';
                td.appendChild(d.createTextNode(dayText));
                tr.appendChild(td);

                tbl.appendChild(tr);
            }

            tw.appendChild(tbl);
            $('beyond_floatpanel').appendChild(tw);

            function getTime(speed, dist) {
                var tmp = dist * 3600 / speed;
                var h = Math.floor(tmp / 3600);
                var m = Math.floor((tmp - h*3600) / 60);
                var s = Math.floor(tmp - h*3600 - m*60);
                var tim = h + ':' +
                          (m+100).toString().substr(-2)  + ':' +
                          (s+100).toString().substr(-2);
                return tim;
            }
        }

        function hideToolTips() {
            var tw = $('beyond_ToolTipsWindow');
            if (tw) {
                tw.parentNode.removeChild(tw);
            }
        }

        function saveTrainingLevel() {
            var vil_id = cgetCurrentVillageId();
            if (!vil_id) return;
            var basename = cgetCurrentBaseName();
            if (!basename) return;

            var level = 0;
            var elevel = 0;
            var map = $x('//area[contains(@alt, "訓練所")]');;
            if (0 < map.length) {
                for (var i = 0;i < map.length;i++) {
                    var lv = map[i].alt.match(/((?:遠征)?訓練所) LV.([0-9]+)/);
                    if (lv[1] == '訓練所') {
                        level = parseInt(lv[2], 10);
                    } else if (lv[1] == '遠征訓練所') {
                        elevel = parseInt(lv[2], 10);
                    }
                }
            }

            var lists = cloadData('TrainingLevels', '[]', true, true);
            var newLists = new Array();
            var isNewItem = true;
            for (var i = 0; i < lists.length; i++) {
                if (chasVillageId(lists[i].id)) {
                    var data = lists[i];
                    if (data.id == vil_id) {
                        data.basename = basename;
                        data.level = level;
                        data.elevel = elevel;
                        isNewItem = false;
                    }
                    newLists.push({id:data.id, basename:data.basename, level:data.level, elevel:data.elevel});
                }
                if (newLists.length == 10) {
                    break;
                }
            }

            if (isNewItem) {
                newLists.push({id:vil_id, basename:basename, level:level, elevel:elevel});
            }

            csaveData('TrainingLevels', newLists, true, true);
        }
    }
    //同盟/君主表示（ツールチップ）
    function disp_ToolTipsAllyPerson() {
        var links = $x('//a[(contains(@href, "village_change.php") or contains(@href, "land.php")) and not(contains(@href, "TB_inline") or contains(@href, "from") or contains(@onmouseover, "bigmap-caption"))]');
//console.log(links);
        if (links.length == 0) return;

        var selfVillages =cgetVillageIds();

        for (var i = 0; i < links.length; i++) {
            if (links[i].href.match(/village_change\.php/)) {
                var tmp = links[i].href.match(/village_id=([0-9]+)/);
                if (tmp && selfVillages[tmp[1]]) {
                    continue;
                }
            }

            links[i].alt = '';
            links[i].title = '';

            $e(links[i], 'mouseover', function(event) {showToolTips(event, this.href);});
            $e(links[i], 'mouseout', function() {hideToolTips();});
        }

        function showToolTips(evt, url) {
            hideToolTips();
            var tw = d.createElement('div');
            tw.id = 'beyond_ToolTipsWindow';
            tw.style.position = 'absolute';
            tw.style.backgroundColor = 'lightyellow';
            tw.style.border = 'outset 2px lightyellow';
            tw.style.fontSize = '10px';
            tw.style.padding = '10px';
            tw.style.zIndex = 1000;
            var xxx = evt.pageX + 5;
            if (xxx > 700) xxx -=50;
            tw.style.left = xxx + 'px';
            tw.style.top = (evt.pageY +5) + 'px';
            
//var dv1 = $('statMenu');

            var dv = d.createElement('div');
            
            
            dv.id = 'beyond_ToolTipsWindow_base';
                       
   //dv1.appendChild(dv);

            dv.appendChild(d.createTextNode('領地 : ...'));
            console.log(tw);

            tw.appendChild(dv);
            
            

            dv = d.createElement('div');
            dv.id = 'beyond_ToolTipsWindow_ally';
            dv.appendChild(d.createTextNode('同盟 : ...'));
            
            tw.appendChild(dv);
            
            
            

            dv = d.createElement('div');
            dv.id = 'beyond_ToolTipsWindow_user';
            dv.appendChild(d.createTextNode('君主 : ...'));
            tw.appendChild(dv);
            $('beyond_floatpanel').appendChild(tw);
//            $('beyond_floatpanel').appendChild(tw);

            cajaxRequest(url, 'GET', '', function(req) {
                var tw = $('beyond_ToolTipsWindow');
                if (!tw) return ;

                var dom = d.createElement('html');
                dom.innerHTML = req.responseText;

                var dt = getDatafromLandElm(dom);
                if (!dt) return ;
                
//----------------------------------------------------------------------
        var flg_profile_xy = false;
        var flg_include_a = false;

        //1行コメント
        var comment = $x('id("commentList")//tr/td[2]');

        for (var i = 0; i < comment.length; i++) {
            setXYLink(comment[i]);
        }

        //各エレメント
        var targetPath = new Array();

        if (location.pathname == '/alliance/chat_view.php') {
            targetPath.push('//div[contains(concat(" ", normalize-space(@class), " "), " hitokotoList ")]/p[2]');
        }
        if (location.pathname == '/alliance/info.php') {
            targetPath.push('//tr[th[contains(text(), "コメント")]]/td');
        }
        if (location.pathname == '/message/detail.php') {
            targetPath.push('//tr[th[contains(text(), "件名")]]/td');
            targetPath.push('//tr[th[contains(text(), "本文")]]/td');
        }
        if (location.pathname == '/bbs/res_view.php' ||
            location.pathname == '/bbs/personal_res_view.php') {
            targetPath.push('//th[contains(concat(" ", normalize-space(@class), " "), " mainTtl ")]/div[contains(concat(" ", normalize-space(@class), " "), " threadTtl ")]');
            targetPath.push('//td[contains(concat(" ", normalize-space(@class), " "), " contents ")]');
            targetPath.push('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[2]/td[1]');
        }
        if (location.pathname == '/user/index.php' || location.pathname == '/user/') {
            targetPath.push('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[position()>12]/td[2]');
            flg_profile_xy = true;
        }

        for (var i = 0; i < targetPath.length; i++) {
            var elms = $x(targetPath[i]);
            for (var j = 0; j < elms.length; j++) {
            console.log(elms);
                //setXYLink(elms[j]);
            }
        }
        
        
                function setXYLink(elm) {
            var tmpHTML = elm.innerHTML;

            var reg = /[\(|（|【]([\-0-9０-９]+)( *[,&、・，] *)([\-0-9０-９]+)[\)|）|】]/g;
            if (OPT_XYLINK_NK || flg_profile_xy) {
                reg = /([\-0-9０-９]+)( *[\,&、・，] *)([\-0-9０-９]+)/g;
            }

            var elm_child_a = null;
            if (flg_include_a) {
                elm_child_a = $s('descendant::a', elm);
            }

            //tmpHTML = tmpHTML.replace(reg, XYLinkReg);

            elm.innerHTML = tmpHTML;
}
//----------------------------------------------------------------------    

//	ryoutihyouji = d.createElement('div');
//	ryoutihyouji.id = 'test';
	
//	console.log(ryouti);
                if ($('beyond_ToolTipsWindow_base')) {
                    $('beyond_ToolTipsWindow_base').innerHTML = '領地 : ' + dt.base + '(' + dt.x + ',' + dt.y + ')';
                    $('beyond_ToolTipsWindow_ally').innerHTML = '同盟 : ' + dt.ally;
                    $('beyond_ToolTipsWindow_user').innerHTML = '君主 : ' + dt.user
                    
                    
		       
        var element = document.createElement('div'); 
        //var ryouti = innerHTML = '領地 : ' + dt.base + '(' + dt.x + ',' + dt.y + ')';
    	element.id = "id"; 
	    element.innerHTML = '同盟 : ' + dt.ally;
	    element.style.backgroundColor = 'white'; 
		            element.style.position = 'absolute';
            //element.style.backgroundColor = 'lightyellow';
          //  element.style.border = 'outset 2px lightyellow';
            element.style.fontSize = '10px';
            element.style.padding = '0px';
            element.style.zIndex = 1000;
            var xxx = evt.pageX + 50;
            if (xxx > 700) xxx -=50;
            element.style.left = xxx + 100 +'px';
            element.style.top = (evt.pageY) + 'px';

	    var objBody = $('statMenu'); 
	    objBody.appendChild(element);        
	    
	    
                  // elms.innerHTML = '領地 : ' + dt.base + '(' + dt.x + ',' + dt.y + ')';
                    //ryoutihyouji.appendChild(ryo);	      
                               // console.log(dt.ally);
	var ele = document.createElement("div");		// 新規に要素（タグ）を生成
	var str = document.createTextNode("あいうえお");	// 生成する要素の値（文字列）
	ele.appendChild(str);					// 生成する要素の作成（要素に値を追加）

	document.body.appendChild(ele);	  
                                
                                

                }
            }, function(req) {
            });

        }
        function hideToolTips() {
            var tw = $('beyond_ToolTipsWindow');
            if (tw) {
                tw.parentNode.removeChild(tw);
            }
        }
        function getDatafromLandElm(dom) {
            var ret = new Array();

            var nam = $s('//span[contains(concat(" ", normalize-space(@class), " "), " basename ")]', dom);

            if (!nam) return null;
            ret['base'] = nam.innerHTML;

            var xy = $s('//span[contains(concat(" ", normalize-space(@class), " "), " xy ")]', dom);
            if (!xy) return null;
            xy = xy.innerHTML.match(/([\-0-9]+),([\-0-9]+)/);
            if (!xy) return null;
            ret['x'] = parseInt(xy[1], 10);
            ret['y'] = parseInt(xy[2], 10);

            var a = $x('//div[contains(concat(" ", normalize-space(@class), " "), " status ")]//a', dom);
            if (a.length < 2) {
                ret['user'] = '';
                ret['ally'] = '';
            } else {
                ret['user'] = a[0].innerHTML;
                ret['ally'] = a[1].innerHTML;
            }
            return ret;
        }
    }

    //プロフィール画面星表示
    function disp_UserStar() {
        if (location.pathname == '/user/' || location.pathname == '/user/index.php') {
            showProfile();
        }

        function showProfile() {
            //君主名取得
            var uname_td = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//tr[2]/td[2]');
            if (!uname_td) return;
            var uname = uname_td.textContent;
            var uid = USER_ID;
            if (URL_PARAM.user_id) uid = URL_PARAM.user_id;
            //table★欄追加
            cappendColumnForProfile('★', 'beyond_star');

            //内容初期設定
            lists = cloadData('UserStarList' + uid, '[]', true, true);

            for (var i = 0; i < lists.length; i++) {
                var td = $('beyond_star_' + lists[i].x + '_' + lists[i].y);
                if (td && td.innerHTML == '') {
                    if (lists[i].npc) {
                        td.innerHTML = '★' + lists[i].star;
                        td.style.color = 'red';
                    } else {
                        td.innerHTML = '★' + lists[i].star + ' (' + lists[i].wood + ',' + lists[i].stone + ',' + lists[i].iron + ',' + lists[i].rice + ')';
                    }
                    td.style.opacity = lists[i].star * 0.05 + 0.5;
                }
            }
            //タイトルにGETを追加
            var th = $('beyond_star_title');
            if (th) {
                var lnk = d.createElement('a');
                lnk.href = 'javascript:void(0)';
                lnk.innerHTML ='(GET)';
                lnk.style.fontSize = '9px';

                var running = false;
                $e(lnk, 'click', function() {

                    if (running) return ;

                    if (confirm('☆情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい') == false) return;
                    running = true;

                    window.setTimeout(timerFunc, 0);

                    function timerFunc() {
                        var tds = $x('//td[contains(@id, "beyond_star_")]');
                        var targettd = '';
                        var targetid = '';
                        for (var i = 0; i < tds.length; i++) {
                            if (tds[i].innerHTML == '') {
                                targettd = tds[i];
                                targetid = tds[i].id;
                                break;
                            }
                        }
                        if (!targetid) {
                            alert('全ての☆情報を取得しました');
                            running = false;
                            return;
                        }

                        var xy = targetid.match(/beyond_star_([\-0-9]+)_([\-0-9]+)/);
                        if (!xy) {
                            GM_log('err');;
                            return ;
                        }

                        cajaxRequest('/map.php?x=' + xy[1] + '&y=' + xy[2], 'GET', '', function(req) {
                            var dom = d.createElement('html');
                            dom.innerHTML = req.responseText;
                            var mapType = cgetMapType(dom);
                            if (!(mapType & MAP_TYPE.ALL)) {
                                return null;
                            }

                            var areaContents = $x('id("mapOverlayMap")/area[contains(@onmouseover, "'+uname+'")] | id("map51-content")//li/div/a[contains(@onmouseover, "'+uname+'")][1]', dom);
                            for (var i = 0; i < areaContents.length; i++) {
                                var mapData = cgetMapItemDataFromItemDocument(areaContents[i], mapType);
                                var result = setStar(mapData.name, mapData.userName, mapData.population, mapData.xy, mapData.allyName, mapData.star, mapData.distance, mapData.wood, mapData.stone, mapData.iron, mapData.rice, mapData.isNPCBuild);
                                if (!result) continue;

                                var td = $('beyond_star_' + result.x + '_' + result.y);
                                if (!td) {GM_log('td null err?:' + result.x + ',' + result.y); return;};
                                if (td.innerHTML) continue;

                                csetUserStar(uid, result.x, result.y, result.star.length, result.wood, result.stone, result.iron, result.rice, result.npc);
                                if (result.npc) {
                                    td.innerHTML = '★' + result.star.length;
                                    td.style.color = 'red';
                                } else {
                                    td.innerHTML = '★' + result.star.length + ' (' + result.wood + ',' + result.stone + ',' + result.iron + ',' + result.rice + ')';
                                }
                                td.style.opacity = result.star.length * 0.05 + 0.5;
                            }

                            setTimeout(timerFunc, 0);

                        });
                    }
                });

                th.appendChild(lnk);

            }
            function setStar(name, user_name, jinko, xy, ally, star, kyori, wood, stone, iron, rice, npc) {
                if (uname == user_name) {
                    var tmp = xy.match(/\(([\-0-9]+),([\-0-9]+)\)/);
                    if (tmp) {
                        var x = tmp[1];
                        var y = tmp[2];
                        return {'user_name':user_name, 'x':x, 'y':y, 'star':star, 'wood':wood, 'stone':stone, 'iron':iron, 'rice':rice, 'npc':npc};
                    }
                }
                return null;
            }
        }
    }

    //プロフィール画面Level表示
    function disp_UserLevel() {

        if (location.pathname == '/user/' || location.pathname == '/user/index.php') {
            if (!URL_PARAM.user_id || USER_ID == URL_PARAM.user_id) {
                showProfile();
            }
        }
        if (location.pathname == '/land.php' || location.pathname == '/village.php') {
            //保存
            var spnxy = $s('//span[contains(concat(" ", normalize-space(@class), " "), " xy ")]');
            if (!spnxy) {
                return;
            }
            var xy = spnxy.innerHTML.match(/\(([\-0-9]+),([\-0-9]+)\)/);
            if (!xy) {
                return;
            }
            var tmp = spnxy.innerHTML.match(/レベル(\d+)/);
            if (tmp) {
                csetMyLevel(xy[1], xy[2], tmp[1]);
            } else {
                cdelMyLevel(xy[1], xy[2]);
            }
        }

        function showProfile() {
            //tableLevel欄追加
            cappendColumnForProfile('Level', 'beyond_level');

            //内容初期設定
            lists = cloadData('MyLevelList', '[]', true, true);
            for (var i = 0; i < lists.length; i++) {
                var td = $('beyond_level_' + lists[i].x + '_' + lists[i].y);
                if (td) {
                    td.innerHTML = lists[i].level;
                }
            }
            updateLevelUp();
            updateLevelUpLink();

            //タイトルにGETを追加
            var th = $('beyond_level_title');
            if (th) {
                var lnk = d.createElement('a');
                lnk.href = 'javascript:void(0)';
                lnk.innerHTML ='(GET)';
                lnk.style.fontSize = '9px';

                var running = false;
                $e(lnk, 'click', function() {
                    if (running) return ;

                    if (confirm('Level情報を一気に取得するためサーバに負荷をかけます。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい') == false) return;
                    running = true;
                    window.setTimeout(timerFunc, 0);

                    function timerFunc() {
                        var tds = $x('//td[contains(@id, "beyond_level_")]');
                        var targettd = '';
                        var targetid = '';
                        for (var i = 0; i < tds.length; i++) {
                            if (tds[i].innerHTML == '') {
                                targettd = tds[i];
                                targetid = tds[i].id;
                                break;
                            }
                        }
                        if (!targetid) {
                            updateLevelUp();
                            updateLevelUpLink();
                            running = false;
                            alert('全てのレベル情報を取得しました');
                            return;
                        }

                        var xy = targetid.match(/beyond_level_([\-0-9]+)_([\-0-9]+)/);
                        if (!xy) {
                            GM_log('err');;
                            return ;
                        }

                        cajaxRequest('/land.php?x=' + xy[1] + '&y=' + xy[2], 'GET', '', function(req) {
                            var dom = d.createElement('html');
                            dom.innerHTML = req.responseText;
                            var spnxy = $s('//span[contains(concat(" ", normalize-space(@class), " "), " xy ")]', dom);
                            if (!spnxy) {
                                GM_log('span class=xy err');
                                return;
                            }
                            var xy = spnxy.innerHTML.match(/\(([\-0-9]+),([\-0-9]+)\)/);
                            if (!xy) {
                                GM_log('xy match err');
                                return;
                            }
                            var level = 0;
                            var tmp = spnxy.innerHTML.match(/レベル(\d+)/);
                            if (tmp) {
                                level = tmp[1];
                            }
                            var td = $('beyond_level_' + xy[1] + '_' + xy[2]);
                            if (!td) {GM_log('td null err?:' + xy[1] + ',' + xy[2]); return;};
                            if (!td.innerHTML) {
                                csetMyLevel(xy[1], xy[2], level);
                                td.innerHTML = level;
                            }

                            setTimeout(timerFunc, 0);

                        });
                    }
                });

                th.appendChild(lnk);

            }

            function updateLevelUp() {
                //建設/破棄リストから
                var lists = cloadData('RemoveList', '[]', true, true);
                for (var i = 0; i < lists.length; i++) {
                    if (lists[i].kind != 5) continue;
                    var td = $('beyond_level_' + lists[i].x + '_' + lists[i].y);
                    if (!td) continue;
                    var level = parseInt(td.innerHTML, 10);
                    if (isNaN(''+level)) continue;
                    td.innerHTML =  level + ' (+)';
                }
            }
            function updateLevelUpLink() {
                var img_lvup = 'data:image/gif;base64,'+
                    'R0lGODlhFQAVAJEAAIaT6////////wAAACH5BAUUAAIALAAAAAAVABUAAAJDlICpi3YM14u0WhVY'+
                    'Rjn4zWlJx4HgiJrooqohm67A+c727GLpp8MhXZORRD4b8NYzQj4k5pDF2/CQl6pVclU4sgBDAQA7';
                var tds = $x('//td[contains(@id, "beyond_level_")]');
                for (var i = 0; i < tds.length; i++) {
                    if ('' + parseInt(tds[i].innerHTML, 10) == tds[i].innerHTML) {
                        var lv = parseInt(tds[i].innerHTML, 10);
                        if (lv < 1 || lv > 4) continue;
                        var mtbl = [2, 2, 2, 4];
                        var meisei = mtbl[lv - 1];
                        if (RES_NOW.fame >= meisei) {
                            var xy = tds[i].id.match(/beyond_level_([\-0-9]+)_([\-0-9]+)/);
                            if (xy) {
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

    //マップ中央表示
    function disp_MapCenter() {
        var mapType = cgetMapType();
        if (!(mapType & MAP_TYPE.ALL)) return;

        var cx = parseInt(URL_PARAM.x, 10);
        var cy = parseInt(URL_PARAM.y, 10);
        if (isNaN(''+cx)) cx = 0;
        if (isNaN(''+cy)) cy = 0;
        if (cx > MAP_X_MAX) cx = MAP_X_MAX;
        if (cx < MAP_X_MIN) cx = MAP_X_MIN;
        if (cy > MAP_Y_MAX) cy = MAP_Y_MAX;
        if (cy < MAP_Y_MIN) cy = MAP_Y_MIN;

        if (mapType & MAP_TYPE.NORMAL) {
            setCenter(cx, cy);
        } else if (mapType & MAP_TYPE.BIG) {
            var centerContent = $x('id("map51-content")//li/div/a[contains(@href, "x=' + cx + '") and contains(@href, "y=' + cy + '")]');
            var setCenterContent = null;
            if (centerContent.length <= 0) {
                return null;
            } else if (centerContent.length == 1) {
                setCenterContent = centerContent[0].cloneNode(true);
            } else {
                setCenterContent = centerContent[1];
            }

            setCenterContent.innerHTML = '中';

            centerContent[0].parentNode.parentNode.className += ' strong-text';
            centerContent[0].style.display = 'none';
            centerContent[0].parentNode.appendChild(setCenterContent);
            var match = null;
            if ((match = centerContent[0].parentNode.parentNode.className.match(/bg_[^\s]*/g)) && match.length == 1) {
                setCenterContent.style.color = 'red';
            } else {
                setCenterContent.style.color = 'moccasin';
            }

            $e(setCenterContent, 'mouseover', function(e) {
                var toolTipsCaption = $x('id("overDiv")//dl[contains(concat(" ", normalize-space(@class), " "), " bigmap ")]//*[contains(concat(" ", normalize-space(@class), " "), " bigmap-caption ")]');
                toolTipsCaption.forEach(function(self) {
                    self.appendChild(document.createTextNode('\u00A0(中央)'));
                });
            });
        }

        var dv = d.createElement('div');
        dv.style.fontSize= '10px';
        dv.appendChild(d.createTextNode('中央:( ' + cx + ' , ' + cy + ' )'));
        $('map-xy-search').appendChild(dv);

        function setCenter(x, y) {
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

            var no = cgetMapNofromXY(x, y, x, y, mapType);

            if (!no) {
                alert('ERROR:中央の値が取れませんでした');
                return;
            }

            var img = d.createElement('img');
            img.src = icon_c;
            img.className = 'mapAll'+no;

            if (mapType & MAP_TYPE.TYPE11) {
                img.style.paddingTop = '4px';
            } else if (mapType & MAP_TYPE.TYPE15) {
                img.style.paddingTop = '2px';
            } else if (mapType & MAP_TYPE.TYPE20) {
                img.style.paddingTop = '1px';
            }

            var rollover = $('rollover');
            rollover.parentNode.insertBefore(img, rollover.nextSibling);
        }
    }

    //討伐ゲージ回復時間表示
    function disp_ToubatsuRestTime() {
        if (location.pathname != '/card/deck.php') return ;

        ToubatsuRecoveryEstimates();

        function ToubatsuRecoveryEstimates() {
            var now = cgetNow();
            //デッキ
            var decks = $x('id("cardListDeck")//div[contains(concat(" ", normalize-space(@class), " "), " control ")]');
            for (var i = 0; i < decks.length; i++) {
                var stat = $s('descendant::dl/dd[3]', decks[i]);
                if (!stat) continue;
                if (stat.textContent == '内政セット済') continue;

                var tb = $s('descendant::dl/dd[1]/div[1]', decks[i]);
                if (!tb) continue;
                tb = 500 - parseInt(tb.textContent, 10);

                if (tb != 0) {
                    var timeText = getTime(tb);
                    var dayText = caddDate(now, timeText);
                    var txt = '500まで' + timeText + '後 (' + dayText + '完了)';

                    $s('descendant::dl/dt[1]', decks[i]).title = txt;
                    $s('descendant::dl/dd[1]', decks[i]).title = txt;
                }
            }
            //ファイル（カード表示）
            var files = $x('id("cardFileList")//div[contains(concat(" ", normalize-space(@class), " "), " control ")]');
            for (var i = 0; i < files.length; i++) {
                var tb = $s('descendant::dl/dd[1]/div[1]', files[i]);
                if (!tb) continue;
                tb = 300 - parseInt(tb.textContent, 10);

                if (tb != 0) {
                    var timeText = getTime(tb);
                    var dayText = caddDate(now, timeText);
                    var txt = '300まで' + timeText + '後 (' + dayText + '完了)';

                    $s('descendant::dl/dt[1]', files[i]).title = txt;
                    $s('descendant::dl/dd[1]', files[i]).title = txt;
                }
            }
            //ファイル（ｘ枚表示）
            var files = $x('//table[contains(concat(" ", normalize-space(@class), " "), " statusParameter1 ")]//tr[7]');
            for (var i = 0; i < files.length; i++) {

                var tb = $s('descendant::td[1]', files[i]);
                if (!tb) continue;
                tb = 300 - parseInt(tb.textContent, 10);

                if (tb != 0) {
                    var timeText = getTime(tb);
                    var dayText = caddDate(now, timeText);
                    var txt = '300まで' + timeText + '後 (' + dayText + '完了)';

                    $s('descendant::th[1]', files[i]).title = txt;
                    $s('descendant::td[1]', files[i]).title = txt;
                }
            }

            window.setTimeout(function() {ToubatsuRecoveryEstimates();}, 60*1000);
        }

        function getTime(toubatsu) {
            var tmp = toubatsu * 216;
            var h = Math.floor(tmp / 3600);
            var m = Math.floor((tmp - h*3600) / 60);
            var s = Math.floor(tmp - h*3600 - m*60);
            var tim = h + ':' +
                      (m+100).toString().substr(-2)  + ':' +
                      (s+100).toString().substr(-2);
            return tim;
        }
    }

    //書簡/報告書削除ボタン
    function disp_DeleteMessages() {
        if (location.pathname == '/message/detail.php') {
            //書簡削除ボタン
            addDeleteMessageButton();
        }
        if (location.pathname == '/report/detail.php') {
            //報告書削除ボタン
            addDeleteReportButton();
        }

        function addDeleteMessageButton() {
            var frm = d.createElement('form');
            frm.method = 'post';
            frm.action = '/message/delete.php';
            var m = d.createElement('input');
            m.type = 'hidden';
            m.name = 'mode';
            m.value = URL_PARAM.m;
            var p = d.createElement('input');
            p.type = 'hidden';
            p.name = 'p';
            p.value = URL_PARAM.p;
            var c = d.createElement('input');
            c.type = 'hidden';
            c.name = 'chk[]';
            c.value = URL_PARAM.id;

            var btn = d.createElement('input');
            btn.type = 'submit';
            btn.value = '削除';
            btn.setAttribute('onClick', "return window.confirm('この書簡を削除します。よろしいですか？');");
            frm.appendChild(m);
            frm.appendChild(p);
            frm.appendChild(c);
            frm.appendChild(btn);

            var li = d.createElement('li');
            li.className = 'last';
            li.appendChild(frm);
            var menu = $s('id("statMenu")');
            menu.appendChild(li);
        }
        function addDeleteReportButton() {
            var frm = d.createElement('form');
            frm.method = 'post';
            frm.action = '/report/list.php';
            var m = d.createElement('input');
            m.type = 'hidden';
            m.name = 'm';
            m.value = URL_PARAM.m;
            var p = d.createElement('input');
            p.type = 'hidden';
            p.name = 'p';
            p.value = URL_PARAM.p;
            var u = d.createElement('input');
            u.type = 'hidden';
            u.name = 'u';
            u.value = URL_PARAM.u;
            var c = d.createElement('input');
            c.type = 'hidden';
            c.name = 'chk[]';
            c.value = URL_PARAM.id;

            var btn = d.createElement('input');
            btn.type = 'submit';
            btn.name = 'remove_checked';
            btn.value = '削除';
            btn.setAttribute('onClick', "return window.confirm('この報告書を削除します。よろしいですか？');");
            frm.appendChild(m);
            frm.appendChild(p);
            frm.appendChild(c);
            frm.appendChild(u);
            frm.appendChild(btn);

            var h2 = $s('//h2');
            h2.parentNode.insertBefore(frm, h2.nextSibling);
        }
    }

    //出発時刻計算
    function disp_TSendTime() {
        if (location.pathname != '/facility/castle_send_troop.php') return;

        var td = $s('//table[contains(concat(" ", normalize-space(@class), " "), " fighting_about ")]//tr[1]/td[1]');
        if (!td) return ;

        var tim = td.textContent.match(/到着まで[:|：][\s|　]*(\d+):(\d+):(\d+)[\s|　]*到達時間/);
        if (!tim) return;

        var area_up_timer = $('area_up_timer0');
        if (!area_up_timer) return;
        var day = area_up_timer.textContent.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
        if (!day) return;

        //ベース作成
        var div = d.createElement('div');
        div.style.margin = '5px';
        div.appendChild(d.createTextNode('到着時刻：'));
        createText(div, 'beyond_send_y', day[1]);
        div.appendChild(d.createTextNode('-'));
        createText(div, 'beyond_send_m', day[2]);
        div.appendChild(d.createTextNode('-'));
        createText(div, 'beyond_send_d', day[3]);
        div.appendChild(d.createTextNode('　'));
        createText(div, 'beyond_send_h', '');
        div.appendChild(d.createTextNode(':'));
        createText(div, 'beyond_send_mi', '');
        div.appendChild(d.createTextNode(':'));
        createText(div, 'beyond_send_s', '');
        div.appendChild(d.createTextNode('　'));
        var btn = d.createElement('input');
        btn.type = 'button';
        btn.id = 'beyond_send_button';
        btn.value = '出発時刻計算';
        div.appendChild(btn);

        div.appendChild(d.createElement('br'));
        div.appendChild(d.createTextNode('出発時刻：'));

        var spn = d.createElement('span');
        spn.id = 'beyond_send_time';
        div.appendChild(spn);

        td.appendChild(div);

        $e(btn, 'click', function() {
            if ($('beyond_send_y').value == '') $('beyond_send_y').value = '0';
            if ($('beyond_send_m').value == '') $('beyond_send_m').value = '0';
            if ($('beyond_send_d').value == '') $('beyond_send_d').value = '0';
            if ($('beyond_send_h').value == '') $('beyond_send_h').value = '0';
            if ($('beyond_send_mi').value == '') $('beyond_send_mi').value = '0';
            if ($('beyond_send_s').value == '') $('beyond_send_s').value = '0';
            var y = $('beyond_send_y').value;
            var m = $('beyond_send_m').value;
            var d = $('beyond_send_d').value;
            var h = $('beyond_send_h').value;
            var mi =$('beyond_send_mi').value;
            var s = $('beyond_send_s').value;

            y = parseInt(y, 10);
            m = parseInt(m, 10);
            d = parseInt(d, 10);
            h = parseInt(h, 10);
            mi =parseInt(mi, 10);
            s = parseInt(s, 10);
            if (isNaN(''+y) || isNaN(''+m) || isNaN(''+d) || isNaN(''+h) || isNaN(''+mi) || isNaN(''+s)) {
                alert('数字で入力して下さい');
                return;
            }

            var dt = new Date(y, m - 1, d, h - parseInt(tim[1], 10), mi - parseInt(tim[2], 10), s - parseInt(tim[3], 10));

            $('beyond_send_time').innerHTML =
                dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate() + ' ' +
                (dt.getHours()+100).toString().substr(-2)  + ':' +
                (dt.getMinutes()+100).toString().substr(-2)  + ':' +
                (dt.getSeconds()+100).toString().substr(-2);
        });

        function createText(container, id, def) {
            var tb = d.createElement('input');
            tb.type = 'text';
            tb.value = def;
            tb.id = id;
            tb.size = 3;
            container.appendChild(tb);
        }
    }

    //小さいボタン
    function disp_SmallButton() {
        var btnConfs

        if (!isNarrow) {
            btnConfs = {
                btn_buycp : {width : 26, start : -8},
                btn_special : {width : 26, start : -29},
                btn_getbusho : {width : 20, start : -2},
                btn_bushoduel : {width : 27, start : -1},
                btn_invitefriend : {width : 27, start : -9},
                btn_busyobook : {width :27,	start : -55},
                hbtn_itemshop945 : {width :27,	start : -1}
            };
        } else {
            btnConfs = {
                hbtn_buycp : {width : 26, start : -6},
                hbtn_special : {width : 26, start : -26},
                hbtn_getbusho : {width : 20, start : -2},
                hbtn_yorodudas : {width : 25, start : -2},
                hbtn_bushoduel : {width : 27, start : -1},
                btn_busyobook : {width :27,	start : -55},
                hbtn_itemshop : {width :27,	start : -1}
            };

        }

        var btnImages = $x('(id("sidebar")/ul/li | id("btn_area_box"))//img');

        for (var i = 0; i < btnImages.length; i++) {
            var btnImage = btnImages[i];
            for (var key in btnConfs) {
                if (btnImage.src.indexOf(key) < 0) {
                    continue;
                }
                var btnConf = btnConfs[key];
                var btn = btnImage.parentNode;
                var btnHeight = 22;
                if (isNarrow) btnHeight = 25;
                btnImage.style.display = 'none';

                btn.style.width = btnConf.width+'px';
                btn.style.height = btnHeight+'px';
                btn.style.marginLeft = '2px';
                btn.style.marginBottom = '2px';
                btn.style.background = 'url("'+btnImage.src+'") no-repeat '+btnConf.start+'px 0px';
                btn.style.display = 'block';

                var floatNode = btn;
                if (!isNarrow) floatNode = btn.parentNode;

                floatNode.style.cssFloat = 'left';

                if (i == 0) {
                    btn.style.marginLeft = '0px';
                }
            }
        }

        if (!isNarrow) cgetElementSibling(floatNode.parentNode, 0).style.clear = 'both';

        //状況の縮小
        var tr = $s('//table[contains(concat(" ", normalize-space(@class), " "), " situationTable ")]//tr[1]');
        var tds = $x('//table[contains(concat(" ", normalize-space(@class), " "), " situationTable ")]//tr[2]//img[not(contains(@src, "sit_blank"))]/ancestor::td');
        if (tr && tds) {
            for (var i = 0; i < tds.length; i++) {
                tr.appendChild(tds[i]);
            }

            cgetElementSibling(tr, 0).style.display = 'none';

            var imgs = $x('.//img', tr);
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].style.width = '20px';
                imgs[i].style.height = '20px';
                if (!imgs[i].src.match(/(_no\.gif)$/)) {
                    elementQueue.push(imgs[i]);
                }
            }
        }

        //拠点・生産・簡易出兵先の伸縮
        var targetNames = ['base', 'production', 'easydeploy'];
        var targets = {
                base : {
                    closer : '(id("lodgment") | id("sidebar"))//img[contains(@src, "icon_base")]/..',
                    inner : 'ancestor::div[contains(@class, "Head")]/following-sibling::div[contains(@class, "Inner")]'
                },
                production : {
                    closer : 'id("sidebar")//img[contains(@src, "icon_production")]',
                    inner : 'ancestor::div[contains(@class, "Head")]/following-sibling::div[contains(@class, "Inner")]'
                },
                easydeploy : {
                    closer : '(//div[contains(concat(" ", normalize-space(@class), " "), " footer_box ")] | id("sidebar"))//img[contains(@src, "icon_easydeploy")]',
                    inner : 'ancestor::div[contains(@class, "Head")]/following-sibling::div[contains(@class, "Inner")] | id("map_bookmark")'
                }
        };
        for (var i = 0; i < targetNames.length; i++) {
            if (isNarrow && targetNames[i] == 'base' && location.pathname.search(/^\/(?:village|(?:big_)?map|land)\.php/) < 0) {
                continue;
            }

            var target = targets[targetNames[i]];

            var base_closer = $s(target.closer);
            if (!base_closer) continue;

            var base_inner = $s(target.inner, base_closer);
            if (!base_inner) continue;

            var oc = cloadData('sidebox_oc' + i, '', true);
            if (oc) {
                base_inner.style.display = 'none';
                base_closer.style.opacity = 0.3;
            }

            (function(inner, no) {
                $e(base_closer, 'click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();

                    var ocs = '';
                    if (inner.style.display == 'none') {
                        inner.style.display = '';
                        this.style.opacity = 1;
                    } else {
                        inner.style.display = 'none';
                        this.style.opacity = 0.3;
                        ocs = '1';
                    }
                    csaveData('sidebox_oc' + no, ocs, true);
                    return false;
                }, true);
            })(base_inner, i);
        }
    }

    //出兵マップ表示
    function disp_AttackMap() {
        var img_atk = 'data:image/gif;base64,'+
                'R0lGODlhPAA8AIAAAP/M/////yH5BAUUAAEALAAAAAA8ADwAAAJ7jI+py+0Po5y02ouz3rz7D4bi'+
                'SJbmiabqyrbuC8fyTNf2jef6zvc8AATsgsEckYg7Fm9KoPE4XCakMCeDqmpCoSxt0yBsWQNj6bgb'+
                'dmJl6jUN+RSe3+V59ayMYZdwevjQd/c3ZbfiRlaYlXiYcsglFugjOUlZaXmJWVEAADs=';
        var img_mov = 'data:image/gif;base64,'+
                'R0lGODlhPAA8AIAAADP//////yH5BAUUAAEALAAAAAA8ADwAAAJ7jI+py+0Po5y02ouz3rz7D4bi'+
                'SJbmiabqyrbuC8fyTNf2jef6zvc8AATsgsEckYg7Fm9KoPE4XCakMCeDqmpCoSxt0yBsWQNj6bgb'+
                'dmJl6jUN+RSe3+V59ayMYZdwevjQd/c3ZbfiRlaYlXiYcsglFugjOUlZaXmJWVEAADs=';
        if (location.pathname == '/facility/unit_status.php') {
            var tds = $x('//table[@summary="出撃中の兵士" or @summary="移動中の兵士"]/tbody/tr[position()>1]/td[1]');

            for (var i = 0; i < tds.length; i+=3) {
                //0：場所　1：時間　2：兵種
                var xy = tds[i+0].innerHTML.match(/[\(|（](-?\d+),(-?\d+)[）|\)]$/);
                if (!xy) continue;
                var tim = tds[i+1].innerHTML.match(/(\d+\-\d+\-\d+ \d+:\d+:\d+)/);
                if (!tim) continue;
                var kind = 0;
                if (tds[i].parentNode.parentNode.parentNode.getAttribute('summary') == '移動中の兵士')
                    kind = 1;
                addList(tim[1], parseInt(xy[1], 10), parseInt(xy[2], 10), kind);

                var a = $s('descendant::div/a[contains(text(), "キャンセルする")]', tds[i+1]);
                if (a) {
                    (function(tim, x, y) {
                        $e(a, 'click', function() {
                            var lists = cloadData('AttackList', '[]', true, true);
                            for (var i = 0; i < lists.length; i++) {
                                if (lists[i].x == x && lists[i].y == y && lists[i].time == tim) {
                                    lists.splice(i, 1);
                                    csaveData('AttackList', lists, true, true);

                                    break;
                                }
                            }
                        });
                    })(tim[1], parseInt(xy[1], 10), parseInt(xy[2], 10));
                }
            }
            return;
        }

        var lists = cloadData('AttackList', '[]', true, true);
        lists = checkList(lists);       //時間を過ぎたものを削除

        var mapType = cgetMapType();
        if (mapType & MAP_TYPE.ALL) {
            //地図に表示
            if (lists.length) {
                var cx = parseInt(URL_PARAM.x, 10);
                var cy = parseInt(URL_PARAM.y, 10);
                if (cx > MAP_X_MAX) cx = MAP_X_MAX;
                if (cx < MAP_X_MIN) cx = MAP_X_MIN;
                if (cy > MAP_Y_MAX) cy = MAP_Y_MAX;
                if (cy < MAP_Y_MIN) cy = MAP_Y_MIN;

                var map = null;
                if (mapType & MAP_TYPE.NORMAL) {
                    map = $s('id("mapsAll")');
                }
                var mapAreaContents = null;
                for (var i = 0; i < lists.length; i++) {
                    mapAreaContents = $s('id("mapOverlayMap")/area[contains(@href, "x=' + lists[i].x + '") and contains(@href, "y=' + lists[i].y + '")] | id("map51-content")//li/div/a[contains(@href, "x=' + lists[i].x + '") and contains(@href, "y=' + lists[i].y + '")][1]');

                    if (mapType & MAP_TYPE.NORMAL) {
                        var no = cgetMapNofromXY(lists[i].x, lists[i].y, cx, cy, mapType);
                        if (!no) continue;
                        var img = document.createElement('img');
                        img.className = 'mapAll' + no;
                        if (lists[i].kind == 1) {
                            img.src = img_mov;
                        } else {
                            img.src = img_atk;
                        }
                        img.title = lists[i].time;
                        map.appendChild(img);

                        if (mapAreaContents) {
                            mapAreaContents.title += '　到着予定2:' + lists[i].time;
                            mapAreaContents.alt += '　到着予定2:' + lists[i].time;
                        }
                        csetMapStarDisable(no);
                    } else if (mapType & MAP_TYPE.BIG) {
                        var setMapAreaContents = null;
                        if (mapAreaContents.length <= 0) {
                            continue;
                        } else if (mapAreaContents.length == 1) {
                            setMapAreaContents = mapAreaContents[0].cloneNode(true);
                        } else {
                            setMapAreaContents = mapAreaContents[1];
                        }

                        if (lists[i].kind == 1) {
                            setMapAreaContents.innerHTML = '援';
                        } else {
                            setMapAreaContents.innerHTML = '出';
                        }

                        mapAreaContents[0].style.display = 'none';
                        mapAreaContents[0].parentNode.appendChild(setMapAreaContents);

                        var match = null;
                        if ((match = mapAreaContents[0].parentNode.parentNode.className.match(/bg_[^\s]*/g)) && match.length == 1) {
                            setMapAreaContents.style.color = 'red';
                        } else {
                            setMapAreaContents.style.color = 'moccasin';
                        }

                        (function (time) {
                            $e(setMapAreaContents, 'mouseover', function(e) {
console.log("by");
                                var toolTips = $x('id("overDiv")//dl[contains(concat(" ", normalize-space(@class), " "), " bigmap ")]//*[contains(concat(" ", normalize-space(@class), " "), " bottom-popup-")]');
                                if (toolTips.length == 0) {
                                    return;
                                }
                                for (var i = 0; i < toolTips.length; i++) {
                                    toolTips[i].className = '';
                                }

                                var dt = document.createElement('dt');
                                dt.className = 'bottom-popup-l';
                                dt.appendChild(document.createTextNode('到着予定'));

                                var dd = document.createElement('dd');
                                dd.className = 'bottom-popup-r';
                                dd.appendChild(document.createTextNode(time));

                                toolTips[toolTips.length - 1].parentNode.appendChild(dt);
                                toolTips[toolTips.length - 1].parentNode.appendChild(dd);
                            });
                        })(lists[i].time);
                    }
                }
            }
        }

        function addList(tim, x, y, kind) {
            var lists = cloadData('AttackList', '[]', true, true);

            var i;
            for (i = 0; i < lists.length; i++) {
                if (lists[i].x == x && lists[i].y == y) {
                    if (lists[i].time < tim) {
                        lists[i].time = tim;
                        lists[i].kind = kind;
                        break;
                    } else {
                        return;
                    }
                }
            }
            if (i == lists.length) {
                lists.push({'x':x, 'y':y, 'time':tim, 'kind':kind});
            }
            csaveData('AttackList', lists, true, true);
        }

        function checkList(lists) {
            var dt = new Date();
            var ntime = dt.getFullYear() + '-' +
                        (dt.getMonth()+101).toString().substr(-2) + '-' +
                        (dt.getDate()+100).toString().substr(-2) + ' ' +
                        (dt.getHours()+100).toString().substr(-2)  + ':' +
                        (dt.getMinutes()+100).toString().substr(-2)  + ':' +
                        (dt.getSeconds()+100).toString().substr(-2);
            var deleted = false;
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].time < ntime) {
                    lists.splice(i, 1);
                    i--;
                    deleted = true;
                }
            }
            if (deleted) {
                if (lists.length) {
                    csaveData('AttackList', lists, true, true);
                } else {
                    cdelData('AttackList', true);
                }
            }
            return lists;
        }
    }

    //合成支援ボタン
    function disp_CardCombine() {
        if (location.pathname != '/union/result_lv.php' &&
            location.pathname != '/union/result_learn.php' &&
            location.pathname != '/union/result_remove.php') {
            return;
        }

        var ins = $x('//div[contains(concat(" ", normalize-space(@class), " "), " back ")]')[1];
        var skill2 = $s('//div[contains(concat(" ", normalize-space(@class), " "), " skill2 ")]');
        var skill3 = $s('//div[contains(concat(" ", normalize-space(@class), " "), " skill3 ")]');

        var div1 = d.createElement('div');
        div1.className = 'cardColmn';
        div1.align = 'center';
        var div2 = d.createElement('div');
        div2.className = 'control';
        div1.appendChild(div2);

        var a = d.createElement('a');
        a.href = caddSessionId('lvup.php?cid=' + URL_PARAM.cid);
        a.title = 'スキルLvを上げる';
        a.className = 'skillLvUp';
        a.appendChild(d.createTextNode('スキルLvを上げる'));
        div2.appendChild(a);

        if (!skill3) {
            a = d.createElement('a');
            a.href = caddSessionId('learn.php?cid=' + URL_PARAM.cid);
            a.title = '新しいスキルを習得する';
            a.className = 'skillLearn';
            a.appendChild(d.createTextNode('新しいスキルを習得する'));
            div2.appendChild(a);
        }
        if (skill2) {
            a = d.createElement('a');
            a.href = caddSessionId('remove.php?cid=' + URL_PARAM.cid);
            a.title = 'スキルを削除する';
            a.className = 'skillDelete';
            a.appendChild(d.createTextNode('スキルを削除する'));
            div2.appendChild(a);
        }

        ins.parentNode.insertBefore(div1, ins.nextSibling);
    }

    //ヨロズダス表示
    function disp_Yorozu() {
        if (location.pathname == '/busyodas/b3kuji.php') {
            updateYorozuState();
        }
        if (location.pathname == '/busyodas/b3kuji_result.php') {
            updateYorozuState2();
        }

        displayYorozuState();
    }

    //HP回復時間表示
    function disp_HPRestTime() {
        if (location.pathname != '/card/deck.php') return ;

        displayRecoveryEstimates();

    }

    //拠点生産力表示
    function disp_Seisan() {
//        if (location.pathname != '/village.php') return;

        var icon = IMG_DIR  + 'common/sidebar/icon_production.gif';
        var elms = ccreateSideBox('beyond_sidebox_suzanseisan', icon, '拠点生産力');
        Suzan_Seisan(elms.sideBoxInner);
    }


    //共通関数
    function cgetCurrentBaseName() {
        var xy = cgetCurrentBaseXY();
        return VILLAGES_INFO[(xy.x+'_'+xy.y).replace(/-/g, 'm')].basename;
    }

    function cgetCurrentBaseXY() {
	var gnaviorgNav = d.getElementById("gnavi");
	//console.log(gnaviorgNav);

    if(gnaviorgNav) {
        var nowLoc = $s('id("gnavi")//a[contains(@href, "map.php")]');
        }else{
        var nowLoc = $s('id("gNav")//a[contains(@href, "map.php")]');};
       
//console.log(nowLoc);
        if (!nowLoc) return null;
        var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
        if (xy) {
            return {'x':parseInt(xy[1], 10), 'y':parseInt(xy[2], 10)};
        }
    }

    function cgetDistanceFromBase(x, y) {
        if (BASE_X == -9999) {
            var xy = cgetCurrentBaseXY();
            if (xy) {
                BASE_X = xy.x;
                BASE_Y = xy.y;
            }
        }
        if (BASE_X != -9999) {
            var a = parseInt(x, 10);
            var b = parseInt(y, 10);
            return Math.sqrt(Math.pow(BASE_X - a, 2) + Math.pow(BASE_Y - b, 2));
        }
        return -1;
    }

    function cupdateCurrentResources() {
        var nowNodes = PRE_LOAD_NODES['nowResources'];
        RES_NOW['wood'] = parseInt(nowNodes['wood'].innerHTML, 10);
        RES_NOW['stone'] = parseInt(nowNodes['stone'].innerHTML, 10);
        RES_NOW['iron'] = parseInt(nowNodes['iron'].innerHTML, 10);
        RES_NOW['rice'] = parseInt(nowNodes['rice'].innerHTML, 10);
    }

    function cgetNow() {
        var stimeText = PRE_LOAD_NODES['serverTime'].innerHTML;
        var now = new Date();
        var nowTimeAry = stimeText.replace(/^\s*|\s*$/, '').split(':');
        now.setHours(parseInt(nowTimeAry[0], 10), parseInt(nowTimeAry[1], 10), parseInt(nowTimeAry[2], 10));
        return now;
    }

    function caddDate(baseDate, timetxt) {
        var　tim　=　timetxt.match(/(\d+):(\d+):(\d+)/);
        if (!tim) return '';

        var dt = new Date(baseDate.getFullYear(),
                          baseDate.getMonth(),
                          baseDate.getDate(),
                          baseDate.getHours() + parseInt(tim[1], 10),
                          baseDate.getMinutes() + parseInt(tim[2], 10),
                          baseDate.getSeconds() + parseInt(tim[3], 10));

        return dt.getFullYear() + '-' + (dt.getMonth()+1) + '-' + dt.getDate() + ' ' +
                (dt.getHours()+100).toString().substr(-2)  + ':' +
                (dt.getMinutes()+100).toString().substr(-2)  + ':' +
                (dt.getSeconds()+100).toString().substr(-2);
    }

    //状態保存用クッキー
    function csetCookie(key, data) {
        sday = new Date();
        sday.setTime(sday.getTime() + (120 * 1000 * 60 * 60 * 24));
        d.cookie = key + '=' + escape(data) + ';expires=' + sday.toGMTString() + '; path=/';
    }
    function cgetCookie(key) {
        var data = '';
        var start = d.cookie.indexOf(key + '=');
        if (start != -1) {
            var end = d.cookie.indexOf(';', start);
            data = unescape(d.cookie.substring(start + key.length + 1, end));
        }
        return data;
    }
    function cdelCookie(key) {
        d.cookie = key + '=;expires=Thu,01-Jan-70 00:00:01 GMT; path=/';
    }

    function csetUserXY(aid, uid, x, y) {
        var allylists = cloadData('allyXYAllyList', '[]', true, true);

        if (allylists.indexOf(aid) == -1) {
            allylists.push(aid);
            csaveData('allyXYAllyList', allylists, true, true);
        }

        var lists = cloadData('allyXYList' + aid, '[]', true, true);

        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id == uid) {
                return;
            }
        }
        lists.push({'id':uid, 'x':x, 'y':y});
        csaveData('allyXYList' + aid, lists, true, true);
    }
    function cdeleteUserXY(aid) {
        var allylists = cloadData('allyXYAllyList', '[]', true, true);

        var idx = allylists.indexOf(aid);
        if (idx != -1) {
            allylists.splice(idx, 1);
            csaveData('allyXYAllyList', allylists, true, true);
        }
        cdelData('allyXYList' + aid, true);
    }
    function cresetUserXY() {
        var allylists = cloadData('allyXYAllyList', '[]', true, true);

        for (var i = 0; i < allylists.length; i++) {
            cdelData('allyXYList' + allylists[i], true);
        }
        cdelData('allyXYAllyList', true);
    }

    function cgetXYHtml(x, y) {
        var img_send = IMG_DIR + 'report/icon_go.gif';
        var img_mp = IMG_DIR + 'report/icon_scout.gif';
        var m = '';
        var dist = cgetDistanceFromBase(x, y);
        if (dist != -1) {
            m = '　距離[' + dist.toFixed(2) + ']';
        }
        var txt = '';
        txt += '<a href="'+caddSessionId('/land.php?x=' + x + '&y=' + y)+'" title="表示" style="color:#0099cc; text-decoration: none;" onmouseover="';
        txt += "this.style.textDecoration='underline';"+'" onmouseout="'+"this.style.textDecoration='none';"+'">' + x + ',' + y + '</a>';
        txt += '<a href="'+caddSessionId('/map.php?x=' + x + '&y=' + y)+'" title="マップ' + x + ',' + y + '"><img src="' + img_mp + '" style="width:12px; height:12px; vertical-align:middle;"></a>';
        txt += '<a href="'+caddSessionId('/facility/castle_send_troop.php?x=' + x + '&y=' + y)+'" title="兵を送る' + x + ',' + y + m + '">';
        txt += '<img src="' + img_send + '" style="width:12px; height:12px; vertical-align:middle;"></a>';

        return txt;
    }

    function cajaxRequest(url, method, param, func_success, func_fail) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                func_success(req);
            } else if (req.readyState == 4 && req.status != 200) {
                func_fail(req);
            }
        };

        if (SID) {
            var sdata = method.toLowerCase() == 'get' ? url : param;
            if (sdata.search(/(\?|&)SSID=[^&]+&?/i) < 0) {
               if (method.toLowerCase() == 'get') {
                   url += (0 <= url.indexOf('?')) ? '&' : '?';
                   url += SID;
               } else {
                   if (typeof param != 'string') param = '';
                   if (0 < param.length) param += '&';
                   param += SID;
               }
            }
        }

        req.open(method, url, true);
        if (method == 'POST') {
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        req.send(param);
    }

    function str2csvstr(str) {
        var csvstr;

        csvstr =  str.replace(/^[\s　]+|[\s　]+$/g, '');
        csvstr = csvstr.replace(/"/g, '""');

        if (csvstr.indexOf(',') != -1) {
            csvstr = '"' + csvstr + '"';
        }

        return csvstr;
    }

    function cgetElementXY(elm) {
        if (!elm) return null;

        var xx = 0;
        var yy = 0;
        while (elm) {
            xx += elm.offsetLeft;
            yy += elm.offsetTop;
            elm = elm.offsetParent;
        }
        return {'x':xx, 'y':yy};
    }

    function cgetMapNofromXY(x, y, base_x, base_y, type) {
        if (isNaN(''+base_x)) base_x = 0;
        if (isNaN(''+base_y)) base_y = 0;

        //map.php専用のXY座標→mapAll999
        var sc = 0;
        var hosei = 0;
        if (type & MAP_TYPE.TYPE11) {
            sc = 11;
        } else if (type & MAP_TYPE.TYPE15) {
            sc = 15;
        } else if (type & MAP_TYPE.TYPE20) {
            sc = 20;
            hosei = 1;
        } else if (type & MAP_TYPE.TYPE51) {
            sc = 51;
        } else {
            return null;
        }

        var hw = Math.floor((sc - 1) / 2);
        var no = '';
        if (x >= base_x - hw && x <= base_x - hw + sc - 1 &&
            y >= base_y - hw - hosei && y <= base_y - hw + sc - 1 - hosei) {
            no = (x - base_x + hw) * sc + (base_y + hw - y) + 1;
            if (no < 10) no = '0' + no;
            else no = '' + no;
        }
        return no;
    }

    function ccreateBlankRow(container, left) {
        left +=2;
        var dv = d.createElement('div');
        dv.style.padding = '2px';
        dv.style.paddingLeft= left + 'px';
        dv.innerHTML= '&nbsp;';
        container.appendChild(dv);
    }

    function ccreateCheckBox(container, id, def, text, title, left) {
        left += 2;
        var dv = d.createElement('div');
        dv.style.padding = '2px';
        dv.style.paddingLeft= left + 'px';
        dv.title = title;
        var cb = d.createElement('input');
        cb.type = 'checkbox';
        cb.id = id;
        cb.value = 1;
        if (def) cb.checked = true;

        var lb = d.createElement('label');
        lb.htmlFor = id;

        var tx = d.createTextNode('\u00a0' + text);
        lb.appendChild(tx);

        dv.appendChild(cb);
        dv.appendChild(lb);
        container.appendChild(dv);
        return cb;
    }

    function ccreateTextBox(container, id, def, text, title, size, left) {
        left += 2;
        var dv = d.createElement('div');
        dv.style.padding = '2px';
        dv.style.paddingLeft= left + 'px';
        dv.title = title;
        var tb = d.createElement('input');
        tb.type = 'text';
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

    function ccreateComboBox(container, id, sels, def, text, title, left) {
        left += 2;
        var dv = d.createElement('div');
        dv.style.padding = '2px';
        dv.style.paddingLeft= left + 'px';
        dv.title = title;
        var sel = d.createElement('select');
        sel.id = id;
        for (var i = 0; i < sels.length; i++) {
            var opt = d.createElement('option');
            opt.value = sels[i];
            opt.appendChild(d.createTextNode(sels[i]));
            sel.appendChild(opt);
        }
        if (def) sel.value = def;

        var tx = d.createTextNode(text);
        tx.title = title;

        dv.appendChild(tx);
        dv.appendChild(sel);
        container.appendChild(dv);
        return sel;
    }

    function ccreateButton(container, text, title, func) {
        var btn = d.createElement('input');
        btn.style.padding = '1px';
        btn.type = 'button';
        btn.value = text;
        btn.title = title;
        container.appendChild(d.createTextNode(' '));
        container.appendChild(btn);
        container.appendChild(d.createTextNode(' '));
        $e(btn, 'click', func);
        return btn;
    }

    function cgetCheckBoxValue(id) {
        var c = $(id);
        if (!c) return 0;
        if (!c.checked) return 0;
        return 1;
    }

    function cgetTextBoxValue(id) {
        var c = $(id);
        if (!c) return '';
        return c.value;
    }

    function ccreateSideBox(id, img, title) {
        var icon_box = 'data:image/gif;base64,'+
            'R0lGODlhCwALAJEAAP///zMzM////wAAACH5BAUUAAIALAAAAAALAAsAAAIVjI8Gy6z5AoAyplkh'+
            'xteiTW1NQyUFADs=';

        var conf = cloadData(id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);

        var elm_box = d.createElement('div');
        elm_box.id = id;
        elm_box.className = 'sideBox';

        var elm_boxHead = d.createElement('div');
        elm_boxHead.className = 'sideBoxHead';
        elm_box.appendChild(elm_boxHead);

        if (isNarrow) {
            elm_box.style.cssFloat = 'left';
            elm_box.style.marginLeft = '10px';
        }

        var elm_h3 = d.createElement('h3');

        var elm_strong = d.createElement('strong');

        var elm_img = d.createElement('img');
        elm_img.src = img;
        elm_strong.appendChild(elm_img);
        elm_strong.appendChild(d.createTextNode(title));

        var elm_span=d.createElement('span');
        elm_span.className = 'beyond_panel_ctlbox';
        var elm_img_up = d.createElement('img');
        elm_img_up.src= IMG_DIR + 'trade/icon_up.gif';
        elm_img_up.title = 'パネルを上に';
        elm_img_up.id = id + 'up';
        var elm_img_down = d.createElement('img');
        elm_img_down.src= IMG_DIR + 'trade/icon_down.gif';
        elm_img_down.title = 'パネルを下に';
        elm_img_down.id = id + 'down';
        var elm_img_box = d.createElement('img');
        elm_img_box.src= icon_box;
        elm_img_box.title = 'フローティング/ドッキングの切り替え';
        elm_span.appendChild(elm_img_up);
        elm_span.appendChild(elm_img_box);
        elm_span.appendChild(elm_img_down);

        elm_strong.appendChild(elm_span);
        elm_h3.appendChild(elm_strong);
        elm_boxHead.appendChild(elm_h3);

        var elm_boxInner = d.createElement('div');
        elm_boxInner.className = 'sideBoxInner';
        if (!conf.open) {
            elm_boxInner.style.display = 'none';
            elm_img.style.opacity = 0.3;
        }
        elm_box.appendChild(elm_boxInner);

        $e(elm_img, 'click', function() {
            var sidebox = $(id);
            var op = false;
            if (!sidebox) return;
            var inner = $s('.//div[contains(@class, "sideBoxInner")]', sidebox);
            if (!inner) return;
            if (inner.style.display == 'none') {
                inner.style.display = '';
                this.style.opacity = 1;
                op = true;
            } else {
                inner.style.display = 'none';
                this.style.opacity = 0.3;
            }

            var conf = cloadData(id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);
            conf.open = op;
            csaveData(id + 'conf', conf, true, true);
        });

        $e(elm_img_up, 'click', function() {
            var sidebox = $(id);
            if (sidebox.parentNode.id != 'beyond_fixpanel') return;
            var target = sidebox.previousSibling;
            if (!target) return;
            sidebox.parentNode.removeChild(sidebox);
            target.parentNode.insertBefore(sidebox, target);
            crenumberSideBox();
        });

        $e(elm_img_down, 'click', function() {
            var sidebox = $(id);
            if (sidebox.parentNode.id != 'beyond_fixpanel') return;
            var target = sidebox.nextSibling;
            if (!target) return;
            sidebox.parentNode.removeChild(sidebox);
            target.parentNode.insertBefore(sidebox, target.nextSibling);
            crenumberSideBox();
        });

        $e(elm_img_box, 'click', function() {
            var sidebox = $(id);
            if (!sidebox) return;

            var conf = cloadData(id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);

            if (sidebox.parentNode.id == 'beyond_fixpanel') {
                if (isNaN(''+conf.x) || conf.x == '' || isNaN(''+conf.y) || conf.y == '') {
                    var xy = cgetElementXY(sidebox);
                    conf.x = xy.x;
                    conf.y = xy.y;
                }

                var cx = d.body.clientWidth;
                var cy = d.body.clientHeight;
                var eW = elm_box.clientWidth;
                var eH = elm_box.clientHeight;

                elm_box.style.left = conf.x + 'px';
                elm_box.style.top = conf.y + 'px';

                if ((conf.x + eW) <= 0) {
                    elm_box.style.left = '0px';
                } else if (cx <= conf.x) {
                    elm_box.style.left = (cx - eW) + 'px';
                }
                if ((conf.y + eH) <= 0) {
                    elm_box.style.top = '0px';
                } else if (cy <= conf.y) {
                    elm_box.style.top = (cy - eH) + 'px';
                }

                sidebox.parentNode.removeChild(sidebox);
                $('beyond_floatpanel').appendChild(sidebox);
                sidebox.style.position = 'absolute';
                sidebox.style.top = conf.y + 'px';
                sidebox.style.left = conf.x + 'px';
                sidebox.style.zIndex = 1000;
                conf.float = true;
                $(id + 'up').style.display = 'none';
                $(id + 'down').style.display = 'none';
            } else {
                sidebox.parentNode.removeChild(sidebox);
                $('beyond_fixpanel').appendChild(sidebox);
                sidebox.style.position = '';
                sidebox.style.top = '';
                sidebox.style.left = '';
                sidebox.style.backgroundColor = '';
                sidebox.style.border = '';
                sidebox.style.zIndex = '';
                conf.float = false;
                $(id + 'up').style.display = '';
                $(id + 'down').style.display = '';
                csortSideBox();
            }
            csaveData(id + 'conf', conf, true, true);
        });

        var movedNode = null;
        var currentZIndex = 0;

        $e(elm_boxHead, 'mousedown', function(event) {
            movedNode = $(id);
            if (movedNode.parentNode.id != 'beyond_floatpanel') return true;

            g_MD = id;
            g_MX = event.pageX-parseInt(movedNode.style.left, 10);
            g_MY = event.pageY-parseInt(movedNode.style.top, 10);
            currentZIndex = document.defaultView.getComputedStyle(movedNode, '').zIndex;
            movedNode.style.zIndex = 9999;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
                event.preventDefault();
            }

            conf = cloadData(id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);
        });
        $e(d, 'mousemove', function(event) {
            if (g_MD != id) return true;
            if (movedNode.parentNode.id != 'beyond_floatpanel') return true;

            var x = event.pageX - g_MX;
            var y = event.pageY - g_MY;
            movedNode.style.left = x + 'px';
            movedNode.style.top = y + 'px';

            conf.x = x;
            conf.y = y;
        });
        $e(d, 'mouseup', function(event) {
            if (g_MD != id) return true;

            g_MD = '';
            movedNode.style.zIndex = currentZIndex;
            movedNode = null;

            csaveData(id + 'conf', conf, true, true);
        });

        if (conf.float && !(isNaN(''+conf.x) || isNaN(''+conf.y))) {
            elm_box.style.position = 'absolute';
            elm_box.style.zIndex = 1000;
            elm_img_up.style.display = 'none';
            elm_img_down.style.display = 'none';
            $('beyond_floatpanel').appendChild(elm_box);

            var cx = d.body.clientWidth;
            var cy = d.body.clientHeight;
            var eW = elm_box.clientWidth;
            var eH = elm_box.clientHeight;

            elm_box.style.left = conf.x + 'px';
            elm_box.style.top = conf.y + 'px';

            if ((conf.x + eW) <= 0) {
                elm_box.style.left = '0px';
            } else if (cx <= conf.x) {
                elm_box.style.left = (cx - eW) + 'px';
            }
            if ((conf.y + eH) <= 0) {
                elm_box.style.top = '0px';
            } else if (cy <= conf.y) {
                elm_box.style.top = (cy - eH) + 'px';
            }
        } else {
            $('beyond_fixpanel').appendChild(elm_box);
        }

        return {'sideBox':elm_box, 'sideBoxHead':elm_boxHead, 'sideBoxInner':elm_boxInner};

    }

    function csortSideBox() {
        var sideboxes = $x('id("beyond_fixpanel")/div[contains(concat(" ", normalize-space(@class), " "), " sideBox ")]');
        var srt = new Array();
        for (var i = 0; i < sideboxes.length; i++) {
            var pos = 0;

            var conf = cloadData(sideboxes[i].id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);
            pos = conf.pos;
            srt.push({'node':sideboxes[i], 'pos':pos});
        }

        srt.sort(function(a, b) {return a.pos - b.pos;});

        for (var i = 0; i < srt.length; i++) {
            srt[i].node.parentNode.removeChild(srt[i].node);
        }
        var fixpanel = $('beyond_fixpanel');
        for (var i = 0; i < srt.length; i++) {
            fixpanel.appendChild(srt[i].node);
        }
    }

    function crenumberSideBox() {
        var sideboxes = $x('id("beyond_fixpanel")/div[contains(concat(" ", normalize-space(@class), " "), " sideBox ")]');

        for (var i = 0; i < sideboxes.length; i++) {
            var conf = cloadData(sideboxes[i].id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);
            conf.pos = i;
            csaveData(sideboxes[i].id + 'conf', conf, true, true);
        }
    }

    function cappendColumnForProfile(title, id) {
        var tds = $x('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//th[contains(text(), "座標")]/../preceding-sibling::tr/*[contains("tdTDthTH", name())][last()]');
        for (var i = 0; i < tds.length; i++) {
            tds[i].colSpan++;
        }

        var tr = $s('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//th[contains(text(), "座標")]/..');
        var th = d.createElement('th');
        th.className = 'ttl4';
        th.id = id + '_title';
        th.appendChild(d.createTextNode(title));
        tr.appendChild(th);

        var trs = $x('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//th[contains(text(), "座標")]/../following-sibling::tr');
        for (var i = 0; i < trs.length; i++) {
            var xytd = trs[i].childNodes[3];
            if (!xytd) continue;
            var xy = xytd.innerHTML.match(/([\-0-9]+),([\-0-9]+)/);
            if (!xy) continue;

            var td = d.createElement('td');
            td.id = id + '_' + xy[1] + '_' + xy[2];
            trs[i].appendChild(td);

            var pstd = trs[i].childNodes[5];
            if (!pstd) continue;
            if (pstd.innerHTML != '&nbsp;') {
                td.textContent = '-';
            }
        }
    }

    function csetUserStar(uid, x, y, star, wood, stone, iron, rice, npc) {
        var userlists = cloadData('UserStarUserList', '[]', true, true);
        if (userlists.indexOf(uid) == -1) {
            userlists.push(uid);
            csaveData('UserStarUserList', userlists, true, true);
        }

        var lists = cloadData('UserStarList' + uid, '[]', true, true);

        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y) {
                return;
            }
        }
        lists.push({'star':star, 'x':x, 'y':y, 'wood':wood, 'stone':stone, 'iron':iron, 'rice':rice, 'npc':npc});
        csaveData('UserStarList' + uid, lists, true, true);
    }
    function cresetUserStar() {
        var userlists = cloadData('UserStarUserList', '[]', true, true);

        for (var i = 0; i < userlists.length; i++) {
            cdelData('UserStarList' + userlists[i], true);
        }
        cdelData('UserStarUserList', true);
    }

    function csetMyLevel(x, y, level) {
        var lists = cloadData('MyLevelList', '[]', true, true);

        var ins = true;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y) {
                if (level == -1) {
                    lists[i].level++;
                } else {
                    lists[i].level = level;
                }
                ins = false;
                break;
            }
        }
        if (ins && level != -1) {
            lists.push({'x':x, 'y':y, 'level':level});
        }
        csaveData('MyLevelList', lists, true, true);
    }
    function cdelMyLevel(x, y) {
        var lists = cloadData('MyLevelList', '[]', true, true);

        for (var i = 0; i < lists.length; i++) {
            if (lists[i].x == x && lists[i].y == y) {
                lists.splice(i, 1);
                csaveData('MyLevelList', lists, true, true);
                break;
            }
        }
    }

    function csaveData(key, value, local, ev) {
        if (local) key = location.hostname + key;
        if (ev) {
            value = crossBrowserUtility.JSON.stringify(value);
        }
        GM_setValue(key, value);
    }

    function cloadData(key, value, local, ev) {
        if (local) key = location.hostname + key;
        var ret = GM_getValue(key, value);
        return ev ? crossBrowserUtility.JSON.parse(ret) : ret;
    }

    function cdelData(key, local) {
        if (local) key = location.hostname + key;
        GM_deleteValue(key);
    }

    function blinkElements() {
        // Drift-free blinking routine
        var opacity = Math.round((new Date() % 1000) / 1000);
        for (var i = 0; i < elementQueue.length; ++i) {
            elementQueue[i].style.opacity = opacity;
        }
        window.setTimeout(function() {blinkElements();}, 500);
    }

    function updateYorozuState() {
        var x = $x('//div[contains(concat(" ", normalize-space(@class), " "), " sysMes ")]/strong');
        if (x.length < 3) return;

        var nextUpdate = new Date(x[2].textContent.replace(/-/g, '/')).getTime();
        var info = {
            current:    +x[0].textContent,
            nextUpdate: nextUpdate,
            confirm:    nextUpdate - (24 * 60 * 60)
        };
        csaveData('yorozudas_state', info, true, true);
        displayYorozuState();
    }
    function updateYorozuState2() { //result用を追加
        var x = $x('//div[contains(concat(" ", normalize-space(@class), " "), " sysMes2 ")]/strong');
        if (x.length < 3) return;

        var nextUpdate = new Date(x[1].textContent.replace(/-/g, '/')).getTime();
        var info = {
            current:    +x[0].textContent,
            nextUpdate: nextUpdate,
            confirm:    nextUpdate - (24 * 60 * 60)
        };
        csaveData('yorozudas_state', info, true, true);
        displayYorozuState();
    }
    function displayYorozuState() {
        var xpath = '(id("sidebar")/ul/li | id("btn_area_box"))/a[contains(@href, "/busyodas/b3kuji.php")]/img';
        if (OPT_SMALLBTN) {
            xpath += '/..';
        }

        var img_yorozu = $s(xpath);
        var info = cloadData('yorozudas_state', '{}', true, true);
        var now = new Date().getTime();
        if (info.nextUpdate < now) {
            elementQueue.push(img_yorozu);
        } else {
            if (info.current <= 0) {
                img_yorozu.style.opacity = 0.5;
            } else {
                if (info.confirm > 0 && info.confirm < now) {
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
    }

    function displayRecoveryEstimates() {
        var candidates = $x('id("deck_file")//div[contains(concat(" ", normalize-space(@class), " "), " setPlace ") and contains(concat(" ", normalize-space(@class), " "), " false ")]/ancestor::div[contains(concat(" ", normalize-space(@class), " "), " cardStatusDetail ")]');
        for (var i = 0; i < candidates.length; ++i) {
            var level = + $s('.//span[contains(concat(" ", normalize-space(@class)), " level_")]', candidates[i]).innerHTML;
            var hp    = + candidates[i].getElementsByClassName('status_hp')
                            [0].textContent.toString().split(/[\/]/)[0];
            if (hp >= 100) continue;
            var hours = (level <= 5) ? Math.pow(2, level - 2) * (100 - hp) / 100 :
                            (level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
                                (level + 20) * (100 - hp) / 100;

            var msg  = formatEstimate(hours, false) + 'にHP全回復';
            candidates[i].getElementsByClassName('setPlace false')[0].innerHTML = msg;
            candidates[i].getElementsByClassName('setPlace false')[0].setAttribute('title', getTimeString(hours));
        }

        candidates = $x('id("deck_file")//div[contains(concat(" ", normalize-space(@class), " "), " control ")]/dl/dd[contains(text(), "治療中")]/ancestor::div[contains(concat(" ", normalize-space(@class), " "), " cardColmn ")]');
         for (var i = 0; i < candidates.length; ++i) {
            var level = + $s('.//span[contains(concat(" ", normalize-space(@class)), " level_")]', candidates[i]).innerHTML;
            var hp    = + candidates[i].getElementsByClassName('status_hp')
                            [0].textContent.toString().split(/[\/]/)[0];
            if (hp >= 100) continue;

            var hours = (level <= 5) ? Math.pow(2, level - 2) * (100 - hp) / 100 :
                            (level <= 10) ? 4 * (level - 3) * (100 - hp) / 100 :
                                (level + 20) * (100 - hp) / 100;
            var msg  = formatEstimate(hours, false) + 'に<br>HP全回復';
            candidates[i].getElementsByTagName('dd')[2].innerHTML = msg;
            candidates[i].getElementsByTagName('dd')[2].style.fontSize = "10px";
            candidates[i].getElementsByTagName('dd')[2].style.margin = "0px";
            candidates[i].getElementsByTagName('dd')[2].setAttribute('title', getTimeString(hours));
        }

        window.setTimeout(function() {displayRecoveryEstimates();}, 60*1000);

        function getTimeString(hours) {
            var date = new Date(cgetNow().getTime() + hours * 60 * 60 * 1000);
            return '' + date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' +date.getSeconds();
        }
    }
    function formatEstimate(hours, displaySecs) {
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
                } else {
                    msg += '(' + minutes + '分後) ';
                }
            } else {
                msg += '(' + hours+ '時間' + minutes +'分後) ';
            }
        }
        return msg;
    }

    function installMapXYHelper() {
        // http://javascript.g.hatena.ne.jp/emergent/20081122/1227329941
        // https://developer.mozilla.org/ja/XPCNativeWrapper
        // use event listener to set 'onlcick' functon

        if (!(cgetMapType() & MAP_TYPE.ALL)) return;

        var form = $s('id("map-xy-search")/form');
        if (!form) return;
        form.addEventListener('submit',
                function() {
                    var xpath = 'id("map-xy-search")//input[@type="text"]';
                    var xy = $x(xpath);
                    var x  = xy[0].value.toString();

                    if (x.match(/(-?\d+)[ .,&、]+(?:y=)?(-?\d+)/)) {
                        xy[0].value = RegExp.$1;
                        xy[1].value = RegExp.$2;
                    }
                }, false);
    }

    function installTradeHelper() {

        if (location.pathname != '/card/trade.php') return;

        $('button')
            .addEventListener('click',
                function() {
                    var element = $s('//div[contains(concat(" ", normalize-space(@class), " "), " formSearch ")]/select');
                    var index = element.selectedIndex;
                    if (index == 0 || index == 3) {
                        if ($('k').value.toString().match(/[1-4]\d{3}/)) {
                            element.selectedIndex = 2;
                        }
                    }
                }, false);
    }

    function prepareForDisplayBuildStatus() {
        var maps = $('maps');
        var xpath = 'img[contains(@src, "/img_lv0.gif")]/@class';
        var nodes = $x(xpath, maps);
        for (var i = 0; i < nodes.length; ++i) {
            var index = nodes[i].value.toString().substr(-2);
            var xpath = 'img[contains(concat(" ", normalize-space(@class), " "), " map' + index +' ") and contains(@src, "/facility_10")]';
            var isResourceProducingLot = $x(xpath, maps).length;
            if (!isResourceProducingLot) {
                $s('//img[contains(concat(" ", normalize-space(@class), " "), " mapicon'+index+' ")]').src =
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

    function displayBuildStatus() {

        var xpath = 'id("actionLog")//li/span[contains(concat(" ", normalize-space(@class), " "), " buildStatus ") and contains(., "建設")]/a';
        var nodes = $x(xpath);
        var facilities = {};
        for (var i = 0; i < nodes.length; ++i) {
            nodes[i].href.match(/x=(\d+)&y=(\d+)/);
            var x = parseInt(RegExp.$1, 10);
            var y = parseInt(RegExp.$2, 10);
            var index = (101 + x * 7 + y).toString().substr(-2);
            facilities[index] = index;
        }

        for (var index in facilities) {
            elementQueue.push(document.getElementsByClassName('map'+index)[0]);
            elementQueue.push(document.getElementsByClassName('mapicon'+index)[0]);
        }

        var deleting = $s('id("actionLog")/ul/li[contains(text(), "削除中")]/span[contains(concat(" ", normalize-space(@class), " "), " buildStatus ")]/a');
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

    function Suzan_Seisan(inner) {

        var yieldList = {
                other : [0, 6, 14, 25, 50, 80, 117, 162, 214, 272, 335, 404, 476, 550, 626, 702],
                rice : [0, 6, 18, 36, 72, 114, 167, 231, 305, 388, 479, 577, 680, 786, 894, 1003]
            };

        var yieldExtends = [
            {
                name : '水車',
                facility : {
                    match : '畑',
                    data : [0, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3]
                },
                resource : {
                    match : '穀物',
                    data : [0, 40, 60, 80, 110, 140, 180, 220, 270, 350, 450]
                }
            },
            {
                name : '工場',
                facility : {
                    match : '伐採所石切り場製鉄所',
                    data : [0, 0.03, 0.05, 0.08, 0.1, 0.13, 0.15, 0.18, 0.2, 0.23, 0.25]
                },
                resource : {
                    match : '森林岩山鉄鉱山',
                    data : [0, 55, 65, 75, 95, 115, 145, 185, 235, 300, 380]
                }
            }
        ];

        var seisan = {w:0, s:0, i:0, r:0};

        for (var i = 0; i < 2; i++) {
            var yieldExtend = yieldExtends[i];
            var yieldExtendArea = $s('//area[starts-with(@alt, "'+yieldExtend.name+'")]');
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
                } else if (0 <= yieldExtend.facility.match.indexOf(squreaAreaInfo.name)) {
                    seisan[dataKey] += Math.ceil(yieldExtendFacility * yieldList[getYieldKeyFromDataKey(dataKey)][squreaAreaInfo.lv]);
                }
            }
        }

        var areas = $x('//area[contains(@alt, "畑") or contains(@alt, "穀") or contains(@alt, "伐") or contains(@alt, "森") or contains(@alt, "石") or contains(@alt, "岩") or contains(@alt, "製") or contains(@alt, "鉱")]');
        for (var i = 0; i < areas.length; i++) {
            var areaInfo = cgetFacilityInfoFromArea(areas[i]);
            var dataKey = nameToDataKey(areaInfo.name);
            switch (areaInfo.name) {
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
            switch (name) {
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

    function disp_nextFameTimer() {
        var nextDate = new Date(cloadData('NextFameTime', null, true, true));
        var preCheckTime = new Date(cloadData('NextFamePreCheckTime', null, true, true));
        nextDate = loadNextDate();
        var seps = $x('id("status_left")/span[contains(concat(" ", normalize-space(@class), " "), " sep ")]');
        for (var i = 0; i < seps.length;i++) {
            seps[i].innerHTML = seps[i].innerHTML.replace(/^([\s|\u3000]*)|([\s|\u3000]*)$/g, '');
        }

        var img = $s('id("status_left")/img[@title="名声"]');
        var fameTimer = document.createElement('DIV');
        fameTimer.setAttribute('id', 'Beyond_nextFameTimer');
        fameTimer.appendChild(createTimerText(getTimeDiffNow(nextDate)));
        fameTimer.style.color = 'lightgreen';
        fameTimer.style.position = 'absolute';
        fameTimer.style.top = (img.offsetTop + 12) + 'px';
        fameTimer.style.left = (img.offsetLeft + 10) + 'px';

        img.parentNode.appendChild(fameTimer);

        var timerId = setInterval(function() {
            fameTimer.style.top = (img.offsetTop + 12) + 'px';
            fameTimer.style.left = (img.offsetLeft + 10) + 'px';
            fameTimer.replaceChild(createTimerText(getTimeDiffNow(loadNextDate())), fameTimer.firstChild);
        }, 1000);

        function createTimerText(date) {
            return document.createTextNode('('+date.toLocaleTimeString().replace(/^0?/, '')+')');
        }
        function getTimeDiffNow(date) {
            var now = cgetNow();
            var oldDate = now, newDate = date;
            if (date.getTime() < now.getTime()) {
                return new Date(1970, 1, 1, 0, 0, 0);
            }
            return new Date(1970, 1, 1, 0, 0, 0, newDate.getTime() - oldDate.getTime());
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
                cajaxRequest('/facility/castle.php', 'GET', '', function(req) {
                    var dom = d.createElement('html');
                    dom.innerHTML = req.responseText;
                    var nextFameNode = $s('id("gray02Wrapper")/table[contains(concat(" ", normalize-space(@class), " "), " commonTables ") and @summary="object"]//td[contains(concat(" ", normalize-space(@class), " "), " center ") and not(@colspan)]/div[not(@class)]', dom);
                    if (!nextFameNode) {
                        nextFameDateCheckErrorCount++;
                        return;
                    }

                    var matches = null;
                    if (!(matches = nextFameNode.innerHTML.match(/\d+-\d+-\d+\s\d+:\d+/))) {
                        nextFameDateCheckErrorCount++;
                        return;
                    }

                    var tmpDate = new Date(matches[0].replace(/-/g, '/')+':00');
                    if (isPreCheckDateOver == false && nextDate.getTime() == tmpDate.getTime()) {
                        if (12 <= nextFameRefreshCount) {
                            clearInterval(timerId);
                        } else {
                            nextFameRefreshCount++;
                            setTimeout(nextFameRefresher, 5000);
                        }
                        return;
                    } else if (!(nextDate.getTime() == tmpDate.getTime())) {
                        nextDate = tmpDate;
                        if (cloadData('NextFameTime', null, true, true)) {
                            var fameText = $s('id("status_left")//img[@title="名声"]').nextSibling;
                            matches = fameText.nodeValue.match(/(\d+)[^\d]*(\d+)/);
                            fameText.nodeValue = fameText.nodeValue.replace(/\d+[^\d]*\d+/, (parseInt(matches[1], 10)+1) + ' / ' + (parseInt(matches[2], 10)+1));
                        }

                        csaveData('NextFameTime', nextDate.toString(), true, true);
                    }

                    nextFameRefreshCount = 0;
                    preCheckTime = new Date();
                    csaveData('NextFamePreCheckTime', preCheckTime.toString(), true, true);
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

        timeId = setInterval(function() {
            var doc = $s('id("timerOpenLink")/..');
            if (!doc) return;

            clearInterval(timeId);
            doc.style.display = 'none';

            var img = $s('.//img', doc);
            if (img) {
                timerIcon = img.src;
            }

            var box = ccreateSideBox(sidboxId, timerIcon, 'タイマー');
            var adoc = d.createElement('a');
            adoc.href = 'javascript:void(0);';
            adoc.innerHTML = 'タイマー表示';
            adoc.addEventListener('click', function() {
                var doc = $s('id("timerOpenLink")');
                if (!doc) return;
                var event = d.createEvent('MouseEvents');
                event.initEvent('click', false, true);
                doc.dispatchEvent(event);
            }, true);
            box.sideBoxInner.appendChild(adoc);

            var conf = cloadData(sidboxId + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);
            cinsertSideBox(conf.pos, box);
        }, 100);

        setTimeout(function() {clearInterval(timeId);}, 500);
    }

    function disp_villageListBox() {
        if (0 <= location.pathname.search(/^\/(?:village|(?:big_)?map|land)\.php/)) {
            return;
        }

        var isOpen = cloadData('sidebox_oc0', false, true) ? false : true;
        var sidBoxId = 'beyond_sidebox_villageListBox';
        var conf = cloadData(sidBoxId+'conf', 'null', true, true);

        if (!OPT_SMALLBTN) {
            isOpen = (conf == null) ? true : conf.open;
        }

        if (conf != null && typeof conf == 'object') {
            conf.open = isOpen;
            csaveData(sidBoxId+'conf', conf, true, true);
        }

        var box = ccreateSideBox(sidBoxId, IMG_DIR+'common/sidebar/icon_base.gif', '拠点');
        box.sideBoxInner.className += ' basename';
        var ul = d.createElement('ul');
        box.sideBoxInner.appendChild(ul);

        var boxImage = $s('.//img[contains(@src, "icon_base")]', box.sideBoxHead);
        $e(boxImage, 'click', function() {
            var saveData = isOpen ? '1' : '';
            isOpen = !isOpen;
            csaveData('sidebox_oc0', saveData, true);
        });

        var cvid = cgetCurrentVillageId();
        for (var key in VILLAGES_INFO) {
            var village = VILLAGES_INFO[key];
            var li = d.createElement('li');
            li.style.paddingBottom = '0px';
            ul.appendChild(li);

            var item;
            if (village.vid == cvid) {
                li.className = 'on';
                item = d.createElement('span');

            } else {
                item = d.createElement('a');
                item.href = caddSessionId('/village_change.php?village_id='+village.vid+'&from=menu&page=' + encodeURIComponent(location.pathname + location.search));
            }

            li.appendChild(item);
            item.title = village.basename + ' ('+village.x+','+village.y+')';
            item.appendChild(d.createTextNode(village.basename));
        }
    }

    function disp_logMessageBox() {
        var icon_log = 'data:image/png;base64,'
                      + 'iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN'
                      + '1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAExSURBVDiNpdNB'
                      + 'isIwGIbhN6Ei7koDvYK4EcQjuOgJinTjtssgrgXBA/QAHsKtvYHg3kM0GBGKtIjMrBysThxlvlUC4ckX'
                      + '+COGw+EX/4x3WwRBgFIKKaXzsDEGa60bUUpxPp9ZrVZORGuNUorD4dDAfhApJfv9njAMnYiUkizL0Fo3'
                      + 'EHd3R8IwfHqyd7+p65rtdsvlciHPc4QQTKdTgiB4CTeQJEnYbDbsdjv6/T69Xo/lckkURVyvVyfS6DWb'
                      + 'zVgsFsRxzOl0whjDer2mqirG4/F7TW6ZTCbUdY3nebTbbUajEZ1O5zNESkmapgD4vs98Psf3/c+Q++R5'
                      + 'TlmWDAaDvxFjDFrrXydWCEGr1aIoiteItRZrLd1ulyzLXg7d0yWPH/CdP1QUBcfj8bnJY6NP8g35z22n'
                      + 'h1LDWQAAAABJRU5ErkJggg==';

        var elms = ccreateSideBox('beyond_sidebox_log_box', icon_log, 'ログ');

        var textarea = d.createElement('textarea');
        textarea.id = 'beyond_sidebox_log_box';
        textarea.rows = OPT_LOGBOX_HEIGHT;
        textarea.cols = OPT_LOGBOX_WIDTH;

        textarea.style.fontSize= OPT_LOGBOX_FONT_SIZE + 'px';
        PRE_LOAD_NODES['logConsole'] = textarea;

        var logs = cloadData('logMessages', '[]', true, true);
        csaveData('logMessages', [], true, true);

        var nowTime = new Date().getTime();

        logs.forEach(function(messageObj) {
            if ((messageObj.time + parseInt(OPT_LOG_EXP_TIME, 10) * 60 * 1000) < nowTime) {
                return;
            }
            caddLogMessage(messageObj);
        });

        elms.sideBoxInner.appendChild(textarea);
    }


    // 初期化拡張
    function initVillages() {
        if (0 <= location.pathname.search(/^\/(?:village|(?:big_)?map|land)\.php/)) {
            _villageInit();
            return;
        } else if (location.pathname == '/user/' && $('statMenu')) {
            _profileInit();
            return;
        }

        VILLAGES_INFO = cloadData('villagesInfo', '{}', true, true);

        function _villageInit() {
            var villages = $x('(id("lodgment")/div[contains(concat(" ", normalize-space(@class), " "), " floatInner ")] | //div[contains(concat(" ", normalize-space(@class), " "), " sideBoxInner ") and contains(concat(" ", normalize-space(@class), " "), " basename ")])//li/*[@title and not(contains(concat(" ", normalize-space(@class), " "), " map-basing "))]');

            var compList = new Object();

            var reg = new RegExp(/^([^ ]+) \((-?\d+),(-?\d+)\)$/);
            var matches = null;
            var noVids = new Array();

            for (var i = 0; i < villages.length; i++) {
                var village = villages[i];
                var addObj = new Object();
                if ((matches = village.title.match(reg))) {
                    addObj.basename = matches[1];
                    addObj.x = parseInt(matches[2], 10);
                    addObj.y = parseInt(matches[3], 10);
                }

                if (typeof village.href == 'string' && (matches = village.href.match(/village_id=(\d+)/))) {
                    addObj.vid = parseInt(matches[1], 10);
                } else {
                    var viDoc = $s('//input[@name="village_id"]');
                    if (viDoc) {
                        addObj.vid = parseInt(viDoc.value, 10);
                    } else {
                        noVids.push(addObj);
                    }
                }
                compList[(addObj.x+'_'+addObj.y).replace(/-/g, 'm')] = addObj;
            }

            _compData(compList);

            if (0 < noVids.length) {
                cajaxRequest('/user/', 'GET', '', function(req) {
                    var dom = d.createElement('html');
                    dom.innerHTML = req.responseText;
                    for (var i = 0;i < noVids.length;i++) {
                        var td = $s('.//td[text()="'+noVids[i].x+","+noVids[i].y+'"]', dom);
                        var linkTd = cgetElementSibling(td, 1);
                        var link = $s('.//a', linkTd);
                        if ((matches = link.href.match(/village_id=(\d+)/))) {
                            VILLAGES_INFO[(noVids[i].x+'_'+noVids[i].y).replace(/-/g, 'm')].vid = parseInt(matches[1], 10);
                        }
                    }

                    csaveData('villagesInfo', VILLAGES_INFO, true, true);
                });
            }
        }

        function _profileInit() {
            var compList = new Object();
            var matches = null;
// 2012.01.12 修正
//          var villageLinks = $x('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//th[contains(text(), "座標")]/../following-sibling::tr[position() <= 10]/td[not(@*) and 1 <= normalize-space(text())]/..//a');
            var villageLinks = $x('//table[contains(concat(" ", normalize-space(@class), " "), " commonTables ")]//th[contains(text(), "座標")]/../following-sibling::tr[position() <= 10]/td[position()=3 and 1 <= normalize-space(text())]/..//a');
            for (var i = 0;i < villageLinks.length;i++) {
                var villageLink = villageLinks[i];

                var addObj = new Object();
                var loc = cgetElementSibling(villageLink.parentNode, 0);
                if ((matches = loc.innerHTML.match(/(-?\d+),(-?\d+)/))) {
                    addObj.x = parseInt(matches[1], 10);
                    addObj.y = parseInt(matches[2], 10);
                }

                if ((matches = villageLink.href.match(/village_id=(\d+)/))) {
                    addObj.vid = parseInt(matches[1], 10);
                }
                addObj.basename = villageLink.innerHTML.replace(/^\s*|\s*$/g, '');
                compList[(addObj.x+'_'+addObj.y).replace(/-/g, 'm')] = addObj;
            }

            _compData(compList);
        }

        function _compData(compList) {
            var nowVillageList = cloadData('villagesInfo', '{}', true, true);
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

            csaveData('villagesInfo', VILLAGES_INFO, true, true);
        }
    }

    function initCastleSend() {
        if (location.pathname != '/facility/castle_send_troop.php' || location.search.indexOf('radio_move_type') < 0) return;
        var radioMoveType = location.search.match(/radio_move_type=(\d+)/)[1];
        var ary = $x('//input[@name="radio_move_type"]');
        var elem;
        for (var i = 0; i < ary.length;i++) {
            elem = ary[i];
            if (elem.value == radioMoveType) {
                elem.checked = 'checked';
            } else {
                elem.checked = '';
            }
        }
    }

    function initNarrow() {
        if (0 <= location.pathname.search(/^\/(?:village|(?:big_)?map|land)\.php/)) {
            $s('id("lodgment")/div[contains(concat(" ", normalize-space(@class), " "), " floatHead ")]//a').href = 'javascript:void(0);';
        }
        GM_addStyle('.footer_box {height:auto !important;}');
    }

    function initPreLoadNode() {
        PRE_LOAD_NODES['nowResources'] = {wood:$('wood'), stone:$('stone'), iron:$('iron'), rice:$('rice')};
        PRE_LOAD_NODES['serverTime'] = $('server_time_disp');
        PRE_LOAD_NODES['logConsole'] = $('BeyondLogConsoleWindow');
    }

    function initUrlParams() {
        var matches = location.search.match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/g);
        if (matches) {
            var param;
            var key;
            var data;
            for (var i = 0; i < matches.length; i++) {
                param = matches[i].match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/);
                key = param[1];
                data = param[2];

                URL_PARAM[key] = '';
                if (param.length == 3 && typeof data == 'string') {
                    URL_PARAM[key] = decodeURIComponent(data);

                    // session id
                    if (key.toLowerCase() == 'ssid') {
                        SID = key + '=' +data;
                    }
                }
            }
        }
    }


    //共通関数拡張
    /**
     * cinsertSideBox
     * @param {Number} insPos
     * @param {Object} insNode insNode from ccreateSideBox
     * @see $
     * @see $x
     * @see cloadData
     */
    function cinsertSideBox(insPos, insNode) {
        var sideboxes = $x('id("beyond_fixpanel")/div[contains(concat(" ", normalize-space(@class), " "), " sideBox ")]');
        var srt = new Array();
        var pos = 0;
        var insNodeId = insNode.sideBox.id;
        for (var i = 0; i < sideboxes.length; i++) {
            var conf = cloadData(sideboxes[i].id + 'conf', '{"float":false, "open":true, "x":"", "y":"", "pos":99}', true, true);
            pos = conf.pos;
            if (insPos <= conf.pos && insNodeId != sideboxes[i].id) {
                pos++;
            } else if (insNodeId == sideboxes[i].id) {
                pos = insPos;
            }
            srt.push({'node':sideboxes[i], 'pos':pos});
        }

        srt.sort(function(a, b) {return a.pos - b.pos;});

        for (var i = 0; i < srt.length; i++) {
            srt[i].node.parentNode.removeChild(srt[i].node);
        }
        var fixpanel = $('beyond_fixpanel');
        for (var i = 0; i < srt.length; i++) {
            fixpanel.appendChild(srt[i].node);
        }
    }

    /**
     * cgetCurrentVillageId
     * @returns {Number}
     * @see cgetCurrentBaseXY
     */
    function cgetCurrentVillageId() {
        var xy = cgetCurrentBaseXY();
        return VILLAGES_INFO[(xy.x+'_'+xy.y).replace(/-/g, 'm')].vid;
    }

    /**
     * chasVillageId
     * @param {Number} vid
     * @returns {Boolean}
     * @see cgetVillageIds
     */
    function chasVillageId(vid) {
        vid = parseInt(vid, 10);
        var vids = cgetVillageIds();
        return vids[vid] ? true : false;
    }

    /**
     * cgetVillageIds
     * @returns {Number}
     */
    function cgetVillageIds() {
        var ret = new Object();
        for (var key in VILLAGES_INFO) {
            if (isNaN(''+VILLAGES_INFO[key].vid)) {
                continue;
            }
            ret[VILLAGES_INFO[key].vid] = VILLAGES_INFO[key].vid;
        }
        return ret;
    }

    /**
     * cgetElementSibling
     * @param {HTMLElement} element
     * @param {Number} [direction=0] pre=1, next=0
     * @param {Number} [moveCount=1]
     * @returns {HTMLElement}
     */
    function cgetElementSibling(element, direction, moveCount) {
        var hasElementSibling = (typeof element.nextElementSibling == 'object' || typeof element.previousElementSibling == 'object') ? true : false;
        if (!direction) direction = 0;
        if (!moveCount) moveCount = 1;
        for (var i = moveCount; 0 < i; ) {
            if (hasElementSibling) {
                i--;
                if (direction == 1) {
                    element = element.previousElementSibling;
                } else {
                    element = element.nextElementSibling;
                }
            } else {
                if (direction == 1) {
                    element = element.previousSibling;
                } else {
                    element = element.nextSibling;
                }
                if (element && element.nodeType == 1) {
                    i--;
                }
            }

            if (element == null) {
                break;
            }
        }
        return element;
    }

    /**
     * cgetSquareElementFromArea
     * @description areaから四方のareaを取得
     * @param {HTMLAreaElement} area
     * @returns {Object}
     * @see $s
     */
    function cgetSquareElementFromArea(area) {
        var coords = area.getAttribute('coords');
        var matches = null;
        if (!coords || !(matches = coords.match(/^(\d+),(\d+)/))) return false;
        var base = new Object();
        base.x = parseInt(matches[1], 10);
        base.y = parseInt(matches[2], 10);

        var add = new Object();
        add.x = 50;
        add.y = 25;

        var isMap = false;
        var mapType = cgetMapType();
        if (mapType & MAP_TYPE.ALL) {
            isMap = true;
            switch (mapType) {
                case MAP_TYPE.TYPE20:
                    add.x = 16;
                    add.y = 8;
                    break;
                case MAP_TYPE.TYPE15:
                    add.x = 22;
                    add.y = 11;
                    break;
                case MAP_TYPE.TYPE11:
                    add.x = 30;
                    add.y = 15;
                    break;
            }
            base.y += add.y * 2;
        }

        var xpaths = {ne:calc(base, add, 0), nw:calc(base, add, 1), se:calc(base, add, 2), sw:calc(base, add, 3)};

        var ret = new Object();
        for (var key in xpaths) {
            ret[key] = $s('//area[@coords="' + xpaths[key] + '"]');
        }
        return ret;

        // direction ne:0 nw:1 se:2 sw:3
        function calc(base, add, direction) {
            var addX = (direction % 2) == 0 ? add.x : - add.x;
            var addY = direction < 2 ? - add.y : add.y;

            var retBaseX = base.x + addX;
            var retBaseY = base.y + addY;

            var top = [retBaseX, retBaseY - (add.y * 2)];
            var left = [retBaseX - add.x, retBaseY - add.y];
            var bottom = [retBaseX, retBaseY];
            var right = [retBaseX + add.x, retBaseY - add.y];
            var ret = isMap ? top.concat(left, bottom, right) : bottom.concat(left, top, right);
            return ret.join(',');
        }
    }

    /**
     * cgetFacilityInfoFromArea
     * @description areaからx, y, name, lvを返す
     * @param {HTMLAreaElement} area
     * @returns {Object}
     */
    function cgetFacilityInfoFromArea(area) {
        var retObj = {name:'', lv:0, x:-1, y:-1};
        var matches = null;
        if (area.alt) {
            if ((matches = area.alt.match(/^([^ ]+)[^\d]+(\d+)/))) {
                retObj.name = matches[1];
                retObj.lv = parseInt(matches[2], 10);
            } else {
                retObj.name = area.alt;
            }
        }
        if (area.href && (matches = area.href.match(/(?:x=(\d+)&y=(\d+))/))) {
            retObj.x = parseInt(matches[1], 10);
            retObj.y = parseInt(matches[2], 10);
        }
        return retObj;
    }

    /**
     * caddSessionId
     * @param {String} url
     * @returns {String}
     */
    function caddSessionId(url) {
        if (0 < SID.length && url.search(/(\?|&)SSID=[^&]+&?/i) < 0) {
            var anchor = '';
            var matches;
            if ((matches = url.match(/#[^#]+$/))) {
                url = url.substring(0, url.lastIndexOf('#'));
                anchor = matches[0];
            }
            url += 0 <= url.indexOf('?') ? '&' : '?';
            url += SID;
            url += anchor;
        }
        return url;
    }

    /**
     * cgetMapType
     * @param {HTMLElement|HTMLDocument} [map=document]
     * @returns {Number}
     * @see $s
     */
    function cgetMapType(mapDocument) {
        if (mapDocument || /(?:big_)?map\.php/.test(location.pathname)) {
            var nowMapDoc = $s('id("change-map-scale")//li[contains(concat(" ", normalize-space(@class), " "), " now ")]', mapDocument || document);
            if (!nowMapDoc) return null;

            var size = parseInt(nowMapDoc.className.match(/sort(\d+) /)[1], 10);
            switch (size) {
                case 51: return MAP_TYPE.TYPE51;
                case 20: return MAP_TYPE.TYPE20;
                case 15: return MAP_TYPE.TYPE15;
                case 11: return MAP_TYPE.TYPE11;
            }
        }
        return null;
    }

    /**
     * caddLogMessage
     * @param {Object} message message or Logs Object
     */
    function caddLogMessage(message) {
        if (PRE_LOAD_NODES['logConsole']) {
            var logs = cloadData('logMessages', '[]', true, true);
            var nowTime = new Date().getTime();

            var logObj = message;
            if (typeof message == 'string') {
                logObj = {'time':nowTime, 'message':message};
            }
            logs.push(logObj);
            csaveData('logMessages', logs, true, true);
            PRE_LOAD_NODES['logConsole'].value += logObj.message + '\n';
            PRE_LOAD_NODES['logConsole'].scrollTop = PRE_LOAD_NODES['logConsole'].scrollHeight - PRE_LOAD_NODES['logConsole'].clientHeight;
        } else {
            alert(message);
        }
    }

    /**
     * cgetMapItemDataFromItemDocument
     * @param {HTMLAreaElement|HTMLAnchorElement} mapType normal : Area, mapType big:A
     * @param {MAP_TYPE} [mapType] cgetMapType
     * @returns {Object} {name, userName, population, xy, allyName, star, distance, wood, stone, iron, rice, isNPCBuild}
     * @see cgetMapType
     */
    function cgetMapItemDataFromItemDocument(element, mapType) {
        mapType = mapType || cgetMapType();
        if (!(mapType & MAP_TYPE.ALL)) {
            return null;
        }

        var userData = {
                'name' : '',
                'userName' : '',
                'population' : '-',
                'xy' : '',
                'allyName' : '',
                'star' : '',
                'distance' : '',
                'wood' : '',
                'stone' : '',
                'iron' : '',
                'rice' : '',
                'isNPCBuild' : ''
            };
        var mouseOver = element.getAttribute('onmouseover');
        if (!mouseOver) {
            return null;
        }

        if (mapType & MAP_TYPE.NORMAL) {
            mouseOver = mouseOver.replace(/^.*rewrite\s*\(/, '[');
            mouseOver = mouseOver.replace(/\); .*$/, ']');
            var tmp = eval(mouseOver);
            if (!tmp) {
                return null;
            }

            userData.name = tmp[0];
            userData.userName = tmp[1];
            userData.population = tmp[2];
            userData.xy = tmp[3];
            userData.allyName = tmp[4];
            userData.star = tmp[5];
            userData.distance = tmp[6];
            userData.wood = tmp[7];
            userData.stone = tmp[8];
            userData.iron = tmp[9];
            userData.rice = tmp[10];
            userData.isNPCBuild = tmp[11];
        } else if (mapType & MAP_TYPE.BIG) {
            var doc = mouseOver.replace(/^[^']+'|'[^']+$/g, '');
            var nameTextNode = $s('//dt[contains(concat(" ", normalize-space(@class), " "), " bigmap-caption ")]//text()', doc);
            userData.name = nameTextNode ? nameTextNode.nodeValue : '';

            var userNameTextNode = $s('//dt[normalize-space(text())="君主名"]/following-sibling::dd[1]//text()', doc);
            userData.userName = userNameTextNode ? userNameTextNode.nodeValue : '';

            var populationTextNode = $s('//dt[normalize-space(text())="人口"]/following-sibling::dd[1]//text()', doc);
            userData.population = populationTextNode ? populationTextNode.nodeValue : '-';

            var xyAndDistanceTextNode = $s('//dt[normalize-space(text())="座標\u00A0/\u00A0距離"]/following-sibling::dd[1]//text()', doc);
            userData.distance = (xyAndDistanceTextNode && xyAndDistanceTextNode.nodeValue.match(/\[(\d+(?:\.\d+)?)\]/)) ? xyAndDistanceTextNode.nodeValue.match(/\[(\d+(?:\.\d+)?)\]/)[1] : '';
            userData.xy = xyAndDistanceTextNode ? xyAndDistanceTextNode.nodeValue.split(/\s*\/\s*/)[0] : '';

            var allyTextNode = $s('//dt[normalize-space(text())="同盟名"]/following-sibling::dd[1]//text()', doc);
            userData.allyName = allyTextNode ? allyTextNode.nodeValue : '';

            var starTextNode = $s('//dt[normalize-space(text())="戦力"]/following-sibling::dd[1]//text()', doc);
            userData.star = starTextNode ? starTextNode.nodeValue : '';

            var resourcesTextNode = $s('//dt[normalize-space(text())="資源"]/following-sibling::dd[1]/text()', doc);
            if (resourcesTextNode) {
                var resDatas = resourcesTextNode.nodeValue.split(/\s/);
                if (resDatas.length != 4) {
                    alert('ERROR:一覧の取得に失敗しました');
                    return null;
                }
                userData.wood = resDatas[0].replace(/^[^\d]+|[^\d]+$/, '');
                userData.stone = resDatas[1].replace(/^[^\d]+|[^\d]+$/, '');
                userData.iron = resDatas[2].replace(/^[^\d]+|[^\d]+$/, '');
                userData.rice = resDatas[3].replace(/^[^\d]+|[^\d]+$/, '');
            }

            if ($s('//dd/span[contains(concat(" ", normalize-space(@class), " "), " npc-red-star ")]', doc)) {
                userData.isNPCBuild = '1';
                var npcBossNames = [
                    '\u4e8e\u7981',         // 于禁
                    '\u516c\u5b6b\u74da',   // 公孫?
                    '\u5289\u5099',         // 劉備
                    '\u5289\u7109',         // 劉焉
                    '\u5289\u8868',         // 劉表
                    '\u5442\u5e03',         // 呂布
                    '\u5442\u8499',         // 呂蒙
                    '\u5468\u745c',         // 周瑜
                    '\u590f\u5019\u60c7',   // 夏候惇
                    '\u5b5f\u7372',         // 孟獲
                    '\u5b6b\u6a29',         // 孫権
                    '\u5b6b\u7b56',         // 孫策
                    '\u5f35\u907c',         // 張遼
                    '\u5f35\u90c3',         // 張?
                    '\u5f35\u98db',         // 張飛
                    '\u5f35\u9b6f',         // 張魯
                    '\u66f9\u64cd',         // 曹操
                    '\u6731\u970a',         // 朱霊
                    '\u6c99\u6469\u67ef',   // 沙摩柯
                    '\u725b\u8f14',         // 牛輔
                    '\u732e\u5e1d',         // 献帝
                    '\u7518\u5be7',         // 甘寧
                    '\u795d\u878d',         // 祝融
                    '\u7a0b\u666e',         // 程普
                    '\u8340\u5f67',         // 荀彧
                    '\u8463\u5353',         // 董卓
                    '\u8521\u7441',         // 蔡瑁
                    '\u8881\u7d39',         // 袁紹
                    '\u8881\u8853',         // 袁術
                    '\u90ed\u6c5c',         // 郭汜
                    '\u95a2\u7fbd',         // 関羽
                    '\u99ac\u8b16',         // 馬謖
                    '\u99ac\u8d85',         // 馬超
                    '\u9ec4\u7956',         // 黄祖
                    '\u9f90\u7d71',         // ?統
                ];
                if (userData.allyName == '' && !(/^(\u5317|\u5357)(\u6771|\u897f)\u5b88\u885b\d+$/.test(userData.userName) == true
                    || 0 <= npcBossNames.indexOf(userData.userName))) {
                    userData.allyName = userData.userName+'の所属同盟(未取得)';
                } else if (userData.allyName == '') {
                    userData.allyName = '-';
                }
            }
        }

        return userData;
    }

    //他のuserscriptとの連携用
    /**
     * csetMapStarDisable
     * @param {String} no no String from cgetMapNofromXY
     */
    function csetMapStarDisable(no) {
        var id = 'mapStar_' + parseInt(no, 10);
        setTimeout(function() {
            var mapStarItem = $(id);
            if (mapStarItem) {
                mapStarItem.style.visibility = 'hidden';
            }
        }, 100);
    }


    //その他拡張
    /**
     * initGMFunctions
     * @description GM関数初期化
     */
    function initGMFunctions() {
        // @copyright      2009, 2010 James Campos
        // @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
        if (typeof GM_deleteValue == 'undefined') {

            GM_addStyle = function(css) {
                var style = document.createElement('style');
                style.textContent = css;
                document.getElementsByTagName('head')[0].appendChild(style);
            };

            GM_deleteValue = function(key) {
                localStorage.removeItem(key);
            };

            GM_getValue = function(key, defaultValue) {
                var value = localStorage.getItem(key);
                if (!value) return defaultValue;
                var type = value[0];
                value = value.substring(1);
                switch (type) {
                    case 'b': return value == 'true';
                    case 'n': return Number(value);
                    default : return value;
                }
            };

            GM_log = function(message, level) {
                if (typeof console == 'object') {
                   // console.log(message, level);
                }
            };

            GM_openInTab = function(url) {
                return window.open(url, "_blank");
            };

            GM_registerMenuCommand = function(name, funk) {
                throw new Error('not supported');
            };

            GM_setValue = function(name, value) {
                switch (typeof value) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                        break;
                    default:
                        throw new TypeError();
                }
                value = (typeof value)[0] + value;
                localStorage.setItem(name, value);
            };

            //additional function by romer
            GM_listValues = function() {
                var len = localStorage.length;
                var res = new Object();
                var key = '';
                for (var i = 0; i < len; i++) {
                    key = localStorage.key(i);
                    res[key] = key;
                }
                return res;
            };

            GM_xmlhttpRequest = function(requestParam) {
                var xhr;
                if (typeof XMLHttpRequest == 'function') {
                    xhr = XMLHttpRequest;
                } else {
                    return;
                }
                var req = new xhr();
               ['onload', 'onerror', 'onreadystatechange'].forEach(function (event) {
                    if ((event in requestParam) == false) {
                        return;
                    }
                    req[event] = function () {
                        var isComplete = (req.readyState == 4);
                        var responseState = {
                                responseText: req.responseText,
                                readyState: req.readyState,
                                responseHeaders: isComplete ? req.getAllResponseHeaders() : '',
                                status: isComplete ? req.status : 0,
                                statusText: isComplete ? req.statusText : '',
                                finalUrl: isComplete ? requestParam.url : ''
                        };
                        requestParam[event](responseState);
                    };
                });

                try {
                    req.open(requestParam.method ? requestParam.method : 'GET', requestParam.url, true);
                } catch(e) {
                    if (requestParam.onerror) {
                        requestParam.onerror({readyState:4, responseHeaders:'', responseText:'', status:403, statusText:'Forbidden', finalUrl:''});
                    }
                    return;
                }

                if ('headers' in requestParam && typeof requestParam.headers == 'object') {
                    for (var name in requestParam.headers) {
                        req.setRequestHeader(name, requestParam.headers[name]);
                    }
                }

                req.send(('data' in requestParam) ? requestParam.data : null);
                return req;
            };
        }
    }

    /**
     * initJSON
     * @description JSON不在時の処理と、prototype.jsとJSONオブジェクトの衝突回避(for Opera)
     * @returns {Object}
     */
    function initJSON() {
        var myJSON = function() {
            if (typeof JSON != 'object' || typeof Prototype == 'object') {
                this.__proto__ = {
                    stringify : function(obj) {
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
                                        + complementZero(obj.getUTCSeconds()) + 'Z'
                                        : 'null';
                                }
                                var partial = new Array();
                                var prefix = '{';
                                var suffix = '}';
                                if (obj instanceof Array) {
                                    prefix = '[';
                                    suffix = ']';
                                    length = obj.length;
                                    for (var i = 0; i < length; i++) {
                                        partial[i] = arguments.callee(obj[i]) || 'null';
                                    }
                                } else {
                                    for (var key in obj) {
                                        if (Object.hasOwnProperty.call(obj, key)) {
                                            partial.push(quote(key) + ':'
                                                + (arguments.callee(obj[key]) || 'null'));
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
                                    + str.replace(escapable, function(a) {
                                                var c = meta[a];
                                                return typeof c === 'string' ? c : '\\u'
                                                        + ('0000' + a.charCodeAt(0).toString(16))
                                                                .slice(-4);
                                            }) + '"' : '"' + str + '"';
                        }

                        function complementZero(number) {
                            return number < 10 ? '0' + number : number;
                        }
                    },
                    parse : function(jsonStrings) {
                        return eval('(' + jsonStrings + ')');
                    }
                };
            }
        };

        if (typeof JSON == 'object') {
            myJSON.prototype = JSON;
        }

        return new myJSON();
    }

    /**
     * initCrossBrowserSupport
     * @returns {Object}
     */
    function initCrossBrowserSupport() {
        var crossBrowserUtility = {'JSON':null}

        //配列のindexOf対策 from MDC
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(elt /*, from*/) {
                var len = this.length;

                var from = Number(arguments[1]) || 0;
                from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                if (from < 0) {
                    from += len;
                }

                for (; from < len; from++) {
                    if (from in this && this[from] === elt) {
                        return from;
                    }
                }

                return -1;
            };
        }

        //ArrayのforEach対策 from MDC
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function(fun /*, thisp*/) {
                var len = this.length;
                if (typeof fun != 'function') {
                    throw new TypeError();
                }

                var thisp = arguments[1];
                for (var i = 0; i < len; i++) {
                    if (i in this) {
                        fun.call(thisp, this[i], i, this);
                    }
                }
            };
        }

        //JSONのサポート
        crossBrowserUtility.JSON = initJSON();

        //GM関数の初期化
        initGMFunctions();

        return crossBrowserUtility;
    }
}) ();

/**
 * -------
 * CREDITS
 * -------
 * Original script:
 *   hatt
 *   - http://www1.ocn.ne.jp/~hatt/3gkb/
 *
 * Updates and modifications:
 *   romer aka ろむ
 *   - http://d.hatena.ne.jp/romer/
 *
 *   aro aka ご隠居
 *   - http://asunaro.com/
 *
 *   霧
 *   - http://kirichat.blog.so-net.ne.jp/
 *
 *   ピカチュウ
 *   - http://shigematsu.org/
 *     ヨロズダス引き忘れ防止
 *     HP回復時間予測
 *     マップ画面入力支援
 *     トレード画面入力支援
 *     建設中施設の点滅表示
 *
 *   すーざん
 *   - http://www.dosukoi-kissa.com/blog/
 *     拠点生産力表示
 *
 * Other contributions (icons, etc.):
 *   ゆう＠てらおとめん
 *   - http://mixi.jp/show_friend.pl?id=9352016
 *
 * and kudos to all other unknown/anonymous contributors!
 * 
 */ 


