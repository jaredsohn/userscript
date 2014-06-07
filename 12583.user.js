// Version: 0.4

// ==UserScript==
// @name           Ptna wishlist cleanup v0.4
// @namespace      userscripts.org
// @description    Cleanup script for the ptna wishlist. v0.4
// @include        http://*.puretna.com/wishlist.php*
// @include        http://puretna.com/wishlist.php*
// ==/UserScript==

/* added greasemonkey variables:
ptna_seeders: 		contains the minimal number of seeders required
ptna_total:			total number of seeders and leechers required
ptna_age: 			how many days old do the torrents need to be
ptna_autoselect:	should the script start selecting torrents when it loads
ptna_autodelete:	should the script start deleting when it loads
ptna_autorefresh:	should the page refresh after all torrents have been succesfully removed.
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
 * Remove torrent from page without refresh
 * Delete without refresh when clicking on link
 - Bugs
 	- Removal requests get out of sync when manual removing

 v0.4
 * Rewrite code for stored values. To remove duplicate code lines
 * AutoSelect when page loads (checkbox option)
 * AutoRemove when page loads (checkbox option)
 * AutoRefresh of page (checkbox option; currently set)
 * Selected torrents are moved to the top of the list

 v1.0
 - Possibility to (de)select torrents before removal
 - Better code documentation
 
*/ 

var seeders = 5;								// Default value for the Seeders setting. Is used for the seeders StoredValue object after initialization
var total = 10;								// Default value for the Total setting. Is used for the total StoredValue object after initialization
var age = 30;									// Default value for the Age setting. Is used for the age StoredValue object after initialization
var autoselect = false;						// Default value for the AutoSelect setting. Is used for the autoselect StoredValue object after initialization
var autodelete = false;						// Default value for the AutoDelete setting. Is used for the autodelete StoredValue object after initialization
var autorefresh = true;						// Default value for the AutoRefresh setting. Is used for the autorefresh StoredValue object after initialization
var maxNameLength = 120;					// Max length of the torrentname in the status field. 
var multiplier = 24*60*60*1000;			// Multiplier to calculate days into milliseconds 
var highlight = "#DCAE69";					// Color for the highlighter rows

var statusArea;								// Reference to the Div used to display messages
var myButton;									// Reference to the Button used for activating removal and selection
var torrentTable; 							// Reference to the Table node with all the torrents
var selectedTorrents;						// Array with the keys of the torrents in indexedTorrents that are selected.
var indexedTorrents = new Array();		// Array with all the torrents.
var failedTorrents = new Array(); 		// Array that holds all the keys(of the torrents in indexTorrents) for the torrents that failed.
var today = new Date(); 					// Date object for today
var time = today.getTime();				// Current time in milliseconds

/*
 * Creates a table with the input fields and a statusarea.
 * The panel is placed after the form element
 */
function createWishlistPanel(){

	// Checks if there is a form element
	var allForms;
	allForms = document.getElementsByTagName('form');
	if(allForms.length!=1){return;}
		
	// Create a table and the headerRow	
	var myTable = document.createElement("table");
	myTable.style.width = '100%';
	var headRow = document.createElement("tr");
	var headData = document.createElement("td");
	headData.innerHTML = "Wishlist cleanup";
	headData.className = "colhead";
	headData.colSpan = "13";
	headRow.appendChild(headData);
	
	// Create the firstrow with all the form elements
	var firstRow = document.createElement("tr");
	firstRow.appendChild(seeders.getLabel());	
	firstRow.appendChild(seeders.getForm());	
	firstRow.appendChild(total.getLabel());	
	firstRow.appendChild(total.getForm());	
	firstRow.appendChild(age.getLabel());	
	firstRow.appendChild(age.getForm());	
	firstRow.appendChild(autoselect.getLabel());	
	firstRow.appendChild(autoselect.getForm());	
	firstRow.appendChild(autodelete.getLabel());	
	firstRow.appendChild(autodelete.getForm());	
	firstRow.appendChild(autorefresh.getLabel());	
	firstRow.appendChild(autorefresh.getForm());	

	// Create the submit button
	var buttonData = document.createElement("td");
	buttonData.align = "right";
	myButton = document.createElement("input");
	myButton.type = "button";
	setButtonState('SELECT');
	buttonData.appendChild(myButton);
	firstRow.appendChild(buttonData);
	
	// Create the second table row with a Div for the status messages
	var secondRow = document.createElement("tr");
	var secondData = document.createElement("td");
	secondData.colSpan = headData.colSpan;
	statusArea = document.createElement("div");
	statusArea.id = "statusarea";
	statusArea.style.height = '80px';	statusArea.style.color = '#000';	statusArea.style.padding = '5px';	statusArea.style.backgroundColor = '#fff';	statusArea.style.overflow = 'auto';
	secondData.appendChild(statusArea);
	secondRow.appendChild(secondData);
	
	// Add the three rows to the created table
	myTable.appendChild(headRow);
	myTable.appendChild(firstRow);	
	myTable.appendChild(secondRow);	
	
	// Create a link to the user profile
	var profileLink = document.createElement("div");
	profileLink.innerHTML = 'brought to you by <a href="http://www.puretna.com/userdetails.php?id=488402">Rick</a>';
	profileLink.style.textAlign = 'right';	profileLink.style.color = '#969ba8';	profileLink.style.marginBottom = '20px';	profileLink.style.width = '100%';
	
	// Add the table and profile link after the formfield
   allForms[0].parentNode.insertBefore(myTable, allForms[0].nextSibling);
   allForms[0].parentNode.insertBefore(profileLink, myTable.nextSibling);
}

