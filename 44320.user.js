// ==UserScript==
// @name                UrbanFrib
// @namespace           noes
// @description         Zombie bot. My first script. Early version, do not use unless you want to. Not very useful yet, don't blame me if you waste AP.
// @include             http://*urbandead.com/map.cgi*
// ==/UserScript==

var feasthealth = 56;
var feastap = 10;
var scentap = 50;
var standupAP = 30;

var currenthp;
var currentap;
var currentxp;

var otherzombieshere;
var bSomethingHere;
var corpseshere;
var bOutside;
var bRuined;
var bSurvivorHere;
GM_setValue("fribbotActive", 0);
startbot();

function startbot()
{
	if (GM_getValue("fribbotActive", 0) != 1 && document.body.innerHTML.search("The exertions of the day have numbed your clouded brain. You stand where you were, swaying slightly.") == -1)
	{
		    var forms = document.getElementsByTagName("form");
		    for ( var i = 0; i < forms.length; i++) {
				var aform = forms[i];
				if (aform.getAttribute("action") == "map.cgi?rise")
				{
					aform.submit();
					return;
				}		
			}
		
		currenthp = parseForValue(/You have <b>([0-9]+)<\/b> Hit Points/);
		currentap = parseForValue(/You have <b>([0-9]+)<\/b> Action Points remaining/);
		currentxp = parseForValue(/and <b>([0-9]+)<\/b> Experience Points/);
		corpseshere = parseForText(/There are ([a-z]+) dead bodies here/);
		
		whereamI();
		if (!bOutside)
		{
			isSomethingHere();
			
			if (bSomethingHere)
			{
				attack();
				return;
			}
			else if (!bRuined)
			{
				ruin();
				return;
			}
			else if (currenthp <= feasthealth && currentap > feastap)
			{
				if (toString(corpseshere) != null)
				{
					feast();
					return;
				}
			}
			else 
			{
				leaveBuilding();
				return;
			}
		}
		else 
		{
			lookForSurvivorsHere();
			if(bSurvivorHere)
			{
				attack();
				return;
			}
//			else
//			{
//				lookForSurvivorsNearby();
//			}
			// if (currentap == 50)
			// {
			// 	scent();
			// 	return;
			// }
			else if (!bRuined)
			{
				isSomethingHere();
				if (bSomethingHere)
				{
					attack();
					return;
				}
				else
				{
					enterBuilding();
					return;
				}
			}
			else
			{
				wander();
				return;
			}
		}
	}
}

function parseForValue(re)
{
	var matches;
	
	if (re.test(document.body.innerHTML))
	{
		matches = re.exec(document.body.innerHTML);
		
		return parseInt(matches[1]);
	}
	
	return null;
}

function parseForText(re)
{
	var matches;
	
	if (re.test(document.body.innerHTML))
	{
		matches = re.exec(document.body.innerHTML);
		return matches[1];
	}
	
	return null;
}

function parseForPlayer() {
	var matches;
	var re = /[0-9]+/;
	var forms = document.getElementsByTagName("select");
	for ( var i = 0; i < forms.length; i++) {
		var options = forms[i].getElementsByTagName("option");
		for (var ii = 0; ii < options.length; ii++)
		{
		matches = re.exec(options[ii].getAttribute("value"));
		if (matches != null)
		{
			return true;
		}
		}
	}
	return false;
}
function lookForSurvivorsHere()
{
	if (document.body.innerHTML.search("Also here ") != -1)
	{
		bSurvivorHere = true;
	}
	else
	{
		bSurvivorHere = false;
	}
}
function isSomethingHere()
{
	if (document.body.innerHTML.search('value="b"') != -1)
	{
		bSomethingHere = true;
	}
	else if (document.body.innerHTML.search('value="g"') != -1)
	{
		bSomethingHere = true;
	}
	else if (document.body.innerHTML.search('value="r"') != -1)
	{
		bSomethingHere = true;
	}
	else if (document.body.innerHTML.search('value="t"') != -1)
	{
		bSomethingHere = true;
	}
	else if (document.body.innerHTML.search('value="i"') != -1)
	{
		bSomethingHere = true;
	}
	else if (document.body.innerHTML.search("Also here ") != -1)
	{
		bSomethingHere = true;
	}
	else
	{
		bSomethingHere = false;
	}
}
function whereamI()
{
	if (document.body.innerHTML.search('You are standing outside') != -1)
	{
		bOutside = true;
	}
	else if (document.body.innerHTML.search('You are inside') != -1)
	{
		bOutside = false;
	}
	else if (document.body.innerHTML.search('wasteland') != -1)
	{
		bOutside = true;
	}
	else if (document.body.innerHTML.search('You are at') != -1)
	{
		bOutside = true;
	}
	else
	{
		bOutside = false;
	}
	
	if (document.body.innerHTML.search('you can see that the interior of the building has been ruined') != -1)
	{
		bRuined = true;
	}
	else if (document.body.innerHTML.search('has fallen into ruin') != -1 || document.body.innerHTML.search('have been ruined') != -1)
	{
		bRuined = true;
	}
	else
	{
		bRuined = false;
	}
}

