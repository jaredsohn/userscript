// ==UserScript==
// @name Travian CEVO-P Ed.
// @author Crypt-It
// @description This script arranges data for easier viewing in Travian (ALPHA) v0.0.9
// @namespace TC
// @include http://*.travian.*/*
// @exclude http://www.travian.*
// @exclude http://forum.travian.*
// ==/UserScript==
/**
	TODO
	Code Cleanup .7 done
	Persistent settings
	document building cost and requirements (put them into vars uggggg)
	Display Building Upgrade/Build Availability Countdown timers
	determine feasibility of auto-messaging sitters for alerts/info
**/
var version = "0.0.9"//version number not really used
var resourceNodeNames = new Array('woodcutter','clay pit','iron mine','cropland');//the names for resource nodes
var resourceNames = new Array('wood','clay','iron','crop');//the names for resources
var todayInSeconds=dateInSeconds();//todays date (used by Counter functions)

var timers=new Array();//the timers global obj
var timersN=1;//timers global count
var maxResc = new Array();//the max resources that can be held by village in an array
var rescPH = new Array();//the resources per hour the village is producing in an array
var resourceUpgs;//global array for all costs of upgrading resource nodes
var SORT_COLUMN_INDEX;
var isFull = false;
var playerID = getPlayerId();
var PDATA= document.URL.substring(7,document.URL.indexOf('.'))+'_'+playerID;

