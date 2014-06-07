// ==UserScript==
// @name           Bots4 Shield Adviser
// @namespace      Bots4 Shield Adviser
// @description    Bots4 Shield Adviser
// @include        http://bots4.net/workshop
//
// @author         AquaRegia
// @version 	   2011-04-09
// ==/UserScript==

function hitsTakenWithShield(block)
{
	var block = block/100;
	var doubleDamage = (1-block)*(1-block) * 2;
	var singleDamage = (1-block)*block * 2;

	return doubleDamage + singleDamage;
}

function hitsTakenWithoutShield(block)
{
	return 1 - (block/100);
}

function getNoShieldResult()
{
	return [hitsTakenWithoutShield(blockChanceWithoutShield) * (1 - Math.pow(defense, 0.5)*0.02), null];
}

function getShieldResult()
{
	var usableShields = [];
	
	for(var i = 0; i < shields.length; i++)
	{
		if(shields[i].reqdex <= dex)
		{
			usableShields.push(shields[i]);
		}
	}
	
	var result = 1;
	var resultShield;
	
	for(var i = 0; i < usableShields.length; i++)
	{
		newResult = hitsTakenWithShield(Math.min(70, blockChanceWithoutShield + parseInt(usableShields[i].block, 10))) * (1 - Math.pow(defense + parseInt(usableShields[i].defense, 10), 0.5)*0.02);
		
		if(newResult < result)
		{
			result = newResult;
			resultShield = usableShields[i].name;
		}
	}
	
	return [result, resultShield];
}

