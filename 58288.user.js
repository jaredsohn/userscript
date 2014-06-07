// ==UserScript==
// @name           GCIgnoreList
// @namespace      madd.in
// @include        http://www.geocaching.com/map/default.aspx*
// ==/UserScript==

// globals
const version="0.01" // will be checked once the day
const scriptId = 'gcignorelist'; 
const DEBUG = false;
var ignoredCaches = eval(GM_getValue('ignoredCaches',new Array()));


function log(str) {
	if(DEBUG) {GM_log("LOG:"+str);}
}
function error(str) {
	GM_log("error: "+str);
}

function $$(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
 }

init();

function isCacheIgnored(marker){
	for (var i = 0; i < ignoredCaches.length; i++) {
		if(marker.waypointId == ignoredCaches[i]) return true;
	}	
	return false;
}

function init(){
	log("init ignore list");
		
	// create table for hidden caches
	var hiddenCachesDiv = document.createElement('div');
	hiddenCachesDiv.style.width = "235px";
	hiddenCachesDiv.innerHTML =
		'<em><span id="spanHiddenCacheCount">0</span> caches hidden</em><span style="float:right" >[<a style="cursor:pointer">show all</a>]&nbsp;[<a style="cursor:pointer">hide all</a>]</span><div style="height:150px;overflow:auto"><table border="0"  cellspacing="0" cellpadding="3" class="dataTable" >'+
		'	<thead>'+
		'		<tr><td></td><td style="width:100%">Cache Name</td><td celltype="cacheGCCode">GC Code</td></tr>'+
		'	</thead>'+
		'	<tbody id="hiddenCacheListBody"/>'+
		'</table></div>';
	var links = $$('a',hiddenCachesDiv);
	links[0].addEventListener('click',showHiddenCaches,false);
	links[1].addEventListener('click',hideHiddenCaches,false);
	
	
	var cacheList = $$('#cacheListBounding')[0];
	cacheList.parentNode.appendChild( hiddenCachesDiv );
	
	
	unsafeWindow.origUpdateSideBarList=unsafeWindow.updateSideBarList;
	unsafeWindow.updateSideBarList=myUpdateSideBarList;
	unsafeWindow.updateSideBarList();	

}

function showHiddenCaches(){
	for (var i=0; i<currentHiddenCaches.length; i++){
		currentHiddenCaches[i].show();
	}
}
function hideHiddenCaches(){
	for (var i=0; i<currentHiddenCaches.length; i++){
		currentHiddenCaches[i].hide();
	}
}

function myUpdateSideBarList() {
	log("myUpdateSideBarList");
	
	var mrks = unsafeWindow.mrks;
	log("mrks.length:"+mrks.length);
	currentHiddenCaches = new Array();
	var currentShownCaches = new Array();
	
	
	var d = 0;
	var shownMrks = new Array();
	var e = unsafeWindow.map.getBounds();
	for ( var c = 0, a = mrks.length; c < a; c++) {
		var b = mrks[c];
		if (e.containsLatLng(b.getLatLng())) {
			shownMrks.push(b);
		}
	}
	
	log("shownMrks.length:"+shownMrks.length);
	
	
	for (var i=0; i<shownMrks.length; i++){
		if(isCacheIgnored(shownMrks[i])){
			log("hide "+shownMrks[i].waypointId);
			
			mrks[i].hide();
			currentHiddenCaches.push(shownMrks[i]);
			
		} else {
			currentShownCaches.push(shownMrks[i]);
		}
	}
		
	log("currentHiddenCaches.length:"+currentHiddenCaches.length);		
	log("currentShownCaches.length:"+currentShownCaches.length);		
		
		
		var hiddenCacheListBody = $$('#hiddenCacheListBody')[0];
		hiddenCacheListBody.innerHTML = "";
		if(currentHiddenCaches.length == 0){
			hiddenCacheListBody.parentNode.style.display = 'none';
		} else {
			hiddenCacheListBody.parentNode.style.display = 'block';
			for (var i=0; i<currentHiddenCaches.length; i++){
				var tr = document.createElement('tr');
				
				var td = document.createElement('td');tr.appendChild(td);
				td.innerHTML = "<img src='../images/wpttypes/sm/"+currentHiddenCaches[i].wptTypeId+".gif'/>";
				
				td = document.createElement('td');tr.appendChild(td);
				td.innerHTML = "<a href='http://www.geocaching.com/seek/cache_details.aspx?wp="+currentHiddenCaches[i].waypointId+"'>"+currentHiddenCaches[i].waypointTitle+"</a>";
				
				var addButton = document.createElement('img');addOpacityEffects(addButton);
				addButton.src = addImage;
				addButton.style.cssFloat = "right";
				addButton.style.cursor = 'pointer';
				addButton.alt = "show this cache"
				addButton.title = "show this cache"
				addButton.addEventListener('click',showCache(currentHiddenCaches[i]),true);
				td.appendChild(addButton);
				
				td = document.createElement('td');tr.appendChild(td);
				td.innerHTML = currentHiddenCaches[i].waypointId;
			
				hiddenCacheListBody.appendChild(tr);
				
			}
		}
		// set the counter
		$$('#spanHiddenCacheCount')[0].innerHTML = currentHiddenCaches.length;
	
	
		unsafeWindow.origUpdateSideBarList();
		
		// add the remove buttons		
		for (var i=0; i<currentShownCaches.length; i++){
			 var cacheTr = $$('#ctRow'+currentShownCaches[i].mrkrIndex)[0];
			 
			 
			 var ignoreButton = document.createElement('img');addOpacityEffects(ignoreButton);
			ignoreButton.src = removeImage;
			ignoreButton.style.cssFloat = "right";
			ignoreButton.style.clear = "both";
			ignoreButton.style.cursor = 'pointer';
			ignoreButton.alt = "ignore this cache"
			ignoreButton.title = "ignore this cache"
			ignoreButton.addEventListener('click',ignoreCache(currentShownCaches[i]),true);
			
			if(cacheTr){
				//~ cacheTr.childNodes[2].firstChild.appendChild(ignoreButton);
			cacheTr.childNodes[1].appendChild(ignoreButton);
			} else {
				error("--- error ---");
				error("cachetr is not there :-(");
				error("#ctRow"+currentShownCaches[i].mrkrIndex+"");
				var mrkIndex = "";
				for(var j = 0; j < shownMrks.length; j++){
					mrkIndex += shownMrks[i].mrkrIndex+",";
				}
				error("current shown marker index:"+mrkIndex);
				error("--- rorre ---");
			}
		}
		
		
		
}

