// ==UserScript==
// @name           	Leecher Checker Arabic
// @namespace      	http://ikariamlibrary.com/
// @description    	A script for Ikariam that colors leechers in Arabic
// @version		1.1
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// @history		1.1 Addes reconising of mines and sawmilles up to level 30 
// ==/UserScript==

/*
	This script was changed for use in arabic servers , the original one can be found in the ikariam library : http://ikariamlibrary.com/
*/

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
	var param = 1/16;
	
	if (donated >= getDepositInfo(page, lvl+1)[2]*param)
		return "green";
	if (donated >= getDepositInfo(page, lvl)[2]*param)
		return "orange";
	return 'red';
	
	/*
	
	if (percentage > 110)
		return 'green';
	if (percentage >= 100)
		return 'orange';
	if (percentage >= 90)
		return 'blue';
	if (percentage == undefined) //error value
		return 'black';
	return 'red';*/
}

/**
 *	Returns if this number is an even number
 */
function even(number)
{
	return (number % 2) == 0
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
		// 			Workers / lvl up / cumulative
		workplace[1]  = new Array( 30,       0,       0);
		workplace[2]  = new Array( 38,     394,     350);
		workplace[3]  = new Array( 50,     992,    1386);
		workplace[4]  = new Array( 64,    1732,    3118);
		workplace[5]  = new Array( 80,    2788,    5906);
		workplace[6]  = new Array( 96,    3783,    9689);
		workplace[7]  = new Array(114,    5632,   15321);
		workplace[8]  = new Array(134,    8139,   23460);
		workplace[9]  = new Array(154,   10452,   33912);
		workplace[10] = new Array(174,   13298,   47210);
		workplace[11] = new Array(196,   18478,   65688);
		workplace[12] = new Array(218,   23213,   88901);
		workplace[13] = new Array(240,   29038,  117939);
		workplace[14] = new Array(264,   39494,  157433);
		workplace[15] = new Array(288,   49107,  206540);
		workplace[16] = new Array(314,   66010,  272550);
		workplace[17] = new Array(340,   81766,  354316);
		workplace[18] = new Array(366,  101146,  455462);
		workplace[19] = new Array(394,  134598,  590060);
		workplace[20] = new Array(420,  154304,  744364);
		workplace[21] = new Array(448,  205012,  949376);
		workplace[22] = new Array(478,  270839, 1220215);
		workplace[23] = new Array(506,  311541, 1531756);
		workplace[24] = new Array(536,  411229, 1942985);
		workplace[25] = new Array(566,  506475, 2449460);
		workplace[26] = new Array(598,  665201, 3114661);
		workplace[27] = new Array(628,  767723, 3882384);
		workplace[28] = new Array(660, 1007959, 4890343);
		workplace[29] = new Array(692, 1240496, 6130839);
		workplace[30] = new Array(724, 1526516, 7657355);
	}
	else // Luxury
	{
		workplace = new Array();
		// 			Workers / lvl up / cumulative
		workplace[1]  = new Array( 20,       0,       0);
		workplace[2]  = new Array( 32,    1303,    1303);
		workplace[3]  = new Array( 48,    2689,    3992);
		workplace[4]  = new Array( 66,    4373,    8365);
		workplace[5]  = new Array( 88,    7421,   15786);
		workplace[6]  = new Array(110,   10037,   25823);
		workplace[7]  = new Array(132,   13333,   39156);
		workplace[8]  = new Array(158,   20665,   59821);
		workplace[9]  = new Array(184,   26849,   86670);
		workplace[10] = new Array(212,   37305,  123975);
		workplace[11] = new Array(240,   47879,  171854);
		workplace[12] = new Array(270,   65572,  237426);
		workplace[13] = new Array(302,   89127,  326553);
		workplace[14] = new Array(332,  106217,	 432770);
		workplace[15] = new Array(366,  152379,  585149);
		workplace[16] = new Array(400,  193512,  778661);
		workplace[17] = new Array(434,  244886, 1023547);
		workplace[18] = new Array(468,  309618, 1333165);
		workplace[19] = new Array(504,  414190, 1747355);
		workplace[20] = new Array(542,  552058, 2299413);
		workplace[21] = new Array(578,  660106, 2959519);
		workplace[22] = new Array(618,  925396, 3884915);
		workplace[23] = new Array(656, 1108885, 4993800);
		workplace[24] = new Array(696, 1471979, 6465779);
		workplace[25] = new Array(736, 1855942, 8321721);
		workplace[26] = new Array(776, 2339735,10661456);
		workplace[27] = new Array(818, 3096779,13758235);
		workplace[28] = new Array(860, 3903252,17661487);
		workplace[29] = new Array(904, 5153666,22815153);
		workplace[30] = new Array(946, 6199765,29014918);
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
	
	var cities = getCityNumber();
	
	var lvl = getDepositLevel();
	var wood = getDepositInfo(page, lvl)[2];
	var woodNext = getDepositInfo(page, lvl+1)[2];
	var percentage = 1/cities;
	var info =  "There are " + cities + " active cities on this island. That means everyone has to donate <b>"+ percentage*100 +"%</b> <br />"+
		"Having a level " + lvl + " resource deposit a total of <b>"+woodNext +" wood</b> is needed to get to the next level.<br />"+
		"Each player has to donate <b>" + Math.ceil(woodNext * percentage) + " wood</b>. ("+Math.ceil(wood * percentage)+" for current lvl)";
		
	var info =  + "%</b> <br/>" + percentage*100 + "مدينة على هذه الجزيرة. هاذا يعني أن كل شخص عليه أن يتبرع ب<b>" + cities + "هناك "
		
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
				"<h3 class='header'><span class='textLabel'>فاضح البخلاء</span></h3>"+
				"<div class='content'>"+
					"<table>"+
						"<tr>"+
							"<td colspan='3'>"+
							"</td>"+
						"</tr>"+
						"<tr>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/ecstatic_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/happy_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/outraged_x32.gif' /></center></td>"+
						"</tr>"+
						"<tr>"+
							"<td style='color: green;'><center>كريم</center></td>"+
							"<td style='color: orange;'><center>متبرع بما فيه الكفاية</center></td>"+
							"<td style='color: red;'><center> بخيل !</center></td>"+
						"</tr>"+
					"</table>"+
				"</div>"+
			"</div>";

		document.getElementById('mainview').insertBefore(div, document.getElementById("resourceUsers"));
		doLeecherChecker(page);
	}
	
}
catch(er)
	{}
},
    true);