/*
 * Functions sets the table with the torrents
 * @set torrentTable
 */
function setTorrentTable(){ 
 	return torrentTable = document.getElementsByTagName("table")[8];
}

/* 
 * Functions indexes all torrents
 * @set indexedTorrents
 * @return number of torrents indexed
 */
function indexTorrents(){
	var row1, row2, tid, thisTorrent;	

	// Loop through all table rows. Skip the headRow and use steps of 2
	for(i=1;i<torrentTable.rows.length;i+=2){ 		

		// Read all data from the table rows and add them to a array
		thisTorrent = new Array();
		thisTorrent["row1"] = row1 = torrentTable.rows[i];
		thisTorrent["row2"] = row2 = torrentTable.rows[i+1];
		thisTorrent["seed"] = parseInt(stripHTML(row1.cells[7].innerHTML)); 		
		thisTorrent["leech"] = parseInt(stripHTML(row1.cells[8].innerHTML)); 		
		thisTorrent["tdate"] = stripHTML(row1.cells[4].innerHTML).replace(",",""); 		
		thisTorrent["snatch"] = parseInt(stripHTML(row1.cells[6].innerHTML).replace(",","")); // Currently not used 		
		thisTorrent["name"] = stripHTML(row1.cells[1].getElementsByTagName('A')[0].innerHTML);
		if(thisTorrent["name"].length>maxNameLength){thisTorrent["name"]=thisTorrent["name"].substring(0,maxNameLength)+'...';}	
		thisTorrent["linkurl"] = row2.cells[1].getElementsByTagName("A")[0].href; 	
		tid = thisTorrent["linkurl"].split("=");
		if(tid.length!=2){writeStatus('ERROR! Wrong url: '+thisTorrent["linkurl"]+' should be of format: http://../wishlist.php?id=xxxxx(x)');return;}
		thisTorrent["torrentid"] = parseInt(tid[1]);	
		thisTorrent["removed"] = 0; // If this is set the torrent will be skipped in selection process
		thisTorrent["id"] = indexedTorrents.length;	// The index of the torrent in the indexedTorrents array
		
		// Add the torrent Array to the list
		indexedTorrents.push(thisTorrent);
		
		// Change the 'remove from wishlist' link to make it use the script to delete torrents with an Ajax call
		ll = row2.cells[1].getElementsByTagName("A")[0];
		ll.href='#';
		ll.id=thisTorrent["id"]+1;
		ll.addEventListener('click', removeSingleTorrent, false); 				
	}
	writeStatus(indexedTorrents.length+' torrents found');
	return(indexedTorrents.length);	
}

/* 
 * Functions selects all torrents for removal based on the selection criteria
 * @set selectedTorrents
 * @return number of selected torrents
 */
function selectTorrents(){
	var i=0;	var thistorrent;
	selectedTorrents = new Array();
	
	//writeStatus('Selecting torrents with less than <i>'+seeders.value+' seeders</i>, less than <i>'+total.value+' seeders & leechers</i> and minimal <i>'+age.value+' days old</i>...');

	// Loop through the indexedTorrents
	do{
		thisTorrent = indexedTorrents[i];
		// Check selection criteria. Skipped already delete torrents.
		if(!thisTorrent["removed"] && thisTorrent["seed"]<seeders.value && thisTorrent["seed"]+thisTorrent["leech"]<total.value && notNew(thisTorrent["tdate"])){ 						
			// Add the id of the torrent in the indexedTorrent array to the selectedTorrents array
			selectedTorrents.push(i);
		}
		i++;
	}
	while(i<indexedTorrents.length) 		
	
	if(selectedTorrents.length > 0){ 		
		setButtonState('REMOVE');
		writeStatus(selectedTorrents.length+' torrents selected out of a total of '+indexedTorrents.length+' torrents. '+(indexedTorrents.length-selectedTorrents.length)+' remaining after clean up.'); 	
		markSelectedTorrents();
	} else {
		clearSelectedTorrents();	
		writeStatus('0 torrents selected');
	} 
	return selectedTorrents.length;
}

