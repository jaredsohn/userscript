// ==UserScript==
// @name           UDBrainMap
// @namespace      -
// @description    View UDBrain data in Red Rum map
// @include        http://redrum.soul-fantasy.net/map.php?*suburb*
// @include        http://redrum.soul-fantasy.net/map.php?*splitsub*
// @include        http://redrum.soul-fantasy.net/map.php?*menu*
// ==/UserScript==

/* Date				Version		Description
 * ----------		-----		----------------------
 * 2008-02-12		v1.00		Initial creation.
 * 2008-02-13		v1.01		- Script works for split suburb view.
 *								- Added function to add data based on suburb
 *								  (doesn't work for split suburb view yet)
 *								- Added data (zombies inside&outside with age)
 * 2008-02-14		v1.02		- Data for non-building blocks (zombies)
 *								- Added 'Loading' screen
 * 2008-02-21		v1.03		Compatible with UDBrain v0.203 barricade data
 * 2008-02-22		v1.04		- Tweaked the 'Loading' screen
 * 								- Easier to differentiate new&old reports
 * 								- Removed zombie data temporarily 
 * 2008-02-25		v1.05		- 'Loading' screen worked for split view
 * 								- Re-added zombie numbers
 * 2008-02-26		v1.06		Script works for 'menu' page 
 */

//******************************************************************************
//* Global variables & Contants
//******************************************************************************
var buildingBackgroundColor = '#001100';
var borderOld = '2px solid #aaaaaa'; // inset outset ridge
var borderNew = '3px double #ffffff';
var zedColor = '#00cc00';
var zedBorderOld = '2px solid #008800';
var zedBorderNew = '3px double ' +zedColor;
var ONEDAY = 86400;

//******************************************************************************
//* Helper functions
//******************************************************************************
function dec2hex(d) {return d.toString(16);}
function divAdd(txt) {
	var div = document.createElement('div');
	div.innerHTML = txt;
	div.style.textAlign = 'center';
	div.style.fontWeight = 'bold';
	document.body.insertBefore(div,document.body.firstChild);
}
function convertCadeLevelToShort(cl) {
	if(cl == 1) return "Opn";
	if(cl == 2) return "Cls";
	if(cl == 3) return "LoB";
	if(cl == 4) return "LiB";
	if(cl == 5) return "QSB";
	if(cl == 6) return "VSB";
	if(cl == 7) return "HeB";
	if(cl == 8) return "VHB";
	if(cl == 9) return "EHB";
}
function convertAge(num) {
	var str = num+" second";
	if(num/90 > 1) {
		num = parseInt(num/60+.5);
		str = num+" minute";
		if(num/90 > 1) {
			num = parseInt(num/60+.5);
			str = num+" hour";
			if(num/36 > 1) {
				num = parseInt(num/24+.5);
				str = num+" day";
			}
		}
	}
	if(num>1) str += "s";
	return str;
}
function convertCadeLevelToColor(cl) {
	if(cl == 1) return "#dd0000";
	if(cl == 2) return "#ff0000";
	if(cl == 3) return "#ff3300";
	if(cl == 4) return "#ff6600";
	if(cl == 5) return "#ffcc00";
	if(cl == 6) return "#ffff00";
	if(cl == 7) return "#aaff00";
	if(cl == 8) return "#55ff00";
	if(cl == 9) return "#00ff00";
//     var r = dec2hex(15-(cl*2)); // Red
//     var g = dec2hex(1+(cl*2)); // Green
//     var color = "#"+r+r+g+g+"00"; // R G B
//     return color;
}
function convertCoordsToBXY(coords) {
	return parseInt(parseInt(coords[0])*100)+parseInt(coords[1]);
}
function convertBXYToCoords(bxy) {
	return [ parseInt(bxy / 100), bxy % 100 ];
}
function setLoadingDiv() {
	var loadDivTxt = '<div id="loadDiv" style="' +
		'display: none; ' +
        'opacity: .75; filter: alpha(opacity=75); z-index:100; ' +
        'position: absolute; top: 0px; left: 0px; ' +
        'width: 100%; height: 100%; ' +
        'font-size: 32pt; font-weight: bold; font-family: arial, sans-serif; color: #ffffff; background-color: #000000; ' +
        '"><div style="opacity: 1; filter: alpha(opacity=100); margin: 50px 50px;">Loading data<span style="text-decoration: blink">_</span></div></div>';
    var query = '/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td';
    var map_td = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
	map_td.innerHTML = '<div style="position: relative">'+ loadDivTxt + map_td.innerHTML+ '</div>';
}
function showLoadDiv(str) {
	var loadDiv = document.getElementById("loadDiv");
	loadDiv.innerHTML = '<div style="opacity: 1; filter: alpha(opacity=100); margin: 50px 50px;">Loading '+str+'data<span style="text-decoration: blink">_</span></div>';
	loadDiv.style.display = 'inline';
}
function removeLoadDiv() {
	var loadDiv = document.getElementById("loadDiv");
	loadDiv.style.display = 'none';
}
//******************************************************************************
//* Main functions
//******************************************************************************

