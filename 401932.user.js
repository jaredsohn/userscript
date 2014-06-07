// ==UserScript==
// @name        S8 Clone Setter
// @namespace   Bennett
// @include     http://*.storm8.com/*
// @include     http://bscripts.x10.mx/setter*
// @version     2.0
// ==/UserScript==

var page = window.location.hostname;

if (page != "bscripts.x10.mx") {
    var gamepage = String(location).split('/')[3].split('.php')[0];
    if (gamepage == "points" || gamepage == "index") {
        document.location = 'http://bscripts.x10.mx/setter';
    }
    if (gamepage == "setting") {
        var btn1 = document.getElementsByClassName('sectionContent')[0];
        var btnpar = document.getElementsByClassName('sectionContent')[0].parentNode;
        var cce = document.createElement('table');
        cce.innerHTML = '<tbody><tr><td width="190" height="53" style="vertical-align: middle; padding-top: 1px;"><div class="optionText">(Re)Set Clone</div>'
        +'</td><td width="20">&nbsp;</td><td width="30" style="vertical-align: middle; padding-top: 1px;" align="center">'+
            '<input type="button" id="clr" value="(Re)Set"></a></td></tr></tbody>';
        btnpar.insertBefore(cce, btn1);
        var clrbtn = document.getElementById('clr');
        clrbtn.addEventListener('click', function(){var p = confirm('Press OK to (re)set the clone.');
                                                    if (p) {document.location = 'http://bscripts.x10.mx/setter?clear';}});
    }
    if (gamepage == "home") {
        var openclone = document.createElement('input');
        openclone.setAttribute('id', 'openclone');
        openclone.setAttribute('type', 'button');
        openclone.setAttribute('value', 'OC');
        openclone.style.padding = '10px';
        openclone.style.position = 'fixed';
        openclone.style.top = '58%';
        openclone.style.background = 'blue';
        openclone.style.border = '1px solid red';
        openclone.style.zIndex = '1001';
        document.body.insertBefore(openclone, document.body.firstChild);
        document.getElementById('openclone').addEventListener('click', function(){ document.location = 'http://bscripts.x10.mx/setter';});
    }
}

if (page == "bscripts.x10.mx") {
    var account = GM_getValue('account', '');
    if (String(location).indexOf('clear') != -1) {
        GM_setValue('account', '');
        document.location = 'http://bscripts.x10.mx/setter';
    }
    if (String(location).indexOf('udid') != -1) {
        var fuckedlink = document.getElementById('link').innerHTML;
        var link = fuckedlink.replace(/&amp;/g, '&');
        GM_setValue('account', link);
        document.location = link;
    }
    if (String(location).indexOf('udid') == -1 && String(location).indexOf('clear') == -1 && account != '') {
        document.location = account;
    }
}