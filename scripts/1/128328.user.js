// ==UserScript==
// @name           TEST Evemon Skill Exporter
// @namespace      avidday
// @description    Export missing skills to skill plan
// @include        https://tools.pleaseignore.com/testskills/pilot.php*
// ==/UserScript==



var planName = document.getElementById("selectedpack").firstChild.innerHTML;

var missingSkills = document.getElementById("missingskills");

var tooManyVariables = document.createElement('tr');
tooManyVariables.innerHTML = "<td colspan=\"2\">EVEmon XML:<br><textarea id=\"finalOutput\" rows=20 cols=30></textarea></td>";

missingSkills.appendChild(tooManyVariables);

var xmlLocation = document.createElement('div');
xmlLocation.id = "xmlOutput";
xmlLocation.setAttribute("hidden","true");

missingSkills.appendChild(xmlLocation);

var getSkillList = document.evaluate(
			".//tr",
			missingSkills,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

var numSkills = getSkillList.snapshotLength-2;
var outLocation = document.getElementById('xmlOutput');
var finallyHereItIs = document.getElementById('finalOutput');


xmlify();

function xmlify() {
		
	var planStuff = document.createElement('plan'); 
	planStuff.setAttribute("xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");
	planStuff.setAttribute("xmlns:xsd","http://www.w3.org/2001/XMLSchema");
	planStuff.setAttribute("name", planName);
	planStuff.setAttribute("revision","3464");
	var sortStuff = document.createElement('sorting'); 
	sortStuff.setAttribute("criteria","None");
	sortStuff.setAttribute("order","None");
	sortStuff.setAttribute("groupByPriority","false");
	
	outLocation.appendChild(planStuff);
	outLocation.lastChild.appendChild(sortStuff);

	
	var reallyHere = outLocation.lastChild;


	for (var i = 1; i<=numSkills; i++){
		var currentSkill = document.evaluate(
			".//td",
			getSkillList.snapshotItem(i),
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		var skillName = currentSkill.snapshotItem(0).innerHTML;
		
		var skillLevel = currentSkill.snapshotItem(1).innerHTML;

		var skillElement = document.createElement('entry');
		skillElement.setAttribute("type","Planned");
		skillElement.setAttribute("level",skillLevel);
		skillElement.setAttribute("skill",skillName);
		
		
		reallyHere.appendChild(skillElement);
		
		

	}

	finallyHereItIs.innerHTML = "<?xml version=\"1.0\"?>\n" + outLocation.innerHTML;

}