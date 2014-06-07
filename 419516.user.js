// ==UserScript==
// @name       Farm Manager Script
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include        http://*.die-staemme.de/*game.php?*screen=am_farm*
// @copyright  2012+, You
// ==/UserScript==
var rowA = Array.prototype.slice.call(document.getElementsByClassName('row_a'));
var rowB = Array.prototype.slice.call(document.getElementsByClassName('row_b'));
var rows = rowA.concat(rowB);
rows = rows.sort();

var COUNTDOWN_MIN = 15;

function saveSetting(k, v) {
    var date = new Date();
    date.setTime(date.getTime()+(3600000)); // TODO: one hour
    var expires = "; expires="+date.toGMTString();
    console.log(k + " = " + v);
    window.document.cookie = k + "=" + v + expires + "; path=/";
}

function loadSetting(k) {
    var nameEQ = k + "=";
    var ca = window.document.cookie.split(';');
    for( var i=0; i < ca.length; i++) {
        var c = ca[i];
        while ( c.charAt(0)==' ' ) {
            c = c.substring(1,c.length);
        }
        if ( c.indexOf(nameEQ) == 0 ) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
    
}

function showInfo(string, style) {
    var h3 = document.getElementsByTagName('h3');
    for(var i = 0; i < h3.length; i++) {
        if(h3[i].innerHTML.indexOf("Farm-Assistent") != -1) {
            var info = document.getElementById('farm_info');
            if(!info) {
                info = document.createElement('span'); 
                h3[i].appendChild(info);
            }
            info.setAttribute('style', style);
            info.setAttribute('id', "farm_info");
            info.innerHTML = ' ' + string;
        }
    }
}

function hasFullLoot(imgSrc) {
    for(var k = 0; k <= imgSrc.length-1; k++) {
        // suche nach volle beute symbol
        if(imgSrc[k].getAttribute('src').indexOf("1.png") != -1) {
            return true;
        }
    }
    //otherwise:
    return false;
}

function nextPage() {
    var pages = document.getElementsByClassName('paged-nav-item');
    // care, off by one error on purpose
    for(var i = 0; i <= pages.length; i++) {
        
        if(!pages[i]) {
            // last page, abort
            //saveSetting("farmUnattAll", "false");
            //saveSetting("farmUnattFull", "false");
            showInfo('<span style="color: black;">- </span>Abgeschlossen.', "color: red;");
            
            var remainingSec = COUNTDOWN_MIN*60;
            var timer = window.setInterval(function() {
                if(remainingSec <= 0) {
                    window.clearInterval(timer);
                    pages[0].click();
                } else {
                	showInfo('<span style="color: black;">- </span>Nächste Farmwelle in ' + remainingSec, "color: black;");
                }
                remainingSec -= 1;
            }, 1000);
            
            break;
        }
        if(pages[i].innerHTML.indexOf((i+1).toString()) == -1) {
            pages[i].click();
            break;
        }
    }
}

function isRunningAttack(imgSrc) {
    for(var k = 0; k <= imgSrc.length-1; k++) {
        // suche nach angriffssymbol
        if(imgSrc[k].getAttribute('src').indexOf("attack.png") != -1) {
            return true;
        }
    }
    //otherwise:
    return false;
}

function sendTroops(row) {
    var iconA = row.getElementsByClassName('farm_icon_a farm_icon_disabled')[0];
    var iconB = row.getElementsByClassName('farm_icon_b farm_icon_disabled')[0];
    if(!iconA) {
        // iconA is enabled --> send preset A
        var aButton = row.getElementsByClassName('farm_icon_a')[0];
        aButton.click();
    } else if(!iconB)  {
        // iconB is enabled --> send preset B
        var bButton = row.getElementsByClassName('farm_icon_b')[0];
        bButton.click();
    } 
        /* TODO:
     * if(document.getElementsByClassName('error')[0].getElementsByTagName('p') == "Nicht genügend Einheiten vorhanden")
        alert('nicht genügend Einheiten');*/
        }

function getRandomNr() {
    return (Math.random()*150 + 150);
}
var timeout;

function farmUnattFull(j) {
    
    showInfo('<span style="color: black;">- </span>Farme Dörfer mit voller Beute...', "color: green;");
    if(j < rows.length) {
        var imgSrc = rows[j].getElementsByTagName('img');
        timeout = window.setTimeout(function() { if(!isRunningAttack(imgSrc) && hasFullLoot(imgSrc)) { sendTroops(rows[j]); } farmUnattFull(j+1);}, getRandomNr());
    } else {
        nextPage();       
    }
}

function farmUnattAll(j) {
    
    showInfo('<span style="color: black;">- </span>Farme alle Dörfer...', "color: green;");
    if(j < rows.length) {
        var imgSrc = rows[j].getElementsByTagName('img');
        timeout = window.setTimeout(function() { if(!isRunningAttack(imgSrc)) { sendTroops(rows[j]); } farmUnattAll(j+1);}, getRandomNr());
    } else {
        nextPage(); 
    }
}

if(loadSetting("farmUnattAll") == "true") {
    farmUnattAll(0);   
}
if(loadSetting("farmUnattFull") == "true") {
    farmUnattFull(0);   
}


window.onkeyup = function(e) {
    console.log(e.which + " pressed.");
    switch(e.which) {
        case 27: // esc
            saveSetting("farmUnattAll", "false");
    		saveSetting("farmUnattFull", "false");
            break;
        case 70: // f
            saveSetting("farmUnattFull", "true");
    		saveSetting("farmUnattAll", "false");
            farmUnattFull(0);
            break;
        case 65: // a
            saveSetting("farmUnattAll", "true");
   			saveSetting("farmUnattFull", "false");
            farmUnattAll(0);
            break;
    }
};

