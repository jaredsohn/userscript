// ==UserScript==
// @name           DS Helper
// @namespace      bwfds
// @include        http://*.die-staemme.de/*
// @updateURL      https://userscripts.org/scripts/source/185238.meta.js
// @downloadURL    https://userscripts.org/scripts/source/185238.user.js
// @version        1.2
// @grant          none
// ==/UserScript==


// Village array gets populated on first run of the script...
var myVillages = [];

// Define unit types with runtimes and image url's
var units = {
    Spear: {
        runtime: 18,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_spear.png"
    },
    Sword: {
        runtime: 18,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_sword.png"
    },
    Axe: {
        runtime: 18,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_axe.png"
    },
    Archer: {
        runtime: 18,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_archer.png"
    },
    Spy: {
        runtime: 9,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_spy.png"
    },
    Light: {
        runtime: 10,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_light.png"
    },
    MArcher: {
        runtime: 10,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_light.png"
    },   
    Heavy: {
        runtime: 11,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_heavy.png"
    },
    Ram: {
        runtime: 30,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_ram.png"
    },
    Catapult: {
        runtime: 30,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_catapult.png"
    },
    Knight: {
        runtime: 10,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_knight.png"
    },
    Snob: {
        runtime: 35,
        image: "http://cdn2.tribalwars.net/8.15/18515/graphic/unit/unit_snob.png"
    }
    
}


// Extract pipe-seperated X/Y-Coordinate from string
function getXY(coordString, xy) {
    var sepPos = coordString.indexOf('|');
    
    if (xy.toUpperCase() === "X") {
        return coordString.substr(sepPos-3,3);
    }
    else if (xy.toUpperCase() === "Y") {
       return coordString.substr(sepPos+1,3); // y
    }
}

function convertToHHMM(iTime, showSeconds) {
    var e = Math.pow(10, 2);
    
    var hrs = 0;
    var min = 0;
    var sec = 0;
    // Hours
    if (iTime >= 60) {
        hrs = Math.floor(iTime / 60)
        iTime = iTime - (hrs*60);
    }
    // Minutes
    if (iTime >= 1) {
        min = Math.floor(iTime); 
        iTime = iTime - min;
    }
    // Seconds
    if (iTime > 0) {
        sec = Math.round(iTime * 60);
    }
    
    // Format time
    hrs += '';
    min += '';
    sec += '';
    
    if (hrs.length < 2) { hrs = '0' + hrs };
    if (min.length < 2) { min = '0' + min };
    if (sec.length < 2) { sec = '0' + sec };
    if (showSeconds) {
        return hrs + ':' + min + ':' + sec;
    } else {
        return hrs + ':' + min;
    }
}

// Returns runtime in minutes
function calculateRuntime(point1, point2, unitType) {
    var runtime;
    var x1 = getXY(point1, "x");
    var y1 = getXY(point1, "y");
    var x2 = getXY(point2, "x");
    var y2 = getXY(point2, "y");

    var e = Math.pow(10, 2);   
    runtime = Math.sqrt(((x1 - x2)*(x1 - x2)) + ((y1 - y2)*(y1 - y2))) * units[unitType].runtime;
    
    
    return (Math.round(runtime * e)  / e);
}

// Parse URLParams
function getURLParameter(name, sUrl) {
    if (sUrl === undefined) {
        sUrl = location.search;
    }
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(sUrl)||[,null])[1]
    );
}

// Get attack-url for specific village
function getAttackUrl(target, dest) {
    var url = '/game.php?target= ' + target + ' &village=' + dest + '&screen=place';
    return url;
}


