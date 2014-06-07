// ==UserScript==
// @name           Ikariam Generaal helper
// @namespace      ika-ally.co.cc
// @include        http://s*.ikariam.com/index.php?view=embassyGeneralAttacksFromAlly*
// @include        http://s*.ikariam.com/index.php?view=embassyGeneralAttacksToAlly*
// @include        http://s*.ikariam.com/index.php?view=embassyGeneralTroops*

// ==/UserScript==


/**
 *******************************************************
 * CONFIGURATION
 ******************************************************* 
 */ 

// These weights will be matched against the type of event and used for
// sorting the table. Larger values will be displayed before the rest.
// If the two weights are equal, the events will be sorted alphabethically first,
// and then by troops

var weights = {
    "Station troops" : 0,
    "Fleets station" : 1,
    "Pillage (return)": 100,
    "Block port!" : 1000,    
    "Pillage (underway)" : 2000
}

var DEFAULT_WEIGHT = 50; // For events that are not matched.


/**
 *******************************************************
 * END OF CONFIGURATION
 ******************************************************* 
 */ 


/**
 *  Standard comparison function
 **/ 
var stdcmp = function(a,b) {
    if(a == b)
        return 0;
    else if(a < b)
        return -1;
    else if(a > b)
        return 1;
}

/**
 *  Compares types of events (pillage, station troops etc.)
 */ 
var sortByType = function(a,b) {
    var val = stdcmp(b.ikariamWeight,a.ikariamWeight);
    
    if(val == 0) {
        val = stdcmp(a.ikariamName,b.ikariamName);

        if(val == 0) {
            val = stdcmp(b.ikariamTroops,a.ikariamTroops);
        }
    }
    return val;
}


/**
 * Sorts general screen according to type of attack and number of troops
 */ 
var attackScreen = function() {

	var url = new String(document.location);

    // Extract main table
    var xpathTable = document.evaluate('//table[@class="table01"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if(!xpathTable.snapshotLength)
        return;

    // Extract rows in table    
    var table = xpathTable.snapshotItem(0);
    var xpathRows = document.evaluate('//tr[@class="rowRanks"]', table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if(!xpathRows.snapshotLength)
        return;

    var rows = [];
    
    var parentNode = xpathRows.snapshotItem(0).parentNode;
    
    // Extracts event information and assigns weights. Original rows are removed
    // from table so that they can be replaced later in sorted order
    
    for(var i=0; i<xpathRows.snapshotLength; i++) {
        var tr = xpathRows.snapshotItem(i);
        parentNode.removeChild(tr);
        
        // Extract type of event (Station troops, pillage etc.)
        var xpathTd = document.evaluate('//td[2]', tr, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var eventName = xpathTd.snapshotItem(0).innerHTML.replace(/^\s*|\s$/g,'');                         
        
        // Extract number of troops
        xpathTd = document.evaluate('//td[3]', tr, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var eventTroops = xpathTd.snapshotItem(0).innerHTML.replace(/^\s*|\s$/g,'');
        
    
        // Sets internal variables used by sorting function.
        
        tr.ikariamName = eventName;
        tr.ikariamTroops = eventTroops != '' ? parseInt(eventTroops) : 0;

        if(eventName in weights)
            tr.ikariamWeight = weights[eventName];
        else
            tr.ikariamWeight = DEFAULT_WEIGHT;
			
		if(url.indexOf('embassyGeneralAttacksFromAlly') != -1 && eventTroops != '1') {
				rows.push(tr);
		}
		else if(url.indexOf('embassyGeneralAttacksToAlly') != -1) {
			rows.push(tr);
		}
    }

    // Sort rows and add them back to table
    
    rows.sort(sortByType);
    for(var i in rows) {
        var row = rows[i];
        parentNode.appendChild(row);
    }

}

/**
 *  Generates a summary of all troops in the alliance
 */ 
var troopsScreen = function() {
    // Extract main table
    var xpathDescription = document.evaluate('//div[@class="buildingDescription"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(!xpathDescription.snapshotLength)
        return;
            
    var descBox = xpathDescription.snapshotItem(0);

    var tables = document.getElementsByTagName("table");

    var troops = {};
        
    for(var idx in tables) {
        var table = tables[idx];
        var xpathTr = document.evaluate('.//tr', table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(xpathTr.snapshotLength == 0)
            continue;
        
        var names = [];

        var header = xpathTr.snapshotItem(0);
        
        var xpathTh = document.evaluate('.//th', header, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(xpathTh.snapshotLength == 0)
            continue;        
        
        for(var i=0; i<xpathTh.snapshotLength; i++) {
            var th = xpathTh.snapshotItem(i);
            names.push(new String(th.getAttribute("title")));        
        }

        for(var tr_idx=1; tr_idx < xpathTr.snapshotLength; tr_idx++) {
            var tr = xpathTr.snapshotItem(tr_idx);
            var xpathTd = document.evaluate('.//td', tr, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
            if(xpathTd.snapshotLength == 0)
                continue;        
            
            for(var i=1; i<xpathTd.snapshotLength; i++) {
                var td = xpathTd.snapshotItem(i);
                var name = names[i];
                var value = new String(td.innerHTML).replace(/\D/g,'');
                var count = 0;
                
                if(value != '')
                    count = parseInt(value);

                if (name in troops)
                    troops[name] += count;
                else
                    troops[name] = count;
   
            }
        }
    }
    

    var i = 0;
    var html = '<table>';
    for(name in troops) {
        if(i== 3) {
            i = 0;
            html += '</tr>';
        }
        html += '<td><b>' + name + '</b></td><td title="'+name+'">' + troops[name] + '</td>';
        i++;
    }
    while(3 - i) {
        html += '<td>&nbsp;</td><td>&nbsp;</td>';
        i++;
    }
    html += '</table>';
    
    descBox.innerHTML += html;
    
}

/**
 *   Script starts execution here
 */ 
window.addEventListener('load', function() {  
    var url = new String(document.location);
    
    if(url.search(/embassyGeneralAttacks(From|To)Ally/) > 0) {
        attackScreen();
    }
    else if(url.indexOf('embassyGeneralTroops') != -1) {
        troopsScreen();        
    }
},false);