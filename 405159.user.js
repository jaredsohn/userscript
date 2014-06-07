// ==UserScript==
// @name           Yahoo FBL
// @namespace      <none>
// @description    Automate the process of signing up for Yahoo feedback loops
// @include        http://feedbackloop.yahoo.net/request.php
// ==/UserScript==

function process() {
	// Called from the "save" button. Starts looping through the domains and IP's in the box.
		format_text() ;
		var continue_ok = true ;
		var data = document.getElementById("dom_box").value ;
		var split_data = data.split("\n");
		var num_domains = split_data.length ;

		if(num_domains < 1) {
			this.alert("You need to enter at least one domain") ;
			continue_ok = false ;
		}
		
        if(continue_ok) {
		var add_img = document.getElementsByTagName('img')[3] ;
			 var evt = document.createEvent('MouseEvents');
			 evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
			// alert(num_domains) ;

			// Enter information into the email box and hit send.
			var i = 0 ;
			var num_parsed = 1 ;
			function insertNext() {
				if(num_parsed > num_domains) {
					clearInterval(intervalId) ;
				    function doubleCheck() {
						for(i = 0, b = 2 ; i <= num_domains; i++, b++){
						//  Get and correct the domain_list lines.
							domain = split_data[i].split("\t")[0] ;
							document.getElementsByName("fbl[" + b +  "][domain]")[0].value = domain ;
							document.getElementsByName("fbl[" + b + "][feedbackEmail]")[0].value = 'support@' + domain ;
							document.getElementsByName("fbl[" + b +  "][confEmail]")[0].value = 'postmaster@' + domain ;
						}
					}
					window.setTimeout(doubleCheck, 1000) ;
				} else {
				var domain = split_data[i].split("\t")[0] ;
				document.getElementById('domain').value = domain ;
				document.getElementById('selector').value = "main" ;
				document.getElementById('fbl_email').value = "support@" + domain ;
				document.getElementById('confirmation_alias').selectedIndex = 2 ;
				add_img.dispatchEvent(evt) ;
				i++ ;
    			num_parsed++ ;
				document.title = "Yahoo FBLs -- Finished Parsing: " + num_parsed + " of " + num_domains + " domains." ;
				}
		    }
		    var intervalId = setInterval(insertNext, 200) ;
		}
}

function format_text() {
	// Format contents of the box to replace spaces and blank lines
	var contents = document.getElementById("dom_box").value ;

	var pre_formatted_str = contents.replace(/^\s*|\s*$/g,'') ;
	var formatted_str = pre_formatted_str.replace(/[\t\v\f ]+/g,"\t") ;
	//Trim off additional information like IP's
	document.getElementById("dom_box").value = formatted_str ;
}

function load_form() {
	if(window.location == 'http://feedbackloop.yahoo.net/request.php'){

		//Forget Yahoo, we'll make our own form.
		var user_oLoginForm = document.createElement("form");
		user_oLoginForm.setAttribute('name', 'f1');
		user_oLoginForm.setAttribute('id', 'user_of1');
		before_iUser0 = document.getElementById('content') ;
		before_iUser0.parentNode.insertBefore(user_oLoginForm, before_iUser0);
		var nfid = document.getElementById("user_of1"); //Reset.

			//Domain - Text area.
			var user_oLoginField = document.createElement('textarea');
			user_oLoginField.setAttribute('id', 'dom_box');
			user_oLoginField.setAttribute('rows', '10');
			user_oLoginField.setAttribute('cols', '55');
			user_oLoginField.setAttribute('name', 'boxarea');
			user_oLoginField.value = "Paste in your Domains. No IP's required." ;
			nfid.appendChild(user_oLoginField); //Attach to form.

			var user_oLoginField = document.createElement('input');
			user_oLoginField.setAttribute('id', 'box_button');
			user_oLoginField.setAttribute('type', 'button');
			user_oLoginField.setAttribute('value', 'Save');
			user_oLoginField.addEventListener("click", process, true);
			nfid.appendChild(user_oLoginField); //Attach to form.

	}
}

function reset_form() {
	GM_setValue("form_saved", "NO") ;
	document.location = "http://feedbackloop.yahoo.net/request.php" ;
}

window.addEventListener("load", function(e) {
	// GM_setValue("form_saved", "NO") ; // Enable for debug mode
	GM_registerMenuCommand( "Load Form", load_form )  ;
	GM_registerMenuCommand( "Reset Variables", reset_form )  ;

	var check_step = GM_getValue("step", -1) ;
	var check_for_form = GM_getValue("form_saved", -1) ;
		// alert("Form check returned: " + check_for_form) ;

	var total_domains = GM_getValue("dom_num", -1) ;
	var processed_domains = GM_getValue("dom_pro", -1) ;

	if(check_for_form == "saved"){
		// If the form is saved, I need to figure out which step it's on, and go to that step.
		if(check_step != -1){
			switch(check_step){
			case 1:
				step_one() ;
				break
			case 2:
				step_two() ;
				break
			case 3:
				step_three() ;
				break
			case 4:
				step_four() ;
				break
			default:
				alert("There was an error checking what step you are on.\nCheck_step returned: " + check_step) ;
				GM_setValue("form_saved", "NO") ;
				GM_setValue("step", 0) ;
			}

		}
		else{
			//This is the first time this page was loaded. No step found.
			alert("Please start over. Your step was not properly saved.") ;
			reset_form() ;
		}
	}
	else{
		load_form() ;
	}


}, false);