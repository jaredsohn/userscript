// ==UserScript==
// @name           Bob the Builder
// @namespace      Conster
// @description    Auto-builds your Pachinko machine for you
// @include        http://*animecubed.com/billy/bvs/partyhouse-pachinkomake.html
// ==/UserScript==
var times = [];
var playername = "";
loadPlayerName();
var progress = 0;	var pins = [];
var rows = [];		rows[0] = [];	
rows[1] = [];	rows[2] = [];	rows[3] = [];	rows[4] = [];	rows[5] = [];	rows[6] = [];	rows[7] = [];	rows[8] = [];
rows[1][0] = 0;	rows[2][0] = 0;	rows[3][0] = 0;	rows[4][0] = 0;	rows[5][0] = 0;	rows[6][0] = 0;	rows[7][0] = 0;	rows[8][0] = 0;

//CHANGE THE FOLLOWING VALUES TO BUILD YOUR OWN MACHINE
var balltype = 3;		//2: Bronze; 3: Silver; 4: Gold
var startwidth = 6;		//3-6
var lengthchanges = "1101010";	//length has to be 2-8 at all times - only up to 7 rows (plus the top row makes 8) allowed
var name = "My Little Pachi";	//15 characters maximum
var limit = 10;			//time limit - between 2 and 10 minutes
var lock1 = "Lock1";		times[1] = 50;		//name and timer of Lock 1
var lock2 = "Lock2";		times[2] = 25;		//name and timer of Lock 2
var lock3 = "Lock3";		times[3] = 50;		//name and timer of Lock 3
var lock4 = "Lock4";		times[4] = 25;		//name and timer of Lock 4
var lock5 = "Lock5";		times[5] = 10;		//name and timer of Lock 5
//layout description: each pin's description has a "-" in it, with something behind it, and possibly something before it
//BEFORE THE -
//		(nothing)	Blank
//LW:X		X = 1-100	Left Wheel with X% chance to activate
//RW:X		X = 1-100	Right Wheel with X% chance to activate
//G:X		X = 1-99	Gate with X% chance to let ball through
//J:X:Y		X > 0, Y = 1-5	Jackpot with 1 in X chance to open Lock number Y
//L:Y		Y = 1-5		Lock number Y
//AFTER THE -
//X		X = 0-100	Pin with X% chance to fall right
//C				Chute
//D				Drain
//P:Y		Y = 1-5		Prize number Y
//F:Y		Y = 1-5		FinalPrize number Y
//coordinates which are invalid can be ignored - the script will not attempt to use them
//Adjusting the edge pins to 0 or 100 won't be necessary either - the script will do that for you
//HOWEVER, you MUST change the bottom row to have a prize, final prize, or drain
//if you don't, the script will assume you made a mistake and warn you
//Also, the row above the bottom row can't have Chutes
rows[1][1] = "-50";		rows[1][2] = "-50";		rows[1][3] = "-50";		rows[1][4] = "-50";
rows[1][5] = "-50";		rows[1][6] = "-50";		rows[1][7] = "-50";		rows[1][8] = "-50";
	rows[2][1] = "-50";			rows[2][2] = "-50";		rows[2][3] = "-50";		rows[2][4] = "-50";
	rows[2][5] = "-50";			rows[2][6] = "-50";		rows[2][7] = "-50";		rows[2][8] = "-50";
rows[3][1] = "-50";		rows[3][2] = "-50";		rows[3][3] = "-50";		rows[3][4] = "-50";
rows[3][5] = "-50";		rows[3][6] = "-50";		rows[3][7] = "-50";		rows[3][8] = "-50";
	rows[4][1] = "-50";		rows[4][2] = "-50";		rows[4][3] = "-50";		rows[4][4] = "-50";
	rows[4][5] = "-50";		rows[4][6] = "-50";		rows[4][7] = "-50";		rows[4][8] = "-50";
rows[5][1] = "-50";		rows[5][2] = "-50";		rows[5][3] = "-50";		rows[5][4] = "-50";
rows[5][5] = "-50";		rows[5][6] = "-50";		rows[5][7] = "-50";		rows[5][8] = "-50";
	rows[6][1] = "-50";		rows[6][2] = "-50";		rows[6][3] = "-50";		rows[6][4] = "-50";
	rows[6][5] = "-50";		rows[6][6] = "-50";		rows[6][7] = "-50";		rows[6][8] = "-50";
