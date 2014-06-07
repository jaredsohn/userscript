// ==UserScript==
// @name           Pardus Building Defaults
// @namespace      pardus.at
// @author         Hitchhiker
// @version        0.5
// @description    Automatically fills in the max possible values for building trade
// @include        *.pardus.at/building_trade.php*
//
// ==/UserScript==

var fuelCollector = true;
var gasCollector = true;
var spaceFarm = true;
var energyWell = true;
var chemicalLaboratory = true;
var asteroidMine = true;
var radiationCollector = true;
var medicalLaboratory = true;
var brewery = true;
var plasticsFacility = true;
var smeltingFacility = true;
var opticsResearchCenter = true;
var slaveCamp = true;
var electronicsFacility = true;
var recyclotron = true;
var clodGenerator = true;
var nebulaPlant = true;
var drugStation = true;
var darkDome = true;
var handweaponsFactory = true;
var battleweaponsFactory = true;
var robotFactory = true;
var droidAssemblyComplex = true;
var leechNursery = true;
var militaryOutpost = true;
var tradeOutpost = false;
var allianceCommandStation = true;


if (tradedefaults(document.getElementsByTagName("H1")[0].textContent.trim())) pasteDefaults();

var tradelinks = document.createElement("DIV");
var setLink = document.createElement("A");
setLink.href = "javascript:pasteDefaults()";
setLink.textContent = "Insert Default Values";
var delLink = document.createElement("A");
delLink.href = "javascript:eraseDefaults()";
delLink.textContent = "Delete Default Values";
tradelinks.appendChild(setLink);
tradelinks.appendChild(document.createTextNode(" | "));
tradelinks.appendChild(delLink);

document.getElementsByTagName("HR")[0].parentNode.insertBefore(tradelinks,document.getElementsByTagName("HR")[0].nextSibling);

function pasteDefaults() {
	var ts = document.getElementsByTagName("TABLE");
	for(i=0;i<ts.length;i++) {
		try {
			if (ts[i].rows(0).cells(2).textContent.search(/Price/)>-1) var t1 = ts[i];
			if (ts[i].rows(0).cells(2).textContent.search(/Min/)>-1) var t2 = ts[i];
		} catch(e) {}
	}
	var fss = t1.rows[t1.rows.length - 2].cells[1].textContent.replace(/t/g,"");
	var fsb = t2.rows[t2.rows.length -2].cells[1].textContent.replace(/t/g,"");
	for(i=0;i<t1.rows.length;i++) {
		if(t1.rows[i].cells.length==5) {
			if(t1.rows[i].cells[4].children.length > 0) {
				t1.rows[i].cells[4].firstChild.value = Math.min(t1.rows[i].cells[2].textContent, t2.rows[i].cells[4].textContent - t2.rows[i].cells[2].textContent, fsb);
				fsb -= t1.rows[i].cells[4].firstChild.value;
				fss += t1.rows[i].cells[4].firstChild.value;
			}
			if(t2.rows[i].cells[6].children.length > 0) {
				t2.rows[i].cells[6].firstChild.value = Math.min(fss,t2.rows[i].cells[2].textContent-t2.rows[i].cells[3].textContent);
				fss -= t2.rows[i].cells[6].firstChild.value;
				fsb += t2.rows[i].cells[6].firstChild.value;
			}
		}
	}


}

function eraseDefaults() {
	for (i=0;i<document.getElementsByTagName("INPUT").length;i++) {
		if (document.getElementsByTagName("INPUT")[i].type=="text") document.getElementsByTagName("INPUT")[i].value="";
	}
}

function tradedefaults(btype)  {
	switch(btype) {
		case "Fuel Collector": return fuelCollector;
		case "Gas Collector": return gasCollector;
		case "Space Farm": return spaceFarm;
		case "Energy Well": return energyWell;
		case "Chemical Laboratory": return chemicalLaboratory;
		case "Asteroid Mine": return asteroidMine;
		case "Radiation Collector": return radiationCollector;
		case "Medical Laboratory": return medicalLaboratory;
		case "Brewery": return brewery;
		case "Plastics Facility": return plasticsFacility;
		case "Smelting Facility": return smeltingFacility;
		case "Optics Research Center": return opticsResearchCenter;
		case "Slave Camp": return slaveCamp;
		case "Electronics Facility": return electronicsFacility;
		case "Recyclotron": return recyclotron;
		case "Clod Generator": return clodGenerator;
		case "Nebula Plant": return nebulaPlant;
		case "Drug Station": return drugStation;
		case "Dark Dome": return darkDome;
		case "Handweapons Factory": return handweaponsFactory;
		case "Battleweapons Factory": return battleweaponsFactory;
		case "Robot Factory": return robotFactory;
		case "Droid Assembly Complex": return droidAssemblyComplex;
		case "Leech Nursery": return leechNursery;
		case "Military Outpost": return militaryOutpost;
		case "Trade Outpost": return tradeOutpost;
		case "Alliance Command Station": return allianceCommandStation;
		default: return false;
	}
}
