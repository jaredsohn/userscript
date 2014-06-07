// ==UserScript==
// @name        Iftar Time with Countdown
// @namespace   http://hostmarts.com
// @description Iftar Time and Countdown
// @match	http://*/*
// @match	https://*/*
// @downloadURL https://userscripts.org/scripts/source/173509.user.js
// @updateURL https://userscripts.org/scripts/source/173509.user.js
// @version     1.9
// @copyright  2013+, Zelal
// ==/UserScript==

myTime = new Date().getTime();

myHead = document.getElementsByTagName("head")[0];
myStyle = document.createElement("style");
myStyle.type = "text/css";
myCSS_className = "noPrint_" + myTime;
myCSS =  "@media print { ." + myCSS_className + " { display:none; } }";
myCSSElement = document.createTextNode(myCSS);
myStyle.appendChild(myCSSElement);

myHead.appendChild(myStyle);

var iftar_alert_div = document.createElement("div");
iftar_alert_div.id = "iad_2013";
iftar_alert_div.style.position = "fixed";
iftar_alert_div.style.zIndex = "1000";
iftar_alert_div.style.right = "0";
iftar_alert_div.style.top = "0";
iftar_alert_div.style.fontFamily = "verdana,tahoma,arial,courier new";
iftar_alert_div.style.textAlign = "center";
iftar_alert_div.style.width = "200px";
iftar_alert_div.style.border = "1px solid grey";
iftar_alert_div.style.backgroundColor = "white";
iftar_alert_div.style.borderRadius = "10px";
iftar_alert_div.style.boxShadow = "-5px 5px 5px grey";
iftar_alert_div.style.padding = "5px";
iftar_alert_div.className = myCSS_className;
document.body.appendChild(iftar_alert_div);

var zone_array = new Array("Barishal_Patuakhali","Bogra_Pabna","Chandpur","Chittagong","Dhaka","Dinajpur","Feni_Comilla","Gopalganj","Jessore_Kushtia","Khulna","London","Mymensingh_Tangail","Noakhali","Rajshahi","Rangpur","Sylhet");

document.getElementById("iad_2013").innerHTML += "Select your Zone :<br />";


document.getElementById("iad_2013").innerHTML += "<select style='display:block;width:100%;text-align:center' id='select_zone'></select>";
for(z = 0; z < zone_array.length; z++)
{
	var zone_option = document.createElement("option");
	zone_option.text = zone_array[z];
	zone_option.value = zone_array[z];
	if(localStorage.getItem("iftar_zone") == zone_array[z]) zone_option.setAttribute("selected","selected");
	document.getElementById("select_zone").add(zone_option);
}



var ramadan_started_on_Dhaka = new Date("2013-07-11");

var ramadan_started_on_Sylhet = new Date("2013-07-11");

var ramadan_started_on_Feni_Comilla = new Date("2013-07-11");

var ramadan_started_on_Chittagong = new Date("2013-07-11");

var ramadan_started_on_Noakhali = new Date("2013-07-11");

var ramadan_started_on_Chandpur = new Date("2013-07-11");

var ramadan_started_on_Mymensingh_Tangail = new Date("2013-07-11");

var ramadan_started_on_Barishal_Patuakhali = new Date("2013-07-11");

var ramadan_started_on_Khulna = new Date("2013-07-11");

var ramadan_started_on_London = new Date("2013-07-10");

var ramadan_started_on_Rangpur = new Date("2013-07-11");

var ramadan_started_on_Dinajpur = new Date("2013-07-11");

var ramadan_started_on_Gopalganj = new Date("2013-07-11");

var ramadan_started_on_Rajshahi = new Date("2013-07-11");

var ramadan_started_on_Jessore_Kushtia = new Date("2013-07-11");

var ramadan_started_on_Bogra_Pabna = new Date("2013-07-11");

//var iftar_time_hour = 18;

