// ==UserScript==
// @name        DataCow
// @namespace   http://userscripts.org/scripts/168628
// @description Cow's Database
// @include     /http\:\/\/omega\.astroempires\.com\/map\.aspx\?loc\=O[0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

var url = window.location.href;
var mapRegex = /http\:\/\/omega\.astroempires\.com\/map\.aspx\?loc=O[0-9][0-9]:[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;

if(url.match(mapRegex)) {
    var numDivs = $('body > div').length;
    var skinUsed;

    switch (numDivs) {
        case 0:
            skinUsed = 'deepspace';
            break;
        case 1:
            skinUsed = 'bluenova';
            break;
        case 2:
            skinUsed = 'original';
            break;
    }

    var baseExists = $('#map_base').length;
    var fleetExists = $('#map_fleets').length;
    
    getDataFromMap(baseExists, fleetExists, skinUsed);
}

function getDataFromMap(base, fleet, skinUsed) {

    //The locations in the DOM of all the data we are interested in.  These can easily be changed when the layout is updated.
    switch(skinUsed) {
        case 'deepspace':
            var coordinateLocation = $('#background-content > center:nth-child(3) > b:nth-child(1)');
            var astroTypeLocation = $('#astro_specs');
            var terrainLocation = $('#astro_specs');
            var baseNameLocation = $('table.listing:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > a:nth-child(1)');
            var currentEconomyLocation = $('table.listing:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)');
            var totalEconomyLocation  = $('table.listing:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)');
            var occupierNameLocation = $('table.listing:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3)');
            var playerNameLocation = $('table.listing:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > a:nth-child(1)');
            break;
        case 'bluenova':
            var coordinateLocation = $('#background-content > center:nth-child(3) > b:nth-child(1)');
            var astroTypeLocation = $('#astro_specs');
            var terrainLocation = $('#astro_specs');
            var baseNameLocation = $('.box1_content > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > a:nth-child(1)');
            var currentEconomyLocation = $('.box1_content > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)');
            var totalEconomyLocation  = $('.box1_content > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)');
            var occupierNameLocation = $('.box1_content > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3)');
            var playerNameLocation = $('.box1_content > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > a:nth-child(1)');
            break;
        case 'original':
            var coordinateLocation = $('body > center:nth-child(6) > b:nth-child(1)');
            var astroTypeLocation = $('.astro > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > center:nth-child(1)');
            var terrainLocation = $('.astro > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > center:nth-child(1)');
            var baseNameLocation = $('#map_base > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > a:nth-child(1)');
            var currentEconomyLocation = $('#map_base > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)');
            var totalEconomyLocation  = $('#map_base > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)');
            var occupierNameLocation = $('#map_base > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3)');
            var playerNameLocation = $('#map_base > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > a:nth-child(1)');
            break;
    }

    var coordinateRegex = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;
    var coordinate = coordinateLocation.text().match(coordinateRegex);

    var astroTypeRegex = /type: ([aA-zZ]*)terrain/i;
    var astroType = astroTypeLocation.text().match(astroTypeRegex);

    var terrainRegex = /terrain: ([aA-zZ]*)area/i;
    var terrain = terrainLocation.text().match(terrainRegex);
    
    var mapData = 'Coordinate: ' + coordinate  + '\n'
                + 'Terrain: ' + terrain[1]  + '\n'
                + 'Astro Type: ' + astroType[1] + '\n';
                

    if(base) {
        var baseName = baseNameLocation.text();

        var playerName = playerNameLocation.text();
    
        var occupierName = occupierNameLocation.text();

        var currentEconomyRegex = /([0-9]*) \/ [0-9]*/;
        var currentEconomy = currentEconomyLocation.text().match(currentEconomyRegex);

        var totalEconomyRegex = /[0-9]* \/ ([0-9]*)/;
        var totalEconomy = totalEconomyLocation.text().match(totalEconomyRegex);
        
        mapData += 'Base Name: ' + baseName + '\n'
                + 'Player Name: ' + playerName + '\n'
                + 'Occupier Name: ' + occupierName + '\n'
                + 'Current Economy: ' + currentEconomy[1] + '\n'
                + 'Total Economy: ' + totalEconomy[1] + '\n';
    }
                        
    alert(mapData);

    if(fleet) {
        var numFleets = $('.btnlisting > tbody:nth-child(2) > tr').length;
        
        for(i = 1; i <= numFleets; ++i) {
            var fleetsLocation = '.btnlisting > tbody:nth-child(2) > tr:nth-child('+i+')';
            var fleetNameLocation = $(fleetsLocation + ' > td:nth-child(1) > a:nth-child(1)');
            var fleetPlayerLocation = $(fleetsLocation + ' > td:nth-child(2) > a:nth-child(1)');
            var fleetArrivalLocation = $(fleetsLocation + ' > td:nth-child(3) > a:nth-child(1)');
            var fleetSizeLocation = $(fleetsLocation + ' > td:nth-child(4) > a:nth-child(1)');
    
            var fleetName = fleetNameLocation.text();
            var fleetIdRegex = /fleet\.aspx\?fleet=([0-9]*)/;
            var fleetId = fleetNameLocation.attr('href').match(fleetIdRegex);
            var fleetPlayer = fleetPlayerLocation.text();
            var fleetArrival = fleetArrivalLocation.text();
            var fleetSize = fleetSizeLocation.text();
        }

        var fleetData = 'Number of fleets ' + numFleets + '\n'
                    + 'Fleet name: ' + fleetName + '\n'
                    + 'Fleet id: ' + fleetId[1] + '\n'
                    + 'Fleet player: ' + fleetPlayer + '\n'
                    + 'Fleet arrival: ' + fleetArrival + '\n'
                    + 'Fleet size: ' + fleetSize + '\n';

        alert(fleetData);
    }
}