/**
	main()
	shit gets done here (ie logic)
**/
function main() {
	initRescVars();//init the resource variables (maxResc,rescPH)
	getTimeToFill();//put timers under resource counts
	//if on dorf1
	if(document.URL.indexOf("dorf1.php")!=-1)
	{
		initRescUpgs();//init the resource upgrade array fully
		initTimeToUpgRes();
		//getTimeToUpgResc();//make timers for resource
	}
	else if(document.URL.indexOf("dorf2.php")!=-1)//TODO do buildings on dorf2
	{
		//if not have cranny info saved
		//save cranny info
		//initBldgUpgs();
		//getTimeToUpgBldg();		
	}
	//do side info stuff
	initSideInfo();
	executeTCounter();//start all timers
	//alert(getDateInMili()-todayInMili);
}
/**
	initSideInfo()
	do stuff with the side info div tag
**/
function initSideInfo() {
	var mySide = document.getElementById("side_info").appendChild(document.createElement('div'));
	mySide.id='myside';
	//if notes on
	//do notes 
	initNotes();
	
	//if certian pages
	//do harvest info
	
	//do options
}
/**
	initBldgUpgs()
	initializes the building upgrade/build information
**/
function initBldgUpgs() {
	
}
/**
	initRescUpgs()
	put the resource cost of resource Upgrades into arrays
	NO OPTIMIZATION NEEDED
**/
function initRescUpgs() {
	//do resourceUpgs values/initilization
	//[resource][level][resource]=resource cost
	//3 dimensional arrays oh my!
	resourceUpgs =[[['40','100','50','60','2'],['65','165','85','100','1'],['110','280','140','165','1'],['185','465','235','280','1'],['310','780','390','465','1'],['520','1300','650','780','2'],['870','2170','1085','1300','2'],['1450','3625','1810','2175','2'],['2420','6050','3025','3630','2'],['4040','10105','5050','6060','2'],['6750','16870','8435','10125','2'],['11270','28175','14090','16905','2'],['18820','47055','23525','28230','2'],['31430','78580','39290','47150','2'],['52490','131230','65615','78740','2'],['87660','219155','109575','131490','3'],['146495','365985','182995','219590','3'],['244480','611195','305600','366715','3'],['408280','1020695','510350','612420','2'],['681825','1704565','852280','1022740','3']],
																																																																																																																																																																											  [['80','40','80','50','2'],['135','65','135','85','1'],['225','110','225','140','1'],['375','185','375','235','1'],['620','310','620','390','1'],['1040','520','1040','650','2'],['1735','870','1735','1085','2'],['2900','1450','2900','1810','2'],['4840','2420','4840','3025','2'],['8080','4040','8080','5050','2'],['13500','6750','13500','8435','2'],['22540','11270','22540','14090','2'],['37654','18820','37654','23525','2'],['62865','31430','62865','39290','2'],['104985','52490','104985','65615','2'],['175320','87660','175320','109575','3'],['292790','146395','292790','182995','3'],['488955','244480','488955','305600','3'],['816555','408280','816555','510350','3'],['1363650','681825','1363650','852280','3']],
																																																																																																																																																																											  [['100','80','30','60','3'],['165','135','50','100','2'],['280','225','85','165','2'],['465','375','140','280','2'],['780','620','235','465','2'],['1300','1040','390','780','2'],['2170','1735','650','1300','2'],['3625','2900','1085','2175','2'],['6050','4840','1815','3630','2'],['10105','8080','3030','6060','2'],['16870','13500','5060','10125','3'],['28175','22540','8455','16905','3'],['47055','37645','14115','28230','3'],['78580','62865','23575','47150','3'],['131230','104985','39370','78740','3'],['219155','175320','65745','131490','3'],['365985','292790','109795','219590','3'],['611195','488955','183369','366715','3'],['1020695','816555','306210','612420','3'],['1704565','1363650','511370','1022740','3']],
																																																																																																																																																																											  [['70','90','70','20','0'],['115','150','115','35','0'],['195','250','195','55','0'],['325','420','325','95','0'],['545','700','545','155','0'],['910','1170','910','260','1'],['1520','1950','1520','435','1'],['2535','3260','2535','725','1'],['4235','5545','4235','1210','1'],['7070','9095','7070','2020','1'],['11810','15185','11810','3375','1'],['19725','25360','19725','5635','1'],['32940','42350','32940','9410','1'],['55005','70720','55005','15717','1'],['91869','118105','91869','26245','1'],['153405','197240','153405','43830','2'],['256190','197240','256190','73195','2'],['427835','550075','427835','122240','2'],['714485','918625','714485','204140','2'],['1193195','1534105','1193195','340915','2']]];
}
/**
	initRescVars()
	gets info on resource variables
	-max resources
	-resc per hour
	don't store current resources because that changes
**/
function initRescVars() {
	var tblBody = document.getElementById("resWrap").getElementsByTagName("table")[0].tBodies[0];
	var j=0;
	for(var i=1;i<tblBody.rows[0].cells.length-2;i+=2)
	{
		var t = tblBody.rows[0].cells[i].innerHTML;
		rescPH[j] = tblBody.rows[0].cells[i].getAttribute('title');//the resources generated per hour
		maxResc[j] = parseInt(t.substr(t.indexOf('/')+1));//the max resource the village can hold
		j++;
	}
}
/*
	initNotes()
	adds a notes section to myside div tag
*/
function initNotes() {
	var mySide = document.getElementById('myside');
	var notesOn = GM_getValue(PDATA+'_notes','false');
	var myNotesDiv = mySide.appendChild(document.createElement('div'));
	var myNotes = document.createElement('div');
	
	var headerTable = document.createElement('table');
	var headerTableBody = headerTable.appendChild(document.createElement('tbody'));
	var headerTableRow = headerTableBody.appendChild(document.createElement('tr'));
	var headerTableCell = headerTableRow.appendChild(document.createElement('td'));
	
	var notesHeader = document.createElement('h2');
	notesHeader.appendChild(document.createTextNode('Notes'));
	headerTableCell.appendChild(notesHeader);	
	headerTableCell = headerTableRow.appendChild(document.createElement('td'));
	
	var expandNotes = document.createElement('a');
	expandNotes.innerHTML = notesOn ? '&#9660;' : '&#9654;';
	expandNotes.href = '#';
	expandNotes.addEventListener('click', function(event) {
		notesOn = !GM_getValue(PDATA+'_notes','false'); 
		GM_setValue(PDATA+'_notes',
		notesOn);
		expandNotes.innerHTML = notesOn ? '&#9660;' : '&#9654;';
		expandNotes.style.marginTop = notesOn ? '0px' : '-2px';
		if(notesOn)
		{
			myNotes= makeNotes();
		}
		else
		{
			myNotes.innerHTML='';
		}
		myNotesDiv.appendChild(myNotes);
		event.preventDefault();
	}, true);
	if(notesOn)
	{
		myNotes= makeNotes();
	}
	headerTableCell.appendChild(expandNotes);
	myNotesDiv.appendChild(headerTable);
	myNotesDiv.appendChild(myNotes);
}
/*
	makeNotes()
	returns the notes section
*/
function makeNotes() {
	var myNotes = document.createElement("div");
	var notesField = document.createElement("textarea");
	notesField.setAttribute('cols','30');
	notesField.setAttribute('rows','30');
	notesField.value = GM_getValue(PDATA+'_notes_value','');
	notesField.addEventListener('keyup', function(e){
		GM_setValue(PDATA+'_notes_value', this.value);
	},false);
	var notesClear = document.createElement('input');
	notesClear.setAttribute("type","button");
	notesClear.setAttribute("value","Clear Notes");
	notesClear.addEventListener('click', function(e) {
		e.target.parentNode.getElementsByTagName("textarea")[0].value='';
		GM_setValue(PDATA+'_notes_value', '');
	}, false);
	myNotes.appendChild(notesField);
	myNotes.appendChild(document.createElement('br'));
	myNotes.appendChild(notesClear);
	return myNotes;
}
/** 
	getTimeToFill() (countdown)
	Creates new row under resource wrap at top of the page
	Time it takes to fill resources is inserted into cells
**/
function getTimeToFill() {
	var tbl = document.getElementById("resWrap").getElementsByTagName("table")[0];
	var tblBody = tbl.tBodies[0];
	tblBody.appendChild(document.createElement('tr'));
	var j=0;//resource number
	for(var i=1;i<tblBody.rows[0].cells.length-2;i+=2)//i is cell #
	{
		//get the current resource amount
		var curR = parseInt(tblBody.rows[0].cells[i].innerHTML.substr(0,tblBody.rows[0].cells[i].innerHTML.indexOf('/')));
		tblBody.rows[1].appendChild(document.createElement('td'));//empty cell for spacing
		var cell = tblBody.rows[1].appendChild(document.createElement('td'))//cell for the timer
		createTimer(cell, parseInt((maxResc[j]-curR)/(rescPH[j]/3600)));//make the timer cell
		cell.setAttribute("class","TCresc");//set class to TC resource (dif actions on end)
		j++;
	}
	tblBody.rows[0].insertCell(0);//insert empty cell at front of row
	tblBody.rows[1].insertCell(0).innerHTML='Fill in:';//insert cell at front of row
}
function initTimeToUpgRes() {
	var cent = document.getElementById("content");
	var bottomCent = cent.insertBefore(document.createElement("div"),cent.childNodes[cent.childNodes.length-1]);//main part of page
	bottomCent.id="tc_bcent";
	bottomCent.style.clear='both';
	bottomCent.style.width='502px';
	bottomCent.style.marginTop='10px';
	var resTableOn = GM_getValue(PDATA+'_res_table','false'); 
	var upgResDiv = bottomCent.appendChild(document.createElement("div"));
	
	var headerTable = document.createElement('table');
	var headerTableBody = headerTable.appendChild(document.createElement('tbody'));
	var headerTableRow = headerTableBody.appendChild(document.createElement('tr'));
	var headerTableCell = headerTableRow.appendChild(document.createElement('td'));
	headerTableCell.align='left';
	var he = headerTableCell.appendChild(document.createElement("h2"));
	he.appendChild(document.createTextNode('Resource Nodes'));
	headerTableCell = headerTableRow.appendChild(document.createElement('td'));	
	headerTableCell.align='left';
	
	var expandUpgTable = document.createElement('a');
	expandUpgTable.innerHTML = resTableOn ? '&#9660;' : '&#9654;';
	expandUpgTable.href = '#';
	
	var upgResTable = document.createElement("div");
	expandUpgTable.addEventListener('click', function(event) {
		resTableOn = !GM_getValue(PDATA+'_res_table','false'); 
		GM_setValue(PDATA+'_res_table',	resTableOn);
		expandUpgTable.innerHTML = resTableOn ? '&#9660;' : '&#9654;';
		expandUpgTable.style.marginTop = resTableOn ? '0px' : '-2px';
		if(resTableOn)
		{
			upgResTable= makeUpgResTable();
		}
		else
		{
			upgResTable.innerHTML='';
			//remove all TCrupg timers
			removeTimers('TCrupg');
		}
		upgResDiv.appendChild(upgResTable);
		event.preventDefault();
	}, true);
	if(resTableOn)
	{
		upgResTable= makeUpgResTable();
	}
	headerTableCell.appendChild(expandUpgTable);
	upgResDiv.appendChild(headerTable);
	upgResDiv.appendChild(upgResTable);
}
function makeUpgResTable() {
	var upgInnerDiv = document.createElement("div");
	var upgTbl = document.createElement("table");//add the table
	upgTbl.id="tc_upgTable";
	upgTbl.setAttribute("class","sortable");
	var imgs = document.getElementById("village_map").getElementsByTagName("img");//get the resource nodes + info
	//do Table Column Descriptions
	var tbody = upgTbl.appendChild(document.createElement("tbody"));
	var row = tbody.appendChild(document.createElement("tr"));
	var cell = row.appendChild(document.createElement("td"));
	cell.innerHTML='Node #';
	cell = row.appendChild(document.createElement("td"));
	cell.innerHTML='Resc Type';
	cell = row.appendChild(document.createElement("td"));
	cell.innerHTML='Current Level';
	cell = row.appendChild(document.createElement("td"));
	cell.innerHTML='Resource Needed';
	cell = row.appendChild(document.createElement("td"));
	cell.innerHTML='When Ready';
	//find the unique resource nodes and make a row in the table for them
	for(var i=0;i<imgs.length-1;i++)
	{
		var res;//resource #
		var nextlvl;//next level of node
		for(var j=0;j<resourceNodeNames.length;j++)
		{
			var class =imgs[i].attributes[0].nodeValue;//class of node (gets us info)
			if(class.toLowerCase().indexOf(resourceNodeNames[j])!=-1)//its that resource
			{
				res=j;
				nextlvl=parseInt(class.substring(class.indexOf("Level")+6));//dont need to increment cause array starts at 0 while next level starts at 1 anyway
			}
		}
		var nodeNum = innerHTML=imgs[i].attributes[1].nodeValue.substring(imgs[i].attributes[1].nodeValue.indexOf('rf')+2,imgs[i].attributes[1].nodeValue.indexOf('rf')+4);//number of resource node
		//used for build.php links
		row= tbody.appendChild(document.createElement("tr"));
		row.appendChild(document.createElement("td")).innerHTML='<a href="build.php?id=' + nodeNum + '">'+nodeNum+'</a>';//static link to build page
		row.appendChild(document.createElement("td")).innerHTML=capFirst(resourceNodeNames[res]);//the resource node name of the node Woodcutter, Clay pit etc
		row.appendChild(document.createElement("td")).innerHTML=nextlvl;//the level it will be upgraded to
		var resReq = resourceUpgs[res][nextlvl];//the resources required for upgrade (in an Array)
		if (parseInt(resReq[4])>=parseInt(rescPH[3]))//tests to see if the upgrade is stopped by the Pop/Crop Cap (Crop Cap = totalProduction-usage = crop per hour)
		{
			row.appendChild(document.createElement("td")).innerHTML='Crop Cap';//resource that needs the most
			row.appendChild(document.createElement("td")).innerHTML='Cannot create, extend Crop.';
		}
		else
		{
			//now to find the largest diff in resources
			var resTime=0;//the time in seconds for the resource that will take the longest to be done
			var resTimeRes;//the resource that is the most
			var tbl = document.getElementById("resWrap").getElementsByTagName("table")[0];
			var tblBody = tbl.tBodies[0];
			for(var l=0;l<resReq.length-1;l++)
			{
				var curR = parseInt(tblBody.rows[0].cells[l*2+2].innerHTML.substr(0,tblBody.rows[0].cells[l*2+2].innerHTML.indexOf('/')));// the current amount of resources of type l
				if(parseInt((resReq[l]-curR)/(rescPH[l]/3600))>resTime)//is time bigger than our current time remaining
				{
					resTime=parseInt((resReq[l]-curR)/(rescPH[l]/3600));//set the time in seconds
					resTimeRes=l;//set the resource to l
				}
			}//TO DO check to see if resReq[resTimeRes]>maxResc[resTimeRes]
			if(resTime!=0)
			{
				row.appendChild(document.createElement("td")).innerHTML=capFirst(resourceNames[resTimeRes]);//the resource required to build
				var cell = row.appendChild(document.createElement("td"));
				createTimer(cell, resTime);//the countdown timer for the resource
				cell.setAttribute("class","TCrupg");//set the type of timer
				cell.setAttribute("node",nodeNum);
			}
			else
			{
				row.appendChild(document.createElement("td"));
				row.appendChild(document.createElement("td")).innerHTML='<a href="build.php?id='+ nodeNum +'">Can Upgrade!</a>';//look ma we can upgrade!!!
			}
		}
	}
	//time to add the sorter form
	var resSortOptns=['Node','Type','Level','Resource Needed','Time'];
	//do default sort
	sortTable(upgTbl,GM_getValue(PDATA+'_res_table_sort_col', 0));
	upgInnerDiv.appendChild(upgTbl);
	upgInnerDiv.appendChild(sortForm(resSortOptns,'res_table_sort',GM_getValue(PDATA+'_res_table_sort_col', 0)));
	return upgInnerDiv;
}
/**
	sortForm(optns,id,selectedIndex)
	returns a form that has all the options in the optns array
**/
function sortForm(optns,id,selectedIndex)
{
	var form=document.createElement('form');
	form.id=id;
	var sortOptns=form.appendChild(document.createElement("select"));
	for(var i=0;i<optns.length;i++)
	{
		var sItem=sortOptns.appendChild(document.createElement("option"));
		sItem.innerHTML=optns[i];
	}
	sortOptns.selectedIndex=selectedIndex;
	var submitBtn=form.appendChild(document.createElement("input"));
	submitBtn.setAttribute("type","button");
	submitBtn.setAttribute("value","Sort Table");
	submitBtn.addEventListener('click', sortTableClick, true);
	return form;
}
/**
	createTimer(cell, seconds)
	fills the cell passed with a timer counting down from seconds in HH:MM:SS format
**/
function createTimer(cell, seconds) {
	var l = timers.length;
	cell.id="timer_tc"+(l+1);
	timers[l]=new Object();
	timers[l].node=cell;
	timers[l].counter_time=seconds;
	cell.innerHTML=parseSecondsToString(seconds);
}
/**
	removeTimers(class)
	removes Timers that have the certain class
**/
function removeTimers(class)
{
	for (i in timers)
	{
		if(timers[i].node.getAttribue('class').indexOf(class)!=-1)
		{
			timers.splice(i,1);
		}
	}
}
/** TIMER FUNCTIONS **/
//Probably shouldn't touch
//shamelessly stolen from Travian javascript code in unx.js
//i had to tab it all back out as they ran it through an optimization program
//then I had to guess wtf was going on, spent a good night on that
function parseSecondsToString(s,sb)
{
	var tb,ub,vb;
	if(s>-2){
		tb=Math.floor(s/3600);ub=Math.floor(s/60)%60;
		vb=s%60;
		t=tb+":";
		if(ub<10)
		{
			t+="0";
		}
		t+=ub+":";
		if(vb<10)
		{
			t+="0";
		}
		t+=vb;
	}
	else
	{
		t=sb?'0:00:0?':"<a href=\"#\" onClick=\"return Popup(2,5);\"><span class=\"c0 t\">0:00:0</span>?</a>";
	}
	return t;
}
function getDateInMili()
{
	return new Date().getTime();
}
function dateInSeconds()
{
	return Math.round(getDateInMili()/1000);
}
function parseSeconds(tcTimer)
{
	timeArray=tcTimer.innerHTML.split(":");
	seconds=timeArray[0]*3600+timeArray[1]*60+timeArray[2]*1;
	return seconds;
}
function executeTCounter()
{
	var j=1;//used to get the node id for resource upg timers
	var hit=false;//if i hit a resource upg timer
	for(i in timers)
	{
		timeDiff=dateInSeconds()-todayInSeconds;
		timeRemaining=timers[i].counter_time-timeDiff;
		if(timeRemaining<1)
		{
			if (timers[i].node.getAttribute("class").indexOf('TCresc')!=-1)//hey look a resource got filled to max capacity EMPTY IT (but not me, no Automation here)
			{
				if (!isFull)
				{
					//alert("YOU ARE FULL");//uhhh duh bitch don't get attacked now
					isFull=true;
				}
				//TODO? send a message to sitters warning that the user is full
				parsedString=parseSecondsToString(timeRemaining);
				timers[i].node.innerHTML=parsedString;
			}
			else if (timers[i].node.getAttribute("class").indexOf('TCrupg')!=-1)//hey look you can upgrade a resource node
			{
				//convert node HTML to link to node
				var nodeId=0;
				timers[i].node.innerHTML='<a href="build.php?id='+ parseInt(timers[i].node.getAttribute("node"))+'">Can Upgrade!</a>';//link to build page
			}
		}
		else//increment timer downwards
		{		 	
			parsedString=parseSecondsToString(timeRemaining);
			timers[i].node.innerHTML=parsedString;
		}
	}
	window.setTimeout(executeTCounter,1000);
}
/** END TIMER FUNCTIONS **/
/**
	Table sorting code
**/
/**
	sortTableClick(event)
	sends information needed to sortTable function
	FIX SORTING OF TIMES ~=
**/
function sortTableClick(event) {
	event.cancelBubble = true;
	var target = event.target;
	var colN = target.parentNode.getElementsByTagName('select')[0].selectedIndex;
	var table = target.parentNode.parentNode.getElementsByTagName('table')[0];
	GM_setValue(PDATA+'_'+target.parentNode.id+'_col',colN);
	sortTable(table, colN);
}
/**
	sortTable(tableNode, colNum)
	sorts the table by the column Number provided
	FIX SORTING OF TIMES ~=
**/
function sortTable(table, colN) {
	if (table.rows.length <= 1) return;
	if (table.tBodies[0].rows[0].cells[colN].id.indexOf('sorted')!=-1) return;
	var itm = ts_getInnerText(table.rows[1].cells[colN]);
	sortfn = ts_sort_caseinsensitive;
	if (itm.match(/^\d+/)) sortfn = ts_sort_numeric;
	if (itm.match(/^(\d)?\d:\d\d:\d\d/)) sortfn = ts_sort_counter;
	SORT_COLUMN_INDEX = colN;
	var firstRow = new Array();
	var newRows = new Array();
	for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
	for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }
	newRows.sort(sortfn);
	for (i=0;i<newRows.length;i++) { table.tBodies[0].appendChild(newRows[i]);}
	for(var i=0;i<table.rows[0].cells.length;i++)
	{
		table.rows[0].cells[i].id='';
	}
	table.tBodies[0].rows[0].cells[colN].id='sorted';
	
}
window.ts_getInnerText = function (el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
			str += ts_getInnerText(cs[i]);
			break;
			case 3:	//TEXT_NODE
			str += cs[i].nodeValue;
			break;
		}
	}	
	return str;
}

