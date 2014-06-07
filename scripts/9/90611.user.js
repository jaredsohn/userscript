//
// ==UserScript==
// @name          hwmDemonQuest
// @homepage      http://userscripts.org/scripts/show/90611
// @version       1.2
// @description   hwmDemonQuest
// @include       http://www.heroeswm.ru/rdemon_quest.php
// ==/UserScript==

browserInit();
var input = getItem("//img[contains(@src, 'i/rdemon.jpg')]");
if(input) {
    input = input.parentNode.parentNode.parentNode;
    input = getItem('td[2]/table', input);

    var clan = GM_getValue("hwmDemonQuestClan");
    if(!clan) clan = '';

    var noClan = GM_getValue("hwmDemonQuestNoClan");
    if(noClan=='false') noClan = false;
    else noClan = true;

    var levelStart = GM_getValue("hwmDemonQuestLevelStart");
    if(!levelStart) levelStart = '';
    var levelEnd = GM_getValue("hwmDemonQuestLevelEnd");
    if(!levelEnd) levelEnd = '';

    var partner1 = GM_getValue("hwmDemonQuestPartner1");
    if(!partner1) partner1 = '';
    var partner2 = GM_getValue("hwmDemonQuestPartner2");
    if(!partner2) partner2 = '';

    var main = document.createElement('div');
    input.parentNode.insertBefore(main, input);
    main.innerHTML = '<center style="padding:10px;">'
                         +'<div class="wbwhite" style="white-space:nowrap; display:table-cell; vertical-align:middle; padding:10px;">'
                             +'\u041a\u043b\u0430\u043d #<input id="clanId" type="text" value="'+ clan +'" size="2">'
                         +'</div>'
                         +'<div class="wbwhite" style="white-space:nowrap; display:table-cell; vertical-align:middle; padding:10px;">'
                             +'<label>\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0432\u043d\u0435\u043a\u043b\u0430\u043d <input id="noClanId" type="checkbox" '+ (noClan ? 'checked="true"' : '') +'"></label>'
                         +'</div>'
                         +'<div class="wbwhite" style="white-space:nowrap; display:table-cell; vertical-align:middle; padding:10px;">'
                             +'\u0423\u0440\u043e\u0432\u043d\u0438 \u043e\u0442 <input id="levelStartId" type="text" value="'+ levelStart +'" size="2">'
                             +' \u0434\u043e <input id="levelEndId" type="text" value="'+ levelEnd +'" size="2">'
                         +'</div>'
                     +'<div style="height:4px; clear:both; font-size:0px;"></div>'
                         +'<div class="wbwhite" style="white-space:nowrap; display:table-cell; vertical-align:middle; padding:10px;">'
                             +'\u041d\u0430\u043f\u0430\u0440\u043d\u0438\u043a <input id="partner1Id" type="text" value="'+ partner1 +'" size="20">'
                         +'</div>'
                         +'<div class="wbwhite" style="white-space:nowrap; display:table-cell; vertical-align:middle; padding:10px;">'
                             +'\u041d\u0430\u043f\u0430\u0440\u043d\u0438\u043a <input id="partner2Id" type="text" value="'+ partner2 +'" size="20">'
                         +'</div>'
                     +'</center>';

    getId('clanId').addEventListener("blur", function() {
        if(this.value) {            this.value = parseFloat(this.value);        }
        GM_setValue("hwmDemonQuestClan", this.value);
    }, false);
    getId('noClanId').addEventListener("click", function() {
        GM_setValue("hwmDemonQuestNoClan", this.checked ? 'true' : 'false');
    }, false);
    getId('levelStartId').addEventListener("blur", function() {
        if(this.value) {
            this.value = parseFloat(this.value);
        }
        GM_setValue("hwmDemonQuestLevelStart", this.value);
    }, false);
    getId('levelEndId').addEventListener("blur", function() {
        if(this.value) {
            this.value = parseFloat(this.value);
        }
        GM_setValue("hwmDemonQuestLevelEnd", this.value);
    }, false);
    getId('partner1Id').addEventListener("blur", function() {
        GM_setValue("hwmDemonQuestPartner1", this.value);
    }, false);
    getId('partner2Id').addEventListener("blur", function() {
        GM_setValue("hwmDemonQuestPartner2", this.value);
    }, false);

    //pre(clan);
    isHash = false;
    var info = getI('//a[contains(@href, "pl_info.php?id=")]', item);
    for(var count3=0; count3<info.snapshotLength; count3++) {
        if(info.snapshotItem(count3).innerHTML==partner1 || info.snapshotItem(count3).innerHTML==partner2) {
            partner = info.snapshotItem(count3);
            var a = document.createElement('a');
            partner.parentNode.insertBefore(a, partner);
            a.setAttribute('name', 'partner');
            document.location.hash = '#partner';
        }
    }

    input = getI("tbody/tr/td[2]/table/tbody", input);
    //pre(input.snapshotLength);
    for(var count=0; count<input.snapshotLength; count++) {        //pre(input.snapshotItem(count));
        var main = getI('tr', input.snapshotItem(count));
        for(var count2=0; count2<main.snapshotLength; count2++) {
            var item = main.snapshotItem(count2);
            if(item.childElementCount!=2) {                item = getItem("td[1]/table", item);
                if(item) {                    var div = document.createElement('div');
                    item.parentNode.insertBefore(div, item);
                    div.style.cssText = 'height:25px; clear:both; font-size:0px;';
                    //pre(item);                }
                continue;            }

            var isClan = getItem("td[1]/a[contains(@href, 'clan_info.php?id=')]", item);
            if(clan && isClan) {
                if(isClan.innerHTML.substring(1)!=clan) {                    deleteItem(item);
                    continue;                }
            }
            if(!isClan && !noClan) {                deleteItem(item);
                continue;            }

            var search = getItem("td[2]", item).innerHTML.match(/\[[0-9]+\]/g);
            if(search) {
                //pre(search);
                for(var i in search) {                    var level = parseInt(search[i].substring(1));
                    if(levelStart && level<levelStart) {                        deleteItem(item);
                        break;                    } else if(levelEnd && level>levelEnd) {
                        deleteItem(item);
                        break;
                    }                }
            }
        }
    }
}


function deleteItem(item) {
    item.parentNode.removeChild(item);
}
function pre() {
    if(unsafeWindow && unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(arguments);
    }
}
function getI(xpath,elem){
    return document.evaluate(xpath, (!elem?document:elem), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getItem(xpath,elem){
    return document.evaluate(xpath, (!elem?document:elem),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function getId(id) {
    return document.getElementById(id);
}
function browserInit() {
    var ua = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
    /(msie) ([\w.]+)/.exec(ua) ||
    !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
    	[];

    if(match[1]!='mozilla') {        GM_setValue = function(name, value) {
            var cookie_string = name + "=" + escape (value);
            var expires = new Date ( 2050, 0, 0);
            cookie_string += "; expires=" + expires.toGMTString();
            document.cookie = cookie_string;
        }

        GM_getValue = function(name) {
            var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
            if ( results )
            return ( unescape ( results[2] ) );
            else
            return null;
        }
    }
}

