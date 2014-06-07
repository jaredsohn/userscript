// ==UserScript==
// @name		More DeVo+
// @version		0.01
// @description		custom evolution enhancements
// @include		http://ev5-dev.neondragon.net/fleets*
// @author		podd
// @author              The Ey3
// ==/UserScript==

/*
  * Revision 0.01a  The Ey3 - edits for devo
 * Revision 0.01  Merry Xmas 2006 podd
 * License: GPL: http://www.gnu.org/copyleft/gpl.html
*/

GM_log("moreevoplus start");

// the clock, set to UTC, just getHours() will give you localtime if you have timezone issues
window.evoschedulerclock = function() {

	var thetime=new Date();
	var nhours=thetime.getUTCHours();
	var nmins=thetime.getMinutes();
	var nsecs=thetime.getSeconds();

	inputhours.value = nhours;
	inputminutes.value = nmins;
	inputseconds.value = nsecs;

	// if clock = settime trigger
	// bug: sometimes get linput errors depending on clock position
	if ( inputhours.value == linputhours.value && inputminutes.value == linputminutes.value) {
		linputhours.value = "D";
		linputminutes.value = "D";
		submitformviatimer();
	}
}

// toggle launch-recall buttons and start to build proper POST
// ?maybe use DOM attribute for checked?
unsafeWindow.launchfn = function(fleetnumber,elementnumber,opposite,event) {
		var element2change = (6 * (fleetnumber - 1)) + 5;
		var newname = "";
		var newvalue = "";
	if (document.forms[6].elements[elementnumber].checked == true) {
		document.forms[6].elements[opposite].checked = false;
		if (event == 1) {
			newname = "f_submit[" + fleetnumber + "]";
			newvalue = "Launch";
			}
			else {
			newname = "f_return[" + fleetnumber + "]";
			newvalue = "Abort Mission";
			}
		document.forms[5].elements[element2change].name = newname;
		document.forms[5].elements[element2change].value = newvalue;
	}
	else {
		newname = "remove";
		newvalue = "remove";
		document.forms[5].elements[element2change].name = newname;
		document.forms[5].elements[element2change].value = newvalue;
	}
}

// merge the next two submit functions

// clean up post for server processing via timer
window.submitformviatimer = function() {
	var tempcounter = 0;
	var submitform = document.forms[5];
	for (x=0;x<3;x++) {
		var submitelement = (tempcounter * (-5)) + (6 * x) + 5;
		if (submitform.elements[submitelement].value == "Abort Mission") {
			for ( y = tempcounter;y < (5 + tempcounter);y++) {
				var goodbye = submitform.elements[tempcounter];
				goodbye.parentNode.removeChild(goodbye);
			}
			tempcounter++;
		}
	}
	for (x=0;x<submitform.elements.length;x++) {
	if(submitform.elements[x].value == "remove"){
		for (y=0;y<4;y++){
			submitform.elements[(x-y-1)].value="";
			}
		var goodbye = submitform.elements[x];
		goodbye.parentNode.removeChild(goodbye);
		}
	}
submitform.submit();
return false;
}

// clean up post for server processing via button
unsafeWindow.submitit = function() {
	var tempcounter = 0;
	var submitform = document.forms[5];
	for (x=0;x<3;x++) {
		var submitelement = (tempcounter * (-5)) + (6 * x) + 5;
		if (submitform.elements[submitelement].value == "Abort Mission") {
			for ( y = tempcounter;y < (5 + tempcounter);y++) {
				var goodbye = submitform.elements[tempcounter];
				goodbye.parentNode.removeChild(goodbye);
			}
			tempcounter++;
		}
	}
	for (x=0;x<submitform.elements.length;x++) {
	if(submitform.elements[x].value == "remove"){
		for (y=0;y<4;y++){
			submitform.elements[(x-y-1)].value="";
			}
		var goodbye = submitform.elements[x];
		goodbye.parentNode.removeChild(goodbye);
		}
	}
submitform.submit();
return false;
}

