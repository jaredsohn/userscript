// ==UserScript==
// @name           Shan-E-Punjab
// @namespace      KillaJatt
// @include        http://storm8.com/*
// @include        http://*.storm8.com/*
// ==/UserScript==

//////////////////////////////////
//Define all global variables here
//////////////////////////////////

var AutoVault					=	GM_getValue("AutoVault", false);
var AutoVaultTimer				=	GM_getValue("AutoVaultTimer",false);
var AutoBuildIncome				=	GM_getValue("AutoBuildIncome",false);
var AutoBuildDefense			=	GM_getValue("AutoBuildDefense",false);
var AutoHeal					=	GM_getValue("AutoHeal", false);
var AutoHealHealthLevel			=	GM_getValue("AutoHealHealthLevel", false);
var AutoHealTimer				=	GM_getValue("AutoHealTimer", false);
var SearchComments				=	GM_getValue("SearchComments",false);
var SearchCommentsForWho		=	GM_getValue("SearchCommentsForWho",false); 
var AutoSanction				=	GM_getValue("AutoSanction", false);
var AutoSanctionTarget			=	GM_getValue("AutoSanctionTarget", false);
var AutoSanctionTimer			=	GM_getValue("AutoSanctionTimer", false);
var AutoSanctionHowManyTimes	=	GM_getValue("AutoSanctionHowManyTimes", false);		
var AutoLevel					=	GM_getValue("AutoLevel",false);
var AutoLevelWho				=	GM_getValue("AutoLevelWho",false);
var AutoRefillHP				=	GM_getValue("AutoRefillHP",false);
var AutoRefillHPK				=	GM_getValue("AutoRefillHPK",false);
var AutoKill					=	GM_getValue("AutoKill",false);
var EnemyPUIDKnown				=	GM_getValue("EnemyPUIDKnown",false);
var EnemyPUID					=	GM_getValue("EnemyPUID",false);
var EnemyLevelMinimum			=	GM_getValue("EnemyLevelMinimum",false);
var EnemyLevelMaximum			=	GM_getValue("EnemyLevelMaximum",false);
var EnemyCountryFlag			=	GM_getValue("EnemyCountryFlag",false);
var MyCountryFlag				=	GM_getValue("MyCountryFlag",false);
var OnlyAttackWhenWinning		=	GM_getValue("OnlyAttackWhenWinning",false);
var SwitchURL					=	GM_getValue("SwitchURL",false);





var MyMenu = document.createElement("div");
MyMenu.setAttribute("id","MyMenu");
MyMenu.setAttribute("style", "background: black; font=verdana; font-size:70%; display:none;");

//Determine Checkbox States to insert in to the menu.
var AutoVaultChecked = "";
var AutoBuildIncomeChecked = "";
var AutoBuildDefenseChecked = "";
var AutoHealChecked = "";
var SearchCommentsChecked = "";
var AutoSanctionChecked = "";
var AutoLevelChecked = "";
var AutoKillChecked = "";
var EnemyPUIDKnownChecked = "";
var AutoRefillHPChecked = "";
var AutoRefillHPKChecked = "";
var OnlyAttackWhenWinningChecked = "";


if (AutoVault)
	AutoVaultChecked = " checked";
if (AutoBuildIncome)
	AutoBuildIncomeChecked = " checked";
if (AutoBuildDefense)
	AutoBuildDefenseChecked = " checked";
if (AutoHeal)
	AutoHealChecked = " checked";
if (SearchComments)
	SearchCommentsChecked = " checked";
if (AutoSanction)
	AutoSanctionChecked = " checked";
if(AutoLevel)
	AutoLevelChecked = "checked";
if(AutoRefillHP)
	AutoRefillHPChecked = "checked";
if(AutoKill)
		AutoKillChecked = "checked";
if(AutoRefillHPK)
	AutoRefillHPKChecked = "checked";
if(OnlyAttackWhenWinning)
	OnlyAttackWhenWinningChecked = "checked";
if(EnemyPUIDKnown)
	EnemyPUIDKnownChecked = "checked";

