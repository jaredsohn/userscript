// ==UserScript==

// @name           CommanderEffect
// @namespace      http://www.smtech.org/ae/
// @description    Displays the effect of commanders on the Empire Capacity window and on bases
// @include        http://*.astroempires.com/empire.aspx?view=bases_capacities*
// @include        http://*.astroempires.com/base.aspx?base=*
// @exclude 	 http://*.astroempires.com/base.aspx?base=*&view=structures
// @exclude 	 http://*.astroempires.com/base.aspx?base=*&view=defenses
// @exclude 	 http://*.astroempires.com/base.aspx?base=*&view=production
// @exclude 	 http://*.astroempires.com/base.aspx?base=*&view=research
// @exclude 	 http://*.astroempires.com/base.aspx?base=*&view=trade
// ==/UserScript==


//GLOBAL FUNCTIONS
function addCommanderValue(CommanderArray, fieldHTML, totalArray){
	CommanderLevel = CommanderArray[1];
	fieldValue = fieldHTML.innerHTML.split("(")[0];
	commanderEffValue = fieldValue / ((100-CommanderLevel)/100);
	fieldHTML.innerHTML = fieldHTML.innerHTML + "<font color='green'>{"+Math.round(commanderEffValue)+"}";
	totalArray[CommanderArray[0]] = totalArray[CommanderArray[0]] + Math.round(commanderEffValue);
}


//Empire Capacity Function
function calculateEmpireCapacities(){
var baserows = document.evaluate( "//table[@class='layout listing']//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
var commanderrows = document.evaluate( "//table[@class='layout listing']//tr//td[@class='help comment']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

var Totals = [];
Totals['Production'] = 0;
Totals['Construction'] = 0;

i=0;
var baseRow = baserows.snapshotItem(i);
var commanderRow = commanderrows.snapshotItem(i);

//Helper function
function addNormalProduction(){
	Totals['Production'] = Totals['Production'] + Math.round(document.evaluate("td[6]", baseRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML.split("(")[0]);
}
//Helper function
function addNormalConstruction(){
	Totals['Construction'] = Totals['Construction'] + Math.round(document.evaluate("td[5]", baseRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML.split("(")[0]);
}


while(baseRow){	
	if(baseRow.innerHTML.indexOf("map.aspx?loc=") != -1){
		commanderHTML = commanderRow.innerHTML;
		CommanderArray = [];
		if(commanderHTML.indexOf("&nbsp") == -1){
			commanderHTML  = commanderHTML .split("(")[1].split(")")[0];
			CommanderArray = commanderHTML .split(" ");
		} else {
			CommanderArray = null;
		}
		if(CommanderArray){
			if(CommanderArray[0] == "Production"){
				fieldHTML = document.evaluate( "td[6]", baseRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);		 
				addNormalConstruction();
				addCommanderValue(CommanderArray, fieldHTML, Totals)
			} else if(CommanderArray[0] == "Construction"){
				fieldHTML = document.evaluate( "td[5]", baseRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
				addNormalProduction();
				addCommanderValue(CommanderArray, fieldHTML, Totals)
			} else { //Research or other commander;
				addNormalProduction();
				addNormalConstruction();
			}
		} else { // No Commander
			addNormalProduction();
			addNormalConstruction();

		}
	}
	i++;
	baseRow = baserows.snapshotItem(i);
	commanderRow = commanderrows.snapshotItem(i);
}
var sumHTMLCon = document.evaluate("td[4]", baserows.snapshotItem(baserows.snapshotLength-1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
var sumHTMLProd = document.evaluate("td[5]", baserows.snapshotItem(baserows.snapshotLength-1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);	
sumHTMLProd.innerHTML = sumHTMLProd .innerHTML +"<font color='green'>{"+Math.round(Totals['Production'])+"}";
sumHTMLCon.innerHTML = sumHTMLCon.innerHTML +"<font color='green'>{"+Math.round(Totals['Construction'])+"}";
}

//Base commander function
function calculateBaseCommanderEffect(){
	var commanderHTML = document.evaluate( "//table[@class='base']//tr[2]//td[@align='center']//small", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(commanderHTML.snapshotLength == 0)
		commanderHTML = document.evaluate( "//td[@class='astro-details_box-status-center box-status-center']//small", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(commanderHTML.snapshotLength == 0)
		return;
	commanderHTML = commanderHTML.snapshotItem(0).innerHTML;
	commanderHTML  = commanderHTML.split("(")[1].split(")")[0];
	CommanderArray = commanderHTML.split(" ");
	

	//Construction, Production and Research Commander
	capacityHTML = document.evaluate("//table[@class='layout listing3']//tr[@align='center']//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0; i < capacityHTML .snapshotLength-1; i++){
		rowHTML = capacityHTML.snapshotItem(i).innerHTML;
		if(rowHTML == CommanderArray[0])
		{
			fieldHTML = capacityHTML.snapshotItem(i+1);
			addCommanderValue(CommanderArray, fieldHTML, [])
			break;
		}
	}

	//Logistic Commander
	buildings = document.evaluate("//table[@id='base_resume-structures']//table[@class='layout']//tr[@align='center']//td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	type = buildings.snapshotItem(2).innerHTML;
	level = buildings.snapshotItem(3);
	if(type.indexOf("Jump Gate")!=-1 && CommanderArray[0]=="Logistics"){
		types = type.split("<br>")
		levels = level.innerHTML.split("<br>")
		i = 0;
		while(types[i]!="Jump Gate" && i < types.length)
		i++;
		jglevel = parseInt(levels[i]);
		clevel = parseInt(CommanderArray[1]);
		ed = (1/(jglevel+1)*(100-clevel)/100)
		jg = (1/ed)-1
		jg = Math.round(jg*100)/100

		levels[i] = levels[i]+"<font color='green'>{"+jg+"}</font>";
		s = ""
		y=0
		while(levels[y] != "" && y < levels.length)
			{
   		 	s+= levels[y]+"<br>"
   		 	y++;
			}
		level.innerHTML = s;
	}
	
	

}
if (location.href.indexOf('empire.aspx?view=bases_capacities')!=-1) {
	calculateEmpireCapacities();
} else if (location.href.indexOf('base.aspx')!=-1) {
if (location.search.indexOf('structures')==-1)
	calculateBaseCommanderEffect();
