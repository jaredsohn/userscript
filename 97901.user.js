// ==UserScript==
// @name           Auto Perimeter Scan 1.0.1b
// @namespace      by guardian
// @description    Automatically performs a perimeter scan for your fleets, results shown at navigation page
// @include        http://*.war-facts.com/fleet_navigation.php*
// ==/UserScript==

//Please note original code is by Ravenlord , revision 1.0.2 is by guardian

/* Revision History +/

version 1.0.1  -  12/28/2006 
- added "loading" notice to the page so the user knows when the lookup is done

version 1.0.1b - 26/02/2011 (I had to fix 1.0.1 cause I can't get a link to 1.0.3 ,  if you have please send
- Corrected it so it gets the correct data for ships and tonnage (look at //)
- Changed the parseInt to parseFloat so that id also shows probes with 0.1 tonnage etc
- Added shipTons=shipTons.toFixed(1) before displaying so as to avoid really long numbers.
- Set deafult to use_Outside100 = true;

/+ End Revision History */


var use_APScan     = true;
var use_Outside100 = true;   // Set to true to perform a perim scan every time, false if only when at 100^3

var base = window.location.href;
var instance = base.substring(base.indexOf("//") + 2);
instance = instance.substring(0, instance.indexOf("."));


window.loadAutoPerimScan = function() {


    if (!use_APScan) return false;
    
    var fleetNavTable = document.getElementsByName('form2')[0].getElementsByTagName('table')[0];
    if (!fleetNavTable) return false;
    
    // If we're in transit, combat, etc., there'll only be one row in the table; bomb out now
    if (fleetNavTable.rows.length == 1) return false;
    
    // First, check to see if we're at 100^3, or if it even matters
    if (!use_Outside100) {
        var fleetCoordsCell = fleetNavTable.rows[1].cells[3];
        if (fleetCoordsCell.innerHTML.indexOf('100, 100, 100 local') == -1) return false;
    }

    // Grab the fleet ID - we'll need it later to perform the perimeter scan
    var fleetPosCell = fleetNavTable.rows[1].cells[1];
    var fleetID = fleetPosCell.getElementsByTagName('a')[0].href.replace(/^.*fleet=(\d+).*$/,"$1");
    if (!fleetID) return false;
    
    // Let the user know we're working...
    fleetPosCell.appendChild(document.createElement('br'));
    fleetPosCell.appendChild(document.createTextNode('(loading...)'));

    // Grab Perimeter Scan
    function getPerimeterScan(f_id) {
        GM_xmlhttpRequest({
            method:"GET",
            url:'http://' + instance + '.war-facts.com/extras/scan.php?fleet=' + f_id,
            onload:parsePerimeterScan
        });
        
        function parsePerimeterScan(resp) {
            // Clear the loading message
            fleetPosCell.removeChild(fleetPosCell.lastChild);
            fleetPosCell.removeChild(fleetPosCell.lastChild);
            
            var page = resp.responseText;

            // Make sure we see the Position marker in the header and jump to it
            if (page.indexOf('Position') == -1) return false;
            page = page.substring(page.indexOf('Position') + 8);
            page = page.substring(page.indexOf('</tr>') + 5);

            // If there's a Wormhole, it'll always be the first in the list, so check for it first
            if (page.indexOf('Wormhole!') > -1) {
                page = page.substring(page.indexOf('Wormhole!') + 9);
                var wh_coords = page.substring(page.indexOf('maingame>') + 9, page.indexOf(' local'));
                
                var matches = wh_coords.match(/(\-?\d+),\s*(\-?\d+),\s*(\-?\d+)/);
                if (matches) {
                    var url = 'http://' + instance + '.war-facts.com/fleet_navigation.php';
                    url    += '?fleet=' + fleetID + '&mtype=jump&tpos=local';
                    url    += '&x=' + matches[1] + '&y=' + matches[2] + '&z=' + matches[3];
                    
                    fleetPosCell.appendChild(document.createElement('br'));
                    
                    var linkie = document.createElement('a');
                    linkie.setAttribute('href',url);
                    linkie.appendChild(document.createTextNode('Wormhole!'));
                    fleetPosCell.appendChild(linkie);
                }
                
                page = page.substring(page.indexOf('</tr>') + 5);
            }
            
            // Start looping through the rest of the rows of the table
            var ships = {
                'friends'  : { 'ships' : 0, 'tons' : 0 },
                'neutrals' : { 'ships' : 0, 'tons' : 0 },
                'enemies'  : { 'ships' : 0, 'tons' : 0 }
            };
            
            while (page.indexOf('<tr>') > -1) {
                var shipPtr;
                var thisRow = page.substring(page.indexOf('<tr>') + 3, page.indexOf('</tr>'));
                
                // Make sure we're not on the last row and not looking at ourself
                if (thisRow.indexOf('<strong>Total</strong>') == -1 &&
                    thisRow.indexOf('>Self<') == -1) {
                    // First, figure out what our relationship is to this fleet
                    var fleetName = thisRow.substring(thisRow.indexOf('maingame>' + 9), thisRow.indexOf('</a>'));
                    var matches   = fleetName.match(/font class=(\w+)>/);
                    
                    if (matches) {
                        shipPtr = (matches[1] == 'friend') ? ships['friends'] : ships['enemies'];
                    }
                    else {
                        shipPtr = ships['neutrals'];
                    }
                    
                    // Now, count up the number of ships
                    thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
                    thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
	//commented out to get the correct data for ships and tonnage   thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);		
                    
                    var shipCount   = thisRow.substring(thisRow.indexOf('>') + 1, thisRow.indexOf('</td>'));
					// changed to parseFloat by guardian
                    shipPtr['ships'] += parseFloat(shipCount);
                    
                    // ...then their tonnage
					
                    thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
                    
                    var shipTons   = thisRow.substring(thisRow.indexOf('>') + 1, thisRow.indexOf('</td>'));
					// changed to parseFloat by guardian
                    shipPtr['tons'] += parseFloat(shipTons);
                }

                page = page.substring(page.indexOf('</tr>') + 5);
            }
            
            // Now that we've tallied up the ship count, add any warnings to the page
            if (ships['friends']) {
                var shipPtr   = ships['friends'];
                var shipCount = shipPtr['ships'];
                var shipTons  = shipPtr['tons'];
                
                if (shipCount) {
                    fleetPosCell.appendChild(document.createElement('br'));
                    
                    var strongTitle = document.createElement('strong');
                    var fontTitle   = document.createElement('font');
                    fontTitle.setAttribute('class','friend');
                    fontTitle.appendChild(document.createTextNode('Friends:'));
                    strongTitle.appendChild(fontTitle);
                    fleetPosCell.appendChild(strongTitle);
       
					shipTons = shipTons.toFixed(1);
                    var shipText = ' ' + shipCount + ' ships (' + shipTons + ' tons)';
                    fleetPosCell.appendChild(document.createTextNode(shipText));
                }
            }
            
            if (ships['neutrals']) {
                var shipPtr   = ships['neutrals'];
                var shipCount = shipPtr['ships'];
                var shipTons  = shipPtr['tons'];
                
                if (shipCount) {
                    fleetPosCell.appendChild(document.createElement('br'));
                    
                    var strongTitle = document.createElement('strong');
                    strongTitle.appendChild(document.createTextNode('Neutrals:'));
                    fleetPosCell.appendChild(strongTitle);
                    
					shipTons = shipTons.toFixed(1);
                    var shipText = ' ' + shipCount  + ' ships (' + shipTons + ' tons)';
                    fleetPosCell.appendChild(document.createTextNode(shipText));
                }
            }
            
            if (ships['enemies']) {
                var shipPtr   = ships['enemies'];
                var shipCount = shipPtr['ships'];
                var shipTons  = shipPtr['tons'];
                
                if (shipCount) {
                    fleetPosCell.appendChild(document.createElement('br'));
                    
                    var strongTitle = document.createElement('strong');
                    var fontTitle   = document.createElement('font');
                    fontTitle.setAttribute('class','enemy');
                    fontTitle.appendChild(document.createTextNode('Enemies:'));
                    strongTitle.appendChild(fontTitle);
                    fleetPosCell.appendChild(strongTitle);
                    
					shipTons = shipTons.toFixed(1);
                    var shipText = ' ' + shipCount + ' ships (' + shipTons + ' tons)';
                    fleetPosCell.appendChild(document.createTextNode(shipText));
                }
            }
        }
    }
    
    getPerimeterScan(fleetID);
}

window.addEventListener('load',window.loadAutoPerimScan,false);
