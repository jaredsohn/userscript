// ==UserScript==
// @name           Bilge Dice Autoplay - Tsunade Request
// @namespace      http://www.neocodex.us/*
//                 jcrboy
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
var pause = {'min':1,'max':2,multi:{'min':3,'max':4},last:null};
unsafeWindow.bilgeTimeout;

var myDiv = document.createElement('div');
myDiv.setAttribute('style','padding:10px; text-align:center;');
myDiv.id = 'bilgeAPDiv';
var mySpan = document.createElement('span');
mySpan.id = 'bilgeAPStatus';
mySpan.innerHTML = 'Figuring out what to do...';
var clearLink = document.createElement('a');
clearLink.innerHTML = 'STOP AUTOPLAYER';
clearLink.href = '#';
var remIH = 'Bilge Dice AP Stopped!!<br><br><b><a href=\'#\' onclick=\'document.getElementById(\\"bilgeAPDiv\\").parentNode.removeChild(document.getElementById(\\"bilgeAPDiv\\")); return false;\'>Remove This</a></b>';
clearLink.setAttribute('onclick','try{clearTimeout(bilgeTimeout)}catch(e){} document.getElementById(\'bilgeAPDiv\').innerHTML = "'+remIH+'"; return false;');
clearLink.setAttribute('style','font-weight:bold;');
myDiv.appendChild(mySpan);
myDiv.appendChild(document.createElement('br'));
myDiv.appendChild(document.createElement('br'));
myDiv.appendChild(clearLink);
//document.getElementById('content').insertBefore(myDiv,document.getElementById('content').firstChild)
getElementsByClassName('content')[0].insertBefore(myDiv,getElementsByClassName('content')[0].firstChild);

function getElementsByClassName(className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

function getPause(minOverride,maxOverride)
{

	var minPause = pause.min;
	var maxPause = pause.max;

	if (minOverride)	{
		minPause = minOverride;
	}
	if (maxOverride)	{
		maxPause = maxOverride;
	}

	pause.last = (Math.floor(Math.random() * (maxPause - minPause + 1) + minPause));
	if (pause.last == maxPause)	{
		pause.last *= 1000;
		pause.last -= Math.floor(Math.random() * 301);
	} else if(pause.last == minPause)	{
		pause.last *= 1000;
		pause.last += Math.floor(Math.random() * 301);
	} else	{
		pause.last *= 1000;
		if (Math.floor(Math.random() * 2) == 0)	{
			pause.last -= Math.floor(Math.random() * 301);
		} else 	{
			pause.last += Math.floor(Math.random() * 301);
		}
	}

	pause.last = parseInt(pause.last);

	if (pause.last <= 0)	{
		alert('ERROR: pause.last('+pause.last+') was found to be <= 0 so setting it 2563');
		pause.last = 2563;
	}

	//alert('Waiting ('+pause.last+'ms)');
	if (document.getElementById('bilgeAPStatus'))	{
		document.getElementById('bilgeAPStatus').innerHTML = 'Waiting ('+pause.last+'ms)';
	}
	return pause.last;
}

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
	while(document.getElementsByTagName("td")[z].innerHTML.search("NP Today")<0 || document.getElementsByTagName("td")[z].innerHTML.search("NP Today")>100)
	{
		z++
	}
	npToday=document.getElementsByTagName("td")[z+5].innerHTML
	//Earnings Set

	if(document.getElementsByTagName("td")[z+1].innerHTML%50 == 0)
	{
		//alert("50 game pause")
	}

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

	if(document.getElementsByTagName("td")[z+1].innerHTML%25 == 0)
	{
		//alert("25 game pause")
	}

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
	//if(npToday==0)
	//{
	//	GM_setValue("winning","0")
	//	document.getElementsByTagName("input")[y].click()
	//}
	//Going for max winnings
	//else if(npToday==4990)
	//{
		//alert("do this one manually?")
		GM_setValue("winning","1")
//	//	document.getElementsByTagName("input")[x-1].click()
	//}
	//Just in case
	//else if(maxBet==1000 && npToday<=990)
	//{
	//	GM_setValue("winning","1")
	//	document.getElementsByTagName("input")[x-1].click()
	//}
	//Don't want someone stuck in a MOD 50 loop... so....
	//else if(maxBet>50 && (npToday+10)%100==50 && 4990-npToday>=150)
	//{
	//	GM_setValue("winning","1")
	//	document.getElementsByTagName("input")[y+3].click()
	//}
	//Approaching winning number (a maxbet or more away)
	//else if(maxBet<1000 && (4990-npToday)>=maxBet*3)
	//{
	//	GM_setValue("winning","1")
	//	document.getElementsByTagName("input")[x-1].click()
	//}
	//Approaching winning number (various cases)
	//else if(maxBet>500 && 4990-npToday>=1500)
	//{
	//	GM_setValue("winning","1")
	//	document.getElementsByTagName("input")[y+12].click()
	//}
	//else if(maxBet>200 && 4990-npToday>=600)
	//{
	//	GM_setValue("winning","1")
	//	document.getElementsByTagName("input")[y+9].click()
	//}
	//else if(maxBet>100 && 4990-npToday>=300)
	//{
	//	GM_setValue("winning","1")
	//	document.getElementsByTagName("input")[y+6].click()
	//}
	//Auto-losing on a 100 bet to put us back in the zone
	if(1)
	{
		GM_setValue("winning","1")
		document.getElementsByTagName("input")[y].click()
	}
	//Just in case some weird ass shit happens
	else
	{
		alert("Tell Jeremy there's a problem")
		alert("npToday:"+npToday)
		alert("maxBet:"+maxBet)
	}
}