// Berechne Laufzeiten von diesem Dorf zu den eigenen Dörfern
function getRuntimeTable() {
    var table = $('<table id="bwf-runtime-table"></table>');
    $(table).append();
    $(table).append('<tr><th>City</th><th><img src="' + units.Light.image + '" title="LKav"></th>' +
       '<th>' + 
            '<img src="' + units.Spear.image + '" title="Speer">' +
            //'<img src="' + units.Axe.image + '" title="Axt">' +
            //'<img src="' + units.Archer.image + '" title="Bogen"</th>'+
        '</tr>');
    
    var villageId = getURLParameter('village', $('#menu_row2_village a').attr('href'));
    var target = $('#labelText').html();
    var runtime;
    var bestRuntimeId = '';
    var bestRuntime = 100000;
    
    // Axe / Spear / Bow
    $.each(myVillages, function(val, key) {

        runtime = calculateRuntime(target, myVillages[val].cords, "Axe");
        // Get best runtime
        if (runtime < bestRuntime) {
            bestRuntime = runtime;
            bestRuntimeId = myVillages[val].id;                 
        }
        $(table).append('<tr id="axt-' + myVillages[val].id + '" style="Background-color:#E5C482">' +
            '<td><a href="' + getAttackUrl(getURLParameter('target', $("a:contains('» Dieses Dorf angreifen')").attr('href')), myVillages[val].id) + '">' + myVillages[val].name + '</a></td>' +
            '<td>' + convertToHHMM(calculateRuntime(target, myVillages[val].cords, "Light")) + '</td>'+
            '<td>' + convertToHHMM(runtime) + '</td>'+
            '</tr>');
    });
    
    $(table).append( '<tr><td colspan="3" style="text-align:center; background-color:#CCBA96; font-style:italic"><a href="#" id="bwf-update-village">Klicken um Dörfer zu updaten</a></td></tr>')
    
    // Highlight best runtime & current village
    $(table).find('#axt-' + bestRuntimeId).css('color','green');
    $(table).find('#axt-' + villageId).css('font-weight','bold');

    return table;
}
    
// Position the runtime table relative to #attack_info_att
function positionRuntimeTable() {
    var left = $('#attack_info_att').width() + $('#attack_info_att').offset().left + 10;
    var top =  $('#attack_info_att').offset().top + 3;
    $('#bwf-runtime-table').css('left', left);
    $('#bwf-runtime-table').css('top', top);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Store villages in local store
function updateVillages() {

    function changeFilter() {
        $("#group_id option[value='0']").attr('selected',true);
        $('#select_group_box').submit();  
    }
    
    function createVillages() {
        var villages = $('#group_table tr').filter(':visible');
        var villageObj = [];
        $(villages).each(function(index, elm) {
            if (index > 0) {
                // Village id
                var id = $(elm).find('td a').attr('href').substr(25,5);
                // Village name
        	    var name = $(elm).find('td a').html();
        	    // Village coordinate
        	    var cords = $(elm).find('td:nth-child(2)').html().trim();
        	    villageObj.push({"id" : id, "name" : name, "cords" : cords});
        	}
        });
        localStorage.setItem('myVillages', JSON.stringify(villageObj))
        villageDock.close();
        alert('Dörfer wurden aktualisiert');
        window.location.reload();
    }

    function sub() {
        if (!$("#group_id option[value='0']").attr('selected')) {
           changeFilter();
           setTimeout(createVillages, 1500);
        }
        else {
           createVillages();
        }
    }
    villageDock.open();
    setTimeout(sub, 1500);

}

window.addEventListener ("load", function() {  
    
    if (!localStorage.myVillages) {
        alert('No villages found - autoupdating villages...');
        updateVillages();
    }
    else {
        myVillages = JSON.parse(localStorage.getItem('myVillages')) ;
    }  
    
    
    // Report open?
    if (document.URL.indexOf('&view') > -1 && document.URL.indexOf('&screen=report') > -1) {
        
        // Add custom css
        var css = '#bwf-runtime-table {position: absolute; font-size:10px; border-collapse:collapse}' + 
                  '#bwf-runtime-table th, #bwf-runtime-table td {padding: 3px}';
        addGlobalStyle(css);

        var runtimeTable = getRuntimeTable();
        runtimeTable.appendTo("#main_layout");
        positionRuntimeTable();
        
        $(window).resize(function() { 
            positionRuntimeTable(); 
        });
        
        // Attach event listener
        $('#bwf-update-village').click(updateVillages);
    }
    
 }, false);