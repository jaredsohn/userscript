// ==UserScript==
// @name           	Leecher Checker v2.3
// @namespace      http://ikariam.feanturi.nl
// @description    A script for Ikariam that colors leechers & shows percentage
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

function fmtNumber(n) {
  n += "";
  for (var i = n.length - 3; i > 0; i -= 3)
    n = n.slice(0, i) +","+ n.slice(i);
  return n;
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
				//donationList.rows[j+j2].title = parseInt(percentage, 10);
				szzlkTmp =  "" + parseInt(percentage, 10) + "";
				szzlk = ( szzlkTmp == "NaN" ) ? percentage : parseInt(percentage, 10);
				donationList.rows[j+j2].cells[2].innerHTML += "<br/><small> ( " + szzlk +"% )</small>";
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
