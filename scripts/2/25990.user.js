// ==UserScript==
// @name           UD Event Saver
// @namespace      -
// @description    To save last 'x' events in Urban Dead
// @include        http://*urbandead.com/map.cgi*
// ==/UserScript==

// Global variables
var gDate = new Date();
var gMaltonTime = window.document.lastModified;

gDate.setDate(parseInt(gMaltonTime.substring(0,2)));
gDate.setMonth(parseInt(gMaltonTime.substring(3,5)));
gDate.setFullYear(parseInt(gMaltonTime.substring(6,10)));
gDate.setHours(parseInt(gMaltonTime.substring(11,13)));
gDate.setMinutes(parseInt(gMaltonTime.substring(14,16)));
gDate.setSeconds(parseInt(gMaltonTime.substring(17)));

var gMilliSecs = Math.floor( gDate.getTime() / 1000) * 1000;
var gUDID = getUDID();
var gCoords = getCoords();
var noEvents = GM_getValue(gUDID + '|pref', 5);
var showEvents = GM_getValue(gUDID + '|show', true);
var movedEvents = 0;
var parsedEvents = new Array();
var oldEvents = new Array();

function divAdd(txt,id) {
	var div = document.createElement('div');
	div.innerHTML = txt;
	div.id = id;
	div.style.textAlign = 'center';
	//div.style.fontWeight = 'bold';
	div.style.display = 'block';
	document.body.insertBefore(div,document.body.firstChild);
}

function parseEvents() {
	var query = "//td[@class='gp']/ul";
	var ul = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	
	// if GM_getValue(key, defaultValue) exist and < noEvents, then pointerKey add
	var pointerKey = 0;
	movedEvents = 0;
	var pointerEvent = ul.childNodes.length - noEvents;
	// while (var i = 0; i < ul.childNodes.length; i++) {
	while (pointerKey < noEvents) {
	    if(pointerEvent > -1) {
    		var li = ul.childNodes[pointerEvent];
    		var liClass = li.className;
    		
    		// <i class="ls">(35 minutes ago)</i>
    		event = li.innerHTML;
    		
    		// Remove UDwidget addCOntact or removeContact
    		var sup1 = event.indexOf('\<sup\>');
    		var sup2 = event.indexOf('\<\/sup\>');
    		if((sup1 != -1) &&(sup2 != -1)) {
    		    event = event.substring(0,sup1) + event.substring(sup2 + 6);
    		}
    		
    		// Replace coordinates with absolute coordinates
    		//'A flare was fired' 11 blocks to the east and 3 blocks to the north.
    		//'You heard a' loud and distant 'groaning' 4 blocks to the west and 4 blocks to the south.
    		// (\d+) block[s] to the (\w+)
    		if((event.indexOf('A flare was fired') > -1) || (event.indexOf('You heard a') > -1)) {
                if(coordArr = event.match(/(\d+) block[s] to the (\w+)/g)) {
                    var diffX = 0;
                    var diffY = 0;
                    //divAdd('l '+coordArr.length)
            		for (var j = 0; j < coordArr.length; j++) {
            		    var element = coordArr[j].match(/(\d+) block[s] to the (\w+)/);
            		    if(element[2].indexOf("north") > -1) {
            				diffY -= parseInt(element[1]);
            			} else if(element[2].indexOf("east") > -1) {
            				diffX += parseInt(element[1]);
            			} else if(element[2].indexOf("south") > -1) {
            				diffY += parseInt(element[1]);
            			} else if(element[2].indexOf("west") > -1) {
            				diffX -= parseInt(element[1]);
            			}
            		}
            		var newCoords = new Array(gCoords[0] + diffX, gCoords[1] + diffY);
            		//(north|east|south|west)
            		if (event.indexOf('A flare was fired') > -1) {
                        var sub1 = event.indexOf('.');
                        event = 'A flare was fired at (' + newCoords.join(',') + ')' + event.substring(sub1);
                    } else if (event.indexOf('You heard a') > -1) {
                        var sub1 = event.indexOf('groaning');
                        var sub2 = event.indexOf('.');
                        event = event.substring(0, sub1 + 8) + ' at (' + newCoords.join(',') + ')' + event.substring(sub2);
                    }
        		//'You heard a' loud 'groaning' from 'very close by'.
        		//'You heard a' low 'groaning' from 'somewhere nearby'.
            	} else { // no coordinates, 'very close by' or 'from somewhere nearby'
                    var sub1 = event.indexOf('groaning');
                    var sub2 = event.indexOf('.');
                    event = event.substring(0, sub1 + 8) + ' at (' + gCoords.join(',') + ')' + event.substring(sub2);
                }
            }
    		
            var timeStrArr;
            var absTimeArr;
            var pointer = 0;
            // <i class="lsf"> OR <i class="lsfe">
            var pos1 = event.indexOf('<i class=\"ls'+ liClass +'\">',pos1); // 14 chars
            var pos2 = event.indexOf('<\/i>', pos1 + 14); // 4 chars
            
            // Multiple timestamps in 1 action
            while ((pos1 > -1)&&(pos2 > -1)) {
                timeStrArr = event.substring(pos1 + 15 + liClass.length, pos2 - 1);
                
                var d = new Date(); 
                d.setTime(gMilliSecs - timeStrToMilliSec(timeStrArr));
                
                var dateFormat = d.toGMTString(); // 'Sun, 20 Apr 2008 12:40:43 GMT'
                absTimeArr = dateFormat.substring(5,25); // '20 Apr 2008 12:40:43'
                
                // Replace timestamp to absolute timestamp
                event = event.substring(0,pos1 + 15 + liClass.length) + absTimeArr + event.substring(pos2 - 1);
                
                // Replace timestamp class to 'lsfe'
                //event.replace(/\s/g, '_');
                if(liClass != 'fe') {
                    var ls = event.indexOf('\"ls\"',pos1);
                    event = event.substring(0,ls) + '\"lsfe\"' + event.substring(ls+4);
                }
                
                pointer++;
                pos1 += 14 + liClass.length;
                pos2 += 4;
                pos1 = event.indexOf('<i class=\"ls'+ liClass +'\">', pos1); // 14 chars
                pos2 = event.indexOf('<\/i>', pos1 + 14); // 4 chars
            }
            
    		//divAdd('<span style="color: #0000ff">('+pointerKey+','+pointerEvent+')</span> ['+event+']-<span style="color: #9999ff">');
    		
    		GM_setValue(gUDID + '|' +pointerKey, event);
    		parsedEvents[pointerKey] = event;
		} else {
            movedEvents++; // No of old events to be moved
        }
		
		pointerKey++;
		pointerEvent++;
	}
	//divAdd('movedEvents: '+ movedEvents);
}

