// ==UserScript==
// @name          RedCentreAutoTime
// @namespace     http://userscripts.org/users/rrph
// @description	  Various enhancements for time entry in RedCentre
// @author        Pei Huang
// @homepage      
// @include       https://redrockuat.service-now.com/*
// @include       https://redcentre.redrock.net.au/*
// @match         https://redrockuat.service-now.com/*
// @match         https://redcentre.redrock.net.au/*
// @version		  2.1beta
// ==/UserScript==

(function() {
	// Start Task button at the top of the page
	if ( document.getElementById('banner_top_left') != null){

		var bannerLoc = document.getElementById('nav_header_text');
		var starttimebutton = document.createElement('input');
		starttimebutton.setAttribute('type','button');
		starttimebutton.setAttribute('value','Start Task');
		starttimebutton.setAttribute('id','starttimebutton');
		bannerLoc.appendChild(starttimebutton);
		
		var starttimefield = document.createElement('input');
		starttimefield.setAttribute('type','text');
		starttimefield.setAttribute('value','');
		starttimefield.setAttribute('disabled','disabled');
		starttimefield.setAttribute('id','starttimefield');
		bannerLoc.appendChild(starttimefield);
		
		var hourstimefield = document.createElement('input');
		hourstimefield.setAttribute('type','text');
		hourstimefield.setAttribute('value','');
		hourstimefield.setAttribute('disabled','disabled');
		hourstimefield.setAttribute('id','hourstimefield');
		bannerLoc.appendChild(hourstimefield);
		
		var calctimebutton = document.createElement('input');
		calctimebutton.setAttribute('type','button');
		calctimebutton.setAttribute('value','Calculate for EBS');
		calctimebutton.setAttribute('id','calctimebutton');
		bannerLoc.appendChild(calctimebutton);
		
		// Logic for button click, to calculate current time, display, + save to cookie
		document.getElementById('starttimebutton').onclick=(function(){
			var currDate=new Date();
			var dd = currDate.getDate();
			var mo = currDate.getMonth() + 1;
			var yyyy = currDate.getFullYear();
			var hh = currDate.getHours();
			var mi = currDate.getMinutes();
			var ss = currDate.getSeconds();
			function pad(number) { 
				var str = '' + number;
				while (str.length < 2) {
					str = '0' + str;
				}
				return str;
			}
			var starttime=pad(dd)+'-'+pad(mo)+'-'+yyyy+' '+pad(hh)+':'+pad(mi)+':'+pad(ss);
			// Set the value of the field to the current time
			document.getElementById('starttimefield').value=starttime;	
			// Set cookie with this time
			var c_name="rrTaskStartTimeCookie";
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + 1);
			var c_value=escape(starttime) + "; expires="+exdate.toUTCString();
			document.cookie=c_name + "=" + c_value;
			
			// Reset hours
			document.getElementById('hourstimefield').value='';
		});
		
		// Logic for button click, to calculate time diff
		document.getElementById('calctimebutton').onclick=(function(){
			
			var st=document.getElementById('starttimefield').value;	
			var reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
			var dateArray = reggie.exec(st); 
			var startDate = new Date(
			(+dateArray[3]),
			(+dateArray[2])-1, // Careful, month starts at 0!
			(+dateArray[1]),
			(+dateArray[4]),
			(+dateArray[5]),
			(+dateArray[6])
			);	
			
			// Minimu unit is 0.1h
			var minMins = 6;
			// The current time
			var currDate=new Date();
			// Calculate the time difference between the two values, rounding up to the nearest 5 minutes
			// Note: No handling for Days difference - assume that a consultant will only log <24 hours in this mode
			var diffSecs=(currDate.getTime()/1000) - (startDate.getTime()/1000); // getTime() returns milliseconds since Epoch
			//var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/15)*15, 15); // Round to nearest 15 minutes
			//var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/5)*5, 5); // Round to nearest 5 minutes
			var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/minMins)*minMins, minMins); // Round to nearest minimum minutes as defined in the "contract"
			var diffHours=Math.max(Math.floor(diffSecs/3600), 0);
			// Account for 60 mins - append to hours section.
			if ( diffMins == 60 ) {
				diffHours++;
				diffMins=0;
			}
			document.getElementById('hourstimefield').value=(((diffHours*60) + diffMins)/60);
			
		});
		
		
		// Helper function for cookie retreival
		function getCookie(c_name) {
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++){
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==c_name){
					return unescape(y);
				}
			}
		}
		
		// If cookie is set, write value to field.
		var savedtime=getCookie("rrTaskStartTimeCookie");
		if ( savedtime != null ) {
			document.getElementById('starttimefield').value=savedtime;			
		}
	
	}

	// Only run on the relevant page - look for the effort duration seconds field.
	if ( document.getElementById('ni.u_request.u_effortdur_sec') != null){
		// Button to copy time from top of page
		var copytimebutton = document.createElement('input');
		copytimebutton.setAttribute('type','button');
		copytimebutton.setAttribute('value','Auto-Set Start Time');
		copytimebutton.setAttribute('id','copytimebutton');
		var appendFirstLoc=document.getElementById('u_request.u_date_time_worked_on');
		appendFirstLoc.parentElement.appendChild(copytimebutton);
	
		// Generate and place a button "AutoFill" next to the text box
		var autofillbutton = document.createElement('input');
		autofillbutton.setAttribute('type','button');
		autofillbutton.setAttribute('value','AutoFill');
		autofillbutton.setAttribute('id','autofillbutton');
		var appendLoc = document.getElementById('ni.u_request.u_effortdur_sec');
		appendLoc.parentElement.appendChild(autofillbutton);
		
		// Save button - saves and stays on this page
		/* // Hide this button to encourage people to spend as little time as possibe within a request/incident
		var rrsavebutton = document.createElement('input');
		rrsavebutton.setAttribute('type','button');
		rrsavebutton.setAttribute('value','Save');
		rrsavebutton.setAttribute('Title','Save');
		rrsavebutton.setAttribute('id','sysverb_update_and_stay');
		rrsavebutton.setAttribute('gsft_id','432ace8b0a0a0b34006b02832660c894');
		rrsavebutton.setAttribute('onclick','return gsftSubmit(this);');
		appendLoc.parentElement.appendChild(rrsavebutton);
		*/
		
		// Save and exit button - saves and exits.
		// Note the strange id and gsft_id is my guess as to how the saving mechanism works. 
		// With the call to gsftSubmit passing in this, I'm assuming these values are important.
		var rrsaveandexitbutton = document.createElement('input');
		rrsaveandexitbutton.setAttribute('type','button');
		rrsaveandexitbutton.setAttribute('value','Save and Exit');
		rrsaveandexitbutton.setAttribute('Title','Save and Exit');
		rrsaveandexitbutton.setAttribute('id','sysverb_update');
		rrsaveandexitbutton.setAttribute('gsft_id','42df02e20a0a0b340080e61b551f2909');
		//rrsaveandexitbutton.setAttribute('onclick','return gsftSubmit(this);');
		appendLoc.parentElement.appendChild(rrsaveandexitbutton);
		
		rrsaveandexitbutton.onclick=(function(){
			parent.document.getElementById('starttimebutton').click();
			document.getElementById('sysverb_update').click();
			//return gsftSubmit(this);
		});
		
		// Set onclick action on AutoFill button to calculate and enter the time
		document.getElementById('autofillbutton').onclick=(function(){
			// Retreive the contract min time value - e.g. time must be a multiple of 6 minutes.
			var minMins = 1;
			try {
				var ga = new GlideAjax('TaskContext');
				ga.addParam('sysparm_name','getEffortMultiply');
				ga.addParam('sysparm_contract',g_form.getValue('u_contract'));
				ga.getXMLWait();
				// Get the effort divisor - i.e. minimum time value
				minMins = ga.getAnswer(); 			
			} catch (e) {
				// If GA failed (e.g. Chrome), default to 6
				minMins=6;
			}
			
					
			// Work out the start time
			var st=document.getElementById('u_request.u_date_time_worked_on').value;
			var reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
			var dateArray = reggie.exec(st); 
			var startDate = new Date(
			(+dateArray[3]),
			(+dateArray[2])-1, // Careful, month starts at 0!
			(+dateArray[1]),
			(+dateArray[4]),
			(+dateArray[5]),
			(+dateArray[6])
			);	
			// The current time
			var currDate=new Date();
			// Calculate the time difference between the two values, rounding up to the nearest 5 minutes
			// Note: No handling for Days difference - assume that a consultant will only log <24 hours in this mode
			var diffSecs=(currDate.getTime()/1000) - (startDate.getTime()/1000); // getTime() returns milliseconds since Epoch
			//var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/15)*15, 15); // Round to nearest 15 minutes
			//var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/5)*5, 5); // Round to nearest 5 minutes
			var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/minMins)*minMins, minMins); // Round to nearest minimum minutes as defined in the "contract"
			var diffHours=Math.max(Math.floor(diffSecs/3600), 0);
			// Account for 60 mins - append to hours section.
			if ( diffMins == 60 ) {
				diffHours++;
				diffMins=0;
			}
			
			// Set the values. Not need to set and lose focus to trigger ServiceNow code that updates hidden fields, including red/green highlighting.
			document.getElementById('ni.u_request.u_effortdur_min').focus();
			document.getElementById('ni.u_request.u_effortdur_min').value=diffMins;
			document.getElementById('ni.u_request.u_effortdur_hour').focus();
			document.getElementById('ni.u_request.u_effortdur_hour').value=diffHours;
			// Autofocus to the next text box the consultant needs to fill in
			document.getElementById('u_request.u_time_worked_description').focus();
		});
		
		// Set onclick action for Copy Time button
		document.getElementById('copytimebutton').onclick=(function(){
			// Helper function for cookie retreival
			function getCookie(c_name) {
				var i,x,y,ARRcookies=document.cookie.split(";");
				for (i=0;i<ARRcookies.length;i++){
					x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
					y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
					x=x.replace(/^\s+|\s+$/g,"");
					if (x==c_name){
						return unescape(y);
					}
				}
			}
		
			// If cookie is set, write value to field.
			var savedtime=getCookie("rrTaskStartTimeCookie");
			if ( savedtime != null ) {
				document.getElementById('u_request.u_date_time_worked_on').value=savedtime;
				document.getElementById('ni.u_request.u_effortdur_hour').focus();
				// Also fill in time automatically
				document.getElementById('autofillbutton').click();
			}	
		});
		
		// Duplicate Button functionality
		// Adds a "Dup" button to each row in the Time Worked table
		var twtable = document.getElementById('u_request.task_time_worked.task_table');
		var tbrows = twtable.getElementsByTagName('tr');
		
		// Work out what column is used for Desc, Comments, and AH
		var headRow = twtable.rows[0].cells;		
		for (var j=0; j < headRow.length; j++ ){
			var rowVal = headRow[j];				
			if ( rowVal.innerHTML.indexOf('Description') > 0 ){
				window.descID=j;
			} else if ( rowVal.innerHTML.indexOf('Comments') > 0 ){
				window.commID=j;
			}
			else if ( rowVal.innerHTML.indexOf('After Hours') > 0 ){
				window.afthouID=j;
			}			
		}
		
		// Iterate through the table and add a button to the first cell, omitting the first row (header row)
		for (var i=1;i<tbrows.length;i++) {
			var currRow = twtable.rows[i].cells;
			var duplicatebutton = document.createElement('input');
			duplicatebutton.setAttribute('type','button');
			duplicatebutton.setAttribute('value','Dup');
			duplicatebutton.setAttribute('id','duplicatebutton');					
			currRow[0].appendChild(duplicatebutton);		
		
			// Apply logic to each duplicate button.
			// Duplicate button will copy Desc, Comments, OT to the current entry
			duplicatebutton.onclick=(function(){
				var selectedRow=this.parentElement.parentElement;
				var desc = selectedRow.cells[window.descID].innerHTML;
				var comments = selectedRow.cells[window.commID].innerHTML;
				var overtime = selectedRow.cells[window.afthouID].innerHTML;
				// Set the values based on the existing row
				document.getElementById('u_request.u_time_worked_description').focus();
				document.getElementById('u_request.u_time_worked_description').value=desc;
				document.getElementById('u_request.comments').focus();
				document.getElementById('u_request.comments').value=comments;
							
				// Handle overtime flag - note there is no logic for unticking this
				if ( overtime == 'true') {
					document.getElementById('ni.u_request.u_after_hours').focus();
					document.getElementById('ni.u_request.u_after_hours').click();				
				}
				// Set focus back to description in case the user wishes to update it
				document.getElementById('u_request.u_time_worked_description').focus();
			});		
		}
		
		// Hide case update comments so they don't waste space. Require user to use "Time Worked" section instead
		document.getElementById('element.u_request.comments.additional').style.display='none';
				
		
		// Enhancements for Dennis to copy/paste from TimeCost export
		// Generate and place a button "TimeCostAuto" next to the text box
		var appendLoc = document.getElementById('u_request.u_activity_type');
		var autopoplabel = document.createElement('label');		
		autopoplabel.setAttribute('for', 'autopopbutton');
		autopoplabel.innerHTML='&nbsp;&nbsp;&nbsp;(For Dennis:)';
		appendLoc.parentElement.appendChild(autopoplabel);

		var autopopbutton = document.createElement('input');
		autopopbutton.setAttribute('type','button');
		autopopbutton.setAttribute('value','TimeCostAuto');
		autopopbutton.setAttribute('id','autopopbutton');
		appendLoc.parentElement.appendChild(autopopbutton);
				
		// AutoSave button - saves and stays on this page, used for Timecost import
		var rrsavebutton = document.createElement('input');
		rrsavebutton.setAttribute('type','button');
		rrsavebutton.setAttribute('value','Save+NextDay');
		rrsavebutton.setAttribute('Title','Save');
		rrsavebutton.setAttribute('id','sysverb_update_and_stay');
		rrsavebutton.setAttribute('gsft_id','432ace8b0a0a0b34006b02832660c894');
		rrsavebutton.setAttribute('onclick','return gsftSubmit(this);');
		appendLoc.parentElement.appendChild(rrsavebutton);
		
		var autopopresetbutton = document.createElement('input');
		autopopresetbutton.setAttribute('type','button');
		autopopresetbutton.setAttribute('value','Reset');
		autopopresetbutton.setAttribute('id','autopopresetbutton');
		appendLoc.parentElement.appendChild(autopopresetbutton);

		// Action for the TimeCostAuto-FIX button
		document.getElementById('autopopbutton').onclick=(function(){

			document.getElementById('u_request.u_time_worked_description').focus();
			
			var caseUpdateComments=document.getElementById('u_request.comments').value.trim();
			if (GM_getValue("rcautotime") == null || GM_getValue("rcautotime").trim() == "") { 
				// If GM value not set, then this is the first run. Notify the user.
				alert("The following records will be processed. Please verify each day and click Save+NextDay to proceed.\n\n"+caseUpdateComments);
			}

			// Persist the value
			GM_setValue("rcautotime",caseUpdateComments);
			GM_setValue("rcautotimetype",document.getElementById('u_request.u_activity_type').selectedIndex);
			
			// Clear the comments field and repopulate with just today's data
			document.getElementById('u_request.comments').value="";
			var currCaseUpdateComments = [];
			var caseUpdateCommentsLines=caseUpdateComments.split("\n");
			var j=0;
			for (i = 0; i < caseUpdateCommentsLines.length; i++){
				if (caseUpdateCommentsLines[i].split(" - ").length < 3){
					alert("Input validation error: Malformed line. Please fix and try again.");
					continue;
				}
				if (caseUpdateCommentsLines[i].split(" - ")[0].split(" ")[0] != caseUpdateCommentsLines[0].split(" - ")[0].split(" ")[0]){					
					break;
				}				
				currCaseUpdateComments[j++]=caseUpdateCommentsLines[i]+"\n";
				document.getElementById('u_request.comments').value+=caseUpdateCommentsLines[i]+"\n";
			}

			// Repopulate the persisted GM variable with just the unprocessed data			
			var unprocessedCaseUpdateComments = [];
			var l=0;
			for (k=j; k < caseUpdateCommentsLines.length; k++){
				unprocessedCaseUpdateComments[l++] = caseUpdateCommentsLines[k]+"\n";
			}
			GM_setValue("rcautotime",unprocessedCaseUpdateComments.toString().replace(",",""));			

			// Populate the Time Worked Description
			var caseUpdateCommentsFirstLine=currCaseUpdateComments[0];
			document.getElementById('u_request.u_time_worked_description').focus();
			document.getElementById('u_request.u_time_worked_description').value=caseUpdateCommentsFirstLine;
			
			// Calculate time worked
			var caseUpdateCommentsLines=currCaseUpdateComments;
			var aggrHours=0
			var aggrMins=0
			for (i = 0; i < caseUpdateCommentsLines.length; i++){
				if (caseUpdateCommentsLines[i].split(" - ").length < 3){
					alert("Input validation error: Malformed line. Please fix and try again.");
					continue;
				}
				if (caseUpdateCommentsLines[i].split(" - ")[0].split(" ")[0] != caseUpdateCommentsLines[caseUpdateCommentsLines.length-1].split(" - ")[0].split(" ")[0]){
					alert("Input validation error: Multiple days entries detected. Please fix and try again.");
					break;
				}
				var currLineTime = caseUpdateCommentsLines[i].split(" - ")[1].trim();
				var currLineHr=currLineTime.split(":")[0];
				var currLineMin=currLineTime.split(":")[1];
				aggrHours = aggrHours + new Number(currLineHr);
				aggrMins = aggrMins + new Number(currLineMin);
			}
			var timeWorked=aggrHours*60+aggrMins;
			var timeWorkedHrs=Math.floor(timeWorked/60);
			var timeWorkedMins=timeWorked%60;
			
			// Populate date time worked
			for (i = 0; i < caseUpdateCommentsLines.length; i++){
				if (caseUpdateCommentsLines[i].split(" - ").length < 3){
					alert("Input validation error: Malformed line. Please fix and try again.");
					continue;
				}
				var timeWorkedTime = caseUpdateCommentsLines[i].split(" - ")[0].trim();
				document.getElementById('u_request.u_date_time_worked_on').focus();
				document.getElementById('u_request.u_date_time_worked_on').value=timeWorkedTime;
				document.getElementById('ni.u_request.u_effortdur_hour').focus();
				break;
			}
						
			// Set the values. Not need to set and lose focus to trigger ServiceNow code that updates hidden fields, including red/green highlighting.
			document.getElementById('ni.u_request.u_effortdur_min').focus();
			document.getElementById('ni.u_request.u_effortdur_min').value=timeWorkedMins;
			document.getElementById('ni.u_request.u_effortdur_hour').focus();
			document.getElementById('ni.u_request.u_effortdur_hour').value=timeWorkedHrs;
			document.getElementById('u_request.u_time_worked_description').focus();			

		});		
		
		// Reset the autopop state
		document.getElementById('autopopresetbutton').onclick=(function(){
			//Reset fields
			document.getElementById('u_request.u_time_worked_description').focus();
			document.getElementById('ni.u_request.u_effortdur_min').focus();
			document.getElementById('ni.u_request.u_effortdur_min').value="00";
			document.getElementById('ni.u_request.u_effortdur_hour').focus();
			document.getElementById('ni.u_request.u_effortdur_hour').value="00";
			document.getElementById('u_request.u_time_worked_description').focus();			
			document.getElementById('u_request.u_time_worked_description').value="";			
			document.getElementById('u_request.comments').focus();
 			document.getElementById('u_request.comments').value="";
			// Delete from keyvalue store
			GM_deleteValue("rcautotime");
			GM_deleteValue("rcautotimetype");
			
		});		
		
		// Check if GM variables populated, then execute the appropriate function.
 		if (GM_getValue("rcautotime") != null && GM_getValue("rcautotime").trim() != "") { 
 			// Select appropriate type
 			document.getElementById('u_request.u_activity_type').focus();
			document.getElementById('u_request.u_activity_type').selectedIndex=GM_getValue("rcautotimetype");				
 			document.getElementById('u_request.comments').focus();
 			document.getElementById('u_request.comments').value=GM_getValue("rcautotime").replace(/,/g,"");
			// Trigger the AutoPopulate button
 			document.getElementById('autopopbutton').click(); 	
 			// Trigger the save button to submit
 			document.getElementById('sysverb_update_and_stay').click();		
 		}


	// Run this for incidents only
	} else if ( document.getElementById('ni.incident.u_effortdur_sec') != null){
		// Button to copy time from top of page
		var copytimebutton = document.createElement('input');
		copytimebutton.setAttribute('type','button');
		copytimebutton.setAttribute('value','Auto-Set Start Time');
		copytimebutton.setAttribute('id','copytimebutton');
		var appendFirstLoc=document.getElementById('incident.u_date_time_worked_on');
		appendFirstLoc.parentElement.appendChild(copytimebutton);
		
		// Generate and place a button "AutoFill" next to the text box
		var autofillbutton = document.createElement('input');
		autofillbutton.setAttribute('type','button');
		autofillbutton.setAttribute('value','AutoFill');
		autofillbutton.setAttribute('id','autofillbutton');
		var appendLoc = document.getElementById('ni.incident.u_effortdur_sec');
		appendLoc.parentElement.appendChild(autofillbutton);
		
		// Save button - saves and stays on this page
		/* // Hide this button to encourage people to spend as little time as possibe within a request/incident
		var rrsavebutton = document.createElement('input');
		rrsavebutton.setAttribute('type','button');
		rrsavebutton.setAttribute('value','Save');
		rrsavebutton.setAttribute('Title','Save');
		rrsavebutton.setAttribute('id','sysverb_update_and_stay');
		rrsavebutton.setAttribute('gsft_id','432ace8b0a0a0b34006b02832660c894');
		rrsavebutton.setAttribute('onclick','return gsftSubmit(this);');
		appendLoc.parentElement.appendChild(rrsavebutton);
		*/
		
		// Save and exit button - saves and exits.
		// Note the strange id and gsft_id is my guess as to how the saving mechanism works. 
		// With the call to gsftSubmit passing in this, I'm assuming these values are important.
		var rrsaveandexitbutton = document.createElement('input');
		rrsaveandexitbutton.setAttribute('type','button');
		rrsaveandexitbutton.setAttribute('value','Save and Exit');
		rrsaveandexitbutton.setAttribute('Title','Save and Exit');
		rrsaveandexitbutton.setAttribute('id','sysverb_update');
		rrsaveandexitbutton.setAttribute('gsft_id','42df02e20a0a0b340080e61b551f2909');
		//rrsaveandexitbutton.setAttribute('onclick','return gsftSubmit(this);');
		appendLoc.parentElement.appendChild(rrsaveandexitbutton);
		
		rrsaveandexitbutton.onclick=(function(){
			parent.document.getElementById('starttimebutton').click();
			return gsftSubmit(this);
		});
				
		// Set onclick action on AutoFill button to calculate and enter the time
		document.getElementById('autofillbutton').onclick=(function(){
			// Retreive the contract min time value - e.g. time must be a multiple of 6 minutes.
			var minMins = 1;
			try {
				var ga = new GlideAjax('TaskContext');
				ga.addParam('sysparm_name','getEffortMultiply');
				ga.addParam('sysparm_contract',g_form.getValue('u_contract'));
				ga.getXMLWait();
				// Get the effort divisor - i.e. minimum time value
				minMins = ga.getAnswer(); 			
			} catch (e) {
				// If GA failed (e.g. Chrome), default to 6
				minMins=6;
			}
			
			// Work out the start time
			var st=document.getElementById('incident.u_date_time_worked_on').value;
			var reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
			var dateArray = reggie.exec(st); 
			var startDate = new Date(
			(+dateArray[3]),
			(+dateArray[2])-1, // Careful, month starts at 0!
			(+dateArray[1]),
			(+dateArray[4]),
			(+dateArray[5]),
			(+dateArray[6])
			);	
			// The current time
			var currDate=new Date();
			// Calculate the time difference between the two values, rounding up to the nearest 5 minutes
			// Note: No handling for Days difference - assume that a consultant will only log <24 hours in this mode
			var diffSecs=(currDate.getTime()/1000) - (startDate.getTime()/1000); // getTime() returns milliseconds since Epoch
			//var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/15)*15, 15); // Round to nearest 15 minutes
			//var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/5)*5, 5); // Round to nearest 5 minutes
			var diffMins=Math.max(Math.ceil(Math.floor((diffSecs % 3600)/60)/minMins)*minMins, minMins); // Round to nearest minimum minutes as defined in the "contract"
			var diffHours=Math.max(Math.floor(diffSecs/3600), 0);
			// Account for 60 mins - append to hours section.
			if ( diffMins == 60 ) {
				diffHours++;
				diffMins=0;
			}
			
			// Set the values. Not need to set and lose focus to trigger ServiceNow code that updates hidden fields, including red/green highlighting.
			document.getElementById('ni.incident.u_effortdur_min').focus();
			document.getElementById('ni.incident.u_effortdur_min').value=diffMins;
			document.getElementById('ni.incident.u_effortdur_hour').focus();
			document.getElementById('ni.incident.u_effortdur_hour').value=diffHours;
			// Autofocus to the next text box the consultant needs to fill in
			document.getElementById('incident.u_time_worked_description').focus();														
		});			
				
		// Set onclick action for Copy Time button
		document.getElementById('copytimebutton').onclick=(function(){
			// Helper function for cookie retreival
			function getCookie(c_name) {
				var i,x,y,ARRcookies=document.cookie.split(";");
				for (i=0;i<ARRcookies.length;i++){
					x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
					y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
					x=x.replace(/^\s+|\s+$/g,"");
					if (x==c_name){
						return unescape(y);
					}
				}
			}
		
			// If cookie is set, write value to field.
			var savedtime=getCookie("rrTaskStartTimeCookie");
			if ( savedtime != null ) {
				document.getElementById('incident.u_date_time_worked_on').value=savedtime;
				document.getElementById('ni.incident.u_effortdur_hour').focus();
				// Also fill in time automatically
				document.getElementById('autofillbutton').click();
			}	
		});
		
		// Duplicate Button functionality
		// Adds a "Dup" button to each row in the Time Worked table
		var twtable = document.getElementById('incident.task_time_worked.task_table');
		var tbrows = twtable.getElementsByTagName('tr');
		
		// Work out what column is used for Desc, Comments, and AH
		var headRow = twtable.rows[0].cells;		
		for (var j=0; j < headRow.length; j++ ){
			var rowVal = headRow[j];				
			if ( rowVal.innerHTML.indexOf('Description') > 0 ){
				window.descID=j;
			} else if ( rowVal.innerHTML.indexOf('Comments') > 0 ){
				window.commID=j;
			}
			else if ( rowVal.innerHTML.indexOf('After Hours') > 0 ){
				window.afthouID=j;
			}			
		}
		
		// Iterate through the table and add a button to the first cell, omitting the first row (header row)
		for (var i=1;i<tbrows.length;i++) {
			var currRow = twtable.rows[i].cells;
			var duplicatebutton = document.createElement('input');
			duplicatebutton.setAttribute('type','button');
			duplicatebutton.setAttribute('value','Dup');
			duplicatebutton.setAttribute('id','duplicatebutton');					
			currRow[0].appendChild(duplicatebutton);		
		
			// Apply logic to each duplicate button.
			// Duplicate button will copy Desc, Comments, OT to the current entry
			duplicatebutton.onclick=(function(){
				var selectedRow=this.parentElement.parentElement;
				var desc = selectedRow.cells[window.descID].innerHTML;
				var comments = selectedRow.cells[window.commID].innerHTML;
				var overtime = selectedRow.cells[window.afthouID].innerHTML;
				// Set the values based on the existing row
				document.getElementById('incident.u_time_worked_description').focus();
				document.getElementById('incident.u_time_worked_description').value=desc;
				document.getElementById('incident.comments').focus();
				document.getElementById('incident.comments').value=comments;
							
				// Handle overtime flag - note there is no logic for unselecting this
				if ( overtime == 'true') {
					document.getElementById('ni.incident.u_after_hours').focus();
					document.getElementById('ni.incident.u_after_hours').click();				
				}
				// Set focus back to description in case the user wishes to update it
				document.getElementById('incident.u_time_worked_description').focus();
			});		
		}
		
		// Hide case update comments so they don't waste space. Require user to use "Time Worked" section instead
		document.getElementById('element.incident.comments.additional').style.display='none';

	} else {
		// Don't do anything if the page is not a request or incident. Reserve this space for other code if necessary.
		return;
	}
})();