// ==UserScript==
// @name           world-war helper
// @namespace      Ajay
// @include        http://wwar.storm8.com/*
// ==/UserScript==


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

var autobank      = GM_getValue("autobank", false);
var autobuildInc  = GM_getValue("income",false);
var autobuildDef  = GM_getValue("defense",false);
var sanction      = GM_getValue("sanction", false);
var sanctionLevel = GM_getValue("sanctionLevel",1);

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";
var ichecked = "";
var dchecked = "";
var schecked = "";
if (autobank)
	bchecked = " checked";
if (autobuildInc)
	ichecked = " checked";
if (autobuildDef)
	dchecked = " checked";
if (sanction)
	schecked = " checked";
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" /> Autobanking<br>\
<input type=\"checkbox\" id=\"autobuildInc\" "+ichecked+" /> Autobuild Income<br>\
<input type=\"checkbox\" id=\"autobuildDef\" "+dchecked+" /> Autobuild Defensive<br>\
<input type=\"checkbox\" id=\"sanction\" "+schecked+" /> Autokill sanctions below level <input type=\"text\" style=\"border: 1px solid green; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"sanctionlevel\" value=\""+sanctionLevel+"\" />\
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
		
	// autosanction
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
						var nret = parseInt(returns.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML.split(">")[1].replace(/,/g,''));
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

// sanctions
if (page == "hitlist")
{
	if (GM_getValue("sanction",false))
	{
		var people = document.getElementsByClassName("fightTable");
		var found = false;
		for (i in people)
		{
			var fields = people[i].getElementsByTagName("td");
			var level = parseInt(fields[1].getElementsByTagName("div")[1].innerHTML.substr(6));
			var country = fields[0].getElementsByTagName("img")[0].src.split("/")[6].substr(0,1);

			if (level < GM_getValue("sanctionLevel",1) && country != sanctionCountry)
			{
				var attack = fields[5].getElementsByTagName("a")[0].href;
				found = true;
				document.location = attack;
			}
		}
		if (!found)
			document.location = 'http://wwar.storm8.com/hitlist.php';
//			setTimeout("document.location = 'http://wwar.storm8.com/hitlist.php'", Math.floor(Math.random() * 40)*90);
	}
}

autobuild();

setInterval(bankIt, 30*1000);
setInterval(autobuild, 30*1000);
setInterval(checkOptions, 1000);