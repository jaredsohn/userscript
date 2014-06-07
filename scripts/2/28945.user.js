// ==UserScript==
// @name		lvtrii evo+
// @version		0.1
// @namespace      http://lvtrii.co.uk/gm/
// @description    Rewrite of Evo+
// @include        http://*playevo.com/*
// ==/UserScript==

// ***************************************************************************
// ** Global Variables
// ***************************************************************************

const scriptversion = '0.1';
const scriptversionID = 'lvtrii ' + scriptversion;
const scriptTag = 'Rewrite';
GM_log(scriptversionID + " start");

// xscript data sharing
unsafeWindow.evo_plus = new Array();

// page handlers
var pageHandlers = new Array();

var units = new Object(); // units :P

// mimimum score ratio fo attacks
var minAttack = 0.35;

var pMetal = 0, pMineral = 0, pFood = 0; //player's resources
var pRank = null, pScore = null; // player's ranking and score
var eeb = Number(GM_getValue('eeb', 1)); // efficient breeding center ratio

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************
//

// Fleets page

regPageHandler(/^\/fleets/i, evoFleets);
function evoFleets(){
	
	// Easy Balancing
	var fleetsTable = xpath("id('content')/table[1]",document,true);
	
	var FleetOne = 0; var FleetTwo = 0; var FleetThree= 0;
   
    for(q=1; q <= fleetsTable.rows.length-13; q++) {
    FleetOne += Number(fleetsTable.rows[q].cells[3].textContent);
    }
   
    for(q=1; q <= fleetsTable.rows.length-13; q++) {
    FleetTwo += Number(fleetsTable.rows[q].cells[5].textContent);
    }
   
    for(q=1; q <= fleetsTable.rows.length-13; q++) {
    FleetThree += Number(fleetsTable.rows[q].cells[7].textContent);
    }
   
    if(FleetOne > FleetTwo) {
        if(FleetOne > FleetThree) maxSize = FleetOne;
        else maxSize = FleetThree;
    }
    else {
        if(FleetTwo > FleetThree) maxSize = FleetTwo;
        else maxSize = FleetThree;
    }
    
    // Now actually use it
    
    // Add the function to add monkeys to the correct box when clicking

    var theRow = 0;
    for( var i = 1; i < (fleetsTable.rows.length); i++ ) {
        if(fleetsTable.rows[i].cells.length != 9) continue;
        if(fleetsTable.rows[i].cells[0].textContent.toLowerCase() == "monkey") theRow = i;
    }   
    var MonkeyClick = function(e){
        fleetsTable.rows[theRow].cells[2].getElementsByTagName('INPUT')[0].value = this.textContent.split(" More")[0];
    };       
   
    if(FleetOne == maxSize) { cellToGo = 3; }
    else if(FleetTwo == maxSize) { cellToGo = 5; }
    else if(FleetThree == maxSize) { cellToGo = 7; }
    rawr = fleetsTable.insertRow(fleetsTable.rows.length-12);
    rawr.className = "alt1 b";
    rawr.style.textAlign = "center";
   
    heh = rawr.insertCell(0);
    heh.textContent = "Difference";
    heh.style.textAlign = "left";
    heh.addEventListener("click", MonkeyClick, false);
   
    heh = rawr.insertCell(1);
    heh.className = "alt2 row2";
    heh.colSpan = 2;
    heh.addEventListener("click", MonkeyClick, false);
       
    heh = rawr.insertCell(2);
    heh.className = "red_bg";
    heh.colSpan = 2;
    heh.textContent = maxSize-FleetOne + ' More';
    heh.addEventListener("click", MonkeyClick, false);
       
    heh = rawr.insertCell(3);
    heh.className = "yellow_bg";
    heh.colSpan = 2;
    heh.textContent = maxSize-FleetTwo + ' More';
    heh.addEventListener("click", MonkeyClick, false);
       
    heh = rawr.insertCell(4);
    heh.className = "green_bg";
    heh.colSpan = 2;
    heh.textContent = maxSize-FleetThree + ' More';
    heh.addEventListener("click", MonkeyClick, false);
       
    // End balancing act
    
    var sumRow = xpath(".//tr[td[position()=1 and text()='Move to']]", document, true);
    sumRow = fleetsTable.insertRow(sumRow.rowIndex);
	sumRow.className = "alt1 b";
	sumRow.style.textAlign= 'center';
    sumRow.innerHTML = '<td style="text-align:left;">Total</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2">'+FleetOne+'</td><td class="yellow_bg" colspan="2">'+FleetTwo+'</td><td class="green_bg" colspan="2">'+FleetThree+'</td>';
    
    // How many times can we launch?
    for(z=1; z <= 3; z++) {   
    var LaunchCell = fleetsTable.rows[fleetsTable.rows.length -2].cells[z];
	    var LaunchCost = evoString2Number(fleetsTable.rows[fleetsTable.rows.length -2].cells[z].textContent);
	        if((LaunchCost * 5) < pFood) { cellCol = "lightgreen"; }
	        else if(LaunchCost < pFood ) { cellCol = "orange"; }
	        else { cellCol = "red"; }
	   		LaunchCell.style.color = cellCol;
    }
    
    

	
}