//Get the game started

if(document.body.innerHTML.search("Welcome to Bilge Dice")>0)
{
	if(document.body.innerHTML.search("reached the limit")>0)
	{
		if(GM_getValue("complete")=="0")
		{
			//alert("you hit the max points for the day")
		}
		waitTime = getPause();
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Click Ante';
		unsafeWindow.bilgeTimeout = window.setTimeout(FreePlay,waitTime)
		GM_setValue("complete","1")
	}
	else
	{
		waitTime = getPause();
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Click Ante';
		unsafeWindow.bilgeTimeout = window.setTimeout(ClickAnte,waitTime)
		GM_setValue("complete","0")
	}
}

//Actually playing and losing
if(document.body.innerHTML.search("Current Score")>0 && GM_getValue("winning")=="0")
{
	if(document.body.innerHTML.search("at least one")<0)
	{
		waitTime = getPause();
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Roll';
		unsafeWindow.bilgeTimeout = window.setTimeout(RollAgain,waitTime)
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
		else if(dice.length>3)
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
		//Just in case you get 1&4 again, it will select just one and carry on
		else
		{
			document.getElementsByTagName("input")[z].click()

		}
		
		waitTime = getPause(pause.multi.min,pause.multi.max);
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Keep';
		unsafeWindow.bilgeTimeout = window.setTimeout(KeepButton,waitTime)		
	}
}

//Actually playing & winning
if(document.body.innerHTML.search("Current Score")>0 && GM_getValue("winning")=="1")
{
	if(document.body.innerHTML.search("at least one")<0)
	{
		waitTime = getPause();
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Roll';
		unsafeWindow.bilgeTimeout = window.setTimeout(RollAgain,waitTime)
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
				y=0
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
		waitTime = getPause();
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Keep';
		unsafeWindow.bilgeTimeout = window.setTimeout(KeepButton,waitTime)
	}
}

//Various continuances
if(document.body.innerHTML.search("You have managed a score of")>0)
{
	waitTime = getPause();
	unsafeWindow.bilgeTimeout = window.setTimeout(SeeIfYouDefeated,waitTime)
}

if(document.body.innerHTML.search("Scored a")>0 || document.body.innerHTML.search("You were unable to get the 1")>0)
{
	waitTime = getPause();
		document.getElementById('bilgeAPStatus').innerHTML += '<br>Will Click "Play Again"';
	unsafeWindow.bilgeTimeout = window.setTimeout(PlayAgain,waitTime)
}