/**
* Insert data to each divs
* 
*  0   1   2        3         4      5   6       7
* bxy:age:dataType:dataValue:zInAge:zIn:zOutAge:zOut
**/
function insertData(response) {
    var info = response.split(':');
    
    // Coordinate wrong OR no data for that block
    if((info[0]>9999||info[0]<0)||(info[1]<0))
		return -1;
	
	var isBuilding = true;
	var div = document.getElementById(info[0]+'-b');
	if(div == null) {
        div = document.getElementById(info[0]);
        isBuilding = false;
    }
    
	var blockBorder;
    var bDiv = '';
	if(isBuilding) {
        if(info[1]<=ONEDAY) { blockBorder = borderNew; }
        	else { blockBorder = borderOld; }
	    bDiv = '<span title="' +convertAge(info[1])+ '" '+
            'style="color: '+convertCadeLevelToColor(info[3])+ '; '+
            'padding: 0px 1px; border: ' +blockBorder+ '; '+
            'background-color: ' +buildingBackgroundColor+ '; '+
    	    '"><b>' +convertCadeLevelToShort(info[3])+ '</b></span>';
	    if((info[4]!=-1)&&(info[5]>0)) { // Zombies inside
	    	if(info[4]<=ONEDAY) { blockBorder = borderNew; }
        		else { blockBorder = borderOld; }
            bDiv += '&nbsp;<span title="' +convertAge(info[4])+ '" '+
                'style="color: #ffffff; padding: 0px 1px; border: ' +blockBorder+ '; '+
            	'background-color: ' +buildingBackgroundColor+ '; '+
        	    '">I:<b>' +info[5]+ '</b></span>';
	    }
	    if((info[6]!=-1)&&(info[7]>0)) { // Zombies outside
	    	if(info[6]<=ONEDAY) { blockBorder = borderNew; }
        		else { blockBorder = borderOld; }
            bDiv += '&nbsp;<span title="' +convertAge(info[6])+ '" '+
                'style="color: #ffffff; padding: 0px 1px; border: ' +blockBorder+ '; '+
            	'background-color: ' +buildingBackgroundColor+ '; '+
        	    '">O:<b>' +info[7]+ '</b></span>';
	    }
	} else if((info[6]!=-1)&&(info[7]>0)) { // Zombies outside
    	if(info[6]<=ONEDAY) { blockBorder = zedBorderNew; }
    		else { blockBorder = zedBorderOld; }
        bDiv = '<span title="'+convertAge(info[6])+ '" '+
            'style="color: #00ff00; padding: 0px 2px; border: ' +blockBorder+ '; '+
            'background-color: ' +buildingBackgroundColor+ '; '+
    	    '"><b>' +info[7]+ '</b></span>';
    }
    div.innerHTML = bDiv;
    return 1;
}

/**
* Get UDBrain data in text response
* 
* v0.203|9000:891238:1:1|9200:853521:1:1|9300:496211:1:1
**/
function getData(query) {
	//divAdd(query);
    showLoadDiv('UDBrain ');
    
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.alloscomp.com/udbrain/api2.php?'+query,
		onload: function(xhr) {
			removeLoadDiv();
			
			//divAdd(xhr.responseText);
			if(xhr.responseText.match(/Error:/))
				alert(xhr.responseText);
			
			var arr = xhr.responseText.split('|');
			for(var i=1; i < arr.length; i++) {
				insertData(arr[i] +':-1:-1:-1:-1');
			}
		}
	});
}

/**
* Get coordinates and create empty divs for data
* 
* return: a string of coordinates, joined by '&'
**/
function getCoordinates() {
    var query = "//table//table//table//td";
    var blocks = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var coordinates = '';
    for (var i = 0; i < blocks.snapshotLength; i++) {
        var currentBlock = blocks.snapshotItem(i);
        var content = currentBlock.innerHTML;
        if (coords = content.match(/^\D*(\d+),\s(\d+)\D*$/)) {
        
    		var divId = convertCoordsToBXY([ parseInt(coords[1]), parseInt(coords[2]) ]);
    		coordinates += divId + '&';
    		
    		// How about 'training_ground' and 'exercise_yard'? Both uses the same class 'fort'
    		// Non Free-running: carpark cemetary monument park street wasteland zoo
    		if((currentBlock.className!='carpark')&&(currentBlock.className!='cemetary')&&
				(currentBlock.className!='monument')&&(currentBlock.className!='park')&&
				(currentBlock.className!='street')&&(currentBlock.className!='wasteland')&&
				(currentBlock.className!='zoo')) { divId += '-b' }
				
    		// Place a new div to contain all info from UDBrain
    		currentBlock.innerHTML = content + '<br/><div id="'+ divId +'" style="align: center; padding: 0px;"/>';
				//'style="color: #ffffff; background-color: '+ buildingBackgroundColor +'; margin: 1px;"/>';
        }
    }
    //divAdd(coordinates);
    
    if(coordinates == -1) return -1;
    
    return coordinates;
}

