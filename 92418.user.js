// ==UserScript==
// @name           Id'sBySpecies
// @namespace      Magistream
// @include        http://magistream.com/user/*
// ==/UserScript==

//adding species-filter input-elements
//Species
var species = document.createElement("select");
var linkListe = new Array();
var longString = "";

var bySpecies = document.createElement("textarea");
bySpecies.readOnly = true;
bySpecies.style.display = "block";
bySpecies.addEventListener('focus', function(){bySpecies.select();}, true);

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
	var stringSpecies = species.value; //species from filter
	var trs  = document.body.getElementsByClassName('row');
	var knotenListe = new Array();
	ausdruck = new RegExp(stringSpecies);
	for(var i=0; i<trs.length; i++){
		//Species
		var actualSpecies = trs[i].getElementsByClassName('usercol2');
		if(actualSpecies[1].firstChild.data.match(ausdruck)){
			var knoten = trs[i];
			knotenListe.push(knoten);
			continue;
		}
	}
	for(var i=0; i<knotenListe.length; i++){
		var myString = knotenListe[i].getElementsByTagName('a')[0];
		myString = myString.toString().split("/")[4];
		linkListe.push(myString);
	}
	for(var i=0; i<linkListe.length; i++){
		longString = longString+linkListe[i]+",";
	}
	bySpecies.value=longString;
}





//filling species filter
var trs  = document.body.getElementsByClassName('row');
var speziesListe = new Array();
for(var i=0; i<trs.length; i++){
	var test = trs[i].getElementsByClassName('usercol2');
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


//Call to filter
species.addEventListener('change', function(){filterKeep();}, true);

//inserting filter into page
var divs  = document.body.getElementsByClassName('forabg');
var myDiv;
if(divs.length > 0){
	myDiv = divs[0];
}
var marker = myDiv.firstChild;

var borderDiv1 = document.createElement("div");
borderDiv1.appendChild(makeLabel("Species"));
borderDiv1.appendChild(species);

myDiv.insertBefore(borderDiv1, marker);

var marker2  = document.getElementById('keeptabs');

marker2.insertBefore(bySpecies, marker2.firstChild);