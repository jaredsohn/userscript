// Version: 0.1

// ==UserScript==
// @name           Ptna wishlist cleanup v0.1
// @namespace      userscripts.org
// @description    Cleanup script for the ptna wishlist. v0.1
// @include        http://puretna.com/wishlist.php*
// @include        http://*.puretna.com/wishlist.php*
// ==/UserScript==

/* added greasemonkey variables:
ptna_seeders: contains the minimal number of seeders required
ptna_total: total number of seeders and leechers required
ptna_age: how many days old do the torrents need to be
*/

/* TODO/ROADMAP: 
 
 v0.2
 - Change indexing function
 	 - Read all data to a array on start
 	 - Create list of indexes which are selected
 - Nicer failure handling
	 - Possibility to retry failed torrents
	 - not Removed/Failed notification. But change the color of the last line.

 v0.3
 - Better reset function if input changes

 v0.4
 - Rewrite code for stored values. To remove duplicate code lines
 - Display list of selected torrents (checkbox option)
 - AutoSelect when page loads (checkbox option)
 - AutoRemove when page loads (checkbox option)
 - AutoReload of page (checkbox option; currently set)

 v1.0
 - Possibility to (de)select torrents before removal
 - Better code documentation
 
*/ 

var seeders = 5;
var total = 10;
var age = 30;
var maxNameLength = 120;
var agetime;

var statusArea;
var myButton;
var numRows;
var numTorrents;
var selectedTorrents;
var torrentTable;
var today = new Date(); 	
var time = today.getTime();

function createWishlistPanel(){
		
	var myTable = document.createElement("table");
	myTable.style.width = '100%';
	myTable.style.marginBottom = '30px';
	var headRow = document.createElement("tr");
	var headData = document.createElement("td");
	headData.innerHTML = "Wishlist cleanup";
	headData.className = "colhead";
	headData.colSpan = "7";
	headRow.appendChild(headData);
	myTable.appendChild(headRow);
	
	var firstRow = document.createElement("tr");

	var sl = document.createElement("td");
	sl.innerHTML = 'Min. seeders';
	var sd = document.createElement("td");
	sd.style.borderLeft = '1px red';
	sd.style.borderRight = '1px red';
	var si = document.createElement("input");
	si.type = "number";
	si.name = "seeders";
	si.size = 4;
	si.value = seeders;
	si.min = 0;
	si.addEventListener('change', function() {changeSeeders(si.value);changeButton('SELECT');}, false);
	sd.appendChild(si);
	firstRow.appendChild(sl);	
	firstRow.appendChild(sd);	

	var tl = document.createElement("td");
	tl.innerHTML = 'Min. total';
	tl.style.borderRight = '0px';
	var td = document.createElement("td");
	var ti = document.createElement("input");
	ti.type = "number";
	ti.name = "total";
	ti.size = 4;
	ti.value = total;
	ti.min = 0;
	ti.addEventListener('change', function() {changeTotal(ti.value);changeButton('SELECT');}, false);
	td.appendChild(ti);
	firstRow.appendChild(tl);	
	firstRow.appendChild(td);	

	var al = document.createElement("td");
	al.innerHTML = 'Min. days old';
	al.style.borderRight = '0px';
	var ad = document.createElement("td");
	var ai = document.createElement("input");
	ai.type = "number";
	ai.name = "age";
	ai.size = 4;
	ai.value = age;
	ai.min = 0;
	ai.addEventListener('change', function() {changeAge(ai.value);changeButton('SELECT');}, false);
	ad.appendChild(ai);
	firstRow.appendChild(al);	
	firstRow.appendChild(ad);	


	var bd = document.createElement("td");
	bd.align = "right";
	myButton = document.createElement("input");
	myButton.type = "button";
	changeButton('SELECT');
	bd.appendChild(myButton);
	firstRow.appendChild(bd);
	
	myTable.appendChild(firstRow);	

	var secondRow = document.createElement("tr");
	var secondRowData = document.createElement("td");
	secondRowData.colSpan = "7";
	var sa = document.createElement("div");
	sa.id = "statusarea";
	sa.style.height = '80px';
	sa.style.color = '#000';
	sa.style.padding = '5px';
	sa.style.backgroundColor = '#fff';
	sa.style.overflow = 'auto';
	statusArea = sa;
	secondRowData.appendChild(sa);
	secondRow.appendChild(secondRowData);
	
	myTable.appendChild(secondRow);	

	var allForms;
	allForms = document.getElementsByTagName('form');
	if(allForms.length!=1){return;}
	
   allForms[0].parentNode.insertBefore(myTable, allForms[0].nextSibling);
}

