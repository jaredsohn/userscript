// ==UserScript==
// @author       Martynas
// @namespace    http://riteriai.draugas.lt
// @name         Statybos riteriuose
// @description  This script runs on building pages, and determines how many resources you need to acquire to upgrade the building / research the tech and how long it will take you to get these. It also generates a table showing your production for the next 20 hours.
// @include      http://riteriai*.draugas.*/buildings.php?tb_id=*
// ==/UserScript==

/*****************************************************************************
 * Copyright 2008, Adrian Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hopes that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/

// Version Log

/*****************************************************************************************************************************************************
 * Date:           | Name:      | Description:
 *****************************************************************************************************************************************************
 * Sept 15 2008    | arandia    | Extracted function 'createTable()' from onload function, rewrote to utilize arrays and looping through said arrays
 * Sept 18/19 2008 | arandia    | Added mouseovers for techs, restructured and simplified code, added debug...
 * Sept 19 2008    | arandia    | Turned the troop build/research header into a "reset", to change the res table back to "basic"
 * Sept 19 2008    | arandia    | Restructured (& greatly simplified) mouseover routine
 *****************************************************************************************************************************************************/

// This Array is to store the different tables.
var tables = new Array();
// And this one to specify which one is on
var last_table = "";
 
function debug(lvl, msg){
    if (lvl <= d_level){
        GM_log("\n"+msg);
    }
}

function dbg(msg){
    debug(d_highest, msg);
}

// Just a helper function to make evaluating an xpath easier...
function xpathEval(xpath){
    a = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!a) debug(d_highest, "Evaluating xpath '" + xpath + "' failed!");
    return a;
}

function format(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            var sec = maxtime % 60;
            var t = hrs + ":";
            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec;
            return t;
}
 
function mHrs(maxtime){
            var hrs = Math.floor(maxtime/3600);
            return hrs;
}
 
function mMin(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            //if(min < 10){min = "0" + min;}
            return min;
}
 
function mSec(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            var sec = maxtime % 60;           
            //if(sec < 10){sec = "0" + sec;}
            return sec;
}
 
function javaTimeFormat(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            var sec = maxtime % 60;
                        
            var t = new Date();
            t.setHours(hrs); 
            t.setMinutes(min);
            t.setSeconds(sec);
            t.setMilliseconds(0);
                        
            return t;
}
 
function travianTimeFormat(t){
            var hrs = t.getHours();
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var t = hrs + ":";
            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec;
            return t;
}
 
 
function hhmmssTimeFormat(t){
            var hrs = t.getHours();
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var st ="";
            if(hrs < 10){st += "0";}
            st += hrs + ":";
            if(min < 10){st += "0";}
            st += min + ":";
            if(sec < 10){st += "0";}
            st += sec;
            return st;
}
 
function addTime(originalTime, years, months, days, hours, minutes, seconds, milliseconds){
            var t = new Date();
 
            t.setYear( t.getYear() + years );
            t.setMonth( t.getMonth()  + months );
            t.setDate( t.getDate() + days );
            t.setHours( t.getHours() + hours );
            t.setMinutes( t.getMinutes() + minutes );
            t.setSeconds( t.getSeconds() + seconds );
            t.setMilliseconds( t.getMilliseconds() + milliseconds );
 
            return t;
}
 
function prefixNullen(nodig, tekort){
            var nbspCount = (String(nodig).length - String(tekort).length);
            for (i=nbspCount;i>0;i--){
                        tekort = "<font color='white'>0</font>" + tekort;
            }
            return tekort;
}
 
function prefixVisbleNullen(nodig, tekort){
            var nbspCount = (String(nodig).length - String(tekort).length);
            for (i=nbspCount;i>0;i--){
                        tekort = "0" + tekort;
            }
            return tekort;
}
 
