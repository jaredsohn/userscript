// ==UserScript==
// @name           Sammy Spotless Boss Battle
// @namespace      http://apps.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=326118
// @include        http://apps.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=9467
// @include        http://apps.new.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=9467
// @include        http://apps.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=118846
// @include        http://apps.new.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=118846
// @include        http://apps.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=224832
// @include        http://apps.new.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=224832
// @include        http://apps.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=326118
// @include        http://apps.new.facebook.com/mobwars/bossbattles/battlearena.php?boss_id=326118
// @include        http://lb0.mw.production.monstergamesinc.com/bossbattles/do.php
// ==/UserScript==
if(document.location == "http://lb0.mw.production.monstergamesinc.com/bossbattles/do.php" && window.history.length > 0)
	window.history.back();

var PageRefreshWaitTiem = 2000;
var HealthRechageTime = 3*60*1000;
var StaminaRechargeTime = 2*60*1000;
var AttackMinHealthPercent = 60;
var PowerAttackMinHealthPercent = 60;
var AttackType = 0; //0= do normal attack until reach [MaxBossHelathPercentForPowerAttack], 1= do power attacks only,2= do normal attack only
var MaxBossHelathPercentForPowerAttack = 100;
var MyStaminaShortageForAttack = 0;
var MyStaminaShortageForPowerAttack = 0;
var AttackRequiredStamina = 20;
var PowerAttackRequiredStamina = 60;
var WaitTimeForPowerAttack = 0;
var DocumentLocation = document.location;

var MyCurrentStamina = document.getElementById("app8743457343_cur_recovery").innerHTML;
var MyMaxStamina = document.getElementById("app8743457343_cur_recovery_max").innerHTML;
var MyCurrentHealth = document.getElementById("app8743457343_cur_health").innerHTML;
var MyMaxHealth = document.getElementById("app8743457343_cur_health_max").innerHTML;
var MyCurrentHealthPercent = (MyCurrentHealth / MyMaxHealth) * 100;
var MyHealthShortagePercentForPowerAttack = PowerAttackMinHealthPercent - MyCurrentHealthPercent;
var MyHealthShortageForPowerAttack = MyHealthShortagePercentForPowerAttack * MyMaxHealth;

var HealButton = document.getElementById("app8743457343_mw_aj_1_i");
if(HealButton == null)
{
	Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value.indexOf("Begin Level") == 0 ) {input.click();}});
}

var AttackButton = document.getElementById("app8743457343_mw_aj_2_i");
var PowerAttackButtonID = "app8743457343_mw_aj_boss1_3_i";
var BossHealthElementID = "app8743457343_boss_health_1";
if(document.location.search == "?boss_id=9467")
{
	PowerAttackButtonID = "app8743457343_mw_aj_boss1_3_i";
	BossHealthElementID = "app8743457343_boss_health_1";
}
else if(document.location.search == "?boss_id=118846")
{
	PowerAttackButtonID = "app8743457343_mw_aj_boss2_3_i";
	BossHealthElementID = "app8743457343_boss_health_2";
}
else if(document.location.search == "?boss_id=224832")
{
	PowerAttackButtonID = "app8743457343_mw_aj_boss3_3_i";
	BossHealthElementID = "app8743457343_boss_health_3";
}
else if(document.location.search == "?boss_id=326118")
{
	PowerAttackButtonID = "app8743457343_mw_aj_boss4_3_i";
	BossHealthElementID = "app8743457343_boss_health_4";
}

var PowerAttackButton = document.getElementById(PowerAttackButtonID);
if(PowerAttackButton.value.indexOf("Stamina") < 0)
	WaitTimeForPowerAttack = ((PowerAttackButton.value.split(" ")[3].split(":")[0]*60)+(PowerAttackButton.value.split(" ")[3].split(":")[1]*1))*1000;
else
{
	AttackRequiredStamina = AttackButton.value.split(" ")[2]*1;
	PowerAttackRequiredStamina = PowerAttackButton.value.split(" ")[4]*1;
}

if(MyCurrentStamina < AttackRequiredStamina)
	MyStaminaShortageForAttack = AttackRequiredStamina - MyCurrentStamina;
if(WaitTimeForPowerAttack == 0 && MyCurrentStamina < PowerAttackRequiredStamina)
	MyStaminaShortageForPowerAttack = PowerAttackRequiredStamina - MyCurrentStamina;

