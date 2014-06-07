// ==UserScript==
// @name           Trukz Speed Helper and Fuel Nagger
// @namespace      http://trukz.com
// @description    Adds 5 MPH to the default speed set by truckz when en route. This also adds blinking text next to the fuel price if it is below $2. 
// @include        http://www.trukz.com/in_route.asp
// ==/UserScript==
//    Copyright Marc-A. B.
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//
/*
     Notes: This was based off of Matthew M's script (http://userscripts.org/scripts/show/38356) however, absolutely
     everything was changed (no lines of code are left from the original) by the end product (this), so I'm claiming 
     it as my own, and thank Matthew for the inspiration and a great start.

     düzenleyen: Barış Aybar , hava şartları hız sınırına 10 eklendi, hız kalan yoldan az ise yola göre değiştirildi, en az 55 yapıldı

*/

// Configuration options - edit these to customize your desired preference
var ENABLE_ADD_SPEED = true;
var ENABLE_BLINK_FUEL = true;
var ENABLE_DISABLE_NEXT_LEG = true;	//enables the disabling of next leg button if fatigue is >= fatigue_threshold

var ADD_SPEED = 5; 			//adds this amount (in MPH) to truck speed
var ADD_SPEED2 = 10;			// baris_ 
var BLINK_FUEL_THRESHOLD = 2;		//adds blinking text when fuel is below this number
var FATIGUE_THRESHOLD = 11;

// Code for the finding and replacing of stuff
var topTruckSpeed;
var speedLimit;
var topWeatherSpeed;
var fuelCost;
var fatiguePoints;
var milesToGo;
// look for the speed limits and fuel numbers
for(var i = 0; i < document.body.getElementsByTagName('TABLE').length; i++)
{
  var table = document.body.getElementsByTagName('TABLE')[i];

  if (table.className == "RouteCSS") //looking for the route info where the max speeds are stored
  {
    for(var j = 0; j < table.getElementsByTagName('TD').length; j++)//break apart the table info by cell
    {
      var cell = table.getElementsByTagName('TD')[j];
      
      //don't process for it if its not enabled...
      if(ENABLE_ADD_SPEED)
      {
        //look for speed limit
        if (cell.innerHTML.search(/speed limit/i) != -1)
        {
          speedLimit = scrubData(cell.nextSibling.nextSibling.textContent.replace(/mph/i,''));
        }
      
        //look for top truck speed
        if (cell.innerHTML.search(/Top Truck Speed:/i) != -1)
        {
          topTruckSpeed = scrubData(cell.nextSibling.nextSibling.textContent.replace(/mph/i,''));
        }
      
        //look for top weather speed
        if (cell.innerHTML.search(/Top Weather Speed:/i) != -1)
        {
          topWeatherSpeed = scrubData(cell.nextSibling.nextSibling.textContent.replace(/mph/i,''));
        }
        //look for top weather speed
        if (cell.innerHTML.search(/Miles To Go:/i) != -1)
        {
          milesToGo = scrubData(cell.nextSibling.nextSibling.textContent.replace(/miles/i,''));
        }

      }
      
      //don't process for it if its not enabled...
      if(ENABLE_BLINK_FUEL)
      {
        //look for fuel costs
        if (cell.innerHTML.search(/Fuel Costs:/i) != -1)
        {
          fuelCost = parseFloat(scrubData(cell.nextSibling.nextSibling.textContent.replace(/ppg/i,'')));
          if (fuelCost < BLINK_FUEL_THRESHOLD) //if gas is below set price / gallon
	  {
	    cell.nextSibling.nextSibling.innerHTML = "$" + fuelCost + " PPG<Blink><font color=red> Refuel NOW!</blink></font>";
	  }
        }
      }
      
      //check if the disabling of the next leg button is enabled
      if(ENABLE_DISABLE_NEXT_LEG)
      {
        if (cell.innerHTML.search(/Fatigue Points:/i) != -1)
        {
          //get the fatigue points
          fatiguePoints = scrubData(cell.nextSibling.nextSibling.textContent);
        }
      }
    }
  }
}

if(ENABLE_ADD_SPEED)
{
  //default to top truck speed - as fast as we can go - then see which one is restricting us and add speed to that limit
  var newSpeed = topTruckSpeed;
  var newSpeed2 = topTruckSpeed;
  //determine which speed to use (the lowest of them, as its the most restrictive)
  if (speedLimit <= topTruckSpeed && speedLimit <= topWeatherSpeed) newSpeed = (speedLimit + ADD_SPEED);
  if (topWeatherSpeed <= speedLimit && topWeatherSpeed <= topTruckSpeed) newSpeed2 = (topWeatherSpeed + ADD_SPEED2);

  if (newSpeed2 < newSpeed ) newSpeed = newSpeed2;

  //no matter what, the speed can't be more than max truck speed, so this sets it to max speed (in case other speed
  //restrictions are less than xxx below top truck speed, in which case the addition would then make this too fast... you get the idea)
  if(newSpeed > topTruckSpeed) newSpeed = topTruckSpeed;


  if(milesToGo < 55) 	milesToGo = 55;
  if(milesToGo < newSpeed) newSpeed = milesToGo;
	

  //set the new speed
  document.getElementsByName('Speed')[0].value = newSpeed;
}

//disables the next leg button if the option is enabled
if(ENABLE_DISABLE_NEXT_LEG)
{
  for(var i = 0; i < document.body.getElementsByTagName('INPUT').length; i++)
  {
    if(document.body.getElementsByTagName('INPUT')[i].value == "Next Leg" && fatiguePoints >= FATIGUE_THRESHOLD)
    {
        //disable the button
    	document.body.getElementsByTagName('INPUT')[i].disabled = true;
    }
  }
}

// removes any weird character from a string believed to be a number
function scrubData(data)
{
  if (data.search(/,/) != -1) { data = data.replace(/,/,''); }
  if (data.search(/\$/) != -1) { data = data.replace(/\$/,''); }
  if (data.search(/\+/g) != -1) { data = 0; }
  else if (data.search(/-/) != -1) { data = data.replace('-',''); }
  data = data * 1;
  return data;
}