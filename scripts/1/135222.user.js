// ==UserScript==
// @name           Auto_WW_Bank
// @namespace      Oliver
// @include        http://wwar.storm8.com/*
// ==/UserScript==


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

var autobank      = GM_getValue("autobank",true);
var buildfinish   = GM_getValue("buildfinish",false);
var cashavailable = GM_getValue("cashavailable",false);
var currentPage   = GM_getValue("currentPage", "home.php");

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";
if (autobank)
	bchecked = " checked";
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" /> Autobanking<br>\
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
	// if (page == "bank")
	var cash = getCash();
	if (cash > 0)
		GM_setValue("cashavailable",true);
	else
		GM_setValue("cashavailable",false);
	if ((GM_getValue("autobank",false)) && (GM_getValue("buildfinish",false))  && (GM_getValue("cashavailable",false)))
	{
		postwith("bank.php", {depositAmount:cash, action:'Deposit'});
		GM_setValue("buildfinish",false);
		GM_setValue("cashavailable",false);
	}
	if (GM_getValue("cashavailable",false))
	{
                document.location = "investment.php";                 
	}
}

// autobuilding
function autobuild()
{
	if (page == "investment")
	{
		var def = GM_getValue("defense",true);
		var inc = GM_getValue("income",true);
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
		
			if ((cash >= prices[minIndex]) || (GM_getValue("cashavailable",false)))
                                {
				document.location = links[minIndex];
				GM_setValue("buildfinish",false);
				GM_setValue("cashavailable",false);
                                }
			else
				{
                                GM_setValue("buildfinish",true);
	                        // document.location = links[4];
                                }
		}
	}
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
setInterval(autobuild, 20*1000);
setInterval(checkOptions,  1000);