function feast()
{
    var forms = document.getElementsByTagName("form");
    for ( var i = 0; i < forms.length; i++) {
		var aform = forms[i];
		if (aform.getAttribute("action") == "map.cgi?feed")
		{
			aform.submit();
			return;
		}		
	}
}

function scent()
{
	//look at the scent map then move to the biggest concentration of zambahs, then move to it.
	wander();
}

function attack()
{
    var forms = document.getElementsByTagName("form");
    for ( var i = 0; i < forms.length; i++) {
		var aform = forms[i];
		
		if (aform.innerHTML.search('value="Attack"') != -1)
		{
			var target = aform.getElementsByTagName("select")[0];
			var weapon = aform.getElementsByTagName("select")[1];
			
			if (document.body.innerHTML.search("Also here ") != -1)
			{
				weapon.selectedIndex=0;
				
				var options = target.getElementsByTagName("option");
				for ( var iii = 0; iii < options.length; iii++)
				{
					var regex = /[0-9]+/;
					if (options[iii].getAttribute('value').match(regex))
					{
						target.selectedIndex = iii;
						weapon.selectedIndex = 0;
						if (document.body.innerHTML.search("and grab hold of") != -1 || document.body.innerHTML.search("writhes in your grip") != -1 || document.body.innerHTML.search("by the shoulders,") != -1)
						{
							weapon.selectedIndex = 1;
						}
						aform.submit();
						return;
					}
				}				
				
			}
			else
			{
				if (document.body.innerHTML.search('value="t"') != -1)
				{
					targett = "h";
				}
				if (document.body.innerHTML.search('value="i"') != -1)
				{
					targett = "i";
				}				
				if (document.body.innerHTML.search('value="b"') != -1)
				{
					targett = "b";
				}
				if (document.body.innerHTML.search('value="r"') != -1)
				{
					targett = "r";
				}
				if (document.body.innerHTML.search('value="g"') != -1)
				{
					targett = "g";
				}
				var options = target.getElementsByTagName("option");
				for ( var iii = 0; iii < options.length; iii++)
				{
					if (targett == options[iii].getAttribute('value'))
					{
						target.selectedIndex = iii;
						weapon.selectedIndex = 0;
						aform.submit();
						return;						
					}
					
				}

			} 	
		}
	}
}

function lookForSurvivorsNearby()
{
	// look at the minimap for any survivors on it, then move to it.
	// Break if moved
	
	wander();
}

function wander()
{
	// Move to biggest horde on minimap with an unruined building.
	// If none present, move to any unruined building
	
	// If no unruined buildings present, move randomly.
	var rand_no = Math.floor(Math.random()*8)
    var forms = document.getElementsByTagName("form");
    forms[rand_no].submit();
}

function enterBuilding()
{
	    var forms = document.getElementsByTagName("form");
	    for ( var i = 0; i < forms.length; i++) {
			var aform = forms[i];
			if (aform.getAttribute("action") == "map.cgi?in")
			{
				aform.submit();
				return;
			}		
		}
	    wander();
}

function leaveBuilding()
{
    var forms = document.getElementsByTagName("form");
    for ( var i = 0; i < forms.length; i++) {
		var aform = forms[i];
		if (aform.getAttribute("action") == "map.cgi?out")
		{
			aform.submit();
			return;
		}		
	}
}	


function ruin()
{
	   var forms = document.getElementsByTagName("form");
	    for ( var i = 0; i < forms.length; i++) {
			var aform = forms[i];
			if (aform.getAttribute("action") == "map.cgi?ransack")
			{
				aform.submit();
				return;
			}		
		}
	    leaveBuilding();
}

function refresh()
{
	if(getCurrentUrl() == getUrl())
	{
		window.location.reload();
	}
}