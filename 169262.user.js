
// ==UserScript==
// @name           auto kill
// @namespace      rot
// @include        http://rl.storm8.com/*
// ==/UserScript==


var autobank      = GM_getValue("autobank", false);
var autoheal      = GM_getValue("autoHeal", false);
var healthLimit   = parseInt(GM_getValue("healthLimit",28));
var healthTimer   = parseInt(GM_getValue("healthTimer", 1));
var healing       = GM_getValue("healing", false);
var currentPage   = GM_getValue("currentPage", "home.php");
var hitlist      = GM_getValue("hitlist", false);
var hitlistLevel = GM_getValue("hitlistLevel",1);
var hitlistAmmo  = GM_getValue("hitlistAmmo",1);
var autolistNum   = GM_getValue("autolistNum",0);
var amount   = parseInt(GM_getValue("amount",10000));
var relist        = GM_getValue("relist",false);

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";
var hchecked = "";
var schecked = "";
var achecked = "";
if (autobank)
	bchecked = " checked";
if (autoheal)
	hchecked = " checked";
if (hitlist)
	schecked = " checked";
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" /> Auto Bank<br>\
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> Heal when health is below <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /> and check every <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"healthtimer\" value=\""+healthTimer+"\" /> minutes<br>\
<input type=\"checkbox\" id=\"hitlist\" "+schecked+" /> Autokill players below level <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"hitlistlevel\" value=\""+hitlistLevel+"\" /> when stamina is at least <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"hitlistammo\" value=\""+hitlistAmmo+"\" /><br>\
Auto list player <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"autolistNum\" value=\""+autolistNum+"\" /> times for <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"amount\" value=\""+amount+"\" /> bounty<br>\
<div id=\"wwfixernextbuilding\" style=\"margin-top: 4px;\"></div>";

menu.style.padding = '10px';
var x = 1;
if (document.body.children[1].id == "wwhelpermenu")
	x = 2;
document.body.insertBefore(menu, document.body.children[x]);


var page = String(location).split('/')[3].split('.php')[0];


function postwith (to,p) {
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

function fixNum(n)
{
	n += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(n)) {
		n = n.replace(rgx, '$1' + ',' + '$2');
	}
	return n;
}

function checkOptions()
{
	// autobanking
	if (document.getElementById('autobank').checked)
		GM_setValue("autobank",true);
	else
		GM_setValue("autobank",false);
	
	// auto healing
	if (document.getElementById('autoheal').checked)
		GM_setValue("autoHeal", true);
	else
		GM_setValue("autoHeal", false);
	var oldhealth = healthLimit;
	var newhealth = document.getElementById('healthlimit').value;
	if (oldhealth != newhealth)
	{
		healthLimit = newhealth;
		GM_setValue("healthLimit",parseInt(healthLimit));
	}
	var oldtimer = healthTimer;
	var newtimer = document.getElementById('healthtimer').value;
	if (oldtimer != newtimer)
	{
		healthTimer = newtimer;
		GM_setValue("healthTimer",parseInt(newtimer));
	}
		
	// autokill hitlist
	if (document.getElementById('hitlist').checked)
		GM_setValue("hitlist",true);
	else
		GM_setValue("hitlist",false);
	var oldlist = hitlistLevel;
	var newlist = document.getElementById('hitlistlevel').value;
	if (oldlist != newlist)
	{
		hitlistLevel = newlist;
		GM_setValue("hitlistLevel",parseInt(hitlistLevel));
	}
	var oldammo = hitlistAmmo;
	var newammo = document.getElementById('hitlistammo').value;
	if (oldammo != newammo)
	{
		hitlistAmmo = newammo;
		GM_setValue("hitlistAmmo",parseInt(hitlistAmmo));
	}
	
	// autolist
	var oldNum = autolistNum;
	var newNum = document.getElementById('autolistNum').value;
	if (oldNum != newNum)
	{
		autolistNum = newNum;
		GM_setValue("autolistNum",parseInt(autolistNum));
	}
	var oldbounty = amount;
	var newbounty = document.getElementById('amount').value;
	if (oldbounty != newbounty)
	{
		amount = newbounty;
		GM_setValue("amount",parseInt(amount));
	}

}

// autohealing
if (autoheal)
{
	// set page refresh timer
	if (healthTimer > 0)
		setTimeout("document.location = document.location", healthTimer * 60 * 1000);
	
	// store current page
	if (page != 'hospital')
	{
		var cp = "http://rl.storm8.com/"+page+".php";
		GM_setValue('currentPage', cp);
	}
	
	// check current health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) < healthLimit)
	{
		
		if (page != "hospital")
			document.location = "http://rl.storm8.com/hospital.php";
		else
		{
			GM_setValue('healing', true);
			document.location = document.getElementsByClassName('healBtn')[0].getElementsByTagName('a')[0].href;
		}
	}
	else if (healing)
	{
		GM_setValue('healing', false);
		document.location = currentPage;
	}
	
}