var usesShield = document.getElementsByClassName("block-list")[2].getElementsByTagName("td")[3].innerHTML == "-" ? true : false;
if(!usesShield)
{
	var shields = [{"id":"648","name":"defender","type":"shield","rarity":"normal","maxdurability":"1000","price":"4500","chance":"2.4","reqstr":"0","reqdex":"81","defense":"19","mindmg":"0","maxdmg":"0","block":"34","str":"0","dex":"0","con":"0","intel":"0"},{"id":"649","name":"round shield","type":"shield","rarity":"normal","maxdurability":"1000","price":"5000","chance":"2.25","reqstr":"0","reqdex":"84","defense":"42","mindmg":"0","maxdmg":"0","block":"34","str":"0","dex":"0","con":"0","intel":"0"},{"id":"650","name":"buckler","type":"shield","rarity":"normal","maxdurability":"1000","price":"5500","chance":"2.1","reqstr":"0","reqdex":"97","defense":"15","mindmg":"0","maxdmg":"0","block":"35","str":"0","dex":"0","con":"0","intel":"0"},{"id":"651","name":"kite shield","type":"shield","rarity":"normal","maxdurability":"1000","price":"6300","chance":"2.04","reqstr":"0","reqdex":"104","defense":"57","mindmg":"0","maxdmg":"0","block":"35","str":"0","dex":"0","con":"0","intel":"0"},{"id":"652","name":"spiked shield","type":"shield","rarity":"normal","maxdurability":"1000","price":"6800","chance":"1.92","reqstr":"0","reqdex":"117","defense":"20","mindmg":"0","maxdmg":"0","block":"36","str":"0","dex":"0","con":"0","intel":"0"},{"id":"653","name":"small shield","type":"shield","rarity":"normal","maxdurability":"1000","price":"8100","chance":"1.8","reqstr":"0","reqdex":"122","defense":"54","mindmg":"0","maxdmg":"0","block":"36","str":"0","dex":"0","con":"0","intel":"0"},{"id":"654","name":"large shield","type":"shield","rarity":"normal","maxdurability":"1000","price":"9700","chance":"1.5","reqstr":"0","reqdex":"126","defense":"48","mindmg":"0","maxdmg":"0","block":"37","str":"0","dex":"0","con":"0","intel":"0"},{"id":"655","name":"scutum","type":"shield","rarity":"normal","maxdurability":"1000","price":"11400","chance":"1.5","reqstr":"0","reqdex":"134","defense":"98","mindmg":"0","maxdmg":"0","block":"37","str":"0","dex":"0","con":"0","intel":"0"},{"id":"656","name":"gothic shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"18100","chance":"1.2","reqstr":"0","reqdex":"140","defense":"53","mindmg":"0","maxdmg":"0","block":"38","str":"0","dex":"0","con":"0","intel":"0"},{"id":"657","name":"luna","type":"shield","rarity":"normal","maxdurability":"2000","price":"29900","chance":"1.2","reqstr":"0","reqdex":"151","defense":"115","mindmg":"0","maxdmg":"0","block":"38","str":"0","dex":"0","con":"0","intel":"0"},{"id":"658","name":"bone shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"27000","chance":"1.05","reqstr":"0","reqdex":"157","defense":"60","mindmg":"0","maxdmg":"0","block":"39","str":"0","dex":"0","con":"0","intel":"0"},{"id":"659","name":"ancient shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"31000","chance":"1.05","reqstr":"0","reqdex":"160","defense":"86","mindmg":"0","maxdmg":"0","block":"39","str":"0","dex":"0","con":"0","intel":"0"},{"id":"660","name":"grim shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"35000","chance":"0.75","reqstr":"0","reqdex":"180","defense":"82","mindmg":"0","maxdmg":"0","block":"40","str":"0","dex":"0","con":"0","intel":"0"},{"id":"661","name":"dragon shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"47000","chance":"0.75","reqstr":"0","reqdex":"186","defense":"126","mindmg":"0","maxdmg":"0","block":"40","str":"0","dex":"0","con":"0","intel":"0"},{"id":"662","name":"barbed shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"54000","chance":"0.6","reqstr":"0","reqdex":"190","defense":"90","mindmg":"0","maxdmg":"0","block":"41","str":"0","dex":"0","con":"0","intel":"0"},{"id":"663","name":"heater","type":"shield","rarity":"normal","maxdurability":"2000","price":"78000","chance":"0.45","reqstr":"0","reqdex":"200","defense":"107","mindmg":"0","maxdmg":"0","block":"42","str":"0","dex":"0","con":"0","intel":"0"},{"id":"664","name":"tower shield","type":"shield","rarity":"normal","maxdurability":"2000","price":"113000","chance":"0.3","reqstr":"0","reqdex":"220","defense":"116","mindmg":"0","maxdmg":"0","block":"43","str":"0","dex":"0","con":"0","intel":"0"},{"id":"665","name":"pavise","type":"shield","rarity":"normal","maxdurability":"3000","price":"156000","chance":"0.27","reqstr":"0","reqdex":"240","defense":"132","mindmg":"0","maxdmg":"0","block":"44","str":"0","dex":"0","con":"0","intel":"0"},{"id":"666","name":"hyperion","type":"shield","rarity":"normal","maxdurability":"3000","price":"221000","chance":"0.24","reqstr":"0","reqdex":"260","defense":"127","mindmg":"0","maxdmg":"0","block":"45","str":"0","dex":"0","con":"0","intel":"0"},{"id":"667","name":"monarch","type":"shield","rarity":"normal","maxdurability":"3000","price":"317000","chance":"0.21","reqstr":"0","reqdex":"270","defense":"141","mindmg":"0","maxdmg":"0","block":"46","str":"0","dex":"0","con":"0","intel":"0"},{"id":"668","name":"ward","type":"shield","rarity":"normal","maxdurability":"3000","price":"406000","chance":"0.18","reqstr":"0","reqdex":"280","defense":"162","mindmg":"0","maxdmg":"0","block":"47","str":"0","dex":"0","con":"0","intel":"0"},{"id":"669","name":"blade barrier","type":"shield","rarity":"normal","maxdurability":"4000","price":"582000","chance":"0.12","reqstr":"0","reqdex":"300","defense":"165","mindmg":"0","maxdmg":"0","block":"48","str":"0","dex":"0","con":"0","intel":"0"},{"id":"670","name":"aegis","type":"shield","rarity":"normal","maxdurability":"4000","price":"819000","chance":"0.06","reqstr":"0","reqdex":"320","defense":"163","mindmg":"0","maxdmg":"0","block":"49","str":"0","dex":"0","con":"0","intel":"0"},{"id":"671","name":"troll nest","type":"shield","rarity":"normal","maxdurability":"4000","price":"1400000","chance":"0.03","reqstr":"0","reqdex":"340","defense":"176","mindmg":"0","maxdmg":"0","block":"50","str":"0","dex":"0","con":"0","intel":"0"},{"id":"672","name":"oaken shield","type":"shield","rarity":"normal","maxdurability":"5000","price":"1800000","chance":"0.022","reqstr":"0","reqdex":"360","defense":"187","mindmg":"0","maxdmg":"0","block":"51","str":"0","dex":"0","con":"0","intel":"0"},{"id":"673","name":"hero screen","type":"shield","rarity":"normal","maxdurability":"5000","price":"2200000","chance":"0.018","reqstr":"0","reqdex":"380","defense":"198","mindmg":"0","maxdmg":"0","block":"52","str":"0","dex":"0","con":"0","intel":"0"},{"id":"674","name":"venerated disk","type":"shield","rarity":"normal","maxdurability":"5000","price":"2600000","chance":"0.012","reqstr":"0","reqdex":"400","defense":"211","mindmg":"0","maxdmg":"0","block":"53","str":"0","dex":"0","con":"0","intel":"0"}];
	var defense = parseInt(document.getElementsByClassName("block-list")[1].getElementsByTagName("td")[5].innerHTML);
	var level = parseInt(document.getElementsByClassName("block-list")[0].getElementsByTagName("td")[0].firstChild.nodeValue.replace(/[^0-9]+/g, ""), 10);
	var toDist = parseInt(document.getElementById("points-to-distribute").innerHTML, 10);
	
	if(toDist == 0)
	{
		var dex = document.getElementsByClassName("block-list")[1].getElementsByTagName("td")[2].innerHTML;
		if(dex.length > 4){dex = dex.split("bonus-net\">")[1].split("<")[0];}
		dex = parseInt(dex, 10);
	}
	else
	{
		var dex = parseInt(document.getElementsByClassName("block-list")[1].getElementsByTagName("td")[2].innerHTML.split("<")[0], 10);
	}
	
	var blockChanceWithoutShield = Math.min(70, Math.max(5, 25 * (dex - 50) / (level * 2)));

	var noShieldResult = getNoShieldResult();
	var shieldResult = getShieldResult();
	var useShield = noShieldResult[0] > shieldResult[0] ? true : false;
	
	var newTR = document.createElement("tr");
	var newTH = document.createElement("th");
	var newDiv = document.createElement("div");
	var newTD = document.createElement("td");
	
	newDiv.appendChild(document.createTextNode("Should use shield:"));
	newTH.appendChild(newDiv);
	newTR.appendChild(newTH);
	newTD.appendChild(document.createTextNode(useShield ? "Yes" : "No"));
	newTR.appendChild(newTD);
	
	newTR.addEventListener("mouseover", function()
	{
		newTD.innerHTML = "Damage reduction without shield: " + ((1-noShieldResult[0])*100).toFixed(3) + "%<br/>";
		if(shieldResult[1])
		{
			newTD.innerHTML += "Damage reduction with <span style='color:white'>" + shieldResult[1] + "</span>: " + ((1-shieldResult[0])*100).toFixed(3) + "%";
		}
		else
		{
			newTD.innerHTML += "Can't use any shields.";
		}
	}, false);
	
	newTR.addEventListener("mouseout", function()
	{
		newTD.innerHTML = useShield ? "Yes" : "No";
	}, false);

	document.getElementsByClassName("block-list")[2].childNodes[1].appendChild(newTR);
}