// Add stuff to the scans and create pages
regPageHandler(/^\/create/i, evoCreate);
regPageHandler(/^\/scans/i, evoCreate);

function evoCreate() {
	
	function onClickMax(){
		var toBuild = this.textContent.replace(" Max","");
		this.parentNode.getElementsByTagName('input')[0].value = toBuild;
		setMax();
	}
	
	// Grab every row in the tables
	var items = xpath("id('content')/table/tbody/tr/td[2]",document,false);
	
	// Excute it initally
	setMax();
	
	// Parameters will be for recalculating on blur later on
	function setMax(){
		
		// Reset it
		wpMetal = pMetal;
		wpMineral = pMineral;
		
		// First pass	
		for ( var i=0 ; item = items.snapshotItem(i); i++ ){
			
			var cost = item.textContent.match('(\\d+) metal, (\\d+)');
			
			if (cost != null){
				var cMetal = cost[1];
				var cMineral = cost[2];

				toBuy = item.nextSibling.nextSibling.getElementsByTagName('input')[0];
				wpMetal = wpMetal - (toBuy.value * cMetal);
				wpMineral = wpMineral - (toBuy.value * cMineral);
			}

		}
		
		// Second pass	
		for ( var i=0 ; item = items.snapshotItem(i); i++ ){
			
			var cost = item.textContent.match('(\\d+) metal, (\\d+)');
			
			if (cost != null){
				
				var cMetal = cost[1];
				var cMineral = cost[2];
				inputField = item.nextSibling.nextSibling;
								
				maxAvail = wpMetal / cMetal; // Set the max to be based on metal
				
				if ((wpMineral / cMineral) < maxAvail){ // if we can afford less due to mineral
					maxAvail = wpMineral / cMineral;
				}
				
				// Format nice
				maxAvail = Math.floor(maxAvail);
				
				maxInput = document.createElement('span');
				
				if (maxAvail < 1){
					maxInput.style.color = 'red';
					maxAvail = 0;
				}
				
				maxInput.textContent = maxAvail + ' Max';
				
				
				// Out with the old!
				inputField.removeChild(inputField.lastChild);	
				inputField.removeChild(inputField.lastChild);	
					
				// In with the new
				inputField.appendChild(document.createElement('br'));
				inputField.appendChild(maxInput);

				maxInput.addEventListener('click', onClickMax, false);
				
			}
					
		}
	
	}
	
	// Add the onBlur handlers
	var inputs = xpath("id('content')/table/tbody/tr/td/input[@type='number']",document,false);
	for ( var i=0 ; theInput = inputs.snapshotItem(i); i++ ){
		theInput.addEventListener('blur', setMax, false);
	}
	
	var checkSubmit = function(e){
		if(! confirm('Are you sure you want to produce these items/creatures?'))
			e.preventDefault();
	}
	
	// Add the "Are you sure?"	
	var forms = document.getElementsByTagName('form');
	for ( var i=0 ; i < forms.length; i++ ){
		forms[i].addEventListener('submit', checkSubmit, false);
	}
}



//
// ***************************************************************************
// ** CONFIG
// ***************************************************************************
//



//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	
	// Add page tagging
	
	node = document.getElementById('ndnetnav'); //xpath("id('')/a",document,true);
	tag = document.createElement('span');
	tag.style.color = 'red';
	tag.textContent = scriptversionID + ' ';
	tag.title = scriptTag;
	node.insertBefore(tag, node.firstChild);

	var profiler = Date.now();

	// Initialization
	// -----------------------------------------------------------------------

	// grab player's available resources
  		panel = document.getElementById("navstatus");
  		if( panel != null ) {
    		var match = new Array();
    		resources = document.evaluate("//acronym[@class='resourceAcronym']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    		for( i = 0; resource = resources.snapshotItem(i); i++ )  {
        		match[resource.title] = resource.textContent.match(/[\d,]+/);
   			}
    
			    pMetal = evoString2Number(String(match['Metal']));
			    pMineral = evoString2Number(String(match['Mineral']));
			    pFood = evoString2Number(String(match['Food']));
			    pGold = evoString2Number(String(match['Gold']));
			    pScore = evoString2Number(String(match['Score']));
    
    }

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

	profiler = Date.now() - profiler;
	GM_log('lvtrii+ exec time: ' + profiler + ' ms');
}) ();

//
// ***************************************************************************
// ** Helper functions
// ***************************************************************************
//
function gcf(a,b) {
	while( b != 0 ) {
		t = a%b;
		a = b;
		b = t;
	}
	return a;
}

function evoLayoutChanged()
{ alert('Oops.. Page layout was not recognized, Neon probably changed the page :('); }

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;
	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	} else
	{ part1 = num; }
	while( re.test(part1) ) part1 = part1.replace(re, '$1,$2');
	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num)
{ return Number(num.replace(/,/g,'')); }

function evoFormatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

function xpath(query, domspace, single) {
            if (!single) {
                        return document.evaluate(query, domspace, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            } else {
                        return document.evaluate(query, domspace, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            }
}

//
// ***************************************************************************
// ** Objects
// ***************************************************************************

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler)
{ pageHandlers.push(new pageHandler(urlRegEx,  handler)); }

//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}

