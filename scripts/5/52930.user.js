// Island Zombja Bar
// version 0.93 
// 21-06-2009
// Copyright (c) 2009, Catprog
//
//Licensed for use in Billy zombjas 
//
//Any improvments to be sent to me at billy@catprog.org
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Island Zombja Bar", and click Uninstall.
//
//Written by catprog of http://www.catprog.org
//Customized by Sancdar of The Island village
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Island Zombja Bar 0.93
// @namespace     
// @description  Adds a detail bar to copy to a map program
// @include      http://www.animecubed.com/billy/bvs/zombjas.html
// @include      http://animecubed.com/billy/bvs/zombjas.html
// ==/UserScript==


//Calculate the time offset
var rightNow = new Date();
var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
var temp = jan1.toGMTString();
var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);


//start searching for information
var allTables, thisTable;
allTables = document.evaluate(
    "//table [@width='450']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

thisTable = allTables.snapshotItem(0);


    
allTables = document.evaluate(
    "//td [contains (., 'Zs:')] ",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);



var BarText = "";var Bar = '<table BGCOLOR="BLACK" >';
var TopText = "";var BotText = "";
	
for (var i = 3; i < allTables.snapshotLength; i++) {


	thisTD = allTables.snapshotItem(i);

	
	tempText =  thisTD.innerHTML;
    // do something with tempText
	
	
	
	var where_is_location=tempText.indexOf('i>');
	
	//terrain
	//BarText += tempText.substr(where_is_location+2,3) + " ";
	
	var where_is_semi=tempText.indexOf("Zs:")+4;
	var where_is_newline=tempText.indexOf('\n',where_is_semi);

	//Zs
	TopText +=  '<td><FONT COLOR="WHITE">' ;
	if(tempText.substr(where_is_semi,where_is_newline-where_is_semi) == "0"){
		TopText += "-";
	}else{
		TopText += tempText.substr(where_is_semi,where_is_newline-where_is_semi);
	}
	TopText +=  "</FONT></td>" ;
	
	var curdate = new Date()
	var hour = (curdate.getHours() - std_time_offset + 18) % 24;
	if(hour > 12){
		hour = (hour-12) + " pm"
	}else if(hour == 12){
		hour = (hour) + " pm"
	}else if(hour == 0){
		hour = (hour+12) + " am"
	}else{
		hour = (hour) + " am"	
	}

	TopText +=  '<td><FONT COLOR="WHITE">' ;
	TopText += hour ;
	TopText +=  "</FONT></td>" ;
	
	var where_is_zetta=tempText.indexOf('[Zetta]')
	
	BotText += '<td><FONT COLOR="WHITE">';
	
	if(where_is_zetta >0){
	
		where_is_zetta += 14; 
		
		var where_is_zetta_end=tempText.indexOf(']',where_is_zetta); 
		
		ZettaText = ";" + tempText.substr(where_is_zetta,where_is_zetta_end-where_is_zetta)
		
		
		ZettaArry = ZettaText.split("br");
		
		
		for (var j = 0; j < ZettaArry.length; j++) 
		{		
		
			za = ZettaArry[j];
		
		
			
			var where_is_greater=za.indexOf(';')+1; 
			var where_is_greater_end=za.indexOf('&',where_is_greater); 
					
			
			//Clean it up
			za = za.substr(where_is_greater,where_is_greater_end-where_is_greater);
			
			//get name and number of
			zaA = za.split(" "); 
			if(zaA[0] == "Thumpers:")
			{
				BotText += zaA[1] + zaA[0].substr(0,2) + ", ";
			}
			else
			{
				BotText += zaA[1] + zaA[0].substr(0,1) + ", ";
			}
			
			/*
			var where_is_semi=za.indexOf(':')+1; 
			
			alert(za + " -- " + where_is_greater + " -- " + za.substr(where_is_greater,3));
		
			BarText +=   // + " " + za.substr(where_is_semi,len-where_is_semi) ;
			*/
		}

		BotText = BotText.substr(0,(BotText.length - 2));
		
	}else{	
		BotText += "&nbsp;";
	}
	BotText += "</FONT></td><td></td>";
		
	
		
	
	if (i+1<  allTables.snapshotLength){
		BarText = BarText + "<br/>";
	}

	
	if( (i-3) % 3==2){
		Bar = Bar +  "<tr>" + TopText + "</tr><tr>" + BotText + "</tr>" ;
	
		TopText = "";
		BotText = "";
	}
	//Bar= 	Bar +  BarText;
}
	

	
doctext = document.body.innerHTML;


var where_is_ply=doctext.indexOf('name="player" value="')+21;
var where_is_endPly=doctext.indexOf('"',where_is_ply);


Bar=  Bar + "</table>";

if (thisTable) {
    newElement = document.createElement('span');
	
	newElement.innerHTML = Bar;
	
    thisTable.parentNode.insertBefore(newElement, thisTable);
}