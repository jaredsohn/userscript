// ==UserScript==
// @name           Keepfilter v2
// @namespace      Magistream
// @description    Version 2 of the magistream keepfilter
// @include        http://magistream.com/mine*
// ==/UserScript==


var requestString;

//adding species-filter input-elements
//Lineages
var lineage = document.createElement("select");
//Lineages
var generation = document.createElement("select");
//Species
var species = document.createElement("select");
//breedable
var breedable = document.createElement("input");
breedable.type = "checkbox";
//unfrozenEggs
var unfrozenEggs = document.createElement("input");
unfrozenEggs.type = "checkbox";
//Name
var name = document.createElement("input");
name.type = "text";
//unnamed
var unnamed = document.createElement("input");
unnamed.type = "checkbox";
//frozen
var frozen = document.createElement("input");
frozen.type = "checkbox";
//invert filter
var invert = document.createElement("input");
invert.type = "checkbox";
//invert filter
var sb = document.createElement("input");
sb.type = "checkbox";

//Request-Objekt erzeugen
function prepareRequest(){
	var xmlHttpObject = false;

	// Ueberpruefen ob XMLHttpRequest-Klasse vorhanden und erzeugen von Objekte fuer IE7, Firefox, etc.
	if (typeof XMLHttpRequest!= 'undefined')
	{
    	xmlHttpObject = new XMLHttpRequest();
	}
	// Wenn im oberen Block noch kein Objekt erzeugt, dann versuche XMLHTTP-Objekt zu erzeugen
	// Notwendig fuer IE6 oder IE5
	if (!xmlHttpObject)
	{
    	try
    	{
        	xmlHttpObject = new ActiveXObject("Msxml2.XMLHTTP");
   		}
    	catch(e)
    	{
        	try
        	{
            	xmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
        	}
        	catch(e)
        	{
            	xmlHttpObject = null;
        	}
    	}
	}
	return xmlHttpObject;
}


// Funktion, die bei Statusaenderungen reagiert
function handleStateChange(xmlHttpObject)
{
    // Derzeitigen Status zurueckgeben
    if(xmlHttpObject.readyState == 4){
     	requestString = xmlHttpObject.responseText;

    }
}


function arrayContains(array, string){
	for(var i=0; i<array.length; i++ ){
		if(array[i] == string) return true;
	}
	return false;
}

//Little helper: creats a label
function makeLabel(text){
	var newLabel = document.createElement("label");
	newLabel.appendChild(document.createTextNode(text));
	newLabel.style.color = "black";
	return newLabel;
}

//Little helper: creats an option
function makeLabel(text){
	var newLabel = document.createElement("label");
	newLabel.appendChild(document.createTextNode(text));
	newLabel.style.color = "black";
	return newLabel;


}

