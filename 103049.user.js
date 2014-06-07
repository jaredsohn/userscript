// ==UserScript==
// @name           Alliance Statistics
// @namespace      Alliance Statistics
// @description    Alliance Statistics
// @include        http://s*.*.ikariam.com/index.php*
// ==/UserScript==

if (document.getElementById("embassy") == null) return;

var s = location.href.split(".")[0].replace("http://","");
var c = location.href.split(".")[1];

GM_registerMenuCommand("Reset",reset);
editAllianceInfoBox();

editPage();
getAndSet();


function muunnaIkaAika(argDate) {
		var returnDate = new Date(
			argDate.split(".")[2],
			argDate.split(".")[1] - 1,
			argDate.split(".")[0]);
		return returnDate;
	}

function getAndSet()
	{
	var table = document.getElementsByTagName("table")[0];
	for (z=0;z<=table.rows.length; z++)
		{
		var currentRow = table.rows[z];
		if (z == 2)
			{
			var members = parseFloat(currentRow.cells[1].innerHTML);
			var members_data = parseFloat(GM_getValue(s+c+"_members"));
			var diff = members - members_data;
			if (diff > 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='green'>(+"+diff+")</font>";
				}
			if (diff < 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='red'>("+diff+")</font>";
				}
			}
		if (z == 4)
			{
			var rank = parseFloat(currentRow.cells[1].innerHTML.split(" ")[0]);
			var rank_data = parseFloat(GM_getValue(s+c+"_rank"));
			var diff = rank_data - rank;
			if (diff > 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='green'>(+"+diff+")</font>";
				}
			if (diff < 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='red'>("+diff+")</font>";
				}
			}
			
		if (z == 5)
			{
			var score = parseFloat(currentRow.cells[1].innerHTML.replace(",","").replace(",",""));
			var score_data = GM_getValue(s+c+"_score");
			var diff = score - score_data;
			if (diff > 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='green'>(+"+diff+")</font>";
				}
			if (diff < 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='red'>("+diff+")</font>";
				}
			}
		if (z == 6)
			{
			var av = parseFloat(currentRow.cells[1].innerHTML.replace(",","").replace(",",""));
			var av_data = parseFloat(GM_getValue(s+c+"_score")) / parseFloat(GM_getValue(s+c+"_members"));
			var diff = (av - av_data).toFixed();
			if (diff > 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='green'>(+"+diff+")</font>";
				}
			if (diff < 0)
				{
				currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML + " <font color='red'>("+diff+")</font>";
				}
			}
		}
	}

function editAllianceInfoBox()
	{
	var table = document.getElementsByTagName("table")[0];
	for (z=0;z<=table.rows.length; z++)
		{
		var currentRow = table.rows[z];
		if (z == 0)
			{
			var tag = currentRow.cells[0].innerHTML.replace(":","");
			currentRow.cells[0].innerHTML="Nimi:";
			currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML+" "+tag;
			currentRow.cells[0].title="Nimi";
			}
		if (z == 4)
			{
			var score_raw = currentRow.cells[1].innerHTML.split("(")[1].split(")")[0];
			var score = parseFloat(currentRow.cells[1].innerHTML.split("(")[1].split(")")[0].replace(",","").replace(",",""));
			currentRow.cells[1].innerHTML=currentRow.cells[1].innerHTML.split(" ")[0];
			var t = table.insertRow(5);
			var p = t.insertCell(0);
			var d = t.insertCell(1);
			p.innerHTML="Kokonaispisteet:";
			p.title="Kokonaispisteet";
			p.className="desc";
			d.innerHTML=score_raw;
			d.title=score_raw;
			
			var avarage = new Number(score / parseInt(table.rows[2].cells[1].innerHTML));
			var avarage = avarage.toFixed();
			var t = table.insertRow(6);
			var p = t.insertCell(0);
			var d = t.insertCell(1);
			p.innerHTML="Keskimääräiset pisteet:";
			p.title="Keskimääräiset pisteet";
			p.className="desc";
			d.innerHTML=avarage;
			d.title=avarage;
			}
		}
	if (GM_getValue(s+c+"_rank") == undefined) { reset(); };
	}

