// ==UserScript==
// @name           Auto Populator
// @author         Kevin Huff
// @namespace      http://webserver/
// @require        http://webserver/js/jquery.js
// @description    Autofill and complete online web formularies with your custom data
// @version        1.13.3
// @include        http*://*
// @license        Creative Commons Attributive Share-Alike 3.0
// ==/UserScript==
/*
	This script is an adaptation of Xavi Esteve's Auto Fill any forms with custom informatino user script. 
	From http://xaviesteve.com
*/

//Always look for the transfer form. When it is there set the GM values to the form values.
if  (document.forms.namedItem("transferForm"))
	{	
		var form = document.forms.namedItem("transferForm");

		if(form.elements.namedItem("diabetic").value == 0){
			alert('ATTENTION: Make sure you have followed your checklist.\nDid you:\nUse your first and last names?\nSay which company you are representing?\nState the purpose of the call?\nLet them know the call is recorded?\nAsk if they are currently enrolled or talked to any schools?\nInformed them there are no gifts or prizes associated with this call?\nAsked if they are a U.S. Citizen?\nAsked if they had access to highspeed internet?\nAsked if they were currently enrolled?\nConfirm contact information?');										
			GM_setValue("prospectId", form.elements.namedItem("prospectId").value);		
			GM_setValue("af_fn", form.elements.namedItem("prospectFName").value);
			GM_setValue("af_ln", form.elements.namedItem("prospectLName").value);
			GM_setValue("af_ph", form.elements.namedItem("prospectPhone").value);
			GM_setValue("af_ap", form.elements.namedItem("prospectAltPhone").value);
			GM_setValue("af_ad", form.elements.namedItem("prospectAddress").value);
			GM_setValue("af_ci", form.elements.namedItem("prospectCity").value);
			GM_setValue("af_st", form.elements.namedItem("prospectState").value);
			GM_setValue("af_zi", form.elements.namedItem("prospectZip").value);
			GM_setValue("af_em", form.elements.namedItem("prospectEmail").value);
			//See if we're doing a transfer or not
			var transfer = form.elements.namedItem("transfer").value
			if(transfer == 1){
				GM_setValue("gd_yr", form.elements.namedItem("hsGradYear").value);
			}else{
				GM_setValue("af_ye", form.elements.namedItem("prospectAge").value);
				GM_setValue("af_el", form.elements.namedItem("prospectCurrentLevelOfEdu").value);
				GM_setValue("af_sd", form.elements.namedItem("prospectStartDateRange").value);
				GM_setValue("campusType", form.elements.namedItem("campusType").value);
				GM_setValue("notes", form.elements.namedItem("prospectNotes").value);
				GM_setValue("af_rf", form.elements.namedItem("userFirstName").value);
				GM_setValue("af_rl", form.elements.namedItem("userLastName").value);
				var repId = form.elements.namedItem("userFirstName").value + " " + form.elements.namedItem("userLastName").value;
				GM_setValue("af_ri", repId);	
			}
			GM_setValue('schoolsSubmitted', "");

			//Parse phone number into parts
			GM_setValue("af_ph1", GM_getValue("af_ph").substring(0,3));
			GM_setValue("af_ph2", GM_getValue("af_ph").substring(3,6));
			GM_setValue("af_ph3", GM_getValue("af_ph").substring(6));
			//Speical Processing for prospectTitle and Gender. (If it is NA don't auto populate it)
			/*if (form.elements.namedItem("prospectTitle").value !== "NA")
			{
				GM_setValue("af_ti", form.elements.namedItem("prospectTitle").value);
				GM_setValue("af_ge", form.elements.namedItem("prospectGender").value);
			}*/
		}else{
			alert("Auto Pop Enabled");			
			GM_setValue("prospectId", form.elements.namedItem("prospectId").value);		
			GM_setValue("af_fn", form.elements.namedItem("prospectFName").value);
			GM_setValue("af_ln", form.elements.namedItem("prospectLName").value);
			GM_setValue("af_ph", form.elements.namedItem("prospectPhone").value);			
			GM_setValue("af_ph1", GM_getValue("af_ph").substring(0,3));
			GM_setValue("af_ph2", GM_getValue("af_ph").substring(3,6));
			GM_setValue("af_ph3", GM_getValue("af_ph").substring(6));
			GM_setValue("af_ad", form.elements.namedItem("prospectAddress").value);
			GM_setValue("af_ci", form.elements.namedItem("prospectCity").value);
			GM_setValue("af_st", form.elements.namedItem("prospectState").value);
			GM_setValue("af_zi", form.elements.namedItem("prospectZip").value);
			GM_setValue("af_em", form.elements.namedItem("prospectEmail").value);		
			GM_setValue("af_ip", form.elements.namedItem("prospectIP").value);		
		
		}
	}
	//alert(GM_getValue('af_ye'));
	GM_registerMenuCommand("Auto-Pop",autoPopulate,"a");
	infoDiv();
	autoPopulate();
  // FUNCTIONS 
  function endCall()
  {
	
	if(GM_getValue('schoolsSubmitted') == "Enter one school at a time and press enter between each one."){
			alert("No Schools entered. If this was a sale enter the schools submitted.\nIf it was not a sale then you can close this tab.");
	}else{
		if(confirm("Are you done submitting the prospect's information?")){
			//Don't end the call if they haven't entered a school

			//Now update the prospect info on my system by way of a script with url vars.
			link = 'http://webserver/prospectUpdate.php?updateType=endCall&id=' + GM_getValue("prospectId");
			//Now send them to the confirm page.
			window.location.href = link;
		}
	}
  }
  function updateValues()
  {
	//Check the current site
	GM_setValue('notes',document.getElementById('SSANOTES').value);
	GM_setValue('schoolsSubmitted',document.getElementById('SSASCHOOLSSUBMITTEDOUTPUT').innerHTML);
	GM_setValue('af_fn',document.getElementById('SSAFNAME').value);
	GM_setValue('af_ln',document.getElementById('SSALNAME').value);
	GM_setValue('af_ye',document.getElementById('SSAAGE').value);
	GM_setValue('af_em',document.getElementById('SSAEMAIL').value);
	GM_setValue('af_ad',document.getElementById('SSAADDRESS').value);
	GM_setValue('af_ci',document.getElementById('SSACITY').value);
	GM_setValue('af_st',document.getElementById('SSASTATE').value);	
	GM_setValue('af_zi',document.getElementById('SSAZIP').value);
	GM_setValue('OtherNewValue','Value Changed');
	//Figure out if this is a DA or Proacacademix
	if(window.location.host == "webserver"){
		if(window.location.pathname == "/proacademix/AutoPop/popupInfoDiv.php"){
			var theSite = "Degree America";
			if(GM_getValue("siteUsed") == "Ampush"){
				theSite = "Ampush";
			}
		}else{
			if(window.location.pathname == "/transfer/regEDUToTransfer.php"){
				var theSite = "Integrate Transfer";
			}else{
				var theSite = "Plattform";
			}
		}
	}else{
		var theSite = window.location.host;
	}
	//If it is a proms see if it is an military submission.
	if(window.location.host == "www.achieveyourcareer.com"){
		if(window.location.pathname.indexOf('cc47') != -1){
			var theSite = "Military"
		}else{
			var theSite = "ProMS"			
		}
	}
	//If it is Degree Chemistry Page ask if it was from rex or not. 
	if(window.location.host == "www.degreechemistry.com"){
		if(confirm("Click OK if you got to Degree Chemistry from the REX Link.")){
			var theSite = "rexDC";
		}else{
			var theSite = "www.degreechemistry.com";
		}
	}	
	//Build the update link querystring.
	var updateLinkQueryString = "?firstName=" + GM_getValue("af_fn") +
	"&lastName=" + GM_getValue("af_ln") +
	"&age=" + GM_getValue("af_ye") +
	"&email=" + GM_getValue("af_em") +
	"&address=" + GM_getValue("af_ad") +
	"&city=" + GM_getValue("af_ci") +
	"&state=" + GM_getValue("af_st") +
	"&zip=" + GM_getValue("af_zi") +
	"&schools=" + GM_getValue("schoolsSubmitted") +
	"&id=" + GM_getValue("prospectId") +	
	"&updateType=update" +
	"&site=" + theSite;
	//Make the link
	var theLink = 'http://webserver/prospectUpdate.php' + updateLinkQueryString;	
	//Now update the prospect info on my system by way of a hidden iframe.
	ifrm = document.createElement("IFRAME");
	ifrm.setAttribute("src", theLink);
	ifrm.style.width = 640+"px";
	ifrm.style.height = 480+"px"; 
	ifrm.style.display = "none"; 	
	document.body.appendChild(ifrm);
	alert("Your changes have been saved.");
  }
  function infoDiv(updated)
  {
	    //Set Default Values for Other Info Stuff
		if(GM_getValue('notes') == ""){
			GM_setValue('notes','');
		}
		if(GM_getValue('schoolsSubmitted') == null){
			GM_setValue('schoolsSubmitted','');
		}
		//Set Anticapated Start Date
		var today = new Date();//Today
		var startMonth, startYear;//Set the vars that will do the picking
		if (GM_getValue("af_sd") == "asap")
		{
			//Parse month and year from today's date.
			var startMonth = today.getMonth() +1;
			var startYear = today.getFullYear();
		}			
		if (GM_getValue("af_sd") == "1to3")
		{
			var startMonth = today.getMonth() + 4;
			var startYear = today.getFullYear();
			//For 1-3 and 4-6 gotta make sure the month is lt 12
			if(startMonth > 12){
				startMonth = startMonth - 12;
				//If the startMonth is gt 12 add the year.
				startYear ++;
			}
		}		
		if (GM_getValue("af_sd") == "3to6")
		{
			var startMonth = today.getMonth() + 7;
			var startYear = today.getFullYear();
			if(startMonth > 12){
				startMonth = startMonth - 12;
				startYear ++;
			}
		}	
		var anticaptedStartDateString = startMonth + '/' + startYear;
		GM_setValue('anticaptedStartDate',anticaptedStartDateString); 
		//build estimated grad year based off age.
		var baseGradYear = today.getFullYear() - (GM_getValue('af_ye') - 18);
		var otherGradYear = baseGradYear - 1;
		var estimatedGradYear = baseGradYear + " or " + otherGradYear;
		GM_setValue('estimatedGradYear', estimatedGradYear);
		//If there is no schools submitted Set the value to "None Yet"
		if(GM_getValue('schoolsSubmitted') == ""){
			GM_setValue('schoolsSubmitted', "Enter one school at a time and press enter between each one.");
		}
		//If the site is a da one then open the prospectInfo div in a new window.
		if( window.location.pathname == "/lp/cc/index.php" || window.location.pathname == "/lp/cc/" ){
			//Set the link
			var theOtherLink = "http://webserver/proacademix/AutoPop/popupInfoDiv.php";
			//Now update the prospect info on my system by way of a hidden iframe.
			ifrm = document.createElement("IFRAME");
			ifrm.setAttribute("src", theOtherLink);
			ifrm.style.width = "100%";
			ifrm.style.height = 286+"px"; 	
			document.body.insertBefore(ifrm, document.body.firstChild); 
		}
		var siteHostsArray = new Array(
		"www.achieveyourcareer.com",
		 "forms.earnmydegree.com",		 
		 "callcenter1.programadvisor.com",
		 "forms.courseadvisor.com",
		 "affiliate.collegesurfing.com",
		 "www.education180.com",
		 "www.educationconnection.com",
		 "www.emagister.net",
		 "www.degreechemistry.com",
		 "degrees.education.org",
		 "www.degreescout.com",
		 "www.targetmatrex.com",
		 "www.campusexplorer.com",
		 "www.careerdegreesource.com",
		 "www.dmicallverify.com",
		 "us2.five9.com",
		 "www.education-for-careers.com",
		 "www.schoolsformilitary.com",
		 "192.168.0.5");
		//Build ourScripts
		var ourScripts = "$(document).ready(function() {\n" +
		"    var top = '-' + $('#slidedown_content .sunriseContent').css('height');\n" +
		"    var easingOut = 'easeOutBack';  \n" +
		"    var easingIn = 'easeInBack';  \n" +		
		"    $('#slidedown_top').mousedown(function() {\n" +
		"        $('#slidedown_content').animate({'top' : 0}, {queue:false, duration:1000, easing: easingOut});\n" +
		"    });\n" +
		"    $('.sunriseFooter').mousedown(function() {\n" +
		"        $('#slidedown_content').animate({'top' : 0}, {queue:false, duration:1000, easing: easingOut});\n" +
		"    });\n" +			
		"    $('#hideInfo').mouseup(function() {\n" +
		"        $('#slidedown_content').animate({'top' : top}, {queue:false, duration:500, easing: easingIn});\n" +
		"    });\n" +
		"});\n" +
		"function SSAUpdateSchoolsSubmitted(){\n" + 
		"	//Get the input field\n" + 
		"	var schoolField = document.getElementById('SSASCHOOLSSUBMITTED');\n" + 
		"	var school = schoolField.value;\n" + 
		"	//Get the output span\n" + 
		"	var output = document.getElementById('SSASCHOOLSSUBMITTEDOUTPUT');\n" + 
		"	//Get the output InnerHTML\n" + 
		"	var outputHTML = output.innerHTML;\n" +
		"	//If the outputHTML is Enter one school at a time and press enter between each one. then clear it \n" +
		"	if(outputHTML == 'Enter one school at a time and press enter between each one.'){ \n" +
		"   	outputHTML = '';\n" +
		"	}\n" +
		"	//Put value into output span but see if we need to use a comma\n" +
		"	if(outputHTML == ''){ \n" +		
		"		output.innerHTML = school;\n" + 
		"	}else{\n" +
		"		output.innerHTML = outputHTML + ', ' + school;\n" + 
		"	}\n" +	
		"	//Clear the input field\n" + 
		"	schoolField.value = '';\n" + 
		"}\n";
		
		// Insert DIV style
		//var placeHolderStyleCode = "#infoDivPlaceHolder{height:175px;width:100%;}";
		var slideCode = "body {margin:0; padding:0;}\n" +
		".bodyGral {!important;width:100%;}\n" +
		"#slidedown_top {height: 70px;background-color:#272727;margin:0;}\n" +
		"#slidedown_bottom {position: absolute;width: 100%;height:100%;}\n" +
		"#slidedown_content {position: absolute;width: 100%;height: 286px;top: -241px;text-align:center;background:url(http://webserver/css/img/bg.gif) repeat-x 0 bottom;z-index:999;margin:0;} \n" +
		"#slidedown_content .sunriseContent {width:830px;height:241px;}\n" +
		"#slidedown_content .sunriseContent .sunriseBlock {height:231px;border-right:5px ridge #c0c0c0;border-left:5px ridge #c0c0c0; float:left;width:100px;padding:10px 10px 0 10px; margin: 0 4px 0 4px; text-align:left;font-family:\"Times New Roman\",georgia; font-size:11px; color:#c0c0c0; }\n" +
		"#slidedown_content .sunriseFooter {height:40px;font-family:arial,tahoma,verdana,sans-serif;font-size:25px;font-weight:bold;color:#272727;margin-top:10px;line-height:14px;}\n" +
		"#slidedown_content .sunriseContent li {padding:0; margin:4px 0;}\n" +
		".sunriseClear {clear:both;}\n" +
		"#slidedown_content	table *{vertical-align:top;font-size:12px;color:#c0c0c0;text-align:left;font-family:arial,tahoma,verdana,sans-serif;}\n" +
		"#slidedown_content h1{!important;font-size:25;font:bold 20px arial;color:#F26521;margin-top:13px;margin-left:15px;margin-right:15px;border-bottom:2px solid #F26521;}"+
		"#slidedown_content textArea{!important;height:70px;width:125px;padding:0;font-family:arial,tahoma,verdana,sans-serif;color:#272727;}\n" +
		"#slidedown_content .twoRow{!important;height:48px;width:125px;}\n" +
		"#slidedown_content input{!important;font-family:arial,tahoma,verdana,sans-serif;color:#272727;}\n" +
		"#slidedown_content option{!important;font-family:arial,tahoma,verdana,sans-serif;color:#272727;}\n" +
		"#slidedown_content select{!important;font-family:arial,tahoma,verdana,sans-serif;color:#272727;}\n" +		
		"#slidedown_content #SSAZIP{!important;width:75px;}\n" +		
		"#slidedown_content #SSAAGE{!important;width:75px;}\n" +			
		"#slidedown_content #SSACITY{!important;width:75px;}\n" +		
		"#slidedown_content #SSAFNAME{!important;width:75px;height:18px;}\n" +						
		"#slidedown_content #SSALNAME{!important;width:75px;height:18px;}\n" +		
		"#slidedown_content #SSAphone{!important;width:75px;}\n" +										
		"#slidedown_content #SSAlevelOfEdu{!important;width:75px;font-size:10px;}\n" +										
		"#slidedown_content #SSstartDateRange{!important;width:75px;}\n" +	
		"#slidedown_content #SSASTATE{!important;width:80px;}\n" +												
		"#slidedown_content #SSAanticaptedStartDate{!important;width:75px;}\n" +												
		"#slidedown_content a{!important;font-family:arial,tahoma,verdana,sans-serif;font-size:1.25em;}\n" +		
		"#slidedown_content	table {!important;border-right:5px ridge #c0c0c0;width:400px;vertical-align:baseline;height:241px;line-height:16px;margin-left:5px;text-align:center;}\n" +
		"#slidedown_content	table td {!important;padding:3px;font-weight:bold;}\n" +	
		"#slidedown_content	table thead th {!important;color:#fff;font-size:135%;background-color: #f26521;padding: 4px 6px;font-weight:normal;}\n" +
		"#slidedown_content	table th {!important;font-size:12px;padding: 6px;font-weight:boldest;}\n" +
		"#slidedown_content	table tbody th.sub {!important;font-size:100%;color:#000;background: #efefef url(\"http://webserver/css/images/sprites.gif\") repeat-x 0 -1500px;padding: 6px}\n" +
		"#slidedown_content	table th a{!important;text-decoration: none;display: block;width: 100%;}\n" +
		"#slidedown_content	table th a:link, .table1 th a:visited {!important;color: #E4D9D6;background-color: #f26521;}\n" +
		"#slidedown_content	table th a:hover, .table1 th a:active {!important;color: #544F3F; text-decoration: underline;}\n" +
		"#slidedown_content .left {!important;float:left;margin-left:50px;}\n" +
		"#slidedown_content .right{!important;float:right;margin-right:22px;}\n" +
		"#slidedown_content .awesome{width:100px;margin-top:10px;font-family:arial,tahoma,verdana,sans-serif;font-size: 13px;-moz-box-shadow: 0 1px 3px rgba(0,0,0,0.5);-webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.5);text-shadow: 0 -1px 1px rgba(0,0,0,0.25);border-bottom: 1px solid rgba(0,0,0,0.25);background: #272727 url('http://webserver/css/images/alert-overlay.png') repeat-x;display: inline-block;padding: 5px 10px 6px;color: #efefef;text-decoration: none;font-weight: bold;line-height: 1;-moz-border-radius: 5px;-webkit-border-radius: 5px;-moz-box-shadow: 0 1px 3px #999;-webkit-box-shadow: 0 1px 3px #999;text-shadow: 0 -1px 1px #222;border-bottom: 1px solid #222;position: relative;cursor: pointer;}";
		//Special processing for DMICallVerify to change the absolute pos
		if(window.location.host == "www.dmicallverify.com"){
			slideCode = slideCode + "\n#header {!important; position:inherit;}";
		}
		//Make the output for daterange and level of education
		switch(GM_getValue("af_sd"))
		{
			case "asap":
				var startDateRange = "Immediately";
			break;
			case "1to3":
				var startDateRange = "1 to 3 Months";
			break;
			case "3to6":
				var startDateRange = "4 to 6 Months";
			break;			
		}
		switch(GM_getValue("af_el"))
		{
			case "hs":
				var levelOfEdu = "Highschool Diploma";
			break;
			case "ged":
				var levelOfEdu = "GED";
			break;
			case "someCollege":
				var levelOfEdu = "Some College";
			break;
			case "aDegree":
				var levelOfEdu = "Associates Degree";
			break;
			case "bDegree":
				var levelOfEdu = "Bachelors Degree";
			break;
			case "mDegree":
				var levelOfEdu = "Masters Degree";
			break;
			case "dDegree":
				var levelOfEdu = "Doctoral Degree";
			break;
		}
		var stateSelect = '<select name="SSASTATE" id="SSASTATE" class="twoRow">' + 
		'	<option value="AL">Alabama</option>' + 
		'	<option value="AK">Alaska</option>' + 
		'	<option value="AZ">Arizona</option>' + 
		'	<option value="AR">Arkansas</option>' + 
		'	<option value="CA">California</option>' + 
		'	<option value="CO">Colorado</option>' + 
		'	<option value="CT">Connecticut</option>' + 
		'	<option value="DE">Delaware</option>' + 
		'	<option value="FL">Florida</option>' + 
		'	<option value="GA">Georgia</option>' + 
		'	<option value="HI">Hawaii</option>' + 
		'	<option value="ID">Idaho</option>' + 
		'	<option value="IL">Illinois</option>' + 
		'	<option value="IN">Indiana</option>' + 
		'	<option value="IA">Iowa</option>' + 
		'	<option value="KS">Kansas</option>' + 
		'	<option value="KY">Kentucky</option>' + 
		'	<option value="LA">Louisiana</option>' + 
		'	<option value="ME">Maine</option>' + 
		'	<option value="MD">Maryland</option>' + 
		'	<option value="MA">Massachusetts</option>' + 
		'	<option value="MI">Michigan</option>' + 
		'	<option value="MN">Minnesota</option>' + 
		'	<option value="MS">Mississippi</option>' + 
		'	<option value="MO">Missouri</option>' + 
		'	<option value="MT">Montana</option>' + 
		'	<option value="NE">Nebraska</option>' + 
		'	<option value="NV">Nevada</option>' + 
		'	<option value="NH">New Hampshire</option>' + 
		'	<option value="NJ">New Jersey</option>' + 
		'	<option value="NM">New Mexico</option>' + 
		'	<option value="NY">New York</option>' + 
		'	<option value="NC">North Carolina</option>' + 
		'	<option value="ND">North Dakota</option>' + 
		'	<option value="OH">Ohio</option>' + 
		'	<option value="OK">Oklahoma</option>' + 
		'	<option value="OR">Oregon</option>' + 
		'	<option value="PA">Pennsylvania</option>' + 
		'	<option value="RI">Rhode Island</option>' + 
		'	<option value="SC">South Carolina</option>' + 
		'	<option value="SD">South Dakota</option>' + 
		'	<option value="SD">South Dakota</option>' + 
		'	<option value="TN">Tennessee</option>' + 
		'	<option value="TX">Texas</option>' + 
		'	<option value="UT">Utah</option>' + 
		'	<option value="VT">Vermont</option>' + 
		'	<option value="VA">Virginia</option>' + 
		'	<option value="WA">Washington</option>' + 
		'	<option value="DC">Washington D.C.</option>' + 
		'	<option value="WV">West Virginia</option>' + 
		'	<option value="WI">Wisconsin</option>' + 
		'	<option value="WY">Wyoming</option>' + 
		'</select>';
		//Make stateStr
		var stateStr = '"' + GM_getValue("af_st") + '"';
		var stateSelectedStr = stateStr + " selected";
		//Now put selected by the state set as a greasemonkey var.
		stateSelect = stateSelect.replace(stateStr, stateSelectedStr);
		var infoDivGuiCode = '';
		var topSlideDownCode = "";	
		infoDivGuiCode = infoDivGuiCode + "	<div class=\"sunriseContent\">" +
		'<div class="sunriseBlock">' +
		'<input type="button" id="saveChanges" name="saveChanges" value="Save Changes" class="awesome"><br />' +
		'<input type="button" id="endCall" name="endCall" value="End Call" class="awesome"><br />' +
		'<input type="button" id="bugTracker" name="bugTracker" value="Bug Report" class="awesome" onClick="javascript: window.open(\'http://webserver/admin/bugTracker.php\',\'BugTracker\');"><br />' +	
		'<input type="button" id="mySales" name="mySales" value="My Sales" class="awesome" onClick="javascript: window.open(\'http://webserver/admin/mySales.php\',\'MySales\');"><br />' +						
		'<input type="button" id="hideInfo" name="hideInfo" value="Hide Info" class="awesome"><br />' +						
		'</div>' +
		'<table>' +

			'<tr>' +
				'<th>*Name:</th>' +
				'<td><input type="text" id="SSAFNAME" value="' + GM_getValue("af_fn") + '"/><input type="text" id="SSALNAME" value="' + GM_getValue("af_ln") + '"/></td>' +
				'<th>*Age:</th>' +
				'<td><input type="text" id="SSAAGE" class="twoRow" value="' + GM_getValue("af_ye") + '"/></td>' +
				'<th>Phone:</th>' +
				'<td><input type="text" class="twoRow" id="SSAphone" value="' + GM_getValue("af_ph") + '" readonly=1 /></td>' +
				'<th>*Email:</th>' +
				'<td><textArea id="SSAEMAIL" class="twoRow">' + GM_getValue("af_em") + '</textArea></td>' +
				'<th>*Notes:</th>' +
				'<td><textarea name="SSANOTES" id="SSANOTES">' + GM_getValue("notes") + '</textarea></td>' +				
			'</tr>' +
			'<tr>' +
				'<th>*City:</th>' +
				'<td><input type="text" class="twoRow" id="SSACITY" value="' + GM_getValue("af_ci") + '" readonly=1 /></td>' +
				'<th>*State:</th>' +
				'<td class="selectTD">' + stateSelect + '</td>' +
				'<th>*Zip:</th>' +
				'<td><input type="text" class="twoRow" id="SSAZIP" value="' + GM_getValue("af_zi") + '"/></td>' +				
				'<th>*Address:</th>' +
				'<td><input type="text" class="twoRow" id="SSAADDRESS" value="' + GM_getValue("af_ad") + '"/></td>' +
				'<th>*Schools Submitted:</th>' +
				'<td colspan="2">' + 
					'<input type="text" id="SSASCHOOLSSUBMITTED" onchange="SSAUpdateSchoolsSubmitted();" /><br />' +
					'<span id="SSASCHOOLSSUBMITTEDOUTPUT">' + GM_getValue("schoolsSubmitted") + '</span>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Level of Edu:</th>' +
				'<td><input type="text" class="twoRow" id="SSAlevelOfEdu" value="' + levelOfEdu + '" readonly=1 /></td>' +
				'<th>Start Date Range:</th>' +
				'<td><input type="text" class="twoRow" id="SSstartDateRange" value="' + startDateRange + '" readonly=1 /></td>' +
				'<th>Start Date:</th>' +
				'<td><input type="text" class="twoRow" id="SSAanticaptedStartDate" value="' + GM_getValue("anticaptedStartDate") + '" readonly=1 /></td>' +
				'<th>Grad Year:</th>' +
				'<td><input type="text" class="twoRow" id="SSAestimatedGradYear" value="' + GM_getValue("estimatedGradYear") + '" readonly=1 /></td>' +	
				'<th>Campus Type:</th>' +
				'<td><input type="text" class="twoRow" id="SSACAMPUSTYPE" value="' + GM_getValue("campusType") + '" readonly=1 /></td>' +				
			'</tr>' +
		'</table>' +
	"</div>" +
	"<div class=\"sunriseFooter\">Prospect Info</div><div style=\"clear:both;height:25px;\"></div>";		

		//Set thePathName so I can check load infodiv on only proacademix dir of webserver. 
		//(That way it won't show on time clock or other pages)
		var thePathName = window.location.pathname;
		var thePage = thePathName.substring(thePathName.lastIndexOf('/') + 1);
		var loaded = 0;
		for (var hostLoopCount=0; hostLoopCount<siteHostsArray.length; hostLoopCount++){
			if(window.location.host == siteHostsArray[hostLoopCount] || thePathName.indexOf("proacademix") != -1 || thePage.indexOf("regEDUToTransfer.php") != -1 && loaded == 0){
				/*/Get all the body content
				var body = document.getElementsByTagName('body')[0];
				var bodyCode = body.innerHTML;
				bodyCode = "<div id='slidedown_bottom'>" + bodyCode + "</div>";
				body.innerHTML = bodyCode;*/
				//Add Jquery
				loaded = 1;
				var head= document.getElementsByTagName('head')[0];
				if(thePathName != "/lp/cc/index.php" && thePathName != "/lp/cc/"){
					var script= document.createElement('script');
					script.type= 'text/javascript';
					script.src= 'http://webserver/js/jquery.js'; 
					//jquery-1.3.1.min.js
					head.appendChild(script);
				}else{
					alert('NO JQUERY FOR DA');
				}
				//Add easing script
				var script= document.createElement('script');
				script.type= 'text/javascript';
				script.src= 'http://webserver/js/jquery.easing.1.2.js';
				head.appendChild(script);			   

				//Insert infoDiv Style 
				var style = document.createElement('style');
				style.innerHTML = slideCode;
				try { document.getElementsByTagName('head')[0].appendChild(style); }
				catch(e) { console.debug(e)}				
				//Insert info div
				var gui1 = document.createElement('div');
				gui1.id = 'slidedown_content';
				gui1.innerHTML = infoDivGuiCode;
				infoDivGuiCode.length = 0;
				document.body.insertBefore(gui1, document.body.firstChild);			   

			   /*/Insert Place Holder Style 
				var style1 = document.createElement('style');
				style1.innerHTML = placeHolderStyleCode;
				try { document.getElementsByTagName('head')[0].appendChild(style1); }
				catch(e) { console.debug(e)}*/
				
				//Insert place holder div
				var gui = document.createElement('div');
				gui.id = 'slidedown_top';
				gui.innerHTML = topSlideDownCode;
				document.body.insertBefore(gui, document.body.firstChild);		


				//Add Our Scripts so we can use the edit stuff.
				var script = document.createElement('script');				
				script.innerHTML = ourScripts;
				script.type
				ourScripts.lenght = 0;
				
				document.getElementsByTagName('head')[0].appendChild(script); 
				
				// Add event SAVE CHANGES
				var sChanges=document.getElementsByName('saveChanges');
				console.debug(sChanges);
				for (var z=0;z<sChanges.length;z++){
				  sChanges[z].addEventListener('click', updateValues, false);
				}
				//Add event End Call
				var sChanges=document.getElementsByName('endCall');
				console.debug(sChanges);
				for (var z=0;z<sChanges.length;z++){
				  sChanges[z].addEventListener('click', updateValues, false);
				}
				//Add event End Call
				var sChanges=document.getElementsByName('endCall');
				console.debug(sChanges);
				for (var z=0;z<sChanges.length;z++){
				  sChanges[z].addEventListener('click', endCall, false);
				}
			}
			//Break the loop if we are on proacademix
			if(thePathName.indexOf("proacademix") != -1){
				break;
			}
		}
	}
  //For DA's setTimeOut
  function delay()
  {
	autoPopulate("norepeat");
  }

  function autoPopulate(noRepeat)
    {
      var inputtexts = new Array(
      new Array (GM_getValue('af_ot',''),""), /* This one is used as a wildcard (if you want undetected fields to fill with something) */
	  new Array (GM_getValue('af_ok','001001'),										"keywords"), /* 180 Keywords (log in to 180) */
	  new Array (GM_getValue('af_ca','4813'),										"question_401[value]"), /* 180 Keywords (log in to 180) */
      new Array (GM_getValue('af_ye','18'),										"age"), /* age */
      new Array (GM_getValue('af_ti','Dr.'),														"title","salutation"), /* title */
      new Array (GM_getValue('af_ge',''),														"gender"), /* gender */ 
	  new Array (GM_getValue('af_nn',''),												"user","display","login","nick","id","member","account","name"), /* username */
      new Array (GM_getValue('af_fn','Garold'),													"first","firstname","question_9[value]","form[10]","first_name","slfnamefirst","campusexplorer_first_name"), /* first name */
      new Array (GM_getValue('af_ln','Walker'),													"last","lastname","question_10[value]","form[11]","last_name","slfnamelast","campusexplorer_last_name"), /* last name */
      new Array (GM_getValue('af_fn','Garold')+" "+GM_getValue('af_ln','Walker'),"fullname","full_name","auth"), /* first and last name */
      new Array (GM_getValue('af_ph','(513) 972-6287'),									"leadid","homephone","phone","businessphone","cell","form[3101]","form[3102]","slfphoneday","slfphonenight","campusexplorer_phone_preferred"), /* phone number */
      new Array (GM_getValue('af_ap','(513) 972-6287'),									"altphone"), /* alt phone number */
      new Array (GM_getValue('af_ph1','513'),														"xx__phone1","question_13[area_code]","question_12[area_code]","day_phone_area","night_phone_area"), /* phone number part 1 */
      new Array (GM_getValue('af_ph2','972'),														"xx__phone2","question_13[prefix]","question_12[prefix]","day_phone_prefix","night_phone_prefix"), /* phone number part 2 */
      new Array (GM_getValue('af_ph3','6287'),													"xx__phone3","question_13[line_number]","question_12[line_number]","day_phone_suffix","night_phone_suffix"), /* phone number part 3 */
      new Array (GM_getValue('af_ad','4960 Brandy Run'),								"address1","question_20[line_1]","form[15]","address","slfaddressone"), /* address */
      new Array (GM_getValue('af_ci','Dayton'),													"city","question_11[value]","slfcity"), /* city */
      new Array (GM_getValue('af_st','OH'),															"state"), /* state */
	  new Array (GM_getValue('af_rf','Rep First'),															"rep_first"), /* rep first name */
      new Array (GM_getValue('af_rl','Rep Last'),															"rep_last"), /* rep last name */	  
      new Array (GM_getValue('af_ct','United States'),									"country","location"), /* country */
      new Array (GM_getValue('af_zi','45401'),													"txtzipcode","zip","txtZipCode","postalcode","form[4]","question_7[value]","slfzip","zipcode","questions[10]","campusexplorer_zip_cd","zip_code"), /* zip code */
      new Array (GM_getValue('af_em','garoldwalker@mailinator.com'),		"emailaddress","txtEmailAddress","email","form[3]","question_8[value]","slfemail","campusexplorer_email_address"), /* email */
	  new Array (GM_getValue('af_ip','127.0.01'),										"ip"), /* IP Adress */
	  new Array (GM_getValue('gd_yr','2006'),										"gradyear"), /* Grad year */
	  new Array (GM_getValue('af_el','GED'),										"educationlevel"), /* Education Level */
	  new Array (GM_getValue('af_ri','NoRepID'),										"slfrepid") /* Education Level */
      );

      /* Password */
      var inputpasswords = new Array(GM_getValue('af_ps',''),		"pass","pw","retype","confirm","verify"); /* password */
      
      /* You can add or remove from these lists to check, uncheck or leave its default */
      var checkboxes = new Array (
      	new Array ("showemail","receive","pm","news","mail","update","spam","send","offer","agent","press","list"), /* uncheck these boxes */
      	new Array ("optin","tos","terms","coppa","agree","accept","save","remember","age","legal","confirm","token","over") /*  check these boxes */
      );


      // INPUT
       var textElements = document.getElementsByTagName('input');
       for (var i=0;i<textElements.length;i++) {
		   // INPUT type TEXT
			 if (textElements[i].type == 'text' && textElements[i].value == "") {
			   for (var j=0; j<inputtexts.length; j++){
				 for (var k=1; k<inputtexts[j].length; k++){
				   var lowerit = textElements[i].name.toLowerCase();
				   if (lowerit == inputtexts[j][k])
				   {
						textElements[i].value = inputtexts[j][0];
					}
				 }
			   }
			 }
		   // INPUT type PASSWORD
			 if (textElements[i].type == 'password' && textElements[i].value == "") {
			   for (var k=0; k<inputpasswords.length; k++){
				 var lowerit = textElements[i].name.toLowerCase();
				 if (lowerit.search(inputpasswords[k])>=0) {
				   textElements[i].value = inputpasswords[0];
				 }
			   }
			 }
		   // INPUT type CHECKBOX

			 if (textElements[i].type == 'checkbox') {
				//Uncheck
			   for(var j=0;j<checkboxes[0].length;j++)
			   {
				   var lowerit=textElements[i].name.toLowerCase();
				   if(lowerit.search(checkboxes[0][j])>=0)
				   {
						textElements[i].checked=false;
				   }
			   }
			   //Check
			   for(var j=0;j<checkboxes[1].length;j++)
			   {
				   var lowerit=textElements[i].name.toLowerCase();
				   if(lowerit.search(checkboxes[1][j])>=0)
				   {
						textElements[i].checked=true;
				   }
			   }
			 }
		   // INPUT type RADIO
		   /* Selects the last one */
			 //if (textElements[i].type == 'radio') {textElements[i].checked=true;}
       }
      
      
       // Is there any Captcha?
       for (var i=0;i<textElements.length;i++) {
       // INPUT type TEXT
         if (textElements[i].type == 'text') {
           for (var k=1; k<inputtexts[1].length; k++){
             var lowerit = textElements[i].name.toLowerCase();
             if (lowerit.search(inputtexts[1][k])>=0) {
               textElements[i].focus();
             }
           }
         }
      }
		// PER PAGE PROCESSING
		/* New Proacademix Processing */
		if( window.location.pathname == "/proacademix/getSchools.php" ){
			GM_setValue('siteUsed','Proacademix');		
		}//End New Proacademix Processing
		/* EDUCATION 180 Landing Page Processing */
		if( window.location.pathname == "/FindYourDegree/landing" ){
			//Set or reset the site used
			GM_setValue('siteUsed','Education 180');		
			//var oneEightyFormTwo = document.forms.namedItem("form");
			//var form = document.forms[0];			
			//Now pick the right value to select for age range.
			//var ageRange = form.elements.namedItem("ageRange");
			var form = document.forms.namedItem("form");
			var ageRange = form.elements.namedItem("ageRange");
						
			if ( GM_getValue("af_ye") <= 16)
			{
				ageRange.options[1].selected = true;
			}
			if (GM_getValue("af_ye")  >= 17 && GM_getValue("af_ye") <= 18)
			{
				ageRange.options[2].selected = true;
			}
			if (GM_getValue("af_ye")  >= 19 && GM_getValue("af_ye") <= 20)
			{
				ageRange.options[3].selected = true;
			}
			if (GM_getValue("af_ye")  >= 21 && GM_getValue("af_ye") <= 22)
			{
				ageRange.options[4].selected = true;
			}	
			if (GM_getValue("af_ye")  >= 23 && GM_getValue("af_ye") <= 24)
			{
				ageRange.options[5].selected = true;
			}
			if (GM_getValue("af_ye")  >= 25 && GM_getValue("af_ye") <= 30)
			{
				ageRange.options[6].selected = true;
			}
			if (GM_getValue("af_ye")  >= 31 && GM_getValue("af_ye") <= 35)
			{
				ageRange.options[7].selected = true;
			}
			if (GM_getValue("af_ye")  >= 36 && GM_getValue("af_ye") <= 40)
			{
				ageRange.options[8].selected = true;
			}
			if (GM_getValue("af_ye")  >= 41 && GM_getValue("af_ye") <= 50)
			{
				ageRange.options[9].selected = true;
			}
			if (GM_getValue("af_ye")  >= 51 && GM_getValue("af_ye") <= 60)
			{
				ageRange.options[10].selected = true;
			}
			if (GM_getValue("af_ye")  >= 61)
			{
				ageRange.options[11].selected = true;
			}			
		}//End 180 Landing Page
		/* EDUCATION 180 Match Schools Page */
		if( window.location.pathname == "/FindYourDegree/matchSchools" ){
		
			var form = document.forms.namedItem("schoolform");
			var eduLevel = form.elements.namedItem("educationLevel");
			//Set t
			if (GM_getValue("af_el") == "hs")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "ged")
			{
				eduLevel.options[1].selected = true;
			}
			if (GM_getValue("af_el") == "vocational")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "someCollege")
			{
				eduLevel.options[4].selected = true;
			}
			if (GM_getValue("af_el") == "aDegree")
			{
				eduLevel.options[7].selected = true;
			}
			if (GM_getValue("af_el") == "bDegree")
			{
				eduLevel.options[8].selected = true;
			}
			if (GM_getValue("af_el") == "mDegree")
			{
				eduLevel.options[9].selected = true;
			}
			if (GM_getValue("af_el") == "dDegree")
			{
				eduLevel.options[10].selected = true;
			}
			//Set Salutation Select, (Allowed values from prospect verify are Mr. & Ms.)
			if(GM_getValue('af_ti','Dr.') != "Dr."){
				var salutation = form.elements.namedItem("salutation");
				if (GM_getValue("af_ti") == "Mr.")
				{
					salutation.options[1].selected = true;
				}
				if (GM_getValue("af_ti") == "Ms.")
				{
					salutation.options[2].selected = true;
				}				
			}//End Salutation Select
		}//End 180 Match Schools Page
		/* Monster Second Page Processing */
		if( window.location.href == "http://callcenter1.programadvisor.com/v/dmi3/index/step2" ){
			//Set or reset the site used
			GM_setValue('siteUsed','Monster');		
			var form = document.forms[0];
			/* START DATE RANGE PROCESSING */
			var startDateRange = form.elements.namedItem('form[21483]');
			if (GM_getValue("af_sd") == "asap")
			{
				startDateRange.options[1].selected = true;
			}			
			if (GM_getValue("af_sd") == "1to3")
			{
				startDateRange.options[2].selected = true;
			}		
			if (GM_getValue("af_sd") == "3to6")
			{
				startDateRange.options[3].selected = true;
			}
			/* CAMPUS TYPE PROCESSING */
			var startDateRange = form.elements.namedItem('form[7]');
			if (GM_getValue("campusType") == "both")
			{
				startDateRange.options[1].selected = true;
			}			
			if (GM_getValue("campusType") == "online")
			{
				startDateRange.options[2].selected = true;
			}		
			if (GM_getValue("campusType") == "campus")
			{
				startDateRange.options[3].selected = true;
			}
			/* SALUTATION PROCESSING */
			//(Allowed values from prospect verify are Mr. & Ms.)
			if(GM_getValue('af_ti','Dr.') != "Dr."){
				var salutation = form.elements.namedItem("form[1030]");
				if (GM_getValue("af_ti") == "Mr.")
				{
					salutation.options[1].selected = true;
				}
				if (GM_getValue("af_ti") == "Ms.")
				{
					salutation.options[2].selected = true;
				}				
			}//End Salutation Select		
			/* AGE PROCESSING */
			var ageRange = form.elements.namedItem('form[1305]');
			if ( GM_getValue("af_ye") <= 13)
			{
				ageRange.options[1].selected = true;
			}
			if ( GM_getValue("af_ye") >= 14 && GM_getValue("af_ye") <= 15)
			{
				ageRange.options[2].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 16 && GM_getValue("af_ye") <= 17)
			{
				ageRange.options[3].selected = true;
			}
			if (GM_getValue("af_ye")  >= 18 && GM_getValue("af_ye") <= 20)
			{
				ageRange.options[4].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 21 && GM_getValue("af_ye") <= 22)
			{
				ageRange.options[5].selected = true;
			}
			if (GM_getValue("af_ye")  >= 23 && GM_getValue("af_ye") <= 24)
			{
				ageRange.options[6].selected = true;
			}	
			if (GM_getValue("af_ye")  >= 25 && GM_getValue("af_ye") <= 30)
			{
				ageRange.options[7].selected = true;
			}
			if (GM_getValue("af_ye")  >= 31 && GM_getValue("af_ye") <= 35)
			{
				ageRange.options[8].selected = true;
			}
			if (GM_getValue("af_ye")  >= 36 && GM_getValue("af_ye") <= 40)
			{
				ageRange.options[9].selected = true;
			}
			if (GM_getValue("af_ye")  >= 41 && GM_getValue("af_ye") <= 50)
			{
				ageRange.options[10].selected = true;
			}
			if (GM_getValue("af_ye")  >= 51 && GM_getValue("af_ye") <= 60)
			{
				ageRange.options[11].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 61)
			{
				ageRange.options[12].selected = true;
			}
			/* LEVEL OF EDUCATION PROCESSING */
			var eduLevel = form.elements.namedItem("form[13]");
			if (GM_getValue("af_el") == "hs")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "ged")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "vocational")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "someCollege")
			{
				eduLevel.options[4].selected = true;
			}
			if (GM_getValue("af_el") == "aDegree")
			{
				eduLevel.options[5].selected = true;
			}
			if (GM_getValue("af_el") == "bDegree")
			{
				eduLevel.options[6].selected = true;
			}
			if (GM_getValue("af_el") == "mDegree")
			{
				eduLevel.options[7].selected = true;
			}
			if (GM_getValue("af_el") == "dDegree")
			{
				eduLevel.options[8].selected = true;
			}			
		}//End Monster Second Page Processing
		/* Monster 2 Second Page Processing */
		if( window.location.href == "http://degrees.education.org/v/dmi1A/index/step2" ){
			//Set or reset the site used
			GM_setValue('siteUsed','Monster');		
			var form = document.forms[0];
			/* START DATE RANGE PROCESSING */
			var startDateRange = form.elements.namedItem('form[21483]');
			if (GM_getValue("af_sd") == "asap")
			{
				startDateRange.options[1].selected = true;
			}			
			if (GM_getValue("af_sd") == "1to3")
			{
				startDateRange.options[2].selected = true;
			}		
			if (GM_getValue("af_sd") == "3to6")
			{
				startDateRange.options[3].selected = true;
			}
			/* CAMPUS TYPE PROCESSING */
			var startDateRange = form.elements.namedItem('form[7]');
			if (GM_getValue("campusType") == "both")
			{
				startDateRange.options[1].selected = true;
			}			
			if (GM_getValue("campusType") == "online")
			{
				startDateRange.options[2].selected = true;
			}		
			if (GM_getValue("campusType") == "campus")
			{
				startDateRange.options[3].selected = true;
			}
			/* SALUTATION PROCESSING */
			//(Allowed values from prospect verify are Mr. & Ms.)
			if(GM_getValue('af_ti','Dr.') != "Dr."){
				var salutation = form.elements.namedItem("form[1030]");
				if (GM_getValue("af_ti") == "Mr.")
				{
					salutation.options[1].selected = true;
				}
				if (GM_getValue("af_ti") == "Ms.")
				{
					salutation.options[2].selected = true;
				}				
			}//End Salutation Select		
			/* AGE PROCESSING */
			var ageRange = form.elements.namedItem('form[1305]');
			if ( GM_getValue("af_ye") <= 13)
			{
				ageRange.options[1].selected = true;
			}
			if ( GM_getValue("af_ye") >= 14 && GM_getValue("af_ye") <= 15)
			{
				ageRange.options[2].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 16 && GM_getValue("af_ye") <= 17)
			{
				ageRange.options[3].selected = true;
			}
			if (GM_getValue("af_ye")  >= 18 && GM_getValue("af_ye") <= 20)
			{
				ageRange.options[4].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 21 && GM_getValue("af_ye") <= 22)
			{
				ageRange.options[5].selected = true;
			}
			if (GM_getValue("af_ye")  >= 23 && GM_getValue("af_ye") <= 24)
			{
				ageRange.options[6].selected = true;
			}	
			if (GM_getValue("af_ye")  >= 25 && GM_getValue("af_ye") <= 30)
			{
				ageRange.options[7].selected = true;
			}
			if (GM_getValue("af_ye")  >= 31 && GM_getValue("af_ye") <= 35)
			{
				ageRange.options[8].selected = true;
			}
			if (GM_getValue("af_ye")  >= 36 && GM_getValue("af_ye") <= 40)
			{
				ageRange.options[9].selected = true;
			}
			if (GM_getValue("af_ye")  >= 41 && GM_getValue("af_ye") <= 50)
			{
				ageRange.options[10].selected = true;
			}
			if (GM_getValue("af_ye")  >= 51 && GM_getValue("af_ye") <= 60)
			{
				ageRange.options[11].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 61)
			{
				ageRange.options[12].selected = true;
			}
			/* LEVEL OF EDUCATION PROCESSING */
			var eduLevel = form.elements.namedItem("form[13]");
			if (GM_getValue("af_el") == "hs")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "ged")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "vocational")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "someCollege")
			{
				eduLevel.options[4].selected = true;
			}
			if (GM_getValue("af_el") == "aDegree")
			{
				eduLevel.options[5].selected = true;
			}
			if (GM_getValue("af_el") == "bDegree")
			{
				eduLevel.options[6].selected = true;
			}
			if (GM_getValue("af_el") == "mDegree")
			{
				eduLevel.options[7].selected = true;
			}
			if (GM_getValue("af_el") == "dDegree")
			{
				eduLevel.options[8].selected = true;
			}			
		}//End Monster Second Page Processing		
		/* Course Advisor First Page Processing */
		//This page has horrible field names. But whateves.
		if( window.location.href == "http://forms.courseadvisor.com/site/4813118" ){
			//Set or reset the site used
			GM_setValue('siteUsed','Course Advisor');		
			var form = document.forms[0];
			var ca_elements = document.getElementsByTagName('input');
			/* CAMPUS TYPE PROCESSING */
			var ca_currentCheckBox = 0;
				//Due to the two checkboxes having the same name this is the best way I can find to check them.
			for(var ca_counter = 0; ca_counter<ca_elements.length;ca_counter++)
			{
				if(ca_elements[ca_counter].type == "checkbox"){
					if(ca_elements[ca_counter].name == "question_157[value][]"){					
						//If we are in the first loop the online option is the one we are changing.
						if(ca_currentCheckBox == 0 && (GM_getValue("campusType") == "online" || GM_getValue("campusType") == "both")){
							ca_elements[ca_counter].checked = true;
						}
						//Second loop is 
						if(ca_currentCheckBox == 1 && (GM_getValue("campusType") == "campus" || GM_getValue("campusType") == "both")){
							ca_elements[ca_counter].checked = true;
						}	
						ca_currentCheckBox ++;
					}
				}
			}
			/* START DATE RANGE PROCESSING */
			var startDateRange = form.elements.namedItem('question_18[value]');
			if (GM_getValue("af_sd") == "asap")
			{
				startDateRange.options[1].selected = true;
			}			
			if (GM_getValue("af_sd") == "1to3")
			{
				startDateRange.options[2].selected = true;
			}		
			if (GM_getValue("af_sd") == "3to6")
			{
				startDateRange.options[3].selected = true;
			}
			/* AGE PROCESSING */
			var ageRange = form.elements.namedItem('question_3[value]');
			if ( GM_getValue("af_ye") < 13)
			{
				ageRange.options[1].selected = true;
			}
			if ( GM_getValue("af_ye") >= 13 && GM_getValue("af_ye") <= 16)
			{
				ageRange.options[2].selected = true;
			}			
			if (GM_getValue("af_ye")  == 17)
			{
				ageRange.options[3].selected = true;
			}
			if (GM_getValue("af_ye")  == 18)
			{
				ageRange.options[4].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 19 && GM_getValue("af_ye") <= 20)
			{
				ageRange.options[5].selected = true;
			}
			if (GM_getValue("af_ye")  >= 21 && GM_getValue("af_ye") <= 22)
			{
				ageRange.options[6].selected = true;
			}	
			if (GM_getValue("af_ye")  >= 23 && GM_getValue("af_ye") <= 30)
			{
				ageRange.options[7].selected = true;
			}
			if (GM_getValue("af_ye")  >= 31 && GM_getValue("af_ye") <= 40)
			{
				ageRange.options[8].selected = true;
			}
			if (GM_getValue("af_ye")  >= 41 && GM_getValue("af_ye") <= 50)
			{
				ageRange.options[9].selected = true;
			}
			if (GM_getValue("af_ye")  >= 51 && GM_getValue("af_ye") <= 60)
			{
				ageRange.options[10].selected = true;
			}
			if (GM_getValue("af_ye")  >= 61)
			{
				ageRange.options[11].selected = true;
			}
			/* LEVEL OF EDUCATION PROCESSING */
			var eduLevel = form.elements.namedItem("question_5[value]");
			if (GM_getValue("af_el") == "hs")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "ged")
			{
				eduLevel.options[1].selected = true;
			}
			if (GM_getValue("af_el") == "vocational")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "someCollege")
			{
				eduLevel.options[5].selected = true;
			}
			if (GM_getValue("af_el") == "aDegree")
			{
				eduLevel.options[7].selected = true;
			}
			if (GM_getValue("af_el") == "bDegree")
			{
				eduLevel.options[8].selected = true;
			}
			if (GM_getValue("af_el") == "mDegree")
			{
				eduLevel.options[9].selected = true;
			}
			if (GM_getValue("af_el") == "dDegree")
			{
				eduLevel.options[10].selected = true;
			}
			//Set Salutation Select, (Allowed values from prospect verify are Mr. & Ms.)
			if(GM_getValue('af_ti','Dr.') != "Dr."){
				var salutation = form.elements.namedItem("question_21[value]");
				if (GM_getValue("af_ti") == "Mr.")
				{
					salutation.options[1].selected = true;
				}
				if (GM_getValue("af_ti") == "Ms.")
				{
					salutation.options[2].selected = true;
				}				
			}
			/* START STATE SELECTION */
			var stateSelect = form.elements.namedItem("question_19[value]");
			if (GM_getValue("af_st") == "AL")
			{
				stateSelect.options[1].selected = true;
			}
			if (GM_getValue("af_st") == "AK")
			{
				stateSelect.options[2].selected = true;
			}
			if (GM_getValue("af_st") == "AZ")
			{
				stateSelect.options[4].selected = true;
			}
			if (GM_getValue("af_st") == "AR")
			{
				stateSelect.options[5].selected = true;
			}
			if (GM_getValue("af_st") == "CA")
			{
				stateSelect.options[12].selected = true;
			}
			if (GM_getValue("af_st") == "CO")
			{
				stateSelect.options[13].selected = true;
			}
			if (GM_getValue("af_st") == "CT")
			{
				stateSelect.options[14].selected = true;
			}
			if (GM_getValue("af_st") == "DE")
			{
				stateSelect.options[15].selected = true;
			}
			if (GM_getValue("af_st") == "DC")
			{
				stateSelect.options[16].selected = true;
			}
			if (GM_getValue("af_st") == "FL")
			{
				stateSelect.options[18].selected = true;
			}
			if (GM_getValue("af_st") == "GA")
			{
				stateSelect.options[19].selected = true;
			}
			if (GM_getValue("af_st") == "HI")
			{
				stateSelect.options[21].selected = true;
			}
			if (GM_getValue("af_st") == "ID")
			{
				stateSelect.options[22].selected = true;
			}
			if (GM_getValue("af_st") == "IL")
			{
				stateSelect.options[23].selected = true;
			}
			if (GM_getValue("af_st") == "IN")
			{
				stateSelect.options[24].selected = true;
			}
			if (GM_getValue("af_st") == "IA")
			{
				stateSelect.options[25].selected = true;
			}
			if (GM_getValue("af_st") == "KS")
			{
				stateSelect.options[26].selected = true;
			}
			if (GM_getValue("af_st") == "KY")
			{
				stateSelect.options[27].selected = true;
			}
			if (GM_getValue("af_st") == "LA")
			{
				stateSelect.options[28].selected = true;
			}
			if (GM_getValue("af_st") == "ME")
			{
				stateSelect.options[29].selected = true;
			}
			if (GM_getValue("af_st") == "MD")
			{
				stateSelect.options[31].selected = true;
			}
			if (GM_getValue("af_st") == "MA")
			{
				stateSelect.options[32].selected = true;
			}
			if (GM_getValue("af_st") == "MI")
			{
				stateSelect.options[33].selected = true;
			}
			if (GM_getValue("af_st") == "MN")
			{
				stateSelect.options[34].selected = true;
			}
			if (GM_getValue("af_st") == "MS")
			{
				stateSelect.options[35].selected = true;
			}
			if (GM_getValue("af_st") == "MO")
			{
				stateSelect.options[36].selected = true;
			}
			if (GM_getValue("af_st") == "MT")
			{
				stateSelect.options[37].selected = true;
			}
			if (GM_getValue("af_st") == "NE")
			{
				stateSelect.options[38].selected = true;
			}
			if (GM_getValue("af_st") == "NV")
			{
				stateSelect.options[39].selected = true;
			}
			if (GM_getValue("af_st") == "NH")
			{
				stateSelect.options[40].selected = true;
			}
			if (GM_getValue("af_st") == "NJ")
			{
				stateSelect.options[41].selected = true;
			}
			if (GM_getValue("af_st") == "NM")
			{
				stateSelect.options[42].selected = true;
			}
			if (GM_getValue("af_st") == "NY")
			{
				stateSelect.options[43].selected = true;
			}
			if (GM_getValue("af_st") == "NC")
			{
				stateSelect.options[44].selected = true;
			}
			if (GM_getValue("af_st") == "ND")
			{
				stateSelect.options[45].selected = true;
			}
			if (GM_getValue("af_st") == "OH")
			{
				stateSelect.options[47].selected = true;
			}
			if (GM_getValue("af_st") == "OK")
			{
				stateSelect.options[48].selected = true;
			}
			if (GM_getValue("af_st") == "OR")
			{
				stateSelect.options[49].selected = true;
			}
			if (GM_getValue("af_st") == "PA")
			{
				stateSelect.options[51].selected = true;
			}
			if (GM_getValue("af_st") == "RI")
			{
				stateSelect.options[53].selected = true;
			}
			if (GM_getValue("af_st") == "SC")
			{
				stateSelect.options[54].selected = true;
			}
			if (GM_getValue("af_st") == "SD")
			{
				stateSelect.options[55].selected = true;
			}
			if (GM_getValue("af_st") == "TN")
			{
				stateSelect.options[56].selected = true;
			}
			if (GM_getValue("af_st") == "TX")
			{
				stateSelect.options[57].selected = true;
			}
			if (GM_getValue("af_st") == "UT")
			{
				stateSelect.options[58].selected = true;
			}
			if (GM_getValue("af_st") == "VT")
			{
				stateSelect.options[59].selected = true;
			}
			if (GM_getValue("af_st") == "VA")
			{
				stateSelect.options[61].selected = true;
			}
			if (GM_getValue("af_st") == "WA")
			{
				stateSelect.options[62].selected = true;
			}
			if (GM_getValue("af_st") == "WV")
			{
				stateSelect.options[63].selected = true;
			}
			if (GM_getValue("af_st") == "WI")
			{
				stateSelect.options[64].selected = true;
			}
			if (GM_getValue("af_st") == "WY")
			{
				stateSelect.options[65].selected = true;
			}
			/* COUNTRY SELECT */
			var countrySelect = form.elements.namedItem("question_60[value]");
			countrySelect.options[1].selected = true;
			//alert(GM_getValue("af_st"));		
		}//End Course Advisor First Page Processing
		/* Degree America Processing */
		if( window.location.pathname == "/lp/cc/index.php" ){
			//Set or reset the site used
			GM_setValue('siteUsed','Degree America');
			//If they are on "sunriseremarketing.degreeamerica.com" it is a remark
			if(window.location.host == "sunriseremarketing.degreeamerica.com"){
				GM_setValue('siteUsed','Remark');			
			}
			if(window.location.host == "prospectives.degreeamerica.com"){
				GM_setValue('siteUsed','Ampush');			
			}			
			//The log in form doesn't pop up before the autofill 
			//script runs so I setTimeout and then rerun the autofill function
			if ( noRepeat == null ){
				window.setTimeout(delay,300);
			}else{
				//Find the select button with a calss "span-3 button last"
				//That select is the one for the log in box that pops up. 
				var allButtons, thisButton;
				allButtons = document.evaluate(
					"//input[@class='span-3 button last']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
				thisButton = allButtons.snapshotItem(0);
				if(thisButton != null){
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window,
					0, 0, 0, 0, 0, false, false, false, false, 0, null);
					thisButton.dispatchEvent(evt);							
				}
				//Campus type selection, these are divs and that need a click event created for them.
				if(GM_getValue('campusType') == "campus" || GM_getValue('campusType') == "online")
				{
					var allDivs, thisDiv;
					allDivs = document.evaluate(
						"//div[@class='span-2 campus_pref button']",
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);
					for (var i = 0; i < allDivs.snapshotLength; i++) {
						if(GM_getValue('campusType') == "online" && i == 0){
							thisDiv = allDivs.snapshotItem(i);
							var evt = document.createEvent("MouseEvents");
							evt.initMouseEvent("click", true, true, window,
							0, 0, 0, 0, 0, false, false, false, false, 0, null);
							thisDiv.dispatchEvent(evt);						
						}
						if(GM_getValue('campusType') == "campus" && i == 1){
							thisDiv = allDivs.snapshotItem(i);
							var evt = document.createEvent("MouseEvents");
							evt.initMouseEvent("click", true, true, window,
							0, 0, 0, 0, 0, false, false, false, false, 0, null);
							thisDiv.dispatchEvent(evt);						
						}
					}
				}
				//Campus type both is a different class. 
				if(GM_getValue('campusType') == "both"){
					var allDivs, thisDiv;
					allDivs = document.evaluate(
						"//div[@class='span-2 campus_pref button last']",
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);
					thisDiv = allDivs.snapshotItem(0);
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window,
					0, 0, 0, 0, 0, false, false, false, false, 0, null);
					thisDiv.dispatchEvent(evt);							
				}
				//Education Level Select Processing
				var form = document.forms[0];
				var eduLevel = form.elements.namedItem("education_level");
				if(eduLevel != null){
					if (GM_getValue("af_el") == "hs")
					{
						eduLevel.options[3].selected = true;
					}
					if (GM_getValue("af_el") == "ged")
					{
						eduLevel.options[2].selected = true;
					}
					if (GM_getValue("af_el") == "vocational")
					{
						eduLevel.options[3].selected = true;
					}
					if (GM_getValue("af_el") == "someCollege")
					{
						eduLevel.options[4].selected = true;
					}
					if (GM_getValue("af_el") == "aDegree")
					{
						eduLevel.options[7].selected = true;
					}
					if (GM_getValue("af_el") == "bDegree")
					{
						eduLevel.options[8].selected = true;
					}
					if (GM_getValue("af_el") == "mDegree")
					{
						eduLevel.options[9].selected = true;
					}
					if (GM_getValue("af_el") == "dDegree")
					{
						eduLevel.options[10].selected = true;
					}					
				}
				
				/* START DATE RANGE PROCESSING */
				var startDateRange = form.elements.namedItem('enroll');
				if(startDateRange != null){
					if (GM_getValue("af_sd") == "asap")
					{
						startDateRange.options[1].selected = true;
					}			
					if (GM_getValue("af_sd") == "1to3")
					{
						startDateRange.options[2].selected = true;
					}		
					if (GM_getValue("af_sd") == "3to6")
					{
						startDateRange.options[3].selected = true;
					}	
				}
				//This step clicks all the "yes" boxes.
				//May need to remove it if management has a problem with it.
				var allDivs, thisDiv;
				allDivs = document.evaluate(
					"//div[@class='span-2 button'] | //div[@class='span-2 record button']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);				
				for (var i = 0; i < allDivs.snapshotLength; i++) {
					thisDiv = allDivs.snapshotItem(i);
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window,
					0, 0, 0, 0, 0, false, false, false, false, 0, null);
					thisDiv.dispatchEvent(evt);						
				}
			}//End repeat if
		}//End DA page processing
		/* Earn My Degree Processing */
		/* Looks like the forms for the various schools are different in respect to 
		   the values used for level_of_education select and the start date. 
		   The contact information auto-populates on all pages though. 
		   Will have to just keep this info available to the user. This code below works on 
		   the Capella University form. Will have to revisit this later. */
		if( window.location.host == "forms.earnmydegree.com" ){
			//Set or reset the site used
			GM_setValue('siteUsed','Earn My Degree');
			if( window.location.pathname == "/capella/"){
				var form = document.forms.namedItem("Entry");
				var eduLevel = form.elements.namedItem("level_of_education");
				if(eduLevel != null){
					//LEVEL OF EDUCATION PROCESSING
					if (GM_getValue("af_el") == "hs")
					{
						eduLevel.options[3].selected = true;
					}
					if (GM_getValue("af_el") == "ged")
					{
						eduLevel.options[1].selected = true;
					}
					if (GM_getValue("af_el") == "vocational")
					{
						eduLevel.options[3].selected = true;
					}
					if (GM_getValue("af_el") == "someCollege")
					{
						eduLevel.options[5].selected = true;
					}
					if (GM_getValue("af_el") == "aDegree")
					{
						eduLevel.options[6].selected = true;
					}
					if (GM_getValue("af_el") == "bDegree")
					{
						eduLevel.options[11].selected = true;
					}
					if (GM_getValue("af_el") == "mDegree")
					{
						eduLevel.options[14].selected = true;
					}
					if (GM_getValue("af_el") == "dDegree")
					{
						eduLevel.options[17].selected = true;
					}
				}
				//START DATE PROCESSING
				//This one is a bit different than the others, it asks for the projected start date.
				//So I take today's date (0 = January) add 1 for asap, 4 for 1-3, 7 for 4-6
				
				var startDateMonth = form.elements.namedItem("dlMonth");//The Month Select
				var startDateYear = form.elements.namedItem("dlYear");//The Year Select
				var today = new Date();//Today
				var monthToSelect, yearToSelect;//Set the vars that will do the picking
				if(startDateMonth != null){
					if (GM_getValue("af_sd") == "asap")
					{
						//Parse month and year from today's date.
						var monthToSelect = today.getMonth() +1;
						var yearToSelect = today.getFullYear();
						//Go a head and set the month
						startDateMonth.options[monthToSelect].selected = true;
						//Loop through all the year options
						for(var yearCount = 0;yearCount<startDateYear.length;yearCount++)
						{
							//Luckly the value of the options are the year. So I find the one that is = to yearToSelect
							if(startDateYear.options[yearCount].value == yearToSelect)
							{
								startDateYear.options[yearToSelect].selected = true;
							}
						}
					}			
					if (GM_getValue("af_sd") == "1to3")
					{
						var monthToSelect = today.getMonth() + 4;
						var yearToSelect = today.getFullYear();
						//For 1-3 and 4-6 gotta make sure the month is lt 12
						if(monthToSelect > 12){
							monthToSelect = monthToSelect - 12;
							//If the monthToSelect is gt 12 add the year.
							yearToSelect ++;
						}
						startDateMonth.options[monthToSelect].selected = true;
						for(var yearCount=0;yearCount<startDateYear.length;yearCount++)
						{
							if(startDateYear.options[yearCount].value == yearToSelect)
							{
								startDateYear.options[yearCount].selected = true;
							}
						}
					}		
					if (GM_getValue("af_sd") == "3to6")
					{
						var monthToSelect = today.getMonth() + 7;
						var yearToSelect = today.getFullYear();
						if(monthToSelect > 12){
							monthToSelect = monthToSelect - 12;
							yearToSelect ++;
						}					
						startDateMonth.options[monthToSelect].selected = true;
						for(var yearCount = 0;yearCount<startDateYear.length;yearCount++)
						{
							if(startDateYear.options[yearCount].value == yearToSelect)
							{
								startDateYear.options[yearToSelect].selected = true;
							}
						}
					}				
				}
				/* AGE PROCESSING */
				var ageRange = form.elements.namedItem('age');
				if(ageRange != null){
					if ( GM_getValue("af_ye") <= 17)
					{
						ageRange.options[1].selected = true;
					}
					if ( GM_getValue("af_ye") >= 18 && GM_getValue("af_ye") <= 23)
					{
						ageRange.options[2].selected = true;
					}			
					if (GM_getValue("af_ye")  >= 24 && GM_getValue("af_ye") <= 29)
					{
						ageRange.options[3].selected = true;
					}
					if (GM_getValue("af_ye")  >= 30 && GM_getValue("af_ye") <= 44)
					{
						ageRange.options[4].selected = true;
					}			
					if (GM_getValue("af_ye")  >= 45)
					{
						ageRange.options[5].selected = true;
					}
				}
			}
		}//End Earn My Degree Processing
		/* Achieve Your Career v3 Step 1 Processing */
		if( window.location.host == "www.achieveyourcareer.com"  && window.location.pathname == "/tim/v3/step1" )
		{
			GM_setValue('siteUsed','Achieve Your Career');
			var form = document.forms[0];			
			/* AGE PROCESSING */
			var ageRange = form.elements.namedItem('slfAge');
			if ( GM_getValue("af_ye") <18)
			{
				ageRange.options[1].selected = true;
			}
			if ( GM_getValue("af_ye") >= 18 && GM_getValue("af_ye") <= 21)
			{
				ageRange.options[2].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 22 && GM_getValue("af_ye") <= 24)
			{
				ageRange.options[3].selected = true;
			}
			if (GM_getValue("af_ye")  >= 25 && GM_getValue("af_ye") <= 29)
			{
				ageRange.options[4].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 30 && GM_getValue("af_ye") <= 34)
			{
				ageRange.options[5].selected = true;
			}
			if (GM_getValue("af_ye")  >= 35 && GM_getValue("af_ye") <= 39)
			{
				ageRange.options[6].selected = true;
			}	
			if (GM_getValue("af_ye")  >= 40 && GM_getValue("af_ye") <= 44)
			{
				ageRange.options[7].selected = true;
			}
			if (GM_getValue("af_ye")  >= 45 && GM_getValue("af_ye") <= 49)
			{
				ageRange.options[8].selected = true;
			}
			if (GM_getValue("af_ye")  >= 50 && GM_getValue("af_ye") <= 54)
			{
				ageRange.options[9].selected = true;
			}
			if (GM_getValue("af_ye")  >= 55 && GM_getValue("af_ye") <= 59)
			{
				ageRange.options[10].selected = true;
			}
			if (GM_getValue("af_ye")  >= 60 && GM_getValue("af_ye") <= 64)
			{
				ageRange.options[11].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 65)
			{
				ageRange.options[12].selected = true;
			}
			/* LEVEL OF EDUCATION PROCESSING */
			var eduLevel = form.elements.namedItem("slfEducationLevel");
			if (GM_getValue("af_el") == "hs")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "ged")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "vocational")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "someCollege")
			{
				eduLevel.options[9].selected = true;
			}
			if (GM_getValue("af_el") == "aDegree")
			{
				eduLevel.options[4].selected = true;
			}
			if (GM_getValue("af_el") == "bDegree")
			{
				eduLevel.options[5].selected = true;
			}
			if (GM_getValue("af_el") == "mDegree")
			{
				eduLevel.options[7].selected = true;
			}
			if (GM_getValue("af_el") == "dDegree")
			{
				eduLevel.options[8].selected = true;
			}			
		}
		/* Achieve Your Career v3 Step 2 Processing */
		if( window.location.host == "www.achieveyourcareer.com"  && window.location.pathname == "/tim/v3/step2" )
		{
			var form = document.forms[0];
			/* START DATE RANGE PROCESSING */
			var startDateRange = form.elements.namedItem('slfStartDate');
			if(startDateRange != null){
				if (GM_getValue("af_sd") == "asap")
				{
					startDateRange.options[1].selected = true;
				}			
				if (GM_getValue("af_sd") == "1to3")
				{
					startDateRange.options[2].selected = true;
				}		
				if (GM_getValue("af_sd") == "3to6")
				{
					startDateRange.options[3].selected = true;
				}	
			}			
		}
		/* Achieve Your Career v2 Step 1 Processing */
		if( window.location.host == "www.achieveyourcareer.com"  && window.location.pathname == "/landingpages/ext/cc22/step1-slfAge" )
		{ 
			//.indexOf('cc47')
			//Set or reset the site used
			GM_setValue('siteUsed','Achieve Your Career');
			var form = document.forms[0];			
			/* AGE PROCESSING */
			var ageRange = form.elements.namedItem('slfAge');
			if ( GM_getValue("af_ye") <18)
			{
				ageRange.options[1].selected = true;
			}
			if ( GM_getValue("af_ye") >= 18 && GM_getValue("af_ye") <= 21)
			{
				ageRange.options[2].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 22 && GM_getValue("af_ye") <= 24)
			{
				ageRange.options[3].selected = true;
			}
			if (GM_getValue("af_ye")  >= 25 && GM_getValue("af_ye") <= 29)
			{
				ageRange.options[4].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 30 && GM_getValue("af_ye") <= 34)
			{
				ageRange.options[5].selected = true;
			}
			if (GM_getValue("af_ye")  >= 35 && GM_getValue("af_ye") <= 39)
			{
				ageRange.options[6].selected = true;
			}	
			if (GM_getValue("af_ye")  >= 40 && GM_getValue("af_ye") <= 44)
			{
				ageRange.options[7].selected = true;
			}
			if (GM_getValue("af_ye")  >= 45 && GM_getValue("af_ye") <= 49)
			{
				ageRange.options[8].selected = true;
			}
			if (GM_getValue("af_ye")  >= 50 && GM_getValue("af_ye") <= 54)
			{
				ageRange.options[9].selected = true;
			}
			if (GM_getValue("af_ye")  >= 55 && GM_getValue("af_ye") <= 59)
			{
				ageRange.options[10].selected = true;
			}
			if (GM_getValue("af_ye")  >= 60 && GM_getValue("af_ye") <= 64)
			{
				ageRange.options[11].selected = true;
			}			
			if (GM_getValue("af_ye")  >= 65)
			{
				ageRange.options[12].selected = true;
			}
			/* LEVEL OF EDUCATION PROCESSING */
			var eduLevel = form.elements.namedItem("slfEducationLevel");
			if (GM_getValue("af_el") == "hs")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "ged")
			{
				eduLevel.options[2].selected = true;
			}
			if (GM_getValue("af_el") == "vocational")
			{
				eduLevel.options[3].selected = true;
			}
			if (GM_getValue("af_el") == "someCollege")
			{
				eduLevel.options[8].selected = true;
			}
			if (GM_getValue("af_el") == "aDegree")
			{
				eduLevel.options[4].selected = true;
			}
			if (GM_getValue("af_el") == "bDegree")
			{
				eduLevel.options[5].selected = true;
			}
			if (GM_getValue("af_el") == "mDegree")
			{
				eduLevel.options[6].selected = true;
			}
			if (GM_getValue("af_el") == "dDegree")
			{
				eduLevel.options[7].selected = true;
			}
			/* START DATE RANGE PROCESSING */
			var startDateRange = form.elements.namedItem('slfStartDate');
			if(startDateRange != null){
				if (GM_getValue("af_sd") == "asap")
				{
					startDateRange.options[1].selected = true;
				}			
				if (GM_getValue("af_sd") == "1to3")
				{
					startDateRange.options[2].selected = true;
				}		
				if (GM_getValue("af_sd") == "3to6")
				{
					startDateRange.options[3].selected = true;
				}	
			}		
		}//end Achieve Your Career Step 1 Processing 
		/* Achieve Your Career Step 3 Processing */
		//They moved their pages around so step two is now step 3.
		if( window.location.host == "www.achieveyourcareer.com"  && window.location.pathname == "/landingpages/ext/cc22/step3-contact-info" )
		{ 
			var form = document.forms[0];			
			/* START STATE SELECTION */
			var stateSelect = form.elements.namedItem("slfState");
			if (GM_getValue("af_st") == "AL")
			{
				stateSelect.options[4].selected = true;
			}
			if (GM_getValue("af_st") == "AK")
			{
				stateSelect.options[5].selected = true;
			}
			if (GM_getValue("af_st") == "AZ")
			{
				stateSelect.options[6].selected = true;
			}
			if (GM_getValue("af_st") == "AR")
			{
				stateSelect.options[7].selected = true;
			}
			if (GM_getValue("af_st") == "CA")
			{
				stateSelect.options[8].selected = true;
			}
			if (GM_getValue("af_st") == "CO")
			{
				stateSelect.options[9].selected = true;
			}
			if (GM_getValue("af_st") == "CT")
			{
				stateSelect.options[10].selected = true;
			}
			if (GM_getValue("af_st") == "DE")
			{
				stateSelect.options[11].selected = true;
			}
			if (GM_getValue("af_st") == "DC")
			{
				stateSelect.options[50].selected = true;
			}
			if (GM_getValue("af_st") == "FL")
			{
				stateSelect.options[12].selected = true;
			}
			if (GM_getValue("af_st") == "GA")
			{
				stateSelect.options[13].selected = true;
			}
			if (GM_getValue("af_st") == "HI")
			{
				stateSelect.options[14].selected = true;
			}
			if (GM_getValue("af_st") == "ID")
			{
				stateSelect.options[15].selected = true;
			}
			if (GM_getValue("af_st") == "IL")
			{
				stateSelect.options[16].selected = true;
			}
			if (GM_getValue("af_st") == "IN")
			{
				stateSelect.options[17].selected = true;
			}
			if (GM_getValue("af_st") == "IA")
			{
				stateSelect.options[18].selected = true;
			}
			if (GM_getValue("af_st") == "KS")
			{
				stateSelect.options[19].selected = true;
			}
			if (GM_getValue("af_st") == "KY")
			{
				stateSelect.options[20].selected = true;
			}
			if (GM_getValue("af_st") == "LA")
			{
				stateSelect.options[21].selected = true;
			}
			if (GM_getValue("af_st") == "ME")
			{
				stateSelect.options[22].selected = true;
			}
			if (GM_getValue("af_st") == "MD")
			{
				stateSelect.options[23].selected = true;
			}
			if (GM_getValue("af_st") == "MA")
			{
				stateSelect.options[24].selected = true;
			}
			if (GM_getValue("af_st") == "MI")
			{
				stateSelect.options[25].selected = true;
			}
			if (GM_getValue("af_st") == "MN")
			{
				stateSelect.options[26].selected = true;
			}
			if (GM_getValue("af_st") == "MS")
			{
				stateSelect.options[28].selected = true;
			}
			if (GM_getValue("af_st") == "MO")
			{
				stateSelect.options[27].selected = true;
			}
			if (GM_getValue("af_st") == "MT")
			{
				stateSelect.options[29].selected = true;
			}
			if (GM_getValue("af_st") == "NE")
			{
				stateSelect.options[30].selected = true;
			}
			if (GM_getValue("af_st") == "NV")
			{
				stateSelect.options[31].selected = true;
			}
			if (GM_getValue("af_st") == "NH")
			{
				stateSelect.options[32].selected = true;
			}
			if (GM_getValue("af_st") == "NJ")
			{
				stateSelect.options[33].selected = true;
			}
			if (GM_getValue("af_st") == "NM")
			{
				stateSelect.options[34].selected = true;
			}
			if (GM_getValue("af_st") == "NY")
			{
				stateSelect.options[35].selected = true;
			}
			if (GM_getValue("af_st") == "NC")
			{
				stateSelect.options[36].selected = true;
			}
			if (GM_getValue("af_st") == "ND")
			{
				stateSelect.options[37].selected = true;
			}
			if (GM_getValue("af_st") == "OH")
			{
				stateSelect.options[38].selected = true;
			}
			if (GM_getValue("af_st") == "OK")
			{
				stateSelect.options[39].selected = true;
			}
			if (GM_getValue("af_st") == "OR")
			{
				stateSelect.options[40].selected = true;
			}
			if (GM_getValue("af_st") == "PA")
			{
				stateSelect.options[41].selected = true;
			}
			if (GM_getValue("af_st") == "RI")
			{
				stateSelect.options[43].selected = true;
			}
			if (GM_getValue("af_st") == "SC")
			{
				stateSelect.options[44].selected = true;
			}
			if (GM_getValue("af_st") == "SD")
			{
				stateSelect.options[45].selected = true;
			}
			if (GM_getValue("af_st") == "TN")
			{
				stateSelect.options[46].selected = true;
			}
			if (GM_getValue("af_st") == "TX")
			{
				stateSelect.options[47].selected = true;
			}
			if (GM_getValue("af_st") == "UT")
			{
				stateSelect.options[48].selected = true;
			}
			if (GM_getValue("af_st") == "VT")
			{
				stateSelect.options[50].selected = true;
			}
			if (GM_getValue("af_st") == "VA")
			{
				stateSelect.options[49].selected = true;
			}
			if (GM_getValue("af_st") == "WA")
			{
				stateSelect.options[52].selected = true;
			}
			if (GM_getValue("af_st") == "WV")
			{
				stateSelect.options[53].selected = true;
			}
			if (GM_getValue("af_st") == "WI")
			{
				stateSelect.options[54].selected = true;
			}
			if (GM_getValue("af_st") == "WY")
			{
				stateSelect.options[55].selected = true;
			}		
			//Check the tosAccecpt radio. 
			var form = document.forms[0];
			var tosAccecpt = form.elements.namedItem("slfContactOK");
			tosAccecpt.checked = true;
		}//end Achieve Your Career Step 2 Processing
		//Start DegreeChemistry processing
		if( window.location.host == "www.degreechemistry.com"	){
				//Set or reset the site used
				GM_setValue('siteUsed','Degree Chemistry');		
				var form = document.forms[0];
			//First Page
			if(window.location.pathname == "/email/general"){
				/* CAMPUS TYPE PROCESSING */
				var startDateRange = form.elements.namedItem('LocationType');
				if (GM_getValue("campusType") == "both")
				{
					startDateRange.options[3].selected = true;
				}			
				if (GM_getValue("campusType") == "online")
				{
					startDateRange.options[1].selected = true;
				}		
				if (GM_getValue("campusType") == "campus")
				{
					startDateRange.options[2].selected = true;			
				}
			//We are on another page or school form page				
			}else{
				//Get the form
				var theForm = document.getElementById("schoolForm");
				//Get the form
				var theElements = theForm.elements;
				//Loop through elements
				for(var i = 0; i < theElements.length; i++){
					//Get the name of the element
					var fieldName = theForm.elements[i].name;
					//Set values
					if(fieldName.indexOf("txtFirst") != -1){
						theForm.elements[i].value = GM_getValue("af_fn");
					}
					//Set values
					if(fieldName.indexOf("txtLast") != -1){
						theForm.elements[i].value = GM_getValue("af_ln");
					}
					//Set values
					if(fieldName.indexOf("txtPhone") != -1){
						theForm.elements[i].value = GM_getValue("af_ph");
					}
					//Set values
					if(fieldName.indexOf("txtPhone2") != -1){
						theForm.elements[i].value = GM_getValue("af_ph");
					}
					//Set values
					if(fieldName.indexOf("txtAddress1") != -1){
						theForm.elements[i].value = GM_getValue("af_ad");
					}
					//Set values
					if(fieldName.indexOf("txtEmail") != -1){
						theForm.elements[i].value = GM_getValue("af_em");
					}
					//Set values
					if(fieldName.indexOf("txtCity") != -1){
						theForm.elements[i].value = GM_getValue("af_ci");
					}
					//Set values
					if(fieldName.indexOf("txtZip") != -1){
						theForm.elements[i].value = GM_getValue("af_zi");
					}
					//Now do state this is a long one.
					/* START STATE SELECTION */					
					if(fieldName.indexOf("ddlState") != -1){
						var stateSelect = theForm.elements[i];
						if (GM_getValue("af_st") == "AL")
						{
							stateSelect.options[1].selected = true;
						}
						if (GM_getValue("af_st") == "AK")
						{
							stateSelect.options[2].selected = true;
						}
						if (GM_getValue("af_st") == "AZ")
						{
							stateSelect.options[6].selected = true;
						}
						if (GM_getValue("af_st") == "AR")
						{
							stateSelect.options[5].selected = true;
						}
						if (GM_getValue("af_st") == "CA")
						{
							stateSelect.options[10].selected = true;
						}
						if (GM_getValue("af_st") == "CO")
						{
							stateSelect.options[11].selected = true;
						}
						if (GM_getValue("af_st") == "CT")
						{
							stateSelect.options[12].selected = true;
						}
						if (GM_getValue("af_st") == "DE")
						{
							stateSelect.options[13].selected = true;
						}
						if (GM_getValue("af_st") == "DC")
						{
							stateSelect.options[14].selected = true;
						}
						if (GM_getValue("af_st") == "FL")
						{
							stateSelect.options[15].selected = true;
						}
						if (GM_getValue("af_st") == "GA")
						{
							stateSelect.options[16].selected = true;
						}
						if (GM_getValue("af_st") == "HI")
						{
							stateSelect.options[17].selected = true;
						}
						if (GM_getValue("af_st") == "ID")
						{
							stateSelect.options[18].selected = true;
						}
						if (GM_getValue("af_st") == "IL")
						{
							stateSelect.options[19].selected = true;
						}
						if (GM_getValue("af_st") == "IN")
						{
							stateSelect.options[20].selected = true;
						}
						if (GM_getValue("af_st") == "IA")
						{
							stateSelect.options[21].selected = true;
						}
						if (GM_getValue("af_st") == "KS")
						{
							stateSelect.options[22].selected = true;
						}
						if (GM_getValue("af_st") == "KY")
						{
							stateSelect.options[23].selected = true;
						}
						if (GM_getValue("af_st") == "LA")
						{
							stateSelect.options[24].selected = true;
						}
						if (GM_getValue("af_st") == "ME")
						{
							stateSelect.options[25].selected = true;
						}
						if (GM_getValue("af_st") == "MD")
						{
							stateSelect.options[26].selected = true;
						}
						if (GM_getValue("af_st") == "MA")
						{
							stateSelect.options[27].selected = true;
						}
						if (GM_getValue("af_st") == "MI")
						{
							stateSelect.options[28].selected = true;
						}
						if (GM_getValue("af_st") == "MN")
						{
							stateSelect.options[29].selected = true;
						}
						if (GM_getValue("af_st") == "MS")
						{
							stateSelect.options[30].selected = true;
						}
						if (GM_getValue("af_st") == "MO")
						{
							stateSelect.options[31].selected = true;
						}
						if (GM_getValue("af_st") == "MT")
						{
							stateSelect.options[32].selected = true;
						}
						if (GM_getValue("af_st") == "NE")
						{
							stateSelect.options[33].selected = true;
						}
						if (GM_getValue("af_st") == "NV")
						{
							stateSelect.options[34].selected = true;
						}
						if (GM_getValue("af_st") == "NH")
						{
							stateSelect.options[35].selected = true;
						}
						if (GM_getValue("af_st") == "NJ")
						{
							stateSelect.options[36].selected = true;
						}
						if (GM_getValue("af_st") == "NM")
						{
							stateSelect.options[37].selected = true;
						}
						if (GM_getValue("af_st") == "NY")
						{
							stateSelect.options[38].selected = true;
						}
						if (GM_getValue("af_st") == "NC")
						{
							stateSelect.options[39].selected = true;
						}
						if (GM_getValue("af_st") == "ND")
						{
							stateSelect.options[40].selected = true;
						}
						if (GM_getValue("af_st") == "OH")
						{
							stateSelect.options[42].selected = true;
						}
						if (GM_getValue("af_st") == "OK")
						{
							stateSelect.options[43].selected = true;
						}
						if (GM_getValue("af_st") == "OR")
						{
							stateSelect.options[45].selected = true;
						}
						if (GM_getValue("af_st") == "PA")
						{
							stateSelect.options[46].selected = true;
						}
						if (GM_getValue("af_st") == "RI")
						{
							stateSelect.options[49].selected = true;
						}
						if (GM_getValue("af_st") == "SC")
						{
							stateSelect.options[50].selected = true;
						}
						if (GM_getValue("af_st") == "SD")
						{
							stateSelect.options[51].selected = true;
						}
						if (GM_getValue("af_st") == "TN")
						{
							stateSelect.options[52].selected = true;
						}
						if (GM_getValue("af_st") == "TX")
						{
							stateSelect.options[53].selected = true;
						}
						if (GM_getValue("af_st") == "UT")
						{
							stateSelect.options[54].selected = true;
						}
						if (GM_getValue("af_st") == "VT")
						{
							stateSelect.options[55].selected = true;
						}
						if (GM_getValue("af_st") == "VA")
						{
							stateSelect.options[56].selected = true;
						}
						if (GM_getValue("af_st") == "WA")
						{
							stateSelect.options[57].selected = true;
						}
						if (GM_getValue("af_st") == "WV")
						{
							stateSelect.options[58].selected = true;
						}
						if (GM_getValue("af_st") == "WI")
						{
							stateSelect.options[59].selected = true;
						}
						if (GM_getValue("af_st") == "WY")
						{
							stateSelect.options[60].selected = true;
						}
					}
					//Set country value
					if(fieldName.indexOf("ddlCountry") != -1){
						var theOptions = theForm.elements[i].options;
						//Loop through theOptions
						for(var o = 0; o < theOptions.length; o++){
							var theText = theForm.elements[i].options[o].text;
							if(theText == "United States" || theText == "USA"){
								theForm.elements[i].options[o].selected = true; 
							}
						}
					}
					if(fieldName.indexOf("chkConsent") != -1){
						theForm.elements[i].checked = true; 
					}
				}//End Elements Loop
			}//End Page Chooser
		}//End DegreeChemistry Processing
		//Start REX processing
		if( window.location.host == "targetmatrex.com"	){
			/* LEVEL OF EDUCATION PROCESSING */
			var form = document.getElementById("targetmatrex");

			/* CAMPUS TYPE PROCESSING */
			var campusType = form.elements.namedItem('questions[743]');
			if (GM_getValue("campusType") == "both")
			{
				campusType.options[3].selected = true;
			}			
			if (GM_getValue("campusType") == "online")
			{
				campusType.options[1].selected = true;
			}		
			if (GM_getValue("campusType") == "campus")
			{
				campusType.options[2].selected = true;
			}

			var stateSelect = form.elements.namedItem('questions[4]');
			if (GM_getValue("af_st") == "AL")
			{
				stateSelect.options[1].selected = true;
			}
			if (GM_getValue("af_st") == "AK")
			{
				stateSelect.options[2].selected = true;
			}
			if (GM_getValue("af_st") == "AZ")
			{
				stateSelect.options[3].selected = true;
			}
			if (GM_getValue("af_st") == "AR")
			{
				stateSelect.options[4].selected = true;
			}
			if (GM_getValue("af_st") == "CA")
			{
				stateSelect.options[5].selected = true;
			}
			if (GM_getValue("af_st") == "CO")
			{
				stateSelect.options[6].selected = true;
			}
			if (GM_getValue("af_st") == "CT")
			{
				stateSelect.options[7].selected = true;
			}
			if (GM_getValue("af_st") == "DE")
			{
				stateSelect.options[8].selected = true;
			}
			if (GM_getValue("af_st") == "DC")
			{
				stateSelect.options[9].selected = true;
			}
			if (GM_getValue("af_st") == "FL")
			{
				stateSelect.options[10].selected = true;
			}
			if (GM_getValue("af_st") == "GA")
			{
				stateSelect.options[11].selected = true;
			}
			if (GM_getValue("af_st") == "HI")
			{
				stateSelect.options[12].selected = true;
			}
			if (GM_getValue("af_st") == "ID")
			{
				stateSelect.options[13].selected = true;
			}
			if (GM_getValue("af_st") == "IL")
			{
				stateSelect.options[14].selected = true;
			}
			if (GM_getValue("af_st") == "IN")
			{
				stateSelect.options[15].selected = true;
			}
			if (GM_getValue("af_st") == "IA")
			{
				stateSelect.options[16].selected = true;
			}
			if (GM_getValue("af_st") == "KS")
			{
				stateSelect.options[17].selected = true;
			}
			if (GM_getValue("af_st") == "KY")
			{
				stateSelect.options[18].selected = true;
			}
			if (GM_getValue("af_st") == "LA")
			{
				stateSelect.options[19].selected = true;
			}
			if (GM_getValue("af_st") == "ME")
			{
				stateSelect.options[20].selected = true;
			}
			if (GM_getValue("af_st") == "MD")
			{
				stateSelect.options[21].selected = true;
			}
			if (GM_getValue("af_st") == "MA")
			{
				stateSelect.options[22].selected = true;
			}
			if (GM_getValue("af_st") == "MI")
			{
				stateSelect.options[23].selected = true;
			}
			if (GM_getValue("af_st") == "MN")
			{
				stateSelect.options[24].selected = true;
			}
			if (GM_getValue("af_st") == "MS")
			{
				stateSelect.options[25].selected = true;
			}
			if (GM_getValue("af_st") == "MO")
			{
				stateSelect.options[26].selected = true;
			}
			if (GM_getValue("af_st") == "MT")
			{
				stateSelect.options[27].selected = true;
			}
			if (GM_getValue("af_st") == "NE")
			{
				stateSelect.options[28].selected = true;
			}
			if (GM_getValue("af_st") == "NV")
			{
				stateSelect.options[29].selected = true;
			}
			if (GM_getValue("af_st") == "NH")
			{
				stateSelect.options[30].selected = true;
			}
			if (GM_getValue("af_st") == "NJ")
			{
				stateSelect.options[31].selected = true;
			}
			if (GM_getValue("af_st") == "NM")
			{
				stateSelect.options[32].selected = true;
			}
			if (GM_getValue("af_st") == "NY")
			{
				stateSelect.options[33].selected = true;
			}
			if (GM_getValue("af_st") == "NC")
			{
				stateSelect.options[34].selected = true;
			}
			if (GM_getValue("af_st") == "ND")
			{
				stateSelect.options[35].selected = true;
			}
			if (GM_getValue("af_st") == "OH")
			{
				stateSelect.options[36].selected = true;
			}
			if (GM_getValue("af_st") == "OK")
			{
				stateSelect.options[37].selected = true;
			}
			if (GM_getValue("af_st") == "OR")
			{
				stateSelect.options[38].selected = true;
			}
			if (GM_getValue("af_st") == "PA")
			{
				stateSelect.options[39].selected = true;
			}
			if (GM_getValue("af_st") == "RI")
			{
				stateSelect.options[40].selected = true;
			}
			if (GM_getValue("af_st") == "SC")
			{
				stateSelect.options[41].selected = true;
			}
			if (GM_getValue("af_st") == "SD")
			{
				stateSelect.options[42].selected = true;
			}
			if (GM_getValue("af_st") == "TN")
			{
				stateSelect.options[43].selected = true;
			}
			if (GM_getValue("af_st") == "TX")
			{
				stateSelect.options[44].selected = true;
			}
			if (GM_getValue("af_st") == "UT")
			{
				stateSelect.options[45].selected = true;
			}
			if (GM_getValue("af_st") == "VT")
			{
				stateSelect.options[46].selected = true;
			}
			if (GM_getValue("af_st") == "VA")
			{
				stateSelect.options[47].selected = true;
			}
			if (GM_getValue("af_st") == "WA")
			{
				stateSelect.options[48].selected = true;
			}
			if (GM_getValue("af_st") == "WV")
			{
				stateSelect.options[49].selected = true;
			}
			if (GM_getValue("af_st") == "WI")
			{
				stateSelect.options[50].selected = true;
			}
			if (GM_getValue("af_st") == "WY")
			{
				stateSelect.options[51].selected = true;
			}			

		}//End Rex Processing
		//Start Campus Explorer processing
		if( window.location.host == "www.campusexplorer.com"	){
			/* LogIn Page Processing */
			var logIn = document.getElementById("signin_signup");
			if(logIn != null){
				//The email
				var logInEmail = logIn.elements.namedItem('emailaddr');
				logInEmail.value="cesunrise@gmail.com";
				//The Password
				var logInPassword = logIn.elements.namedItem('password');
				logInPassword.value="sunriseedu";
			}//End Log in
			/* First & Second Form Processing */ 
			var leadRequestForm = document.getElementById("campusexplorer_lead-request-form-widget");
			if(leadRequestForm != null){
				//Area of Study must be set to this
				var areaOfStudy = leadRequestForm.elements.namedItem('campusexplorer_area_of_study');
				//If areaOfStudy is hidden then we are on the second form.
				if(areaOfStudy.type != "hidden"){
					areaOfStudy.options[9].selected = true;

					/* START DATE RANGE PROCESSING */
					var startDateRange = leadRequestForm.elements.namedItem('campusexplorer_planned_start_date_code');
					if (GM_getValue("af_sd") == "asap")
					{
						startDateRange.options[1].selected = true;
					}			
					if (GM_getValue("af_sd") == "1to3")
					{
						startDateRange.options[2].selected = true;
					}		
					if (GM_getValue("af_sd") == "3to6")
					{
						startDateRange.options[3].selected = true;
					}
					//Learning Prefrence Must be set to this 
					var learningPrefrence = leadRequestForm.elements.namedItem('campusexplorer_is_online_preference_code');
					learningPrefrence.options[1].selected = true;

					//Concentration Must be set to this
					var concentration = leadRequestForm.elements.namedItem('campusexplorer_concentration');
					//It is set as disabled and it is hidden on page load. Don't need to show it but need to enable it.
					concentration.disabled=false;
					concentration.options[58].selected = true;	
				}//End First form
				var eduLevel = leadRequestForm.elements.namedItem('campusexplorer_highest_education_level');
				//If edulevel is set then we are on the second form
				if(eduLevel != null){
					//LEVEL OF EDUCATION PROCESSING
					if (GM_getValue("af_el") == "hs")
					{
						eduLevel.options[3].selected = true;
					}
					if (GM_getValue("af_el") == "ged")
					{
						eduLevel.options[2].selected = true;
					}
					if (GM_getValue("af_el") == "vocational")
					{
						eduLevel.options[3].selected = true;
					}
					if (GM_getValue("af_el") == "someCollege")
					{
						eduLevel.options[4].selected = true;
					}
					if (GM_getValue("af_el") == "aDegree")
					{
						eduLevel.options[5].selected = true;
					}
					if (GM_getValue("af_el") == "bDegree")
					{
						eduLevel.options[6].selected = true;
					}
					if (GM_getValue("af_el") == "mDegree")
					{
						eduLevel.options[7].selected = true;
					}
					if (GM_getValue("af_el") == "dDegree")
					{
						eduLevel.options[8].selected = true;
					}
					//Set the Address to what the poster requires
					var address = leadRequestForm.elements.namedItem('campusexplorer_address');
					address.value="123 Change St.";
					var interest = leadRequestForm.elements.namedItem('campusexplorer_how_likely_to_enroll_in_6_months');
					interest.options[1].selected = true;
					
				}//End Second Form
			}
		
		}//End Campus Explorer Processing
		//Start Education For Careers Processing
		if( window.location.host == "www.education-for-careers.com"	){
			/* CAMPUS TYPE PROCESSING */
			$(document).ready(function () {

				if (GM_getValue("campusType") == "both")
				{
					$('input[name=rbtSchoolType][value=-1]').attr('checked', true);
				}			
				if (GM_getValue("campusType") == "online")
				{
					$('input[name=rbtSchoolType][value=2]').attr('checked', true);			}		
				if (GM_getValue("campusType") == "campus")
				{
					$('input[name=rbtSchoolType][value=1]').attr('checked', true);
				}
			
		}//End Education for Careers Processing
	//Start End Call Processing 
	if( window.location.pathname == "/prospectUpdate.php"){ 
		var deleteDiv = document.getElementById("deleteVars");
		var deleted = "";
		if( deleteDiv != null){			
			for each (var val in GM_listValues()) {
			deleted = deleted + val + "deleted\n";
			GM_deleteValue(val);
			}
		}
	}
}//end function
/*
function createMenu(){
	
      // Insert DIV style
      var styleCode = "#autofill *,#autofill{color:#000;background:#fff;font-size:11px;text-align:left;font-family:Arial,sans-serif;margin:0;padding:0;}#autofill{z-index:999;min-width:300px;border:5px solid #999;position:absolute;top:10px;right:10px;moz-border-radius:5px;padding:10px;}#autofill label{display:block;float:left;width:33%;margin-left:1em;}#autofill p{color:#000;margin:10px;}#autofill p strong{font-size:14px;}#autofill p small{display:block;color:#ccc;font-size:8px;margin-left:10px;text-align:right;}#autofill h2 a{color:#0085d5;font-size:16px;margin:20px;}#autofill .submit input{margin-left:20px;background:#fff;border:none;color:#0085d5;}#autofill input{background:#f1f1f1;border:1px solid #ccc;padding:4px;}";

      var style = document.createElement('style');
      style.innerHTML = styleCode;
      
      try { document.getElementsByTagName('head')[0].appendChild(style); }
      catch(e) { console.debug(e)}
      
      // Draw DIV 
      var guiCode = '<div id="autofill"><h2><a href="http://userscripts.org/scripts/show/39313" target="_blank" title="Click to visit AutoFill site">AutoFill Forms Script</a></h2><p><strong>Personal</strong></p><p><label>Nick name:</label><input type="text" value="'+GM_getValue('af_nn','bugmenot')+'" id="af_nn" /></p><p><label>First name:</label><input type="text" value="'+GM_getValue('af_fn','Garold')+'" id="af_fn" /></p><p><label>Last name:</label><input type="text" value="'+GM_getValue('af_ln','Walker')+'" id="af_ln" /></p><p><label>Initials:</label><input type="text" value="'+GM_getValue('af_in','GW')+'" id="af_in" /></p><p><label>Password:</label><input type="password" value="'+GM_getValue('af_ps','bugmenot')+'" id="af_ps" /><small>Default: bugmenot</small></p><p><label>ID:</label><input type="text" value="'+GM_getValue('af_in','382014940')+'" id="af_id" /></p><p class="submit"><input type="button" value="Save changes" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" name="savechanges" id="savechanges" /><input type="button" value="Cancel" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" /></p><p><strong>Professional</strong></p><p><label>Title:</label><input type="text" value="'+GM_getValue('af_ti','Dr.')+'" id="af_ti" /></p><p><label>Position:</label><input type="text" value="'+GM_getValue('af_po','CEO')+'" id="af_po" /></p><p><label>Company:</label><input type="text" value="'+GM_getValue('af_co','Feel Good, Inc.')+'" id="af_co" /></p><p class="submit"><input type="button" value="Save changes" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" name="savechanges" id="savechanges" /><input type="button" value="Cancel" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" /></p><p><strong>Birth</strong></p><p><label>Day:</label><input type="text" value="'+GM_getValue('af_da','21')+'" id="af_da" /></p><p><label>Month:</label><input type="text" value="'+GM_getValue('af_mo','7')+'" id="af_mo" /></p><p><label>Year:</label><input type="text" value="'+GM_getValue('af_ye','1976')+'" id="af_ye" /></p><p><label>Secret question:</label><input type="text" value="'+GM_getValue('af_qu','Who is the best bugger?')+'" id="af_qu" /></p><p><label>Secret answer:</label><input type="password" value="'+GM_getValue('af_an','bugmenot')+'" id="af_an" /><small>Default: bugmenot</small></p><p class="submit"><input type="button" value="Save changes" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" name="savechanges" id="savechanges" /><input type="button" value="Cancel" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" /></p><p><strong>Contact</strong></p><p><label>E-mail:</label><input type="text" value="'+GM_getValue('af_em','garoldwalker@mailinator.com')+'" id="af_em" /></p><p><label>MSN:</label><input type="text" value="'+GM_getValue('af_ms','garoldwalker@hotmail.com')+'" id="af_ms" /></p><p><label>ICQ:</label><input type="text" value="'+GM_getValue('af_ic','45592738')+'" id="af_ic" /></p><p><label>Phone:</label><input type="text" value="'+GM_getValue('af_ph','(513) 972-6287')+'" id="af_ph" /></p><p><label>Phone 1:</label><input type="text" value="'+GM_getValue('af_ph1','513')+'" id="af_ph1" /></p><p><label>Phone 2:</label><input type="text" value="'+GM_getValue('af_ph2','972')+'" id="af_ph2" /></p><p><label>Phone 3:</label><input type="text" value="'+GM_getValue('af_ph3','6287')+'" id="af_ph3" /></p><p><label>Fax:</label><input type="text" value="'+GM_getValue('af_fa','(513) 972-6287')+'" id="af_fa" /></p><p class="submit"><input type="button" value="Save changes" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" name="savechanges" id="savechanges" /><input type="button" value="Cancel" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" /></p><p><strong>Location</strong></p><p><label>Address 1:</label><input type="text" value="'+GM_getValue('af_ad','4960 Brandy Run')+'" id="af_ad" /></p><p><label>Address 2:</label><input type="text" value="'+GM_getValue('af_ad2','Dayton, OH 45401')+'" id="af_ad2" /></p><p><label>Address 3:</label><input type="text" value="'+GM_getValue('af_ad3','')+'" id="af_ad3" /></p><p><label>Address 4:</label><input type="text" value="'+GM_getValue('af_ad4','')+'" id="af_ad4" /></p><p><label>Address 5:</label><input type="text" value="'+GM_getValue('af_ad5','')+'" id="af_ad5" /></p><p><label>City:</label><input type="text" value="'+GM_getValue('af_ci','Dayton')+'" id="af_ci" /></p><p><label>Area:</label><input type="text" value="'+GM_getValue('af_ar','51')+'" id="af_ar" /></p><p><label>State:</label><input type="text" value="'+GM_getValue('af_st','OH')+'" id="af_st" /></p><p><label>Country:</label><input type="text" value="'+GM_getValue('af_ct','United States')+'" id="af_ct" /></p><p><label>Zip code:</label><input type="text" value="'+GM_getValue('af_zi','45401')+'" id="af_zi" /></p><p class="submit"><input type="button" value="Save changes" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" name="savechanges" id="savechanges" /><input type="button" value="Cancel" onclick="document.getElementById(\'autofill\').style.display=\'none\';return false" /></p><p><strong>Others</strong></p><p><label>Interests:</label><input type="text" value="'+GM_getValue('af_ho','dance!')+'" id="af_ho" /></p><p><label>Website:</label><input type="text" value="'+GM_getValue('af_we','http://xaviesteve.com')+'" id="af_we" /></p><p><label>Referrer:</label><input type="text" value="'+GM_getValue('af_re','xaviesteve')+'" id="af_re" /></p><p><label>Time Zone Offset:</label><input type="text" value="'+GM_getValue('af_tz','0')+'" id="af_tz" /></p><p><label>Credit Card:</label><input type="text" value="'+GM_getValue('af_cc','1111222233334444')+'" id="af_cc" /></p><p><label>Captcha:</label><input type="text" value="'+GM_getValue('af_ca','')+'" id="af_ca" /></p><p><label>Any other field:</label><input type="text" value="'+GM_getValue('af_ot','')+'" id="af_ot" /></p></div>';
      
      // Insert DIV
      var gui = document.createElement('div');
      gui.id = 'autofilloptions';
      gui.innerHTML = guiCode;
      guiCode.length = 0;
      document.body.insertBefore(gui, document.body.lastChild);
      
      // Add event SAVE
      var sChanges=document.getElementsByName('savechanges');
      console.debug(sChanges);
      for (var z=0;z<sChanges.length;z++){
    	  sChanges[z].addEventListener('click', saveChanges , false);
      }
}
$nd = function (xpath, context, from)
{
	var nd = (from||document).evaluate(xpath, (context||document), null, 9, null).singleNodeValue;
	//if($type($el) == 'function'){ return $el(nd); }
	return nd;
};

function saveChanges(){
    GM_setValue('af_nn',document.getElementById('af_nn').value);
    GM_setValue('af_fn',document.getElementById('af_fn').value);
    GM_setValue('af_ln',document.getElementById('af_ln').value);
    GM_setValue('af_in',document.getElementById('af_in').value);
    GM_setValue('af_id',document.getElementById('af_id').value);
    GM_setValue('af_ps',document.getElementById('af_ps').value);
    GM_setValue('af_po',document.getElementById('af_po').value);
    GM_setValue('af_co',document.getElementById('af_co').value);
    GM_setValue('af_da',document.getElementById('af_da').value);
    GM_setValue('af_mo',document.getElementById('af_mo').value);
    GM_setValue('af_ye',document.getElementById('af_ye').value);
    GM_setValue('af_qu',document.getElementById('af_qu').value);
    GM_setValue('af_an',document.getElementById('af_an').value);
    GM_setValue('af_em',document.getElementById('af_em').value);
    GM_setValue('af_ms',document.getElementById('af_ms').value);
    GM_setValue('af_ic',document.getElementById('af_ic').value);
    GM_setValue('af_ph',document.getElementById('af_ph').value);
    GM_setValue('af_ph2',document.getElementById('af_ph2').value);
    GM_setValue('af_ph3',document.getElementById('af_ph3').value);
    GM_setValue('af_fa',document.getElementById('af_fa').value);
    GM_setValue('af_ad',document.getElementById('af_ad').value);
    GM_setValue('af_ad2',document.getElementById('af_ad2').value);
    GM_setValue('af_ad3',document.getElementById('af_ad3').value);
    GM_setValue('af_ad4',document.getElementById('af_ad4').value);
    GM_setValue('af_ad5',document.getElementById('af_ad5').value);
    GM_setValue('af_ci',document.getElementById('af_ci').value);
    GM_setValue('af_ar',document.getElementById('af_ar').value);
    GM_setValue('af_st',document.getElementById('af_st').value);
    GM_setValue('af_ct',document.getElementById('af_ct').value);
    GM_setValue('af_zi',document.getElementById('af_zi').value);
    GM_setValue('af_cc',document.getElementById('af_cc').value);
    GM_setValue('af_ho',document.getElementById('af_ho').value);
    GM_setValue('af_we',document.getElementById('af_we').value);
    GM_setValue('af_re',document.getElementById('af_re').value);
    GM_setValue('af_tz',document.getElementById('af_tz').value);
    GM_setValue('af_ca',document.getElementById('af_ca').value);
    GM_setValue('af_ot',document.getElementById('af_ot').value);
    }

function showMenu(){
 try{
	 document.getElementById('autofill').style.display='block';
 }catch(e){
	createMenu(); 
	console.debug(e);
  }
}
GM_registerMenuCommand("Auto-fill - Options", showMenu );
*/