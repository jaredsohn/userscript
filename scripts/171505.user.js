(
 function(){

// ==UserScript==
// @name           spam the spammer
// @namespace      spam_the_spammer
// @description    send spam to kitchen spammers
// @grant          none
// @version 0.2
// @date 2013-06-16
// @include        http://www.kitchenscambridge1.co.uk/*
// @include        http://www.whitehighglosskitchen.co.uk/*
// @include        http://www.discount-kitchen.co.uk/*
// @include        http://www.flatpackkitchenunits.co.uk/* 
// @include        http://www.saleskitchen.co.uk/*
// @include        http://www.scotlandkitchen.co.uk/*
// @include        http://www.kitchenslondon-uk.co.uk/*
// @include        http://www.bargainkitchens1.co.uk/*
// @include        http://www.newkitchens-newkitchens.co.uk/*
// @include        http://www.kitchenshops-kitchenshops.co.uk/*
   
// ==/UserScript==
// Spammers acting for various UK kitchen sales website spam many
// internet forums. The websites on this list are some of such websites.
// The ones on the list have a simple interface to send enquiries
// And this Greasemonkey script sends its own spam to these websites.
// 
// You can add your own names, email domains, and subjects for spamming in the doPost function
// define how many spams you send with the var iNumberOfSpamsToSend var in run_script function
//
// Need to have Greasemonkey installed in firefox.
// see https://addons.mozilla.org/firefox/addon/748
// May also work in other browsers with appropriate add ins installed - eg Tampermonkey for Chrome
//  Userscripts on Safari on Macs http://wiki.greasespot.net/Cross-browser_userscripting#Safari
//  Userscripts on IOS devices http://ioscomplex.blogspot.com.au/2013/04/introducing-userscripts-to-ios.html
//  http://www.kitchensforsale1.co.uk/ not working 

// Greasemonkey also works in the Tor browser. https://www.torproject.org/ so you can spam anonymously.
// I tried this in the  torrc to make my spam to appear to be UK sourced. But I am not sure it worked.
//  ExitNodes {GB}
//  StrictExitNodes 1 
// check ip locations with
//  http://whatismyipaddress.com/ip/173.254.216.69
//        77.97.0.95 is a UK IP address
// I got 77.97.32.95 at one point from tor - so I guess that is maybe working
// but then in same session I get 37.130.227.133
// but37.130.227.0 is also in the UK. So maybe the exit nodes is working on tor
//
// forums spammed by these kitchen guys
// http://www.ukbusinessforums.co.uk/forums/showthread.php?t=295302
//http://hoc.createforumhosting.com/do-not-buy-from-www-solidwoodkitchen-co-uk-t7230.html
//http://www.microchip.com/forums/m692662.aspx
// http://kdenlive.org 
var gblSpamCount,gblFailedSpamCount;

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var c_value = document.cookie;
	//GM_log ("getCookie " +  c_value);
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	{
	  c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)
	{
	  c_value = null;
	}
	else
	{
	  c_start = c_value.indexOf("=", c_start) + 1;
	  var c_end = c_value.indexOf(";", c_start);
	  if (c_end == -1)
	  {
	     c_end = c_value.length;
	  }
	  c_value = unescape(c_value.substring(c_start,c_end));
	}
        return c_value;
}



                                             
  function trim(str)
  {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  //return ( str.replace(/^\s+|\s+$/g, ''))
  }
// 
// name=James+gbasan+xian&email=xxian%40gmail.com&phone=03050788566&subject=a+Sale&comments=Please+call+for+a+quote&verify=4
/*

Content-Type: application/x-www-form-urlencoded
  http_request.onreadystatechange = alertContents;
  http_request.open('POST', url, true);
  http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http_request.setRequestHeader("Content-length", parameters.length);
  http_request.setRequestHeader("Connection", "close");
  http_request.send(parameters);

http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp

xmlhttp.open("POST","ajax_test.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");

*/

function doPost(pSuccessPg,pFailPg ,pDetailsHRPg) // pResultsDiv
{
var  xmlhttp,vNamePageURL,vContactPostString,vPostString;
//  names arrays.  The script picks one from each list at random.
var vSurnames=["Quigg", "Denman", "Cooper", "Portner", "Ott", "Wedekind", "Nichols", "Thompson", "Blumenthal", "Schreier", "Elder", "Macfarlane", "Tupper", "Senior", "Oakley", "Winship" ,"Pugh"];
var vFirstName=  ["Jojo", "Ieuan" , "Theodore" , "Jamie", "Sharleen", "Jackie","Gayla", "Githa", "Anika", "Anabella","Bailee", "Julia","Lori", "Arden","Jean", "Phoebe","Liz", "Eleanore","Kerstin", "Jodie","Harrietta", "Alexia","Finley", "Wenonah","Carys", "Luann","Hartwig", "Zackery","Modya", "Gert","Vitaly", "Berny","Brendan", "Roydon"] ;
var vMiddlenames=["Jojo", "Ieuan" , "Theodore" , "Jamie", "Sharleen", "Jackie","Gayla", "Githa", "Anika", "Anabella","Bailee", "Julia","Lori", "Arden","Jean", "Phoebe","Liz", "Eleanore","Kerstin", "Jodie","Harrietta", "Alexia","Finley", "Wenonah","Carys", "Luann","Hartwig", "Zackery","Modya", "Gert","Vitaly", "Berny","Brendan", "Roydon"] ;
  
//                     email domain names for the fake email address we supply.  The script picks one from the list at random 
//                    no @ sign used here. It is added by the script
var vEmailDomains=["gmail.com" , "hotmail.com", "farkoff.com" ,   "yahoo.co.uk", "aol.com", "bbc.net.uk", "uracunt.net.uk"] ;

//                 Subjects to be in the body of the email - the enquriy text you are sending to the site
//             . These go in a form post request and need + instead of spaces. Add new ones if you like
//                 The script picks one from the list at random
var vSubjects=["I+need+a+quote+on+a+block+of+flats+worth+of+kitchens." , "These+look+good.+Email+me.",  "These+look+good.+Call+me.", "I+need+a+quote+fast", "Ho+bisogno+di+un+preventivo+cucina", "Incazzare+ti+punge","Vete+a+la+mierda+usted+pinchazos","Verpiss+dich+sticht","Piss+off+you+pricks","stop+spamming+forums","phyaduitp8o+uitpg+auiptgf9+aghp"] ;
var vRandSurnumb,vRandFirstNameNumb,vRandMiddleNameNumb, vRandEmailDomNumb, vPhone, sPhone, vRandSubjectNumber;
var vSubject , vRandChar,vRandChar2, vRandCharNumber,vEmail, vHumanReadable;
vRandSurnumb=Math.floor((Math.random()*vSurnames.length)); 
vRandFirstNameNumb=Math.floor((Math.random()*vFirstName.length));
vRandMiddleNameNumb=Math.floor((Math.random()*vMiddlenames.length));
vRandEmailDomNumb=Math.floor((Math.random()*vEmailDomains.length));
vRandSubjectNumber=Math.floor((Math.random()*vSubjects.length));

//  rnd number between 65 and 90 - A-Z  unicode
vRandCharNumber=Math.floor((Math.random()*25)) + 65;
vRandChar=String.fromCharCode(vRandCharNumber);
//vRandChar=String.fromCharCode(65);
vRandCharNumber=Math.floor((Math.random()*25)) + 65;
vRandChar2=String.fromCharCode(vRandCharNumber);
//vRandChar2=String.fromCharCode(90);
vSubject = vRandChar + vSubjects[vRandSubjectNumber] + vRandChar2;
vEmail = vFirstName[vRandFirstNameNumb] + vRandCharNumber+vRandChar2 + vRandChar;
vPhone=Math.floor((Math.random()*999999999));
sPhone= "041" + vPhone;

//9999999999
//3050788566
//0412761257
//01416116995
//vNamePageURL="http://www.whitehighglosskitchen.co.uk/contact.php";
vContactPostString="/contact-post.php";

//vNamePageURL="http://www.whitehighglosskitchen.co.uk/contact-post.php";
vNamePageURL=location.protocol + "//"  + location.hostname + vContactPostString;

// pResultsDiv.innerHTML ="<p> Spamming " + vNamePageURL; // this is clearing any existing inner HTML


if (window.XMLHttpRequest)
{
  xmlhttp=new XMLHttpRequest();
}
else
{
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
} 



xmlhttp.addEventListener("progress", updateProgress1, false);
xmlhttp.addEventListener("load", transferComplete1, false);
/*
xmlhttp.onreadystatechange=function()
 {

//readyState 	Holds the status of the XMLHttpRequest. Changes from 0 to 4:
//0: request not initialized
//1: server connection established
//2: request received
//3: processing request
//4: request finished and response is ready
//status 	200: "OK"
//404: Page not found
  pResultsDiv.innerHTML += "<p>onreadystatechange - readystate: " + xmlhttp.readyState + " status:" + xmlhttp.status;
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
  {
      pResultsDiv.innerHTML += "<p>onreadystatechange - ready: " + xmlhttp.responseText.length;// + " :<p> " + xmlhttp.responseText;
  }
   if (xmlhttp.status==400)
   {
      pResultsDiv.innerHTML+="<p>onreadystatechange - 400 error";
   }
 }  
*/
xmlhttp.open("POST",vNamePageURL,true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//xmlhttp.setRequestHeader("Content-length",);


vPostString = "name=" + vFirstName[vRandFirstNameNumb] +"+" + vMiddlenames[vRandMiddleNameNumb] + "+" + vSurnames[vRandSurnumb] +"&email=" + vEmail +"%40"+vEmailDomains[vRandEmailDomNumb] +"&phone=" + sPhone + "&subject=a+Sale&comments=" + vSubject + "&verify=4";
vHumanReadable = vFirstName[vRandFirstNameNumb] + " " + vMiddlenames[vRandMiddleNameNumb] + " " + vSurnames[vRandSurnumb] +" email=" + vEmail +"@"+vEmailDomains[vRandEmailDomNumb] + " phone=" + sPhone;

//pResultsDiv.innerHTML += "<p> " + vPostString;
//pDetailsHRPg.innerHTML +=  vHumanReadable;
xmlhttp.send(vPostString);


//xmlhttp.open("GET", vNamePageURL,true);
//xmlhttp.send();

	function transferComplete1(evt)
	{
	  if (xmlhttp.responseText.indexOf('Email Sent Successfully') >0)
	  {
		
		gblSpamCount=gblSpamCount + 1;
		//pResultsDiv.innerHTML += "successfull spam number :" + gblSpamCount + "<p> failed spam number:" + gblFailedSpamCount ;		
		pSuccessPg.innerHTML="successfull spam number :" + gblSpamCount;
		pDetailsHRPg.innerHTML = gblSpamCount + ": " + vHumanReadable;
	   }
	   else
	   {
		gblFailedSpamCount=gblFailedSpamCount + 1;
		//pResultsDiv.innerHTML += "<p>transfer complete - failed - readystate: " + xmlhttp.readyState+ " status:" + xmlhttp.status;
		pFailPg.innerHTML="failed spam number :" + gblFailedSpamCount;
	   }
	}
	function updateProgress1(oEvent) 
	{
	  if (xmlhttp.responseText.indexOf('Email Sent Successfully') >0)
	  {
		
		gblSpamCount=gblSpamCount + 1;
		//pResultsDiv.innerHTML += "successfull spam number :" + gblSpamCount  + "<p> failed spam number:" + gblFailedSpamCount ;		
		pSuccessPg.innerHTML="successfull spam number :" + gblSpamCount;
		pDetailsHRPg.innerHTML = gblSpamCount + ": " + vHumanReadable;		
		xmlhttp.abort();
	   }	 
	}
}


function run_script()
{
	/*****************************************************

		Main

	*******************************************************/
	var matchClass,BanUserForm,vResponse, vUserNumber,vStart,vEnd ,subdivs;
	var iPostCount, vReplyCount; 

	var patt1=new RegExp("/user/.*/delete");
	var patt2=new RegExp("/tracker");
	var patt3=new RegExp("/users/.*");
	var elems, vNameElem , vEmailElem  ;
	var vPhoneElem ,vSubjectElem ,vCommentsElem ,vVerifyElem ,vSubmitElem;
        var vPageNode, vStart, vEnd,vElems, vBody,vSuccessPg,vFailPg;

	var vFooterElem,vDetailsHRPg;
        var iNumberOfSpamsToSend = 50;
	//vFooterElem=document.getElementById("container");
	vElems=document.getElementsByTagName("body");
	vBody=vElems[0];
	//doPost(vFooterElem);
	vBody.innerHTML="<div id ='intro_div'> <p id='intro_p'>Spamming " + iNumberOfSpamsToSend + " spams to " + location.hostname  + " </p> </div>";
	vBody.innerHTML+="<div id ='results_div'><p id='success_pg'>successfull spam number :0</p></div>";
	vBody.innerHTML+="<p id='fail_pg'>failed spam number :0</p> <p id='details_hr_p'>details<p></div>";
	gblSpamCount=0;
	gblFailedSpamCount=0;
	vSuccessPg=document.getElementById("success_pg");
	vFailPg=document.getElementById("fail_pg");
	vDetailsHRPg=document.getElementById("details_hr_p");
	for (var i=0; i < iNumberOfSpamsToSend;i++)
	{ 
		doPost(vSuccessPg,vFailPg,vDetailsHRPg);
	}


}
run_script();
}
)
();
 

  



