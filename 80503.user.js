// ==UserScript==
// @name           Bilge Dice autoplay
// @namespace      http://www.neocodex.us/*
// @description    Autoplays Bilge Dice
// @include        http://www.neopets.com/pirates/bilge.phtml
// ==/UserScript==

var z=0
var y=0
var x=0
var qualifier1=0
var qualifier4=0
var dice
var atLeastOne=0
var sixToggle=0
var fiveToggle=0
var fourToggle=0
var waitTime=0
var maxBet
var npToday

function returnDie(HTML)
{
	if(HTML.search("dice_")<0)
	{
		return("0")
	}
	else
	{
		return(HTML[HTML.search("dice_")+5])
	}
}

function RollAgain()
{
	z=0
	while(document.getElementsByTagName("input")[z].value != "Roll Dice")
	{
		z++
	}
	document.getElementsByTagName("input")[z].click()
}

function KeepButton()
{
	z=0
	while(document.getElementsByTagName("input")[z].value != "Keep")
	{
		z++
	}
	document.getElementsByTagName("input")[z].click()
}

function FreePlay()
{
	z=0
	while(document.getElementsByTagName("input")[z].value != "Free Play")
	{
		z++
	}
	document.getElementsByTagName("input")[z].click()
}

function SeeIfYouDefeated()
{
	z=0
	while(document.getElementsByTagName("input")[z].value != "See if you defeated those scallywags!!")
	{
		z++
	}
	document.getElementsByTagName("input")[z].click()
}

function PlayAgain()
{
	z=0
	while(document.getElementsByTagName("input")[z].value != "Play Again!")
	{
		z++
	}
	document.getElementsByTagName("input")[z].click()
}

function ClickAnte()
{
	z=0
	while(document.getElementsByTagName("td")[z].innerHTML.search("NP Today")<0 || document.getElementsByTagName("td")[z].innerHTML.search("NP Today")>100)
	{
		z++
	}
	npToday=document.getElementsByTagName("td")[z+5].innerHTML
	//Earnings Set

	y=0
	while(document.getElementsByTagName("input")[y].value != "10 NP")
	{
		y++
	}

	x=y
	while(document.getElementsByTagName("input")[x].value != "Enter search text...")
	{
		x++
	}
	maxBet=document.getElementsByTagName("input")[x-1].value
	maxBet=maxBet.slice(0,(maxBet.length-3))
	//Max Bet Set

	//First game of day
	if(npToday==0)
	{
		GM_setValue("winning","0")
		document.getElementsByTagName("input")[y].click()
	}
	//Going for max winnings
	else if(npToday==5000)
	{
		GM_setValue("winning","1")
		document.getElementsByTagName("input")[x-1].click()
	}
	//Approaching winning number (a maxbet or more away)
	else if(npToday-(5000-(maxBet*3))>=maxBet)
	{
		alert("Betting max and failing")
		GM_setValue("winning","0")
		alert(document.getElementsByTagName("input")[x-1].value)
		document.getElementsByTagName("input")[x-1].click()
	}
	//Approaching winning number (various cases)
	else if(maxBet>10 && npToday-(4990-(maxBet*3))>=10)
	{
		alert("Betting 10 and failing")
		GM_setValue("winning","0")
		alert(document.getElementsByTagName("input")[x-1].value)
		document.getElementsByTagName("input")[y+4].click()
	}
	else if(maxBet>10 && npToday-(4990-(maxBet*3))>=10)
	{
		alert("Betting 10 and failing")
		GM_setValue("winning","0")
		alert(document.getElementsByTagName("input")[x-1].value)
		document.getElementsByTagName("input")[y+3].click()
	}
	else if(maxBet>10 && npToday-(4990-(maxBet*3))>=10)
	{
		alert("Betting 10 and failing")
		GM_setValue("winning","0")
		alert(document.getElementsByTagName("input")[x-1].value)
		document.getElementsByTagName("input")[y+2].click()
	}
	else if(maxBet>10 && npToday-(4990-(maxBet*3))>=10)
	{
		alert("Betting 10 and failing")
		GM_setValue("winning","0")
		alert(document.getElementsByTagName("input")[x-1].value)
		document.getElementsByTagName("input")[y+1].click()
	}
	//One bet or more from 4990
	else if(npToday<=(4990-(maxBet*3)))
	{
		GM_setValue("winning","1")
		document.getElementsByTagName("input")[x-1].click()
	}

}

//Get the game started
if(document.body.innerHTML.search("Welcome to Bilge Dice")>0)
{
	if(document.body.innerHTML.search("reached the limit")>0)
	{
		waitTime = (Math.random()*1000)+1000
		window.setTimeout(FreePlay,waitTime)
	}
	else
	{
		waitTime = (Math.random()*1000)+1000
		window.setTimeout(ClickAnte,waitTime)
	}
}

