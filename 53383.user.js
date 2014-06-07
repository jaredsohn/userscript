// ==UserScript==
// @name		Craigslist Job Filter
// @description	Adds a "Remove" button to each result in the "all jobs" section of craigslist to filter out job types. Live add and removal of filters.
// @include		http://*.craigslist.org/jjj/*
// @include		http://*.craigslist.ca/jjj/*
// @namespace	http://www.junk-drawer-mind.com/
// ==/UserScript==

/********** NOTES *******************************************\
Filters are based off craigslist's acronyms for each job type
Some of the acrynyms aren't very obvious
TO DO:
	Clean up code and make it look "pretty" :)

Special Thanks to: 	
	http://diveintogreasemonkey.org
	Went from zero knowledge to writing this in an afternoon
	
*************************************************************/
var jobTypes=new Array(
	"/ofc/", //admin/office jobs
	"/bus/", //business jobs
	"/csr/", //customer service jobs
	"/edu/", //education jobs
	"/egr/", //engineering jobs
	"/etc/", //etcetera jobs
	"/acc/", //finance jobs
	"/fbh/", //food/bev/hosp jobs
	"/lab/", //general labor jobs
	"/gov/", //government jobs
	"/hea/", //healthcare jobs
	"/hum/", //human resource jobs
	"/eng/", //internet engineering jobs
	"/lgl/", //legal jobs
	"/mnu/", //manufacturing jobs
	"/mar/", //marketing jobs
	"/med/", //media jobs
	"/npo/", //nonprofit jobs
	"/rej/", //real estate jobs
	"/rfh/", //retail/food/hospitality jobs
	"/ret/", //retail/wholesale jobs
	"/sls/", //sales jobs
	"/spa/", //salon/spa/fitness
	"/sci/", //science jobs
	"/sec/", //security jobs
	"/trd/", //skilled trades jobs
	"/sof/", //software jobs
	"/sad/", //systems/networking jobs
	"/tch/", //tech support jobs
	"/trp/", //transport jobs
	"/tfr/", //tv video radio jobs
	"/web/", //web design jobs
	"/wri/"  //writing jobs
);
var jobNames=new Array;
jobNames["/ofc/"]="admin/office " 
jobNames["/bus/"]="business " 
jobNames["/csr/"]="customer service " 
jobNames["/edu/"]="education " 
jobNames["/egr/"]="engineering " 
jobNames["/etc/"]="etcetera " 
jobNames["/acc/"]="finance " 
jobNames["/fbh/"]="food/bev/hosp " 
jobNames["/lab/"]="general labor " 
jobNames["/gov/"]="government " 
jobNames["/hea/"]="healthcare " 
jobNames["/hum/"]="human resource " 
jobNames["/eng/"]="internet engineering " 
jobNames["/lgl/"]="legal " 
jobNames["/mnu/"]="manufacturing " 
jobNames["/mar/"]="marketing " 
jobNames["/med/"]="media " 
jobNames["/npo/"]="nonprofit " 
jobNames["/rej/"]="real estate " 
jobNames["/rfh/"]="retail/food/hospitality " 
jobNames["/ret/"]="retail/wholesale " 
jobNames["/sls/"]="sales " 
jobNames["/spa/"]="salon/spa/fitness" 
jobNames["/sci/"]="science " 
jobNames["/sec/"]="security " 
jobNames["/trd/"]="skilled trades " 
jobNames["/sof/"]="software " 
jobNames["/sad/"]="systems/networking " 
jobNames["/tch/"]="tech support " 
jobNames["/trp/"]="transport " 
jobNames["/tfr/"]="tv video radio " 
jobNames["/web/"]="web design " 
jobNames["/wri/"]="writing "  
   
var filters = new Array();
var filtered, filtersElement;

//GM_log(GM_listValues())
allH4 = document.getElementsByTagName('h4');
filtersElement = document.createElement('h4');


allH4[0].parentNode.insertBefore(filtersElement, allH4[0]);
var filterActive='';

//checks for previously set GM_value and adds them to the filter list
function pushFilter(){	
	for(var e = 0; e<jobTypes.length; e++){
		//var removeJob = document.getElementById(jobTypes[e]);
		//GM_getValue(jobTypes[e], false);
		if (GM_getValue(jobTypes[e])==true){
			filters.push(jobTypes[e]);
		}
	}	
}
pushFilter()