window.getParent = function (el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
	return el;
	else
	return getParent(el.parentNode, pTagName);
}
window.ts_sort_counter = function (a,b) {
	aa = parseFloat(parseSeconds(a.cells[SORT_COLUMN_INDEX]));
	bb = parseFloat(parseSeconds(b.cells[SORT_COLUMN_INDEX]));
	return aa - bb;
}

window.ts_sort_numeric = function (a,b) {
	aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
	if (isNaN(aa)) aa = 0;
	bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]));
	if (isNaN(bb)) bb = 0;
	//alert('A: '+a+' B: '+ b+' aa: '+aa+' bb: '+bb);
	return aa-bb;
}

window.ts_sort_caseinsensitive = function (a,b) {
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}

window.ts_sort_default = function (a,b) {
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}
/**
	End table sorting
**/
/**
	getPlayerId()
	returns the player's id
**/
function getPlayerId() { //retrieve Player's ID
	var sideLinks = document.getElementById('side_navi').getElementsByTagName('p')[0].getElementsByTagName('a');
	for(var i=0;i<sideLinks.length;i++)
	{
		if(sideLinks[i].getAttribute('href').indexOf('spieler.php?uid=')!=-1)
		{
			pid=sideLinks[i].getAttribute('href').substring(16);
		}
	}
	return pid;

}
/**
	capFirst(str)
	capitilize the first letter in string str
**/
function capFirst(str) {
   str = str.substr(0, 1).toUpperCase() + str.substr(1);
   return str;
}
main();//run the main method broski!