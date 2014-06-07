// Version: 0.3

// ==UserScript==
// @name           Ptna wishlist cleanup v0.3
// @namespace      userscripts.org
// @description    Cleanup script for the ptna wishlist. v0.3
// @include        http://*.puretna.com/wishlist.php*
// @include        http://puretna.com/wishlist.php*
// ==/UserScript==

/* added greasemonkey variables:
ptna_seeders: contains the minimal number of seeders required
ptna_total: total number of seeders and leechers required
ptna_age: how many days old do the torrents need to be
*/

/* TODO/ROADMAP: 
 
 v0.2
 * Change indexing function
 	 * Read all data to a array on start
 	 * Create list of indexes which are selected
 * Nicer failure handling
	 * Possibility to retry failed torrents
	 * not Removed/Failed notification. But change the color of the last line.
 * Bugs
 	 * Age only changed after browser refresh

 v0.3
 * Better reset function if input changes
 * Removes torrent from page
 * Delete without refresh when clicking on link
 - Bugs
 	- Removal requests get out of sync when manual removing

 v0.4
 - Rewrite code for stored values. To remove duplicate code lines
 - AutoSelect when page loads (checkbox option)
 - AutoRemove when page loads (checkbox option)
 - AutoRefresh of page (checkbox option; currently set)

 v1.0
 - Possibility to (de)select torrents before removal
 - Better code documentation
 - Display list of selected torrents (checkbox option)
 
*/ 

var seeders = 5;
var total = 10;
var age = 30;
var maxNameLength = 120;
var agetime;
var deleteurl = 'http://www.puretna.com/wishlist.php?rmwishlist=';

var statusArea;								// Reference to the Div used to display messages
var myButton;									// Reference to the Button used for activating removal and selection
var torrentTable; 							// Reference to the Table node with all the torrents
var selectedTorrents;						// Array with the keys of the torrents in indexedTorrents that are selected.
var indexedTorrents = new Array();		// Array with all the torrents.
var failedTorrents = new Array(); 		// Array that holds all the keys(of the torrents in indexTorrents) for the torrents that failed.
var today = new Date(); 					// Date object for today
var time = today.getTime();				// Current time in milliseconds

function createWishlistPanel(){

	var allForms;
	allForms = document.getElementsByTagName('form');
	if(allForms.length!=1){return;}
		
	var myTable = document.createElement("table");
	myTable.style.width = '100%';
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
	si.addEventListener('keyup', function() {if(si.value!=seeders){changeSeeders(si.value);changeButton('SELECT');}}, false);
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
	ti.addEventListener('keyup', function() {if(ti.value!=total){changeTotal(ti.value);changeButton('SELECT');}}, false);
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
	ai.addEventListener('keyup', function() {if(ai.value!=age){changeAge(ai.value);changeButton('SELECT');}}, false);
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
	
	var cTag = document.createElement("div");
	cTag.innerHTML = 'brought to you by <a href="http://www.puretna.com/userdetails.php?id=488402">Rick</a>';
	cTag.style.textAlign = 'right';
	cTag.style.color = '#969ba8';
	cTag.style.marginBottom = '20px';
	cTag.style.width = '100%';
	
   allForms[0].parentNode.insertBefore(myTable, allForms[0].nextSibling);
   allForms[0].parentNode.insertBefore(cTag, myTable.nextSibling);
}

/*
 * Functions sets the table with the torrents
 * Sets torrentTable
 */
function setTorrentTable(){ 

 	return torrentTable = document.getElementsByTagName("table")[8];

}

/* 
 * Functions indexes all torrents
 * Sets indexedTorrents
 * @return number of torrentsindexed
 */
function indexTorrents(){
	var row1, row2, tid, thisTorrent;	

	for(i=1;i<torrentTable.rows.length;i+=2){ 		

		thisTorrent = new Array();
		thisTorrent["row1"] = row1 = torrentTable.rows[i]; 		
		thisTorrent["row2"] = row2 = torrentTable.rows[i+1]; 		
		thisTorrent["seed"] = parseInt(stripHTML(row1.cells[7].innerHTML)); 		
		thisTorrent["leech"] = parseInt(stripHTML(row1.cells[8].innerHTML)); 		
		thisTorrent["tdate"] = stripHTML(row1.cells[4].innerHTML).replace(",",""); 		
		thisTorrent["snatch"] = parseInt(stripHTML(row1.cells[6].innerHTML).replace(",","")); 		
		thisTorrent["name"] = stripHTML(row1.cells[1].getElementsByTagName('A')[0].innerHTML);
		if(thisTorrent["name"].length>maxNameLength){thisTorrent["name"]=thisTorrent["name"].substring(0,maxNameLength)+'...';}	
		thisTorrent["linkurl"] = row2.cells[1].getElementsByTagName("A")[0].href; 	
		tid = thisTorrent["linkurl"].split("=");
		if(tid.length!=2){writeStatus('ERROR! Wrong url: '+thisTorrent["linkurl"]+' should be of format: http://../wishlist.php?id=xxxxx(x)');return;}
		thisTorrent["torrentid"] = parseInt(tid[1]);	
		thisTorrent["removed"] = 0;
		thisTorrent["id"] = indexedTorrents.length;	
		
		indexedTorrents.push(thisTorrent);

		ll = row2.cells[1].getElementsByTagName("A")[0];
		ll.href='#';
		ll.id=thisTorrent["id"]+1;
		ll.addEventListener('click', removeSingleTorrent, false); 				
	}
	writeStatus(indexedTorrents.length+' torrents found');
	return(indexedTorrents.length);	
}