var iftar_time_Dhaka = new Array([18,53],[18,53],[18,53],[18,53],[18,53],[18,52],[18,52],[18,51],[18,51],[18,51],[18,50],[18,50],[18,50],[18,49],[18,49],[18,48],[18,48],[18,47],[18,47],[18,46],[18,45],[18,45],[18,44],[18,44],[18,43],[18,42],[18,42],[18,41],[18,41],[18,40]);

var iftar_time_Sylhet = new Array([18,48],[18,48],[18,48],[18,48],[18,48],[18,47],[18,47],[18,46],[18,46],[18,46],[18,45],[18,45],[18,45],[18,44],[18,44],[18,43],[18,43],[18,42],[18,42],[18,41],[18,40],[18,40],[18,39],[18,39],[18,38],[18,37],[18,37],[18,36],[18,36],[18,35]);

var iftar_time_Feni_Comilla = new Array([18,49],[18,49],[18,49],[18,49],[18,49],[18,48],[18,48],[18,47],[18,47],[18,47],[18,46],[18,46],[18,46],[18,45],[18,45],[18,44],[18,44],[18,43],[18,43],[18,42],[18,41],[18,41],[18,40],[18,40],[18,39],[18,38],[18,38],[18,37],[18,37],[18,36]);

var iftar_time_Chittagong = new Array([18,50],[18,50],[18,50],[18,50],[18,50],[18,49],[18,49],[18,48],[18,48],[18,48],[18,47],[18,47],[18,47],[18,46],[18,46],[18,45],[18,45],[18,44],[18,44],[18,43],[18,42],[18,42],[18,41],[18,41],[18,40],[18,39],[18,39],[18,38],[18,38],[18,37]);

var iftar_time_Noakhali = new Array([18,51],[18,51],[18,51],[18,51],[18,51],[18,50],[18,50],[18,49],[18,49],[18,49],[18,48],[18,48],[18,48],[18,47],[18,47],[18,46],[18,46],[18,45],[18,45],[18,44],[18,43],[18,43],[18,42],[18,42],[18,41],[18,40],[18,40],[18,39],[18,39],[18,38]);

var iftar_time_Chandpur = new Array([18,52],[18,52],[18,52],[18,52],[18,52],[18,51],[18,51],[18,50],[18,50],[18,50],[18,49],[18,49],[18,49],[18,48],[18,48],[18,47],[18,47],[18,46],[18,46],[18,45],[18,44],[18,44],[18,43],[18,43],[18,42],[18,41],[18,41],[18,40],[18,40],[18,39]);

var iftar_time_Mymensingh_Tangail = new Array([18,52],[18,52],[18,52],[18,52],[18,52],[18,51],[18,51],[18,50],[18,50],[18,50],[18,49],[18,49],[18,49],[18,48],[18,48],[18,47],[18,47],[18,46],[18,46],[18,45],[18,44],[18,44],[18,43],[18,43],[18,42],[18,41],[18,41],[18,40],[18,40],[18,39]);

var iftar_time_Barishal_Patuakhali = new Array([18,52],[18,52],[18,52],[18,52],[18,52],[18,51],[18,51],[18,50],[18,50],[18,50],[18,49],[18,49],[18,49],[18,48],[18,48],[18,47],[18,47],[18,46],[18,46],[18,45],[18,44],[18,44],[18,43],[18,43],[18,42],[18,41],[18,41],[18,40],[18,40],[18,39]);

var iftar_time_Khulna = new Array([18,58],[18,58],[18,58],[18,58],[18,58],[18,57],[18,57],[18,56],[18,56],[18,56],[18,55],[18,55],[18,55],[18,54],[18,54],[18,53],[18,53],[18,52],[18,52],[18,51],[18,50],[18,50],[18,49],[18,49],[18,48],[18,47],[18,47],[18,46],[18,46],[18,45]);

var iftar_time_London = new Array([21,16],[21,15],[21,14],[21,13],[21,12],[21,11],[21,10],[21,09],[21,08],[21,07],[21,06],[21,04],[21,03],[21,02],[21,01],[20,59],[20,58],[20,56],[20,55],[20,53],[20,52],[20,50],[20,48],[20,47],[20,45],[20,43],[20,42],[20,40],[20,38],[20,36]);

