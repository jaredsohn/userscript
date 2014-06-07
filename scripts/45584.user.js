// ==UserScript==
// @name           Command Post 2.0
// @namespace      http://www.mediwar.com/army/66737
// @description    Displays necessary information needed to get optimal SA and DA
// @include        http://mediwar.com/commandpost.php
// @include        http://www.mediwar.com/commandpost.php
// ==/UserScript==

var myBody = document.getElementsByTagName("body")[0];
var myBodyElements = myBody.getElementsByTagName("td");

var myText;
	
var commandOffset;
if(myBodyElements.length == 182)	
	commandOffset =0;
else if(myBodyElements.length == 183)	
	commandOffset =1;
else if(myBodyElements.length == 184)	
	commandOffset =2;


var weap = myBodyElements[153+commandOffset];
var weapT = weap.innerHTML;
weapT = weapT.replace(',','');
weapT = parseInt(weapT);

var ASoldier = myBodyElements[162+commandOffset];
var ASoldierT = ASoldier.innerHTML;
ASoldierT = ASoldierT.replace(',','');
ASoldierT = parseInt(ASoldierT);

var AMerc = myBodyElements[169+commandOffset];
var AMercT = AMerc.innerHTML;
AMercT = AMercT.replace(',','');
AMercT = parseInt(AMercT);

var armor = myBodyElements[155+commandOffset];
var armorT = armor.innerHTML;
armorT = armorT.replace(',','');
armorT = parseInt(armorT);

var DSoldier = myBodyElements[164+commandOffset];
var DSoldierT = DSoldier.innerHTML;
DSoldierT = DSoldierT.replace(',','');
DSoldierT = parseInt(DSoldierT);

var DMerc = myBodyElements[171+commandOffset];
var DMercT = DMerc.innerHTML;
DMercT = DMercT.replace(',','');
DMercT = parseInt(DMercT);

var BMerc = myBodyElements[173+commandOffset];
var BMercT = BMerc.innerHTML;
BMercT = BMercT.replace(',','');
BMercT = parseInt(BMercT);

var ASoldierCount = AMercT+ASoldierT+BMercT;
var DSoldierCount = DMercT+DSoldierT+BMercT;


//WEAPON
if(weapT < ASoldierCount)
{
	var weaps = ASoldierCount - weapT;
	myText=document.createTextNode(" *** Need "+weaps+ " more weapons! ***");
	weap.style.color="orange";
	weap.appendChild(myText);
}
else if(weapT > ASoldierCount)
{
	var SNeeded = weapT - ASoldierCount;
	myText=document.createTextNode(" *** "+SNeeded+ " more Attack Specialist(s)! ***");
	ASoldier.style.color="orange";
	ASoldier.appendChild(myText);
}
	
	
//ARMOR
if(armorT < DSoldierCount)
{
	var armors = DSoldierCount - armorT;
	myText=document.createTextNode(" *** Need "+armors+ " more armors! ***");
	armor.style.color="orange";
	armor.appendChild(myText);
}
else if(armorT > DSoldierCount)
{
	var DNeeded = armorT - DSoldierCount;
	myText=document.createTextNode(" *** Need "+DNeeded+" more Defense Specialist(s)! ***");
	DSoldier.style.color="orange";
	DSoldier.appendChild(myText);
}