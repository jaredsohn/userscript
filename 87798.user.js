// ==UserScript==
// @name           Bots4 Fight Simulator
// @namespace      Bots4 Fight Simulator
// @description    Bots4 Fight Simulator
// @include        http://*edmazur.com/bots/old_calc.php*
//
// @author         AquaRegia
// @version        2010-12-22
// ==/UserScript==

if(GM_getValue && !GM_getValue.toString().match('not supported'))
{
	var browser = "firefox";
	var setValue = GM_setValue;
	var getValue = GM_getValue;
	var addStyle = GM_addStyle;
}
else if(localStorage)
{
	var setValue = function(key, value)
	{
		key += "";
		value += "";
		
		localStorage[key] = value;
	};
	
	var getValue = function(key, defaultValue)
	{
		key += "";
		defaultValue += "";
		
		var value = localStorage[key];
		
		return (value ? value : defaultValue);
	};
	
	var addStyle = function(css)
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}
else
{
	alert("I'm afraid the script 'Bots4 Fight Simulator' won't work in your browser =(");
	return;
}

addStyle("\
	#shade\
	{\
		position: fixed !important;\
		top: 0px !important;\
		left: 0px !important;\
		z-index: 1000 !important;\
		width: 100% !important;\
		height: 100% !important;\
		opacity: 0.9 !important;\
		background: #000000 !important;\
	}\
	#resultBox\
	{\
		position: fixed !important;\
		top: 0px !important;\
		left: 0px !important;\
		bottom: 0px !important;\
		right: 0px !important;\
		width: 400px !important;\
		height: 300px !important;\
		background: #CCDDEE !important;\
		z-index: 1001 !important;\
		margin: auto !important;\
	}\
	#quitButton\
	{\
		position: absolute !important;\
		text-align: center !important;\
		width: 40px !important;\
		bottom: 10px !important;\
		left: 0px !important;\
		right: 0px !important;\
		z-index: 1002 !important;\
		border: 1px solid !important;\
		margin: auto !important;\
		text-decoration: none !important;\
		color: black !important;\
		background: #AACCDD !important;\
	}\
	#resultText\
	{\
		color: black !important;\
		margin-left: 15px !important;\
		margin-right: 15px !important;\
	}\
	")

function Bot(name, lvl, str, dex, con, intel, lWepMin, lWepMax, rWepMin, rWepMax, armor, shieldBlock)
{
	this.name = name
	this.lvl = lvl
	this.hp = con * 10 + 50
	this.starthp = this.hp
	this.intel = parseInt(intel)
	this.minDmg = []
	this.maxDmg = []
	this.minDmg["l"] = parseInt(lWepMin * (parseInt(str) + 100) / 100)
	this.maxDmg["l"] = parseInt(lWepMax * (parseInt(str) + 100) / 100)
	this.minDmg["r"] = parseInt(rWepMin * (parseInt(str) + 100) / 100)
	this.maxDmg["r"] = parseInt(rWepMax * (parseInt(str) + 100) / 100)
	this.attRate = dex * 2 - 8
	this.defRate = dex/2
	this.hitRate = 0
	this.blockRate = Math.min(70, Math.max(5, 25 * (parseInt(dex) - 50) / (lvl * 2) + parseInt(shieldBlock)))
	this.absorb = 0.02 * Math.sqrt(armor)
	this.shieldBlock = parseInt(shieldBlock)
	this.activeHand = "l"
	
	this.reset = function()
	{
		this.hp = this.starthp
		this.activeHand = "l"
	}
}

function FightResult(winner, length, xpGain)
{
	this.winner = winner
	this.length = length
	this.xpGain = xpGain
}