// quick launch function
unsafeWindow.qlaunchfn = function(fleet) {
var qstring = document.forms[4].elements[fleet - 1].value;
for (x=0;x<4;x++){
	var littlestring = qstring.substring(x,x+1);
	document.forms[5].elements[(6 * (fleet-1)) + x].value = littlestring;
	}
document.forms[5].elements[(6 * (fleet-1)) + 4].value="att3";
}

// create clockform element
var clockform = document.createElement("div");
clockform.align = 'center';
clockform.innerHTML = '<form name="clockform">Current time: <input type="text" name="hours" size="2" maxlength="2"> hours, <input type="text" name="minutes" size="2" maxlength="2"> minutes, <input type="text" name="seconds" size="2" maxlength="2"> seconds</form><form name="launchform">&nbsp;&nbsp;Launch time: <input type="text" name="hours" size="2" maxlength="2"> hours, <input type="text" name="minutes" size="2" maxlength="2"> minutes&nbsp; <input type="submit" name="launch_now" value="Launch Now" onclick="submitit(); return false;"></form>';
 
// create launch grid elements
    
qlaunch_html = '<form action="" name="qlaunch">'
+ ''
+ '<table class="t_little b" border="0" cellpadding="0" cellspacing="1" align="center">'
+ '<tr><td><div class="separator title"><span>&nbsp;</span></div></td></tr>'
+ '<tr>'
+ '	<td class="alt1" align="center">xyzc</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 1 -->'
+ '<tr class="red_bg row1">'
+ '	<td nowrap>'
+ '		<input name="qlaunch[1]" value="" onBlur="qlaunchfn(1);" type="text" size="4" maxlength="4">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 2 -->'
+ '<tr class="yellow_bg row1">'
+ '	<td nowrap>'
+ '		<input name="qlaunch[2]" value="" onBlur="qlaunchfn(2);" type="text" size="4" maxlength="4">'
+ '	</td>'
+ ''
+ '</tr>'
+ ''
+ '<!-- Fleet 3 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>'
+ '		<input name="qlaunch[3]" value="" onBlur="qlaunchfn(3);" type="text" size="4" maxlength="4">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 4 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>'
+ '		<input name="qlaunch[4]" value="" onBlur="qlaunchfn(4);" type="text" size="4" maxlength="4">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 5 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>'
+ '		<input name="qlaunch[5]" value="" onBlur="qlaunchfn(5);" type="text" size="4" maxlength="4">'
+ '	</td>'
+ '</tr>'
+ '</table>'
+ '</form>';

