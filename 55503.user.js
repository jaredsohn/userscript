// ==UserScript==
// @name			Timeline Assistant
// @namespace		http://userscripts.org/scripts/show/55503
// @include			http://www.btdinc.com/*

// ==/UserScript==
// version                     0.03 14 Aug 2009
var local_version = new Number(0.03);

/*	Ideas

	Zoom timelines
	Load/Save timeline files
*/

//	Variables
var tl_cols_qty = 0;
var tl_cols_usable_qty = 0;

var tl_rows_qty = 0;
var tl_rows_usable_qty = 0;




setup_screen();

//Add a Timeline
GM_setValue("tla_tl_str","");
tl_add("Joe Blow, Born, 1966, Graduate BHS, 1984, Employed BTD, 1987");
tl_add("Bob Smith, Born, 1895, Graduate TTT, 1905, Employed HTS, 1999|Test1|test2");


function setup_screen(){
	//Setup timeline screen
	var winL = 0;
	var winT = 0;
	var winHt = 50;
	var winWd = 100;
	
	var TLqty = 3;
	var TLlow = 0;
	var TLhigh = 100;
	
	var div_win = document.createElement('div_win');
	document.body.appendChild(div_win);
	div_win.id = "div_win";

	//Setup the grid
	var chr = ".";
	var resX = screen.availWidth;		//Whole Screen
	var resY = screen.availHeight;
	var scrX = window.innerWidth;		//What's Viewable
	var scrY = window.innerHeight;
	//GM_log("resX: " + resX);
	//GM_log("resY: " + resY);
	//GM_log("scrX: " + scrX);
	//GM_log("scrY: " + scrY);

	var borderXPx = 25;
	var borderYPx = 25;
	var headerYPx = 25;
	var labelColPx = parseInt(resX / 5);
	//GM_log("borderXPx: " + borderXPx);
	//GM_log("borderYPx: " + borderYPx);
	//GM_log("labelColPx: " + labelColPx);
	
	//Border Styles
	//var IBS = 'style="border-style:solid;border-color:red;"';
	var IBS = 'style="border-style:solid;border-color:transparent;"';				//Inner Border Style. *** Might want to switch 

	var dataColPx = parseInt((resX / resY) * 10) //15;	
	tl_cols_qty = parseInt((scrX - labelColPx - (borderXPx *2 )) / dataColPx);
	tl_cols_usable_qty = tl_cols_qty - 2;													//This leaves a blank column for both ends of the baselines
	tl_rows_qty = parseInt((scrY - headerYPx - (borderYPx * 2)) / (dataColPx * 1.3));	
	tl_rows_usable_qty = tl_rows_qty - 2;													//This leaves a blank row for top and bottom of screen
	GM_log("dataColPx: " + dataColPx);
	GM_log("tl_cols_qty: " + tl_cols_qty);
	GM_log("tl_rows_qty: " + tl_rows_qty);
	GM_log("------------------------------------------------------------------");

	var TLqty = 1;

	var t = new Array();
	t.push('<div id="win_html" style = "position: fixed; top:' + winT + 'px; left:' + winL + 'px; width:' + winWd + '%; background-color: #EEEEEE;" >');
	t.push('	<table border=2 cellspacing=0 style="border-color:gray;" width=' + winWd + '%>');
	t.push('		<tr><td>');
	t.push('			<center><b>Timeline Assistant<b></center></td><td valign=top width=50px><center><button id="btn_close" type="button" onClick="ta_close()"><font size=-2><b>X</b></font></button></center>');
	t.push('		</td></tr>');
	
				//Add Menu Bar
	t.push('	<tr><td colspan=2>');
	t.push('		<table border=0 cellpadding=0, cellspacing=0>');
	t.push('				<tr>');
	t.push('					<td><button type=button id="btn_tl_add" onClick="tl_add()">Add</button><td>');
	t.push('				</tr>');
	t.push('		</table>');
	t.push('	</td><tr>');

					//Display the grid
	t.push('	<tr><td colspan=2>');
	t.push('		<table border=1 cellpadding=0 cellspacing=0>');
						for (var i = 0; i < tl_rows_qty; i++){
	t.push('				<tr>');
								//Title Column
	t.push('					<td align=right width=' + labelColPx + 'px '+IBS+'><div id="tl_title_'+i+'">'+chr+'</div><td>');
								for (var ii = 0; ii < tl_cols_qty; ii++){
									//Data Columns
	t.push('						<td id="tlr'+i+'c'+ii+'" width=' + dataColPx + 'px '+IBS+'><div>'+chr+'</div></td>');
								}
	t.push('					</tr>');
							}
	t.push('		</table>');
	t.push('	</td></tr></table>');
	t.push('</div>');

	div_win.innerHTML = t.join('\n');

	var btn_close = document.getElementById("btn_close");
	btn_close.addEventListener("click", ta_close, false);

	var btn_tl_add = document.getElementById("btn_tl_add");
	btn_tl_add.addEventListener("click", tl_add, false);
}

