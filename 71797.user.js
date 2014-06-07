// ==UserScript==
// @name          Colony Overview Mod v0.2 RC 1
// @namespace     http://*.war-facts.com/
// @description   Revamp of Colony Overview page to make war-facts playable again
// @include       http://*.war-facts.com/*
// @include       http://*.war-facts.com/overview.php*
// @include       http://*.war-facts.com/buy_storage.php*
// @include       http://*.war-facts.com/build_facility.php*
// @exclude       http://*.war-facts.com/extras/*
// @exclude       http://*.war-facts.com/
// ==/UserScript==
// Modified (fixed) by Carabas on Jan 27, 2009
//Written by Matt "TokMor" Burg
//Colony information idea by Michael Wanush
//Use at your own risk.
//Do not distribute without credits intact.
//Now dual instance compatible

/* Greasemonkey 20080112 workaround */
function wrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}
/* End of workaround */

// Let the page completely load, and let apache's fullmod code run before we start
window.setTimeout(function(){

// Hack Hack
document.getElementsByTagName('table')[0].setAttribute('id','mainTable');
// Hack Hack

//Global Variable Declarations, these are constant once set

//These constants may be changed to suit the user
var DefaultColonies = 1; //set to 0 if you don't want the "colonies" selection to be the default selection when Command Center is clicked. If set to 0, http://*.war-facts.com/* should be removed from the included pages.
var AttentionColor = "#990000"; //Hex code for which color alert cells will turn
var HappyAlarm = .9; //when below
var EduAlarm = .1; //when below
var IllAlarm = .1; //when above
var CrimeAlarm = .1; //when above
var StorageAlarm = .9; // when above
var MallAlarm = 2.5; //when below
//var WealthAlarm = 400; //when below
var IndexAlarm = 200; //when above
var Target = "target='_blank'"; //set to empty string "" if you don't want most links opening in a new window
var AutoBuild = true; //When true, will auto-populate build pages with the reccomended number of buildings
var AutoStore = 100000; //Will autopopulate the build storage page with this number

//Do not change these constants
var DataPoints = 12; //the colonyData array will have this many elements
var TableOffset = 0; //the main colony table is this number listed in the code
var RowOffset = 3; //Removes header rows from main colony table
var RowEndOffset = 1; //Removes footer rows from main colony table
var PageTrue = document.body.innerHTML.search(".war-facts.com/overview.php?view=1\">Default</a>&nbsp;&nbsp;|&nbsp; Colony"); //Tests to ensure the page is correct
var Instance = "I1"; //Will be set to "I2" if instance 2 is detected. Creates separate parameter namespaces for each instance
var ILink = ""; //Will be set to "2" for instance 2. controlls what is after www in the link URLs


// Fix for builtin FullMod alerts
var temp = document.body.getElementsByTagName("table")[TableOffset];
for (var i = RowOffset, len = temp.rows.length; i < len; i++)
{
	if (temp.rows[i].getAttribute('id') == 'colHeader')
	{
		RowOffset = i+1;
		break;
	}
}
//


//Reterns a cell in the colony viewer given by the parameters listed below
//xx=row (starts at 0)
//yy=column (starts at 0)
//ii=colony number (should normally be passed ii)
//jj=1 for population data, 2 for resources
function getCell(xx,yy,ii,jj){
	return document.body.getElementsByTagName("table")[TableOffset+ii*2+jj].rows[xx].cells[yy];
}

//Pulls data from Colony Data Cells, and strips out the text from the number, and converts to int
//xx=row (starts at 0)
//yy=column (starts at 0)
//ii=colony number (should normally be passed ii)
//jj=1 for population data, 2 for resources
function grabData(xx,yy,ii,jj){
	return parseInt(getCell(xx,yy,ii,jj).innerHTML.slice(0,getCell(xx,yy,ii,jj).innerHTML.indexOf(" ")).replace(/,/g, ""));
}

//Returns a string for an input with type=hidden
function hidden(id,value){
	return "<input type=\"hidden\" id=\""+id+"\" value=\""+value+"\">";
}

//makes object kk red
function makeRed(kk){
	kk.style.backgroundImage= "none";
	kk.style.backgroundColor= AttentionColor;
}


//Prompts user to change the number of mall workers
unsafeWindow.settMall = wrap(function(curr){
	if(confirm("Change mall workers from: "+curr+"?")){
		var response = prompt("Enter number of effective mall workers.\nAlternatively, enter the number of workers - percentage.\n eg: 25-400","1");
		if(response.search("-") > 0){
			if(Math.round(parseInt(response.split("-")[0])*parseInt(response.split("-")[1])/100) > 0){
				GM_setValue('mallWorkers'+Instance,Math.round(parseInt(response.split("-")[0])*parseInt(response.split("-")[1])/100));
				alert("Mall workers set to: "+GM_getValue('mallWorkers'+Instance));
				window.location = window.location;
			}
		}else{
			if(parseInt(response)>0){
				GM_setValue('mallWorkers'+Instance,parseInt(response));
				alert("Mall workers set to: "+GM_getValue('mallWorkers'+Instance));
				window.location = window.location;
			}
		}
	}
});

//Prompts user to change the number of farm workers
unsafeWindow.settFarm = wrap(function(curr){
	if(confirm("Change farm workers from: "+curr+"?")){
		var response = prompt("Enter number of effective farm workers.\nAlternatively, enter the number of workers - percentage.\n eg: 25-400","1");
		if(response.search("-") > 0){
			if(Math.round(parseInt(response.split("-")[0])*parseInt(response.split("-")[1])/100) > 0){
				GM_setValue('farmWorkers'+Instance,Math.round(parseInt(response.split("-")[0])*parseInt(response.split("-")[1])/100));
				alert("Farm workers set to: "+GM_getValue('farmWorkers'+Instance));
				window.location = window.location;
			}
		}else{
			if(parseInt(response)>0){
				GM_setValue('farmWorkers'+Instance,parseInt(response));
				alert("Farm workers set to: "+GM_getValue('farmWorkers'+Instance));
				window.location = window.location;
			}
		}
	}
})

//Confirms the user wishes to clear fertilization data for the selected planet, and then does so
unsafeWindow.clearFert = wrap(function(pid){
	if(confirm("Clear fertilization data for this planet?\n(Page refresh required to take effect)")){
		GM_setValue(pid+Instance,-1);
	}
})

//Returns an HTML link to the specified URL with link text "text"
function createLink(url,text){
	return "<a href=\""+url+"\""+Target+">"+text+"</a>";
}

//Returns the URL to a build link based on kk and ll for a given colony
//kk=1 for resources, 3 for institutions, 8 for defenses (string)
//ll=anchor point for type of building (string)
function constructionUrl(kk,ll,colonyData){
	return "/build_facility.php?type="+kk+"&colony="+colonyData[ii][0]+"&subtype="+ll;
}

//Turns the text in a cell into a build link
//xx=row (starts at 0) (int)
//yy=column (starts at o) (int)
//ii=colony number (should normally be passed ii) (int)
//jj=1 for population data, 2 for resources (int)
//kk=1 for resources, 3 for institutions, 8 for defenses (string)
//ll=anchor point for type of building (string)
function buildLink(xx,yy,ii,jj,kk,ll,colonyData){
	getCell(xx,yy,ii,jj).innerHTML = createLink(constructionUrl(kk,ll,colonyData),getCell(xx,yy,ii,jj).innerHTML);
}


//**********************main program******************************

//Determine which instance is being viewed
if(window.location.href.search("www2.") > 0){
	Instance="I2";
	ILink="2";
}

//Make CommandCenter link default to colony view
//This line will be called for all pages, all other lines will only be executed for the colony overview page
var l = document.getElementsByTagName('a')
for (var i = 0, len = l.length; i < len; i++)
  if (l[i].href.indexOf('overview.php') != -1) { l[i].href = '/overview.php?view=1'; break; }
/*
if(Instance == "I1"){
	if(DefaultColonies == 1){
		document.body.getElementsByTagName("table")[1].rows[1].cells[1].innerHTML=document.body.getElementsByTagName("table")[1].rows[1].cells[1].innerHTML.split("overview.php")[0]+"overview.php?view=1"+document.body.getElementsByTagName("table")[1].rows[1].cells[1].innerHTML.split("overview.php")[1];
	}
}
else{//Same thing, but modified for Instance 2
	if(DefaultColonies == 1){
		document.getElementById("mgametab").rows[0].cells[1].innerHTML=document.getElementById("mgametab").rows[0].cells[1].innerHTML.split("overview.php")[0]+"overview.php?view=1"+document.getElementById("mgametab").rows[0].cells[1].innerHTML.split("overview.php")[1];
	}
}
*/
//Where the fun starts **********************
if(PageTrue != -1 ) { //Ensures that script only runs for the colony overview page

var ii; //counting variable for current colony

//Set TableOffset correctly
/*var temp;
if(Instance == "I1"){
	temp=document.body.getElementsByTagName("table")[3].rows[0].cells[1].innerHTML.indexOf("<table>");
	document.body.getElementsByTagName("table")[3].rows[0].cells[1].innerHTML=document.body.getElementsByTagName("table")[3].rows[0].cells[1].innerHTML.slice(0,temp)+"<table id=\"mainTable\">"+document.body.getElementsByTagName("table")[3].rows[0].cells[1].innerHTML.slice(temp+7);
	ii=4;
	while(document.body.getElementsByTagName("table")[ii] != document.getElementById("mainTable")&& ii < document.body.getElementsByTagName("table").length){
	ii++;
	}
	TableOffset=ii; //It's 12:30 in the morning, this script works. Therefore, it is the best way to do it.
}
else{
	temp=document.body.innerHTML.indexOf("<table>");
	document.body.innerHTML=document.body.innerHTML.slice(0,temp)+"<table id=\"mainTable\">"+document.body.innerHTML.slice(temp+7);
	ii=0;
	while(document.body.getElementsByTagName("table")[ii] != document.getElementById("mainTable")&& ii < document.body.getElementsByTagName("table").length){
	ii++;
	}
	TableOffset=ii; //It's 12:30 in the morning, this script works. Therefore, it is the best way to do it.	
}*/

var numColonies = document.getElementById("mainTable").rows.length-RowOffset-RowEndOffset;

//define array to hold all colony data
var colonyData = new Array (numColonies); 

//Create holder for colony ID to pass to XML request (recycled idea from below, but still an idea I am proud of)
//Also adds a few other parameters for XML reference
document.getElementById("mainTable").innerHTML = "<input type=\"hidden\" id=\"colonyID\" value=\"0\">"+hidden("AttentionColor",AttentionColor)+hidden("RowOffset",RowOffset)+hidden("numColonies",numColonies)+hidden("ILink",ILink)+hidden("Instance",Instance)+hidden("IndexAlarm",IndexAlarm)+hidden("MallAlarm",MallAlarm)+hidden("mallCalcs",0)+document.getElementById("mainTable").innerHTML;

	//Add buttons to set mall and farm effectiveness
	document.getElementById("mainTable").rows[0].cells[0].innerHTML="<input value=\"Set Mall Effectivness\" onClick=\"javascript:settMall("+GM_getValue('mallWorkers'+Instance,1)+")\" type=\"button\">";
	document.getElementById("mainTable").rows[1].cells[0].innerHTML="<input value=\"Set Farm Effectivness\" onClick=\"javascript:settFarm("+GM_getValue('farmWorkers'+Instance,1)+")\" type=\"button\">";
	
	//Layer to show sorting status (Hopefully will turn out as cool as I envisioned)
	document.body.innerHTML = document.body.innerHTML+"<div style=\"position: absolute; left: 0px; top: 0px; padding: 1em;\" id=\"statusBar\">Done in:"+(numColonies*2)+"</div>";
	//alert(document.getElementById("statusBar").innerHTML.split(":")[0] + ":" + (parseInt(document.getElementById("statusBar").innerHTML.split(":")[1])-1));

//Loop through each colony ***************************
for(ii = 0 ; ii< numColonies ; ii++){
	colonyData[ii]= new Array (DataPoints); //initialize array
	var alarms = 0; //counts the number of alarms for sorting
	
	//get colony number
	colonyData[ii][0] = getCell(0,2,ii,1).innerHTML.split("=")[4].split("'")[0];
	//This section gets data from the cells into an array
	colonyData[ii][1]=grabData(1,1,ii,1); //population
	colonyData[ii][2]=grabData(2,1,ii,1); //happyness
	colonyData[ii][3]=grabData(3,1,ii,1); //education
	colonyData[ii][4]=grabData(4,1,ii,1); //health
	colonyData[ii][5]=grabData(5,1,ii,1); //crime
	colonyData[ii][6]=grabData(1,3,ii,1); //size
	colonyData[ii][9]=grabData(1,3,ii,2); //food
	colonyData[ii][10]=grabData(2,3,ii,1); //wealth
	//This section gets the storage current/max of the colony
	colonyData[ii][7]=parseInt(getCell(0,1,ii,2).innerHTML.split(" ")[0].replace(/,/g, ""));
	colonyData[ii][8]=parseInt(getCell(0,1,ii,2).innerHTML.split(" ")[2].replace(/,/g, ""));
	//get planet number
	colonyData[ii][11]=document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML.split("/extras/view_planet.php?planet=")[1].split("'")[0];
	
	//This section will turn cells red when attention is needed
	if(colonyData[ii][2] * 100 / colonyData[ii][1] < HappyAlarm * 100){
		makeRed(getCell(2,1,ii,1));
		alarms++;
	}
	if(colonyData[ii][3] * 100 / colonyData[ii][1] < EduAlarm * 100){
		makeRed(getCell(3,1,ii,1));
		alarms++;
	}
	if(colonyData[ii][4] * 100 / colonyData[ii][1] > IllAlarm * 100){
		makeRed(getCell(4,1,ii,1));
		alarms++;
	}
	if(colonyData[ii][5] * 100 / colonyData[ii][1] > CrimeAlarm * 100){
		makeRed(getCell(5,1,ii,1));
		alarms++;
	}
	if(colonyData[ii][7] * 100 / colonyData[ii][8] > StorageAlarm * 100){
		makeRed(getCell(0,1,ii,2));
		alarms++;
	}
	/* Wealth alarm replaced by XML pull
	if(colonyData[ii][10] < WealthAlarm){
		makeRed(getCell(2,3,ii,1));
		alarms++;
	}*/
	getCell(2,3,ii,1).id="wealthCell"+colonyData[ii][0];
	
	
	//This section will add build links to almost every tabel cell header
	buildLink(2,0,ii,1,3,1,colonyData);//Entertainment
	buildLink(3,0,ii,1,3,2,colonyData);//Education
	buildLink(4,0,ii,1,3,3,colonyData);//Health
	buildLink(5,0,ii,1,3,4,colonyData);//Crime
	buildLink(1,2,ii,1,3,7,colonyData);//Terraformer
	//buildLink(2,2,ii,1,3,8,colonyData);//Mall --Replaced by wage XML pull
	buildLink(3,2,ii,1,3,5,colonyData);//Science
	buildLink(1,0,ii,2,1,10,colonyData);//Water
	buildLink(2,0,ii,2,1,1,colonyData);//Iron
	buildLink(3,0,ii,2,1,3,colonyData);//Silver
	buildLink(4,0,ii,2,1,7,colonyData);//Plat
	buildLink(5,0,ii,2,1,4,colonyData);//Titanium
	buildLink(6,0,ii,2,1,9,colonyData);//Oil
	buildLink(1,2,ii,2,1,11,colonyData);//Food
	buildLink(2,2,ii,2,1,2,colonyData);//Copper
	buildLink(3,2,ii,2,1,5,colonyData);//Gold
	buildLink(4,2,ii,2,1,8,colonyData);//Diamonds
	buildLink(5,2,ii,2,1,6,colonyData);//Uranium
	
	//Wealth links to main colony page to change wages
	getCell(2,2,ii,1).innerHTML = createLink("/view_colony.php?colony="+colonyData[ii][0],getCell(2,2,ii,1).innerHTML);
	
	//Make "Buy Storage" open in new window if Target is not null
	getCell(0,2,ii,2).innerHTML=getCell(0,2,ii,2).innerHTML.split("\"")[0]+"\""+getCell(0,2,ii,2).innerHTML.split("\"")[1]+"&toBuild="+AutoStore+"\""+Target+getCell(0,2,ii,2).innerHTML.split("\"")[2];
	//Make Colony names open in a new window
	document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML=document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML.slice(0,document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML.indexOf("\"",15)+1)+Target+document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML.slice(document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML.indexOf("\"",15)+1);
	//Make Development Setup open a new window
	getCell(0,3,ii,1).innerHTML=(getCell(0,3,ii,1).innerHTML.split("parent.location=")[0]+"javascript:scrollext("+getCell(0,3,ii,1).innerHTML.split("parent.location=")[1]).split("colony=")[0]+"colony="+colonyData[ii][0]+"');\" type=\"button\">";
	
	//Set the current colony to the hidden input
	document.getElementById("colonyID").value=colonyData[ii][0];
	
	//Add another row to table for farms and malls
	//Adds an ID to cells to allow identification by XML call
	//Adds hidden input fields to pass additional data to the XML parser (I was proud of this idea)
	document.body.getElementsByTagName("table")[TableOffset+ii*2+2].innerHTML=document.body.getElementsByTagName("table")[TableOffset+ii*2+2].innerHTML.split("</tbody>")[0]+"<tr valign=\"top\"> <td class=\"strong\"><a href=\"/build_facility.php?type=3&colony="+colonyData[ii][0]+"&subtype=8\""+Target+" id =\"ma"+colonyData[ii][0]+"\">Malls</a><input type=\"hidden\" id=\"p"+colonyData[ii][0]+"\" value=\""+colonyData[ii][1]+"\">"+hidden("alarms"+colonyData[ii][0],alarms)+hidden("pl"+colonyData[ii][0],colonyData[ii][9])+hidden("wealth"+colonyData[ii][0],colonyData[ii][10])+hidden("ii"+ii,colonyData[ii][0])+hidden("f"+colonyData[ii][0],colonyData[ii][11])+"</td><td class=\"strong\" id=\"m"+colonyData[ii][0]+"\">TBD</td><td class=\"strong\"><a href=\"/build_facility.php?type=1&colony="+colonyData[ii][0]+"&subtype=11\""+Target+" id =\"fa"+colonyData[ii][0]+"\">Farms</a></td><td class=\"strong\" align=\"right\" id=\"fr"+colonyData[ii][0]+"\">TBD</td></tr></tbody>"+document.body.getElementsByTagName("table")[TableOffset+ii*2+2].innerHTML.split("</tbody>")[1];
	
	//Same as above line, but for the other table
	document.body.getElementsByTagName("table")[TableOffset+ii*2+1].innerHTML=document.body.getElementsByTagName("table")[TableOffset+ii*2+1].innerHTML.split("</tbody>")[0]+"<tr valign=\"top\"> <td class=\"strong\" id=\"indu"+colonyData[ii][0]+"\" onClick=\"javascript:scrollext('/colony_setup.php?colony="+colonyData[ii][0]+"');\">Urban<br>TBD</td><td class=\"strong\" id=\"indi"+colonyData[ii][0]+"\" onClick=\"javascript:scrollext('/colony_setup.php?colony="+colonyData[ii][0]+"');\">Industry<br>TBD</td><td class=\"strong\" id=\"indt"+colonyData[ii][0]+"\" onClick=\"javascript:scrollext('/colony_setup.php?colony="+colonyData[ii][0]+"');\">Tech<br>TBD</td><td class=\"strong\" id=\"indm"+colonyData[ii][0]+"\" onClick=\"javascript:scrollext('/colony_setup.php?colony="+colonyData[ii][0]+"');\">Millitary<br>TBD</td></tr></tbody>"+document.body.getElementsByTagName("table")[TableOffset+ii*2+1].innerHTML.split("</tbody>")[1];
	//getCell(6,3,ii,2).innerHTML = "Take that";
	if(getCell(6,3,ii,2).innerHTML.search("Urban Centers") > 0){
		getCell(8,0,ii,1).innerHTML = getCell(8,0,ii,1).innerHTML+"*";
	}
	if(getCell(6,3,ii,2).innerHTML.search("Heavy Industries") > 0){
		getCell(8,1,ii,1).innerHTML = getCell(8,1,ii,1).innerHTML+"*";
	}
	if(getCell(6,3,ii,2).innerHTML.search("High Tech Industries") > 0){
		getCell(8,2,ii,1).innerHTML = getCell(8,2,ii,1).innerHTML+"*";
	}
	if(getCell(6,3,ii,2).innerHTML.search("Military Installations") > 0){
		getCell(8,3,ii,1).innerHTML = getCell(8,3,ii,1).innerHTML+"*";
	}
	temp = document.body.getElementsByTagName("table")[TableOffset+ii*2+1].rows[7].innerHTML;
	document.body.getElementsByTagName("table")[TableOffset+ii*2+1].rows[7].innerHTML = document.body.getElementsByTagName("table")[TableOffset+ii*2+1].rows[8].innerHTML;
	document.body.getElementsByTagName("table")[TableOffset+ii*2+1].rows[8].innerHTML = temp;
	
	//Add ID to each colony's links cell
	document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].id="clink"+colonyData[ii][0];
	
	//Add Links to construction pages for each colony
	document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML=document.body.getElementsByTagName("table")[TableOffset].rows[ii+RowOffset].cells[0].innerHTML+"<hr>"+createLink("/view_colony_extended.php?colony="+colonyData[ii][0],"Projects+Buildings")+"<br>"+createLink("/build_facility.php?type=1&colony="+colonyData[ii][0],"Resources")+"<br>"+createLink("/build_facility.php?type=3&colony="+colonyData[ii][0],"Inistitutions")+"<br>"+createLink("/build_facility.php?type=8&colony="+colonyData[ii][0],"Defenses")+"<br>"+createLink("/demolish_building.php?colony="+colonyData[ii][0],"Demolish")+"<br>"+createLink("/fleet_management.php?colony="+colonyData[ii][0],"Fleet Management")+"<br>"+createLink("/research.php?colony="+colonyData[ii][0],"Research");
	
	if(ii==ii){//***********************loop that I use to only do 1 XML call for debugging
	//XML Requests to get additional data
	
		//Farm Calculations and warnings
		if(colonyData[ii][9] * 10 < colonyData[ii][1] ){
			if(GM_getValue('fert'+colonyData[ii][11]+Instance,-1) != -1){
				var toBuild=Math.round((colonyData[ii][1]/10 - colonyData[ii][9])/(GM_getValue('farmWorkers'+Instance,1)*Math.sqrt(GM_getValue('fert'+colonyData[ii][11]+Instance,-1)))*10)/10;
				document.getElementById("fa"+colonyData[ii][0]).innerHTML=document.getElementById("fa"+colonyData[ii][0]).innerHTML+"("+toBuild+")";
				document.getElementById("fa"+colonyData[ii][0]).href=document.getElementById("fa"+colonyData[ii][0]).href+"&toBuild="+Math.ceil(toBuild);
				document.getElementById("fr"+colonyData[ii][0]).innerHTML="&lt;--Build Farms";
				makeRed(getCell(7,3,ii,2)); //food Alarm
				document.getElementById("alarms"+colonyData[ii][0]).value=parseInt(document.getElementById("alarms"+colonyData[ii][0]).value)+1;
			}
			else{
				//alert('http://www'+document.getElementById("ILink").value+'.war-facts.com/extras/view_planet.php?planet='+document.getElementById("f"+document.getElementById("colonyID").value).value);
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www'+document.getElementById("ILink").value+'.war-facts.com/extras/view_planet.php?planet='+document.getElementById("f"+document.getElementById("colonyID").value).value,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
						},
					onload: function(responseDetails) {
						var Instance = document.getElementById("Instance").value;
						var pid=responseDetails.responseText.split("/fleet_navigation.php?tworld=")[1].split("\"")[0];
						//alert(responseDetails.responseText.split("Fertilization:")[1].split("<td class=\"strong\">")[1].split(" ")[0]);
						GM_setValue('fert'+pid+Instance,responseDetails.responseText.split("Fertilization:")[1].split("<td class=\"strong\">")[1].split(" ")[0]);
						//alert(GM_getValue('fert'+pid+Instance,-1));
					}
				});
				document.getElementById("fr"+colonyData[ii][0]).innerHTML="Fertilization Set<br>Reload page."
			}
		}else document.getElementById("fr"+colonyData[ii][0]).innerHTML="Farms OK";
	if(GM_getValue('fert'+colonyData[ii][11]+Instance,-1) != -1){
	   	getCell(8,0,ii,1).innerHTML = getCell(8,0,ii,1).innerHTML + "\n &nbsp;&nbsp; <input class=\"small\" value=\"Clear Fertilization\" onClick=\"javascript:clearFert('fert"+colonyData[ii][11]+"')\" type=\"button\">";
	}
	//Mall calculations
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www'+document.getElementById("ILink").value+'.war-facts.com/view_colony_extended.php?colony='+document.getElementById("colonyID").value,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    },
    onload: function(responseDetails) {
		var Instance = document.getElementById("Instance").value;
		var colony = responseDetails.responseText.split("/build_facility.php?colony=")[1].split("\"",2)[0]; //Grab the colony ID. Used to reference back to the right colony row.
		var mall = new Array(5);
		mall[4]=GM_getValue('mallWorkers'+Instance,1);
		if(responseDetails.responseText.search("<b>Mall</u></b>")>0){
			mall[0]=parseInt(responseDetails.responseText.split("<b>Mall</u></b>")[1].split("<td>Employees:</td><td>")[1].split(" ",2)[0].replace(/,/g, ""));
			mall[1]=parseInt(responseDetails.responseText.split("<b>Mall</u></b>")[1].split("<td>Effectiveness:</td><td>")[1].split("%",2)[0].replace(/,/g, ""));
			mall[2]=parseInt(responseDetails.responseText.split("<b>Mall</u></b>")[1].split("<td>Buildings:</td><td>")[1].split("<",2)[0].replace(/,/g, ""));
		}else{
			mall[0]=0;
			mall[1]=0;
			mall[2]=0;
		}
		mall[3]=mall[0]*mall[1]/parseInt(document.getElementById("p"+colony).value);
		if(mall[3] < document.getElementById("MallAlarm").value){
			document.getElementById("m"+colony).style.backgroundImage="none";
			document.getElementById("m"+colony).style.backgroundColor=document.getElementById("AttentionColor").value;
			var popCover = parseInt(document.getElementById("p"+colony).value) - 1/parseFloat(document.getElementById("MallAlarm").value)*mall[0]*mall[1];
			var toBuild = Math.ceil(popCover*parseFloat(document.getElementById("MallAlarm").value)/100/GM_getValue('mallWorkers'+Instance,1));
			document.getElementById("ma"+colony).innerHTML=document.getElementById("ma"+colony).innerHTML+"("+toBuild+")";
			document.getElementById("ma"+colony).href=document.getElementById("ma"+colony).href+"&toBuild="+toBuild;
			document.getElementById("alarms"+colony).value=parseInt(document.getElementById("alarms"+colony).value)+1;
		}
		document.getElementById("m"+colony).innerHTML=Math.round(mall[3]*10000.0)/10000;
		document.getElementById("mallCalcs").value=parseInt(document.getElementById("mallCalcs").value)+1;
		document.getElementById("statusBar").innerHTML = document.getElementById("statusBar").innerHTML.split(":")[0] + ":" + (parseInt(document.getElementById("statusBar").innerHTML.split(":")[1])-1);
		//Sorting algorithm, set to run only when all calculations have completed and only for default sort
		if(parseInt(document.getElementById("mallCalcs").value)==parseInt(document.getElementById("numColonies").value)*2 && window.location.search.substring(1).search("&order")<0){
			document.getElementById("statusBar").innerHTML="Sorting";
			//alert("Last one");
			var nn=parseInt(document.getElementById("numColonies").value);
			var off=parseInt(document.getElementById("RowOffset").value)
			var rowCode = new Array(nn);
			var rowID = new Array(nn);
			for(var ii=0+off;ii<nn+off;ii++){
				rowCode[ii-off]=document.getElementById("mainTable").rows[ii].innerHTML;
				rowID[ii-off]=parseInt(document.getElementById("ii"+(ii-off)).value);
			}
			//Basic Sort
			//Will put colonies with alarms on top
			//Linear Time
			var top=0;
			var bottom=nn-1;
			var direction = 1;
			var temp; //to hold swap values
			while(bottom > top){
				if(direction==0){//going down from the top, looking for alarms
					while(parseInt(document.getElementById("alarms"+rowID[top]).value)>0 && bottom > top){
						top++;
					}
					//swap values and go in other direction
					temp=rowCode[top];
					rowCode[top]=rowCode[bottom];
					rowCode[bottom]=temp;
					temp=rowID[top];
					rowID[top]=rowID[bottom];
					rowID[bottom]=temp;
					direction=1;
				}else{//going up from bottom, looking for no alarms
					while (parseInt(document.getElementById("alarms"+rowID[bottom]).value)==0 && bottom > top){
						bottom--;
					}
										//swap values and go in other direction
					temp=rowCode[top];
					rowCode[top]=rowCode[bottom];
					rowCode[bottom]=temp;
					temp=rowID[top];
					rowID[top]=rowID[bottom];
					rowID[bottom]=temp;
					direction=0;
				}
			}//end basic sort
			
			//Advanced Sort
			//Will order colonies by the number of alarms they have
			//Quadratic Time (May be slow if you have lots of colonies)
			top=0;
			while(bottom>0){
				while(top<bottom){
					if(parseInt(document.getElementById("alarms"+rowID[top+1]).value)>parseInt(document.getElementById("alarms"+rowID[top]).value)){
						temp=rowCode[top];
						rowCode[top]=rowCode[top+1];
						rowCode[top+1]=temp;
						temp=rowID[top];
						rowID[top]=rowID[top+1];
						rowID[top+1]=temp;
					}
					top++;
				}
				top=0;
				bottom--;
			}//end advanced sort
			
			//Write the table rows back to the document
			for(ii=0+off;ii<nn+off;ii++){
				document.getElementById("mainTable").rows[ii].innerHTML=rowCode[ii-off];
				//rowID[ii]=parseInt(document.getElementById("ii"+ii).value);
			}
			document.getElementById("statusBar").style.visibility = "hidden";
		}
    }
});
	
	//XML call to obtain data from the colony screen
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www'+document.getElementById("ILink").value+'.war-facts.com/view_colony.php?colony='+document.getElementById("colonyID").value,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
		onload: function(responseDetails) {
			var colony = responseDetails.responseText.split("/build_facility.php?colony=")[1].split("\"",2)[0]; //Grab the colony ID. Used to reference back to the right colony row.
			//Get wealth
			var wages=parseInt(responseDetails.responseText.split("id=\"wages\" value=\"")[1].split("\"")[0]);
			//Get indecies
			var indecies = new Array(4);
			//Grab indecies from XML feed
			var indices = responseDetails.responseText.split("Indices:</td>")[1];
			indices = indices.match(/(\d+)%<\/div>/g);
			indecies[0]=parseInt(indices[0]);
			indecies[1]=parseInt(indices[1]);
			indecies[2]=parseInt(indices[2]);
			indecies[3]=parseInt(indices[3]);
			
			/*indecies[0]=parseInt(responseDetails.responseText.split("Indices:</td>")[1].split("Urban:")[1].split("%")[0]);
			indecies[1]=parseInt(responseDetails.responseText.split("Indices:</td>")[1].split("Industry:")[1].split("%")[0]);
			indecies[2]=parseInt(responseDetails.responseText.split("Indices:</td>")[1].split("Tech:")[1].split("%")[0]);
			indecies[3]=parseInt(responseDetails.responseText.split("Indices:</td>")[1].split("Military:")[1].split("%")[0]);*/
			
			//Populate table cells with data, alert if necessary
			document.getElementById("indu"+colony).innerHTML=document.getElementById("indu"+colony).innerHTML.replace(/TBD/, indecies[0]);
			if(indecies[0] > parseInt(document.getElementById("IndexAlarm").value)){
				document.getElementById("indu"+colony).style.backgroundImage="none";
				document.getElementById("indu"+colony).style.backgroundColor=document.getElementById("AttentionColor").value;
				document.getElementById("alarms"+colony).value=parseInt(document.getElementById("alarms"+colony).value)+1;
			}
			document.getElementById("indi"+colony).innerHTML=document.getElementById("indi"+colony).innerHTML.replace(/TBD/, indecies[1]);
			if(indecies[1] > parseInt(document.getElementById("IndexAlarm").value)){
				document.getElementById("indi"+colony).style.backgroundImage="none";
				document.getElementById("indi"+colony).style.backgroundColor=document.getElementById("AttentionColor").value;
				document.getElementById("alarms"+colony).value=parseInt(document.getElementById("alarms"+colony).value)+1;
			}
			document.getElementById("indt"+colony).innerHTML=document.getElementById("indt"+colony).innerHTML.replace(/TBD/, indecies[2]);
			if(indecies[2] > parseInt(document.getElementById("IndexAlarm").value)){
				document.getElementById("indt"+colony).style.backgroundImage="none";
				document.getElementById("indt"+colony).style.backgroundColor=document.getElementById("AttentionColor").value;
				document.getElementById("alarms"+colony).value=parseInt(document.getElementById("alarms"+colony).value)+1;
			}
			document.getElementById("indm"+colony).innerHTML=document.getElementById("indm"+colony).innerHTML.replace(/TBD/, indecies[3]);
			if(indecies[3] > parseInt(document.getElementById("IndexAlarm").value)){
				document.getElementById("indm"+colony).style.backgroundImage="none";
				document.getElementById("indm"+colony).style.backgroundColor=document.getElementById("AttentionColor").value;
				document.getElementById("alarms"+colony).value=parseInt(document.getElementById("alarms"+colony).value)+1;
			}
			
			//Wealth comparison
			if(parseInt(document.getElementById("wealth"+colony).value) > wages){
				document.getElementById("wealthCell"+colony).style.backgroundImage="none";
				document.getElementById("wealthCell"+colony).style.backgroundColor=document.getElementById("AttentionColor").value;
				document.getElementById("alarms"+colony).value=parseInt(document.getElementById("alarms"+colony).value)+1;
			}
			
			//Add local trade link if available
			//alert(responseDetails.responseText.split("class=greyed href='/viewstations.php")[1]);
			if(responseDetails.responseText.search("class=greyed href='/viewstations.php") < 0){
				document.getElementById("clink"+colony).innerHTML = document.getElementById("clink"+colony).innerHTML + "<br><a href=\"/viewstations.php?colony="+colony+"\" target=\"_blank\">Local Trade</a>";
			}
			
			document.getElementById("mallCalcs").value=parseInt(document.getElementById("mallCalcs").value)+1;
			document.getElementById("statusBar").innerHTML = document.getElementById("statusBar").innerHTML.split(":")[0] + ":" + (parseInt(document.getElementById("statusBar").innerHTML.split(":")[1])-1);
			//Sorting algorithm, set to run only when all calculations have completed and only for default sort
			if(parseInt(document.getElementById("mallCalcs").value)==parseInt(document.getElementById("numColonies").value)*2 && window.location.search.substring(1).search("&order")<0){
				document.getElementById("statusBar").innerHTML="Sorting";
				//alert("Last one");
				var nn=parseInt(document.getElementById("numColonies").value);
				var off=parseInt(document.getElementById("RowOffset").value)
				var rowCode = new Array(nn);
				var rowID = new Array(nn);
				for(var ii=0+off;ii<nn+off;ii++){
					rowCode[ii-off]=document.getElementById("mainTable").rows[ii].innerHTML;
					rowID[ii-off]=parseInt(document.getElementById("ii"+(ii-off)).value);
				}
				//Basic Sort
				//Will put colonies with alarms on top
				//Linear Time
				var top=0;
				var bottom=nn-1;
				var direction = 1;
				var temp; //to hold swap values
				while(bottom > top){
					if(direction==0){//going down from the top, looking for alarms
						while(parseInt(document.getElementById("alarms"+rowID[top]).value)>0 && bottom > top){
							top++;
						}
						//swap values and go in other direction
						temp=rowCode[top];
						rowCode[top]=rowCode[bottom];
						rowCode[bottom]=temp;
						temp=rowID[top];
						rowID[top]=rowID[bottom];
						rowID[bottom]=temp;
						direction=1;
					}else{//going up from bottom, looking for no alarms
						while (parseInt(document.getElementById("alarms"+rowID[bottom]).value)==0 && bottom > top){
							bottom--;
						}
											//swap values and go in other direction
						temp=rowCode[top];
						rowCode[top]=rowCode[bottom];
						rowCode[bottom]=temp;
						temp=rowID[top];
						rowID[top]=rowID[bottom];
						rowID[bottom]=temp;
						direction=0;
					}
				}//end basic sort
				
				//Advanced Sort
				//Will order colonies by the number of alarms they have
				//Quadratic Time (May be slow if you have lots of colonies)
				top=0;
				while(bottom>0){
					while(top<bottom){
						if(parseInt(document.getElementById("alarms"+rowID[top+1]).value)>parseInt(document.getElementById("alarms"+rowID[top]).value)){
							temp=rowCode[top];
							rowCode[top]=rowCode[top+1];
							rowCode[top+1]=temp;
							temp=rowID[top];
							rowID[top]=rowID[top+1];
							rowID[top+1]=temp;
						}
						top++;
					}
					top=0;
					bottom--;
				}//end advanced sort
				
				//Write the table rows back to the document
				for(ii=0+off;ii<nn+off;ii++){
					document.getElementById("mainTable").rows[ii].innerHTML=rowCode[ii-off];
					//rowID[ii]=parseInt(document.getElementById("ii"+ii).value);
				}
				document.getElementById("statusBar").style.visibility = "hidden"; 
			}
		}
	});
	}//end of 1 time if wrapper
	

}

}

//Code to auto-populate build amounts with the necessary number of buildings
if(AutoBuild && window.location.search.substring(1).search("&toBuild=") > 0){
	var ii;
	for(ii = 0; ii < document.body.getElementsByTagName("input").length; ii++){
		if(document.body.getElementsByTagName("input")[ii].type=="text"&& document.body.getElementsByTagName("input")[ii].name!="keyword"){//If is a text box and one of the right text boxes
			document.body.getElementsByTagName("input")[ii].value=parseInt(window.location.search.substring(1).split("&toBuild=")[1]);
		}
	}
}

},1000);