function getDataByRow(row)
	{
	// returns array: 0:NAME, 1:CITIES, 2:SCORE, 3:ID
	var currentRow = document.getElementsByTagName("table")[1].rows[row];
	var NAME = currentRow.cells[1].innerHTML;
	var scorecell = currentRow.cells[4].innerHTML;
	if (scorecell.match("font") == null)
		{
		var SCORE = parseFloat(scorecell.replace(",","").replace(",",""));
		}
	else
		{
		var SCORE = parseFloat(scorecell.split(">")[1].split(" ")[0].replace(",","").replace(",",""));
		}
	if (currentRow.className == " default" || currentRow.className == " alt")
		{
		var ID = currentRow.cells[currentRow.cells.length - 1].innerHTML.split('receiverId=')[1].split('">')[0].replace("&amp;msgType=93","");
		}
	else { ID = "unknown" }
	var cityAmount = currentRow.cells[2].innerHTML.split(": ")[1].split(" ")[0];
	var cityArray = Array();
	for (i=1; i<= cityAmount; i++)
		{
		var CITYID = currentRow.cells[2].innerHTML.split("selectCity=")[i].split('"')[0];
		var CITYDETAILS = currentRow.cells[2].innerHTML.split('class="city">')[i].split('<')[0];
		cityArray.push(CITYID+":"+CITYDETAILS);
		}
	var details = NAME+"&"+cityArray.toString()+"&"+SCORE+"&"+ID+"&"+cityAmount;
	return details;
	}

function getDataByRowFromDatabase(row)
	{
	// returns array: 0:NAME, 1:CITIES, 2:SCORE
	var currentRow = document.getElementsByTagName("table")[1].rows[row];
	
	if (currentRow.className == " default" || currentRow.className == " alt")
		{
		var ID = currentRow.cells[currentRow.cells.length - 1].innerHTML.split('receiverId=')[1].split('">')[0].replace("&amp;msgType=93","");
		}
	else { ID = "unknown" }
	
	var NAME = GM_getValue(s+c+"_"+ID+"_NAME");
	if (NAME != undefined)
		{
		var SCORE = GM_getValue(s+c+"_"+ID+"_SCORE");
		var cityArray = GM_getValue(s+c+"_"+ID+"_CITIES").split(",");
		var cityAmount = GM_getValue(s+c+"_"+ID+"_cityamount")
		}
	else
		{
		var SCORE = "";
		var cityArray = "";
		var cityAmount = "";
		}
	var details = NAME+"&"+cityArray.toString()+"&"+SCORE+"&"+ID+"&"+cityAmount;
	return details;
	}
	
function checkBulbByRow(row)
	{
	var currentRow = document.getElementsByTagName("table")[1].rows[row];
	var nyt = document.getElementById("servertime").innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
	var nowDate = muunnaIkaAika(nyt);
	var lastOnline = currentRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
	var lastDate = muunnaIkaAika(lastOnline);
	var days = Math.ceil((nowDate - lastDate)/86400000)
	
	
	if (currentRow.cells[0].className == "online")
		{
		var days = "online";
		}
	if (currentRow.cells[0].className == "vacation")
		{
		var days = "vacation";
		}
	if (currentRow.cells[0].className == "inactive")
		{
		var days = "inactive";
		}

	return days;
	}
	
