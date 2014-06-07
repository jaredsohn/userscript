// ==UserScript==
// @name           	Leecher Checker v 2.0.2HUN
// @namespace      http://ikariamlibrary.com/
// @description    sA script for Ikariam that colors leechers
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
function getLeecherStatus(donated,page)
{
	var lvl = getDepositLevel();
	var param = param = 1/document.getElementById('param').value;
	
	if (donated >= getDepositInfo(page, lvl+1)[2]*param)
		return "green";
	if (donated >= getDepositInfo(page, lvl)[2]*param)
		return "orange";
	return 'red';
}

/**
 *	Returns if this number is an even number
 */
function even(number)
{
	return (number % 2) == 0
}

/**
 *	Adds points to the number. so 100000 becomes 100.000
 */
function addPointsToNumber(number)
{
	var result = "";
	var temp;
	while (number/1000 > 1)
	{
		temp = Math.floor(number/1000);
		result = "." + (number - temp*1000) + result;
		number = temp;
	}
	return number + result;
}

/**
 *	Puts cities of one person in 1 row
 */
function groupPlayers(donationList,newList)
{
	for (var i=0; i < donationList.rows.length; i++)
	{
		var playerName = donationList.rows[i].cells[0].innerHTML;
		if (playerName != '&nbsp;') // City belongs to previous player
		{
			newList[newList.length] = donationList.rows[i].cloneNode(true);
		}
		else // Add data to previos row
		{
			for (var j=0; j < donationList.rows[i].cells.length; j++)
			{
				if (j != 5) // Add data to row, except for donated wood
					newList[newList.length-1].cells[j].innerHTML += "<br>" +  donationList.rows[i].cells[j].innerHTML;
			}
		}
	}
}

/**
 *	Returns the info of a certain level for the deposit
 */
function getDepositInfo(page, lvl)
{
	// Depending on the type of resource, get the right variables
	if (page == 'resource') //Wood
	{
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
	else // Luxury
	{
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
		workplace[18] = new Array(470, 1630080, 3268750);
		workplace[19] = new Array(-1,  3260160, 6528910);
	}
	return workplace[lvl];
}

/**
 *	Colors players in the donation list accroding to their leeching
 */
function doLeecherChecker(page)
{
		var donationList = document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0];

		newList = new Array();
		groupPlayers(donationList, newList);
		newList.sort(mySort);
		
		// empty donationList
		while (donationList.rows.length > 0)
		{
			donationList.deleteRow(0);
		}
		// Put the sorted and grouped list back
		for (var i = 0; i < newList.length; i+=1)
		{
			var newRow = donationList.insertRow(-1);
			newRow.innerHTML = newList[i].innerHTML;
			if (even(i))
				newRow.className = "alt avatar ";
			else
				newRow.className = "avatar ";
		}
		
		for (var j = 0; j < donationList.rows.length; j+=1)
		{
			var donated, cities;
			donated = toInt(donationList.rows[j].cells[4].innerHTML);
			cities = donationList.rows[j].cells[4].innerHTML.split('<br>').length;

			donationList.rows[j].style.color = getLeecherStatus(donated/cities, page);
		}
}

/**
 *	sort function, used for sorting the donation list
 */
function mySort(rowA, rowB)
{
	return toInt(rowA.cells[4].innerHTML) < toInt(rowB.cells[4].innerHTML);
}

/**
 *	Retruns the level of the deposit
 */
function getDepositLevel()
{
	// Check which level the deposit is
	var lvl = document.getElementById('resUpgrade').childNodes[3].childNodes[3].innerHTML.split("</span>")[1];
		
	if (lvl == undefined) // Deposit is upgrading
		lvl = document.getElementById('resUpgrade').childNodes[3].childNodes[5].innerHTML.split("</span>")[1];
			
	return parseInt(lvl);
}

/**
 *	Returns the ammount of cities on the island. won't work when the list is grouped with groupPlayers()
 */
function getCityNumber()
{
	return document.getElementById('resourceUsers').childNodes[3].getElementsByTagName("tbody")[0].rows.length;
}