function getCash()
{
	var cfield = document.getElementById('cashCurrent');
	var cash = 0;
	if (cfield.getElementsByTagName('a').length > 0)
		return parseInt(cfield.getElementsByTagName('a')[0].innerHTML.replace(/,/g,''));
	else
		return parseInt(cfield.innerHTML.replace(/,/g,''));
}

// autobanking
function bankIt()
{
	if (GM_getValue("autobank",false))
	{
		var cash = getCash();
		if (cash > 0)
			postwith("bank.php", {depositAmount:cash, action:'Deposit'});
	}

}


// autokill hitlists
if (page == "hitlist")
{
if (GM_getValue("hitlist",false)) //{ window.location.href= 'http://rl.storm8.com/hitlist.php'}
	attackList();
    }
   // window.location.href = 'http://rl.storm8.com/hitlist.php';
function attackList(noReattack)
{
	
	// check health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) <= 28)
		return;
	// check ammo
	if (document.getElementById('staminaCurrent').innerHTML == 0)
	{
		// defeat storm8 hacker checks by introducing random delay up to 5 seconds
		var delay = Math.random()*5;
		var time = document.getElementById('staminaType').innerHTML.split(':');
		var seconds = parseInt(time[0]) * 60 + parseInt(time[1]) + delay;	// add 2 seconds to the timer
		// wait to receive hitlistAmmo ammo
		hitlistAmmo = Math.max(1, hitlistAmmo);
		seconds = seconds + 100 * (hitlistAmmo - 1);
		setTimeout("document.location = 'http://rl.storm8.com/hitlist.php'", Math.floor(1000*seconds));
		return;
	}

	// check for re-attack
	if (noReattack == null)
	{
		if (page == "home")
			return;
		else
			var won   = document.getElementsByClassName('wonFight').length;
			var alive = document.getElementsByClassName('doAgainTxt');
			if (won && alive.length > 0)
			{
				var next = alive[0].getElementsByTagName('input')[0];
				click(next);
				return;
			}
	}
	
	// otherwise find a new person to attack
	var people = document.getElementsByClassName("fightTable");
	var found = false;
	for (i in people)
	{
		var fields = people[i].getElementsByTagName("td");
		var level = parseInt(fields[1].getElementsByTagName("div")[1].innerHTML.substr(6));
		

		if (level < GM_getValue("hitlistLevel",1))
		{
			var link = fields[5].getElementsByTagName("a")[0];
			click(link);
			found = true;
			break;
		}
	}
	if (!found)
		
		//window.location.href = 'http://rl.storm8.com/home.php';
		document.location = 'http://rl.storm8.com/hitlist.php';
		//setTimeout("document.location = 'http://im.storm8.com/hitlist.php'", Math.floor(Math.random() * 40)*90);
		//setTimeout("document.location = 'http://im.storm8.com/hitlist.php'", 2000);

}



if (relist)
{
	if (page == "hitlist")
	{
		
		document.location = 'http://rl.storm8.com/home.php';
	}
	if (page == "home")
	{
		// settimeout because the links load with JS
		setTimeout(relist_home, 1000);
	}
	if (page == "profile")
	{
		var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
		click (buttons[buttons.length - 1]);
		
			
	}
	
}
function relist_home()
{
	var a = document.getElementsByTagName('a');
	var found = false;
	for (i=0; i<a.length; i++)
	{
		if (a[i].innerHTML == relist)
		{
			found = true;
			break;
		}
		else
			console.log(a[i].innerHTML);
	}
	if (!found)
	{
		alert('link not found!');
		GM_setValue('relist', false);
	}
	else
	{
		document.location = a[i];
	}
}
// autohitlist
if (page == "bounty")
{
	GM_setValue("relist",false);
	var form = document.getElementById('bountyForm');
	var target = document.getElementsByClassName('sectionHeader')[0].innerHTML.split('"')[1];
	

	form.getElementsByTagName('input')[0].value = amount;
	if (autolistNum > 0)
	{
		GM_setValue('relist',target);
		GM_setValue('autolistNum',autolistNum - 1);
		// see if we've just failed to list him
		var n = 0;
		var fails = document.getElementsByClassName('messageBoxFail');
		if (fails.length > 0)
		{
			GM_setValue('autolistNum', autolistNum);
			if (fails[0].innerHTML.length == 114 + relist.length)
			{
				// too many lists for today
				GM_setValue('relist', false);
				return;
			}
			n = 3000;
		}
		setTimeout(click_list, n);
	}
}
function click_list()
{
	click(document.getElementById('bountyForm').getElementsByClassName('btnBroadcast')[0]);
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


setInterval(bankIt, 30*1000);
setInterval(checkOptions,  1000);