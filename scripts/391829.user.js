// ==UserScript==
// @name        toolroom_status_page_alter
// @namespace   http://userscripts.org/scripts/show/test35999
// @description toolroom_status_page_alter
// @include     http://www.plexonline.com/*/Part/Production_Status.asp
// @include     https://www.plexonline.com/*/Part/Production_Status.asp
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version     1.4
// @grant       none
// ==/UserScript==

function btd_timer(){
	//Display a clock
	var d = new Date();
	var d = d.toLocaleTimeString().replace(/ /,'&nbsp;');
	$("#btd_timer").html("&nbsp;&nbsp;" + d);	
	var t = setTimeout("btd_timer()",1000);
}

$(document).ready(function(){
	var count = 0;
	var replaceColor = "#FFFFFF";
	$("tr.DefaultColor").each(function(){
		count = count + 1;
		if ($(this).html().search(/No Tool Room|No Machinist|No Setup|Part Problem|Die\/Fixture/gi) > -1){
			//Do Nothing. Leave it Red
		} else if ($(this).html().search(/Workcenter Stop/gi) > -1){
			if ($(this).html().search(/Broken\/Cracked|Doubled Up|Fault|Low|Miss-Located|Missing|Overload|Misfeed|Stuck/gi) > -1){
				//Do nothing its a parent contains the text: "Workcenter Stop" and is a status we want to show as red
			} else {
				$(this).find("td:first-child").css("background-color",replaceColor);
				$(this).find("td :nth-child(2)").parent().css("background-color",replaceColor);
			}
		} else if ($(this).html().search(/Open Idle /gi) > -1){
			$(this).find("td:first-child").css("background-color",replaceColor);
			$(this).find("td :nth-child(1)").parent().css("background-color",replaceColor);
			$(this).find("td :nth-child(2)").parent().css("background-color",replaceColor);
		} else {
			if ($(this).html().search(/Part Problem/gi) > -1){
				//Do nothing its a parent contains the text: "part problem" and is a status we want to show as red
			} else {
				//$(this).find("td :nth-child(0)").parent().css("background-color","orange");
				$(this).find("td:first-child").css("background-color",replaceColor);
				$(this).find("td :nth-child(2)").parent().css("background-color",replaceColor);
			}
		}
		$(this).find('td:contains("Open / Idle")').each(function(){
			$(this).css("background-color",replaceColor);
		});

	})

	var replaceColor = "#F6F6E6";	
	$("tr.AltColor").each(function(){
		count = count + 1;
		if ($(this).html().search(/No Tool Room|No Machinist|No Setup|Part Problem|Die\/Fixture/gi) > -1){
			//Do Nothing. Leave it Red
		} else if ($(this).html().search(/Workcenter Stop/gi) > -1){
			if ($(this).html().search(/Broken\/Cracked|Doubled Up|Fault|Low|Miss-Located|Missing|Overload|Misfeed|Stuck/gi) > -1){
				//Do nothing its a parent contains the text: "Workcenter Stop" and is a status we want to show as red
			} else {
				$(this).find("td:first-child").css("background-color",replaceColor);
				$(this).find("td :nth-child(2)").parent().css("background-color",replaceColor);
			}
		} else if ($(this).html().search(/Open \/ Idle/gi) > -1){
			$(this).find("td:first-child").css("background-color",replaceColor);
			$(this).find("td :nth-child(1)").parent().css("background-color",replaceColor);
			$(this).find("td :nth-child(2)").parent().css("background-color",replaceColor);
		} else {
			if ($(this).html().search(/Part Problem/gi) > -1){
				//Do nothing its a parent contains the text: "part problem" and is a status we want to show as red
			} else {
				//$(this).find("td :nth-child(0)").parent().css("background-color","orange");
				$(this).find("td:first-child").css("background-color",replaceColor);
				$(this).find("td :nth-child(2)").parent().css("background-color",replaceColor);
			}
		}
		
		$(this).find('td:contains("Open / Idle")').each(function(){
			$(this).css("background-color",replaceColor);
		});
	})

	//Setup the timer
	$("#FilterTableFilterTitleCenter").each(function(){
		if ($(this).html().search(/Production Status/) > -1){
			var html = "";
			html = html + "<table border=0 cellpadding=0 cellspacing=0>";
			html = html + "	<tr>";
			html = html + "		<td valign=top width=50%><div id='btd_timer'></div></td>";
			html = html + "		<td valign=bottom width=50%><div id='btd_header'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Production&nbsp;Status</div></td>";
			html = html + "	</tr>";
			html = html + "</table>";
			html = html + "<hr>";
			$(this).html(html);
			
			//Style the clock and the header
			$("#btd_timer").css("border","0px");
			$("#btd_timer").css("font-size","50px").css("font-weight","bold");
			$("#btd_timer").css("padding-bottom","10px");
			$("#btd_timer").css("padding-top","10px");
			$("#btd_header").css("font-size","25px").css("font-weight","bold");
			btd_timer();
		}
	});
	
	//Style the filter table
	$("#FilterTable td").css("border-bottom-width","0px");
	$("#FilterTable td").css("border-right-width","0px");
	$("#FilterTableFilterTitleLeft").remove();
	$("#FilterTableFilterTitleRight").remove();
	$("#FilterTableFilterTitleCenter").css("width","100%");
	
	//Remove some of the inputs on the screen
	$("td:contains('Workcenter Type')").parent().remove();
	$("td:contains('Building')").parent().remove();
	$("td:contains('Department:')").remove();
	//Remove Department: and input
		$("#Department_2").remove();
	//Remove Run No: and input
		$("#Job_No_1, #Job_No_2").remove();
	$("td:contains('Bulletin Display')").remove();
	//Remove the Bulleting Display Checkbox
	$("#fltBulletinDisplay").remove();
	
	//Remove the default control save icon
	$("#hdnApplication_Filter_Default_Control_Application_Key").remove();
	$("#hdnApplication_Filter_Default_Control_No_Delete").remove();
	$("#hdnApplication_Filter_Default_Control_Allow_Empty_Default").remove();
	$('a[href^="javascript:plSaveAsDefault"]').remove();
	
	//Center the search button
	$("#Filter_Submit_Cell").css("text-align","center");
});
