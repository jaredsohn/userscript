// ==UserScript==
// @name           TribalWars v7
// @include        http://nl21.tribalwars.nl/*


// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    url: http://userscripts.org/scripts/show/94620
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

var DEBUG = true;

// The distribution is: 1.Soldiers, 2.Cavalry, 3.Siege, 4.Buildings
var distribution = [25, 25, 25, 25];
var recruitUnitsDef = [4000, 8000, 0, 4000, 1000, 0, 0, 289, 0, 100];
var recruitUnitsOff = [0, 0, 7500, 0, 50, 2483, 300, 0, 300, 0];

var buildingNames=

['Hoofdgebouw','Kazerne','Stal','Werkplaats','Adelshoeve','Verzamelplaats','Marktplaats'];
var buildingLinks=['main','barracks','stable','garage','snob','place','market'];

var otherLinks = ['Recr Att', 'Recr Def','cavalry','Store resources','Attack richest village','Scout 

for farms',''];
var otherFuncs = ['recruit.defensive', 

'recruit.offensive','calculateArmy','storeVillageResources','selectVillageWithMoreReseources','scout

ForFarms',''];


costs=[
    [50,30,10,1],
    [30,30,70,1],
    [60,30,40,1],
    [100,30,60,1],
    [50,50,20,2],
    [125,100,250,4],
    [250,100,150,5],
    [200,150,600,6],
    [300,200,200,5],
    [320,400,100,8]
];

var expirationPeriod = 1*60*60*1000; // 1 hour

function $xf(xpath, xpt, startnode, aDoc) {if (!aDoc) aDoc = document; if (!startnode) startnode = 

document; var xpres = XPFirst; switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = 

XPList; break; case 'r': xpres = XPResult; break;}; var ret = aDoc.evaluate(xpath, startnode, null, 

xpres, null); return (xpres == XPFirst ? ret.singleNodeValue : ret);};

function getValue(node) {
    if (node != null && node != undefined)
       return node.firstChild.nodeValue;
    else
       return "";
}

function debug(str) {
    if (DEBUG) {
		console.log(str);
    }
}

function getDocument() {
	var doc=document;
	if (window.frames.length>1)
		doc = window.main.document;
	return doc;
}

function _setValue(key, value) {
	setTimeout(function() {
		GM_setValue(key, value);
	}, 0);
}

function getCurrentVillage() {
    
   	doc = getDocument();
    url=doc.URL;
   
    oldNavTable=doc.body.getElementsByTagName("table")[2];
    village = url.match(/village=(\d+)&/);
    if (village!=null)
       village=village[1];
    return village;
}

function createVillageFrame() {
	if (window.top.frames[1]) {
		adDoc = window.top.frames[1].document;
		body = adDoc.getElementsByTagName("body")[0];
		$(body).children().remove();
		getVillages();
		villageLinks = _getValue("overview_villages");
		ht = $(window).height();
		var html = "<div id=\"scrollable\" style=\"overflow:auto;height:" + ht + "px;\">\n";
		html += "<table border=\"0\">\n";
		html += "<tr><th>Villages</th><tr>\n";
		url = document.URL;
		screens = url.match(/screen=(.*)/);
		if (screens!=null)
			screens=screens[1];
		debug("villageLinks:" + villageLinks);
		villages = villageLinks.split('%05');
		villages.shift();
		villages.pop();
		for (var i = 0; i < villages.length; i++) {
			link = villages[i].replace(/screen=(.*)"/, "screen=" + screens + '"');
			link = link.replace(/<a href=/, "<a target=\"main\" href=");
			html += "<tr><td>" + link + "</td><tr>\n";
		}
		html += "</table>\n";
		html += "</div>\n";
		$(html).appendTo(body);
	}
}

function getVillages() {
	setTimeout(function() {
		var villageLinks = GM_getValue("overview_villages");
		debug("villageLinks1:" + villageLinks);
		if (villageLinks == undefined) {
			doRequest();
		} else {
			villageLinks = villageLinks.split('%05');
			lastSavedTime = villageLinks.shift();
			villageLinks.pop();
			now = new Date().getTime();
			debug("diff:" + (now - lastSavedTime));
			if ( now - lastSavedTime > expirationPeriod || villageLinks.length == 0) {
				doRequest();
			}
		}
	},0);
}


function doRequest() {
    $.ajax({
    type: "GET",
  url: "game.php",
  data: "screen=overview_villages",
  success: function(data) {
          villageLinks = "";
         url = document.URL;
          screens = url.match(/screen=(\w+)&?/);
          if (screens!=null)
           screens=screens[1];

          pattern = "<a href=\"/game\\.php\\?village=(\\d+)&amp;screen=overview\">\n.*<span id=\".*

\">(.*)</span>\\s*</a>";
         myregexp = new RegExp(pattern, "g");
         while ( (mymatch = myregexp.exec(data)) != null) {
              link = mymatch[0].replace(/screen=overview/, "screen=" + screens);
              villageLinks += link;
              villageLinks += '%05';
          }
           debug("villageLinks:" + villageLinks);
           setTimeout(function() {
               // save the timestamp in order to calculate if the data have expired
               villageLinks = new Date().getTime() + '%05' + villageLinks;
             _setValue("overview_villages", villageLinks);
           }, 0);
    }
    });
}

function arrayMin(array){
    var value=array[0];
    for (var t=1;t<array.length;t++){
       if (array[t]<value){
           value=array[t];
       }
    }
    return value;
}

function linearDivideArray(array1, array2){
    var value=[];
    if (array1.length==array2.length){
       for (var t=0;t<array1.length;t++){
           if (array2[t]!=0){
               value[t]=array1[t]*1.0/array2[t];
           }
           else{
               value[t]=0;
           }
       }
    }
    return value;
}

var recruit = function (mode) {
    sum = 0;
    for (i=0; i < distribution.length; i++ ) {
       sum += distribution[i];
    }
    if (sum != 100) {
       alert("The distribution must be in percentage and the sum must be 100%.\n Distribution is: " 

+ distribution);
       return;
    }
    var recruitUnits;
   
    switch (mode) {
       case 'offensive':
           recruitUnits = recruitUnitsOff;
           break;
       case 'defensive':
           recruitUnits = recruitUnitsDef;
           break;
    }
   
    var doc=getDocument();

    url=doc.URL;
   
    if (url.indexOf('barracks') > -1)
       recruitGeneral(recruitUnits, 0, 4, distribution[0]);
    else if (url.indexOf('stable') > -1)
       recruitGeneral(recruitUnits, 4, 8, distribution[1]);
    else if (url.indexOf('garage') > -1)
       recruitGeneral(recruitUnits, 8, 10, distribution[2]);
}

function recruitGeneral(units, lowBound, hiBound, distribution) {
    wood = getValue($xf("//span[@id='wood']"));
    stone = getValue($xf("//span[@id='stone']"));
    iron = getValue($xf("//span[@id='iron']"));
    popCurrent = getValue($xf("//span[@id='pop_current']"));
    popMax = getValue($xf("//span[@id='pop_max']"));
   
    var total_costs;
   
    /*if (popMax == 24000) {
       // don't consider the population cost
       availResources = [wood * (distribution/100), stone * (distribution/100), iron * 

(distribution/100)];
       total_costs=[0,0,0];
    } else {*/
       //consider the population cost
       availResources = [wood * (distribution/100), stone * (distribution/100), iron * 

(distribution/100), (popMax - popCurrent) * (distribution/100)];
       total_costs=[0,0,0,0];
    //}

    currentUnits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var row = 2;
    // barracks units
    for (i=lowBound;i<hiBound;i++){
       currentUnits[i] = getCurrentUnit("//table[@class='vis']//tr[" + row + "]//td[7]");
       row++;
    }
    queueUnits = getQueue();
    var remainingUnits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var len = 4;//(popMax == 24000)?3:4;
    for (i=lowBound;i<hiBound;i++){
       remainingUnits[i]=units[i]-(queueUnits[i]+currentUnits[i]);
       if (remainingUnits[i]<0){
           remainingUnits[i]=0;
       }
       for (var j=0;j<len;j++){
           total_costs[j]+=costs[i][j]*remainingUnits[i];
       }
    }
    debug("remainingUnits: " +remainingUnits);
    debug("total_costs: " +total_costs);
   
    var factor=arrayMin(linearDivideArray(availResources,total_costs));
    debug("factor: " + factor);
    if (factor>1.0){
		factor=1.0;
    }
    row = 2;
    for (i=lowBound;i<hiBound;i++){
		var number=remainingUnits[i]*factor;
		if (number<0){
			number=0;
		}
       if (number!=0){
           input = $xf("//form//table[@class='vis']//tr[" + row + "]//td[8]//input");
           if (input != null && input != undefined) {
               try{
                   $(input).val(parseInt(number,10))
               }
               catch (e){}
           }
       }
       row++;
    }
    doc.forms[0].submit();
}

function getCurrentUnit(xpathExpr) {
    currentUnit = $xf(xpathExpr, 'r');
	currentUnit = getValue(currentUnit.snapshotItem(0));
    currentUnit = currentUnit.substring(currentUnit.indexOf('/')+1, currentUnit.length);
   
    return parseInt(currentUnit);
}


function getResourcesFromReport() {
	xpathResult=doc.evaluate("//table[@id='attack_spy']//tr[1]//td

[1]",doc,null,XPathResult.STRING_TYPE,null);
	var resources=xpathResult.stringValue.split(" ");
	resources.pop();

	if (resources.length == 3) {
		sumResources=0;
		for(i=0;i<resources.length;i++){
			sumResources+=parseInt(resources[i].replace(/\./,''));
		}
		return sumResources;
	}
	else {
		alert('This script must be run on enspionage report!');
		return -1;
	}
}

var calculateArmy = function () {
	sumResources = getResourcesFromReport();
	calculateResources(sumResources);
}

function calculateResources(sumResources, el) {
	if (sumResources > -1) {
			cav=Math.ceil(sumResources/80);
			hcav=Math.ceil(sumResources/50);
			spear=Math.ceil(sumResources/25);
			sword=Math.ceil(sumResources/15);
			axe=Math.ceil(sumResources/10);
			archers=Math.ceil(sumResources/10);
			if (el != undefined && el != null && el != '' ) {
				var html = cav+' light cavalry needed, '+hcav+' heavy cavalry 

needed, '+spear+' spears needed, '+sword+' swords needed, '+axe+' axes needed, '+archers+' archers 

needed';
				var exactUnits = calculateExactUnitsToSend(sumResources);
				html += "<br/><strong>Exact units to send ["+exactUnits+"]

</strong>";
				$(el).html(html);
				return;
			}
			alert(cav+' light cavalry needed\n'+hcav+' heavy cavalry needed\n'+spear+' 

spears needed\n'+sword+' swords needed\n'+axe+' axes needed\n'+archers+' archers needed\n');
	}
}

function calculateExactUnitsToSend(sumResources) {
	var ret = "";
	// ordered array from higher speed/capacity to lower
	var unitArr = ['light', 'marcher', 'heavy', 'spear', 'axe', 'archer', 'sword'];
	var unitCapacity = new Object();
	unitCapacity['light'] 	= 80;
	unitCapacity['marcher']	= 50;
	unitCapacity['heavy'] 	= 50;
	unitCapacity['spear'] 	= 25;
	unitCapacity['axe'] 	= 10;
	unitCapacity['archer'] 	= 10;
	unitCapacity['sword'] 	= 15;
	
	//get the maximum units present at this time at the village
	
	leftResources = sumResources;
	for(var i in unitArr) {
		var unit = unitArr[i];
		unitElem = $xf("//form[@id='units_form']//table//tr//td//table[@class='vis']//input

[@name='"+unit+"']/following-sibling::a");//, "r").snapshotItem(0);
		unitElem = getValue(unitElem);
		
		maxUnit = unitElem.replace('(', '').replace(')','');
		if (maxUnit > 0) {
			unitsToSend = maxUnit;
			capacity = unitCapacity[unit];
			unitsToSend = Math.ceil(leftResources/capacity);
			if (unitsToSend > maxUnit) {
				// send all the units of this type and continue
				ret += unit + ": " + maxUnit + ", ";
				leftResources = leftResources - (maxUnit * capacity);
			} else {
				// send only the required units and stop;
				ret += unit + ": " + unitsToSend + ", ";
				leftResources = leftResources - (unitsToSend * capacity);
				break;
			}
		}
	}
	ret += "Resources in total left: " + leftResources;
	return ret;
}

storeVillageResources = function () {
	sumResources = getResourcesFromReport();
   
	if (sumResources > 0) {
		targetVillageLink=$xf("//table[@id='attack_info_def']//td[2]//a[1]");
		targetVillageLink=targetVillageLink.href;
		debug("targetVillageLink: " +targetVillageLink);
		targetVillageId=targetVillageLink.match(/id=(\d+)/)[1];
		debug('calling _getValue: 1');
		setTimeout(function() {
			var prevReport = GM_getValue("spyReports");
			prevReport+="&"+targetVillageId+"="+sumResources;
			_setValue("spyReports",prevReport);
		},0);
	}
}

var selectVillageWithMoreReseources = function () {
	setTimeout(function(){
		debug('calling _getValue: 2');
		var report = GM_getValue("spyReports", report);
		debug("report0: " + report);
		var villagesAndResources = deserialize(report, "&", "=");
		maxResources = 0;
		targetVillageId = -1;
		for(villageId in villagesAndResources) {
			if (villageId == undefined) {
				continue;
			}
		 debug("villageId0: " + villageId);
		 resources = parseInt(villagesAndResources[villageId]);
		 if (resources != NaN){
			debug("resources0: " + resources);
			if (maxResources <= resources) {
				maxResources = resources;
				targetVillageId = villageId;
				debug("maxResources: "+maxResources);
				debug("targetVillageId: "+targetVillageId);
			}
		   }
		}
		debug("targetVillageId: " +targetVillageId);
		if (targetVillageId > 0 ) {
			delete villagesAndResources[targetVillageId];
			report = serialize(villagesAndResources,  "&", "=");
			_setValue("spyReports",report);
			debug("report: " + report);
			village = getCurrentVillage();
			link='game.php?village='+village+'&screen=place&target=' + targetVillageId + 

'&resources=' + maxResources;
			window.location = link;
		} else {
			alert('No villages left. Send the scouts again to spy.');
		}
   },0);
}

function deserialize(serializedSrting, rowDelim, colDelim) {
    var arr = new  Object();
    var rows = serializedSrting.split(rowDelim);
    debug("rows: " + rows);
    for (i=0; i<rows.length;i++) {
       column = rows[i].split(colDelim);
       debug("column: " + column);
       if (column instanceof Array) {
           arr[column[0]] = column[1];            
       }
    }
    return arr;
}

function serialize(deserializedArray, rowDelim, colDelim) {
    var str = "";
    for(row in deserializedArray) {
       debug("row: " + row);
       if (row != undefined && row != null && row != '') {
       
           debug("deserializedArray["+row+"]: " + deserializedArray[row]);
           column = row + colDelim + deserializedArray[row];
           str += rowDelim + column;
       }
    }
    debug("serialized string: " + str);
    return str;
}

var scoutForFarms = function () {
	var sp=0,sw=0,ax=0,scout=5,lc=0,hv=0,cat=0,ra=0; 
	var doc=getDocument();
	url=doc.URL; 
	if(url.indexOf('screen=place')==-1) {
		alert('This script needs to be run from the rally point'); 
	} else {
		setTimeout(function() {
			var farmCoordinates = GM_getValue("farmCoordinates");
			if (farmCoordinates != undefined) {
				coords=farmCoordinates.split(",");
				index=0; 
				farmcookie=document.cookie.match('(^|;) ?farm=([^;]*)(;|$)'); 
				if(farmcookie!=null) {
					index=parseInt(farmcookie[2]);
				}
				if(index==coords.length-1) { 
					alert('last village');
				}
				if(index>=coords.length) {
					index=0;
				}
				coords=coords[index]; 
				coords=coords.split("|"); 
				index=index+1; 
				cookie_date=new Date(2099,11,11); 
				document.cookie ="farm="+index+";expires="+cookie_date.toGMTString

(); 
				var unitForm=doc.forms.namedItem("units");
				unitForm.elements.namedItem('x').value=coords[0];
				unitForm.elements.namedItem('y').value=coords[1]; 
				unitForm.elements.namedItem('spear').value=sp; 
				unitForm.elements.namedItem('sword').value=sw; 
				unitForm.elements.namedItem('axe').value=ax; 
				unitForm.elements.namedItem('spy').value=scout; 
				unitForm.elements.namedItem('light').value=lc; 
				unitForm.elements.namedItem('heavy').value=hv; 
				unitForm.elements.namedItem('ram').value=ra; 
				unitForm.elements.namedItem('catapult').value=cat;
			} else {
				alert('No coordinates are set. Please set the coordinates at the 

Settings screen.');
			}
		});
	} 
}

function arrayIndexOf(arr, str) {
    var i;
    for (i = 0; i < arr.length; i++) {
       if (arr[i].indexOf(str) >= 0) {
           return i;
       }
    }
    return -1;
}

function settings() {
	setTimeout(function() {
		var doc=getDocument();
		url = doc.URL;
		if (url.indexOf('screen=settings')>-1) {
			var farmCoordinates = GM_getValue("farmCoordinates");
			if (farmCoordinates == undefined) {
				farmCoordinates = '';
			}
			var settingsTable = '<table border="0"><tr><th colspan="2" 

align="center"><h2>Tribal Wars v7 settings<h2></th></tr>';
			settingsTable += '<tr><td>Χωριά φάρμες (comma separated e.g xxx|yyy,kkk|

ttt)</td><td><input type="text" id="farmCoords" name="farmCoords" size="100" value="' + 

farmCoordinates + '" /></td></tr>';
			settingsTable += '<tr><td colspan="2" align="center"><input type="button" 

id="saveFarmsBtn" value="Αποθήκευση" /></td></tr>';
			settingsTable += '</table>';
			var settingsHtml = '<tr><td>'+settingsTable+'</td></tr>';
			$('#content_value').append(settingsTable);
			$('#saveFarmsBtn').click(function() {
				GM_setValue("farmCoordinates", $('#farmCoords').val());
			});
		}
	});
}

function main() {
	setTimeout(function() {
		console.log('Initializing main()');
		var doc=getDocument();

		url=doc.URL;

		//createVillageFrame();
		settings();

		oldNavTable=doc.body.getElementsByTagName("table")[2];
		village = getCurrentVillage();    
		if (village!=null) {
			var shortcutBar = '<table id="shortcutBar" align="center" border="1" 

cellpadding="3" style="margin-top:7px;"><tr>';
			for(var i=0;i<buildingNames.length;i++) {
				shortcutBar += '<td><a href="/game.php?village='+village

+'&screen='+buildingLinks[i]+'">' + buildingNames[i] + '</a></td>';
			}
			shortcutBar += '</tr><tr>';
			// create 2nd row
			for(i=0;i<otherLinks.length;i++) {
				shortcutBar += '<td><a href="' + otherFuncs[i] + '" 

name="extraFunctions">' + otherLinks[i] + '</a></td>';
			}
			shortcutBar += '</tr></table>';
			var wrappingHtml = '<tr class="shadedBG"><td class="bg_left"><div 

class="bg_left" style="height: 89px;"> </div></td><td valign="top">' + shortcutBar + '</td><td 

class="bg_right"><div class="bg_right" style="height: 89px;"> </div></td></tr>';
			$('table[class=main_layout] tr:eq(0)').after(wrappingHtml);
			
			$(document).ready(function() {
				$('a[name=extraFunctions]').click(function(event) {
					event.preventDefault();
					var functionName = $(this).attr('href');
					if (functionName.indexOf('.') > -1) {
						var func = functionName.split('.');
						functionName = func[0] + '("' + func[1] + '")';
						eval(functionName);
					} else {
						functionName += '()';
						eval(functionName);
					}
				});
			});
			
			
			// create the line that displays the number of units to send for farming
			var armyForFarming = '<div id="armyForFarming" style="text-align: 

center"></div>';
			$('#shortcutBar').after(armyForFarming);

			if (url.indexOf('place')>-1 && url.indexOf('resources')>-1) {
				// alert the resources
				resources = url.match(/resources=(\d+)/);
				if (resources != null) {
					resources = resources[1];
				}
				calculateResources(resources, '#armyForFarming');
			}
			
			getVillages();
			var villageLinks = GM_getValue("overview_villages");
			console.log("villageLinks3:" + villageLinks);
			villageLinks = villageLinks.split('%05');
			villageLinks.shift();
			villageLinks.pop();
			menuTrElem=doc.getElementById('menu_row2');
			// the link with the name of the village
			villageNameElem=$xf("//td[@id='menu_row2_village']/a");
			
			var villageDropList = '<div id="villagesList">';
			villageDropList += '<ul style="list-style:none;margin:0;padding:0;">';
			
			var screens = url.match(/screen=(.*)/);
			if (screens!=null)
			 screens=screens[1];
			for (var i=0;i<villageLinks.length;i++) {
				villageLinks[i] = villageLinks[i].replace(/screen=(.*)"?/, "screen=" 

+ screens + '"');
				villageDropList += '<li stlyle="display:block;height:26px;">' + 

villageLinks[i] + '</li>';
			}
			villageDropList += '</ul></div>';
			$(villageNameElem).after(villageDropList);
			$('#villagesList').css({
				'top': $('#menu_row2_village').offset().top + 

$('#menu_row2_village').height(),
				'left': $('#menu_row2_village').offset().left,
				'position': 'absolute',
				'visibility': 'hidden',
				'background': 'url("/graphic/index/statusbar-center.png") repeat-x 

scroll left top transparent',
				'z-index': 999
			});
			
			
			$(document).ready(function() {
				$(villageNameElem).mouseenter(function() {
					$('#villagesList').css({'visibility': 'visible'});
				});
				$('#villagesList').mouseenter(function() {
					$('#villagesList').css({'visibility': 'visible'});
				}).mouseleave(function() {
					$('#villagesList').css({'visibility': 'hidden'});
				});
			});

			debug("villageLinks4: " +villageLinks);
			// left and right arrows of prev and next village
			pos=arrayIndexOf(villageLinks, village) - 1;
			prevIndex=pos<0?villageLinks.length-1:pos;
			pos=arrayIndexOf(villageLinks, village)+1;
			nextIndex=pos>=villageLinks.length?0:pos;
		   
			// the left arrow (previous village)
			temp=document.createElement("p");
			temp.innerHTML = villageLinks[prevIndex];
			hrefAttr = temp.firstChild.getAttribute("href");
			var navArrowLeft = '<a href="' + hrefAttr + '"> &lt; </a>';
			$(villageNameElem).before(navArrowLeft);
			
			// the right arrow (next village)
			temp=document.createElement("p");
			temp.innerHTML = villageLinks[nextIndex];
			hrefAttr = temp.firstChild.getAttribute("href");
			var navArrowRight = '<a href="' + hrefAttr + '"> &gt; </a>';
			$(villageNameElem).after(navArrowRight);
		}
	},0);
}

$(document).ready(function(){
	debug('Starting script...');
	main();
});