//The actual filter
function filterKeep(){
	var stringLineage = lineage.value; //lineage from filter
	var stringGeneration = generation.value; //generation from filter
	var stringSpecies = species.value; //species from filter
	var boolBreedable = breedable.checked; //breedables only
	var boolUnfrozenEggs = unfrozenEggs.checked; //needing clicks
	var stringName = name.value; //Name firm filter
	var boolInvert = invert.checked; //filter inversion?
	var boolUnnamed = unnamed.checked; //filter inversion?
	var boolFrozen = frozen.checked; //Only Frozens
	var boolSb = sb.checked; //parentless
	var trs  = document.body.getElementsByClassName('row');
	var knotenListe = new Array();
	ausdruck = new RegExp(stringSpecies);
	for(var i=0; i<trs.length; i++){
		if(boolInvert) trs[i].style.display = "none";
		else trs[i].style.display = "";
		//Species
		var actualSpecies = trs[i].getElementsByClassName('usercol4');
		if(!actualSpecies[1].firstChild.data.match(ausdruck) && stringSpecies!=""){
			var knoten = trs[i];
			knotenListe.push(knoten);
			continue;
		}
		//breedable
		var actualBreedable = trs[i].getElementsByTagName('a')[1].firstChild;
		if(!actualBreedable.nodeValue.match(/Breed/) && boolBreedable){
			var knoten = trs[i];
			knotenListe.push(knoten);
			continue;
		}
		//unfrozen eggs
		if(boolUnfrozenEggs){
			var test = trs[i].getElementsByClassName('usercol3');
			var linkList = test[0].childNodes;
			var boolCanFreeze = false;
			for(var  j=0; j<linkList.length; j++){
				if(linkList[j].nodeType==1 && linkList[j].firstChild.data.match(/Freeze/)){
					boolCanFreeze = true;
				}
			}
			if(!boolCanFreeze){
				var knoten = trs[i];
				knotenListe.push(knoten);
				continue;
			}
		}
		//unnamed eggs
		if(boolUnnamed){
			var test = trs[i].getElementsByClassName('usercol3');
			var linkList = test[0].childNodes;
			var boolIsUnnamed = false;
			for(var  j=0; j<linkList.length; j++){
				if(linkList[j].nodeType==1 && linkList[j].firstChild.data.match(/Name/)){
					boolIsUnnamed = true;
				}
			}
			if(!boolIsUnnamed){
				var knoten = trs[i];
				knotenListe.push(knoten);
				continue;
			}
		}
		//Name
		var actualNameHelp = trs[i].getElementsByClassName('usercol4');
		var actualName = actualSpecies[0].firstChild.firstChild.data;
		var nameAusdruck = new RegExp(stringName);
		if(!actualName.match(nameAusdruck) && stringName!=""){
			var knoten = trs[i];
			knotenListe.push(knoten);
			continue;
		}
		//Lineages
		var lineageAusdruck = new RegExp(stringLineage);
		if(!actualName.match(lineageAusdruck) && stringLineage!=""){
			var knoten = trs[i];
			knotenListe.push(knoten);
			continue;
		}
		//Frozen
		if(boolFrozen && !actualSpecies[1].firstChild.data.match(/Frozen/)){
			var knoten = trs[i];
			knotenListe.push(knoten);
			continue;
		}
	}

	//evaluating rquest-dependent
	for(var i=0; i<pets.length; i++){
		pet = pets[i];
		if(boolSb){
			if(!pet["sb"]){
				knotenListe.push(pet["knoten"]);
			}
		}
		var generationAusdruck = new RegExp(stringGeneration);
		if(stringGeneration!="" && !pet["generation"].match(generationAusdruck)){
			knotenListe.push(pet["knoten"]);
		}
	}

	for(var i=0; i<knotenListe.length; i++){
		if(boolInvert) knotenListe[i].style.display = "";
		else knotenListe[i].style.display = "none";
	}
}

//filling species filter
var trs  = document.body.getElementsByClassName('row');
var speziesListe = new Array();
for(var i=0; i<trs.length; i++){
	var test = trs[i].getElementsByClassName('usercol4');
	var speciesName = test[1].firstChild.data;
	speciesName = speciesName.replace(/Female /,"");
	speciesName = speciesName.replace(/Male /,"");
	speciesName = speciesName.replace(/Frozen /,"");
	if(!arrayContains(speziesListe, speciesName)) {
		speziesListe.push(speciesName);
	}
}
//Special additional filter-entries
speziesListe.push("Quetzalcoatl");
speziesListe.push("Alphyn");
speziesListe.push("Capricorn");
speziesListe.push("Crystalwing");
speziesListe.push("Leviathan");
speziesListe.sort();

species.options.add(new Option("", "", false, true));

for(var i=0; i<speziesListe.length; i++){
	species.options.add(new Option(speziesListe[i], speziesListe[i], false, false));
}