function timeStrToMilliSec(strTime) {
    // <i class="ls">(21 hours and 31 minutes ago)</i>
    // (exactly 9 hours ago)  (7 hours and 34 minutes ago) (1 hour and 35 minutes ago) (3 hours and 1 minute ago)
    // (1 minute ago)  (12 minutes ago)
    // (1 second ago)  (18 seconds ago)
    
	var eventTime = 0;
	if(timeArr = strTime.match(/(\d+) (\w+)/g)) {
		for (var j = 0; j < timeArr.length; j++) {
			var element = timeArr[j].match(/(\d+) (\w+)/);
			var multiplier = 1000;
			if(element[2].indexOf("day") > -1) {
				multiplier = 86400000;
			} else if(element[2].indexOf("hour") > -1) {
				multiplier = 3600000;
			} else if(element[2].indexOf("minute") > -1) {
				multiplier = 60000;
			}
			eventTime += multiplier * element[1];
		}
	} else if(strTime.indexOf("yesterday") > -1) {
		eventTime += 86400000;
	}
	return eventTime;
}

function mainMethod() {
	var query = "//td[@class='gp']/p/b"; // 'Since your last turn:'
	var pb = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// Get saved events
	for(var i=0; i<noEvents; i++) {
        oldEvents[i] = GM_getValue(gUDID + '|' +i, "");
    }
	
	var eventFound = false;
	var i = 0;
	while ((i < pb.snapshotLength) && (!eventFound)) {
	    if (pb.snapshotItem(i).innerHTML.indexOf('Since your last turn:') > -1) {
            eventFound = true;
            
            // save last 'x' events
		    parseEvents();
		    
		    // Move old events
		    if(movedEvents > 0) {
                for(var j=0; j<movedEvents; j++) {
                    parsedEvents[j] = oldEvents[noEvents-movedEvents+j];
                }
            }
            
            // Persist events
            for(var j=0; j<noEvents; j++) {
                GM_setValue(gUDID + '|' +j, parsedEvents[j]);
            }
        }
        i++;
	}
	
	if (!eventFound && showEvents) {
	    //divAdd('Empty!');
	    
	    // Find position to add
        query = "//td[@class='gp']/p";
	    pb = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    var anchorElement;
	    i = 0;
	    var anchorFound = false;
	    while ((i < pb.snapshotLength) && (!anchorFound)) {
            if (pb.snapshotItem(i).innerHTML.indexOf('Possible actions:') > -1) {
                anchorElement = pb.snapshotItem(i);
                anchorFound = true;
            }
            i++;
        }
	    
        // Create 'Since your last turn'
        var p = document.createElement('p');
        p.className = 'fe';
        p.innerHTML = '<b>Past events:</b>';
        var ul = document.createElement('ul');
        var li;
        eventFound = false;
        for (i=0; i < noEvents; i++) {
            li = document.createElement('li');
            li.className = 'fe';
            var event = GM_getValue(gUDID + '|' +i, "");
            if (event != '') {
                li.innerHTML = event;
                //li.innerHTML = 'test event';
                ul.appendChild(li);
                eventFound = true;
            }
        }
        
        // Insert 'p' and 'ul'
        if (eventFound) {
            anchorElement.parentNode.insertBefore(p, anchorElement);
            anchorElement.parentNode.insertBefore(ul, anchorElement);
        }
    }
}

