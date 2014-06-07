//
// ==UserScript==
// @name          hwmGmail
// @homepage      http://userscripts.org/scripts/show/88490
// @version       3.2
// @description   Gmail
// @include       http://www.heroeswm.ru/sms*
// ==/UserScript==

var frameId = 'frameGmail';
var url = document.location.href;
if(window.name!=frameId) {
    if(url.indexOf('sms.php?notebook')!=-1
        || url.indexOf('sms.php?sms_id=')!=-1
        || url.indexOf('sms-create.php')!=-1
        || (url.indexOf('sms_clans.php?clan_id=')!=-1 && url.indexOf('&read=')!=-1)) {    } else {

        var list = getI("//a");
        for(var count=0; count<list.snapshotLength; count++) {            var link = list.snapshotItem(count);
            if((link.href.indexOf('sms_clans.php?clan_id=')!=-1 && link.href.indexOf('&read=')!=-1) || link.href.indexOf('sms.php?sms_id=')!=-1) {
                var b = document.createElement('b');
                var id = parseInt(link.href.replace(/^.*sms_id=(.*)/gim, '$1'));
                if(!id) {                    id = parseInt(link.href.replace(/^.*read=(.*)/gim, '$1'));                }
                b.innerHTML = '&nbsp;&nbsp;<a id="'+ id +'" href="'+ link.href +'#'+ id +'" target="'+ frameId +'">[#]</a>';
                link.parentNode.insertBefore(b, link.nextSibling);            }
        }

        var div = document.createElement('div');
        div.innerHTML = '<iframe style="display:none" name="'+ frameId +'"></iframe>';
        document.body.appendChild(div);
        div.style.display = 'none';
    }} else {

    if(url.indexOf('sms.php?sms_id=')!=-1) {
        var sms = getItem("//input[contains(@type, 'hidden')][contains(@value, 'delete')][contains(@name, 'action')]");
        if(sms) {
            item = sms.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            if(item.tagName=='TD') {
                gmailView(item);
            }
        }
    } else

    if(url.indexOf('sms_clans.php?clan_id=')!=-1 && url.indexOf('read=')!=-1) {
        var sms = getItem("//a[contains(@href, 'clan_info.php?id=')]");
        if(sms) {
            item = sms.parentNode.parentNode.parentNode.parentNode.parentNode;
            if(item.tagName=='TD') {
                gmailView(item);
            }
        }
    } else

    if(url.indexOf('sms-create.php')!=-1) {
        var sms = getItem("//form[contains(@name, 'fmail')]");
        if(sms) {
            gmailView(sms.parentNode);
        }
    }}

function gmailView(item) {    var id = document.location.hash.substring(1);
    var link = getItem("//a[contains(@href, 'sms-create.php?action=reply')]", item);
    if(!link) {        link = getItem("//a[contains(@href, 'sms-create.php?mailto=')][contains(@href, '&subject=Re%3A%20')]", item);    }
    if(link) {        link.target = frameId;
        link.href += '&#'+ id;    }

    var main = getId('gmailView', window.parent);
    if(main) {
        if(main.getAttribute('name')!=id) {
            gmaiHide(getParentItem('td/div[2]', main));
            main = false;        }    }
    if(!main) {
        var tr = getId(id, window.parent).parentNode.parentNode.parentNode;
        var isNew = getParentItem('a[1]/font', getId(id, window.parent).parentNode.parentNode);
        if(isNew) {            deleteItem(isNew);        }
        var main = document.createElement('tr');
        tr.parentNode.insertBefore(main, tr.nextSibling);
        main.id = 'gmailView';
        main.setAttribute('name', id);
        main.innerHTML = '<td colspan="'+ tr.childElementCount +'">'
                             +'<div style="border: 1px solid black; width:60px; position:absolute; text-align:center; padding:10px; background: #fff;">'
                                 +'<a href="javascript:void(0);">\u0417\u0430\u043a\u0440\u044b\u0442\u044c</a>'
                             +'</div>'
                             +'<div style="margin:10px; overflow:auto; height:0px;"></div>'
                         +'</td>';
        getParentItem('td/div[1]', main).addEventListener("click", function() {
            gmaiHide(getParentItem('td/div[2]', main));
        }, false);
        gmailVisible(getParentItem('td/div[2]', main));
    }
    getParentItem('td/div[2]', main).innerHTML = item.innerHTML;
    document.body.innerHTML = '';    var left = findPosX(getParentItem('td/div[2]', main)) - 72 + getParentItem('td/div[2]', main).offsetWidth;
    getParentItem('td/div[1]', main).style.left = left +'px';
}

function gmailVisible(el) {
    var height = parseInt(el.style.height);
    if(height<400) {
        el.style.height = (height+12) +'px';
        var main = el.parentNode.parentNode;
        var left = findPosX(getParentItem('td/div[2]', main)) - 72 + getParentItem('td/div[2]', main).offsetWidth;
        getParentItem('td/div[1]', main).style.left = left +'px';        setTimeout(function() {
            gmailVisible(el);
        }, 10);
    }
}

function gmaiHide(el) {
    var height = parseInt(el.style.height);
    if(height>0) {
        el.style.height = (height-12) +'px';
        setTimeout(function() {
            gmaiHide(el);
        }, 10);
    } else {        deleteItem(el.parentNode.parentNode);    }
}

function findPosX(obj) {
    var curtop = 0;
    while (obj.offsetParent) {
        curtop += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return curtop;
}

function pre() {
    if(unsafeWindow && unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(arguments);
    }
}

function deleteItem(item) {
    item.parentNode.removeChild(item);
}

function getI(xpath, elem){    return document.evaluate(xpath, (!elem?document:elem), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getItem(xpath, elem){
    return document.evaluate(xpath, (!elem?document:elem),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function getParentItem(xpath, elem){
    return window.parent.document.evaluate(xpath, elem,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function getId(id, win) {    if(!win) {        win = window;    }
    return win.document.getElementById(id);}