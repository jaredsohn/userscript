// ==UserScript==
// @name           Pirates Plunder Bot
// @namespace      http://userscripts.org/users/94679
// @description    Script that automatically does "Plunder" jobs on the Pirates facebook app. Automatically buys required items.
// @include        http://apps.facebook.com/piratesrule/*
// @version		   0.3.3
// ==/UserScript==



//GUI shit

function createConsole(){
	var d = document.createElement("div");
	d.id = d.name = "console";
	document.body.appendChild(d);
	d = document.getElementById("console");
	d.style.background = "black";
	d.style.color = "lightgreen";
	d.style.width = "25%";
	d.style.height = "90%";
	d.style.fontSize = "12px";
	d.style.bottom = "0px";
	d.style.right = "10px";
	d.style.position = "fixed";
	d.style.zIndex = 0x01;
}

// options placeholder thingies
var enabledAutoPet = GM_getValue("autoPet", true);
var bankLimit = GM_getValue("bankLimit", 1000);
var enabledAutoPlunder = GM_getValue("autoPlunder", true);
var enabledAutoBuy = GM_getValue("autoBuy", true);
var enabledAutoHeal = GM_getValue("autoHeal", true);
var enabledAutoFight = GM_getValue("autoFight", true);

function setBankMoney()
{
	if (parseInt(document.getElementById("bankmoney").value))
	{
		trace("Set maximum purse to " + document.getElementById("bankmoney").value);
		bankLimit = parseInt(document.getElementById("bankmoney").value);
		GM_setValue("bankLimit", bankLimit);
	}
	else 
		alert("Autobank ammount must be a number!");
}

function createConsoleControls()
{
	var controls = document.createElement("div");
	controls.id = controls.name = "consolecontrols";
	document.getElementById("console").appendChild(controls);
	controls = document.getElementById("consolecontrols");
	controls.style.width = "100%";
	controls.style.height = "140px";
	controls.style.position = "relative";
	controls.innerHTML = "Options: <br> blue: enabled | red: disabled";
	
	
	//do all teh options and shit
	//hide/show console
	hideConsole = document.createElement("div");
	hideConsole.id = hideConsole.name = "hideConsole";
	document.getElementById("consolecontrols").appendChild(hideConsole);
	hideConsole.style.color = "dodgerblue";
	hideConsole.innerHTML = "Show Console";
	hideConsole.addEventListener('click', hideConsoleText, false);
	
	//autoplunder
	allowAutoPlunder = document.createElement("div");
	allowAutoPlunder.id = allowAutoPlunder.name = "allowAutoPlunder";
	document.getElementById("consolecontrols").appendChild(allowAutoPlunder);
	allowAutoPlunder.style.color = "dodgerblue";
	allowAutoPlunder.innerHTML = "Auto Plunder";
	allowAutoPlunder.addEventListener('click', switchAutoPlunder, false);
	
	//autobuyitems
	allowAutoBuy = document.createElement("div");
	allowAutoBuy.id = allowAutoBuy.name = "allowAutoBuy";
	document.getElementById("consolecontrols").appendChild(allowAutoBuy);
	allowAutoBuy.style.color = "dodgerblue";
	allowAutoBuy.innerHTML = "Auto Buy";
	allowAutoBuy.addEventListener('click', switchAutoBuy, false);
	
	//autopet
	allowAutoPet = document.createElement("div");
	allowAutoPet.id = allowAutoPet.name = "allowAutoPet";
	document.getElementById("consolecontrols").appendChild(allowAutoPet);
	allowAutoPet.style.color = "dodgerblue";
	allowAutoPet.innerHTML = "Auto Nurture Pet";
	allowAutoPet.addEventListener('click', switchAutoPet, false);
	
	//autoFight
	allowAutoFight = document.createElement("div");
	allowAutoFight.id = allowAutoFight.name = "allowAutoFight";
	document.getElementById("consolecontrols").appendChild(allowAutoFight);
	allowAutoFight.style.color = "dodgerblue";
	allowAutoFight.innerHTML = "Auto Fight";
	allowAutoFight.addEventListener('click', switchAutoFight, false);
	
	//autoHeal
	allowAutoHeal = document.createElement("div");
	allowAutoHeal.id = allowAutoHeal.name = "allowAutoHeal";
	document.getElementById("consolecontrols").appendChild(allowAutoHeal);
	allowAutoHeal.style.color = "dodgerblue";
	allowAutoHeal.innerHTML = "Auto Heal";
	allowAutoHeal.addEventListener('click', switchAutoHeal, false);
	
	//banking ammount
	banking = document.createElement("div");
	banking.id = banking.name = "consoleBank";
	document.getElementById("consolecontrols").appendChild(banking);
	banking.style.color = "dodgerblue";
	banking.innerHTML = 'Autobank amount: <input type="text" id="bankmoney" name="bankmoney" value="' + GM_getValue("bankLimit", 100000) + '"/>' +
						'<input type="submit" id="setbankmoney" name="setbankmoney" value="Set"/>';
	var f = function() {
		unsafeWindow.document.getElementById("setbankmoney").onclick = setBankMoney;
	}
	setTimeout(f, 2000);
	
}