var iftar_time_Rangpur = new Array([18,55],[18,55],[18,55],[18,55],[18,55],[18,54],[18,54],[18,53],[18,53],[18,53],[18,52],[18,52],[18,52],[18,51],[18,51],[18,50],[18,50],[18,49],[18,49],[18,48],[18,47],[18,47],[18,46],[18,46],[18,45],[18,44],[18,44],[18,43],[18,43],[18,42]);

var iftar_time_Dinajpur = new Array([18,59],[18,59],[18,59],[18,59],[18,59],[18,58],[18,58],[18,57],[18,57],[18,57],[18,56],[18,56],[18,56],[18,55],[18,55],[18,54],[18,54],[18,53],[18,53],[18,52],[18,51],[18,51],[18,50],[18,50],[18,49],[18,48],[18,48],[18,47],[18,47],[18,46]);

var iftar_time_Gopalganj = new Array([18,60],[18,60],[18,60],[18,60],[18,60],[18,59],[18,59],[18,58],[18,58],[18,58],[18,57],[18,57],[18,57],[18,56],[18,56],[18,55],[18,55],[18,54],[18,54],[18,53],[18,52],[18,52],[18,51],[18,51],[18,50],[18,49],[18,49],[18,48],[18,48],[18,47]);

var iftar_time_Rajshahi = new Array([18,60],[18,60],[18,60],[18,60],[18,60],[18,59],[18,59],[18,58],[18,58],[18,58],[18,57],[18,57],[18,57],[18,56],[18,56],[18,55],[18,55],[18,54],[18,54],[18,53],[18,52],[18,52],[18,51],[18,51],[18,50],[18,49],[18,49],[18,48],[18,48],[18,47]);

var iftar_time_Jessore_Kushtia = new Array([18,60],[18,60],[18,60],[18,60],[18,60],[18,59],[18,59],[18,58],[18,58],[18,58],[18,57],[18,57],[18,57],[18,56],[18,56],[18,55],[18,55],[18,54],[18,54],[18,53],[18,52],[18,52],[18,51],[18,51],[18,50],[18,49],[18,49],[18,48],[18,48],[18,47]);

var iftar_time_Bogra_Pabna = new Array([18,54],[18,54],[18,54],[18,54],[18,54],[18,53],[18,53],[18,52],[18,52],[18,52],[18,51],[18,51],[18,51],[18,50],[18,50],[18,49],[18,49],[18,48],[18,48],[18,47],[18,46],[18,46],[18,45],[18,45],[18,44],[18,43],[18,43],[18,42],[18,42],[18,41]);
document.getElementById("iad_2013").innerHTML += "Today's (<span id='curr_date_sht_display'>" + "</span>) time for Iftar is:<span style='font-weight:bold;color:green;display:block' id='time_display'></span>Time left:<span style='color:red;font-weight:bold;font-size:.85em;display:block' id='countdown'></span>";