//checks the currently active filters and displays them
function initiateFilters(){
	if(filters[0]!=undefined){
		for(var i=0; i<filters.length;i++){
			var newButton = document.createElement("button");
			newButton.id=filters[i];
			for(n in jobNames){
			
				if(n==filters[i].toString()){
					
					newButton.title=filters[i]
					newButton.innerHTML=jobNames[n]
				}
			}
			
			filtersElement.parentNode.insertBefore(newButton, filtersElement.nextSibling);
			filtersElement.innerHTML='Active Filters: <smal>(click to restore result)</small>';
			newButton.addEventListener('click', function(event) {
				window.setTimeout(function() {
					event.target.parentNode.removeChild(event.target);
					//GM_log("removedButton")
					restoreJobs(event.target.id);
		
				}, 0);
			}, false);
		}
	}else{
		//GM_log('No Filters Defined')
		filtersElement.innerHTML='No Active Filters: <small>(click REMOVE to filter out job types)</small>';
	}
	
	allH4[0].parentNode.insertBefore(filtersElement, allH4[0]);
}
initiateFilters();

function updateFilters(jobTag){
	filtersElement.innerHTML='Active Filters: <smal>(click to restore result)</small>';
	var newButton = document.createElement("button");
	newButton.id=jobTag;
	newButton.innerHTML=jobTag;
	for(n in jobNames){
		if(n==jobTag){
			
			newButton.title=jobTag
			newButton.innerHTML=jobNames[n]
		}
	}	
	filtersElement.parentNode.insertBefore(newButton, filtersElement.nextSibling);
	newButton.addEventListener('click', function(event) {
		window.setTimeout(function() {
			event.target.parentNode.removeChild(event.target);
			//GM_log("removedButton")
			
			restoreJobs(event.target.id);
		}, 0);
	}, false);
}


var allLinks, jobLinks, thisLink, thisJob;

//Add "filter" to each result"
for(var n=0; n<jobTypes.length;n++){

	jobLinks = document.evaluate(
		"//a[@href='"+jobTypes[n]+"']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for (var j = 0; j < jobLinks.snapshotLength; j++) {
			thisJob = jobLinks.snapshotItem(j);
			var newElement = document.createElement("span");
			newElement.id=jobTypes[n];		
			newElement.innerHTML=' <button type="button" style="font-size:7px;">REMOVE</button>';
			thisJob.parentNode.parentNode.insertBefore(newElement, thisJob.nextSibling);
			newElement.addEventListener('click', function(event) {
			window.setTimeout(function() {
				//filtersElement.parentNode.removeChild(filtersElement);
				//GM_log(event.target.parentNode.id)
				var selectedJob = event.target.parentNode.id
				GM_setValue(selectedJob, true);
				filters.push(event.target.parentNode.id)
				//pushFilter();
				removeJobs();
				updateFilters(selectedJob);
			}, 0);
		}, false);
	}
}

//REMOVES FILTERED RESULTS
function removeJobs(){
	for(var k=0; k<filters.length;k++){
	allLinks = document.evaluate(
		"//a[@href='"+filters[k]+"']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for (var i = 0; i < allLinks.snapshotLength; i++) {
			thisLink = allLinks.snapshotItem(i);
			thisLink.style.color="red";
			var removeThis=thisLink.parentNode.parentNode;
			//removeThis.parentNode.removeChild(removeThis);
			removeThis.style.display="none"
			
		}
	}
}
removeJobs();

//RESTORES filtered job
function restoreJobs(restoreThis){
	filters.splice(filters.indexOf(restoreThis), 1)
	GM_setValue(restoreThis,"")
	allLinks = document.evaluate(
		"//a[@href='"+restoreThis+"']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for (var i = 0; i < allLinks.snapshotLength; i++) {
			thisLink = allLinks.snapshotItem(i);
			var restoreThis=thisLink.parentNode.parentNode;
			//removeThis.parentNode.removeChild(removeThis);
			restoreThis.style.display="block"
		}
	
	if(filters[0]==undefined){
		filtersElement.innerHTML='No Active Filters: <small>(click REMOVE to filter out job types)</small>';
	}
}