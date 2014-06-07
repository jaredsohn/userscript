// ==UserScript==
// @name           uk
// @namespace      Oliver
// @include        http://wwar.storm8.com/*
// ==/UserScript==
//Hello. I need allies. Could you please add HDGF98. Thanks.


/*
 *  Set this value to your country's number
 *  1 = Germany
 *  2 = UK
 *  3 = USA
 *  4 = China
 *  5 = That other country
 */
var sanctionCountry = 2;

// Don't edit anything var below this line
//----------------------------------------

/* for compatibility with Google Chrome */
/* http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/ */
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

var autobank      = GM_getValue("autobank", false);
var autobuildInc  = GM_getValue("income",false);
var autobuildDef  = GM_getValue("defense",false);
var autoheal      = GM_getValue("autoHeal", false);
var healthLimit   = parseInt(GM_getValue("healthLimit",28));
var healthTimer   = parseInt(GM_getValue("healthTimer", 10));
var healing       = GM_getValue("healing", false);
var currentPage   = GM_getValue("currentPage", "home.php");
var sanction      = GM_getValue("sanction", false);
var sanctionLevel = GM_getValue("sanctionLevel",1);
var sanctionAmmo  = GM_getValue("sanctionAmmo",1);
var autosancNum   = GM_getValue("autosancNum",0);
var resanc        = GM_getValue("resanc",false);

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";
var ichecked = "";
var dchecked = "";
var hchecked = "";
var schecked = "";
var achecked = "";
if (autobank)
	bchecked = " checked";
if (autobuildInc)
	ichecked = " checked";
if (autobuildDef)
	dchecked = " checked";
if (autoheal)
	hchecked = " checked";
if (sanction)
	schecked = " checked";
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" /> Autobanking<br>\
<input type=\"checkbox\" id=\"autobuildInc\" "+ichecked+" /> Autobuild Income<br>\
<input type=\"checkbox\" id=\"autobuildDef\" "+dchecked+" /> Autobuild Defensive<br>\
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> Autoheal when health is below <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /> and verify every <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"healthtimer\" value=\""+healthTimer+"\" /> minutes<br>\
<input type=\"checkbox\" id=\"sanction\" "+schecked+" /> Autokill sanctions below level <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"sanctionlevel\" value=\""+sanctionLevel+"\" /> when ammo is at least <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"sanctionammo\" value=\""+sanctionAmmo+"\" /><br>\
Autosanc player <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"autosancNum\" value=\""+autosancNum+"\" /> times.\
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
	
	// autobuilding
	if (document.getElementById('autobuildDef').checked)
		GM_setValue("defense",true);
	else
		GM_setValue("defense",false);
	if (document.getElementById('autobuildInc').checked)
		GM_setValue("income",true);
	else
		GM_setValue("income",false);
	
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
		
	// autokill sanction
	if (document.getElementById('sanction').checked)
		GM_setValue("sanction",true);
	else
		GM_setValue("sanction",false);
	var oldsanc = sanctionLevel;
	var newsanc = document.getElementById('sanctionlevel').value;
	if (oldsanc != newsanc)
	{
		sanctionLevel = newsanc;
		GM_setValue("sanctionLevel",parseInt(sanctionLevel));
	}
	var oldammo = sanctionAmmo;
	var newammo = document.getElementById('sanctionammo').value;
	if (oldammo != newammo)
	{
		sanctionAmmo = newammo;
		GM_setValue("sanctionAmmo",parseInt(sanctionAmmo));
	}
	
	// autosanc
	var oldNum = autosancNum;
	var newNum = document.getElementById('autosancNum').value;
	if (oldNum != newNum)
	{
		autosancNum = newNum;
		GM_setValue("autosancNum",parseInt(autosancNum));
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
		var cp = "http://wwar.storm8.com/"+page+".php";
		GM_setValue('currentPage', cp);
	}
	
	// check current health
	if (parseInt(document.getElementById('healthCurrent').innerHTML) < healthLimit)
	{
		
		if (page != "hospital")
			document.location = "http://wwar.storm8.com/hospital.php";
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

// autobuilding
function autobuild()
{
	if (page == "investment")
	{
		var def = GM_getValue("defense",false);
		var inc = GM_getValue("income",false);
		if (def || inc)
		{
			var links  = new Array();
			var prices = new Array();
			var ratios = new Array();
			var names  = new Array();
			var buildings = document.getElementsByClassName("reTable");
			for (var i=0; i < buildings.length; i++)
			{
				var info = buildings[i].getElementsByClassName("reInfoItem");
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

			var cash = getCash();
			var need = prices[minIndex] - cash;
			var rate = parseInt(document.getElementById('cashTimerDiv').getElementsByTagName('span')[0].getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerHTML.replace(/,/g,''));
			
			document.getElementById('wwfixernextbuilding').innerHTML = '<font color="#00ff00"><small><b>Next building: '+names[minIndex]+', need <img src="http://static.storm8.com/wwar/images/money.png?v=140">'+fixNum(need)+'</b> - '+Math.ceil(need / rate)+'h</small></font>';
		
			if (cash >= prices[minIndex])
				document.location = links[minIndex];
			
		}
	}
}

// autokill sanctions
if (page == "hitlist")
{
	if (GM_getValue("sanction",false))
		attackSanc();
}
function attackSanc(noReattack)
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
		// wait to receive sanctionAmmo ammo
		sanctionAmmo = Math.max(1, sanctionAmmo);
		seconds = seconds + 100 * (sanctionAmmo - 1);
		setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", Math.floor(1000*seconds));
		return;
	}

	// check for re-attack
	if (noReattack == null)
	{
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
		var country = fields[0].getElementsByTagName("img")[0].src.split("/")[6].substr(0,1);

		if (level == GM_getValue("sanctionLevel",1) && country == sanctionCountry)
		{
			var link = fields[5].getElementsByTagName("a")[0];
			click(link);
			found = true;
			break;
		}
	}
	if (!found)
		document.location = 'http://wwar.storm8.com/hitlist.php';
		//setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", Math.floor(Math.random() * 40)*90);
		//setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", 2000);

}