var BossHealthMax = document.getElementById(BossHealthElementID ).childNodes[1].childNodes[0].childNodes[0].innerHTML.replace("</b>","").split(" ")[4]*1;
var CurrentBossHealth = document.getElementById(BossHealthElementID ).childNodes[1].childNodes[0].childNodes[0].innerHTML.replace("<b>","").split(" ")[2]*1;
var CurrentBossHealthPercent = (CurrentBossHealth / BossHealthMax) * 100;

if(AttackType == 1 && WaitTimeForPowerAttack > 0)
{
	document.title = document.title + " ," + secondsToHms(WaitTimeForPowerAttack) + " until next power attack.";
	setTimeout("document.location = '" + DocumentLocation + "';",WaitTimeForPowerAttack);
}
else if(AttackType == 1 && MyStaminaShortageForPowerAttack > 0)
{
	document.title = document.title + " ," + secondsToHms(StaminaRechargeTime*MyStaminaShortageForPowerAttack) + " until stamina recharge for next power attack.";
	setTimeout("document.location = '" + DocumentLocation + "';",StaminaRechargeTime*MyStaminaShortageForPowerAttack);
}
else if((AttackType == 2 || AttackType == 0) && MyStaminaShortageForAttack > 0)
{
	document.title = document.title + " ," + secondsToHms(StaminaRechargeTime*MyStaminaShortageForAttack) + " until stamina recharge for next attack.";
	setTimeout("document.location = '" + DocumentLocation + "';",StaminaRechargeTime*MyStaminaShortageForAttack);
}
else
{
	if(MyCurrentHealthPercent < AttackMinHealthPercent)
	{
		HealButton.click();
		document.title = document.title + " ," + secondsToHms(PageRefreshWaitTiem) + " until page refresh.";
		setTimeout("document.location = '" + DocumentLocation + "';",PageRefreshWaitTiem);
	}
	else
	{
		if(AttackType == 1 && MyCurrentHealthPercent < PowerAttackMinHealthPercent)
		{
			document.title = document.title + " ," + secondsToHms(HealthRechageTime*MyHealthShortageForPowerAttack) + " until health recharge for next power attack.";
			setTimeout("document.location = '" + DocumentLocation + "';",HealthRechageTime*MyHealthShortageForPowerAttack);
		}
		else if(AttackType == 1 && MyCurrentHealthPercent >= PowerAttackMinHealthPercent && PowerAttackButton.value.indexOf("Stamina") > 0)
		{
			PowerAttackButton.click()
			document.title = document.title + " ," + secondsToHms(PageRefreshWaitTiem) + " until page refresh.";
			setTimeout("document.location = '" + DocumentLocation + "';",PageRefreshWaitTiem);
			
		}
		else if(AttackType == 2 && MyCurrentHealthPercent >= AttackMinHealthPercent)
		{
			AttackButton.click()
			document.title = document.title + " ," + secondsToHms(PageRefreshWaitTiem) + " until page refresh.";
			setTimeout("document.location = '" + DocumentLocation + "';",PageRefreshWaitTiem);
		}
		else if(AttackType == 0)
		{
			if(MyCurrentHealthPercent >= PowerAttackMinHealthPercent)
			{
				PowerAttackButton.click()
				document.title = document.title + " ," + secondsToHms(PageRefreshWaitTiem) + " until page refresh.";
				setTimeout("document.location = '" + DocumentLocation + "';",PageRefreshWaitTiem);
			}
			else
			{
				AttackButton.click()
				document.title = document.title + " ," + secondsToHms(PageRefreshWaitTiem) + " until page refresh.";
				setTimeout("document.location = '" + DocumentLocation + "';",PageRefreshWaitTiem);
			}
		}
	}	
}

function secondsToHms(d) {
	d = Number(d/1000);
	var h = Math.floor(d / 3600);
	d = d - (h * 3600);
	var m = Math.floor(d / 60);
	var s = d - (m * 60);
	var time = ((h<10) ? "0" + h + ":" : h + ":") + ((m<10) ? "0" + m + ":" : m + ":") + ((s<10) ? "0" + s : s);
	return time;
}

function GetAattributeValue(ActionButton,Aattribute)
{
	var retValue = "";
	for(var i = 0; i<ActionButton.attributes.length; i++)
	{
		if(ActionButton.attributes[i].name == Aattribute)
			retValue = ActionButton.attributes[i].value;
	}
	alert(retValue);
	return retValue;
}