//Create Menu Html to insert in to page	
MyMenu.innerHTML = '<input name="AutoVault" type="checkbox" id="AutoVault" value="AutoVault" '+ AutoVaultChecked +'> AutoVault <br>' +
				'Randomly within how many seconds of it occuring ? <input name="AutoVaultTimer" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="AutoVaultTimer" size="3" maxlength="4" value=" '+ AutoVaultTimer +'"><br><br>' +
				'<input name="AutoBuildIncome" type="checkbox" id="AutoBuildIncome" value="AutoBuildIncome" '+ AutoBuildIncomeChecked +'>Auto Build Income<br><br>' +
				'<input name="AutoBuildDefense" type="checkbox" id="AutoBuildDefense" value="AutoBuildDefense" '+ AutoBuildDefenseChecked +'>Auto Build Defence<br><br>' +
				'<input name="AutoHeal" type="checkbox" id="AutoHeal" value="AutoHeal" '+ AutoHealChecked +'>Auto Heal For Surfing<br>' +
				'When Health is below <input name="AutoHealHealthLevel" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="AutoHealHealthLevel" size="4" maxlength="4" value="'+ AutoHealHealthLevel +'"><br>' +
				'And randomly Re-Check health within every how many Seconds? <input name="AutoHealTimer" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="AutoHealTimer" size="3" maxlength="3" value="'+ AutoHealTimer +'"><br><br>' +
				'<input name="SearchComments" type="checkbox" id="SearchComments" value="SearchComments" '+SearchCommentsChecked +'>Search Comments<br>' +
				'Search Comments for links to? <br>Enter Exact Player name or Puid <input name="SearchCommentsForWho" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="SearchCommentsForWho" size="20" value="'+ SearchCommentsForWho +'"><br><br>' +
				'<input name="AutoSanction" type="checkbox" id="AutoSanction" value="AutoSanction" '+ AutoSanctionChecked +'>Auto Sanction<br>' +
				'Time delay between sanction in seconds? <input name="AutoSanctionTimer" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="AutoSanctionTimer" size="3" value="'+AutoSanctionTimer+'"><br>'+
				'Auto sanction How many times? <input name="AutoSanctionHowManyTimes" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="AutoSanctionHowManyTimes" size="2" value="'+AutoSanctionHowManyTimes+'"><br><br>' +
				'<input name="AutoLevel" type="checkbox" id="AutoLevel" value="AutoLevel" '+ AutoLevelChecked +'>Auto Level<br><input name="AutoRefillHP" type="checkbox" id="AutoRefillHP" value="AutoRefillHP" '+ AutoRefillHPChecked +'>Auto Refill HP<br>' +
				'Enter PUID or Name of the player to be Leveled? <input name="AutoLevelWho" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="AutoLevelWho" size="20" value="'+AutoLevelWho+'"><br><br>' +
				'<input name="AutoKill" type="checkbox" id="AutoKill" value="AutoKill" '+ AutoKillChecked +'>Auto Kill on Sanctions<br><input name="AutoRefillHPK" type="checkbox" id="AutoRefillHPK" value="AutoRefillHPK" '+ AutoRefillHPKChecked +'>Auto Refill HP<br><input name="OnlyAttackWhenWinning" type="checkbox" id="OnlyAttackWhenWinning" value="OnlyAttackWhenWinning" '+ OnlyAttackWhenWinningChecked +'>Reattack only if Winning<br>' +
				'Whats your country flag?<input name="MyCountryFlag" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="MyCountryFlag" size="3" value="'+MyCountryFlag+'"><br><br>' +
				'<input name="EnemyPUIDKnown" type="checkbox" id="EnemyPUIDKnown" value="EnemyPUIDKnown" '+ EnemyPUIDKnownChecked +'>Do you know the Puid of the player to kill<br>' +
				'Enter Enemy PUID <input name="EnemyPUID" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="EnemyPUID" size="20" value="'+ EnemyPUID +'"><br><br>' +
				'If you dont know enemies PUID enter details below<br>' +
				'Whats the level the enemy is atleast ? <input name="EnemyLevelMinimum" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="EnemyLevelMinimum" size="3" maxlength="3" value="'+EnemyLevelMinimum+'"><br>' +
				'Whats the Maximum enemy level ? <input name="EnemyLevelMaximum" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="EnemyLevelMaximum" size="3" maxlength="3" value="'+EnemyLevelMaximum+'"><br>' +
				'Whats Enemy country flag ? <input name="EnemyCountryFlag" type="text" style="border: 1px solid green; color: #66CC00; background: black; text-align: center;" id="EnemyCountryFlag" size="3" value="'+EnemyCountryFlag+'"><br><br>'+
				'Flag Legend <br> (0 for all flags, 1 for germany, 2 for uk, 3 for usa, 4 for china, 5 for russia)'+
				'<div id="NextBuildingMenu" style="margin-top: 4px;"></div>';