function ignoreCache(marker){
	return function(e){
		e.stopPropagation();
		ignoredCaches.push(marker.waypointId);
		GM_setValue('ignoredCaches',uneval(ignoredCaches));
		unsafeWindow.updateSideBarList();
	}
}

function showCache(marker){
	return function(e){
		e.stopPropagation();		
		for (var i=0; i<ignoredCaches.length; i++){
			log(ignoredCaches[i] +"  " + marker.waypointId);
			if(ignoredCaches[i] == marker.waypointId){
				ignoredCaches.splice(i,1);
				break;
			}
		}
		marker.show();
		GM_setValue('ignoredCaches',uneval(ignoredCaches));
		unsafeWindow.updateSideBarList();
	}
}
	

// opacity effects
function addOpacityEffects(element){element.style.opacity = '0.4';element.addEventListener('mouseover', addOpacityEffect(element),false);element.addEventListener('mouseout',  removeOpacityEffect(element),false);}
function addOpacityEffect(element){return function(){	element.style.opacity = '1';}}
function removeOpacityEffect(element){return function(){element.style.opacity = '0.4'}}

// debug props
function show_props(obj, obj_name) { 
    var result = "" 
    for (var i in obj) 
        result += obj_name + "&quot." + i + " = " + obj[i] + "\n" 
    return result; 
} 

var removeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0'+
'IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJFRATCOAgSEsAAAAZ'+
'dEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB%2BElEQVQ4y63UPUhVYRwG8J961ax73WyR8OMaiEIUlYk3'+
'XGuwGrQhXNLyEkVD0VJLYtJ2kYKC5oIWB8dolKJCJQiUpmqMFs2PLL9Ow32PHG%2BBiy88cHj%2F5%2F%2Fw%2FD%2Bet8'+
'zOUxZQgVRARYhtYiNgE1HAdmLyuwJVOIBaZFAd4n%2BwhEWsYC1BuIMkFRIbMnSNMTLHVES0yq9ZpguMpsmhMfybSopJkm'+
'TzDKyyHBH9D6ssDzGIllKycuxHQ56BOGGRhQnGL3O3n%2BHnvJ5nKY4HssaQWw6VqMvQFSt5z9t6%2BhTLyKW5eIlHpcpC'+
'mXWBQw2yY4zESgLJEbTi9BOeJkliZQVGkQ0canE0buwE40FJK04943GSpJsHL3gVEc0yjaOoTYX6qptohwlm9lHeSbabjj'+
'w346nc4%2F4kMw2s93OmmbawHuWpkoW0QdVv6q7S089AfH%2BH2wUmUVFZ3KkdJ4UtrH1hro3jZ%2Bn6RnWSpI8r03zETx'+
'w8z0n4ymxY1K3tZhcYTTYyRg%2FXcQxNaK%2Bnd5GFiGiMkWSzK1GXJle6iA95iQvoQGc9vR94E48%2FQ1c8%2FtiQ0Rpb'+
'P%2Fh8rphonpXvzNewcYJDw%2FQVuNXMYbjBtXd8wgLWSy3SMsTgbhbJF%2FuX3c1vjWlyBUZnmY5NO8fUGCOhnH9Mu2fP'+
'SNlePWx%2FAUvH6WUTamktAAAAAElFTkSuQmCC';