function getCoords() {
	var query = "//input[@type='hidden' and @name='v']";
	var grid = document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	// searches for the top left cell in the map 
	var input = grid.snapshotItem(0);
	if(coords = input.value.match(/^(\d+)-(\d+)$/)) {
		x = parseInt(coords[1]);
		y = parseInt(coords[2]);
		if (grid.snapshotLength == 3) { // 4 corners
			if(x == 98 && y == 98) { x +=1; y += 1; } // bottom-right
			if(x == 0 && y == 98) { y += 1; } // bottom-left
			if(x == 98 && y == 0) { x +=1; } // top-right
			if(x == 0 && y == 1) { y -= 1; } // top-left
		} else if(grid.snapshotLength == 5) { // 4 borders
			if(x == 98 || y == 98) { x +=1; y += 1; } // bottom OR right
			if(y == 0) { x +=1; } // top
			if(x == 0) { y += 1; } // left
		} else { // snapshotLength = 8 -> normal
			x += 1;
			y += 1;
		}
	}
	var out = new Array(x,y);
	
	return out;
}

function getUDID() {
	var query = "//p[@class='gt']";
	var grid = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < grid.snapshotLength; i++) {
		var pText = grid.snapshotItem(i).innerHTML;
		//divAdd(pText);
		if(matches = pText.match(/You are <a href=\"profile\.cgi\?id=([0-9]+)\">/))
			return matches[1];
		else if(matches = pText.match(/<li><a href=\"profile\.cgi\?id=([0-9]+)\">/))
			return matches[1];
	}
	return -1;
	//return 'dummy';
}

function setPref() {
    var userPref = prompt('Please insert new number',noEvents);
    if (!isNaN(userPref)) {
        GM_setValue(gUDID + '|pref', userPref);
        //divAdd(userPref);
    } else {
        alert('Please insert only numbers!');
    }
}

function setShow() {
    var showPref = confirm('Show past events?');
    //divAdd(showPref);
    GM_setValue(gUDID + '|show', showPref);
    showEvents = showPref;
}

window.addEventListener(
    'load', 
    function() {
        GM_registerMenuCommand( "Set no of events", setPref, "", "", "s" );
        GM_registerMenuCommand( "Toggle show past events", setShow, "", "", "t" );
        
    	//divAdd('CurrentTime: '+ gDate.toGMTString(), 'time');
    	
    	//divAdd('CurrentCoords: ' + getCoords().join(','));
    	mainMethod();
	},
    true);