launch_grid_html = '<form align="left" name="launchform" method="post">'
+ ''
+ '<table class="t_little b" border="0" cellpadding="0" cellspacing="1" align="center">'
+ '<tr><td colspan="4"><div class="separator title"><span>Launch Grid</span></div></td></tr>'
+ '<tr>'
+ '	<td class="alt1"></td>'
+ '	<td class="alt1">Heading</td>'
+ '	<td class="alt1">Objective</td>'
+ '	<td class="alt1">&nbsp;</td>'
+ ''
+ '</tr>'
+ ''
+ '<!-- Fleet 1 -->'
+ '<tr class="red_bg row1">'
+ '	<td nowrap>Fleet 1&nbsp;</td>'
+ '	<td nowrap>(<input size="2" maxlength="3" name="f_x[1]" id="fleetx1" type="text">,<input size="2" maxlength="2" name="f_y[1]" id="fleety1" type="text">,<input size="2" maxlength="2" name="f_z[1]" id="fleetz1" type="text">:<input size="1" maxlength="1" name="f_c[1]" type="text">)</td>'
+ ''
+ '	<td>'
+ '		<select name="f_mission[1]">'
+ '			<option selected="selected" value="">Select</option>'
+ '			<option value="att3" style="background-color: darkred; color: white;">3 tick Attack</option>'
+ '			<option value="att2" style="background-color: darkred; color: white;">2 tick Attack</option>'
+ '			<option value="att1" style="background-color: darkred; color: white;">1 tick Attack</option>'
+ '			<option value="def1" style="background-color: darkgreen; color: white;">1 tick Defence</option>'
+ '			<option value="def2" style="background-color: darkgreen; color: white;">2 tick Defence</option>'
+ '			<option value="def3" style="background-color: darkgreen; color: white;">3 tick Defence</option>'
+ '			<option value="def4" style="background-color: darkgreen; color: white;">4 tick Defence</option>'
+ '			<option value="def5" style="background-color: darkgreen; color: white;">5 tick Defence</option>'
+ '			<option value="def6" style="background-color: darkgreen; color: white;">6 tick Defence</option>'
+ '		</select>'
+ '	</td>'
+ '	<td nowrap>'
+ '		<input name="f_submit[1]" value="Launch" type="hidden">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 2 -->'
+ '<tr class="yellow_bg row1">'
+ '	<td nowrap>Fleet 2&nbsp;</td>'
+ ''
+ '	<td nowrap>(<input size="2" maxlength="3" name="f_x[2]" id="fleetx1" type="text">,<input size="2" maxlength="2" name="f_y[2]" id="fleety1" type="text">,<input size="2" maxlength="2" name="f_z[2]" id="fleetz1" type="text">:<input size="1" maxlength="1" name="f_c[2]" type="text">)</td>'
+ '	<td>'
+ '		<select name="f_mission[2]">'
+ '			<option selected="selected" value="">Select</option>'
+ '			<option value="att3" style="background-color: darkred; color: white;">3 tick Attack</option>'
+ '			<option value="att2" style="background-color: darkred; color: white;">2 tick Attack</option>'
+ '			<option value="att1" style="background-color: darkred; color: white;">1 tick Attack</option>'
+ '			<option value="def1" style="background-color: darkgreen; color: white;">1 tick Defence</option>'
+ '			<option value="def2" style="background-color: darkgreen; color: white;">2 tick Defence</option>'
+ '			<option value="def3" style="background-color: darkgreen; color: white;">3 tick Defence</option>'
+ '			<option value="def4" style="background-color: darkgreen; color: white;">4 tick Defence</option>'
+ '			<option value="def5" style="background-color: darkgreen; color: white;">5 tick Defence</option>'
+ '			<option value="def6" style="background-color: darkgreen; color: white;">6 tick Defence</option>'
+ '		</select>'
+ '	</td>'
+ '	<td nowrap>'
+ '		<input name="f_submit[2]" value="Launch" type="hidden">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 3 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>Fleet 3&nbsp;</td>'
+ '	<td nowrap>(<input size="2" maxlength="3" name="f_x[3]" id="fleetx1" type="text">,<input size="2" maxlength="2" name="f_y[3]" id="fleety1" type="text">,<input size="2" maxlength="2" name="f_z[3]" id="fleetz1" type="text">:<input size="1" maxlength="1" name="f_c[3]" type="text">)</td>'
+ '	<td>'
		+ '<select name="f_mission[3]">'
+ ''
+ '			<option selected="selected" value="">Select</option>'
+ '			<option value="att3" style="background-color: darkred; color: white;">3 tick Attack</option>'
+ '			<option value="att2" style="background-color: darkred; color: white;">2 tick Attack</option>'
+ '			<option value="att1" style="background-color: darkred; color: white;">1 tick Attack</option>'
+ '			<option value="def1" style="background-color: darkgreen; color: white;">1 tick Defence</option>'
+ '			<option value="def2" style="background-color: darkgreen; color: white;">2 tick Defence</option>'
+ '			<option value="def3" style="background-color: darkgreen; color: white;">3 tick Defence</option>'
+ '			<option value="def4" style="background-color: darkgreen; color: white;">4 tick Defence</option>'
+ '			<option value="def5" style="background-color: darkgreen; color: white;">5 tick Defence</option>'
+ '			<option value="def6" style="background-color: darkgreen; color: white;">6 tick Defence</option>'
+ '		</select>'
+ '	</td>'
+ '	<td nowrap>'
+ ''
+ '		<input name="f_submit[3]" value="Launch" type="hidden">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 4 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>Fleet 4&nbsp;</td>'
+ '	<td nowrap>(<input size="2" maxlength="3" name="f_x[4]" id="fleetx1" type="text">,<input size="2" maxlength="2" name="f_y[4]" id="fleety1" type="text">,<input size="2" maxlength="2" name="f_z[4]" id="fleetz1" type="text">:<input size="1" maxlength="1" name="f_c[4]" type="text">)</td>'
+ '	<td>'
		+ '<select name="f_mission[4]">'