/* Selects the table with torrents by looking for the biggest table */
function countTorrents(){ 

	var allTables = document.getElementsByTagName("table");
	var rows=0;
	var biggestTable=0;
	 for(i=0;i<allTables.length;i++){
	 	rr = allTables[i].rows.length;
	 	if(rr > rows){ 			
	 		rows = rr; 			
	 		biggestTable = i; 		
	 	}
 	}
 	numRows = ((rows-1)/2);
 	writeStatus('Number of torrents in the wishlist: '+numRows); 	
 	torrentTable = allTables[biggestTable];
}

function selectTorrents(){
	var row1, row2, thistorrent;	

	writeStatus('Selecting torrents with less than <i>'+seeders+' seeders</i>, less than <i>'+total+' seeders & leechers</i> and minimal <i>'+age+' days old</i>...');

	numTorrents = 0;
	selectedTorrents = new Array();
	for(i=1;i<torrentTable.rows.length;i+=2){ 		

		row1 = torrentTable.rows[i]; 		
		row2 = torrentTable.rows[i+1]; 		
	
		thistorrent = new Array();
		thistorrent["seed"] = parseInt(stripHTML(row1.cells[7].innerHTML)); 		
		thistorrent["leech"] = parseInt(stripHTML(row1.cells[8].innerHTML)); 		
		thistorrent["tdate"] = stripHTML(row1.cells[4].innerHTML).replace(",",""); 		
//		thistorrent["snatch"] = parseInt(stripHTML(row1.cells[6].innerHTML).replace(",","")); 		

		if(thistorrent["seed"]<seeders && thistorrent["seed"]+thistorrent["leech"]<total && notNew(thistorrent["tdate"])){ 					
			thistorrent["name"] = stripHTML(row1.cells[1].getElementsByTagName('A')[0].innerHTML);
			if(thistorrent["name"].length>maxNameLength){thistorrent["name"]=thistorrent["name"].substring(0,maxNameLength)+'...';}
			thistorrent["linkurl"] = row2.cells[1].getElementsByTagName("A")[0].href; 	
			selectedTorrents[numTorrents]=thistorrent; 			
			tid = thistorrent["linkurl"].split("=");
			if(tid.length!=2){writeStatus('ERROR! Wrong url: '+thistorrent["linkurl"]+' should be of format: http://../wishlist.php?id=xxxxx(x)');return;}
			thistorrent["torrentid"] = parseInt(tid[1]);	
		
			row1.bgColor="navy"; 			
			row2.bgColor="navy"; 			
			numTorrents++;

		} else {	
			row1.bgColor=""; 			
			row2.bgColor=""; 		
		}
	} 	
	writeStatus(numTorrents+' torrents selected out of a total of '+numRows+' torrents. '+(numRows-numTorrents)+' remaining after clean up.'); 	
	
	if(numTorrents>0){ 		
		changeButton('REMOVE');
	} 

}

var c=0; 	
var t=0;
var failed=0; 	
var popwindow; 