document.body.insertBefore(MyMenu, document.getElementById('topBar'));

///////////////////////////////////////////////
//Make the Menu Show or Hide on clicking a Link
///////////////////////////////////////////////

//Create and Insert Javascript to show/hide
var ScriptCode = new Array();
ScriptCode.push('function HideContent(d) {');
ScriptCode.push('document.getElementById(d).style.display = "none";');
ScriptCode.push('}');
ScriptCode.push('function ShowContent(d) {');
ScriptCode.push('document.getElementById(d).style.display = "block";');
ScriptCode.push('}');
ScriptCode.push('function ReverseDisplay(d) {');
ScriptCode.push('if(document.getElementById(d).style.display == "none") { document.getElementById(d).style.display = "block"; }');
ScriptCode.push('else { document.getElementById(d).style.display = "none"; }');
ScriptCode.push('}');

//insert the above script in to head section of document
var script = document.createElement('script');
script.innerHTML = ScriptCode.join('\n');
ScriptCode.length = 0;

try { document.getElementsByTagName('head')[0].appendChild(script); }
catch(e) {}

//Insert a link to invoke the show/hide javascript
var ScriptInvokeLink = document.createElement('a');
ScriptInvokeLink.href = 'javascript:ReverseDisplay(\'MyMenu\')';
ScriptInvokeLink.appendChild(document.createTextNode(' Show/Hide Script Menu '));
document.body.insertBefore(ScriptInvokeLink, document.getElementById('topBar'));
	
	






