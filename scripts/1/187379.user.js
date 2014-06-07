// ==UserScript==
// @name           Storm8 Clone App Fixer
// @namespace      Bennett
// @description    Fixes the clone app
// @copyright      2014
// @version        1.0
// @include        http://*.storm8.com/*
// @include        http://bscripts.x10.mx/*
// ==/UserScript==

var gamepage = String(location).split('/')[3].split('.php')[0];
var active = GM_getValue('active', true);
if (gamepage == "setting") {
    var msg;
    var opposite;
    if (active) {
        msg = "Click OK to disable the clone app fixer bar.";
        opposite = false;
    }
    else {
        msg = "Click OK to enable the clone app fixer bar.";
        opposite = true;
    }
    var btn1 = document.getElementsByClassName('sectionContent')[0];
    var btnpar = document.getElementsByClassName('sectionContent')[0].parentNode;
    var cce = document.createElement('table');
    cce.innerHTML = '<tbody><tr><td width="190" height="53" style="vertical-align: middle; padding-top: 1px;"><div class="optionText">App Fixer</div>'
    +'</td><td width="20">&nbsp;</td><td width="30" style="vertical-align: middle; padding-top: 1px;" align="center">'+
        '<input type="button" id="clr" value="On/Off"></a></td></tr></tbody>';
    btnpar.insertBefore(cce, btn1);
    var clrbtn = document.getElementById('clr');
    clrbtn.addEventListener('click', function(){var p = confirm(msg);
                                                if (p) {GM_setValue('active',opposite);
                                                        document.location.reload();}});
}

if(active) {
    var oldURL = document.referrer;
    var firstGo = false;
    var cloneapp = GM_getValue('cloneapp', false);
    if (String(oldURL).indexOf('bscripts') != -1 && String(oldURL).indexOf('setter') == -1) {
        firstGo = true;
        GM_setValue('cloneapp', true);
    }
    
    if (((cloneapp && String(location).indexOf('storm8') != -1) || firstGo) && String(location).indexOf('setter') == -1) {
        document.body.style.background = 'black';
        var btns = document.createElement('div');
        btns.innerHTML = '<img src="http://bscripts.x10.mx/images/home.png" id="home" class="doc"><img src="http://bscripts.x10.mx/images/missions.png" id="missions" class="doc"><img src="http://bscripts.x10.mx/images/fight.png" id="fight" class="doc"><img src="http://bscripts.x10.mx/images/equipment.png" id="equipment" class="doc"><img src="http://bscripts.x10.mx/images/group.png" id="group" class="doc">';
        btns.style.position = 'fixed';
        btns.style.width = '320px';
        btns.style.left = '50%';
        btns.style.bottom = '-2px';
        btns.style.marginLeft = '-160px';
        btns.style.zIndex = '1001';
        document.body.insertBefore(btns, document.body.firstChild);
        var xtra = document.createElement('div');
        xtra.innerHTML = '<br><br><br>';
        document.getElementsByTagName("body")[0].appendChild(xtra);
        document.getElementById('home').addEventListener('click', function() { change('home'); });
        document.getElementById('missions').addEventListener('click', function() { change('missions'); });
        document.getElementById('fight').addEventListener('click', function() { change('fight'); });
        document.getElementById('equipment').addEventListener('click', function() { change('equipment'); });
        document.getElementById('group').addEventListener('click', function() { change('group'); });
        var page = String(location).split('/')[3].split('.php')[0];
        if (page == "group_member" || page == "group_leader") page = "group";
        if (page == "hitlist") page = "fight";
        if (page == "home" || page == "missions" || page == "fight" || page == "equipment" || page == "group") {
            document.getElementById(page).src="http://bscripts.x10.mx/images/" + page + "sl.png";
        }
    }
    function change(page) {
        document.location="/" + page + ".php";
    }
}