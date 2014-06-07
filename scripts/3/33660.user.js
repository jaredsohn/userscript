//-----------------------------------------------------------SHOUTBOX-------------------------------------------------------



// ==UserScript==
// @name           ATENAS 2
// @description    para alianza atenas, incluye cazaparásitos de minas y el ally sorter sin puntuaciones
// @include        http://s*.ikariam.*/*
// ==/UserScript==

//-------------------------------------------------------------CAZAPARASITOS--------------------------------------------------

// ==UserScript==
// @name           Cazaparasitos de minas
// @namespace      http://ikariam.feanturi.nl
// @description    Anadido link al signif de los colores. indica segun color al parasito.
// @include       	 http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

/**
*	Parses a string of format 123,456 to an int in format 123456
*/
function toInt(string)
{
	var temp,result;
	temp = string.split(',');
	result = '';
	for(var i=0; i < temp.length; i++)
	{
		result += temp[i];
	}
	return parseInt(result);
}
/**
*	Depending on how well a person donates, he gets a color:
*	0-90		Leecher, color is red
*	90-100	Sort of leecher, color is blue
*	100-110	Donates enough, color is orange
*	110 - ??	Good donater, coller is green
*/
function getLeecherStatus(percentage)
{
	if (percentage > 110)
		return 'green';
	if (percentage >= 100)
		return 'orange';
	if (percentage >= 90)
		return 'blue';
	if (percentage == undefined) //error value
		return 'black';
	return 'red';
}