function switchAutoFight()
{
	if(GM_getValue("autoFight", true))
	{
		GM_setValue("autoFight", false);
		document.getElementById("allowAutoFight").style.color = "red";
	}
	else
	{
		GM_setValue("autoFight", true);
		document.getElementById("allowAutoFight").style.color = "dodgerblue";
	}
	enabledAutoFight = GM_getValue("autoFight", true);
}

function switchAutoHeal()
{
	if(GM_getValue("autoHeal", true))
	{
		GM_setValue("autoHeal", false);
		document.getElementById("allowAutoHeal").style.color = "red";
	}
	else
	{
		GM_setValue("autoHeal", true);
		document.getElementById("allowAutoHeal").style.color = "dodgerblue";
	}
	enabledAutoHeal = GM_getValue("autoHeal", true);
}

function switchAutoPet()
{
	if(GM_getValue("autoPet", true))
	{
		GM_setValue("autoPet", false);
		document.getElementById("allowAutoPet").style.color = "red";
	}
	else
	{
		GM_setValue("autoPet", true);
		document.getElementById("allowAutoPet").style.color = "dodgerblue";
	}
	enabledAutoPet = GM_getValue("autoPet", true);
}

function switchAutoPlunder()
{
	if(GM_getValue("autoPlunder", true))
	{
		GM_setValue("autoPlunder", false);
		document.getElementById("allowAutoPlunder").style.color = "red";
	}
	else
	{
		GM_setValue("autoPlunder", true);
		document.getElementById("allowAutoPlunder").style.color = "dodgerblue";
	}
	enabledAutoPlunder = GM_getValue("autoPlunder", true);
}

function switchAutoBuy()
{
	if(GM_getValue("autoBuy", true))
	{
		GM_setValue("autoBuy", false);
		document.getElementById("allowAutoBuy").style.color = "red";
	}
	else
	{
		GM_setValue("autoBuy", true);
		document.getElementById("allowAutoBuy").style.color = "dodgerblue";
	}
	enabledAutoBuy = GM_getValue("autoBuy", true);
}

function hideConsoleText()
{
	if(document.getElementById("console").style.height == "150px")
	{
		document.getElementById("console").style.height = "90%";
		document.getElementById("hideConsole").style.color = "dodgerblue";
		GM_setValue("minimiseConsole", false);
	}
	else
	{
		document.getElementById("console").style.height = "150px";
		document.getElementById("hideConsole").style.color = "red";	
		GM_setValue("minimiseConsole", true);
	}
}


function createConsoleText(){
	var consoleText = document.createElement("div");
	consoleText.id = consoleText.name = "consoleText";
	document.getElementById("console").appendChild(consoleText);
	consoleText = document.getElementById("consoleText");
	consoleText.style.width = "100%";
	consoleText.style.height = "80%";
	consoleText.style.position = "relative";
}


