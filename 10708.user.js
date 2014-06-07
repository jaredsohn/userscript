// ==UserScript==
// @name		    Travian Spies
// @author		  mikrop
// @include 		http://*.travian.cz/a2b.php?z=*
// @version 		Latest version (0.2)
// @description     This script provides reference to defined count of spies
// ==UserScript==

//--- Settings ---

	var constCountSpies = 1; 

//----------------

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;

function find(xpath, xpres) {

  var ret = document.evaluate(xpath, document, null, xpres, null);
  return xpres == XPFirst ? ret.singleNodeValue : ret;
  
}

function inc(elem, max) {

	var o = (elem == "") ? 1 : (parseInt(elem) + 1);	
	return out = (o >= max) ? max : o;

}

function dec(elem) {

	var o = (elem == "") ? 0 : (parseInt(elem) - 1);
	return out = (o <= 0) ? 0 : o;	

}

(function() {

	var sampleXp = "/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']"+
	               "/div[@id='lmid2']/table[1]/tbody/tr/td/table/tbody/tr[1]";

	var rsMaxSp = find(sampleXp + "/td[6]/a[1]", XPFirst);
	var maxSp = rsMaxSp.textContent.match(/\((\d+)\)/);
	
	var inp = find(sampleXp + "/td[5]/input", XPFirst);	
	               	
	var img = find(sampleXp + "/td[4]/img", XPFirst);
		img.title = " Send constant " +constCountSpies+ " spies ";
		img.style.cursor = "pointer";
		img.addEventListener("click", function() {
		
			inp.value = constCountSpies;
		
		}, false);
		
	var sibTd = find(sampleXp + "/td[6]", XPFirst);
		sibTd.appendChild(document.createTextNode(" "));
		
	var pl = document.createElement("a");
		pl.appendChild(document.createTextNode("+"));
		pl.href = "#";
		pl.addEventListener("click", function() {
		
			inp.value = inc(inp.value, maxSp[1]);
		
		}, false);

		sibTd.appendChild(pl);
		sibTd.appendChild(document.createTextNode(" "));

	var min = document.createElement("a");
		min.appendChild(document.createTextNode("-"));
		min.href = "#";
		min.addEventListener("click", function() {
		
			inp.value = dec(inp.value);
		
		}, false);
			
		sibTd.appendChild(min);

})();
