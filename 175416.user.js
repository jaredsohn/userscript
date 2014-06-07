// ==UserScript==
// @name        DooBSteamGifts
// @description SteamGifts.com tools for hide unwanted games etc.
// @namespace   http://doobler.net/greasemonkey/
// @author      DooBLER http://doobler.net
// @version     0.2
// @include     http://www.steamgifts.com*
// @exclude     http://www.steamgifts.com/giveaway/*
// @exclude     http://www.steamgifts.com/create*
// @exclude     http://www.steamgifts.com/forum*
// ==/UserScript==



(function() {

// === Variables ===================================================== //

// tablica z id ukrytych gier
var ukryte = new Array();
// konfig
var dconfig = {};

// lista elementów zawierających gry na danej podstronie
var dgry = null;
// formularz konfiguracji
var dcfgform = null;


// === Functions ===================================================== //

/**
 * Tworzy i dodaje nowy element css
 */
function insertCss( code ) {
    var style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        // IE
        style.styleSheet.cssText = code;
    } else {
        // Other browsers
        style.innerHTML = code;
    }

    document.getElementsByTagName("head")[0].appendChild( style );
}

/**
 * Event klikania w przycisk ukryj/pokaż
 */
function btnev(event) {
    
    var graid = Number(this.title)
    
    var idindex = ukryte.indexOf(graid);
    
    if(idindex > -1) {
        // jeśli jest na liście
        ukryte.splice(idindex, 1);
    } else {
        // jeśli nie ma na liście
        ukryte.push(graid);
    }
    
    dprocess();
    
    localStorage.ukryte = JSON.stringify(ukryte);
}


/**
 * Event klikania w pola formularza konfigu
 */
function cfgev() {
    dcfgform
    
    dconfig = {};
    dconfig['cfgfeat'] = dcfgform.elements.namedItem('cfgfeat').checked;
    dconfig['cfgenter'] = dcfgform.elements.namedItem('cfgenter').checked;
    cfgellist = dcfgform.elements.namedItem('cfghid');
    for(i = 0; i < cfgellist.length; i++) {
        if(cfgellist[i].checked) {
            dconfig['cfghid'] = cfgellist[i].value;
        }
    }
    cfgellist = dcfgform.elements.namedItem('cfgcontr');
    for(i = 0; i < cfgellist.length; i++) {
        if(cfgellist[i].checked) {
            dconfig['cfgcontr'] = cfgellist[i].value;
        }
    }

    localStorage.dconfig = JSON.stringify(dconfig);
    
    cfgprocess();
    dprocess();
}

/**
 * Wykonanie akcji zawartych w konfigu, które nie pasują gdzie indziej...
 */
function cfgprocess() {
    
    if(dconfig['cfgfeat'] == true) {
        document.getElementsByClassName('featured')[0].parentNode.style.display = "none"
    } else {
        document.getElementsByClassName('featured')[0].parentNode.style.display = "block"
    }

}

/**
 * Przetworzenie gier na stronie
 */
function dprocess() {
    
    var i, len = dgry.length;
    for (i = 0; i < len; i++) {
        
        var gra = dgry[i];

        if(gra.classList.contains('dnormal')) {
            
            var grabtn = gra.getElementsByClassName('dbtn')[0]
            var graid = Number(grabtn.title);
            
            var idindex = ukryte.indexOf(graid);
            
            var ukryj = 'none';
            
            // sprawdzenie czy gra jest ukryta
            if(idindex > -1){
                ukryj = dconfig['cfghid'];
                
                grabtn.innerHTML = 'Show';
                grabtn.classList.remove('green');
            } else {
                grabtn.innerHTML = 'Hide';
                grabtn.classList.add('green');
            }
            
            if(gra.classList.contains('dcontrib')) {
                
                if(ukryj != dconfig['cfgcontr']) {
                    if(ukryj == 'none') {
                        ukryj = dconfig['cfgcontr'];
                    } else if(ukryj == 'fade' && dconfig['cfgcontr'] == 'hide') {
                        ukryj = dconfig['cfgcontr'];
                    }
                }
            }
            
            
            if(ukryj != 'none') {
                if(ukryj == 'fade') {
                    gra.classList.add('fade');
                    gra.style.display = '';
                } else if(ukryj == 'hide') {
                    gra.style.display = 'none';
                } else {
                    gra.classList.remove('fade');
                    gra.style.display = '';
                }
            } else {
                gra.classList.remove('fade');
                gra.style.display = '';
            }
            
        } else if(gra.classList.contains('dentered')) {
            gra.style.display = (dconfig['cfgenter'] ? 'none' : '' );
        }
    }
    
    document.getElementById('dcount').innerHTML = ukryte.length;
}

// === Main ===================================================== //

function sguserjs() {
    
    
    // pobiera zmienną "ukryte" ze storage
    if(localStorage.ukryte) {
        ukryte = JSON.parse(localStorage.ukryte);
    } else {
        localStorage.ukryte = JSON.stringify(ukryte);
    }
    
    // pobranie konfigu
    if(localStorage.dconfig) {
        dconfig = JSON.parse(localStorage.dconfig);
    } else {
        // tworzenie domyślnego konfigu
        dconfig = {};
        dconfig['cfgfeat'] = false;
        dconfig['cfgenter'] = false;
        dconfig['cfghid'] = 'fade';
        dconfig['cfgcontr'] = 'fade';
        
        localStorage.dconfig = JSON.stringify(dconfig);
    }
    
    cfgprocess();
    
    
    var newcss = "#dcfgbox {position: fixed; bottom: 0; right: 0; width: 125px; " +
    "border: 1px solid #D3D3D3; border-right: none; border-bottom: none; font-size: 90%;" +
    "background: #F9F9FB url(\"http://www.steamgifts.com/img/light_grey_gradient.png\") repeat-x 0 0; " +
    "padding: 0; border-top-left-radius: 5px;}\n " +
    "#dcfgbtn {text-align: center; padding: 5px; font-weight: bold;}\n " +
    "#dcfgbox #dcfg {display: none; font-size: 90%; padding: 5px; border-top: 1px solid #D3D3D3;}\n " +
    "#dcfgbox:hover #dcfg {display: block;}\n " +
    "#dcount {font-weight: bold;}\n " +
    "#dcfgbox #dcountbox {display: none; font-size: 90%; padding: 5px; border-top: 1px solid #D3D3D3; text-align: center;}\n" +
    "#dcfgbox:hover #dcountbox {display: block;}";
    
    insertCss(newcss);
    

    // dodanie panelu konfiguracji
    var dcfgbox = document.createElement('div');
    dcfgbox.id = 'dcfgbox';
    
    var dcfgbtn = document.createElement('div');
    dcfgbtn.id = 'dcfgbtn';
    dcfgbtn.innerHTML = 'JS Config';
    
    var dcfg = document.createElement('div');
    dcfg.id = 'dcfg';
    
    dcfgform = document.createElement('form');
    dcfgform.id = 'dcfgform';
    dcfgform.action = '';
    dcfgform.innerHTML = '<p><b>Featured:</b><br />' + 
    '<label for="cfgfeat">Hide</label><input type="checkbox" name="cfgfeat" id="cfgfeat" /></p>' +
    '<p><b>Entered:</b><br />' +
    '<label for="cfgenter">Hide</label><input type="checkbox" name="cfgenter" id="cfgenter" /></p>' +
    '<p><b>Hidden:</b><br />' +
    '<label for="cfghid1">Fade</label><input type="radio" name="cfghid" id="cfghid1" value="fade" /> ' +
    '<label for="cfghid2">Hide</label><input type="radio" name="cfghid" id="cfghid2" value="hide" /> ' +
    '<label for="cfghid3">None</label><input type="radio" name="cfghid" id="cfghid3" value="none" /></p>' +
    '<p><b>Contributors:</b><br />' +
    '<label for="cfgcontr1">Fade</label><input type="radio" name="cfgcontr" id="cfgcontr1" value="fade" /> ' +
    '<label for="cfgcontr2">Hide</label><input type="radio" name="cfgcontr" id="cfgcontr2" value="hide" /> ' +
    '<label for="cfgcontr3">None</label><input type="radio" name="cfgcontr" id="cfgcontr3" value="none" checked="checked" /></p>';
    
    var dcountbox = document.createElement('div');
    dcountbox.id = 'dcountbox';
    dcountbox.title = 'Click to unhide all!';
    dcountbox.innerHTML = 'Hidden games: <span id="dcount">0</span>';
    dcountbox.addEventListener("click", function() {
        if(confirm('You want to unhide all games.\nU mad?')) {
            localStorage.ukryte = '';
            ukryte = new Array();
            dprocess();
        }
    }, false);
    
    dcfgbox.appendChild(dcfgbtn);
    dcfgbox.appendChild(dcfg);
    dcfg.appendChild(dcfgform);
    dcfgbox.appendChild(dcountbox);
    document.body.appendChild(dcfgbox);

    // domyślny konfig do formularza
    dcfgform.elements['cfgfeat'].checked = dconfig['cfgfeat'];
    dcfgform.elements['cfgenter'].checked = dconfig['cfgenter'];
    cfgellist = dcfgform.elements['cfghid'];
    for(i = 0; i < cfgellist.length; i++) {
        if(cfgellist[i].value == dconfig['cfghid']) {
            cfgellist[i].checked = true;
        }
    }
    cfgellist = dcfgform.elements['cfgcontr'];
    for(i = 0; i < cfgellist.length; i++) {
        if(cfgellist[i].value == dconfig['cfgcontr']) {
            cfgellist[i].checked = true;
        }
    }
    
    // dodanie eventu do inputów
    cfgellist = dcfgform.getElementsByTagName("input");
    for(i = 0; i < cfgellist.length; i++) {
        cfgellist[i].addEventListener("change", cfgev, false);
    }
    

    

    var ajaxGifts = document.getElementsByClassName('ajax_gifts').item(0);

    if(ajaxGifts != null) {
            
        dgry = ajaxGifts.getElementsByClassName('post');
        
        
        var i, len = dgry.length;
        for (i = 0; i < len; i++) {

            var graid = null;
            
            var gra = dgry[i];
            
            var graimg = gra.getElementsByClassName('right')[0].getElementsByTagName("img")[0];
            
            //http://cdn.steampowered.com/v/gfx/apps/50300/capsule_184x69.jpg
            //http://cdn.steampowered.com/v/gfx/subs/15190/capsule_184x69.jpg
            
            var graid_match = graimg.src.match(/http:\/\/cdn.steampowered.com\/v\/gfx\/[a-z]+\/(\d+)\/capsule_184x69.jpg/);
            if (graid_match != null) graid = graid_match[1];
            
            var dflagEntered = false;
            var dflagContrib = false;
            
            if(gra.classList.contains('fade')) {
                // jeśli gra jest "entered"
                gra.classList.add('dentered');
                dflagEntered = true;
            } else {
                var contrel = gra.getElementsByClassName('contributor_only')[0];
                
                if(contrel && !contrel.classList.contains('green')) {
                    // jeśli tylko dla kontrybutorów i przekracza kwotę
                    gra.classList.add('dcontrib');
                    dflagContrib = true;
                }
            }
            
            
            // dodawanie odpowiednich guzików do kontenerów gier
            //---------------------------------------------------------------
            var ddiv = document.createElement('div');
            ddiv.className = 'description';
            ddiv.style.position = "absolute";
            ddiv.style.top = "-7px";
            ddiv.style.right = "0";
            
            
            if(dflagEntered) {
                
                ddiv.innerHTML = 'Entered.';
                
            } else {
                
                if(graid != null) {
                    
                    ddiv.innerHTML = 'Visibility:';
                    
                    var dbtn = document.createElement('span');
                    dbtn.innerHTML = 'Hide';
                    dbtn.style.cursor = 'pointer';
                    dbtn.className = 'contributor_only green dbtn';
                    dbtn.title = graid;
                    
                    gra.classList.add('dnormal');
                    
                    dbtn.addEventListener("click", btnev, false);
                    
                    ddiv.appendChild(dbtn);
                    
                } else {
                    
                    ddiv.innerHTML = 'N/D';
                }
                
                
            }

            var dleft = gra.getElementsByClassName('left')[0];
            dleft.style.position = 'relative';
            dleft.appendChild(ddiv);

        }
        
        dprocess();
        
    }
    

}

sguserjs(); // start

})();