createConsole();
createConsoleControls();
createConsoleText();


//load options settings
GM_getValue("minimiseConsole", true) ? hideConsoleText() : null;
GM_getValue("autoPet", true) ? null : document.getElementById("allowAutoPet").style.color = "red";
GM_getValue("autoPlunder", true) ? null : document.getElementById("allowAutoPlunder").style.color = "red";
GM_getValue("autoBuy", true) ? null : document.getElementById("allowAutoBuy").style.color = "red";
GM_getValue("autoHeal", true) ? null : document.getElementById("allowAutoHeal").style.color = "red";
GM_getValue("autoFight", true) ? null : document.getElementById("allowAutoFight").style.color = "red";

var consoleText = Array()

function trace(v) {
	consoleText.push(v);
	document.getElementById("consoleText").innerHTML = "";
	for each (line in consoleText)
	{
		document.getElementById("consoleText").innerHTML = ">" + line + "<br>" + document.getElementById("consoleText").innerHTML;
	}
	if (consoleText.length > 35)
		consoleText.shift();
}


trace("console created");


//stats bar stats

var money = parseInt(document.getElementsByClassName("stats_info_box")[1].innerHTML.split(">")[1].replace(/,/g,""));
var health = parseInt(document.getElementById("app16421175101_current_health").innerHTML);
var fullHealth = parseInt(document.getElementById("app16421175101_current_health").parentNode.innerHTML.split("/")[2]);
var energy = parseInt(document.getElementById("app16421175101_current_energy").innerHTML);
var fullEnergy = parseInt(document.getElementById("app16421175101_current_energy").parentNode.innerHTML.split("/")[2]);
var strength = parseInt(document.getElementById("app16421175101_current_stamina").innerHTML);
var fullStrength = parseInt(document.getElementById("app16421175101_current_stamina").parentNode.innerHTML.split("/")[2]);
var exp = parseInt(document.getElementsByClassName("stats_info_box")[9].innerHTML.split("/")[0]);
var fullExp = parseInt(document.getElementsByClassName("stats_info_box")[9].innerHTML.split("/")[1]);

var crewCount = parseInt(document.getElementsByClassName("header_link")[10].innerHTML.split("(")[1].split(")")[0]);

function refreshStats(){
	money = parseInt(document.getElementsByClassName("stats_info_box")[1].innerHTML.split(">")[1].replace(/,/g,""));
	health = parseInt(document.getElementById("app16421175101_current_health").innerHTML);
	fullHealth = parseInt(document.getElementById("app16421175101_current_health").parentNode.innerHTML.split("/")[2]);
	energy = parseInt(document.getElementById("app16421175101_current_energy").innerHTML);
	fullEnergy = parseInt(document.getElementById("app16421175101_current_energy").parentNode.innerHTML.split("/")[2]);
	strength = parseInt(document.getElementById("app16421175101_current_stamina").innerHTML);
	fullStrength = parseInt(document.getElementById("app16421175101_current_stamina").parentNode.innerHTML.split("/")[2]);
	exp = parseInt(document.getElementsByClassName("stats_info_box")[9].innerHTML.split("/")[0]);
	fullExp = parseInt(document.getElementsByClassName("stats_info_box")[9].innerHTML.split("/")[1]);
	crewCount = parseInt(document.getElementsByClassName("header_link")[10].innerHTML.split("(")[1].split(")")[0]);
}


//click plunder button
function getPlunderBtn(jobparent) {
	var inputs = jobparent.parentNode.getElementsByTagName("input");
	for(i = 0; i < inputs.length; i++) {
		if(inputs[i].type == "submit")
			{return inputs[i]};
	}
	return null;
}

function clickPlunderBtn(jobparent) {
	getPlunderBtn(jobparent).parentNode.onsubmit(0);
}

//click links function
function clickElement(el) {
	var ce = document.createEvent("MouseEvents");
	ce.initEvent("click", true, true);
	el.dispatchEvent(ce);
}

