// ==UserScript==
// @name           BSNL TESTING 1
// @namespace      NidhiRazdan
// @author         Nidhirazdann@gmail.com
// @include        http://p3hosting.bsnl.in:9080/BroadBandCustomerPortal/UserAuthenticationController
// @include        http://p3hosting.bsnl.in:9080/BroadBandCustomerPortal/UsageDetails.jsp*
// ==/UserScript==

var url=window.location;

if(url=="http://p3hosting.bsnl.in:9080/BroadBandCustomerPortal/UserAuthenticationController"){
	if(confirm("Do you want to view Your BSNL Broadband Usage Details?"))
	{
		alert("A new window will open with the usage details page. Please select the month to view and you will get a notification of your usage immediately.");
		window.open("http://p3hosting.bsnl.in:9080/BroadBandCustomerPortal/UsageDetails.jsp","usageWindow");
	}
}else{
	getUsageDetails();
}

function getUsageDetails(){
	var bsnl = {
		"plans" : [
			{
				"name" : "Home 125",
				"cost" : 125,
				"limit" : 150,
				"unlim" : false,
				"addl" : 0.90
			},
			{
				"name" : "Home 250",
				"cost" : 250,
				"limit" : 1024,
				"unlim" : false,
				"addl" : 0.90
			},
			{
				"name" : "Home 500",
				"cost" : 500,
				"limit" : 2560,
				"unlim" : true,
				"addl" : 0.80
			},
			{
				"name" : "Home 500 C",
				"cost" : 500,
				"limit" : 1536,
				"unlim" : true,
				"addl" : 0.80
			},
			{
				"name" : "Home 500 C+",
				"cost" : 600,
				"limit" : 2560,
				"unlim" : true,
				"addl" : 0.80
			},
			{
				"name" : "Home 1000",
				"cost" : 1000,
				"limit" : 5120,
				"unlim" : true,
				"addl" : 0.80
			},
			{
				"name" : "Home 1800",
				"cost" : 1800,
				"limit" : 10240,
				"unlim" : true,
				"addl" : 0.70
			},
			{
				"name" : "Home 3300",
				"cost" : 3300,
				"limit" : 20480,
				"unlim" : true,
				"addl" : 0.70
			},
			{
				"name" : "Business 700",
				"cost" : 700,
				"limit" : 4096,
				"unlim" : false,
				"addl" : 0.80
			},
			{
				"name" : "Business 1200",
				"cost" : 1200,
				"limit" : 8192,
				"unlim" : false,
				"addl" : 0.80
			},
			{
				"name" : "Business 2000",
				"cost" : 2000,
				"limit" : 12288,
				"unlim" : false,
				"addl" : 0.70
			},
			{
				"name" : "Business 3000",
				"cost" : 3000,
				"limit" : 20480,
				"unlim" : false,
				"addl" : 0.50
			},
			{
				"name" : "Business 4000",
				"cost" : 4000,
				"limit" : 27648,
				"unlim" : false,
				"addl" : 0.50
			},
			{
				"name" : "Business 5000",
				"cost" : 5000,
				"limit" : 35840,
				"unlim" : false,
				"addl" : 0.50
			},
			{
				"name" : "Business 9000",
				"cost" : 9000,
				"limit" : 76800,
				"unlim" : false,
				"addl" : 0.50
			},
			{
				"name" : "Business 15000",
				"cost" : 15000,
				"limit" : 128000,
				"unlim" : false,
				"addl" : 0.40
			}
		]
	};

	var t = document.getElementsByTagName("table");
	var x = t[4];
	if(x.rows[0].cells[0].innerHTML != "<b>Sl No</b>"){
		alert("The Results page has been changed and this may result in inaccurate results or errors. Please find updated version of script to view accurate results.");
	}
	var len = x.rows.length-1;
	var ulD = 0;
	var ulU = 0;
	var lD = 0;
	var lU = 0;
	for(var i = 1; i <= len; i++){
		var startDT = convertToDate(x.rows[i].cells[2].innerHTML);
		var endDT = convertToDate(x.rows[i].cells[4].innerHTML);
		var startT = startDT.getHours();
		var endT = endDT.getHours();
		if((startT >= 2 && startT < 8) && (endT >= 2 && endT < 8) && (startDT.getDate() == endDT.getDate())){
			ulD += parseInt(x.rows[i].cells[7].innerHTML);
			ulU += parseInt(x.rows[i].cells[9].innerHTML);
		}else{
			lD += parseInt(x.rows[i].cells[7].innerHTML);
			lU += parseInt(x.rows[i].cells[9].innerHTML);
		}
	}
	var dt = convertToDate(x.rows[len].cells[2].innerHTML);

	var m1 = "<h2 align=center>Usage</h2>";

	var usage = '<table border=1 width=100%>' +
	'<tr>' +
	'<th>&nbsp<th>Upload<th>Download<th>Total<th>Per Day*' +
	'</tr>' +
	'<tr>' +
	'<th>Billable</th><td>' + lU + " KB" + '<td>' + lD + " KB" + '<td>' + (lU + lD) + " KB or <br>" + roundNumber((lU + lD) / 1024, 4) + " MB or <br>" + roundNumber((lU + lD) / 1048576,4) + " GB" + '<td>' + roundNumber(((lU + lD)/dt.getDate()) / 1024, 4) + " MB" +
	'</tr>' +
	'<tr>' +
	'<th>Unbillable<br>(Night Unlimited)</th><td>' + ulU + " KB" + '<td>' + ulD + " KB" + '<td>' + (ulU + ulD) + " KB or <br>" + roundNumber((ulU + ulD) / 1024, 4) + " MB or <br>" + roundNumber((ulU + ulD) / 1048576, 4) + " GB" + '<td>' + roundNumber(((ulU + ulD) / dt.getDate())/1024, 4) + " MB" +
	'</tr>' +
	'<tr>' +
	'<th>TOTAL</th><td>' + (lU + ulU) + " KB" + '<td>' + (lD + ulD) + " KB" + '<td>' + (lU + lD + ulU + ulD) + " KB or <br>" + roundNumber((lU + lD + ulU + ulD) / 1024, 4) + " MB or <br>" + roundNumber((lU + lD + ulU + ulD) / 1048576, 4) + " GB" + '<td>' + roundNumber(((lU + lD + ulU + ulD) / dt.getDate())/1024, 4) + " MB" +
	'</tr>' +
	'</table>';

	var m2 = "<h2 align=center>Remaining Usage</h2>";
	
	var usage2 = '<table border=1 width=100%>' +
	'<tr>' +
	'<th>Plan<th>Limit<th>Used<th>Total Remaining<th>Remaining Per Day*' +
	'</tr>';

	for(i = 0; i <= bsnl.plans.length - 1; i++){
		var p = "<tr><td>" + bsnl.plans[i].name;
		if(i == 0){
			p += "<td>" + bsnl.plans[i].limit + " MB";
		}else{
			p += "<td>" + (bsnl.plans[i].limit/1024) + " GB";
		}
		var unlimusg = (lU + lD) / 1024;
		var limusg = (lU + lD + ulU + ulD) / 1024;
		if(bsnl.plans[i].unlim){
			p += "<td>" + roundNumber(unlimusg / 1024, 4) + " GB" +
			"<td>" + roundNumber((bsnl.plans[i].limit - unlimusg) / 1024,4) + " GB" +
			"<td>" + roundNumber(((bsnl.plans[i].limit - unlimusg) / daysLeft(dt)), 4) + " MB";
		}else{
			p += "<td>" + roundNumber(limusg / 1024, 4) + " GB" +
			"<td>" + roundNumber((bsnl.plans[i].limit - limusg) / 1024,4) + " GB" +
			"<td>" + roundNumber(((bsnl.plans[i].limit - limusg) / daysLeft(dt)), 4) + " MB";
		}
		p += "</tr>";
		usage2 += p;
	}
	usage2 += '</table>';

	var m3 = "<br>* Latest record: " + dt.toLocaleString() + ". Per Day &amp; Remainig Days calculated according to this.";

	var m4 = "<span style=\"font-size:10px;\"><br><br>Disclaimer: This program may not be 100% correct and will work only till BSNL does not change its page. Once it does it will start giving inaccurate results. Please verify usage by manual calculation." + 
		"<br>This software does NOT send any information to any third party." + 
		"<br><br>NOTE: If connection has been made before 2:00 AM or disconnected after 8:00 AM then BSNL may charge you. This program does not count such usages in Night Unlimited." + 
		"<br>Unbillable usage is only if you have Night Unlimited. Please contact BSNL for assistance on this." + 
		"<br>If any bugs or errors are found you are free to modify and redistribute the script provided the original author's name is intact.</font>";

	var m5 = "<br><br><center><button onclick=\"document.getElementById('res').style.display='none';\">Close</button></center>";


	document.body.innerHTML += "<style type=text/css> table{font-size:13px;} #res{position:absolute;top:0px;width:730px;background:white;color:black;font-size:13px;border:5px solid gray;padding:5px;-moz-opacity:0.95;}</style>";
	var res = document.createElement("div");
	res.id = "res";
	res.innerHTML = "<div style='text-align:right;'><a href=\"#\" onclick=\"document.getElementById('res').style.display='none';\" style=\"color:red;font-family:arial;font-size:20px;font-weight:bold;text-decoration:none;\">X</a></div>";
	res.style.left = ((document.body.clientWidth - 740)/2) + "px";
	res.innerHTML += m1 + usage + m2 + usage2 + m3 + m4 + m5;
	document.body.appendChild(res);
}