//******************************************************************************
//* XML Part
//******************************************************************************

/**
* Get UDBrain data in XML
**/
function getDataXML(suburbsArr) {
	var loadStr = '';
	for(var i=0; i < suburbsArr.length; i++) {
		loadStr += suburbsArr[i]+' ';
	}
	showLoadDiv('UDBrain ');
	var loaded = 0;
	for(var i=0; i < suburbsArr.length; i++) {
		
		var suburbQuery = suburbsArr[i].replace(/\s/g,'+');
	    query = 'suburb=' + suburbQuery;
	    //divAdd(query);
	    
	    GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.alloscomp.com/udbrain/dump.xml?'+query,
			onload: function(xhr) {
			
	            var parser = new DOMParser();
	            var responseXML = parser.parseFromString(xhr.responseText, "text/xml");
	            //divAdd(responseXML.getElementsByTagName("name")[0].textContent);
	            var blocks = responseXML.getElementsByTagName("building");
	            
	            for(var j=0; j < blocks.length; j++) {
	                var block = blocks[j];
	                // Main: name, suburb id, suburb name, age?
	                var bxy = block.getElementsByTagName("bxy")[0].textContent;
	                var reports = block.getElementsByTagName("report");
	                var bAge, bLvl;
					var zOut = -1;	var zOutAge = -1;
					var zIn = -1;	var zInAge = -1;
	                
	                for(var k=0; k < reports.length; k++) {
	                	var type = reports[k].getElementsByTagName("type")[0].textContent;
						if(type == 1) { // Barricade
			                bAge = reports[k].getElementsByTagName("age")[0].textContent;
			                bLvl = reports[k].getElementsByTagName("value")[0].textContent;
		                } else if(type == 2) { // Zombies outside
			                zOutAge = reports[k].getElementsByTagName("age")[0].textContent;
			                zOut = reports[k].getElementsByTagName("value")[0].textContent;
		                } else if(type == 3) { // Zombies inside
			                zInAge = reports[k].getElementsByTagName("age")[0].textContent;
			                zIn = reports[k].getElementsByTagName("value")[0].textContent;
		                } // another report type?
					}
					insertData(bxy +':'+ bAge +':1:'+ bLvl +':'+ zInAge +':'+ zIn +':'+ zOutAge +':'+ zOut);
				}
				loaded++;
				if(loaded >= suburbsArr.length) { removeLoadDiv(); }
			}
		});
	}
}

/**
* Get suburb(s) names from the header
* 
* return: array of 'suburb name'
**/
function getSuburbs() {
	var query = "//td[@class='header']";
	var header = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var suburbStr = header.innerHTML.toLowerCase();
	
	var suburbNamesArr = new Array();
	
	if(suburbTxt = suburbStr.match(/^the suburb of (.+)$/)) { // 1 suburb
		suburbNamesArr[0] = suburbTxt[1];
	} else if (suburbTxt = suburbStr.match(/^the suburbs of (.+)$/)) { // splitsub view
		// split from </a>
		var splitSuburb = suburbTxt[1].split('/a');
		for (var i=0; i<splitSuburb.length-1; i++) {
			suburbNamesArr[i] = splitSuburb[i].match(/\"\>(.+)\</)[1]; // /[\don]\"\>(.+)\</
		}
	} else return -1;
	
	getCoordinates(); // put in the div in all blocks
	
	return suburbNamesArr;
}

//******************************************************************************
//* Main program - will be run after the page is loaded
//******************************************************************************

window.addEventListener(
    'load', 
    function() {
    	setLoadingDiv();
		//divAdd(getCoordinates());
		
		// document.URL
		
		// Get data using coordinates
		// var coords = getCoordinates();
		// if(coords != -1) { getData(coords); }
		
		// Get data using suburb(s)
		var suburbNames = getSuburbs();
		if(suburbNames != -1) { getDataXML(suburbNames); }
		
		//divAdd('['+getSuburbs().join('_')+']');
	},
    true);