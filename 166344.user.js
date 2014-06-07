// ==UserScript==
// @name           imob-auto
// @namespace      ChillyWilly187
// @include        http://im.storm8.com/*
// ==/UserScript==


var autobank      = GM_getValue("autobank", false);
var autoheal      = GM_getValue("autoHeal", false);
var healthLimit   = parseInt(GM_getValue("healthLimit",28));
var healthTimer   = parseInt(GM_getValue("healthTimer", 1));
var healing       = GM_getValue("healing", false);
var currentPage   = GM_getValue("currentPage", "home.php");
var autolistNum   = GM_getValue("autolistNum",0);
var amount   = parseInt(GM_getValue("amount",10000));
var relist        = GM_getValue("relist",false);

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";
var hchecked = "";
var achecked = "";
if (autobank)
	bchecked = " checked";
if (autoheal)
	hchecked = " checked";

menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" /> Auto Bank<br>\
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> Auto Heal when health is below <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /> and check every <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"healthtimer\" value=\""+healthTimer+"\" /> minutes<br>\
Auto list player <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"autolistNum\" value=\""+autolistNum+"\" /> times for <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #FA5858; background: black; text-align: center;\" id=\"amount\" value=\""+amount+"\" /> bounty<br>\
    \
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
		var cp = "http://im.storm8.com/"+page+".php";
		GM_setValue('currentPage', cp);
	}
	
	// check current health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) < healthLimit)
	{
		
		if (page != "hospital")
			document.location = "http://im.storm8.com/hospital.php";
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


if (relist)
{
	if (page == "hitlist")
	{
		
		document.location = 'http://im.storm8.com/home.php';
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
			n = 4500;
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
