// ==UserScript==
// @name			Travian market materials counter v0.2
// @author		    mikrop
// @include 		http://s*.travian.*/build.php*
// @version 		Latest version 0.2
// @description 	Pocita celkovy pocet transportovanych surovin    	
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var tbodySampleXp = '//div[@id="lmid2"]/form/table[1]/tbody/tr/td[1]/table/tbody'; 
 
/**
 * find
 * @param {type} xpath, {type} xpres
 */
function find(xpath, xpres) {
  	var ret = document.evaluate(xpath, document, null, xpres, null);
	return (xpres) == XPFirst ? ret.singleNodeValue : ret;
}
 
/**
 * createTotalMaterials 
 */
function createTotalMaterials() {

	var tb = find(tbodySampleXp, XPFirst);
	
	var cTr = document.createElement('tr');
	
	var cTdI = document.createElement('td');
		cTdI.setAttribute('colspan', '2');
		cTdI.style.textAlign = 'right';
		cTdI.textContent = 'Total:';
		cTdI.title = ' Want of 0 market agents ';
		cTdI.style.cursor = 'help';
		
	var cTdII = document.createElement('td');
		cTdII.setAttribute('colspan', '2');	
		cTdII.textContent = '0';
		
		cTr.appendChild(cTdI);
		cTr.appendChild(cTdII);
		
		tb.appendChild(cTr);  	
  	
} 

/**
 * getTotalMaterials 
 */
function getTotalMaterials() {
 	
 	var r;
 	var totalMaterials = 0;
 	
	for (var i=1; i<5; i++) {
		r = document.getElementById('r' + i);
		totalMaterials += (r.value != '') ? parseInt(r.value) : 0; 	
	}
 	
 	return (totalMaterials);
 	
}

/**
 * setTotalMaterialsTitle
 * @param {type} totalMaterials 
 */
function setTotalMaterialsTitle(totalMaterials) {

	var totalLabel = find(tbodySampleXp + '/tr[5]/td[1]', XPFirst);
	var aTraf = find(tbodySampleXp + '/tr[1]/td[4]/a', XPFirst);
	var aTrafTC = aTraf.textContent;
	var agentTraffic = aTrafTC.match(/\((\d+)\)/);
	
	var countAgents = 1;
	if (totalMaterials > agentTraffic[1]) {
		var CA = parseInt(totalMaterials / agentTraffic[1]);
		countAgents = (totalMaterials % agentTraffic[1] != 0) ? CA + 1 : CA;
	}

	totalLabel.title = ' Want of ' + countAgents + ' market agents ';

}

/**
 * fillTotalMaterials 
 */
function fillTotalMaterials() {

	var totalTd = find(tbodySampleXp + '/tr[5]/td[2]', XPFirst);
	var totalMaterials = getTotalMaterials();
		totalTd.textContent = totalMaterials;
		
	setTotalMaterialsTitle(totalMaterials);	

}

(function() {

	createTotalMaterials();	

	var inp, a;
		
	for (var i=1; i<5; i++) {
	
		inp = find('//*[@id="r' +i+ '"]', XPFirst);
		inp.addEventListener('keyup', function(event) {
	    	fillTotalMaterials();	
	    }, false);

	    a = find(tbodySampleXp + '/tr[' +i+ ']/td[4]/a', XPFirst);
	    a.addEventListener('click', function(event) {
	    	fillTotalMaterials();	
	    }, false);   

	}

})();

/** History roudmap **
 * 0.1 - Pocita celkovy pocet transportovanych surovin, (reakce pouze na onkeyup)
 * 0.2 - Pridana reakci na onclick konstanty
 *	   - Vylepsen Xpath
 *     - Info kolik bude potreba obchodniku
 */

/** TODO **
 * Zapracovat i18n 
 */  
  