function FunctionCheckOptions()
	{
		// AutoVaulting
		if (document.getElementById('AutoVault').checked)
			{
				GM_setValue("AutoVault",true);
				GM_setValue("AutoVaultTimer",parseInt(document.getElementById('AutoVaultTimer').value));
				FunctionAutoVault();
			}
		else
			{
				GM_setValue("AutoVault",false);
			}
		//Auto Build Income
		if(document.getElementById('AutoBuildIncome').checked)
			{
				GM_setValue("AutoBuildIncome",true);
			}
		else
			{
				GM_setValue("AutoBuildIncome",false);
			}
		//Auto Build Income
		if(document.getElementById('AutoBuildDefense').checked)
			{
				GM_setValue("AutoBuildDefense",true);
			}
		else
			{
				GM_setValue("AutoBuildDefense",false);
			}
		//Auto Heal
		if(document.getElementById('AutoHeal').checked)
			{
				GM_setValue("AutoHeal",true);
				GM_setValue("AutoHealTimer",document.getElementById('AutoHealTimer').value );
				GM_setValue("AutoHealHealthLevel", document.getElementById('AutoHealHealthLevel').value);
				var RandomDelayOf = Math.floor(Math.random()*AutoHealTimer);
				//setTimeout(FunctionAutoHeal,(RandomDelayOf*1000));
			}
		else
			{
				GM_setValue("AutoHeal",false);
			}
		//Search Comments
		if(document.getElementById('SearchComments').checked)
			{
				GM_setValue("SearchComments",true);
				GM_setValue("SearchCommentsForWho",document.getElementById('SearchCommentsForWho').value );
				FunctionSearchForLink();		
			}
		else
			{
				GM_setValue("SearchComments",false);
			}
		//Auto Sanction
		if(document.getElementById('AutoSanction').checked)
			{
				GM_setValue("AutoSanction",true);
				GM_setValue("AutoSanctionTimer",parseInt(document.getElementById('AutoSanctionTimer').value));
				GM_setValue("AutoSanctionHowManyTimes",parseInt(document.getElementById('AutoSanctionHowManyTimes').value));
				FunctionAutoSanction();
			}
		else
			{
				GM_setValue("AutoSanction",false);
			}
		//Auto Level
		if(document.getElementById('AutoLevel').checked)
			{
				GM_setValue("AutoLevel",true);
				GM_setValue("AutoLevelWho",document.getElementById('AutoLevelWho').value );
				if(document.getElementById('AutoRefillHP').checked)
					{
						GM_setValue("AutoRefillHP", true);
					}
				else
					{
						GM_setValue("AutoRefillHP", false);
					}
				FunctionAutoLevel();
			}
		else
			{
				GM_setValue("AutoLevel",false);
				GM_setValue("AutoRefillHP", false);
			}
		//Auto Kill
		if(document.getElementById('AutoKill').checked)
			{
				GM_setValue("AutoKill",true);
				GM_setValue("MyCountryFlag",document.getElementById('MyCountryFlag').value);
				
				if(document.getElementById('EnemyPUIDKnown').checked)
					{
						GM_setValue("EnemyPUIDKnown",true);
						GM_setValue("EnemyPUID",document.getElementById('EnemyPUID').value);
						GM_setValue("EnemyLevelMinimum",0);
						GM_setValue("EnemyLevelMaximum",0);
						GM_setValue("EnemyCountryFlag",0);
					}
				else
					{
						GM_setValue("EnemyPUIDKnown",false);
						GM_setValue("EnemyPUID","Not In Use");
						GM_setValue("EnemyLevelMinimum",document.getElementById('EnemyLevelMinimum').value);
						GM_setValue("EnemyLevelMaximum",document.getElementById('EnemyLevelMaximum').value);
						GM_setValue("EnemyCountryFlag",document.getElementById('EnemyCountryFlag').value);
					}
				if(document.getElementById('AutoRefillHPK').checked)
					{
						GM_setValue("AutoRefillHPK", true);
					}
				else
					{
						GM_setValue("AutoRefillHPK", false);
					}
				if(document.getElementById('OnlyAttackWhenWinning').checked)
					{
						GM_setValue("OnlyAttackWhenWinning", true);
					}
				else
					{
						GM_setValue("OnlyAttackWhenWinning", false);
					}
				
			}
		else
			{
				GM_setValue("AutoKill",false);
				GM_setValue("EnemyPUIDKnown",false);
				GM_setValue("EnemyPUID",false);
				GM_setValue("AutoRefillHPK", false);
				GM_setValue("OnlyAttackWhenWinning", false);
			}

	}









