// ==UserScript==
// @name          BVS Zombjas Hot-keys
// @namespace     EmpactWB
// @description   Hot-keys to make Zombjas less clicky
// @include       http://*animecubed.com/billy/bvs/zombjas.*
// ==/UserScript==

function process_event(event)
{

	if (event.keyCode==66)		//Buy Z Skills
	{
		document.forms.namedItem("zskill").submit();	//Buy Z Skills
	}

	if (event.keyCode==46)		//Erase Messages
	{
		document.forms.namedItem("emess").submit();	//Erase Messages
	}

	if (event.keyCode==77)		//Uninfect
	{
		document.forms.namedItem("zheal").submit();	//Uninfect
	}

	if (event.keyCode==38)		//Grab a Bargain Bar
	{
		document.forms.namedItem("zarmory").submit();	//Grab a Bargain Bar
	}

	if (event.keyCode==86)		//Pull Veggie
	{
		document.forms.namedItem("pullveggie").submit();	//Pull Veggie
	}

	if (event.keyCode==84)		//Z-Chat
	{
		document.forms.namedItem("zchat").wrappedJSObject.submit();	//Z-Chat
	}

	if (event.keyCode==84)		//Pop Sonar
	{
		document.forms.namedItem("zsonar").wrappedJSObject.submit();	//Pop Sonar
	}

	if (event.keyCode==70)		//Fight Zombjas
	{
		document.forms.namedItem("zfight").submit();	//Fight Zombjas
	}

	if (event.keyCode==72)		//Heal
	{
		document.forms.namedItem("zhpheal").submit();	//Heal
	}

	if (event.keyCode==85)		//Full Heal
	{
		document.forms.namedItem("zhpfheal").submit();	//Full Heal
	}

	if (event.keyCode==87)		//Move Up
	{
		document.forms.namedItem("moveu").submit();	//Move Up
	}

	if (event.keyCode==69)		//Move Up-Right
	{
		document.forms.namedItem("moveur").submit();	//Move Up-Right
	}

	if (event.keyCode==68)		//Move Right
	{
		document.forms.namedItem("mover").submit();	//Move Right
	}

	if (event.keyCode==67)		//Move Down-Right
	{
		document.forms.namedItem("movedr").submit();	//Move Down-Right
	}

	if (event.keyCode==88)		//Move Down
	{
		document.forms.namedItem("moved").submit();	//Move Down
	}

	if (event.keyCode==90)		//Move Down-Left
	{
		document.forms.namedItem("movedl").submit();	//Move Down-Left
	}

	if (event.keyCode==65)		//Move Left
	{
		document.forms.namedItem("movel").submit();	//Move Left
	}

	if (event.keyCode==81)		//Move Up-Left
	{
		document.forms.namedItem("moveul").submit();	//Move Up-Left
	}

	if (event.keyCode==104)		//Move Up
	{
		document.forms.namedItem("moveu").submit();	//Move Up
	}

	if (event.keyCode==105)		//Move Up-Right
	{
		document.forms.namedItem("moveur").submit();	//Move Up-Right
	}

	if (event.keyCode==102)		//Move Right
	{
		document.forms.namedItem("mover").submit();	//Move Right
	}

	if (event.keyCode==99)		//Move Down-Right
	{
		document.forms.namedItem("movedr").submit();	//Move Down-Right
	}

	if (event.keyCode==98)		//Move Down
	{
		document.forms.namedItem("moved").submit();	//Move Down
	}

	if (event.keyCode==97)		//Move Down-Left
	{
		document.forms.namedItem("movedl").submit();	//Move Down-Left
	}

	if (event.keyCode==100)		//Move Left
	{
		document.forms.namedItem("movel").submit();	//Move Left
	}

	if (event.keyCode==103)		//Move Up-Left
	{
		document.forms.namedItem("moveul").submit();	//Move Up-Left
	}

	if (event.keyCode==83)		//Search
	{
		document.forms.namedItem("zsearch").submit();	//Search
	}

	if (event.keyCode==73)		//Attack Bargler
	{
		document.forms.namedItem("barglers").submit();	//Attack Bargler
	}

	if (event.keyCode==79)		//Attack Thriller
	{
		document.forms.namedItem("thrillers").submit();	//Attack Thriller
	}

	if (event.keyCode==80)		//Attack Nom
	{
		document.forms.namedItem("noms").submit();	//Attack Nom
	}

	if (event.keyCode==75)		//Attack Thumper
	{
		document.forms.namedItem("thumpers").submit();	//Attack Thumper
	}

	if (event.keyCode==76)		//Attack Zombulator
	{
		document.forms.namedItem("zombulator").submit();	//Attack Zombulator
	}

	if (event.keyCode==27)		//Refresh
	{
		document.forms.namedItem("ref").submit();	//Refresh
	}

	if (event.keyCode==82)		//Restock Medic Supplies
	{
		document.forms.namedItem("zhealthstock").submit();	//Restock Medic Supplies
	}

	if (event.keyCode==78)		//Ping Map
	{
		document.forms.namedItem("zping").submit();	//Ping Map
	}

	if (event.keyCode==74)		//Build Teleporter
	{
		document.forms.namedItem("zteleporter").submit();	//Build Teleporter
	}

	if (event.keyCode==9)		//Pull ZAP
	{
		document.forms.namedItem("zbank").submit();	//Pull ZAP
	}

	if (event.keyCode==13)		//Enter Map
	{
		document.forms.namedItem("entermap").submit();	//Enter Map
	}

}
window.addEventListener("keyup", process_event, false);