function removeTorrents(){
	var thistorrent, tid;
	
	if(c<selectedTorrents.length){ 		
		thistorrent = selectedTorrents[c]; 		
		c++; 		

		writeStatus('('+c+'/'+numTorrents+') '+thistorrent["torrentid"]+' - '+thistorrent["name"]); 		
		removalRequest(thistorrent["torrentid"]);		
	} else { 		
		if(failed==0){
			writeStatus('All selected torrents ('+numTorrents+') removed.'); 		
			t=setTimeout("window.location.reload(true)",2000);
		} else {
			writeStatus((numTorrents-failed)+' torrents removed. '+failed+' failed to be removed');
			failed=0;
							
			//t=setTimeout("window.location.reload(true)",2000);
		}
	} 
}

function removalRequest(torrentid){
	GM_xmlhttpRequest({
		method: 'GET',
	   url: 'http://www.puretna.com/wishlist.php?rmwishlist='+torrentid,
	   headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			writeStatus('removed!');
			removeTorrents();		
		},
		onerror: function(responseDetails){
			writeStatus('failed!');
			failed++;
			removeTorrents();		
	   }
	});	
}

function writeStatus(message){
	var linebreak = '<br />';
	statusArea.innerHTML = message+linebreak+statusArea.innerHTML;
	statusArea.style.scrollTop = 0;	
}	

function changeButton(buttonAction){
	switch(buttonAction)
	{
		case 'REMOVE':
			myButton.value = "Remove torrents";
			myButton.removeEventListener('click', selectTorrents, false);
			myButton.addEventListener('click', removeTorrents, false);
			break
		case 'SELECT':
			myButton.value = "Select torrents";
			myButton.removeEventListener('click', removeTorrents, false);
			myButton.addEventListener('click', selectTorrents, false);
			break
	}
}

function initStoredValues(){

	var get_seeders = GM_getValue("ptna_seeders");
	if(get_seeders != undefined) {	
		seeders = parseInt(get_seeders); 
	} else {
		GM_setValue("ptna_seeders", seeders);	
	}

	var get_total = GM_getValue("ptna_total");
	if(get_total != undefined) {	
		total = parseInt(get_total); 
	} else {
		GM_setValue("ptna_total", total);	
	}

	var get_age = GM_getValue("ptna_age");
	if(get_age != undefined) {	
		age = parseInt(get_age); 
	} else {
		GM_setValue("ptna_age", age);	
	}
	agetime = age*24*60*60*1000;	

}

function changeSeeders(new_value) {
	var blankRE=/^\s*$/;
	if (isNaN(new_value) || (blankRE.test(new_value))) { // not a number
		seeders = 0;
		GM_setValue("ptna_seeders", 0);			
	}
	else {
		seeders = parseInt(new_value);
		GM_setValue("ptna_seeders", seeders);			
	}	
}

function changeTotal(new_value) {
	var blankRE=/^\s*$/;
	if (isNaN(new_value) || (blankRE.test(new_value))) { // not a number
		total = 0;
		GM_setValue("ptna_total", 0);			
	}
	else {
		total = parseInt(new_value);
		GM_setValue("ptna_total", total);			
	}	
}

function changeAge(new_value) {
	var blankRE=/^\s*$/;
	if (isNaN(new_value) || (blankRE.test(new_value))) { // not a number
		age = 0;
		GM_setValue("ptna_age", 0);			
	}
	else {
		age = parseInt(new_value);
		GM_setValue("ptna_age", age);			
	}	
}

function stripHTML(str){       
	var re= /<\S[^><]*>/g;       
	return str.replace(re, "") 
} 

function notNew(tdate){ 	
	td = tdate.split("&nbsp;")[0].split("-");
	tday = td[1];
	tmonth = td[0];
	tyear = today.getFullYear();
	if(time<Date.parse(tmonth+" "+tday+", "+tyear)){
		tyear--;
	}
	return (time-agetime)>Date.parse(tmonth+" "+tday+", "+tyear);
}

function main(){
	if (!GM_xmlhttpRequest) {
		alert('Please upgrade to the latest version of Greasemonkey (>= v0.2.6)');
		return;
	}
	initStoredValues();
	createWishlistPanel();
	countTorrents();
	selectTorrents();
}

main();