function ta_close(){
	var div_win = document.getElementById("div_win");
	div_win.innerHTML = "";
}

function tl_add(TLstr){
	var old_tl_str = GM_getValue("tla_tl_str", "Scale");
	if (GM_getValue("tla_tl_str") == ""){old_tl_str = "Scale";}
	
	var new_tl_str = old_tl_str + "|" + TLstr;
	GM_setValue("tla_tl_str", new_tl_str);
	GM_log("new_tl_str: " + new_tl_str);
	
	tl_display();
}

function tl_display(){
	var tl_yr_high = 0;
	var tl_yr_low = 0;

	var new_tl_str = GM_getValue("tla_tl_str");
	TLarray = new_tl_str.split('|');
	var tl_qty = TLarray.length;
	GM_log("TLarray.length: " + tl_qty);

	
	//Pre-scan all timelines for low and high dates. We need to do this to correctly display all timelines
	for (var i = 0; i < TLarray.length; i++){
		var TLa = TLarray[i].split(',');
		for (var ii = 1; ii < TLa.length; (ii=ii+2)){
			var yr = TLa[ii+1];
			if (tl_yr_high == 0 && tl_yr_low == 0){	//Always initiate the low,high year
				tl_yr_high = TLa[ii+1];
				tl_yr_low = TLa[ii+1];
			}
			if (yr > tl_yr_high){tl_yr_high = yr;}
			if (yr < tl_yr_low){tl_yr_low = yr;}
		}
	}
	

	
	//Process all timelines
	for (var i = 0; i < TLarray.length; i++){
		GM_log("TLarray[" + i + "]: " + TLarray[i]);
		var TLa = TLarray[i].split(',');

		//Place the title
		var rows = tl_rows_qty - ((i+1) * 5) - 3;
		document.getElementById("tl_title_" + rows).innerHTML = "<span><b>" + TLa[0] + "&nbsp;&nbsp;<b></span>";

		//Place the baseline
		for (var ii = 1; ii < tl_cols_usable_qty; ii++){							//By starting at 1, we leave a blank column at the left.
			var aCell = document.getElementById('tlr' + rows + 'c' + ii);
			aCell.style.borderTopColor = "black";
			aCell.style.borderTopWidth = "3px";
		}

		//Place the data points
		for (var ii = 1; ii < TLa.length; (ii=ii+2)){

		}
	}
	
	//Calculate and draw the scale
	//	Default divisions is 50
	//	Assume zero position is always = tl_yr_low, last position is always = tl_yr_high
	//	For data points, Always scale to an int screen position for line and date label
	var div_ticks = 10;
	var div_cols = tl_cols_usable_qty +1;
	
	//Place the start and end tick lines
	var rows = tl_rows_qty - 8;
	GM_log("rows: " + rows);
	tick_add('tlr' + rows + 'c1');
	tick_add('tlr' + rows + 'c' + tl_cols_usable_qty);
	txt_add(tl_yr_low, 'tlr' + (rows - 1) + 'c' + tl_cols_qty);
	
	GM_log("tl_yr_high: " + tl_yr_high);
	GM_log("tl_yr_low: " + tl_yr_low);
}

function tick_add(aID){
	var aCell = document.getElementById(aID);
	aCell.style.borderLeftColor = "black";
	aCell.style.borderLeftWidth = "3px";
}

function txt_add(str, aID){
	var aCell = document.getElementById(aID);
	var div = document.createElement('div_' + aID);
	document.body.appendChild(div);
	div.innerHTML = '<div id="div_"' + aID + '">' + str + '</div>';
	div.left = aCell.left;
	div.top = aCell.top;
}

