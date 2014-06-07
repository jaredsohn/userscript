// ==UserScript==
// @name           OGame Redesign: Defense Points
// @namespace      OGdefence
// @description    Defence Point Costs version 1.4.5
// @include        http://*.ogame.*/game/index.php?page=defense*
// @version        1.4.5
// @svc:version    [1.4.5]
// @author         swares
// ==/UserScript==

// NOTE: If using Firefox 8 search for lines containing "comment the line below if using Firefox"
// and comment or uncomment  a few lines as directed.  There are 3 lines to comment 2 lines to uncomment.

// comment the line below if using Firefox 8
var $2; //for ajax success events.

// TODO: add pref (read/write/pref display) to use abreviated numbers see... FIXME:
// TODO: change prefs link to icon next to report link... see FIXME:
// TODO: verify the upgrade / enable / disable script (ogversioncheck) works
// TODO: Change SI to Hull Points
// should be - Combat research / Weapons / Shielding / Armor

var dp_armortech;
var dp_shieldtech;
var dp_weapontech;
var LANG = "en";
var version = '1.4.5';
var shipID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var shipPoints = [2, 2, 8, 37, 8, 130, 20, 100, 10, 25];
var shipMet = [2000, 1500, 6000, 20000, 2000, 50000, 10000, 50000, 8000, 12500];
var shipCrys = [0, 500, 2000, 15000, 6000, 30000, 10000, 50000, 0, 2500];
var shipDeut = [0, 0, 0, 2000, 0, 30000, 0, 0, 2000, 10000];
// base combat values
var shipStructure = [2000, 2000, 8000, 35000, 8000, 100000, 20000, 100000, 8000, 15000];
var shipShield = [20, 25, 100, 200, 500, 300, 2000, 10000, 1, 1];
var shipWeapon = [80, 100, 250, 1100, 150, 3000, 1, 1, 1, 12000];
// end of tech stats
var totalCount = 0;
var totalMet = 0;
var totalCrys = 0;
var totalDeut = 0;
var totalPoints = 0;
var totalStructure = 0;
var totalShield = 0;
var totalWeapon = 0;

document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
var stylesheet = document.styleSheets[document.styleSheets.length - 1];

/**
 * Almacenes, produccion y recursos actuales
 */
var metal;
var cristal;
var deuterio;

var pageinActual;
var divClear = '<div style="clear:both;height:4px;"></div>';
var hr = '<hr style="margin:8px 0;border-top-color:#111;border-bottom-color:#444;border-width:1px 0;border-style:solid;display:block;">';
var linkAnterior;

/**
 * Opciones
 */
var dp_link1_name;
var dp_link1_href;
var dp_link2_name;
var dp_link2_href;
var dp_link3_name;
var dp_link3_href;
var idioma = 'en';

/**
 * Lenguaje en uso (dependiendo el idioma en opciones se usa uno u otro)
 */
var LANG;