function getButtonIn(label, list) {
   for each(item in list)
   {
       if(item.value == label)
          return item;
   }
}

function clickButton(label, list) {
	clickElement(getButtonIn(label, list));
}

//simple grindan bot
function requiredItems(jobparent){
	items = getPlunderBtn(jobparent).parentNode.getElementsByTagName("img");
	return items;
}

//change tab
function navigateToTab(tab){
	trace("going to tab "+(tab+1))
	tabs = document.getElementById("app16421175101_menubar").getElementsByTagName("a");
	clickElement(tabs[tab+1]);
}
	
//put stuff in global storage
function addToGlobalStorage(name, value){
	unsafeWindow.globalStorage["facebook.com"][name] = value;
}

//and get stuff out
function getFromGlobalStorage(name){
	return unsafeWindow.globalStorage["facebook.com"][name];
}


//////////////////////////////////////////
// ---- BRING ON THE BOTTING. LOL! ---- //
//////////////////////////////////////////


//shit to do the whole make arrays to play with, thing.
function getArmoryItems() {
	var tables = Array();
	for each(table in document.getElementsByTagName("table"))
	{ 
		if(table.style)
			if(table.style.height == "165px")
				tables.push({
			"table"	: table,
			"text"	: table.getElementsByTagName("strong")[0].innerHTML,
			"cost"  : parseInt((table.getElementsByTagName("strong")[1].innerHTML.split(">")[1]).replace(/,/g,"")),
			"upkeep": parseInt(table.getElementsByClassName("bad")[0].innerHTML.split(">")[1]),
			"buyIt"	: function() { var btn = getButtonIn("Buy", this.table.getElementsByTagName("input")); clickElement(btn); },
			"sellIt": function() { var btn = getButtonIn("Sell", this.table.getElementsByTagName("input")); clickElement(btn); },
			"owned" : (table.getElementsByTagName("div").length > 8) ?
						parseInt(table.getElementsByTagName("div")[8].innerHTML.split(":")[1]) 
						:
						0,
			"buySelect" 		: table.getElementsByTagName("select")[0],
			"sellSelect" 		: table.getElementsByTagName("select").length > 1 ? table.getElementsByTagName("select")[1] : null,
			"isBuyAmountLegal"  : function(a) {
									for each(opt in this.buySelect.options) 
										if (opt.value == a)
											return true;
									return false; },
			"isSellAmountLegal" : function(a) {
									if(this.sellSelect == null)
										return false;
									for each(opt in this.sellSelect.options) 
										if (opt.value == a)
											return true;
									return false; },
			"buySome"	: function(a) {
							if(!this.isBuyAmountLegal(a)) {
								if (typeof(trace) != "undefined")
									trace("Cannot buy " + a + " " + this.text + "'s");
								return false;
							}
							this.buySelect.value = a;
							this.buyIt();
							return true;
						},
			"sellSome"	: function(a) {
							if(!this.isSellAmountLegal(a)) {
								if (typeof(trace) != "undefined")
									trace("Cannot sell " + a + " " + this.text + "'s");
								return false;
							}
							this.sellSelect.value = a;
							this.sellIt();
							return true;
						}
			});
	}
	return tables;
}


function getFighters()
{
	//get all elements with an attack button
	var temp = Array();
	for each(input in document.getElementsByTagName("input"))
		if (input.value == "Attack" & input.type == "submit")
			if(input.parentNode.parentNode.parentNode.parentNode != "undefined")
				temp.push(input.parentNode.parentNode.parentNode.parentNode);
	temp.shift();
	var tables = Array();
	for each(table in temp)
	{
		if(table.childNodes)
		tables.unshift({
			"table"		:table,
			"name"		:table.childNodes[2].childNodes[1].childNodes[1].childNodes[0].innerHTML.replace(/ /g,""),
			"level"		:table.childNodes[2].childNodes[1].childNodes[2].innerHTML.split(" ")[1],
			"jobclass"	:table.childNodes[2].childNodes[1].childNodes[2].innerHTML.split(" ")[2],
			"crewsize"	:table.childNodes[2].childNodes[1].childNodes[6].innerHTML.split(" ")[2],
			"attack"	:function() {clickButton("Attack", table.getElementsByTagName("input"));}
		})
	}
	return tables;
}