+ ''
+ '			<option selected="selected" value="">Select</option>'
+ '			<option value="att3" style="background-color: darkred; color: white;">3 tick Attack</option>'
+ '			<option value="att2" style="background-color: darkred; color: white;">2 tick Attack</option>'
+ '			<option value="att1" style="background-color: darkred; color: white;">1 tick Attack</option>'
+ '			<option value="def1" style="background-color: darkgreen; color: white;">1 tick Defence</option>'
+ '			<option value="def2" style="background-color: darkgreen; color: white;">2 tick Defence</option>'
+ '			<option value="def3" style="background-color: darkgreen; color: white;">3 tick Defence</option>'
+ '			<option value="def4" style="background-color: darkgreen; color: white;">4 tick Defence</option>'
+ '			<option value="def5" style="background-color: darkgreen; color: white;">5 tick Defence</option>'
+ '			<option value="def6" style="background-color: darkgreen; color: white;">6 tick Defence</option>'
+ '		</select>'
+ '	</td>'
+ '	<td nowrap>'
+ ''
+ '		<input name="f_submit[4]" value="Launch" type="hidden">'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 5 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>Fleet 5&nbsp;</td>'
+ '	<td nowrap>(<input size="2" maxlength="3" name="f_x[5]" id="fleetx1" type="text">,<input size="2" maxlength="2" name="f_y[5]" id="fleety1" type="text">,<input size="2" maxlength="2" name="f_z[5]" id="fleetz1" type="text">:<input size="1" maxlength="1" name="f_c[5]" type="text">)</td>'
+ '	<td>'
		+ '<select name="f_mission[5]">'
+ ''
+ '			<option selected="selected" value="">Select</option>'
+ '			<option value="att3" style="background-color: darkred; color: white;">3 tick Attack</option>'
+ '			<option value="att2" style="background-color: darkred; color: white;">2 tick Attack</option>'
+ '			<option value="att1" style="background-color: darkred; color: white;">1 tick Attack</option>'
+ '			<option value="def1" style="background-color: darkgreen; color: white;">1 tick Defence</option>'
+ '			<option value="def2" style="background-color: darkgreen; color: white;">2 tick Defence</option>'
+ '			<option value="def3" style="background-color: darkgreen; color: white;">3 tick Defence</option>'
+ '			<option value="def4" style="background-color: darkgreen; color: white;">4 tick Defence</option>'
+ '			<option value="def5" style="background-color: darkgreen; color: white;">5 tick Defence</option>'
+ '			<option value="def6" style="background-color: darkgreen; color: white;">6 tick Defence</option>'
+ '		</select>'
+ '	</td>'
+ '	<td nowrap>'
+ ''
+ '		<input name="f_submit[5]" value="Launch" type="hidden">'
+ '	</td>'
+ '</tr>'
+ '</table>'
+ '</form>';