//Request-Infos
var trs  = document.body.getElementsByClassName('row');
var pets = new Array();
var xmlHttpObject = prepareRequest();
for(var i=0; i<trs.length; i++){
	var field = trs[i].getElementsByClassName('usercol4')[0];
	var id = field.getElementsByTagName('a')[0].getAttribute('name');
	xmlHttpObject.open('GET','http://magistream.com/creatures/ajaxtooltip.php?id='+id, false);
    xmlHttpObject.send(null);
    xmlHttpObject.onreadystatechange = handleStateChange(xmlHttpObject);
    var stringArray = requestString.split("<br/>");
    var petArray = new Array;
    petArray["sb"] = true;
	for(var j=0; j<stringArray.length; j++){
		var myString = stringArray[j];
		if(myString.match(/Family/)){
			petArray["Family"] = myString.replace(/\nFamily: /,"");
		}
		if(myString.match(/Father/)|| myString.match(/Mother/)){
			petArray["sb"] = false;
		}
		if(myString.match(/Generation/)){
			petArray["generation"]= myString.replace(/Generation: /,"");
		}
		petArray["knoten"] = trs[i];
		petArray["id"] = id;
	}
	pets.push(petArray);
}

var lineageListe = new Array();
var generationListe = new Array();
lineageListe.push("");
generationListe.push("");
for(var i=0; i<pets.length; i++){
	var pet = pets[i];
	if (pet["Family"] && !arrayContains(lineageListe, pet["Family"])){
		lineageListe.push(pet["Family"]);
	}
	if (pet["generation"] && !arrayContains(generationListe, pet["generation"])){
		generationListe.push(pet["generation"]);
	}
}

//For alphabetical sorting. Comment this out if you wish to keep the order from above!
lineageListe.sort();
generationListe.sort();

for(var i=0; i<speziesListe.length; i++){
	species.options.add(new Option(speziesListe[i], speziesListe[i], false, false));
}

for(var i=0; i<lineageListe.length; i++){
	lineage.options.add(new Option(lineageListe[i], lineageListe[i], false, false));
}

for(var i=0; i<generationListe.length; i++){
	generation.options.add(new Option(generationListe[i], generationListe[i], false, false));
}

//Call to filter
species.addEventListener('change', function(){filterKeep();}, true);
breedable.addEventListener('change', function(){filterKeep();}, true);
unfrozenEggs.addEventListener('change', function(){filterKeep();}, true);
name.addEventListener('change', function(){filterKeep();}, true);
invert.addEventListener('change', function(){filterKeep();}, true);
unnamed.addEventListener('change', function(){filterKeep();}, true);
frozen.addEventListener('change', function(){filterKeep();}, true);
lineage.addEventListener('change', function(){filterKeep();}, true);
sb.addEventListener('change', function(){filterKeep();}, true);
generation.addEventListener('change', function(){filterKeep();}, true);

//inserting filter into page
var divs  = document.body.getElementsByClassName('forabg');
var myDiv;
if(divs.length > 0){
	myDiv = divs[0];
}
var marker = myDiv.firstChild;

var borderDiv1 = document.createElement("div");
borderDiv1.appendChild(makeLabel("Breedable"));
borderDiv1.appendChild(breedable);
borderDiv1.appendChild(makeLabel("Need Clicks"));
borderDiv1.appendChild(unfrozenEggs);
borderDiv1.appendChild(makeLabel("Unnamed"));
borderDiv1.appendChild(unnamed);
borderDiv1.appendChild(makeLabel("Frozen"));
borderDiv1.appendChild(frozen);
borderDiv1.appendChild(makeLabel("No Parents"));
borderDiv1.appendChild(sb);

borderDiv1.appendChild(document.createElement("br"));
borderDiv1.appendChild(makeLabel("Species"));
borderDiv1.appendChild(species);
borderDiv1.appendChild(makeLabel("Name"));
borderDiv1.appendChild(name);
borderDiv1.appendChild(makeLabel("Lineage"));
borderDiv1.appendChild(lineage);
borderDiv1.appendChild(makeLabel("Lineage Gen"));
borderDiv1.appendChild(generation);

borderDiv1.appendChild(document.createElement("br"));
borderDiv1.appendChild(makeLabel("Reverse"));
borderDiv1.appendChild(invert);

myDiv.insertBefore(borderDiv1, marker);