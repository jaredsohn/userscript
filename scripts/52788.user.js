// ==UserScript==
// @name				DSstartTimestapInReport
// @author				Heinzel
// @description			Dieses Script schreibt schlichtweg die Uhrzeit und das Datum des Abschickens der Truppen in einen Bericht. 
// @namespace			none
// @include			http://de*.die-staemme.de/game.php*screen=report*view=*
// ==/UserScript==



function getKoords(kind)
{
  if(kind == "start")
	var index = 3;
  else if(kind == "target")
	var index = 5;
  else 
	return false;
  
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  tab = (tab.innerHTML.match(/Weitergeleitet/)) ? tab.getElementsByTagName("tr")[4] : tab.getElementsByTagName("tr")[2];
  tab = tab.getElementsByTagName("tbody")[index];
  var cells = tab.getElementsByTagName("tr");
    
  for(i in cells)
  {
	try {
	  if(cells[i].innerHTML.match(/Dorf:/))
		var koords = cells[i].lastChild.firstChild.innerHTML.match(/.+? \((\d+\|\d+)\) K\d+/)[1];
	} catch(e) {
	  // be silent on errors
	}
  }
  
  return koords;
}

function getArrivalDate()
{
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  var cells = tab.getElementsByTagName("tr");
  var i;
  
  for(i in cells)
  {
	try {
	  if(cells[i].innerHTML.match(/Gesendet/))
	  {
		var time = cells[i].lastChild.innerHTML;
		break;
	  }
	} catch(e) {
	  // be silent on errors
	}
  }
  
  return time;
}

function getRunningUnits()
{
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  tab = (tab.innerHTML.match(/Weitergeleitet/)) ? tab.getElementsByTagName("tr")[4] : tab.getElementsByTagName("tr")[2];
  tab = tab.getElementsByTagName("tbody")[4];
  var units = [];
  
  var cell = tab.getElementsByTagName("tr")[0]
  var rows = cell.getElementsByTagName("td");
  
  for(var x in rows)
  {
	if(rows[x].innerHTML)
	{
	  units.push(rows[x].firstChild.src.split("unit_")[1].split(".png")[0]);
	}
  }
  
  var cell = tab.getElementsByTagName("tr")[1]
  var rows = cell.getElementsByTagName("td");
  
  for(var x in rows)
  {
	if(!isNaN(rows[x].innerHTML))
	{
	  units[x-1] += ":" + rows[x].innerHTML;
	}
  }
  
  return units;
}

function getSlowestUnit(units)
{
  for(var x = 0; x < units.length; x++)
  {
	var name = units[x].split(":")[0];
	var len = units[x].split(":")[1];
	
	if(len == "0")
	  units.splice(x--, 1);
  }
  
  var str = units.join(",");
  if(str.match(/snob/))
	return "snob";
  else if(str.match(/ram|catapult/))
	return "ram";
  else if(str.match(/sword/))
	return "sword";
  else if(str.match(/axe|spear|archer/))
	return "axe";
  else if(str.match(/heavy/))
	return "heavy";
  else if(str.match(/marcher|light/))
	return "light";
  else 
	return "spy";
}

function getRuntime(kind, StKo, TaKo)
{
  var StKo = StKo.split('|');
  var TaKo = TaKo.split('|');
  var len_x = Math.abs(StKo[0]-TaKo[0]);
  var len_y = Math.abs(StKo[1]-TaKo[1]);
  var len = Math.sqrt(len_x*len_x+len_y*len_y);
  
  var runtimes = [];
  runtimes['snob'] = 35;
  runtimes['ram'] = 30;
  runtimes['sword'] = 22;
  runtimes['axe'] = 18;
  runtimes['heavy'] = 11;
  runtimes['light'] = 10;
  runtimes['spy'] = 9;
  
  var runtime = Math.floor(len*runtimes[kind].toFixed(2));
  return runtime;
}