launch_or_recall_html = '<form align="" action="http://ev5-dev.neondragon.net/fleets" name="abortform" method="post" target="fleets">'
+ ''
+ '<table class="t_little b" border="0" cellpadding="0" cellspacing="1" align="center">'
+ '<tr><td><div class="separator title"><span>Abort Grid</span></div></td></tr>'
+ '<tr>'
+ '	<td class="alt1">&nbsp;</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 1 -->'
+ '<tr class="red_bg row1">'
+ '	<td nowrap>'
+ '		<input name="f_submit[1]" value="Launch" onClick="launchfn(1,0,1,1);" type="checkbox" checked> Launch&nbsp;'
+ '		<input name="f_return[1]" value="Abort Mission" type="checkbox" onClick="launchfn(1,1,0,0);"> Abort&nbsp;'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 2 -->'
+ '<tr class="yellow_bg row1">'
+ '	<td nowrap>'
+ '		<input name="f_submit[2]" value="Launch" onClick="launchfn(2,2,3,1);" type="checkbox" checked> Launch&nbsp;'
+ '		<input name="f_return[2]" value="Abort Mission" type="checkbox" onClick="launchfn(2,3,2,0);"> Abort&nbsp;'
+ '	</td>'
+ ''
+ '</tr>'
+ ''
+ '<!-- Fleet 3 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>'
+ '		<input name="f_submit[3]" value="Launch"  onClick="launchfn(3,4,5,1);" type="checkbox" checked> Launch&nbsp;'
+ '		<input name="f_return[3]" value="Abort Mission" type="checkbox" onClick="launchfn(3,5,4,0);"> Abort&nbsp;'
+ '	</td>'
+ ''
+ '<!-- Fleet 4 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>'
+ '		<input name="f_submit[4]" value="Launch"  onClick="launchfn(3,4,5,1);" type="checkbox" checked> Launch&nbsp;'
+ '		<input name="f_return[4]" value="Abort Mission" type="checkbox" onClick="launchfn(3,5,4,0);"> Abort&nbsp;'
+ '	</td>'
+ '</tr>'
+ ''
+ '<!-- Fleet 5 -->'
+ '<tr class="green_bg row1">'
+ '	<td nowrap>'
+ '		<input name="f_submit[5]" value="Launch"  onClick="launchfn(3,4,5,1);" type="checkbox" checked> Launch&nbsp;'
+ '		<input name="f_return[5]" value="Abort Mission" type="checkbox" onClick="launchfn(3,5,4,0);"> Abort&nbsp;'
+ '	</td>'
+ '</tr>'
+ '</table>'
+ '</form>';

// build container table
mytable = document.createElement("table");
mytablebody = document.createElement("tbody");
myfirst_row = document.createElement("tr");

qlaunch_cell = document.createElement("td");
// appends the launch grid into the 1st cell <td>
qlaunch_cell.innerHTML = qlaunch_html;
// appends the cell <td> into the row <tr>
qlaunch_cell.align="right";
myfirst_row.appendChild(qlaunch_cell);

launch_cell = document.createElement("td");
// appends the launch grid into the 1st cell <td>
launch_cell.innerHTML = launch_grid_html;
// appends the cell <td> into the row <tr>
launch_cell.align="right";
myfirst_row.appendChild(launch_cell);

recall_cell = document.createElement("td");
// appends the launch or recall grid into the 2nd cell <td>
recall_cell.innerHTML = launch_or_recall_html;
// appends the cell <td> into the row <tr>
recall_cell.align="left";
myfirst_row.appendChild(recall_cell);

// appends the row <tr> into <tbody>
mytablebody.appendChild(myfirst_row);
// appends <tbody> into <table>
mytable.appendChild(mytablebody);

// sets the border attribute of mytable to 2;
mytable.setAttribute("border", "0");
mytable.align="center";

// find <h1 class="title">
var nodes = document.evaluate(
     "//h1[@class='title']",
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);

// add content before first (&only?) title
node = nodes.snapshotItem(0);
// append clock
node.parentNode.insertBefore(clockform, node);
// appends <table>
node.parentNode.insertBefore(mytable, node);

// build timer form elements - ?move to top?
var form = document.forms.namedItem("clockform");
var inputhours = form.elements.namedItem("hours");
var inputminutes = form.elements.namedItem("minutes");
var inputseconds = form.elements.namedItem("seconds");

var lform = document.forms.namedItem("launchform");
var linputhours = lform.elements.namedItem("hours");
var linputminutes = lform.elements.namedItem("minutes");
var linputseconds = lform.elements.namedItem("seconds");

// run clock, no real reason for every second 
setInterval(evoschedulerclock, 999);
  
GM_log("moreevoplus Finished");