// Auto Vault Function
function FunctionAutoVault()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];
	//Check Auto Vault is selected
	if (GM_getValue("AutoVault",false))
	{	
		//Get current timer.
		var TempVar = document.getElementById('cashType');
		
		//Check if the anchor part of the timer is more than Zero in length
		if (TempVar.getElementsByTagName('a').length > 0)
			{
				//split timer up by using : as the spliter
				var CurrentTimer = TempVar.getElementsByTagName('a')[0].innerHTML.split(':');
				//convert timer from minutes and seconds to just seconds.	
				var CurrentTimerInSeconds = parseInt(CurrentTimer[0]) * 60 + parseInt(CurrentTimer[1]);
				//Get the value of cash that we have
				var cash = FunctionGetCash();
			}

		//Check if the time remaining to next money drop is below 5 seconds or if cash is more than zero
		if(CurrentTimerInSeconds <= 5 || cash > 0)
			{
				//Pause script execution for 6 seconds for 100% vault success
				
				//Create a random delay in deposit time based of user input.
				var RandomDelayOf = Math.floor(Math.random()*AutoVaultTimer);
				//stop further execution for the random time generated.
				
				//make deposit
				FunctionPostWith("bank.php", {depositAmount:cash, action:'Deposit'});
				//Check the webpage has completely loaded then Return to the page where we were before vaulting
				document.location = CurrentPageURL;
			}
	}

}
//Auto Building Function
function FunctionAutoBuild()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];

	if (CurrentPage == "investment")
	{
		var def = GM_getValue("AutoBuildDefense",false);
		var inc = GM_getValue("AutoBuildIncome",false);
		if (def || inc)
		{
			var links  = new Array();
			var prices = new Array();
			var ratios = new Array();
			var names  = new Array();
			var buildings = document.getElementsByClassName("reTable");
			for (i in buildings)
			{
				var info = buildings[i].getElementsByClassName("reInfoItem")
				if (info.length == 0)
					continue;
				var type = info[0].innerHTML.substr(0,1);
				var link = buildings[i].getElementsByTagName("a")[0].href;

				if ((def && type=='D') || (inc && type=="I"))
				{
					var cols = buildings[i].getElementsByTagName("td");
					var returns = cols[0].getElementsByClassName("reInfoItem")[0];	
					var price = (cols[2].getElementsByClassName("cash")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));
					if (price.lastIndexOf('K') > 0)
						price = parseInt(price) * 1000;
					else if (price.lastIndexOf('mil') > 0)
						price = parseFloat(price) * 1000000;
					else if (price.lastIndexOf('bil') > 0)
						price = parseFloat(price) * 1000000000;

					if (type == "I")
					{
						var field = returns.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,'')
						if (field.lastIndexOf('mil') > 0)
							var nret = parseInt(field) * 1000000;
						else
							var nret = parseInt(field);
					}
					else
						var nret = parseInt(returns.getElementsByClassName("defense")[0].innerHTML.substr(1)) * 500;

					var ratio = Math.round(price * 10 / nret)/10;
					var name = buildings[i].getElementsByClassName('reName')[0].innerHTML;
					
					names[names.length]   = name;
					links[links.length]   = link;
					prices[prices.length] = price;
					ratios[ratios.length] = ratio;
				}

			}
			
			var minIndex = 0;
			for (r in ratios)
				if (ratios[r] < ratios[minIndex])
					minIndex = r;

			var cash = FunctionGetCash();
			var need = prices[minIndex] - cash;
			var rate = parseInt(document.getElementById('cashTimerDiv').getElementsByTagName('span')[0].getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerHTML.replace(/,/g,''));
			
			document.getElementById('NextBuildingMenu').innerHTML = '<font color="#66CC00"><small><b>Next building: '+names[minIndex]+', need <img src="http://static.storm8.com/wwar/images/money.png?v=140">'+FunctionFixNum(need)+'</b> - '+Math.ceil(need / rate)+'h</small></font>';
		
			if (cash >= prices[minIndex])
				document.location = links[minIndex];
			
		}
	}

}
//Function for auto healing to surf
function FunctionAutoHeal()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];
	
	if(document.getElementById('AutoHeal').checked)
		{
			//Refresh Current page to read the current health
			FunctionRefreshPage();
			// Read current health of the page and compare with Autoheal health limit
			if (parseInt(document.getElementById('healthCurrent').innerHTML) <= AutoHealHealthLevel)
				{
					//Check if we are on hospital page if not switch to hospital page	
					if (CurrentPage != "hospital")
						{
							//change page to hospital page
							document.location = "http://wwar.storm8.com/hospital.php";
						}
						//set the value of the switch url variable to true
						GM_setValue("SwitchURL",true);
						//click the heal button on hospital page
						document.location = document.getElementsByClassName('healBtn')[0].getElementsByTagName('a')[0].href;

				}
			//now check the switch url variable 
			else if(SwitchURL)
				{
					//set switch url varibale to false
					GM_setValue("SwitchURL",false);
					
					//change page to homepage.
					document.location = CurrentPageURL;
				}	
		}

}
//Function to Search the Sanction board or list for links.
function FunctionSearchForLink()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];
	
	// comments search
	if (document.getElementById('SearchComments').checked)
	{
		if (CurrentPage == "fight" || CurrentPage == "hitlist")
		{
			var Links = document.links;
			var Found = false;
			for (i=0; i<Links.length; i++)
			{
				var Test = Links[i].innerHTML;
				var Test2 = Links[i].href;  
				
				if (Test.indexOf(SearchCommentsForWho) >= 0)
					{
						Found = true;
						document.location = Links[i];
						break;
					}
				else if(Test2.indexOf(SearchCommentsForWho) >= 0)
					{
						Found = true;
						document.location = Links[i];
						break;
					}
				
			}
			if (!Found)
				{
					FunctionRefreshPage();
				}
		}

	}
}
//Function to auto sanction a target
function FunctionAutoSanction()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];
	if(CurrentPage == "bounty")
		{
			GM_setValue("AutoSanctionTarget",false);
			var SanctionForm = document.getElementById('bountyForm');
			var MinimumSanctionAmount = parseInt(SanctionForm.getElementsByTagName('span')[0].childNodes[1].nodeValue.replace(/,/g,''));
			var Target = document.getElementsByClassName('sectionHeader')[0].innerHTML.split('"')[1];
			SanctionForm.getElementsByTagName('input')[0].value = MinimumSanctionAmount;
			if (AutoSanctionHowManyTimes > 0)
				{
					GM_setValue('AutoSanctionTarget',Target);
					GM_setValue('AutoSanctionHowManyTimes',AutoSanctionHowManyTimes - 1);
					// see if we've just failed to sanc him
					
					var Failed = document.getElementsByClassName('messageBoxFail');
					if (Failed.length > 0)
						{
							GM_setValue('AutoSanctionHowManyTimes', AutoSanctionHowManyTimes);
							if (Failed[0].innerHTML.length == 114 + AutoSanctionTarget.length)
							{
								// too many sancs for today
								GM_setValue('AutoSanctionTarget', false);
								return;
							}
							
						}
					var RandomDelayOf = Math.floor(Math.random()*AutoSanctionTimer);
					click(document.getElementById('bountyForm').getElementsByClassName('btnBroadcast')[0]);
				}
		}
	else if (CurrentPage == "hitlist")
		{
			document.location = 'http://wwar.storm8.com/home.php';
		}
	else if (CurrentPage == "home")
		{
			if(AutoSanctionTarget)
				{
					var a = document.getElementsByTagName('a');
					var found = false;
					for (i=0; i<a.length; i++)
						{
							if (a[i].innerHTML == AutoSanctionTarget)
							{
								found = true;
								break;
							}
						}
					if (!found)
						{
							FunctionRefreshPage();
						}
					else
						{
							document.location = a[i];
						}
				}
		}
	else if (CurrentPage == "profile" && AutoSanctionHowManyTimes > 0)
		{
			var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
			click (buttons[buttons.length - 1]);		
		}	
}
//Function to Auto Level any given player
function FunctionAutoLevel()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];
	
	var HealingTrigger = false;
	var ReAttack=true;
	
	//	Check whether to run whole function or not
	if (CurrentPage == "home" || document.getElementById('AutoLevel').checked == false)
		{
			GM_setValue("AutoLevel", false);
			GM_setValue("AutoLevelWho",document.getElementById('AutoLevelWho').value );
			return;
		}
	
	//check if both ammo and helth is below required level then refill ammo.
	if(document.getElementById('staminaCurrent').innerHTML <= 0 && parseInt(document.getElementById('healthCurrent').innerHTML) < 27)
		{
			//refill Ammo if HP is allowed to be used and we have atleast 10 hp
			document.location = 'http://wwar.storm8.com/favor.php?favorItem=8';
		}

	// check ammo
	if (document.getElementById('staminaCurrent').innerHTML <= 0)
		{
			if(AutoRefillHP)
				{		
					document.location = "http://wwar.storm8.com/favor.php";
					
					if(document.getElementById('favorPoints').innerHTML >= 10 )
						{
							//refill Ammo if HP is allowed to be used and we have atleast 10 hp
							document.location = 'http://wwar.storm8.com/favor.php?favorItem=8';
						}
					else
						{
							GM_setValue("AutoLevel", false);
							FunctionAbort("out of Ammo and Hp to refill, stopping now");
							return;
						}
				}
			else
				{
					GM_setValue("AutoLevel", false);
					FunctionAbort("out of Ammo, stopping now");
					return;
				}
		}
	CurrentPageURL = CurrentPageURL + location.search;	
	if(CurrentPageURL == 'http://wwar.storm8.com/favor.php?favorItem=8')
		{
			document.location= "http://wwar.storm8.com/group.php";
		}
	// check current health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) < 27)
		{
			
			if (CurrentPage != "hospital")
				{
					document.location = "http://wwar.storm8.com/hospital.php";
				}
			
				HealingTrigger = true;
				document.location = document.getElementsByClassName('healBtn')[0].getElementsByTagName('a')[0].href;
		}
	 if (HealingTrigger)
		{
			HealingTrigger = false;
			document.location = "http://wwar.storm8.com/group.php";
		}
		
		
	// check for re-attack
	while(ReAttack && CurrentPage == "fight")
		{
			var FightWon   = document.getElementsByClassName('wonFight').length;
			var FightLost = document.getElementsByClassName('lostFight').length;
			
			if (FightWon || FightLost)
				{
					var AttackButton = document.getElementsByTagName('input')[26];
					click(AttackButton);
					return;
				}
			else
				{
					ReAttack = false;
				}
		}

	if (CurrentPage == "group")
		{	
				var AllianceLinks = document.links;
				var WasFound = false;
				
				if(AutoLevelWho == "")
					{
						GM_setValue("AutoLevel", false);
						FunctionAbort("Enter name of the player you want to Lvel");
					}
				else
					{
						GM_setValue("AutoLevel", true);		
						for (i=0; i<AllianceLinks.length; i++)
							{
				
								var Test = AllianceLinks[i].innerHTML; 
								var Test2 = AllianceLinks[i].href;
								if (Test.indexOf(AutoLevelWho) >= 0)
									{
										WasFound = AllianceLinks[i];
										document.location = AllianceLinks[i];
										break;								
									}
								else if (Test2.indexOf(AutoLevelWho) >= 0)
									{
										WasFound = AllianceLinks[i];
										document.location = AllianceLinks[i];
										break;								
									}
							}
		
						if(!WasFound)
							{
								GM_setValue("AutoLevel", false);
								FunctionAbort("link to the account to be auto leveled not found");
							}
					}
		}
	var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
	click (buttons[buttons.length - 2]);	
	
}
//Function to Auto Kill on Sanctions
function FunctionAutoKill()
{
	//Store Current page URL
	var Temp = FunctionCurrentPageURL();
	var CurrentPage = Temp[2];
	var CurrentPageURL = Temp[0]+Temp[1];
	
	var HealingTrigger = false;
	var ReAttack=true;
	
	if(CurrentPage == "home" || document.getElementById('AutoKill').checked == false)
		{
			return;
		}

	// check current health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) < 27)
		{
			
			if (CurrentPage != "hospital")
				{
					document.location = "http://wwar.storm8.com/hospital.php";
				}
			
				HealingTrigger = true;
				document.location = document.getElementsByClassName('healBtn')[0].getElementsByTagName('a')[0].href;
		}
	 if (HealingTrigger)
		{
			HealingTrigger = false;
			document.location = "http://wwar.storm8.com/hitlist.php";
		}
		// check ammo
		if (document.getElementById('staminaCurrent').innerHTML <= 0)
			{
				if(AutoRefillHPK)
					{		
						document.location = "http://wwar.storm8.com/favor.php";
						
						if(document.getElementById('favorPoints').innerHTML >= 10 )
							{
								//refill Ammo if HP is allowed to be used and we have atleast 10 hp
								document.location = 'http://wwar.storm8.com/favor.php?favorItem=8';
							}
						else
							{
								GM_setValue("AutoKill", false);
								FunctionAbort("out of Ammo and Hp to refill, stopping now");
							}
					}
				else
					{
						// defeat storm8 hacker checks by introducing random delay up to 5 seconds
						var delay = Math.random()*5;
						var time = document.getElementById('staminaType').innerHTML.split(':');
						var seconds = parseInt(time[0]) * 60 + parseInt(time[1]) + delay;	// add 2 seconds to the timer
						// wait to receive sanctionAmmo ammo
						sanctionAmmo = Math.max(1, sanctionAmmo);
						seconds = seconds + 100 * (sanctionAmmo - 1);
						setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", Math.floor(1000*seconds));
						return;
					}
			}
		CurrentPageURL = CurrentPageURL + location.search;	
		if(CurrentPageURL == 'http://wwar.storm8.com/favor.php?favorItem=8')
			{
				document.location= "http://wwar.storm8.com/hitlist.php";
			}
	// check for re-attack
	
	while(ReAttack)
	{
		var FightWon   = document.getElementsByClassName('wonFight').length;
		var EnemyStillAlive = document.getElementsByClassName('doAgainTxt');
		var OnlyAttackWhenWinningTMP = document.getElementById('OnlyAttackWhenWinning').value;
		
		if(OnlyAttackWhenWinningTMP)
			{
				if (FightWon && EnemyStillAlive.length > 0)
					{
						var AttackButton = EnemyStillAlive[0].getElementsByTagName('input')[0];
						click(AttackButton);
						return;
					}
				else
					{
						ReAttack = false;
					}
			}
		else
			{
				if (EnemyStillAlive.length > 0)
					{
						var AttackButton = alive[0].getElementsByTagName('input')[0];
						click(AttackButton);
						return;
					}
				else
					{
						ReAttack = false;
					}
			}
	}
	// Find Our Target and Attack it
	var Listings = document.getElementsByClassName("fightTable");
	var FoundOurTarget = false;
	for (i in Listings)
		{
			var temp = Listings[i].getElementsByTagName("td");
			var ListingsLevel = parseInt(temp[1].getElementsByTagName("div")[1].innerHTML.substr(6));
			var ListingsCountry = temp[0].getElementsByTagName("img")[0].src.split("/")[6].substr(0,1);
			var ListingsProfileLink = temp[0].getElementsByTagName("a")[0];
			var ListingsAttackButton = temp[5].getElementsByTagName("a")[0];
			
			if(EnemyPUIDKnown)
				{
					if(ListingsProfileLink.indexOf(EnemyPUID) >= 0)
						{
							click(ListingsAttackButton);
							FoundOurTarget = true;
							return;
						}
				}
			else
				{
					if(EnemyCountryFlag != 0)
						{
							if (ListingsLevel >= EnemyLevelMinimum && ListingsLevel <= EnemyLevelMaximum && ListingsCountry != MyCountryFlag && ListingsCountry != EnemyCountryFlag)
							{
								click(ListingsAttackButton);
								FoundOurTarget = true;
								return;
							}
						}
					else
						{
							if (ListingsLevel >= EnemyLevelMinimum && ListingsLevel <= EnemyLevelMaximum && ListingsCountry != MyCountryFlag)
							{
								click(ListingsAttackButton);
								FoundOurTarget = true;
								return;
							}		
						}
				}
		}

	//Refresh Page if the target couldnt be found.
	if (!FoundOurTarget)
		{
			document.location = 'http://wwar.storm8.com/hitlist.php';
		}

}
//Function to get value of money to be deposited
function FunctionGetCash()
{
	var cfield = document.getElementById('cashCurrent');
	var cash = 0;
	if (cfield.getElementsByTagName('a').length > 0)
		return parseInt(cfield.getElementsByTagName('a')[0].innerHTML.replace(/,/g,''));
	else
		return parseInt(cfield.innerHTML.replace(/,/g,''));
}