function createTable(res_need, tech){
                                               
	    var resourcesneed = res_need[wood] + res_need[clay] + res_need[iron] + res_need[crop];
                      
	    var res_inv = new Array(4);
	    for (var i=0; i<4; i++) res_inv[i] = res[i] - res_need[i];

	    var maxtime=0,time,timeleft,tClient,tClientString;
	    for (var i=0; i<4; i++){
		    time = res_inv[i]<0 ? (res_inv[i]/res_p[i])*(-3600) : 0;
		    if (maxtime < time) maxtime = time;
	    }
	    maxtime = parseInt(maxtime);
	    timeleft = format(maxtime);
          
	    tClient=javaTimeFormat(maxtime);  
	    tClient=addTime(tClient,0,0,0,mHrs(maxtime),mMin(maxtime),mSec(maxtime),0);
	    tClientString=travianTimeFormat(tClient);
            
	    // create presentation
	    // in Firefox the total is in a new line, even though the div is floated
	    var resource_div = document.createElement ('div');
	    resource_div.style.cssFloat = "left";
	    resource_div.innerHTML = "";

	    // If this is a tech, we need an extended header for the table
	    // It needs to seperate the table from the build resources, and repeat the costs...
	    if (tech){
		    resource_div.innerHTML += "<br><b>"+tech+":</b><br>";
		    for (var i=0; i<4; i++){
			    var negative = res_inv[i] < 0;
			    resource_div.innerHTML += "<img src=\"img/un/r/"+(i+1)+".gif\" width=\"18\" height=\"12\">"+
				prefixNullen (negative ? (-1)*res_inv[i] : res_inv[i], res_need[i])+" | ";
		    }
		    resource_div.innerHTML += "<br>";
	    }

	    for (var i=0; i<4; i++){
		    var negative = res_inv[i] < 0;
		    resource_div.innerHTML += "<img src=\"img/un/r/"+(i+1)+".gif\" width=\"18\" height=\"12\">" +
			"<font color='" + (negative?"red":"green") + "'>" +
			prefixNullen (res_need[i], negative ? res_inv[i]*(-1) : res_inv[i]) + "</font> | ";
	    }

	    if (maxtime != 0){
		    if (!tech) resource_div.innerHTML += "<span id=timer0>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

		    resource_div.innerHTML += "<img class='clock' src='img/un/a/clock.gif' width='18' height='12'> Remaining: " +
			timeleft + "</span>";
	    }
	    resource_div.innerHTML += "<br><br>";
	    
	    var resourceTable = "";   
	    var resources;
	    var currentTime = new Date();
	    var teller = 0;
	    var stockValue = 0;
	    var vlagtClient = 0;
                        
	    resourceTable += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
		"<img src='img/un/r/1.gif' width='18' height='12'>"+
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
		"<img src='img/un/r/2.gif' width='18' height='12'>"+
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
		"<img src='img/un/r/3.gif' width='18' height='12'>"+
		"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
		"<img src='img/un/r/4.gif' width='18' height='12'>"+
		"<br>";

	    for(vlag=1;vlag<=20;vlag++){                   
		    if (vlagtClient!=0){
			    resourceTable += "<font style='font-size:smaller;'><b>" + hhmmssTimeFormat(tClient)+
				"&nbsp;&nbsp;&nbsp;</b></font>";
		    } else {
			    resourceTable += hhmmssTimeFormat(addTime(currentTime,0,0,0,teller,0,0,0));
		    }
                                   
		    for (var i=0; i<4; i++){
			    resourceTable += " | <!--<img src='img/un/r/" + (i+1) + ".gif' width='18' height='12'>-->";
			    stockValue = Math.floor(res[i] + teller * res_p[i]);
			    var color = (stockValue < res_need[i]) ? "OrangeRed" : ((stockValue >= res_stock[i]) ? "blue" : "black");
			    resourceTable += "<font color='" + color + "'>" + prefixNullen("99999", stockValue) + "</font>";
		    }

		    var resources = 0;
		    for (var i=0; i<4; i++) resources += res[i]+teller*res_p[i];
           
		    //resources = (res[wood] + teller * res_p[wood]) + (res[clay] + teller * res_p[clay]) +
		    //(res[iron] + teller * res_p[iron]) + (res[crop] + teller * res_p[crop]);
		    if (resources <= resourcesneed){
			    resourceTable += " <font style='font-size:smaller;'>(" + prefixNullen("99999",resources) + ")</font>";
		    }                       
		    resourceTable += "<br>"; 
                                   
		    if (tClient > addTime(currentTime,0,0,0,teller,0,0,0) &&
			tClient < addTime(currentTime,0,0,0,teller+1,0,0,0) &&
			vlagtClient==0 ){
			    vlagtClient = teller + 1;
			    //resourceTable += "<hr style='height:1px;border:1px solid #000;background-color:#000'>";
			    teller = mHrs(maxtime) + Math.max((mMin(maxtime)+1) * 1.6666667) / 100;                                            
		    } else if (vlagtClient!=0){
			    //resourceTable += "</font></b>"; 
			    teller = vlagtClient;
			    vlagtClient=0;
		    } else teller += 1;

	    } // end of for();

	    resource_div.innerHTML +=  resourceTable + "<br>";               

	    return resource_div;
} 

/*************************************************************
 * This function finds and returns the appropriate node
 * for the display table to be inserted in
 *************************************************************/