function editPage()
	{
	for (z=1;z<=document.getElementsByTagName("table")[1].rows.length - 1; z++)
		{
		var detailsArray = getDataByRowFromDatabase(z).split("&");
		var NAME = detailsArray[0];
		if (NAME != "undefined")
			{
			var ID = detailsArray[3];
			var SCORE = detailsArray[2];
			var cityAmount = parseFloat(detailsArray[4]);
			
			var ACTIVE = checkBulbByRow(z);
			
			var detailsArray2 = getDataByRow(z).split("&");
			var NAME2 = detailsArray2[0];
			var ID2 = detailsArray2[3];
			var SCORE2 = detailsArray2[2];
			var cityAmount2 = parseFloat(detailsArray2[4]);
			
			var SCORE_CHANGE = parseFloat(SCORE2)-parseFloat(SCORE);
			
			if (NAME != NAME2) { NAME_CHANGE = true; } else { NAME_CHANGE = false; }
			var CITIES_CHANGE = cityAmount2 - cityAmount;
			
			var row = document.getElementsByTagName("table")[1].rows[z];
			
			if (SCORE_CHANGE > 0) { var color = "green"; var scorechange = "+"+SCORE_CHANGE; }
			if (SCORE_CHANGE == 0) { var color = ""; var scorechange = ""+SCORE_CHANGE; }
			if (SCORE_CHANGE < 0) { var color = "red"; var scorechange = ""+SCORE_CHANGE; }
			
			row.cells[4].innerHTML = '<font color="'+color+'">'+row.cells[4].innerHTML+' ('+scorechange+')</font>';
			
			if (NAME_CHANGE == true)
				{
				row.cells[1].title="Entinen nimimerkki "+NAME;
				}
				
			if (CITIES_CHANGE > 0)
				{
				row.cells[2].innerHTML=row.cells[2].innerHTML.replace(": "+cityAmount2,": "+cityAmount2+" <font color='green'>(+"+CITIES_CHANGE+")</font>");
				}
				
			if (CITIES_CHANGE < 0)
				{
				row.cells[2].innerHTML=row.cells[2].innerHTML.replace(": "+cityAmount2,": "+cityAmount2+" <font color='red'>("+CITIES_CHANGE+")</font>");
				}
			}
		else
			{
			var detailsArray = getDataByRow(z).split("&");
			var NAME = detailsArray[0];
			var ID = detailsArray[3];
			var SCORE = detailsArray[2];
			var CITIES = detailsArray[1];
			var cityAmount = detailsArray[4];
			
			GM_setValue(s+c+"_"+ID+"_NAME",NAME);
			GM_setValue(s+c+"_"+ID+"_SCORE",SCORE);
			GM_setValue(s+c+"_"+ID+"_CITIES",CITIES);
			GM_setValue(s+c+"_"+ID+"_cityamount",cityAmount);
			location.href=location.href;
			}
		
		if (ACTIVE != "online" && ACTIVE != "vacation" && ACTIVE != "inactive")
			{
			if (ACTIVE == 0 ) { document.getElementsByTagName("table")[1].rows[z].cells[0].className="noclass"; document.getElementsByTagName("table")[1].rows[z].cells[0].innerHTML="<center><img src='http://servut.us/Muppetti/kuvat/bulb-today.png' alt=''></center>"; }
			if (ACTIVE >= 1) { document.getElementsByTagName("table")[1].rows[z].cells[0].className=""; document.getElementsByTagName("table")[1].rows[z].cells[0].innerHTML="<center><img src='http://servut.us/Muppetti/kuvat/bulb-allmostinactive.png' alt=''></center>"; }
			}
		}	
	}
	
function reset()
	{
	for (z=1;z<=document.getElementsByTagName("table")[1].rows.length - 1; z++)
		{
		var detailsArray = getDataByRow(z).split("&");
		var NAME = detailsArray[0];
		var ID = detailsArray[3];
		var SCORE = detailsArray[2];
		var CITIES = detailsArray[1];
		var cityAmount = detailsArray[4];
		
		GM_setValue(s+c+"_"+ID+"_NAME",NAME);
		GM_setValue(s+c+"_"+ID+"_SCORE",SCORE);
		GM_setValue(s+c+"_"+ID+"_CITIES",CITIES);
		GM_setValue(s+c+"_"+ID+"_cityamount",cityAmount);
		}
	var table = document.getElementsByTagName("table")[0];
	
	for (z=0;z<=table.rows.length; z++)
		{
		var currentRow = table.rows[z];
		if (z == 2)
			{
			var members = parseFloat(currentRow.cells[1].innerHTML);
			GM_setValue(s+c+"_members",members);
			}
		if (z == 4)
			{
			var rank = parseFloat(currentRow.cells[1].innerHTML);
			GM_setValue(s+c+"_rank",rank);
			}
		if (z == 5)
			{
			var score = parseFloat(currentRow.cells[1].innerHTML.replace(",","").replace(",",""));
			GM_setValue(s+c+"_score",score);
			}
		}
	location.href=location.href;
	}