// ==UserScript==
// @name           BattlePaster
// @namespace      C3isCool
// @include        http://*.astroempires.com/messages.aspx
// @include        http://*.astroempires.com/messages.aspx?message=*&last_read=*
// @include        http://*.astroempires.com/messages.aspx?view=savebox
// @include        http://*.astroempires.com/combat.aspx?*
// @include        http://battlepaste.nullnetwork.net/paste
// @description    Provide a link to copy battle reports to battlepaste site. Version 1.04
// ==/UserScript==
main();

function main() {
    BRs = document.evaluate("//div[@class='battle-report']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < BRs.snapshotLength; i++) {
        if (window.location.href.match("messages.aspx?")) {
            var target = BRs.snapshotItem(i).parentNode.parentNode.parentNode.previousSibling.lastChild.previousSibling
            target.appendChild(document.createTextNode(" - "));
            target.appendChild(document.createElement('br'));
        } else if (window.location.href.match("combat.aspx?")) {
            var target = document.createElement('center');
            if (GM_getValue('scout', true)) {
                BRs.snapshotItem(i).parentNode.parentNode.insertBefore(target, BRs.snapshotItem(i).parentNode.previousSibling);
            }
        }
        target.appendChild(document.createElement('a'));
        target.lastChild.innerHTML = 'Copy to battlepaste';
        target.lastChild.name = i;
        target.lastChild.href = "javascript:void(1);";
        target.lastChild.addEventListener('click', pasteBR, true);
    }
    try {
        var header = document.getElementById("messages_menu").firstChild.firstChild;
        var options = header.appendChild(document.createElement('th'));
        options.appendChild(document.createElement('a'));
        options.firstChild.innerHTML = 'Battlepaste Options';
        options.firstChild.href = "javascript:void(1);";
        options.firstChild.addEventListener('click', optionsMenu, true);
        header.firstChild.setAttribute('width', '15%');
        for (var i = 1; i < header.childNodes.length; i++) {
            header.childNodes[i].setAttribute('width', '17%');
        }
    } catch (err) { }
}

function optionsMenu() {
    if (!document.getElementById('menu')) {
        var menu = document.createElement('table');
        try {
            menu.style.width = document.getElementById('messages_inbox').width;
            menu.align = 'center';
            menu.id = 'menu';
            document.getElementById('messages_inbox').parentNode.insertBefore(menu, document.getElementById('messages_inbox'));
            document.getElementById('messages_inbox').parentNode.insertBefore(document.createElement('br'), document.getElementById('messages_inbox'));
        } catch (err) {
            menu.style.width = document.getElementById('messages_savebox').width;
            menu.align = 'center';
            menu.id = 'menu';
            document.getElementById('messages_savebox').parentNode.insertBefore(menu, document.getElementById('messages_savebox'));
            document.getElementById('messages_savebox').parentNode.insertBefore(document.createElement('br'), document.getElementById('messages_savebox'));
        }
        var row = menu.appendChild(document.createElement('tr'));

        row.appendChild(document.createElement('th'));
        row.lastChild.innerHTML = "Options";

        row.appendChild(document.createElement('th'));
        var mask = row.lastChild.appendChild(document.createElement('input'));
        mask.setAttribute('type', 'checkbox');
        mask.id = 'mask';
        row.lastChild.appendChild(document.createElement('code')); 
        row.lastChild.lastChild.innerHTML = 'Mask Technology?';

        row.appendChild(document.createElement('th'));
        var public = row.lastChild.appendChild(document.createElement('input'));
        public.setAttribute('type', 'checkbox');
        public.id = 'public';
        row.lastChild.appendChild(document.createElement('code'));
        row.lastChild.lastChild.innerHTML = 'Make Public?';

        row.appendChild(document.createElement('th'));
        var scout = row.lastChild.appendChild(document.createElement('input'));
        scout.setAttribute('type', 'checkbox');
        scout.id = 'scout';
        row.lastChild.appendChild(document.createElement('code'));
        row.lastChild.lastChild.innerHTML = 'Scout Reports?';
                
        row.appendChild(document.createElement('th'));
        row.lastChild.appendChild(document.createElement('input'));
        row.lastChild.firstChild.setAttribute('type', 'button');
        row.lastChild.firstChild.setAttribute('class', "input-button");
        row.lastChild.firstChild.value = 'Save';
        row.lastChild.firstChild.addEventListener('click', save, true);

        mask.checked = GM_getValue('mask', false);
        public.checked = GM_getValue('public', true);
        scout.checked = GM_getValue('scout', true);
       
    } else {
        save();
    }
}

function save() {
    GM_setValue('mask', document.getElementById('mask').checked);
    GM_setValue('public', document.getElementById('public').checked);
    GM_setValue('scout', document.getElementById('scout').checked);
    
    var public = 0 + GM_getValue('public', true);
    var mask = 0 + GM_getValue('mask', false);
    
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu').nextSibling);
    document.getElementById('menu').parentNode.removeChild(document.getElementById('menu'));
}

function pasteBR() {

    br = BRs.snapshotItem(this.name).innerHTML;
    br = br.replace(/<\/tr>|<\/table>/g, "\r").replace(/<\/td>|<\/th>|<\/b>/g, "\t").replace(/<small>/g, "\r").
        replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;&nbsp;\r|/g, "").replace("\r(", "(").replace(")N", ")\rN");
        
        var temp = "report="+ br
        if (GM_getValue('public', true)) { temp += "&ispublic=1"; }
        if ((GM_getValue('mask', false)) && (!window.location.href.match("combat.aspx?"))) { temp += "&masktech=1"; }
      
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://battlepaste.nullnetwork.net/dopaste.php',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-type': 'application/x-www-form-urlencoded;',
            },
            data: temp,
            onload: function (response) {
                window.open(response.finalUrl);
            }
        });
}