function getArmoryItem(name) {
	for each(var item in getArmoryItems())
		if(item.text.toLowerCase() == name.toLowerCase())
			return item;
}

function getArmoryItem2(name) {
	for each(var item in armoryItems)
		if(item.text.toLowerCase() == name.toLowerCase())
			return item;
}

function getJobs(){
	var jobs = Array();
	var itemsNeeded = function(item) {
		items = Array();
		for each(i in item.getElementsByClassName("job_required_items")[0].getElementsByTagName("div"))
		{
			if(typeof(i.getElementsByTagName) == "undefined") 
				continue;
			if(i.getElementsByTagName("img").length < 1)
				continue;
			//trace("needed");
			items.push({
				"table" : i,
				"text" : i.getElementsByTagName("img")[0].title,
				"needed" : parseInt(i.childNodes[1].innerHTML.replace("X ", ""))
			});	
			//trace("array fucked?" + items[items.length-1].needed)
		}
		return items;
	};
	for each(job in document.getElementsByClassName("job_list"))
	{
		if (typeof(job.getElementsByClassName) != "undefined") {
			if (job.getElementsByClassName("job_name").length > 0)
			{
				jobs.push({
					"table"		:job,
					"text"		:job.getElementsByClassName("job_title")[0].innerHTML,
					"energy"	:job.getElementsByClassName("job_energy")[0].innerHTML.split(">")[1].split("<")[0],
					"progress"	:job.getElementsByTagName("div")[2].style.width,
					"petneeded"	:job.getElementsByClassName("job_energy")[0].innerHTML.match("Pet") == null ? false:true,
					"itemsneeded" 	:itemsNeeded(job),					
					"plunder"		:function() { var btn = getButtonIn("Plunder", this.table.getElementsByTagName("input")); clickElement(btn); }	
				})
			}
		}
	}
	return jobs;
}

//buy items (needs to be on armory tab)
function buyItem(itom, count){
	var item = itom;
	toBuy = count;
	trace("About to try buying " + itom + " x " + count);
	var bought = 0;
	var toi = setTimeout(mainLoop, 120000);
	if (document.getElementById("app16421175101_inventory")){
		if(getArmoryItem(item).isBuyAmountLegal(count) == false)
			while(getArmoryItem(item).isBuyAmountLegal(count) == false && count > 0)
				count--;
		getArmoryItem(item).buySome(count);
		trace("attempted buying " + count + " of " + toBuy + " " + item);
		toBuy -= count; // a = a - b
		//item = item.replace(count, toBuy);
		if (toBuy == 0){
			refresh = function()
			{
				//armoryItems(item).owned = armoryItems(item).owned - count;
				armoryItems = getArmoryItems();
				navigateToTab(1);
				trace("nothing to buy, going to mainloop");
				clearTimeout(toi);
				setTimeout(mainLoop, 6000);
			}
			setTimeout(refresh, 4000);
		}
		else
		{
			refresh = function()
			{
				armoryItems = getArmoryItems();
				trace("buying " + toBuy + " " + item + "s. Via buyItem");
				clearTimeout(toi);
				setTimeout(buyItem, 3000, item, toBuy);
			}
			setTimeout(refresh, 4000);
		}
	}
}

function nurturePet(){
	if(!enabledAutoPet)
		mainLoop();
	if(parseInt(document.getElementsByClassName("tg_eb_fill")[1].style.width) < 90)
	{
		trace("feeding pet");
		btn = getButtonIn("Feed", document.getElementsByTagName("input")); 
		clickElement(btn);
		return;
	}
	if(parseInt(document.getElementsByClassName("tg_eb_fill")[2].style.width) < 90)
	{
		trace("petting pet");
		btn = getButtonIn("Pet", document.getElementsByTagName("input")); 
		clickElement(btn);
		return;
	}
}