window.addEventListener('load',  function() 
{ 
try
{
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;
	
	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{
		// get the donation list
		var donationList = document.getElementById('mainview');
		if (document.getElementById('mainview').childNodes[5]) {
			donationList = document.getElementById('mainview').childNodes[5].childNodes[1];
		} else {
			donationList = document.getElementById('mainview').childNodes[3].childNodes[1];
		}
		
		
		var name, playerName, donated, lvl, workers, percentage, param, method;
		
		// Depending on the type of resource, get the right variables
		if (page == 'resource') 
		{
			method = GM_getValue("method_building",1);
			param = GM_getValue("param_building",15);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 30,       0,       0);
			workplace[2]  = new Array( 40,     350,     350);
			workplace[3]  = new Array( 52,     590,     940);
			workplace[4]  = new Array( 66,    1010,    1950);
			workplace[5]  = new Array( 81,    1810,    3760);
			workplace[6]  = new Array( 98,    3010,    6770);
			workplace[7]  = new Array(114,    4810,   11580);
			workplace[8]  = new Array(134,    7060,   18640);
			workplace[9]  = new Array(154,   10060,   28700);
			workplace[10] = new Array(175,   13910,   42610);
			workplace[11] = new Array(196,   18410,   61020);
			workplace[12] = new Array(219,   25010,   86030);
			workplace[13] = new Array(242,   32160,  118190);
			workplace[14] = new Array(265,   41160,  159350);
			workplace[15] = new Array(290,   52560,  211910);
			workplace[16] = new Array(315,   67510,  279420);
			workplace[17] = new Array(341,   85060,  364480);
			workplace[18] = new Array(367,  105210,  469690);
			workplace[19] = new Array(394,  127960,  597650);
			workplace[20] = new Array(422,  155960,  753610);
			workplace[21] = new Array(450,  197960,  951570);
			workplace[22] = new Array(479,  791840, 1743410);
			workplace[23] = new Array(-1, 1583680, 3327090);
		}
		else
		{
			method = GM_getValue("method_luxury",1);
			param = GM_getValue("param_luxury",15);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 20,       0,       0);
			workplace[2]  = new Array( 33,     550,     550);
			workplace[3]  = new Array( 49,    1110,    1660);
			workplace[4]  = new Array( 68,    2440,    4100);
			workplace[5]  = new Array( 88,    4540,    8640);
			workplace[6]  = new Array(110,    7620,   16260);
			workplace[7]  = new Array(134,   12660,   28920);
			workplace[8]  = new Array(159,   19660,   48580);
			workplace[9]  = new Array(185,   28760,   77340);
			workplace[10] = new Array(213,   40520,  117860);
			workplace[11] = new Array(242,   54730,  172590);
			workplace[12] = new Array(271,   72420,  245010);
			workplace[13] = new Array(302,   95050,  340060);
			workplace[14] = new Array(334,  122250,	462310);
			workplace[15] = new Array(367,  157560,  619870);
			workplace[16] = new Array(400,  203760,  823630);
			workplace[17] = new Array(434,  815040, 1638670);
			workplace[18] = new Array(-1,  1630080, 3268750);
		}
		
		for (var j = 1; j < donationList.rows.length; j+=cities)
		{
			// Name | Player name | Donated | Level | Number of workers | Actions
			name = donationList.rows[j].cells[0].innerHTML;
			playerName = donationList.rows[j].cells[1].innerHTML;
			donated = toInt(donationList.rows[j].cells[2].innerHTML);
			lvl = donationList.rows[j].cells[3].innerHTML.split(' ')[1];
			workers = donationList.rows[j].cells[4].innerHTML.split(' ')[0];
			
			// Check how many cities this player has
			var j2 = j;
			var cum_city_lvl = 0;
			while ( (j2 < donationList.rows.length) && (playerName == donationList.rows[j2].cells[1].innerHTML) )
			{
				j2++;
				cum_city_lvl += toInt(donationList.rows[j2-1].cells[3].innerHTML.split(' ')[1]);
			}
			cities = j2-j;

			if (method == 1) //Breafuios
			{	
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < 19; workers_lvl++)
				{
					if (workers <= 1.5 * workplace[workers_lvl][0])
						break;
				}
				percentage = (donated / (workplace[workers_lvl][2]*param/100)) * 100;
			}
			else if (method == 2) // Thousand rule
			{
				percentage = (donated / cum_city_lvl) / param * 100;
			}
			else // Chadoios
			{
				// Check which level the deposit is
				var lvl = document.body.childNodes[4].childNodes[1].childNodes[17].childNodes[3].childNodes[3].innerHTML.split("</span>")[1];
				
				if (lvl == undefined) // Deposit is upgrading
					lvl = document.body.childNodes[4].childNodes[1].childNodes[17].childNodes[3].childNodes[5].innerHTML.split("</span>")[1];
				
				lvl = parseInt(lvl);
				percentage = ((donated/cities) / (workplace[lvl+1][2]*param/100)) * 100;
			}
			
			for (j2 = 0; j2 < cities; j2++)
			{
				donationList.rows[j+j2].style.color = getLeecherStatus(percentage);
			}
		}

	}
	
	// Add options menu
	if (page == 'options')
	{
		var allElements = document.getElementsByTagName('form');

		for (var i = 0; i < allElements.length; i++)
		{
		    var thisElement = allElements[i];
			if (thisElement.elements[0].value == 'Options')
			{
				var breafious_building, thousand_building, chadoios_building, breafious_luxury,thousand_luxury, chadoios_luxury;
				var method_building = GM_getValue('method_building','1');
				var param_building 	= GM_getValue('param_building','15');
				var method_luxury 	= GM_getValue('method_luxury','1');
				var param_luxury 	= GM_getValue('param_luxury','15');

				if (method_building == 1)
					breafious_building = "checked='checked'";
				if (method_building == 2)
					thousand_building =  "checked='checked'";
				if (method_building == 3)
					chadoios_building =  "checked='checked'";
				if (method_luxury == 1)
					breafious_luxury = "checked='checked'";
				if (method_luxury == 2)
					thousand_luxury =  "checked='checked'";
				if (method_luxury == 2)
					chadoios_luxury =  "checked='checked'";
				var div;
				div = document.createElement('div');
				div.innerHTML = 
					"<div id='leecher_checker'>"+
						"<h3>Leecher Checker v1.2.1 options</h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Building Material</i></td>"+
							"</tr>"+	
							"<tr>"+
									"<th>Method:</th>"+
								"<td>"+
									"<input id='radio_1'  type='radio' class='radio' name='method_building' value='1' "+breafious_building+"/> Breafious<br />"+
									"<input id='radio_2'  type='radio' class='radio' name='method_building' value='2' "+thousand_building+" /> Thousand rule<br />"+
									"<input id='radio_3'  type='radio' class='radio' name='method_building' value='3' "+chadoios_building+" /> Chadoios"+
								"</td>"+
					        "</tr>"+
							"<tr>"+
								"<th>Param:</th>"+
								"<td><input id='text_1' type='textfield' class='textfield' name='param_building' size='10' value="+param_building+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Luxury Resource<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Method:</th>"+
								"<td>"+
									"<input id='radio_4' type='radio' class='radio' name='method_luxury' value='1' "+breafious_luxury+"/> Breafious<br />"+
									"<input id='radio_5' type='radio' class='radio' name='method_luxury' value='2' "+thousand_luxury+" /> Thousand rule<br />"+
									"<input id='radio_6'  type='radio' class='radio' name='method_luxury' value='3' "+chadoios_building+" /> Chadoios"+
								"</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Param:</th>"+
								"<td><input id='text_2' type='textfield' class='textfield' name='param_luxury' size='10' value="+param_luxury+" /></td>"+
							"</tr>"+
				        "</table>"+
				    "</div>";
				
				thisElement.insertBefore(div, document.getElementById('options_debug'));
	            
							document.getElementById('radio_1').addEventListener('change',function(event){GM_setValue('method_building','1');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_2').addEventListener('change',function(event){GM_setValue('method_building','2');document.getElementById('text_1').value='1000';GM_setValue('param_building','1000')},true);
				document.getElementById('radio_3').addEventListener('change',function(event){GM_setValue('method_building','3');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_4').addEventListener('change',function(event){GM_setValue('method_luxury','1');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('radio_5').addEventListener('change',function(event){GM_setValue('method_luxury','2');document.getElementById('text_2').value='1000';GM_setValue('param_luxury','1000')},true);
				document.getElementById('radio_6').addEventListener('change',function(event){GM_setValue('method_luxury','3');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('text_1').addEventListener('change',function(event){GM_setValue('param_building',document.getElementById('text_1').value)},true);
	            document.getElementById('text_2').addEventListener('change',function(event){GM_setValue('param_luxury',document.getElementById('text_2').value)},true);
			}
		}
	}
}
catch(er)
				{alert(er)}
},
    true);


//-----------------------------------------------------

// ==UserScript==
// @name           ATENAS
// @namespace      ikatips
// @description    Herraminetas para la alianza 
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por ALEX para ALIANZAS COA -
// @version        20080619 120713 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';
//esta caracterÃ­stica es casi estÃ¡ndar, utilizado en muchos scripts de Greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>COLOR MINA</h2>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://img135.imageshack.us/img135/6504/dibujosw2.png" title=" Colores minas " align="left">&nbsp;colores minas</a></li>'
+ '     <li><a target="_blank" href="http://lacoalicion.foroactivo.com.es/radiotelevision-y-pagexterna-de-la-alianza-f7/radio-la-coalicion-t36.htm" title=" Radio " align="left">&nbsp;Radio</a></li>'
+ '     <li><a target="_blank" href="http://alianzaatenas.creatuforo.com/portal.php" title=" ATENAS " align="left">&nbsp;atenas</a></li>'
+'</ul>'
+'</DIV>';

'<div id="menu">'
+ '<ul>'
+ ' <li><h3>FORO ATENAS</h3>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://alianzaatenas.creatuforo.com/portal.php" title="foro atenas" align="left">&nbsp;foro atenas</a></li>'

+'</DIV>';break;
}}}