function selectTorrents(){
	var i=0;
	var thistorrent;
	selectedTorrents = new Array();
	
	//writeStatus('Selecting torrents with less than <i>'+seeders+' seeders</i>, less than <i>'+total+' seeders & leechers</i> and minimal <i>'+age+' days old</i>...');

	do{
		thisTorrent = indexedTorrents[i];
		if(!thisTorrent["removed"] && thisTorrent["seed"]<seeders && thisTorrent["seed"]+thisTorrent["leech"]<total && notNew(thisTorrent["tdate"])){ 						
			selectedTorrents.push(i);
		}
		i++;
	}
	while(i<indexedTorrents.length) 		
	
	if(selectedTorrents.length > 0){ 		
		changeButton('REMOVE');
		writeStatus(selectedTorrents.length+' torrents selected out of a total of '+indexedTorrents.length+' torrents. '+(indexedTorrents.length-selectedTorrents.length)+' remaining after clean up.'); 	
		markSelectedTorrents();
	} else {
		clearSelectedTorrents();	
		writeStatus('0 torrents selected');
	} 

}

/*
 * Marks the selectedTorrents. Swap color of the torrents
 */
function markSelectedTorrents(){
	
	clearSelectedTorrents();
	
	var s=0;
	do{
		(indexedTorrents[selectedTorrents[s]])["row1"].bgColor=(indexedTorrents[selectedTorrents[s]])["row2"].bgColor="navy";
		s++;
	} while(s<selectedTorrents.length)
	
}

/*
 * Unmarks all the selectedTorrents. Swap color of the torrents to default value
 */
function clearSelectedTorrents(){
	
	var i=0;
	do{
		(indexedTorrents[i])["row1"].bgColor=(indexedTorrents[i])["row2"].bgColor="";
		i++;
	} while(i<indexedTorrents.length)
}

var s=0; 	

function removeTorrents(success){
	var thisTorrent;
	
	if (success==0) { //last removal failed
		failedTorrents.push(selectedTorrents[s-1]);
	}
	
	if(s<selectedTorrents.length){ //call next torrent for removal
		thisTorrent = indexedTorrents[selectedTorrents[s]]; 		
		writeStatus('('+(s+1)+'/'+selectedTorrents.length+') '+thisTorrent["torrentid"]+' - '+thisTorrent["name"]); 		
		s++;
		removalRequest(thisTorrent, 'MULTIPLE');
	} else { //all torrents have been called for removal
		if(failedTorrents.length==0){ //all torrents where succesfully removed
			writeStatus('All selected torrents ('+selectedTorrents.length+') removed.'); 		
			changeButton('SELECT');
			//t=setTimeout("window.location.reload(true)",2000);
		} else { //some torrents failed to remove
			writeStatus((selectedTorrents.length-failedTorrents.length)+' torrents removed. '+failedTorrents.length+' failed to be removed');
			selectedTorrents = failedTorrents;
			markSelectedTorrents();
			failedTorrents = new Array();
		}
	} 
}
function removeTorrent(){s=0;removeTorrents(-1);}

function removeSingleTorrent(ev){
	
	if(ev.button==0){
		if(tid = parseInt(ev.currentTarget.id)){
			thisTorrent = indexedTorrents[tid-1];
			writeStatus('Remove single torrent: '+thisTorrent["torrentid"]+' - '+(indexedTorrents[tid-1])["name"]);
			removalRequest(thisTorrent, 'SINGLE');
			ev.preventDefault();
		}
	}
}

function removalRequest(torrent, removaltype){
	
	GM_xmlhttpRequest({
		method: 'GET',
	   url: deleteurl+torrent["torrentid"],
	   headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if(responseDetails.status==200){
				colorLastline('limegreen');
				removeFromIndex(torrent);
				if(removaltype=='MULTIPLE'){				
					removeTorrents(1);
				} else {
					selectTorrents();	
				}
			} else {
				colorLastline('red');
				if(removaltype=='MULTIPLE'){				
					removeTorrents(0);
				}
			}
		},
		onerror: function(responseDetails){
			removeTorrents(0);
	   }
	});	
}

function removeFromIndex(torrent){
	indexedTorrents[torrent["id"]]["removed"]=1;
	torrent["row1"].parentNode.removeChild(torrent["row1"]);
	torrent["row2"].parentNode.removeChild(torrent["row2"]);
}

function writeStatus(message){
	var linebreak = '<br />';
	statusArea.innerHTML = message+linebreak+statusArea.innerHTML;
	statusArea.style.scrollTop = 0;	
}	

function colorLastline(newcolor){
	statusArea.innerHTML = '<span style="font-weight:normal; color:'+newcolor+';">'+statusArea.innerHTML.replace(/<br>/, "</span><br />");	
}

function changeButton(buttonAction){
	switch(buttonAction)
	{
		case 'REMOVE':
			myButton.value = "Remove torrents";
			myButton.removeEventListener('click', selectTorrents, false);
			myButton.addEventListener('click', removeTorrent, false);
			break
		case 'SELECT':
			myButton.value = "Select torrents";
			myButton.removeEventListener('click', removeTorrent, false);
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
	agetime = age*24*60*60*1000;	
	
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
	if(!setTorrentTable())return;
	if(!indexTorrents())return;
	selectTorrents();
}

main();