var armoryItems = Array();

var petOwned = false;


//initiation checks and crap
function startBot(){
	//check for pet
	trace("what");
	if(document.getElementById("app16421175101_pet")){
		if(parseInt(document.getElementsByClassName("tg_eb_fill")[2].style.width) < 75)
		{
			trace("nurturing pet");
			nurturePet();
			return;
		}
	}
	navigateToTab(0);
	function checkPetValidity()
		{
		if (document.getElementsByClassName("pet_home_container")[0].getElementsByTagName("img")[2].src
						!= "http://facebook2.pirates.static.zynga.com/graphics/pets_no_pet_100.gif")
			{
				petOwned = true;
				trace("Pet Owned");
				if ((parseInt(document.getElementsByClassName("tg_energybar tg_eb_empty")[1].childNodes[0].style.width) < 75) & enabledAutoPet) //energy
				{
					happiness = parseInt(document.getElementsByClassName("tg_energybar tg_eb_empty")[0].childNodes[0].style.width);
					if (energy*10 > happiness & happiness < 90) //happiness
					{	
						btn = getButtonIn("Visit Pet", document.getElementsByTagName("input")); 
						clickElement(btn);
					}
				}
			}
			else
			{
				trace("No Pet Owned");
			}
		}
	setTimeout(checkPetValidity, 2500);					
			
	//start armory check
	if(!document.getElementById("app16421175101_inventory"))
		setTimeout(navigateToTab, 5000, 3);
	function updateArmory(){
		trace("updating armory");
		armoryItems = getArmoryItems();
	}
	setTimeout(updateArmory, 10000);	
	
	//start grindan
	function returnToJobs()
	{
		navigateToTab(1);
	}
	setTimeout(returnToJobs, 15000);
	setTimeout(mainLoop, 20000);
}		


//autobank and autowithdraw
function autoBank()
{
	//lalalalogic
	if(document.getElementById("app16421175101_bank") != null)
	{
		document.getElementById("app16421175101_bank_deposit2").getElementsByTagName("input")[13].value = (money - bankLimit);
		btn = getButtonIn("Bury", document.getElementById("app16421175101_bank").getElementsByTagName("input")); 
		clickElement(btn);
		trace("burying " + money +", keeping "+ bankLimit);
		setTimeout(mainLoop, 2000);
		return;
	}
	else
	{
		clickElement(document.getElementsByClassName("stats_info_minitext_link")[0]);
		setTimeout(autoBank, 3000);
	}
}

function withdrawFunds(withdrawAmount)
{
	if(document.getElementById("app16421175101_bank") != null)
	{
		document.getElementById("app16421175101_bank_withdraw").getElementsByTagName("input")[13].value = parseInt(withdrawAmount);
		btn = getButtonIn("Unbury", document.getElementById("app16421175101_bank").getElementsByTagName("input")); 
		clickElement(btn);
		enableBank = false;
		setTimeout(mainLoop, 15000);
	}
	else
	{
		clickElement(document.getElementsByClassName("stats_info_minitext_link")[0]);
		setTimeout(withdrawFunds, 5000, withdrawAmount);
	}
}

//auto heal
function autoHeal()
{
	if (document.getElementById("app16421175101_hospital") == null)
	{
		clickElement(document.getElementsByClassName("stats_info_minitext_link")[1]);
		setTimeout(autoHeal, 5000);
	}
	else
	{
		healingCost = parseInt(document.getElementsByTagName("input")[20].value.split("for")[1].replace(/,/g,""));
		if(healingCost > money)
			withdrawFunds(healingCost - money);
		else
		{	
			clickElement(document.getElementsByTagName("input")[20]);
			setTimeout(mainLoop, 10000);
		}
	}
}


var enableBank = true;
var crashRecovery = setTimeout(recoverFromError, 600000); // reload page if script is inactive for 10 minutes

function recoverFromError()
{
	window.location = "http://apps.facebook.com/piratesrule/";
}

