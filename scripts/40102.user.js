// ==UserScript==
// @name           QnD Skill Filter
// @namespace      http://userscripts.org/scripts/
// @description    A quick and dirty way to filter the list of combat skills.
// @include        http://*kingdomofloathing.com/fight.php*
// ==/UserScript==

var currentVersion = 0.31415;
var scriptName = "QnD Skill Filter";

function showSkillFilter ( ) 
{
//	alert('ZOMG IT WORKS');
	var blacklist = GM_getValue('QnDSF_Blacklist', '');
	hideSkillFilter();
	if(blacklist==''){
		alert('No skills blacklisted.');
		return;
	}
	var blarray = blacklist.split('|');
	var newDiv = document.createElement('div');
	newDiv.id="bl_div";
	newDiv.innerHTML="<center><table width=\"95%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>"+
		"<tr><td style=\"color: white;\" align=\"center\" bgcolor=\"blue\"><b>Skill Blacklist:</b></td></tr>"+
		"<tr><td style=\"border: 1px solid blue; padding: 5px;\"><center>"+
		"<table><tbody><tr><td>You have the following skill(s) blacklisted:</td></tr><tr><td id=\"bl_listing\"></td></tr></tbody></table></center></td></tr>"+
		"<tr><td height=\"4\"></td></tr></tbody></table></center></div>";
	document.getElementsByTagName('body')[0].insertBefore(newDiv,document.getElementsByTagName('body')[0].firstChild);

	newDiv = document.getElementById('bl_listing');
	var newLink;
	for(var i=0; i<blarray.length;i++){
		newDiv.appendChild(document.createTextNode('Filter: '+blarray[i]+" "));
		newLink = document.createElement('span');
		with(newLink) {
			id="bl_el_"+i;
			style.cursor = "pointer";
			appendChild(document.createTextNode('(remove)'));
			className="tiny";
			addEventListener('click',deleteSkillFilter,'true');
		}
		newDiv.appendChild(newLink);
		newDiv.appendChild(document.createElement('br'));
	}
}

function addSkillFilter ( ) {
	//alert('ZOMG IT WORKS');
	//First, remove the blacklist from showing...
	hideSkillFilter();
	var filtVal = prompt('Please enter the number or partial name of the skill to remove');
	if (filtVal == null || filtVal==''){
		return;
	}
	var blacklist = GM_getValue('QnDSF_Blacklist', '');
	if(blacklist!='') blacklist=blacklist+"|";
	blacklist=blacklist+filtVal;
	GM_setValue('QnDSF_Blacklist', blacklist);
	GM_setValue('QnDSF_UseBlacklist', 'true');
	alert("Filter "+filtVal+" added to blacklist!");
}

function hideSkillFilter(){
	var blDiv = document.getElementById("bl_div");
	if(blDiv != null){
		blDiv.parentNode.removeChild(blDiv);
	}
}

function deleteSkillFilter ( evt ) {
	var itemToDel = evt["target"]["id"];
	if(itemToDel==undefined) return;
	itemToDel = (itemToDel.substring(6,itemToDel.length)|0);
	var blarray = GM_getValue('QnDSF_Blacklist', '').split('|');
	if((itemToDel|0)>blarray.length){
		alert("Invalid item selected!");
		return;
	}
	if(itemToDel==0){
		blarray=blarray.slice(1,blarray.length);
	} else if(itemToDel==blarray.length-1) {
		blarray=blarray.slice(0,blarray.length-1);
	} else {
		blarray=blarray.slice(0,itemToDel-1).concat(blarray.slice(itemToDel+1,blarray.length));
	}
	GM_setValue('QnDSF_Blacklist', blarray.join("|"));
	hideSkillFilter();
	showSkillFilter();
}

//Code to execute

switch(document.location.pathname){

   case "/fight.php":
	//Get the blacklist
	var blacklist = GM_getValue('QnDSF_Blacklist', '');
	var blarray = blacklist.split('|');
	var skilllist = "X";
	for(var i=0; i<document.getElementsByTagName('select').length;i++){
		if(document.getElementsByTagName('select')[i].name=="whichskill")
			skilllist = document.getElementsByTagName('select')[i].options;
	}
//	alert("skilllist is: "+skilllist);
	if(skilllist != "X" && GM_getValue('QnDSF_UseBlacklist', 'false')=='true'){
//		alert("We may filter!");
		for(var i=0;i<blarray.length;i++) {
//			alert("We may filter on "+i+ " - " + blarray[i]);
			var c = blarray[i];
			if(c>0){
				//It's a skill number
//				alert("Checking for "+c+" as numeric");
				for(var j=0; j<skilllist.length;j++){
					if(skilllist[j].value==c){
						//Pop this item out
						skilllist[0].parentNode.remove(j);
						j--;
					}
				}
			} else {
				//It's a partial skill name
				//As wildcards aren't explicitly supported, we can handle them as we want.
				//I choose to replace the multi-match (*+?) with .*, .+, and .?
				var d = c.split("*").join(".*");
				d = d.split("+").join(".+");
				d = d.split("?").join(".?");
				d = new RegExp(d,"i");
//				alert("d is "+d);
				for(var j=1; j<skilllist.length;j++){
					
//					alert("Checking against "+skilllist[j].text);
					if(d.test(skilllist[j].text)){
						//Pop this item out
//						alert("Found skill "+c+"!");
						skilllist[0].parentNode.remove(j);
						j--;
					}
				}
			}
		}
	}
	var myTRParent = "X";
	for(var i=0; i<document.getElementsByTagName('form').length;i++){
		if(document.getElementsByTagName('form')[i].name=="runaway")
			myTRParent = document.getElementsByTagName('form')[i];
	}
	if(myTRParent=="X")
		break;
	var myNewTR = document.createElement("tr");
	var myNewTD = document.createElement("td");
	myNewTD.className="tiny";
	myNewTD.align="center";
	var newLink = "X";
	//Insert link to add filter
	newLink = document.createElement('span');
	with(newLink) {
		title="Add Skill Filter"
		style.cursor = "pointer";
		appendChild(document.createTextNode('(add skill blacklist)'));
		addEventListener('click',addSkillFilter,'true');
	}
	myNewTD.appendChild(newLink);
	myNewTD.appendChild(document.createTextNode(' - '));

	//Insert link to show filter
	newLink = document.createElement('span');
	with(newLink) {
		title="Show Skill Filter"
		style.cursor = "pointer";
		appendChild(document.createTextNode('(show skill blacklist)'));
		addEventListener('click',showSkillFilter,'true');
	}
	myNewTD.appendChild(newLink);
	myNewTR.appendChild(myNewTD);
	myTRParent.parentNode.insertBefore(myNewTR,myTRParent);
	//Insert link to remove filter
	break;
}