rows[7][1] = "-50";		rows[7][2] = "-50";		rows[7][3] = "-50";		rows[7][4] = "-50";
rows[7][5] = "-50";		rows[7][6] = "-50";		rows[7][7] = "-50";		rows[7][8] = "-50";
	rows[8][1] = "-D";	rows[8][2] = "-D";	rows[8][3] = "-D";	rows[8][4] = "-D";
	rows[8][5] = "-D";	rows[8][6] = "-D";	rows[8][7] = "-D";	rows[8][8] = "-D";

function loadPlayerName() {
	try {
		var temp = document.getElementsByName("player")[1];
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playername = temp.value;
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function pin_settings(row, pin, top, bottom) {
	var evalstr = "//option [@value="+row+"]";
	document.evaluate(evalstr,document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).selected = true;
	evalstr = "//option [@value="+pin+"]";
	document.evaluate(evalstr,document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).selected = true;
	if (top == "") {	//blank top - do nothing
	} else {
		var topelements = top.split(":");
		if (top.indexOf("LW") == 0) {	//Left Wheel
			document.evaluate("//input [@name='pintop' and @value = '2']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
			document.evaluate("//input [@name='lwheel']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = topelements[1];
		} else if (top.indexOf("RW") == 0) {	//Right Wheel
			document.evaluate("//input [@name='pintop' and @value = '3']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
			document.evaluate("//input [@name='rwheel']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = topelements[1];
		} else if (top.indexOf("G") == 0) {	//Gate
			document.evaluate("//input [@name='pintop' and @value = '4']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
			document.evaluate("//input [@name='gate']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = topelements[1];
		} else if (top.indexOf("J") == 0) {	//Jackpot
			document.evaluate("//input [@name='pintop' and @value = '5']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
			document.evaluate("//input [@name='jackchance']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = topelements[1];
			document.evaluate("//input [@name='jacklock']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = topelements[2];
		} else if (top.indexOf("L") == 0) {	//Lock
			document.evaluate("//input [@name='pintop' and @value = '6']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
			document.evaluate("//input [@name='locknum']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = topelements[1];
		}
	}
	var problem = false;
	var bottomelements = bottom.split(":");
	if (bottom.indexOf("C") == 0) {		//Chute
		if (row == lengthchanges.length+1) {//in the bottom row - you messed up
			problem = true;
			bottom_alert(row,pin);
		} else if (row == lengthchanges.length) {//can't have chutes in second-last row
			chute_alert(row,pin);
		} else {
			document.evaluate("//input [@name='pinbot' and @value = '2']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
		}
	} else if (bottom.indexOf("D") == 0) {	//Drain
		document.evaluate("//input [@name='pinbot' and @value = '3']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
	} else if (bottom.indexOf("P") == 0) {	//Prize
		document.evaluate("//input [@name='pinbot' and @value = '4']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
		document.evaluate("//input [@name='prizenum']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = bottomelements[1];
	} else if (bottom.indexOf("F") == 0) {	//Final Prize
		document.evaluate("//input [@name='pinbot' and @value = '5']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
		document.evaluate("//input [@name='sprizenum']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = bottomelements[1];
	} else {				//Regular Pin
		//remember to check if you're on an edge - if so, overwrite the regular number
		if (row == lengthchanges.length+1) {//in the bottom row - you messed up
			problem = true;
			bottom_alert(row,pin);
		} else {
			if (pin == 1 && pins[row-1] > pins[row]) {
				//leftmost pin, next row is more narrow - 100%
				bottomelements[0] = 100;
			} else if (pin == pins[row-1] && pins[row-1] > pins[row]) {
				//rightmost pin, next row is more narrow - 0%
				bottomelements[0] = 0;
			}
			document.evaluate("//input [@name='pinnum']",document, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = bottomelements[0];
		}
	}
	if (!problem) {
		progress++;
	}
	GM_setValue(playername+"_progress",progress);
	if (!problem) {
		var v = document.forms.namedItem("setmachinec");
		v.wrappedJSObject.submit();
	}
}

function bottom_alert(row, pin) {
	alert(row+","+pin+":\nCan only have Drains, Prizes and Final Prizes in bottom row!");
}

function chute_alert(row, pin) {
	alert(row+","+pin+":\nCan't have Chutes in second-last row!");
}

function process_event(event) {
	if (event.keyCode == 66) {		//b for "build"
		//check progress, advance, stuff like that
		progress = GM_getValue(playername+"_progress", 0);
		var totalpins = 0;	var width = startwidth;
		pins = [];
		for (var i = 0; i < lengthchanges.length; i++) {
			pins[i] = width;
			totalpins += width;
			width += parseInt(lengthchanges.substring(i,i+1))*2-1;
		}
		pins[lengthchanges.length] = width;
		totalpins += width;
		var thisrow = 0;	var thispininrow = 0;	var donewiththispin = false;
		while(!donewiththispin) {
			if (progress < totalpins) {
				var whichpin = 0;
				var i = 0;
				while (whichpin + pins[i] <= progress) {
					whichpin += pins[i];
					i++;
				}
				thisrow = i+1;
				var thispininrow = progress - whichpin + 1;
				var currentpin = rows[thisrow][thispininrow].split("-");
				//check if we can skip this one: blank, 50% on non-edge or 0%/100% on right/left edge
				if (currentpin[0].length == 0) {	//blank top
					if (currentpin[1] == "50") {	//50% odds, or 0%/100% if on right/left edge...
						if (thisrow == lengthchanges.length+1) {//in the bottom row - you messed up
							bottom_alert(thisrow,thispininrow);
							donewiththispin = true;
						} else {
							progress++;		//otherwise, do nothing
						}
					} else if (currentpin[1] == "100") {	//100% of falling right
						if (thisrow == lengthchanges.length+1) {//in the bottom row - you messed up
							bottom_alert(thisrow,thispininrow);
							donewiththispin = true;
						} else {
							if (thispininrow == 1 && pins[thisrow-1] > pins[thisrow]) {
								//leftmost pin, next row is more narrow - do nothing
								progress++;
							} else {	//doesn't use default values
								pin_settings(thisrow,thispininrow,currentpin[0],currentpin[1]);
								donewiththispin = true;
							}
						}
					} else if (currentpin[1] == "0") {	//0% of falling right
						if (thisrow == lengthchanges.length+1) {//in the bottom row - you messed up
							bottom_alert(thisrow,thispininrow);
							donewiththispin = true;
						} else {
							if (thispininrow == pins[thisrow-1] && pins[thisrow-1] > pins[thisrow]) {
								//rightmost pin, next row is more narrow - do nothing
								progress++;
							} else {	//doesn't use default values
								pin_settings(thisrow,thispininrow,currentpin[0],currentpin[1]);
								donewiththispin = true;
							}
						}
					} else {	//doesn't use a Pin with default values
						//however, could still be a Drain on the bottom row, which is also default
						if ((currentpin[1] == "D") && (thisrow == lengthchanges.length+1)) {
							progress++;
						} else {
							pin_settings(thisrow,thispininrow,currentpin[0],currentpin[1]);
							donewiththispin = true;
						}
					}
				} else {	//not a blank top
					pin_settings(thisrow,thispininrow,currentpin[0],currentpin[1]);
					donewiththispin = true;
				}
			} else {	//already done with the machine
				donewiththispin = true;
				alert("already done!");
			}
		}
	} else if (event.keyCode == 82) {	//r for "reset"
		//set progress to 0, store, adjust initial settings
		GM_setValue(playername+"_progress",0);
		document.evaluate("//input [@name='p_ball_type']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = balltype;
		document.evaluate("//input [@name='p_start_size']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = startwidth;
		document.evaluate("//input [@name='p_bs_line']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = lengthchanges;
		document.evaluate("//input [@name='p_flag_1']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = lock1;
		document.evaluate("//input [@name='p_flag_2']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = lock2;
		document.evaluate("//input [@name='p_flag_3']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = lock3;
		document.evaluate("//input [@name='p_flag_4']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = lock4;
		document.evaluate("//input [@name='p_flag_5']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = lock5;
		document.evaluate("//input [@name='p_flag_timers']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value 
			= times[1]+","+times[2]+","+times[3]+","+times[4]+","+times[5];
		document.evaluate("//input [@name='p_time_limit']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = limit;
		document.evaluate("//input [@name='changepsettings']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
		var v = document.forms.namedItem("setmachinea");
		v.wrappedJSObject.submit();
	} else if (event.keyCode == 67) {	//c for "clear"
		var notstartwidth = ((startwidth-2)%4)+3;
		document.evaluate("//input [@name='p_start_size']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = notstartwidth;
		document.evaluate("//input [@name='p_bs_line']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = "01";
		document.evaluate("//input [@name='changepsettings']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).checked = true;
		var v = document.forms.namedItem("setmachinea");
		v.wrappedJSObject.submit();
	} else if (event.keyCode == 78) {	//n for "name"
		document.evaluate("//input [@name='pmachinename']",document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value = name;
		var v = document.forms.namedItem("setmachinead");
		v.wrappedJSObject.submit();
	}
}
window.addEventListener("keyup", process_event, false);