if (resanc)
{
	if (page == "hitlist")
	{
		
		document.location = 'http://wwar.storm8.com/home.php';
	}
	if (page == "home")
	{
		// settimeout because the links load with JS
		setTimeout(resanc_home, 1000);
	}
	if (page == "profile")
	{
		var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
		click (buttons[buttons.length - 1]);
		
			
	}
	
}
function resanc_home()
{
	var a = document.getElementsByTagName('a');
	var found = false;
	for (i=0; i<a.length; i++)
	{
		if (a[i].innerHTML == resanc)
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
		GM_setValue('resanc', false);
	}
	else
	{
		document.location = a[i];
	}
}
// autosanction
if (page == "bounty")
{
	GM_setValue("resanc",false);
	var form = document.getElementById('bountyForm');
	var minpay = parseInt(form.getElementsByTagName('span')[0].childNodes[1].nodeValue.replace(/,/g,''));
	var target = document.getElementsByClassName('sectionHeader')[0].innerHTML.split('"')[1];
	form.getElementsByTagName('input')[0].value = minpay;
	if (autosancNum > 0)
	{
		GM_setValue('resanc',target);
		GM_setValue('autosancNum',autosancNum - 1);
		// see if we've just failed to sanc him
		var n = 0;
		var fails = document.getElementsByClassName('messageBoxFail');
		if (fails.length > 0)
		{
			GM_setValue('autosancNum', autosancNum);
			if (fails[0].innerHTML.length == 114 + resanc.length)
			{
				// too many sancs for today
				GM_setValue('resanc', false);
				return;
			}
			n = 3000;
		}
		setTimeout(click_sanc, n);
	}
}
function click_sanc()
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

autobuild();

setInterval(bankIt, 30*1000);
setInterval(autobuild, 30*1000);
setInterval(checkOptions,  1000);