//main decision maling loop
function mainLoop(){
	trace("running main loop");
	//refresh stats bar stuff
	refreshStats();
	listOfDead = "";
    harrassListCompiled = false;
	
		
	//reset crash recovery
	//clearTimeout(crashRecovery);
	crashRecovery = setTimeout(recoverFromError, 600000);	
	
	//auto heal
	if (health < (fullHealth * 0.2) & enabledAutoHeal)
	{
		trace("Running Auto Heal");
		autoHeal();
		return;
	}
	
	//testing fight
	if (strength > fullStrength*0.5 & enabledAutoFight)
	{
		fightLoop();
		return;
	}
	
	
	//bank some monies if we have too much
	if((money > bankLimit*1.2) & enableBank)
	{
		autoBank();
		return;		
	}
	
	
	//disable loop?
	if(enabledAutoPlunder == false)
	{
		setTimeout(mainLoop, 10000);
		return;
	}
	
	//check we're in jobs
	if(document.getElementsByClassName("job_name").length == 0)
	{
		navigateToTab(1);
		setTimeout(mainLoop, 5000);
		return;
	}
	
	enableBank = true;
	
	jobList = getJobs();
	for each(job in jobList)
	{
		trace("analysing \"" + job.text + '"');
		if(parseInt(job.progress) == 100)
		{
			trace('"' + job.text + '" done. Stepping over.');
			continue;
		}
		if(job.petneeded == true)
		{
			trace("pet needed for job, \"" + job.text + '"');		
			if(petOwned == false)
			{
				trace("don't own pet. skipping job");
				continue;
			}
		}
		if(job.energy > energy)
		{
			trace("not enough energy for jobs. waiting a minute");
			setTimeout(mainLoop, 10000);
			return;
		}
		if(parseInt(job.progress) < 100)
		{
			if (job.itemsneeded.length == 0)
			{
				job.plunder();
				setTimeout(mainLoop, 10000);
				return;
			}
			var itemsValid = false;
			for each(item in job.itemsneeded)
			{
				var foo;
				var bar;
				itemsValid = false;
				foo = item.needed;
				bar = item.text;
				trace(getArmoryItem2(bar).owned + " " + item.text + " owned." + foo + " needed");
				numberOwned = getArmoryItem2(bar).owned;
				itemCost = getArmoryItem2(bar).cost;
				cashNeeded = itemCost * (foo - numberOwned);

				if (numberOwned < foo)
				{
					if(enabledAutoBuy)
					{
						if(cashNeeded > money)
						{
							trace(cashNeeded +" "+ itemCost );
							withdrawFunds((cashNeeded * 1.1));
							
							return;
						}
						else
						{
							trace("buying "+bar);
							navigateToTab(3);
							setTimeout(buyItem, 5000, bar, (foo - numberOwned));
						return;
						}
					}
					else
						itemsValid = false;
				}
				else
				{
				itemsValid = true;
				}
			}
			if (itemsValid == true)
			{
				job.plunder();
				setTimeout(mainLoop, 10000);
				return;
			}
		}
	}
	//change job page tab
	trace(parseInt(document.getElementsByClassName("title_tab_selected")[0].id.split("_")[2]));
	currentTabNumber = parseInt(document.getElementsByClassName("title_tab_selected")[0].id.split("_")[2]);
	currentTabNumber = "tab_"+(currentTabNumber + 1);
	currentTabNumber = currentTabNumber.replace("0", "");
	trace(currentTabNumber);
	nextTab = "app16421175101_"+currentTabNumber;
	trace("Changing Job Tab to: " + nextTab);
	clickElement(document.getElementById(nextTab).childNodes[0]);
	setTimeout(mainLoop, 2000);
}

var listOfDead = "";

var harrassThese = Array();
var harrassListCompiled = false;