// start of script version checker for userscripts.org
var SVC = {
    currentVersion: "1.4.5", // Needed to compare working version with the download version at userscript.org
    scriptName: "OGame Redesign: Defense Points", // Used in the message to users of any version changes to the script
    scriptNum: 117906, // Needed to connect to the download page at userscript.org

    // GLOBAL SETTINGS
    currentDate: null, userRequestCheck: null, timer: null,

    init: function () {
        SVC.currentDate = new Date();
        var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

        // INITIALIZE LOCAL VALUES (FOR FIRST-TIME USE)
        if (!GM_getValue("latest")) GM_setValue("latest", cv );
        if (!GM_getValue("notified")) GM_setValue("notified", false);
        if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");

        // UPDATE LOCAL VALUES (FOR FIRST-TIME USE AFTER REINSTALL NEWER VERSION)
        if (GM_getValue("latest") < cv) {
            GM_setValue("latest", cv);
            GM_setValue("notified", false);
            GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
        }
    },
    verify: function () {
        SVC.userRequestCheck = false;
        var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));

        // CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION BEFORE AND 14 DAYS HAVE PASSED
        if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();

        // CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE LAST CHECKED
        if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
    },
    getInfo: function () {
        var uso = 'http://userscripts.org';
        function retrieve(url, re, count) {
            SVC.xhr.get(url, function (status, text) {
                window.clearTimeout(SVC.timer);
                if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
                if (status == 200) {
                    if (re.test(text)) var uv = re.exec(text)[1];
                    if (uv) SVC.compare(uv);
                    if (!uv && count == 1) {
                        retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
                    } else if (!uv && SVC.userRequestCheck) {
                        SVC.manualErrorMsg();
                    }
                }
            });
            SVC.timer = setTimeout(function () {
                if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
                if (count == 2)
                    if (SVC.userRequestCheck) SVC.manualErrorMsg(); // *new in v0.3.0* notify only if it is a user request check
                    else GM_setValue("lastChecked", SVC.currentDate.getTime() + ""); // *new in v0.3.0* the next check will be on the next day
            }, 3000); // *new in v0.3.0* change to 3secs to allow more time for heavy loaded sites
        };
        retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
    },
    xhr: {
        get: function (url, process) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function (res) { process(res.status, res.responseText); },
            });
        },
    },
    compare: function (version) {

            var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));

            // *NEW IN v0.3.0*
            // IF UPDATEDVERSIONINT IS NOT A NUMBER...
            if (isNaN(updatedVersionInt)) {
                if (SVC.userRequestCheck) SVC.manualErrorMsg();
                else GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
                return;
            }

            // DO NOTHING IF NO CHANGE IN VERSIONS
            if (updatedVersionInt <= GM_getValue("latest")) {
                if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
                return;
            }

            GM_setValue("notified", true);
            GM_setValue("lastChecked", SVC.currentDate.getTime() + "");

            // NOTIFY USER
            if (SVC.userRequestCheck) {

                var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');

                if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);

            } else {

                var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');

                if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);

            }
        },
    versionInfo: {
        autoChecking: function () {
            SVC.init();
            SVC.verify();
        },
        manualChecking: function () {
            SVC.userRequestCheck = true;
            SVC.getInfo();
        },
    },
    manualErrorMsg: function () {
        var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscript.org now?\n\n  ');
        if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
    },
};