//This function was written by Ender
//"Commatizes" numbers to display "12,345" intead of "12345"
function commatize(nStr)
{
	var x;
	var x1;
	var x2;
	var rgx;

	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1))
	{
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function fight(a, d)
{
	fightWinner = ""
	fightBlocks = 0
	fightVariable = 0
	fightAttempts = 0
	attackerAttempts = 0
	fightDamage = 0
	fightXpGain = 0

	a.hitRate = Math.min(95, Math.max(5, 100 * a.attRate / (a.attRate + d.defRate)))
	d.hitRate = Math.min(95, Math.max(5, 100 * d.attRate / (d.attRate + a.defRate)))
	
	turn = (Math.random()*a.intel) >= (Math.random()*d.intel)
	
	while(a.hp > 0 && d.hp > 0)
	{
		hitter = turn ? a : d
		hit = turn ? d : a
		if(hitter.hitRate > Math.random()*100)
		{
			if(hit.blockRate <= Math.random()*100)
			{
				minDmg = hitter.minDmg[hitter.activeHand]
				maxDmg = hitter.maxDmg[hitter.activeHand]
				dmg = parseInt((Math.random()*(maxDmg-minDmg+1) + minDmg)*(1-hit.absorb))
				hit.hp -= dmg
				if(turn)
				{
					fightDamage += dmg
				}
			}
			else
			{
				if(turn)
				{
					fightBlocks++
				}
			}
		}
		hitter.activeHand = (hitter.activeHand == "l" && hitter.shieldBlock == 0) ? "r" : "l"
		turn = (hitter.activeHand == "r" && hit.shieldBlock > 0 && hitter.shieldBlock == 0) ? turn : !turn
		
		if(turn)
		{
			attackerAttempts++
		}
		
		fightAttempts++
	}
	
	fightWinner = a.hp > 0 ? a.name : d.name
	
	if(fightWinner == a.name)
	{
		fightVariable = d.lvl >= a.lvl ? 100 : 150
	}
	else
	{
		fightVariable = d.lvl >= a.lvl ? 200 : 300
	}
	
	blockMod = 1 + fightBlocks/(attackerAttempts-fightBlocks)
	
	fightXpGain = d.lvl * fightDamage * a.intel / fightVariable * blockMod
	
	return new FightResult(fightWinner, fightAttempts*800, fightXpGain)
}

function addToList(type)
{
	stats = ["l","s","d","c","i"]

	for(stat in stats)
	{
		source = document.getElementsByName(stats[stat])[0]
		try
		{
			stats[stats[stat]] = Math.max(5, parseInt(/>([0-9]+)</.exec(source.parentNode.innerHTML)[1]))
		}
		catch(err)
		{
			stats[stats[stat]] = parseInt(source.value)
		}
	}

	stats["a"] = parseInt(document.body.innerHTML.split("Armor defense</td>")[1].split("</font>")[0].split(">").pop())

	weaponSource = document.body.innerHTML.split("\"70\">damage</td>")

	if(weaponSource.length == 2)
	{
		lDmg = weaponSource[1].split("</td>")[0].split(">")[1].split(" - ")
		stats["lmin"] = parseInt(lDmg[0])
		stats["lmax"] = parseInt(lDmg[1])
		stats["rmin"] = 0
		stats["rmax"] = 0
		stats["block"] = parseInt(document.body.innerHTML.split("\"80\">blockchance</td>")[1].split("%</td>")[0].split(">").pop())
	}
	else if(weaponSource.length == 3)
	{
		lDmg = weaponSource[1].split("</td>")[0].split(">")[1].split(" - ")
		stats["lmin"] = parseInt(lDmg[0])
		stats["lmax"] = parseInt(lDmg[1])
		rDmg = weaponSource[2].split("</td>")[0].split(">")[1].split(" - ")
		stats["rmin"] = parseInt(rDmg[0])
		stats["rmax"] = parseInt(rDmg[1])
		stats["block"] = 0
	}
	else
	{
		crash()
	}
	
	stats["name"] = prompt("Please enter a name", getValue(type, "Subject #" + parseInt(Math.random()*(900000) + 100000)).split(",")[0]) || crash()
	
	GMString = []
	GMString.push(stats["name"].replace(/,/g, ""))
	GMString.push(stats["l"])
	GMString.push(stats["s"])
	GMString.push(stats["d"])
	GMString.push(stats["c"])
	GMString.push(stats["i"])
	GMString.push(stats["lmin"])
	GMString.push(stats["lmax"])
	GMString.push(stats["rmin"])
	GMString.push(stats["rmax"])
	GMString.push(stats["a"])
	GMString.push(stats["block"])
	GMString = GMString.join(",")
	
	setValue(type, GMString)
	setValue(type+"-link", String(document.location).replace(/#$/, ""))
	
	alert(stats["name"] + " was successfully added as " + type + "!")
}

function saveButtonEvent(type)
{
	try
	{
		addToList(type)
	}
	catch(err)
	{
		alert("Something went wrong...")
	}
}

function loadButtonEvent(type)
{
	try
	{
		document.location = getValue(type+"-link") || crash()
	}
	catch(err)
	{
		alert("Nothing to load!")
	}
}

function simulateFights()
{
	try
	{
		as = getValue("attacker") || crash()
		as = as.split(",")
		ds = getValue("defender") || crash()
		ds = ds.split(",")
		
		attacker = new Bot(as[0], as[1], as[2], as[3], as[4], as[5], as[6], as[7], as[8], as[9], as[10], as[11])
		defender = new Bot(ds[0], ds[1], ds[2], ds[3], ds[4], ds[5], ds[6], ds[7], ds[8], ds[9], ds[10], ds[11])
		
		aWins = 0
		dWins = 0
		totalXp = 0
		totalLength = 0
		averageXp = 0
		xpRate = 0
		
		for(i = 0; i < 100000; i++)
		{
			result = fight(attacker, defender)
			
			if(result.winner == attacker.name)
			{
				aWins++
			}
			else
			{
				dWins++
			}
			
			totalXp += result.xpGain
			totalLength += result.length
			
			attacker.reset()
			defender.reset()
		}
		
		if(defender.lvl < 300)
		{
			xpMod = 1
		}
		else if(defender.lvl >= 300 && defender.lvl < 450)
		{
			xpMod = 1.3
		}
		else if(defender.lvl >= 450 && defender.lvl < 600)
		{
			xpMod = 1.6
		}
		else if(defender.lvl >= 600 && defender.lvl < 750)
		{
			xpMod = 1.9
		}
		else if(defender.lvl >= 750 && defender.lvl < 900)
		{
			xpMod = 2.2
		}
		else
		{
			xpMod = 2.5
		}
		
		totalXp *= xpMod
		
		xpRate = parseInt((totalXp / totalLength) * 3600000)
		averageXp = parseInt(totalXp / 100000)
		
		shading = document.createElement("div")
		shading.id = "shade"
		
		resultBox = document.createElement("div")
		resultBox.id = "resultBox"

		resultText = document.createElement("div")
		resultText.id = "resultText"
		resultText.innerHTML += "<center>" + attacker.name + " vs " + defender.name + "</center>"
		resultText.innerHTML += "<br><br>" + attacker.name + " won " + aWins + " times ("+ (aWins/(aWins+dWins)*100).toFixed(2) + "%)"
		resultText.innerHTML += "<br>" + defender.name + " won " + dWins + " times ("+ (dWins/(aWins+dWins)*100).toFixed(2) + "%)"
		resultText.innerHTML += "<br><br>If " + defender.name + " is a trainbot, " + attacker.name + " would get:"
		resultText.innerHTML += "<br>Max " + commatize(xpRate) + " xp per hour"
		resultText.innerHTML += "<br>Avg " + commatize(averageXp) + " xp per fight"
		resultText.innerHTML += "<br><br><br>A total of 100,000 fights were simulated, but please keep in mind that even though this may sound like a lot, it really isn't. The random factor has a great impact on the outcome and the results you get from this simulator will always differ slightly from each simulation."
		resultBox.appendChild(resultText)
		
		quitButton = document.createElement("a")
		quitButton.id = "quitButton"
		quitButton.href = "#"
		quitButton.appendChild(document.createTextNode("Close"))
		quitButton.addEventListener("click", function(){document.body.removeChild(resultBox); document.body.removeChild(shading)}, false)
		resultBox.appendChild(quitButton)
		
		document.body.appendChild(shading)
		document.body.appendChild(resultBox)
	}
	catch(err)
	{
		alert(err)//"You need both an attacker and a defender to simulate fights!")
	}
}

links = document.getElementsByTagName("a")
for(i in links)
{
	if(links[i].innerHTML == "reset")
	{
		resetLink = links[i]
	}
}

attSaveLink = document.createElement("a")
attSaveLink.appendChild(document.createTextNode("save"))
attSaveLink.href = "#"
attSaveLink.addEventListener("click", function(){saveButtonEvent("attacker")}, false)

attLoadLink = document.createElement("a")
attLoadLink.appendChild(document.createTextNode("load"))
attLoadLink.href = "#"
attLoadLink.addEventListener("click", function(){loadButtonEvent("attacker")}, false)

defSaveLink = document.createElement("a")
defSaveLink.appendChild(document.createTextNode("save"))
defSaveLink.href = "#"
defSaveLink.addEventListener("click", function(){saveButtonEvent("defender")}, false)

defLoadLink = document.createElement("a")
defLoadLink.appendChild(document.createTextNode("load"))
defLoadLink.href = "#"
defLoadLink.addEventListener("click", function(){loadButtonEvent("defender")}, false)

fightLink = document.createElement("a")
fightLink.appendChild(document.createTextNode("fight!"))
fightLink.href = "#"
fightLink.addEventListener("click", simulateFights, false)

resetLinkLoc = resetLink.parentNode

resetLinkLoc.appendChild(document.createTextNode(" [ attacker: "))
resetLinkLoc.appendChild(attSaveLink)
resetLinkLoc.appendChild(document.createTextNode(" / "))
resetLinkLoc.appendChild(attLoadLink)
resetLinkLoc.appendChild(document.createTextNode(" ] [ defender: "))
resetLinkLoc.appendChild(defSaveLink)
resetLinkLoc.appendChild(document.createTextNode(" / "))
resetLinkLoc.appendChild(defLoadLink)
resetLinkLoc.appendChild(document.createTextNode(" ] [ "))
resetLinkLoc.appendChild(fightLink)
resetLinkLoc.appendChild(document.createTextNode(" ]"))