var onload_countdown = setInterval(function(){

	if(localStorage.getItem("iftar_zone") == null || localStorage.getItem("iftar_zone") == "")
	{
		var iftar_time = iftar_time_Dhaka;
		var ramadan_started_on = ramadan_started_on_Dhaka;
	}
	else
	{
		var iftar_time = eval("iftar_time_" + localStorage.getItem("iftar_zone"));
		var ramadan_started_on = eval("ramadan_started_on_" + localStorage.getItem("iftar_zone"));
	}

	var curr_date = new Date();
	curr_date_sht = curr_date.getFullYear() + "-" + curr_date.getMonth() + "-" + curr_date.getDate();

	curr_date_month_display = curr_date.getMonth() + 1;
	if (curr_date_month_display < 10) curr_date_month_display = "0" + curr_date_month_display;

	curr_date_date_display = curr_date.getDate();
	if (curr_date_date_display < 10) curr_date_date_display = "0" + curr_date_date_display;

	curr_date_sht_display = curr_date.getFullYear() + "-" + curr_date_month_display + "-" + curr_date_date_display;
	document.getElementById("curr_date_sht_display").innerHTML = curr_date_sht_display;
	for(r = 0; r < 30; r++)
	{
		ramadan_sl = r + 1;
		ramadan_date = new Date(ramadan_started_on.getTime() + r*24*3600*1000);
		ramadan_date_year = ramadan_date.getFullYear();
		ramadan_date_month = ramadan_date.getMonth();
		ramadan_date_date = ramadan_date.getDate();
		ramadan_date_sht = ramadan_date.getFullYear() + "-" + ramadan_date.getMonth() + "-" + ramadan_date.getDate();
		iftar_time_hour = iftar_time[r][0];
		if(iftar_time_hour > 11)
		{
			iftar_time_hour = iftar_time_hour - 12;
		}
		else
		{
			iftar_time_hour = iftar_time_hour;
		}
		
		if (iftar_time_hour < 10)
		{
			iftar_time_hour_display = "0" + iftar_time_hour;
		}
		else
		{
			iftar_time_hour_display = iftar_time_hour;
		}
		iftar_time_minute = iftar_time[r][1];
		if (iftar_time_minute < 10)
		{
			iftar_time_minute_display = "0" + iftar_time_minute;
		}
		else
		{
			iftar_time_minute_display = iftar_time_minute;
		}
		if(ramadan_date_sht == curr_date_sht)
		{
			document.getElementById("time_display").innerHTML = iftar_time_hour_display + ":" + iftar_time_minute_display + ":00";
			y = ramadan_date_year;
			mn = ramadan_date_month + 1;
			d = ramadan_date_date;
			param_time_part = document.getElementById("time_display").innerHTML;
			param_time_part_array = param_time_part.split(":");
			param_time_part_hour = Number(param_time_part_array[0]) + 12;
			param_time_part_final = param_time_part_hour + ":" + param_time_part_array[1] + ":" + param_time_part_array[2];
			param = y + "," + mn + "," + d + " " + param_time_part_final;
			var target_time = new Date(param).getTime() / 1000;
			var days, hours, minutes, seconds;
			var curr_time = new Date().getTime() / 1000;
			var diff_time = target_time - curr_time;
			days = parseInt(diff_time / 86400);
			diff_time = diff_time % 86400;
			hours = parseInt(diff_time / 3600);
			if(hours < 10 && hours >= 0) hours = "0" + hours;
			if(hours < 0 && hours > -10) hours = "-0" + hours*(-1);
			diff_time = diff_time % 3600;
			minutes = parseInt(diff_time / 60);
			if(minutes < 10 && minutes >= 0) minutes = "0" + minutes;
			if(minutes < 0 && minutes > -10) minutes = "-0" + minutes*(-1);
			seconds = diff_time % 60;
			seconds = Math.round(seconds);
			if(seconds < 10 && seconds >= 0) seconds = "0" + seconds;
			if(seconds < 0 && seconds > -10) seconds = "-0" + seconds*(-1);
			document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;
		}
	}
},1000);
document.getElementById("iad_2013").innerHTML += "<span id='hide_iad' style='font-weight:bold;cursor:pointer;display:block;width:100%;text-align:right;color:blue;font-size:.8em' onclick='this.style.display=\"none\";this.parentNode.style.right=\"-220px\";document.getElementById(\"show_iad\").style.display=\"block\"'>></span><span id='show_iad' style='position:absolute;right:10%;display:none;font-weight:bold;cursor:pointer;width:100%;text-align:left;color:blue;font-size:.8em' onclick='this.style.display=\"none\";this.parentNode.style.right=\"0\";this.parentNode.style.top=\"0\";document.getElementById(\"hide_iad\").style.display=\"block\"'><</span>";

document.getElementById("select_zone").onchange = function()
{
	localStorage.setItem("iftar_zone",this.value);
}