//Actually playing and losing
if(document.body.innerHTML.search("Current Score")>0 && GM_getValue("winning")=="0")
{
	if(document.body.innerHTML.search("at least one")<0)
	{
		waitTime = (Math.random()*1000)+1000
		window.setTimeout(RollAgain,waitTime)
	}
	else
	{
		//This finds the first die in your roll
		z=0
		while(document.getElementsByTagName("td")[z].innerHTML.search("label for")<0 || document.getElementsByTagName("td")[z].innerHTML.search("label for")>300)
		{
			z++
		}
		
		dice=returnDie(document.getElementsByTagName("td")[z].innerHTML)
		z=z+3
	
		while(dice[dice.length-1]>0)
		{
			dice=dice+returnDie(document.getElementsByTagName("td")[z].innerHTML)
			z=z+3
		}

		z=0
		while(document.getElementsByTagName("input")[z].id != "0")
		{
			z++
		}

		//Meat and potatoes
		if(dice.search("1")<0 || dice.search("4")<0)
		{
			y=0
			while(y<dice.length)
			{
				document.getElementsByTagName("input")[z+y].click()
				y++
			}
		}
		else
		{
			y=0
			while(y<dice.length)
			{
				if(dice[y]!="1" && dice[y]!="4")
				{
					document.getElementsByTagName("input")[z+y].click()
				}
				y++
			}
		}
		
		waitTime = (Math.random()*2000)+2000
		window.setTimeout(KeepButton,waitTime)		
	}
}

//Actually playing & winning
if(document.body.innerHTML.search("Current Score")>0 && GM_getValue("winning")=="1")
{
	if(document.body.innerHTML.search("at least one")<0)
	{
		waitTime = (Math.random()*1000)+1000
		window.setTimeout(RollAgain,waitTime)
	}
	else
	{
		//This finds the first die in your qualifiers
		z=0
		while(document.getElementsByTagName("td")[z].innerHTML.search("Qualifiers")<0 || document.getElementsByTagName("td")[z].innerHTML.search("Qualifiers")>300)
		{
			z++
		}
		z++
		if(document.getElementsByTagName("td")[z].innerHTML.search("d1.gif")<0)
		{
			qualifier1=1
		}
		z++
		if(document.getElementsByTagName("td")[z].innerHTML.search("d4.gif")<0)
		{
			qualifier4=1
		}
		//qualifiers set
	
		//This finds the first die in your roll
		z=0
		while(document.getElementsByTagName("td")[z].innerHTML.search("label for")<0 || document.getElementsByTagName("td")[z].innerHTML.search("label for")>300)
		{
			z++
		}
		
		dice=returnDie(document.getElementsByTagName("td")[z].innerHTML)
		z=z+3
	
		while(dice[dice.length-1]>0)
		{
			dice=dice+returnDie(document.getElementsByTagName("td")[z].innerHTML)
			z=z+3
		}
		
		//Select the dice I want to keep
		z=0
		while(document.getElementsByTagName("input")[z].id != "0")
		{
			z++
		}
	
		if(qualifier1==0 && dice.search("1")>-1)
		{
			document.getElementsByTagName("input")[z+dice.search("1")].click()
			qualifier1=1
			atLeastOne++
		}
	
		if(qualifier4==0 && dice.search("4")>-1)
		{
			document.getElementsByTagName("input")[z+dice.search("4")].click()
			qualifier4=1
			atLeastOne++
			fourToggle=1
		}
	
		if(qualifier1==1 && qualifier4==1 && dice.search("6")>-1)
		{
			while(y<=dice.length)
			{
				if(dice[y]=="6")
				{
					document.getElementsByTagName("input")[z+y].click()
					atLeastOne++
				}
				y++
			}
			sixToggle=1
		}

		if(atLeastOne<2 && dice.search("6")>-1 && sixToggle==0)
		{
			document.getElementsByTagName("input")[z+dice.search("6")].click()
			atLeastOne++
		}

		if(qualifier1==1 && qualifier4==1 && dice.search("5")>-1)
		{
			if(dice.length-atLeastOne<=3)
			{
				while(y<=dice.length)
				{
					if(dice[y]=="5")
					{
						document.getElementsByTagName("input")[z+y].click()
						atLeastOne++
					}
					y++
				}
				fiveToggle=1
			}
		}
	
		if(atLeastOne<1 && dice.search("5")>-1 && fiveToggle==0)
		{
			document.getElementsByTagName("input")[z+dice.search("5")].click()
			atLeastOne++
		}

		if(qualifier1==1 && qualifier4==1 && dice.search("4")>-1 && dice.length-atLeastOne==2 && fourToggle==0)
		{
			document.getElementsByTagName("input")[z+dice.search("4")].click()
			atLeastOne++
			fourToggle=1
		}

		if(atLeastOne<1 && dice.search("4")>-1 && fourToggle==0)
		{
			document.getElementsByTagName("input")[z+dice.search("4")].click()
			atLeastOne++
		}
	
		if(atLeastOne<1 && dice.search("3")>-1)
		{
			document.getElementsByTagName("input")[z+dice.search("3")].click()
			atLeastOne++
		}
	
		if(atLeastOne<1 && dice.search("2")>-1)
		{
			document.getElementsByTagName("input")[z+dice.search("2")].click()
			atLeastOne++
		}
	
		if(atLeastOne<1 && dice.search("1")>-1)
		{
			document.getElementsByTagName("input")[z+dice.search("1")].click()
			atLeastOne++
		}
		waitTime = (Math.random()*2000)+2000
		window.setTimeout(KeepButton,waitTime)
	}
}

//Various continuances
if(document.body.innerHTML.search("You have managed a score of")>0)
{
	waitTime = (Math.random()*1000)+1000
	window.setTimeout(SeeIfYouDefeated,waitTime)
}

if(document.body.innerHTML.search("Scored a")>0 || document.body.innerHTML.search("You were unable to get the 1")>0)
{
	waitTime = (Math.random()*1000)+1000
	window.setTimeout(PlayAgain,waitTime)
}