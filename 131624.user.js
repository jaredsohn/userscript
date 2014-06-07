// ==UserScript==
// @name           Irctc redirect to login
// @namespace      ajorpheus
// @description    Redirect to the login page from the error page
// @include        https://www.irctc.co.in*
// @include        https://www.irctc.co.in/*
// @include        https://www.irctc.co.in*
// @include        https://www.irctc.co.in*
// ==/UserScript==


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>IRCTC Online Passenger Reservation System</title> 
<meta name="description" content="IRCTC's Online Passenger Reservation System provides booking facility of Railway tickets online and offers other services like checking reservation status, train schedules, train routes, availability of tickets and cancellation." />
<meta name="keywords" content="irctc,train,ticket,eticket,iticket,ticket booking,E-booking,E-Ticket,I-Ticket,rail booking,railway ticket,railway booking,I-booking,catering,tourism,agent booking,E ticket booking,I ticket Booking,cancellation ticket,tatkal,tatkal booking,general booking,lady quota booking,indian rail,indian railway,enquiry,hotel,loyalty booking,soft booking,mobile booking,quick booking,subh yatra,railway reservation,online tickets,online ticket booking,online reservation,current,done card bookng,ITZ booking,PNR,MSST,mumbai ticket,season ticket,waitlisted ticket,train enquiry,SBI railway,irctc mobile booking,irctc mobile application (ngpay),irctc mobile application,irctc agent,sms rail,sms rail to 139,irctc sms service,irctc fare enquiry,popular trains,train schedules,availability of ticket,reservation status,popular stations,track of tikcet,sbi railway card,know your ers,know your PNR,know your ticket,know your eticket,cancel  eticket,cancel railway ticket,trav
 el,passenger,journey,rail journey,planner,plannerbody,plannerresults,bankresponse,Senior Citizen,Boarding Point,Reservation Upto,Train Name,Train No,TDR filing,file TDR,TDR History,banner,banner auction,offline cancellation,refund status,TDR Refund ,partially travelled,Train Cancelled,Ticket Deposit Receipt,chart preparation,File Online TDR Refund Request,Passenger Travel Lists,reservation form,booked history,Cancellation Procedure " />

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link href="/beta_stylesheet/homestylesheet.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="/betaJS/tabs.js"></script>
<script type="text/javascript" src="/betaJS/showhidenew2.js"></script>   
<SCRIPT  type="text/javascript" >
	function isEmpty(s,txt_fld)
{  
        if ((s == null) || (s.length == 0)){	
			alert("Enter Value for  "+txt_fld);
           	 return false;
		}//end of if

       for (var i=0; i<s.length; i++){
           if(s.charAt(i) != " ")
		      return true;
           else{
		      alert("Enter Value for "+txt_fld); 
		  	  return false
		   }//end of else
		 }//end of for
		 return true;
}
	function validate()
	{   
		if(!isEmpty(document.LoginForm.userName.value,"UserName"))  
		{
			document.LoginForm.userName.focus();
			return false;
		}
		if(document.LoginForm.password.value.length==0)
		{
			alert("Please Enter The Password");
			document.LoginForm.password.focus();
			return false;
		}

      

    }

	
	</SCRIPT>
<style type="text/css" media="print">
.header img{display:block}
</style>

<style type="text/css">
img{border:0px;}
form{margin:0; padding:0;}
</style>


</head>

<body onload="fillDefault(); changeText(); changeTextnext();"  style="margin:0; padding:0; font:12px arial;">

<input type="hidden" id="indicator" value="0" />

<div style="width:auto; background-color:#2781BA; margin:0 auto; text-align:center;">
<div style="width:905px; margin:0 auto; background:url(/beta_images/bgnd_sides.gif) repeat-y; text-align:center;">
<div class="header"><img src="beta_images/header_print.gif" alt="IRCTC header" /></div>
<div style="height:19px; width:874px; background-color:#FFAC1B; text-align:center; margin:0 auto; margin-right:16px; margin-left:15px;">

<div id="orngnavi">
<a href="/enquiry.html" class="enquiries" style="float:left; border-left:0px;" target="_blank"></a>
<a href="#" style="border-left:0px; margin-right:50px; border-right:1px solid #fff; " onclick="window.open('http://www.irctc.com/gerenalComplaints.jsp','','toolbar=yes,scrollbars=yes,status=yes,resizable=yes');" class="topmenu">Feedback</a>
<a href="/homebodyh.html" style="border:0px;"  tabindex="-2" class="hindilink"></a>
<a href="#" style="border-left:1px solid #fff; margin-left:65px;" tabindex="-2"  onclick="window.open('/beta_htmls/contact1.html','','width=480,height=450,toolbar=no,scrollbars=yes,status=no,resizable=no');" class="topmenu">Contact Us</a>



</div>
</div>


</body>
</html>