//Store the current page URL
function FunctionCurrentPageURL()
	{ 
		var WebSiteDomain = location.protocol +"//"+ location.hostname;
		var PageURL = location.pathname; 
		var Tmp = PageURL.split(".php");
		var PageName = Tmp[0].split("/");
		return [WebSiteDomain,PageURL,PageName[1]];
	} 

//Link not found for sanction Refresh Page
function FunctionRefreshPage()
	{ 
		location.reload(true);	
	} 
	
//Dummy Fucntion for supplying to setTimeout to create delay
function FunctionCreateDelay()
	{
		/*var StartTime = new Date().getTime();
		var CurrentTime = StartTime;
		while(CurrentTime - StartTime < MilliSecs)
			{
				CurrentTime = new Date().getTime();
			} 
		*/
		return true;
	}
			
//function to Abort execution 
function FunctionAbort(ERROR)
{
	alert(ERROR);
    return;
}

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e) {return;}
if(typeof e=='string') e=document.getElementById(e);
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}

//Fucntion to post form
function FunctionPostWith (to,p) {
  var myForm = document.createElement("form");
  myForm.method="post" ;
  myForm.action = to ;
  for (var k in p) {
    var myInput = document.createElement("input") ;
    myInput.setAttribute("name", k) ;
    myInput.setAttribute("value", p[k]);
    myForm.appendChild(myInput) ;
  }
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;
}

function FunctionFixNum(n)
{
	n += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(n)) {
		n = n.replace(rgx, '$1' + ',' + '$2');
	}
	return n;
}



FunctionAutoKill();
FunctionAutoLevel();
FunctionAutoBuild();
setInterval(FunctionCheckOptions,1000);
//setInterval(FunctionAutoHeal,3000);