GM_registerMenuCommand("Script Version Checker (Check Latest Version)", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();
// end of script version checker for userscripts.org

function main()
{
    // this section is here for future development (may want to pull data from multiple pages and save info)
    getPaginaActual();
    if ( (pageinActual=="unknown") || (pageinActual=="showmessage") || (pageinActual=="techinfo") || (pageinActual=="globalTechtree") || (pageinActual=="techtree")
        || (pageinActual=="buddies") || (pageinActual=="notices") || (pageinActual=="combatreport") || (pageinActual=="search") || (pageinActual=="writemessage") || (pageinActual=="empire"))
    {
        //el script no funciona en estas paginas, por ahora.
    }
    else if (pageinActual=="home")
    {
        loadOptions();
    }
    else
    {

        addEmpireLink();

        if (pageinActual=="resourceSettings")
        {
        }
        else if (pageinActual=="galaxy")
        {
        }
        else if (pageinActual=="movement")
        {
        }
    }
}

// count the defensive structures
function getDefenseCount(id) {
    var res = document.getElementById('defense' + id);
    res = res.innerHTML;
    res = res.replace("javascript:void(0);", "");
    res = res.substring(res.indexOf('(') + 1, res.indexOf(')'));
    return removeSeparator(res);
}

// gather the names of the defensive structures
function getDefenseName(id) {
    var res = document.getElementById('defense' + id);
    res = res.innerHTML;
    res = res.replace("javascript:void(0);", "");
    res = res.substring(res.indexOf('|') + 1, res.indexOf('('));
    return res;
}

// remove non digits chars from numeric string
function removeSeparator(str) {
    if (!str) return null;
    return parseInt(str.replace(/\./g, ''));
}

// reformat numeric string as a ogame number 1.000.000
function formatNumber(num) {
    var separator = '.';
    var res = '';
    num = '' + num;

    while (num.length > 3) {
        res = separator + num.slice(-3) + res;
        num = num.substr(0, num.length - 3);
    }

    res = num + res;
    return res;
}

// figure out what page were really on
function getPaginaActual()
{
    url = window.location + "";
    if (window.location.hostname == url.substring(7).replace(/\//g,"") )
    {
        pageinActual = "home";
    }
    else
    {
        //averiguar en que apartado del juego estamos
        partes = url.substring(url.indexOf('?')+1).split("&");
        comienzos = url.substring(0,url.indexOf('?')).split("/");
        if (comienzos[comienzos.length-1] == "index.php")
            pageinActual = partes[0].substring(partes[0].indexOf('=')+1);
        else
            pageinActual = "unknown";
    }
}

/**
 * Cargamos recursos, produccion, calculamos datos, etc
 */
function initialize()
{

// uncomment the line below if using Firefox 8
// try {$ = unsafeWindow.$;}
// uncomment the line below if using Firefox 8
// catch(e) {$ = window.$;}

// comment the line below if using Firefox 8
    try {$2 = unsafeWindow.$;}
// comment the line below if using Firefox 8
    catch(e) {$2 = window.$;}

    loadOptions();
}

// add link to report
function addEmpireLink()
{
    // add link for preferences
    addOptions();
    // Insert the link in the left menu + icon for pref link - FIXME: add link to prefs around menu_icon
    var link = window.document.createElement('a');
    link.setAttribute('href', '#');
    link.textContent = LANG.defensa + " " + LANG.points;
    link.className = "menubutton";
    link.addEventListener('click', showEmpire, false);
    $('#menuTable li').last().before('<li id="OGdefence-empire"><span class="menu_icon"><img width="38" height="29" src="http://gf1.geo.gfsrv.net/cdna6/b204fb038137bf3ecaea2c9b9d99fd.gif" style="width: 38px; height: 29px;"></span></li>');
    $('#OGdefence-empire').append(link);
}

// add options button (change link to icon next to button)
function addOptions()
{
    //insertamos el enlace en el menu izquierdo
    var link = window.document.createElement('a');
    link.setAttribute('href', '#');
    link.textContent = 'OGdefence';
    link.style.color = "orange";
    link.className = "menubutton";
    link.addEventListener('click', showOptions, false);
    $('#menuTable').append('<li id="OGdefence-options"><span class="menu_icon"></span></li>');
    $('#OGdefence-options').append(link);
}

// show report
function showEmpire()
{
    if ( $('#OGdefence-empire-view').length < 1)
    {
        linkAnterior = $('#menuTable li a.selected'); linkAnterior.removeClass('selected');
        $('#OGdefence-empire a').addClass('selected');
        $('#inhalt').after('<div id="OGdefence-empire-view" style="display:none;float:left;margin:0 20px 5px;padding:10px;position:relative;width:604px;background-color:#0D1014;border:3px double #000;"></div>');
        //rellenamos la capa con informacion del imperio
        var imperio = $('#OGdefence-empire-view');
        var tabla1 = '<table style="width:100%;text-align:right;"><tr><td colspan="9" style="text-align:center"><h2>' + LANG.defensa + ' ' + LANG.points + '</h2></td></tr><tr><th style="width:150px">'+LANG.defensa+'</th><th style="width:150px">'+LANG.count+'</th><th style="width:150px">'+LANG.metal+'</th><th style="width:150px">'+LANG.cristal+'</th><th style="width:150px">'+LANG.deuterio+'</th><th style="width:150px">'+LANG.points+'</th><th style="width:150px">'+LANG.hull+'</th><th style="width:150px">'+LANG.shield+'</th><th style="width:150px">'+LANG.attack+'</th></tr>';
        var fila1;
        var fila2;
        var auxm = 0; var auxc = 0; var auxd = 0;
        var totalm = 0; var totalc = 0; var totald = 0;
        var bt = ' style="border-top:1px dotted #848484"';

        for (var i = 0; i < shipID.length; i++) {
            if (i%2 == 0) bg=' style="background-color:#13181D"'; else bg=' style="background-color:#0D1014"';
            var Name = getDefenseName(shipID[i]);
            var Count = getDefenseCount(shipID[i]);
            var Met = Count * shipMet[i];
            var Crys = Count * shipCrys[i];
            var Deut = Count * shipDeut[i];
            var Points = Count * shipPoints[i];

            var Structure = Count * parseInt( (shipStructure[i] + (( shipStructure[i] / 10 ) * dp_armortech) / 10 ));
            var Shield = Count * parseInt( shipShield[i] + (( shipShield[i] / 10 ) * dp_shieldtech ));
            var Weapon = Count * parseInt( shipWeapon[i] + (( shipWeapon[i] / 10 ) * dp_weapontech ));

            if (Count > 0) {
                // if pref for abreviated numbers is turned on use this line
                if (Count < 0) { // FIXME: -- replace with preference var
                    tabla1=tabla1+'<tr'+bg+'><td class="label">'+Name+'</td><td>'+puntos(Count)+'</td><td>'+puntos(Met)+'</td><td>'+puntos(Crys)+'</td><td>'+puntos(Deut)+'</td><td>'+puntos(Points)+'</td>  <td>'+puntos(Structure)+'</td><td>'+puntos(Shield)+'</td><td>'+puntos(Weapon)+'</td>  </tr>';
                }else{
                    tabla1=tabla1+'<tr'+bg+'><td class="label">'+Name+'</td><td>'+formatNumber(Count)+'</td><td>'+formatNumber(Met)+'</td><td>'+formatNumber(Crys)+'</td><td>'+formatNumber(Deut)+'</td><td>'+formatNumber(Points)+'</td>   <td>'+formatNumber(Structure)+'</td><td>'+formatNumber(Shield)+'</td><td>'+formatNumber(Weapon)+'</td>  </tr>';
                }
            }
            totalCount += Count;
            totalMet += Met;
            totalCrys += Crys;
            totalDeut += Deut;
            totalPoints += Points;
            totalStructure += Structure;
            totalShield += Shield;
            totalWeapon += Weapon;
        }

        tabla1 = tabla1 + '<tr class="summary"><td class="label"'+bt+'>'+LANG.total+'</td><td class="undermark"'+bt+'>'+puntos(totalCount)+'</td><td class="undermark"'+bt+'>'+puntos(totalMet)+'</td><td class="undermark"'+bt+'>'+puntos(totalCrys)+'</td><td class="undermark"'+bt+'>'+puntos(totalDeut)+'</td><td class="undermark"'+bt+'>'+puntos(totalPoints)+'</td>  <td class="undermark"'+bt+'>'+puntos(totalStructure)+'</td><td class="undermark"'+bt+'>'+puntos(totalShield)+'</td><td class="undermark"'+bt+'>'+puntos(totalWeapon)+'</td></tr>';
        imperio.append( tabla1+'</table><br/><p> '+dp_link1_name+' '+version+' <a href="'+dp_link1_href+'">'+dp_link1_href+'</a></p><br/><p>Thanks to the ogamekit, shippoints, and svc projects for the code I reused.</p>' );

        $('#inhalt').hide();
        $('#OGdefence-empire-view').fadeIn(500);
    }
    else
    {
        $('#OGdefence-empire a').removeClass('selected');
        linkAnterior.addClass('selected');
        $('#OGdefence-empire-view').hide(); $('#OGdefence-empire-view').remove();
        $('#inhalt').show(500);
    }
}

/**
 * devuelve "sesion=xxxxxxx" ... get the session url parts
 */
function getSession(url)
{
    var fragmento = url.substring( url.search("session=") );
    partes = fragmento.split("&");
    return partes[0];
}

/**
 * Nueva funcion para agregar puntos en los miles y usar formato Ogame (ej: 400k, 3M) -- number reformating
 */
function puntos(numero)
{
    var cadena = "";
    numero = parseInt(numero,10);
    if (numero==0) return "0";
    //cambiamos 1.000.000 por 1M
    if (numero%1000000 == 0) cadena = (numero/1000000)+"M";
    else
    {
        //cambiamos 900.000 por 900k
        if ((numero%1000 == 0) && (numero<1000000) ) cadena = (numero/1000)+"k";
        else
        {
            //si no es cifra redonda, agregamos los puntos
            if (numero<1000) cadena = numero + "";
            else
            {
                unidades=numero%1000 + "";
                while (unidades.length < 3) {
                    unidades = '0' + unidades;
                }
                if (numero<1000000)
                {
                    cadena = Math.floor(numero/1000) + "." + unidades;
                }
                else
                {
                    millones=Math.floor(numero/1000000);
                    miles=Math.floor((numero-millones*1000000)/1000) + "";
                    while (miles.length < 3) {
                        miles = '0' + miles;
                    }
                    cadena = millones + "." + miles + "." + unidades;
                }
            }
        }
    }

    return cadena;
}

/**
 * Opciones del script
 */
function loadOptions()
{
    dp_link1_name = GM_getValue("dp_link1_name", "OGdefence"); dp_link1_href = GM_getValue("dp_link1_href", "http://userscripts.org/scripts/show/117906");
    dp_link2_name = GM_getValue("dp_link2_name", ""); dp_link2_href = GM_getValue("dp_link2_href", "");
    dp_link3_name = GM_getValue("dp_link3_name", ""); dp_link3_href = GM_getValue("dp_link3_href", "");
    dp_weapontech = GM_getValue("dp_weapontech", "0");
    dp_shieldtech = GM_getValue("dp_shieldtech", "0");
    dp_armortech = GM_getValue("dp_armortech", "0");
    idioma = GM_getValue("dp_idioma", 'en');
    switch (idioma)
    {
    case 'de': LANG = LANG_DE; break;
    case 'es': LANG = LANG_ES; break;
    case 'en': LANG = LANG_EN; break;
    case 'fr': LANG = LANG_FR; break;
    case 'pl': LANG = LANG_PL; break;
    case 'pt': LANG = LANG_PT; break;
    case 'ru': LANG = LANG_RU; break;
    case 'tr': LANG = LANG_TR; break;
    case 'it': LANG = LANG_IT; break;
    deafult: LANG = LANG_EN;
    }
}

// show options
function showOptions()
{
    //si quedo abierta una capa anterior, la borramos.
    var posibleCapaAnterior = $('#OGdefence-overlay');
    if (posibleCapaAnterior.length) posibleCapaAnterior.remove();
    //insertamos la capa de opciones
    var o = '<div id="OGdefence-overlay" style="display:none;position:absolute;z-index:90;background-color:rgba(0,0,0,0.7);"></div>';
    $('body').prepend(o);
    var overlay = $('#OGdefence-overlay');
    overlay.css('width', $(window).width() );
    overlay.css('height', $(window).height() );
    //link de cierre
    var aCerrar = window.document.createElement('a');
    aCerrar.setAttribute('href', '#');
    aCerrar.addEventListener('click', hideOptions, false);
    imgCierre = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAnFBMVEX////4YWP/dXjyS07/dXj9bXD6a234YWP4XWD2WVv2VFfsOTzoLzHmKSvkISP2VFf0TE/vREftPT/iHB72WVvvREf0TE//hon/gYX/fYD/e33/dXj/cXP9bXD/a236a23/Zmb4YWP4XWD/Wl32WVv/VVj2VFf3VFb0TE/yS072SUvvREfuQELtPT/sOTzrMzXoLzHnLC/mKSvkISPh2jkWAAAANHRSTlMAESIiMzMzMzMzMzMzMzNERERERHd3qv//////////////////////////////////////xnOhPwAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAJJJREFUGJVtzNcagjAMBtC498TVZWktFaEVx/u/mx2gXJibPyf5EoBWders9mOOd6toQgbBgh96wQjRobPkWO79huIj5qPgMt5ycqJCctIYQDCEMVFfAyh8yWjLE0UyN5j9LChl56udR0+dlbnnaV4tajNtAKoyLZ5LN1hroa3fvEzxSHyzudl4+44G2DbfE/hTH+8DDcV0Y3OAAAAAAElFTkSuQmCC";
    aCerrar.setAttribute('style', 'position:absolute;top:0;right:0;width:16px;height:16px;background:url('+imgCierre+') no-repeat scroll 0 0 transparent');

    var selected = new Array();
    selected[0] = (idioma=='es') ? "selected" : "";
    selected[1] = (idioma=='en') ? "selected" : "";
    selected[2] = (idioma=='fr') ? "selected" : "";
    selected[3] = (idioma=='pl') ? "selected" : "";
    selected[4] = (idioma=='pt') ? "selected" : "";
    selected[5] = (idioma=='ru') ? "selected" : "";
    selected[6] = (idioma=='tr') ? "selected" : "";
    selected[7] = (idioma=='it') ? "selected" : "";
    selected[8] = (idioma=='de') ? "selected" : "";
    var contenido = LANG.lenguaje+': <select id="idioma" style="float:right;width:150px;">'+
        '<option value="es" '+selected[0]+'>Español</option>'+
        '<option value="en" '+selected[1]+'>English</option>'+
        '<option value="fr" '+selected[2]+'>Français</option>'+
        '<option value="pl" '+selected[3]+'>Polski</option>'+
        '<option value="pt" '+selected[4]+'>Portuguese</option>'+
        '<option value="ru" '+selected[5]+'>Русский</option>'+
        '<option value="tr" '+selected[6]+'>Türkçe</option>'+
        '<option value="it" '+selected[7]+'>Italiano</option>'+
        '<option value="de" '+selected[8]+'>Deutsch</option>'+
        '</select>' + hr;

    contenido = contenido + divClear + '<table><tr><th colspan="6" align="center"> '+LANG.researchlevels+' </th></tr><tr><th> '+LANG.weapons+' </th><td><input id="dp_weapontech" type="text" size="2" style="float:left;margin-left:2px;" value="'+dp_weapontech+'"></input></td><th> '+LANG.shielding+' </th><td><input id="dp_shieldtech" type="text" size="2" style="float:left;margin-left:2px;" value="'+dp_shieldtech+'"></input></td><th> '+LANG.armor+' </th><td><input id="dp_armortech" type="text" size="2" style="float:left;margin-left:2px;" value="'+dp_armortech+'"></input></td></tr></table>'+hr+
    "<br/>Links:" + divClear + '<input id="dp_link1_name" type="text" style="float:left;margin-left:2px;" value="'+dp_link1_name+'"></input><input id="dp_link1_href" type="text" style="float:right;width:180px;" value="'+dp_link1_href+'"></input>' + divClear +
    divClear + '<input id="dp_link2_name" type="text" style="float:left;margin-left:2px;" value="'+dp_link2_name+'"></input><input id="dp_link2_href" type="text" style="float:right;width:180px;" value="'+dp_link2_href+'"></input>' + divClear +
    divClear + '<input id="dp_link3_name" type="text" style="float:left;margin-left:2px;" value="'+dp_link3_name+'"></input><input id="dp_link3_href" type="text" style="float:right;width:180px;" value="'+dp_link3_href+'"></input>' + divClear + hr;

    var guardar = document.createElement("a");
    //guardar.text = LANG.guardar; //daba problemas en chrome
    guardar.appendChild(document.createTextNode(LANG.guardar));
    guardar.setAttribute('href', '#');
    guardar.addEventListener('click', saveOptions, false);
    guardar.setAttribute('style', 'margin-top:10px;margin-left:340px;display:block;');

    var opciones = document.createElement("div");
    opciones.id = "OGdefence-opciones";
    overlay.append(opciones);
    var divOpciones = $('#OGdefence-opciones');
    divOpciones.css({'position':'relative', 'margin':'150px auto auto' , 'width':'400px' , 'background-color':'#2f2f2f' , 'border':'1px solid #666' , 'color':'orange' , 'padding':'20px' , 'text-align':'left'});
    divOpciones.html(contenido);
    divOpciones.append(guardar);

    $('#OGdefence-opciones').append(aCerrar);
    overlay.show('slow');
}

// hide options
function hideOptions()
{
    $('#OGdefence-overlay').remove();
}

// save options
function saveOptions()
{
    dp_link1_name = $('#dp_link1_name').val();
    dp_link1_href = $('#dp_link1_href').val();
    GM_setValue("dp_link1_name", dp_link1_name);
    GM_setValue("dp_link1_href", dp_link1_href);
    dp_link2_name = $('#dp_link2_name').val();
    dp_link2_href = $('#dp_link2_href').val();
    GM_setValue("dp_link2_name", dp_link2_name);
    GM_setValue("dp_link2_href", dp_link2_href);
    dp_link3_name = $('#dp_link3_name').val();
    dp_link3_href = $('#dp_link3_href').val();
    GM_setValue("dp_link3_name", dp_link3_name);
    GM_setValue("dp_link3_href", dp_link3_href);
    dp_weapontech = $('#dp_weapontech').val();
    dp_shieldtech = $('#dp_shieldtech').val();
    dp_armortech = $('#dp_armortech').val();
    GM_setValue("dp_weapontech", dp_weapontech);
    GM_setValue("dp_shieldtech", dp_shieldtech);
    GM_setValue("dp_armortech", dp_armortech);
    idioma = $("#idioma option:selected").attr('value');
    GM_setValue("dp_idioma", idioma);
    hideOptions();
    document.location.reload(); //recargamos la pagina
}

/**
 * Lenguajes
 */
var LANG_DE = {
    points: "Punkte",
    count: "Zählen",
    metal: "Metall",
    cristal: "Kristall",
    deuterio: "Deuterium",
    guardar: "Sparen",
    lenguaje: "Sprache",
    defensa: "Schiff",
    total: "Gesamt",
    attack: "Angriff",
    shield: "Schild",
    weapons: "Waffen",
    shielding: "Abschirmung",
    structure: "Struktur",
    armor: "Rüstung",
    hull: "Rumpf",
    researchlevels: "Kampf Forschung",
};
var LANG_ES = {
    points: "Puntos",
    count: "Contar",
    metal: "Metal",
    cristal: "Cristal",
    deuterio: "Deuterio",
    guardar: "Guardar",
    lenguaje: "Lenguaje",
    defensa: "Defensas",
    total: "Total",
    attack: "Ataque",
    shield: "Escudo",
    weapons: "las armas",
    shielding: "blindaje",
    structure: "Estructura",
    armor: "Armadura",
    hull: "Casco",
    researchlevels: "Lucha contra la investigación",
};
var LANG_EN = {
    points: "Points",
    count: "Count",
    metal: "Metal",
    cristal: "Crystal",
    deuterio: "Deuterium",
    guardar: "Save",
    lenguaje: "Language",
    defensa: "Defense",
    total: "Total",
    attack: "Attack",
    shield: "Shield",
    weapons: "Weapons",
    shielding: "Shielding",
    structure: "Structure",
    armor: "Armor",
    hull: "Hull",
    researchlevels: "Combat Research",
};
//Thanks to "la faucille"
var LANG_FR = {
    points: "des Points",
    count: "Comptent",
    metal: "Métal",
    cristal: "Cristal",
    deuterio: "Deutérium",
    guardar: "Sauver",
    lenguaje: "Langage",
    defensa: "Défense",
    total: "Total des",
    attack: "Attaque",
    shield: "Bouclier",
    weapons: "armes",
    shielding: "blindage",
    structure: "Structure",
    armor: "Armures",
    hull: "Hull",
    researchlevels: "recherche de combat",
};
//Thanks to "ErCmAc"
var LANG_PL = {
    points: "Punktów",
    count: "Liczyć",
    metal: "Metal",
    cristal: "Kryształ",
    deuterio: "Deuter",
    guardar: "Zapisz",
    lenguaje: "Język",
    defensa: "Obrona",
    total: "Całkowity",
    attack: "Atak",
    shield: "Sarcza",
    weapons: "broń",
    shielding: "Ekranowanie",
    structure: "Struktura",
    armor: "Zbroja",
    hull: "Hull",
    researchlevels: "Badania walki",
}
//Thanks to "Chotaz"
var LANG_PT = {
    points: "Pontos",
    count: "Contar",
    metal: "Metal",
    cristal: "Cristal",
    deuterio: "Deutério",
    guardar: "Guardar",
    lenguaje: "Linguagem",
    defensa: "Defesa",
    total: "Total",
    attack: "Ataque",
    shield: "Escudo",
    weapons: "armas",
    shielding: "blindagem",
    structure: "Estrutura",
    armor: "Armadura",
    hull: "Casco",
    researchlevels: "Pesquisa de combate",
}
//Thanks to "ASiper"
var LANG_RU = {
    points: "Точками",
    count: "Подсчет",
    metal: "Металл",
    cristal: "Кристалл",
    deuterio: "Дейтерий",
    guardar: "Сохранить",
    lenguaje: "Язык",
    defensa: "Оборона",
    total: "Всего",
    attack: "Нападение",
    shield: "Щит",
    weapons: "Оружие",
    shielding: "экранирование",
    structure: "Cтруктура",
    armor: "Доспехи",
    hull: "Корпус",
    researchlevels: "Борьба исследований",
}
/* thanks to AmchoD */
var LANG_TR = {
    points: "Noktaları",
    count: "Saymak",
    metal: "Metal",
    cristal: "Kristal",
    deuterio: "Deuterium",
    guardar: "Kaydet",
    lenguaje: "Dil",
    defensa: "Savunma",
    total: "Toplam",
    attack: "Saldırı",
    shield: "Kalkan",
    weapons: "Silahlar",
    shielding: "Koruyucu",
    structure: "Yapı",
    armor: "Zırh",
    hull: "Gövde",
    researchlevels: "Mücadele Araştırma",
};
/* thanks to Snooze2 */
var LANG_IT = {
    points: "Punti",
    count: "Contare",
    metal: "Metallo",
    cristal: "Cristallo",
    deuterio: "Deuterio",
    guardar: "Salva",
    lenguaje: "Lingua",
    defensa: "Difese",
    total: "Totale",
    attack: "Attacco",
    shield: "Scudo",
    weapons: "armi",
    shielding: "schermatura",
    structure: "Struttura",
    armor: "Armatura",
    hull: "Scafo",
    researchlevels: "combattimento di ricerca",
};

initialize();
window.addEventListener('load',main,true);
