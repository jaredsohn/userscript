// ==UserScript==
// @name                Auto Booking IRCTC Mobile Site
// @description 	Auto Booking through https://www.irctc.co.in/mobile
// @namespace   	AMR
// @include             https://*irctc.co.in/*
// @version     	1.0
// @license     	GPL v3 or later version; http://www.gnu.org/licenses/gpl.html
// @author              AMR
// ==/UserScript==


//For login
var username = "";	//Enter your username between the double quotes (Leave blank if you do not want to auto login)
var password = "";	//Enter your password between the double quotes (Leave blank if you do not want to auto login)

var stationFromCode = "JP";		//Enter the origin station code between the double quotes
var stationToCode = "ADI";		//Enter the destination station code between the double quotes
var date = "02052013"; 			//ddmmyyyy - Enter the journey date in the given format only
var classCode = "SL"			//Enter one of the 2 character codes (from next line) between the double quotes
//1A - First Class AC, FC - First Class, 2A - AC 2 Tier, 3A - AC 3 Tier, CC - AC Chair Car, SL - Sleeper, 2S - Second Sitting, 3E - AC 3 Tier Economy
var quota = "GN";				//Enter one of the 2 character codes (from next line) between the double quotes
//GN - general, CK - tatkal, LD - ladies
var trainNo = 12547;			//Enter the Train No to book in

//*****DO YOU WANT TO AUTOMATICALLY ADD THE PASSENGER & PROCEED WITH THE BOOKING(works with only 1 passenger)*****
var addPassenger = "yes"		//yes, no

var psgrName = "Test";
var dob = "14111982";			//ddmmyyyy - Enter passenger's date of birth in the given format only
var gender = "m"; 				//m - male, f - female
var berth = "Upper"				//Enter one of the values (from next line) between the double quotes
//Lower, Middle, Upper, Side_Lower, Side_Upper, No Choice
var seniorCitizen = "NOCONC";	//Enter one of the 6 character codes (from next line) between the double quotes
//NOCONC - No, SRCTZN - Yes
var foodPrefrance = "Veg"		//Veg - Vegetarian, Non_Veg - Non Vegetarian

//idCardType and idCardNo is required for tatkal bookings
var idCardType = "PANC"			//Enter one of the 4 character codes (from next line) between the double quotes
//DRLC - Driving License, PSPT - Passport, PANC - Pan Card, VOTE - Voter I-Card, GOVT - Govt issued I-Card, STUD - Student I-Card, NBPB - Bank Passbook, CRCD - Credit Card, UICD - Unique I-Card
var idCardNo = "XXXXXXXXXX"		//Enter your ID Card Number between the quotes


// ------------------------- DO NOT EDIT ANYTHING BELOW THIS LINE -------------------------

function AMR()
{
	//check if at login page
	if(location.href.match(/^https:\/\/www.irctc.co.in\/mobile/))
	{
		if(username!="" && password !="")
		{
			document.getElementsByName('userName')[0].value = username;
			document.getElementsByName('password')[0].value = password;
			var input = document.getElementsByTagName('input');
			input[input.length-1].click();
		}
	}
	
	//check if at the page exactly after login
	else if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/login.do/) || location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/page\/homePage.jsp/))
	{
		document.getElementsByTagName('a')[0].click();
	}
	
	//check if at train find page
	else if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/planner.do[\w\W]{1,}BVS/) || location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/page\/planner.jsp/))
	{
		var i;
		document.getElementsByName('stationFrom')[0].value = stationFromCode;
		document.getElementsByName('stationTo')[0].value = stationToCode;
		document.getElementsByName('departureDate')[0].value = date;
		document.getElementsByName('classCode')[0].value = classCode;
		var q = document.getElementsByName('quota');
		for (i=0;i<3;i++)
		{
			if(q[i].value == quota)
			q[i].click();
		}
		document.forms[0].submit();
	}
	
	//check if at train select page
	else if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/planner.do\?BV_SessionID=[\w\W]{1,}BV_EngineID=[\w\W]{1,}.0$/))
	{
		var i;
		var input = document.getElementsByName('trainvalue');
		for(i=0;i<input.length;i++)
		{
			if(input[i].value.match(trainNo))
			{
				input[i].click();
			}
		}
		document.getElementsByName('buttonBookTicket')[0].click();
	}
	
	//check if logged out
	else if(location.href.match(/https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/logOut.do/))
	{
		if(username!="" && password !="")
		{
			if(confirm('Do you want to auto login and book again?'))
			{
				document.getElementsByName('userName')[0].value = username;
				document.getElementsByName('password')[0].value = password;
				var input = document.getElementsByTagName('input');
				input[input.length-1].click();
			}
		}
	}
	
	//check if adding passengers is allowed
	else if(addPassenger.toLowerCase() == "yes")
	{
		//check if at passenger details page
		if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/availability.do/))
		{
			document.getElementsByTagName('a')[1].click();
		}
		
		//check if at add passengers page
		else if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/page\/addPassengers.jsp/))
		{
			document.getElementsByName('psgrName')[0].value = psgrName;
			document.getElementsByName('gender')[0].value = gender;
			document.getElementsByName('dateOfBirth')[0].value = dob;
			document.getElementsByName('berthPrefer')[0].value = berth;
			document.getElementsByName('seniorCitizen')[0].value = seniorCitizen;
			document.getElementsByName('foodPrefrance')[0].value = foodPrefrance;
			var input = document.getElementsByTagName('input');
			input[input.length-1].click();
		}
		
		//check if at select passengers page after add passengers has been done
		else if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/addPassenger.do/) || location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/shippingAddress.do/))
		{
			var input = document.getElementsByName('passenger');
			input[input.length-1].click();
			//check if tatkal quota is selected
			if(quota == "CK")
			{
				document.getElementsByName('passengers[' + (input.length-1) +'].idCardType')[0].value = idCardType;
				document.getElementsByName('passengers[' + (input.length-1) +'].idCardNo')[0].value = idCardNo;
			}
			document.getElementsByName('submit')[1].click();;
		}
	}
}

window.onload = AMR();