function convertToDate(value){
	var tmp = value.split(" ");
	var dt = tmp[0];
	var tm = tmp[1];
	var tmp2 = dt.split("-");
	var dt = tmp2[1] + "/" + tmp2[2] + "/" + tmp2[0];
	var datetime = new Date(dt + " " + tm);
	return datetime;
}

function roundNumber(num,dec){
	if(num > 8191 && num < 10485){
		num -= 5000;
		var newnumber = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
		newnumber += 5000;
	}else{
		var newnumber = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}
	return newnumber;
}

function daysLeft(date){
	var monthDays = new Array(12);
	monthDays[0] = 31;
	monthDays[1] = 28;
	monthDays[2] = 31;
	monthDays[3] = 30;
	monthDays[4] = 31;
	monthDays[5] = 30;
	monthDays[6] = 31;
	monthDays[7] = 31;
	monthDays[8] = 30;
	monthDays[9] = 31;
	monthDays[10] = 30;
	monthDays[11] = 31;

	if(checkLeap(date)){
		monthDays[1] = 29;
	}
	return (monthDays[date.getMonth()] - date.getDate());
}

function checkLeap(date){
	var year = date.getFullYear();
	if(year % 400 == 0){
		return true;
	}else if(year % 100 == 0){
		return false;
	}else if(year % 4 == 0){
		return true;
	}else{
		return false;
	}
}