addIKOS_ToolsMenu();






//--------------------------------------------------------------PUNTUACIONES ALIANZA-----------------------------------------------


// JavaScript Document
// ==UserScript==
// @name           Ikariam Ally Sorter
// @autor          Oberon
// @email          damn_it@tiscali.it
// @namespace      Ikariam
// @description    A little script that sorts the Ikariam Ally Members by score
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


function getPos(row) {
	// Return the score value
	return parseInt(row.cells[4].innerHTML.replace(/,/,""));
}

function sortAlly() {
	// Sort the ally table
	var table, i, rows, min, max, newRow, newCell;
	table = document.getElementById('memberList');

	max = table.rows.length;
	for (i=0; i<max -1; i++)
    {
		// Select the minimum row score
	  min = findMin(i, table);
      newRow = table.insertRow(1);
	  if ( i % 2 == 1) {
		newRow.setAttribute('class', 'alt');
	  }
      for (c=0; c<7 /* -- */; c++)	  
        {
			// Copy the row to the top of the table
		  newCell = newRow.insertCell(c);
		  newCell.setAttribute('class', table.rows[findMin(i+2, table)].cells[c].getAttribute('class'));
		  newCell.innerHTML = table.rows[findMin(i+2, table)].cells[c].innerHTML;
		}
	  // Add position number	
	  newRow.cells[0].innerHTML=(max-i-1)+".";			
	  table.deleteRow(findMin(i+2, table));	
    }	
}

function findMin(index, sTable) {
	// Finds the minimum value for remaining rows
  var pos, currentMin;
  currentMin = index;
  for (i = index; i < sTable.rows.length; i++) {
  	if ( getPos(sTable.rows[i]) < getPos(sTable.rows[currentMin]) )
		{
			currentMin=i;
		}
  }
  
  return currentMin;
}


// ++++++++++++++++ Start +++++++++++++++++
sortAlly();
// +++++++++++++++++ End ++++++++++++++++++