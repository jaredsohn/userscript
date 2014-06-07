//
// ==UserScript==
// @name          hwmRepair
// @homepage      http://userscripts.org/scripts/show/87741
// @version       1.8
// @description   Hiding queue Forge
// @include       http://www.heroeswm.ru/inventory.php*
// ==/UserScript==


browserInit();
// hwmRepair
var trade = getI("//a[contains(@href, 'trade_cancel.php?tid=')]");
for(var count=0; count<trade.snapshotLength; count++) {    var link = trade.snapshotItem(count).parentNode;
    var index = link.parentNode.rowIndex-2;
    var list = link.parentNode.parentNode;

    var main = list.childNodes[index+1];
    var string = getItem('td[2]/b', main).innerHTML;
    if(string.indexOf('/')==-1 || (getItem('td[2]/b[4]', main) && !getItem('td[2]/b[5]', main))
                               /*|| (getItem('td[2]/b[2]', main) && !getItem('td[2]/b[5]', main))*/) {
        var name = getItem('td', list.childNodes[index]);

        if(string.indexOf('/')==-1) {
            getItem('b', name).innerHTML += '&nbsp;(<i>'+ string +'</i>)';
        } else if(getItem('td[2]/b[4]', main) && !getItem('td[2]/b[5]', main)){
            getItem('b', name).innerHTML += '&nbsp;'+ string;

            var repair = getItem('td[2]', main);
            if(repair && repair.childNodes[12] && repair.childNodes[12].textContent) {
                link.innerHTML = repair.childNodes[6].textContent +'<b>'+ repair.childNodes[7].innerHTML +'</b><br />'+ repair.childNodes[8].textContent
                                     +'<b>'+ repair.childNodes[9].innerHTML +'</b>'+ repair.childNodes[10].textContent +'<br />'
                                 +'<b>'+ repair.childNodes[12].textContent +'</b><br />'
                                 + link.innerHTML;            }
        }

        var hidden = '<div style="display:table-cell; vertical-align:middle; padding:10px;">'+ getInnetHTML('td[1]', main) +'</div>'
                     +'<div style="display:table-cell; vertical-align:middle; padding:10px;">'+ getInnetHTML('td[2]/b[2]', main) +'</div>'
                     +'<div style="display:table-cell; vertical-align:middle;" align="right">'+ link.innerHTML +'</div>';

        name.innerHTML = '&nbsp;<a name="repair'+ count +'" style="cursor:pointer;">+</a>&nbsp;'
                          + name.innerHTML
                          +'<div style="display:none; float:right;" id="repair'+ count +'"></div>';

        name.setAttribute("repair", hidden);
        getItem('a', name).addEventListener("click", isVisible, false);
        deleteItem(list.childNodes[index+1]);
        deleteItem(list.childNodes[index+1]);
        deleteItem(list.childNodes[index+1]);    }
}

function isVisible() {
    var id = document.getElementById(this.name);
    if(id.style.display=='none') {
        this.innerHTML = '<big>-</big>';
        id.innerHTML = id.parentNode.getAttribute("repair");
        id.style.display='';
    } else {
        this.innerHTML = '+';
        id.style.display='none';
        id.innerHTML = '';
    }
}

function getInnetHTML(path, main) {    var res = getItem(path, main) && getItem(path, main).innerHTML;
    return res ? res : '';}

function deleteItem(item) {
    item.parentNode.removeChild(item);
}
function pre() {
    if(unsafeWindow && unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(arguments);
    }
}
function getI(xpath,elem){    return document.evaluate(xpath, (!elem?document:elem), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getItem(xpath,elem){
    return document.evaluate(xpath, (!elem?document:elem),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function browserInit() {
    var ua = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    !/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
    	[];

    if(match[1]!='mozilla') {
        GM_setValue = function(name, value) {
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