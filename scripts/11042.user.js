// ==UserScript==
// @name		    Travian CapacityCounter
// @author		  mikrop
// @include 		http://*.travian.*/a2b.php
// @version 		Latest version (0.3)
// @description	 Provides information about the capacity of dispatched troops
// ==UserScript==

//--- Settings ---

	// Scope: roman, german, gaul
	
	var nation = "";
	// example -> var nation = "german";

//----------------

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function find(xpath, xpres) {

  var ret = document.evaluate(xpath, document, null, xpres, null);
  return xpres == XPFirst ? ret.singleNodeValue : ret;
  
}

(function() {

	var sampleXp = "//div[@id='lmid2']/form/table[2]/tbody";
	var sibTr = find(sampleXp + "/tr[3]", XPFirst);
	
		if (sibTr) {
		
			var elemTr = window.document.createElement("tr");
			var tit = window.document.createElement("td");
				tit.textContent = "Capacity ";
				tit.style.cursor = "pointer";
				
				var pack = document.createElement("img");
					pack.style.verticalAlign = "bottom";
					pack.src = "data:image/gif,GIF87a%10%00%10%00%F7%00%00%1Cz%04%"+
					"C4%8A%2C%9C%C6%8C%E4%C6%7C%F4%E6%B4%CC%8E%2C%E4%D2%9C%D4%AAD%"+
					"5C%9A%2C%EC%B6%3C%FC%D6t%F4%EA%D4%D4%BAt%F4%CAl%7C%AET%FC%F6%"+
					"D4%3C%86%0C%F4%DE%AC%DC%B2d%F4%E6%BCd%A6L%D4%B2T%EC%C6%84D%92"+
					"%14%F4%F6%EC%D4%A2%5C%F4%D6%8C%DC%BA%7C%E4%CE%8Cl%A24%F4%BE%3"+
					"C%FC%EE%BC%EC%CE%84%FC%DA%9C%5C%A2%3C%EC%DE%BC%AC%CA%94%CC%96"+
					"%3C%EC%DA%B4%E4%BEl%84%B6d%E4%B2DT%9A%24%FC%FE%F4%FC%DE%8C%DC"+
					"%CA%94%FC%E6%A4%DC%AET%FC%F2%D4%3C%8E%14t%A6%3C%FC%C2L%F4%CE%"+
					"84%94%BEt%CC%8ED%EC%DA%A4%D4%AATd%9E%2C%DC%BAl%FC%F6%E4%FC%EA"+
					"%BC%DC%B2TD%92%2C%FC%F6%EC%FC%DA%8C%EC%BEL%FC%EE%CC%EC%E2%BC%"+
					"FC%E6%B4%2C~%04%A4%C6%8C%E4%CA%84%CC%924%EC%D6%9C%EC%B6L%FC%D"+
					"E%84%F4%EE%D4%F4%D2%7C%84%B2%5C%3C%8A%1C%FC%E2%9C%E4%B6ll%A6%"+
					"3C%EC%CA%84%D4%A6T%DC%C2%8C%E4%D2%94%EC%D2%94d%A2D%B4%CE%94%8"+
					"C%BAl%9C%C2%84%DC%BEt%DC%B6L%FC%FA%FC%E4%C6%84%CC%8E4%D4%AEL%"+
					"5C%9E%3C%FC%D6%7C%F4%CE%7C%FC%F6%DC%3C%8A%0C%DC%B6t%F4%EA%CCL"+
					"%92%1C%F4%D6%94%E4%CE%94%F4%BED%FC%EE%C4%EC%CE%8C%5C%A2D%EC%D"+
					"E%C4%AC%CE%94%CC%9A%3C%EC%DA%BC%E4%C2t%84%B6l%E4%B2LT%9A%2C%F"+
					"C%FE%FC%FC%DE%94%E4%CA%94%FC%EA%AC%FC%F2%E4D%8E%1Ct%AAL%F4%D2"+
					"%8C%94%C2%844%86%14%E4%C2%7CL%964%F4%C2T%FC%EA%CC%EC%D6%AC%FC"+
					"%E2%AC%DC%BEd%D4%AET%FC%FA%E4%FC%FA%EC%FC%F2%CC%FC%EA%B4%A4%C"+
					"A%8C%EC%BALd%9E4%FC%DA%94%EC%E2%C4%F4%EE%DC%84%B2dl%A6D%EC%CA"+
					"%8C%D4%A6%5C%DC%B6T%00%00%00%00%00%00%00%00%00%00%00%00%00%00"+
					"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%"+
					"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0"+
					"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00"+
					"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%"+
					"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0"+
					"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00"+
					"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%"+
					"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0"+
					"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00"+
					"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%"+
					"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0"+
					"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00"+
					"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%"+
					"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0"+
					"0%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00"+
					"%08%FA%00%F1%08%1C%88%E1%88%20%18%03%13%0E%5C%94%04S%92%23%89"+
					"%AE%FCP(p%08%A2%2B%3BvD%20%C0%A5%82%A1%84h%06%0C%60%B2b%85%90"+
					"%17c%0E%A9%91%20a%04%9E%2B%5Dn%2C%18%D1%A2%0A%03%1Dj%C8%8484%"+
					"85%CA%86%0A%8A%0A%5D%01q%A2%07%12!ex%E4Q%E0b%09%12L%8A%60%10%"+
					"A1A%86%8C%9DC%8D%A0(%F0%90BC%09L%3B%60%C0%E0%01%A4%81%1D%20%4"+
					"0d%40%0A%F2%C8%0D%92%1E%3B%1E0%12%C2%23%12!B%1E%3A8%40%60g%0A"+
					"%920a%19%7Dh%24%A3C%87%1C%0E%E2%F8%B9%60%A1%C0%01Ee%DA%F0p%D1"+
					"!K%1C%12%24%B48%C2%12(%00%97%0D%13%22%BB%80%14G%8B%16%14NPl%1"+
					"1S%04%8F%09%1C%82%840B%E0%C8%91%11%01(%00a%E9%83A%E0%0F%3Dr%0"+
					"4%A9Hs%C1%8C%18%DD%3E%BC(%84%B1%A1%80%9B36%20%BC%19Dq%20%9CK%"+
					"19%E6%04%02%900%20%00%3B";
					
				tit.appendChild(pack);
				elemTr.appendChild(tit);

				var elemsTd = find(sampleXp + "/tr[3]/td", XPList);
				var elemTdTC = new Array();
				var ai = null;
				var newElemTd = new Array(); 
				
				//--- capacity of unit --------------

				var nC = { "roman" : [40, 20, 50, 0, 100, 70, 0, 0, 0, 3000, 0],
				           "german" : [60, 40, 50, 0, 110, 80, 0, 0, 0, 3000, 0], 
				           "gaul" : [30, 45, 0, 75, 35, 65, 0, 0, 0, 3000, 0] };				
				
				//-----------------------------------

				var nCKey = nation.toLowerCase();
				var tc = 0;

				if (nC[nCKey] != undefined) {	

					for(var i=1; i<elemsTd.snapshotLength; i++) {

						ai = (i - 1);
						
						elemTdTC[ai] = parseInt(elemsTd.snapshotItem(i).textContent);
						newElemTd[ai] = window.document.createElement("td");
					
						tc = (tc + (elemTdTC[ai] * nC[nCKey][ai]));
					
						newElemTd[ai].textContent = (elemTdTC[ai] * nC[nCKey][ai]);
						
						elemTr.appendChild(newElemTd[ai]);
						
					}
					
					sibTr.parentNode.insertBefore(elemTr, sibTr.nextSibling);

					var totalCapacity = find(sampleXp + "/tr[4]/td[1]", XPFirst);
						totalCapacity.title = " Total capacity " +tc+ " units ";
		
				} else { 
				
					alert("Inf. Nejprve musite nastavit parametr \"nation\", nebo "+
                                              "jeho hodnotu opravit.");
				
				}
		
		}

})();
