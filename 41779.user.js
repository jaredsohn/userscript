// ==UserScript==
// @name           	Detector de Lipitori v. Z-A-T
// @namespace      http://ikariamlibrary.com/
// @description    script de Ikariam pentru detectarea lipitorilor din minele de resurse
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
		workplace[2]  = new Array( 38,     394,     394);
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
	}
	else // Luxury
	{
		workplace = new Array();
		// 					    	 Workers / 	     lvl up / 	cumulative
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
		workplace[20] = new Array(534,  552058, 2299413);
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
	var info =  "Sunt " + cities + " orase active pe aceasta insula. Asta inseamna ca fiecare jucator trebuie sa doneze <b>"+ Math.round(10000/cities)/100 +"%</b> <br />"+
		"Avand nivelul minei de " + lvl + " pretul cumulat pentru urmatorul nivel este de <b>"+addPointsToNumber(woodNext) +" lemn.</b><br />"+
		"Fiecare jucator trebuie sa doneze <b>" + addPointsToNumber(Math.ceil(woodNext * percentage)) + " lemn</b>. ("+addPointsToNumber(Math.ceil(wood * percentage))+" pentru nivel curent)";
		
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
				"<h3 class='header'><span class='textLabel'>Detector de Lipitori v. Z-A-T</span></h3>"+
				"<div class='content'>"+
					"<table>"+
						"<tr>"+
							"<td colspan='3'>"+
								"E simplu... <br />"+
								"Fiecare jucator trebuie sa doneze un procentaj pentru a se ajunge la nivelul urmator. Acest procentaj este 100 impartit la numarul de orase aflate pe insula. "+
								"Ajustati daca aveti jucatori inactivi. Metoda este creeata pentru a eficientiza donatiile la mine. <br />Legenda: <br />"+
							"</td>"+
						"</tr>"+
						"<tr>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/ecstatic_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/happy_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='http://s13.ikariam.org/skin/smilies/outraged_x32.gif' /></center></td>"+
						"</tr>"+
						"<tr>"+
							"<td style='color: green;'><center><b>Felicitari!</b> Ai donat cat pentru urmatorul nivel!!!</center></td>"+
							"<td style='color: orange;'><center>Ai donat cat pentru nivelul curent!</center></td>"+
							"<td style='color: red;'><center>Esti o lipitoare, baga-ti mintile-n cap si doneaza odata!!!</center></td>"+
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><hr><center>Orase donatoare pe insula <input id='param' type='textfield' class='textfield' name='param' size='3' value='"+getCityNumber()+"' />"+
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