function fightLoop()
{
	if(!document.getElementById("app16421175101_fight"))
	{
		navigateToTab(2);
		setTimeout(fightLoop, 7000);
		return;
	}
	else
	{
		highestScore = 0;
		var fighters = getFighters();
		if (harrassListCompiled = false)
		{
			for each (fighter in fighters)
			{	
				if (GM_getValue("scoreForKilling"+fighter.name, 0) > 0)
				{	
					if (GM_getValue("scoreForKilling"+fighter.name, 0) > highestScore)
					{
						harrassThese.unshift(fighter);
						highestScore = GM_getValue("scoreForKilling"+fighter.name, 0);
					}
					else
						harrassThese.push(fighter);
				}
			}
		}
		harrassListComplied = true;
		
		trace("running fightLoop");
		if (harrassThese.length > 0)
		{
			timesHarrassed = GM_getValue("PlayersHarrassed", 0);
			timesHarrassed++;
			GM_setValue("PlayersHarrassed", timesHarrassed);
			for each(fighter in harrassThese)
			{
				if (listOfDead.match(fighter.name) == fighter.name)
				{
				trace(fighter.name + " is too weak to fight");
				continue;
				}
				else
				{
					if (fighter.crewsize < crewCount*3)
					{
						if(GM_getValue("scoreForKilling"+fighter.name, 5) != 0)
						{
							clickButton("Attack", fighter.table.getElementsByTagName("input"));
							//fighter.attack();
							trace("attacking " + fighter.name);
							//trace(fighter.table.innerHTML);
							setTimeout(analyseFight, 15000, fighter);
							return;
						}
					}
				}
			}	
		}
		
		harrassThese.splice(0, harrassThese.length);

		for each(fighter in fighters)
		{
			if (listOfDead.match(fighter.name) == fighter.name)
			{
			trace(fighter.name + " is too weak to fight");
			continue;
			}
			else
			{
				if (fighter.crewsize < crewCount*3)
				{
					if(GM_getValue("scoreForKilling"+fighter.name, 5) != 0)
					{
						clickButton("Attack", fighter.table.getElementsByTagName("input"));
						//fighter.attack();
						trace("attacking " + fighter.name);
						//trace(fighter.table.innerHTML);
						setTimeout(analyseFight, 15000, fighter);
						trace("attacking " + fighter.name);
						return;
					}
				}
			}
		}
		mainLoop();
	}
}

function analyseFight(fighter)
{
	refreshStats();
	message = document.getElementsByClassName("message")[0].childNodes[0].innerHTML.split(".");
	
	if (message[0] == "Ye need strength to fight")
	{
		mainLoop();
		return;
	}
	if (message[0] == "Ye are too weak to fight")
	{
		mainLoop();
		return;
	}
	if (message[0] == "Yer opponent is already dead or too weak to fight")
	{
		listOfDead = (listOfDead + " " + fighter.name);
		trace(listOfDead + " are all too weak");
		fightLoop();
		return;
	}
	if (document.getElementsByClassName("fightmsg_rightbox").length > 0)
	{
		trace("recording outcome of last fight");
		message = document.getElementsByClassName("fightmsg_rightbox")[0];
		if (message.childNodes[1].childNodes[1].childNodes[1].childNodes[0].innerHTML == "You Lose!")
		{
			GM_setValue("scoreForKilling"+fighter.name, 0)
		}
		else// if (document.getElementsByClassName("good")[0].innerHTML.match("You Win!") == "You Win!")
		{
			var score = 0;
			trace(score)
			for each(good in document.getElementsByClassName("results_list")[1].getElementsByClassName("good"))
			{
				trace(good.innerHTML);
				score += (parseInt(good.innerHTML)*3000);
				trace(score);
			}
			moneyLooted = parseInt(document.getElementsByClassName("money")[0].innerHTML.split(">")[1].replace(/,/g,""));
			score += moneyLooted;
			totalMoneyLooted = GM_getValue("totalMoneyLooted", 0);
			GM_setValue("totalMoneyLooted", moneyLooted + totalMoneyLooted);
			GM_setValue("scoreForKilling"+fighter.name, score);
		}
	}
	trace("fight analysed");
	fightLoop();
}

//fightLoop();
startBot();