function getStartDate(arrival, runtime)
{
  /* Ankunftszeitpunkt aufsplitten */
  var A_day 	= arrival.split(".")[0].replace(/0+?([1-9]+)/, "$1");
  var A_month 	= parseInt(arrival.split(".")[1], 10)-1;
  var A_year	= "20" + arrival.split(".")[2].split(" ")[0];
  var A_hours 	= arrival.split(" ")[1].split(":")[0];
  var A_minutes	= arrival.split(":")[1];
  
  /* Laufzeit in Tage/Stunden umrechnen */
  var S_minutes = runtime%60;
  var S_hours = Math.floor(runtime/60);
  var S_day = Math.floor(S_hours/24);
  S_hours = S_hours%24;
  
  /* Berechnen wieviele Tage der vorherige Monat hatte */
  switch(A_month)
  {
	case 0:
	case 2:
	case 4:
	case 6:
	case 7: 
	case 9:
	case 11:
	  var MonthFull = 31;
	  break;
	case 1:
	  var MonthFull = 28;
	  break;
	case 3:
	case 5:
	case 8:
	case 10:
	  var MonthFull = 30;
	  break;
	default:
	  return false;
  }
  
  /* Ein Objekt f�r den Startzeitpunkt erzeugen */
  var Start = new Date();
  Start.setFullYear(A_year);
  Start.setMilliseconds(0);
  Start.setSeconds(0);
  Start.setMonth(A_month);
  
  /* die Laufzeit in das Objekt einrechnen */
  var MinDiff = parseInt(A_minutes,10)-parseInt(S_minutes,10);
  if(MinDiff < 0)
  {
	S_hours++;
	Start.setMinutes(MinDiff+60);
  } else 
	Start.setMinutes(MinDiff);
  
  var HouDiff = parseInt(A_hours,10)-parseInt(S_hours,10);
  if(HouDiff < 0)
  {
	S_day++;
	Start.setHours(HouDiff+24);
  } else 
	Start.setHours(HouDiff);
  
  var DayDiff = parseInt(A_day,10)-parseInt(S_day,10);
  if(DayDiff < 0)
  {
	Start.setMonth(A_month-1);
	Start.setDate(DayDiff+MonthFull);
  } else 
	Start.setDate(DayDiff);
  
  /* Die Ausgabe erstellen */
  var outputMonth = parseInt(Start.getMonth(), 10)+1
  var Day = (Start.getDate() < 10) ? "0" + Start.getDate().toString() : Start.getDate();
  var Month = (outputMonth < 10) ? "0" + outputMonth.toString() : outputMonth;
  var Year = "0" + (Start.getYear()-100).toString();
  var Hours = (Start.getHours() < 10) ? "0" + Start.getHours().toString() : Start.getHours();
  var Minutes = (Start.getMinutes() < 10) ? "0" + Start.getMinutes().toString() : Start.getMinutes();
  
  var output = Day + "." + Month + "." + Year + " " + Hours + ":" + Minutes;
  return output;
}

function setStartDate(startDate)
{
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  var cells = tab.getElementsByTagName("tr");
  var i;
  
  for(i in cells)
  {
	try {
	  if(cells[i].innerHTML.match(/Gesendet/))
	  {
		var time = cells[i].lastChild.innerHTML;
		break;
	  }
	} catch(e) {
	  // be silent on errors
	}
  }
  
  var newCell = document.createElement("tr");
  var newRow = document.createElement("td");
  
  newRow.innerHTML = "Losgeschickt: ";
  newCell.appendChild(newRow.cloneNode(true));
  
  newRow.innerHTML = startDate;
  newCell.appendChild(newRow);
  
  tab.insertBefore(newCell, cells[i].nextSibling);
}


(function main()
{
  /* Ankunftszeitpunkt auslesen */
  var arrivalDate = getArrivalDate();
  
  /* Die Einheiten die gelaufen sind auslesen */
  var runningUnits = getRunningUnits();
  
  /* Aus den gelaufenen Einheiten die langsamste raussuchen */
  var slowestUnit = getSlowestUnit(runningUnits);
  
  /* Die Koordinaten ermitteln */
  var startKoords = getKoords("start");
  var targetKoords = getKoords("target");
  
  /* Die Laufzeit ermitteln */
  var runtime = getRuntime(slowestUnit, startKoords, targetKoords);
  
  /* Den Startzeitpunkt ermitteln */
  var startDate = getStartDate(arrivalDate, runtime);
  
  /* Den Startzeitpunkt einf�gen */
  setStartDate(startDate);
})();