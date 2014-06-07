// ==UserScript==
// @name           BSNL DataOne Bandwidth Calculator
// @namespace      http://achintyaagarwal.blogspot.com
// @author         Achintya Agarwal
// @description    Bandwidth calculation script for new DataOne users with IP 117.xx.xx.xx using bbservice.bsnl.in portal.
// @include        http://bbservice.bsnl.in/UserAuthenticationController
// @include        http://bbservice.bsnl.in/UsageDetails.jsp?*
// ==/UserScript==

var url=window.location;

if(url=="http://bbservice.bsnl.in/UserAuthenticationController"){
	if(confirm("Do you want to view Your BSNL Broadband Usage Details?"))
	{
		alert("A new window will open with the usage details page. Please select the month to view and you will get a notification of your usage immediately.");
		window.open("http://bbservice.bsnl.in/UsageDetails.jsp","usageWindow");
	}
}else{
	getUsageDetails();
}

function getUsageDetails(){
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

	var lUtxt = "\n\tUploaded: " + lU + " KB";
	var lDtxt = "\n\tDownloaded: " + lD + " KB";
	var lTtxt = "\n\tTotal: " + (lU + lD) + " KB or " + roundNumber((lU + lD)/1024,4) + " MB or " + roundNumber((lU + lD)/1048576,4) + " GB";
	var ulUtxt = "\n\tUploaded: " + ulU + " KB";
	var ulDtxt = "\n\tDownloaded: " + ulD + " KB";
	var ulTtxt = "\n\tTotal: " + (ulU + ulD) + " KB or " + roundNumber((ulU + ulD)/1024,4) + " MB or " + roundNumber((ulU + ulD)/1048576,4) + " GB";
	var UTtxt = "\n\tTotal Uploaded: " + (lU + ulU) + " KB";
	var DTtxt = "\n\tTotal Downloaded: " + (lD + ulD) + " KB";
	var TTtxt = "\n\tGrand Total: " + (lU + lD + ulU + ulD) + " KB or " + roundNumber((lU + lD + ulU + ulD)/1024,4) + " MB or " + roundNumber((lU + lD + ulU + ulD)/1048576,4) + " GB";
	var msg = "\n\nDisclaimer: This program may not be 100% correct and will work only till BSNL does not change its page. Once it does it will start giving inaccurate results. Please verify usage by manual calculation." + 
		"\nThis software does NOT send any information to any third party." + 
		"\n\nNOTE: If connection has been made before 2:00 AM or disconnected after 8:00 AM then BSNL may charge you. This program does not count such usages in Night Unlimited." + 
		"\nUnbillable usage is only if you have Night Unlimited. Please contact BSNL for assistance on this." + 
		"\nIf any bugs or errors are found you are free to modify and redistribute the script provided the original author's name is intact.";

	alert("Billable Usage" + lUtxt + lDtxt + lTtxt + "\n\nUnbillable Usage (Night Unlimited)" + ulUtxt + ulDtxt + ulTtxt + "\n\nTOTAL USAGE" + UTtxt + DTtxt + TTtxt + msg);
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

function roundNumber(num,dec) {
	if (num > 8191 && num < 10485) {
		num = rnum-5000;
		var newnumber = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		newnumber = newnumber+5000;
	} else {
		var newnumber = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	}
	return newnumber;
}