function findDisp(iterTable){
        for (var i=0; i < iterTable.snapshotLength; i++){
	        item = iterTable.snapshotItem(i);
		txt = item.textContent;
		//dbg(i + "\n" + item.textContent);
		if (txt.indexOf("|")!=-1 && txt[0]!="\n" &&
		    (txt.indexOf("(") > txt.indexOf("|") || txt.indexOf("(") == -1)) return item;
	}
	debug(d_highest, "Failed to find the right item to display at");
}

/*************************************************************
 * This extracts the name of the current building we're on
 *************************************************************/
function buildingName(){
        return document.getElementById("lmid2").textContent.split(" level")[0];
}

/*************************************************************
 * This adds a mousever event to the cell passed
 *************************************************************/
function addMouseover(cell, current_table){
        cell.addEventListener('mouseover', function (ev){
		var disp = findDisp(xpathEval('//table[@class="f10"]'));
		var i;

		// Index 0 should not count as false here...
		var is_past, is_present;
		is_past = last_table || typeof last_table == "number";
		is_present = current_table || typeof current_table == "number";

		// Create a new table, but never create a "basic" table even if it doesn't exist
		// (because if it doesn't exist, it shouldn't!)
		if (tables[current_table] == null && current_table != "basic" && is_present){
		        var needs = cell.textContent.split("\n")[8].split("|");
		        var res_need = new Array(4);
			for (i=0; i<4; i++) res_need[i] = parseInt(needs[i]);

			// Create a new table based on the resource requirements for this cell
			var tech = cell.textContent.split("\n")[4];
			if (tech.indexOf(" (") != -1) tech = tech.split(" (")[0];
		        tables[current_table] = createTable(res_need, tech);
			debug(d_med, "new element "+current_table);
		}

		// if there has been no change, don't need to replace the table
		if (last_table == current_table && !(is_past ^ is_present)) return;

		// The table being displayed is switching from 'last_table' to 'current_table'
		if (is_past && is_present){
		        disp.insertBefore (tables[current_table], tables[last_table]);
			disp.removeChild (tables[last_table]);
		} else if (is_present){ // but not 'is_past'
		        disp.appendChild(tables[current_table]);
		} else { //if (is_past) // but not 'is_present'
		        disp.removeChild(tables[last_table]);
		}

		last_table = current_table;
	    }, false);
}
 
if ( navigator.appName == 'Opera' ) {
            eventSource = document;
} else {
            eventSource = window;
}

eventSource.addEventListener( 'load', function( e ) {
	    var results = xpathEval('//td[@id]/text()');
            if (results.snapshotLength == 0) {return;}
                        
	    for (var i=0; i<4; i++){
		    res[i] = parseInt(results.snapshotItem(i).data.split('/'));
		    res_p[i] = parseInt(results.snapshotItem(i).parentNode.title);
		    res_stock[i] = parseInt(results.snapshotItem(i).data.split('/')[1]);
	    }

	    var all_tables = xpathEval('//table[@class="f10"]');
	    var i, item;

	    // Figure out how many resources are needed; res_need
	    var res_need = new Array(4);
	    var disp = findDisp(all_tables);
	    var needs = disp.textContent.split(" | ");
	    for (i=0; i<4; i++) res_need[i] = parseInt(needs[i]);

	    // Don't display anything if you have all the resources you need
	    for (i=0; i<4; i++) if (res[i] < res_need[i]) break;

	    if (i != 4){
		    tables["basic"] = createTable(res_need, false);
		    last_table = "basic";

		    disp.appendChild(tables["basic"]);
	    }

	    var b_name = buildingName();
	    switch (b_name){
		// These are all the troop-producing buildings
	    case "Barracks": case "Stable": case "Siege Workshop":
	    case "Residence": case "Palace": case "Hero's Mansion":
	    case "Great Barracks": case "Great Stable": case "Trapper":
		// These are the research buildings
	    case "Academy": case "Blacksmith": case "Armory":
		    // Add the mouseover events...
		    for (i=0; i < all_tables.snapshotLength; i++){
			    item = all_tables.snapshotItem(i);
			    // We should probably improve this conditional...
			    // This is supposed to check if the table is a tech or not
			    //dbg(item.textContent);
			    if (item.textContent[0] == '\n'){
				    addMouseover(item, i);
			    }
		    }
		    // Add the clear box to reset...
		    var clear_box = xpathEval('//tr[@class="cbg1"]');
		    //dbg(clear_box.snapshotItem(0).textContent);
		    addMouseover(clear_box.snapshotItem(0), last_table);
		    break;
	    default: break;
	    }
},false);
