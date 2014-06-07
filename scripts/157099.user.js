// ==UserScript==
// @name           Citizin Alerter
// @namespace      ikariam.feanturi.nl
// @description    Alerts you if your city is full with citizens
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
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
*	Returns the max number of citizens for given townhall level. 
*/
window.getMaxCitizens = function(lvl)
{
	var townhall = new Array();
	townhall[1]  = 60;
	townhall[2]  = 96;
	townhall[3]  = 143;
	townhall[4]  = 200;
	townhall[5]  = 263;
	townhall[6]  = 333;
	townhall[7]  = 410;
	townhall[8]  = 492;
	townhall[9]  = 580;
	townhall[10] = 672;
	townhall[11] = 769;
	townhall[12] = 871;
	townhall[13] = 977;
	townhall[14] = 1087;
	townhall[15] = 1201;
	townhall[16] = 1320;
	townhall[17] = 1441;
	townhall[18] = 1567;
	townhall[19] = 1696;
	townhall[20] = 1828;
	townhall[21] = 1964;
	townhall[22] = 2103;
	townhall[23] = 2246;
	townhall[24] = 2391;

	return townhall[lvl];
} 

window.addEventListener('load',  function() 
{ 
try
{
	var city = document.getElementById('citySelect')[document.getElementById('citySelect').selectedIndex].innerHTML.substring(1);
	var title = document.title.split(' ');
	var server = title[title.length-1];
	// Check if the city page is loaded, chech if this city is the capital and store the townhall level
	if (document.getElementById('city') != null)
	{
		var positions = document.getElementById('locations');	
		for (var i = 0; i < positions.childNodes.length; i++)
		{
			if (positions.childNodes[i].className == "palace")
			{
				GM_setValue(server+'_ca_capital',city);
			}
			if (positions.childNodes[i].className == "townHall")
			{
				GM_setValue(server+'_ca_'+city+'_townHall_lvl', parseInt(positions.childNodes[i].childNodes[3].title.split(" ")[3]));
			}
		}
	}
	
	// Get the stored info
	var capital = (city == GM_getValue(server+'_ca_capital'));
	var townHall_lvl = GM_getValue(server+'_ca_'+city+'_townHall_lvl',1);
	var wellDigging = GM_getValue(server+'_research_wellDigging', true);
	var holiday = GM_getValue(server+'_research_holiday',false);
	var utopia = GM_getValue(server+'_research_utopia', false);
	
	var max_citizen = getMaxCitizens(townHall_lvl);
	if (capital)	
	{
		if (wellDigging)
			max_citizen += 50;
		if (utopia)
			max_citizen += 200;
	}
	if (holiday)
		max_citizen += 50;
	var cur_citizen = toInt(document.getElementById('value_inhabitants').innerHTML.split('(')[1]);
	
	// Color the numbr of citizens
	var param = GM_getValue(server+'_ca_param',90);
	if (GM_getValue(server+'_ca_method',1) == 1)
	{
		if ( (cur_citizen/max_citizen) > param/100 )
			document.getElementById('value_inhabitants').style.color = 'firebrick';
	}
	else
	{
		if ( (max_citizen-cur_citizen) <= param )
			document.getElementById('value_inhabitants').style.color = 'firebrick';
	}
	
	if ( cur_citizen == max_citizen )
	{
		if (GM_getValue(server+'_ca_method',false));
			alert("Warning, your city is full and can't take more citizens!");
		document.getElementById('value_inhabitants').style.fontWeight = 'bold';
	}
		
	// Add options menu
	if (document.getElementById('options') != null)
	{
		var allElements = document.getElementsByTagName('form');

		for (var i = 0; i < allElements.length; i++)
		{
		    var thisElement = allElements[i];
			if (thisElement.elements[0].value == 'Options')
			{
				var wellDigging,holiday, utopia,param,percentage,fixed,message;
				
				if (GM_getValue(server+'_research_wellDigging',true))
					wellDigging = "checked='checked'";
				if (GM_getValue(server+'_research_holiday',false))
					holiday = "checked='checked'";
				if (GM_getValue(server+'_research_utopia',false))
					utopia = "checked='checked'";
				param = GM_getValue(server+'_ca_param',90);
				if (GM_getValue(server+'_ca_method',1) == 1)
					percentage = "checked='checked'";
				else
					fixed = "checked='checked'"; 
				if (GM_getValue(server+'_ca_message',false))
					message =  "checked='checked'"; 

				var div;
				div = document.createElement('div');
				div.innerHTML = 
					"<div id='citizin alerter'>"+
						"<h3>Citizin alerter V0.1.0</h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Researches</i></td>"+
							"</tr>"+	
							"<tr>"+
					            "<th>Well Digging</th>"+
								"<td>"+
									"<input id='ca_wellDigging'  type='checkbox' name='wellDigging' "+wellDigging+" />"+
								"</td>"+
					        "</tr>"+
							"<tr>"+
								"<th>Holiday</th>"+
								"<td>"+
									"<input id='ca_holiday'  type='checkbox' name='holiday' "+holiday+" />"+
								"</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Utopia</th>"+
								"<td>"+
									"<input id='ca_utopia'  type='checkbox' name='utopia' "+utopia+" />"+
								"</td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Parameters<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th><input id='ca_param' type='textfield' class='textfield' name='ca_param' size='10' value="+param+" /></th>"+
								"<td>"+
									"<input id='ca_percentage' type='radio' class='radio' name='ca_method' value='1' "+percentage+" />Percentage<br />"+
									"<input id='ca_fixed' type='radio' class='radio' name='ca_method' value='2' "+fixed+" /> Fixed<br />"+
								"</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Give alert message:"+
								"<td>"+
									"<input id='ca_message' type='checkbox' class='radio' name='ca_message'"+ message+" />"+
								"</td>"+
							"</tr>"+
				        "</table>"+
				    "</div>";
				
				thisElement.insertBefore(div, document.getElementById('options_debug'));
	            
	            document.getElementById('ca_wellDigging').addEventListener('change',function(event)
				{
					if (!document.getElementById('ca_holiday').checked)
						GM_setValue(server+'_research_wellDigging', document.getElementById('ca_wellDigging').checked);
					else
						document.getElementById('ca_wellDigging').checked = true;
				},true);
				document.getElementById('ca_holiday').addEventListener('change',function(event)
				{
					if (!document.getElementById('ca_utopia').checked)
					{
						GM_setValue(server+'_research_holiday', document.getElementById('ca_holiday').checked);
						if (document.getElementById('ca_holiday').checked)
						{
							GM_setValue(server+'_research_wellDigging',true);
							document.getElementById('ca_wellDigging').checked = true;
						}
					}
					else
						document.getElementById('ca_holiday').checked = true;
				},true);
				document.getElementById('ca_utopia').addEventListener('change',function(event)
				{
					GM_setValue(server+'_research_utopia', document.getElementById('ca_utopia').checked);
					if (document.getElementById('ca_utopia').checked)
					{
						GM_setValue(server+'_research_wellDigging',true);
						document.getElementById('ca_wellDigging').checked = true;
						GM_setValue(server+'_research_holiday',true);
						document.getElementById('ca_holiday').checked = true;
					}
				},true);
				document.getElementById('ca_percentage').addEventListener('change',function(event)
				{
					GM_setValue(server+'_ca_param', 90);
					document.getElementById('ca_param').value = 90;
					GM_setValue(server+'_ca_method', 1);
				},true);
				document.getElementById('ca_fixed').addEventListener('change',function(event)
				{
					GM_setValue(server+'_ca_param', 50);
					document.getElementById('ca_param').value = 50;
					GM_setValue(server+'_ca_method', 2);
				},true);
				document.getElementById('ca_param').addEventListener('change',function(event)
				{
					GM_setValue(server+'_ca_param', document.getElementById('ca_param').value);
				},true);
				document.getElementById('ca_message').addEventListener('change',function(event)
				{
					GM_setValue(server+'_ca_message', document.getElementById('ca_message').checked);
				},true);
			}
		}
	}
}
catch(er){alert(er)}
},
    true);