var addImage ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4'+
'c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJFRUMBVUA%2BIMAAAAZdEVY'+
'dENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACPklEQVQ4y52Uz0sUYRjHP%2FPO7M7%2B1P2V2mZkJCUoFYQgFJ6'+
'CIOoSRdChuhRCBy%2FSyTChQugWHQT%2FgQg8dDEoCPQW0qGS9OAhTMyEXXfZdHZnZ%2Bbt4Ds1LCtq7%2BVl3pnnw%2Ff7'+
'vM934P%2BWtufBPgC62iXgqV3qB4SEgTiQAELqzAOkOAAkBLQARzoncmNamJNAu4IaepMCrcGybycO5A%2BPZkZivea91JX'+
'4dZEQm9bn2gpQ1ZsUGA19EEAEyCXORy5kriXHADRDi0R7whejp8NW5YP10WiARIGYeq4BVfW%2BBejM3WkdDcqXrrSLryvv'+
'AM9ogLTlx7NDTsEtb7wozQAFwAHaOh6mh4ysfjyovzJnTVpf7B9AzVdkAKnkYHQg1meOAJjHQpfXnhSeu5teKXbO7E0MRG%'+
'2FtyNgpsFedrxsvS6%2BATcDWAz1ozz%2FKToqoyAAYKf1o66X4VWlLL30jeVtPipQPka6s%2F3xWHHaL3pIC1X1rWtuD1F'+
'kjrXcHeyBMLZa723o%2FqASgMmtN1Zbr33xIcCDF1ny14NXlotll9AtTJHabJnvNWVgbLzwFVoHfqocyeM1OdcleL73Zeh%'+
'2FpCWVDHcapRoh0pLM%2BURx2Cv8s%2BVp9RRJw1ZVvVWateafsLka6Q2dERCT%2FWpqzJstvt2eAX%2Bpbb7cYCMAE0sAJ'+
'YDD%2FODvdPZ2XXVPtC0A%2FcEhlTtsr%2Ff5cmWoQU5mbyb7qsr2y%2Fan2HSgrNXI%2FvxE%2Fb4YKq6Fs1Pzm7hfULMS'+
'yGcBffwBbLMKvbxUVbgAAAABJRU5ErkJggg%3D%3D';

// auto update
function update(){
	var updateDate = eval(GM_getValue('updateDate'));
	if(!updateDate){
		updateDate = new Date();
		GM_setValue('updateDate',uneval(updateDate));
	 }
	var currentDate = new Date();
	
	// if the last updateDate is more than 86 400 000 msec (1 day) ago - check for updates
	if(currentDate.getTime() - updateDate.getTime() > 86400000){
		// set the new updateDate
		GM_setValue('updateDate',uneval(currentDate));
		// make the version request
		var details = new Object();
		details.method = 'GET';
		details.url = 'http://gc.madd.in/gm/updates.xml';
		details.onload = function(response) {parseUpdateXMLResponse(response.responseText)};
		details.onerror = function(response) { alert('An error occour - please send an EMail to geocaching@madd.in!');};
		GM_xmlhttpRequest(details);
	}
}

function parseUpdateXMLResponse(xmlString){
	var updateNode;
	
	var xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml");
	
	var string = '';
	
	
	var scriptElements = xmlDoc.getElementsByTagName('script');
	
	for(var i = 0;i< scriptElements.length;i++){
		if ( scriptElements[i].getAttribute ('id') == scriptId){
			var versions = scriptElements[i].getElementsByTagName('version');
			var currentVersion = 0; 
			var currentVersionIndex; 
			for(var j = 0;j< versions.length;j++){
				if(versions[j].getAttribute('number') > currentVersion){
					currentVersion = versions[j].getAttribute('number');
					currentVersionIndex = j;
				}
			}
			
			if (currentVersion > version){
				updateNode = versions[currentVersionIndex];
			}			
		}		
	}
	
	
	
	
	if(updateNode){
		var confirmString = 'There is a new version of GCIgnoreList.\n\t'+version+' -> '+updateNode.getAttribute('number')+'\nChanges:\n';
		
		var changes = updateNode.getElementsByTagName('change');
		for(var j = 0;j< changes.length;j++){
				confirmString += '\t+ '+changes[j].textContent+'\n';
		}
		confirmString += '\nDo you want to update?';
		if (confirm(confirmString)) {
			GM_openInTab('http://gc.madd.in/gm/update.php?scriptId='+scriptId+'&fromVersion='+version+'&toVersion='+updateNode.getAttribute('number'));
		}
	}
}
update();
