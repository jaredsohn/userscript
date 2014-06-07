// ==UserScript==
// @name           Battledomer
// @namespace      Steinn
// @description    Automatically fights on battledome
// @include        http://www.neopets.com/battledome/*
// ==/UserScript==

function random(from, to)
{
	return Math.floor(Math.random() * (to-from)) + from;
}

if(!GM_getValue("petname")) //Ask for set pet name case doesn�t exist
{
	var askpet = prompt("past you pet name here.\n iTs CasE SenSiTivE", "pet_example")
	GM_setValue("petname", askpet)
}

if(GM_getValue("finished")==undefined) // set function finish case doesn�t exist
{
	GM_setValue("finished", false)
}

if(!GM_getValue("itens")) // ask for itens case doesn�t exist
{
	var askitems = prompt("how much itens do you wann use? \nINSERT ONLY 1 OR 2", "1")
	if((askitems.value>2) || (askitems.length>1))
	{
		alert("please select only 1 or 2 items");
	}
	GM_setValue("itens", askitems);
}
if(GM_getValue("itens")==1)
{
	var item1 = "activate_equip(1);";
	var item2 = "";
}
else
{
	var item1 = "activate_equip(1);";
	var item2 = "activate_equip(2);";
}

if(GM_getValue("finished"))
{
	GM_setValue("finished", false)
	setTimeout(function(){location.href="http://www.neopets.com/battledome/battledome.phtml?type=oneplayer&subtype=challenge"}, random(4200, 4800))
}

var ids = ["20","20","20","20"];
var ids2 = ids[random(0, 3)];

if(location.href.match("subtype=challenge")) //if is page to select fight
{
	setTimeout(function(){location.href="http://www.neopets.com/battledome/process_battledome.phtml?petselect=" + GM_getValue('petname') + "&type=oneplayerchallenge&opponent_id=" + ids2;}, random(2200, 4100))
}

if(location.href.match("fightid")) // if is fight
{
	if(lol1=document.getElementsByTagName("textarea")[0])
	{
		document.getElementsByTagName("center")[0].getElementsByTagName("select")[0].selectedIndex = 1; //select the item to attack
		setTimeout(function(){ location.href="javascript:" + item1 + item2 + "SubmitFightForm();"}, random(2200, 4100)) // para form battle
	}
	var gettext = document.getElementsByTagName("center")[0].getElementsByTagName("b")[0];
	if(gettext.innerHTML.match("You have won this fight!"))
	{
		setTimeout(function(){location.href="javascript: document.forms[1].submit();"}, random(2200, 4100)) // para ambos os forms next and back
	}

}

if(location.href.match("battledome_fightend")) // fight finished
{
	GM_setValue("finished", true);
	setTimeout(function(){location.href="javascript: document.forms[1].submit();"}, random(2200, 4100))
}