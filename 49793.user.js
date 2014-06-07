// ==UserScript==
// @name           Støyfilter for Underskog
// @namespace      http://www.skeib.com
// @description    Fjerner plagsomme poster fra hjemmesiden til underskog.no. Kan filtrere både på fulltekst og på forfatter.
// @include        http://*.underskog.no/*
// @include        http://underskog.no/*
// @include        http://www.underskog.no/*
// ==/UserScript==

var version = 200905251830;
var hiddenCount = 0;
var tattBort = new Array();

function letsFilter() {
    
    //Legger til menyvalg i GreaseMonkey
	GM_registerMenuCommand("Vis fjernede innlegg",visIgjen);
	GM_registerMenuCommand("Endre filtrerte ord",setKillList); 
	GM_registerMenuCommand("Endre filtrerte forfattere",setPersonList); 
    
 	//Lager array av alle  innleggene
	var arrayList = document.getElementsByClassName("post"); 
	var commentList = document.getElementsByClassName("comment");

	//Henter ut killfil
	var killFile  =  getKillList();
	var personFile = getPersonList();

	//Kjører det faktiske filteret	
	hiddenCount = hiddenCount + filter(arrayList, killFile, false);
	hiddenCount = hiddenCount + filter(commentList, killFile, false);
	hiddenCount = hiddenCount + filter(arrayList, personFile, true);
	hiddenCount = hiddenCount + filter(commentList, personFile, true);
		
	
	//Legg til info i sidebar
	var my_div = document.createElement('div');
		
	my_div.innerHTML = "<h2>Filter</h2>";
	my_div.innerHTML = my_div.innerHTML +  hiddenCount+" innlegg fjernet";
	
	my_div.innerHTML = my_div.innerHTML + checkForUpdates();
	
	// insert it in the document  commands_panel or messenger
	var addTo = document.getElementById('commands_panel');
	if(addTo == undefined) addTo = document.getElementById('messenger');
	
	addTo.appendChild(my_div);

	
	
}

//Filteret
function filter(arrayList, killFile, forfatterFilter) {
	
	var counter = 0;
	var term = "placeholder";
	
	var i = 0;
	for(i = 0; i < arrayList.length; i++)
	{
		html = arrayList[i].innerHTML.toLowerCase();
		
		var j = 0;
		for(j = 0; j < killFile.length; j++)
		{
		
		//Lag regexp
		term = killFile[j].toLowerCase();
		
		if(forfatterFilter == true){
			term = "/medlem/vis/"+term;
		}
		
		//separate sga. ting som f.eks orddeling
		var fantViddal = html.search(term);
		
		//alert(term);
		
		//Gjem dersom funnet
		if(fantViddal > 0)
			{
			    //Gjemmer hele innlegget	
			    counter++;
			    arrayList[i].style.display = "none";
			   tattBort.push(arrayList[i]);
			}
		
		}
			
	}
	
	return counter;

}


function getKillList() {


	var killString = GM_getValue("killist");
	
	if(killString == undefined || trim(killString).length < 1)
	{
		var tmp = "ingen ord definert";
		GM_setValue("killist", tmp);
		killString = GM_getValue("killist");
	}
	
	var killList = new Array();
	killList = killString.split(',');
	
	
	for(var i = 0; i < killList.length; i++)
	{
		killList[i] = trim(killList[i]);
	}
		
	return killList;

}

function setKillList() {
	
	var killString = GM_getValue("killist");
	
	nyListe = prompt("Skriv inn de ordene du ønsker å filtrere bort innlegg med.\nSeparer med komma.",killString);
	
	GM_setValue("killist", nyListe);
	
	window.location.reload();
	
}

function getPersonList() {

		
	var killString = GM_getValue("personlist");
	
	if(killString == undefined || trim(killString).length < 1)
	{
		var tmp = "ingen personer definert";
		GM_setValue("personlist", tmp);
		killString = GM_getValue("personlist");
	}
	
	var killList = new Array();
	killList = killString.split(',');
	
	for(var i = 0; i < killList.length; i++)
		{
			killList[i] = trim(killList[i]);
		}

		
	return killList;

}

function setPersonList() {
	
	var killString = GM_getValue("personlist");
	
	nyListe = prompt("Skriv inn de personene du ønsker å filtrere bort innlegg fra.\nSeparer med komma.",killString);
	
	GM_setValue("personlist", nyListe);
	
	window.location.reload();
	
}


//Ser etter oppdaterte versjoner av scriptet.
function checkForUpdates() {

var newVersion = false;

var d = new Date();

//Fikser saa man bare sjekker en gang pr. dag.
var checkString = d.getYear()+"_"+d.getMonth()+"_"+d.getDate();

var lastChecked = GM_getValue("lastChecked");

if(lastChecked != checkString)
{
	GM_setValue("lastChecked", checkString);
	
	GM_xmlhttpRequest({
  	method: "GET",
  	url: "http://ting.skeib.com/underskogfilter/version.txt",
  	headers: {
    	"User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
    	"Accept": "text/xml"
  	},
  	onload: function(response) {
	
	if(response.responseText != version)
	{
		newVersion = true;
	}
	
    GM_log([
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.responseText,
      response.finalUrl,
      response.responseXML
    ].join("\n"));
  }
});

}

	
	if(newVersion) 
	{
		return ". <span style='color: red'>Ny versjon av st&oslash;yfilteret er tilgjengelig</span> - <a href='http://userscripts.org/scripts/source/49793.user.js'>klikk her for &aring; installere</a>!";
	}
	else
	{
		return "";
	}


}

window.visIgjen = function() {
	
	for(var i = 0; i < tattBort.length; i++)
	{
	
		tattBort[i].style.display = "block";
	
	}
	
	
}


window.onload = letsFilter();



//Slutt på Auduns kode, alt under her er snippet fra nettet.


document.getElementsByClassName = function(class_name) {
    var docList = this.all || this.getElementsByTagName('*');
    var matchArray = new Array();

    /*Create a regular expression object for class*/
    var re = new RegExp("(?:^|\\s)"+class_name+"(?:\\s|$)");
    for (var i = 0; i < docList.length; i++) {
        if (re.test(docList[i].className) ) {
            matchArray[matchArray.length] = docList[i];
        }
    }

	return matchArray;
}//eof annonymous function

/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/
 
function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}