/**
 *	Returns the leecher info text
 */
function getLeecherInfo(page)
{
	
	var cities;
	if (document.getElementById('param') != null)
		cities = document.getElementById('param').value;
	else
		cities = getCityNumber();
	
	var lvl = getDepositLevel();
	var wood = getDepositInfo(page, lvl)[2];
	var woodNext = getDepositInfo(page, lvl+1)[2];
	var percentage = 1/cities;
	var info =  "Ezen a szigeten " + cities + " akt&iacute;v v&aacute;ros van. Ez azt jelenti, hogy mindenkinek adom&aacute;nyoznia kell <b>"+ Math.round(10000/cities)/100 +"%-ot</b> <br />"+
		" " + lvl + ". szinten sz&uuml;ks&eacute;ges <b>"+addPointsToNumber(woodNext) +" fa</b> a k&ouml;vetkez&otilde; szint el&eacute;r&eacute;s&eacute;hez.<br />"+
		"Minden j&aacute;t&eacute;kosnak adom&aacute;nyoznia kell <b>" + addPointsToNumber(Math.ceil(woodNext * percentage)) + " f&aacute;t</b>. ("+addPointsToNumber(Math.ceil(wood * percentage))+" az aktu&aacute;lis szinthez)";
		
	return info;
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
		var div = document.createElement('div');
		div.innerHTML = 
			"<div id='leecher_checker' class='contentBox'>"+
				"<h3 class='header'><span class='textLabel'>Pi&oacute;ca figyel&otilde; v2.0.2HUN</span></h3>"+
				"<div class='content'>"+
					"<table>"+
						"<tr>"+
							"<td colspan='3'>"+
								"A pi&oacute;ca figyel&otilde; egy nagyon egyszer&ucirc; m&oacute;don m&ucirc;k&ouml;dik: <br />"+
								"Minden j&aacute;t&eacute;kosnak adom&aacute;nyoznia kell bizonyos %-ot, hogy a b&aacute;nya a k&ouml;vetkez&otilde; szintre fejl&otilde;dj&ouml;n. Ez a sz&aacute;zal&eacute;k 100 osztva az adom&aacute;nyoz&oacute; v&aacute;rosok sz&aacute;m&aacute;val."+
								"Ez a sz&aacute;m&iacute;t&aacute;si m&oacute;d a b&aacute;ny&aacute;k fejleszt&eacute;s&eacute;t c&eacute;lozza. A l&eacute;nyeg a k&ouml;vetkez&otilde;: <br />"+
							"</td>"+
						"</tr>"+
						"<tr>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/ecstatic_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/happy_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/outraged_x32.gif' /></center></td>"+
						"</tr>"+
						"<tr>"+
							"<td style='color: green;'><center>Eleget adom&aacute;nyozt&aacute;l a k&ouml;vetkez&otilde; szinthez</center></td>"+
							"<td style='color: orange;'><center>Eleget adom&aacute;nyozt&aacute;l az aktu&aacute;lis szinthez</center></td>"+
							"<td style='color: red;'><center>Te csak &eacute;l&otilde;sk&ouml;dsz!!</center></td>"+
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><hr><center>Adom&aacute;nyoz&oacute; v&aacute;rosok ezen a szigeten <input id='param' type='textfield' class='textfield' name='param' size='3' value='"+getCityNumber()+"' />"+
							"<div id='leecherInfo'>"+getLeecherInfo(page)+"</div></center></td>"+
						"</tr>"+
					"</table>"+
				"</div>"+
			"</div>";

		document.getElementById('mainview').insertBefore(div, document.getElementById("resourceUsers"));
		document.getElementById('param').addEventListener('change',function(event){doLeecherChecker(page);document.getElementById('leecherInfo').innerHTML = getLeecherInfo(page);},true);
		doLeecherChecker(page);
	}
}
catch(er)
				{alert("Leacher Checker has encountered an error\nPlease post a message on the Ikariam Library forums quoting the error below and which page it was received on\n" + er)}
},
    true);