/*
 * Marks the selectedTorrents by changing its color.
 * Moves the selected torrents to the top of the page
 */
function markSelectedTorrents(){
	
	// Change the color of all the torrents back to the default.
	clearSelectedTorrents();
	
	var i=0;
	do{
		(indexedTorrents[selectedTorrents[i]])["row1"].bgColor=(indexedTorrents[selectedTorrents[i]])["row2"].bgColor=highlight;

		// Move the table rows to the top of the table !nb: skip the table header.
		tt = (indexedTorrents[selectedTorrents[i]])["row1"].parentNode
	   tt.insertBefore((indexedTorrents[selectedTorrents[i]])["row2"], tt.firstChild.nextSibling);
	   tt.insertBefore((indexedTorrents[selectedTorrents[i]])["row1"], tt.firstChild.nextSibling);	
		
		i++;
	} while(i<selectedTorrents.length)
	
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
			setButtonState('SELECT');
			if(autorefresh.value)t=setTimeout("window.location.reload(true)",2000);
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
	   url: 'http://puretna.com/wishlist.php?rmwishlist='+torrent["torrentid"],
	   headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
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

function setButtonState(state){
	switch(state)
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
	return (time-(age.value*multiplier))>Date.parse(tmonth+" "+tday+", "+tyear);
}

function initStoredValues(){
	seeders = new StoredValue('seeders', seeders, 'Min. seeders', 'Minimal number of seeders. If the torrent has less it will be selected for removal.', 'int');
	total = new StoredValue('total', total, 'Min. total', '', 'int');
	age = new StoredValue('age', age, 'Min. days old', '', 'int');
	autoselect = new StoredValue('autoselect', autoselect, 'AutoSelect', '', 'bool');
	autorefresh = new StoredValue('autorefresh', autoselect, 'AutoRefresh', 'Automatically refreshes the page after all torrents are deleted. When some torrents fail to delete it will not refresh.', 'bool');
	autodelete = new StoredValue('autodelete', autoselect, 'AutoDelete', 'Automatically starts deleting torrents when the page is loaded. This implies AutoSelect is set.', 'bool');
}

/* -------------------------------------------------------- */

function StoredValue(newname, newdefault, label, desc, newtype){
	this.name = newname;
	this.default = newdefault;
	this.label = label;
	this.desc = desc;
	this.type = newtype;
	var obj = this;
	
	this.get = function(){
		var stored = GM_getValue("ptna_"+this.name);
		if(stored != undefined){
			if(this.type=='int')stored=parseInt(stored);
			this.value = stored;
		} else {
			this.value = this.default;
		}
	}
	this.get();
	
	this.set = function(value) {
		switch(this.type)
		{
		case 'int':
			var blankRE=/^\s*$/;
			if (!(isNaN(value) || (blankRE.test(value)))) { // not a number
				this.value = parseInt(value);
			}		
		break
		case 'bool':
			this.value = (true&&value);		
		break
		}		
		GM_setValue("ptna_"+this.name, this.value);			
	}
	
	this.getForm = function(){	

		var td = document.createElement("td");
		var inp = document.createElement("input");
		inp.title = this.desc;

		switch(this.type)
		{
		case 'int':
			inp.type = "number";
			inp.value = this.value;
			inp.name = "seeders";
			inp.size = 4;
			inp.min = 0;
			inp.addEventListener('keyup', function() {if(inp.value!=obj.value){obj.set(inp.value);setButtonState('SELECT');if(autoselect.value){selectTorrents();}}}, false);
		break
		case 'bool':
			inp.type = 'checkbox';
			inp.checked = this.value;
			inp.addEventListener('change', function() {obj.set(inp.checked);}, false);								
		break
		}		
		td.appendChild(inp);
		return td;
	}
	
	this.getLabel = function(){
		var td = document.createElement("td");
		td.title = this.desc;
		td.innerHTML = this.label;
		return td;
	}
}

/* --------------------------------------------------------- */

function main(){
	if (!GM_xmlhttpRequest) {
		alert('Please upgrade to the latest version of Greasemonkey (>= v0.2.6)');
		return;
	}
	initStoredValues();
	createWishlistPanel();
	if(!setTorrentTable())return;
	if(!indexTorrents())return;
	if(autoselect.value || autodelete.value)selectTorrents();
	if(autodelete.value && selectedTorrents.length>0)removeTorrent();
}

main();