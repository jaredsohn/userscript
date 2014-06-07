// ==UserScript==
// @name           AOL FBL
// @namespace      none
// @description    Auto FBL Request
// @include        http://postmaster.aol.com/*
// ==/UserScript==

function process() {
	// Called from the "save" button. Starts looping through the domains and IP's in the box.
		format_text() ;
		var continue_ok = true ;
		var data = document.getElementById("dom_box").value ;
		var split_data_store = data.split("\n");
		var num_domains = split_data_store.length ;
		var name = document.getElementById("my_name").value ;
		var phone = document.getElementById("my_phone").value ;
		
		if(phone.length > 10) {
			alert("You need to reformat your phone number to look like: 1112223333") ;
			continue_ok = false ;
		}
		if(name === "<Marie Johnson>") {
			alert("Please do not leave the default name. Choose something else.") ;
			continue_ok = false ;
		}
		if(num_domains < 1) {
			alert("You need to enter at least one domain and IP") ;
			continue_ok = false ;
		}
		
		// alert(num_domains) ;
		GM_setValue("dom_chunk", data) ;
		GM_setValue("dom_num", num_domains) ;
		GM_setValue("dom_pro", 0) ;
		GM_setValue("form_saved", "saved") ;
		GM_setValue("dom_pro_disp", 1) ;
        GM_setValue("my_name", name) ;
        GM_setValue("my_phone", phone) ;
		if(continue_ok) { step_one() ; }
}

function format_text() {
	// Format contents of the box to replace spaces and blank lines
	var contents = document.getElementById("dom_box").value ;

	var pre_formatted_str = contents.replace(/^\s*|\s*$/g,'') ;
	var formatted_str = pre_formatted_str.replace(/[\t\v\f ]+/g,"\t") ;
	document.getElementById("dom_box").value = formatted_str ;

}

function step_one() {

		// Update display and variables
		var data_chunk = GM_getValue("dom_chunk", -1) ;
		var split_data = data_chunk.split("\n") ;
		var total_domains = GM_getValue("dom_num", -1) ;
		var processed_domains = GM_getValue("dom_pro", -1) ;
		var processed_domains_display = GM_getValue("dom_pro_disp", -1) ;
		if( total_domains == processed_domains ) {
			document.title = "AOL FBLs -- Finished Parsing: " + processed_domains_display + " of " + total_domains + " domains." ;
			reset_form() ;
		}
		else {
			document.title = "AOL FBLs -- Parsing: " + processed_domains_display + " of " + total_domains + " domains. Step 1" ;

		//Process current domain and ip
			var domain_ip = split_data[processed_domains] ;
			var current_pair = domain_ip.split("\t") ;
			
			var domain = current_pair[0] ;
			var ip = current_pair[1] ;
		// Enter information into the email box and hit send.
			document.getElementsByName('fbl_email')[0].value = "support@" + domain ;
			var forms = document.getElementsByTagName("form")
			for(x in forms){
				if(forms[x].action == "http://postmaster.aol.com/SupportRequest.FBL.php"){
				var sub_form = forms[x] ;
					// alert("Found the next button and stored it") ;
				}
				else{                                                          
					// alert("still searching") ;                                 
				}                                                              
			}                                                        
			// alert(sub_form.action) ;
			GM_setValue("step", 2) ;
			sub_form.submit() ;
		}
}

function step_two(){

		// Update display and variables for step two
		var total_domains = GM_getValue("dom_num", -1) ;
		var processed_domains = GM_getValue("dom_pro", -1) ;
		var processed_domains_display = GM_getValue("dom_pro_disp", -1) ;
		document.title = "AOL FBLs -- Parsing: " + processed_domains + " of " + total_domains + " domains. Step 2" ;

		// Select Postmaster@whatever and click next.
		
			document.getElementsByName('confirm_email')[0].selectedIndex = 1 ;
			var forms = document.getElementsByTagName("form")
			for(x in forms){
				if(forms[x].action == "http://postmaster.aol.com/SupportRequest.FBL.php"){
				var sub_form = forms[x] ;
					// alert("Found the next button and stored it") ;
				}
				else{
					// alert("still searching") ;
				}
			}

		// alert(sub_form.action) ;
		GM_setValue("step", 3) ;
		sub_form.submit() ;

}

function step_three() {
	//Enter information and submit.
	//Reload first page and continue with next iteration of the loop

		var data_chunk = GM_getValue("dom_chunk", -1) ;
		var split_data = data_chunk.split("\n") ;
		var total_domains = GM_getValue("dom_num", -1) ;
		var processed_domains = GM_getValue("dom_pro", -1) ;
		var processed_domains_display = GM_getValue("dom_pro_disp", -1) ;
		var my_name = GM_getValue("my_name", -1) ;
		var my_phone = GM_getValue("my_phone", -1) ;
		
		document.title = "AOL FBLs -- Parsing: " + processed_domains_display + " of " + total_domains + " domains. Step 3" ;

		//Process current domain and ip
			var domain_ip = split_data[processed_domains] ;
			var current_pair = domain_ip.split("\t") ;
			
			var domain = current_pair[0] ;
			var ip = current_pair[1] ;

	
	document.getElementsByName('name')[0].value = my_name ;
	document.getElementsByName('email')[0].value = "webmaster@" + domain ;
	document.getElementsByName('phone')[0].value = my_phone ;
	document.getElementsByName('fbl_domain')[0].value = domain ;
	document.getElementsByName('ip_address')[0].value = ip ;


	var forms = document.getElementsByTagName("form")
		for(x in forms){
			if(forms[x].action == "http://postmaster.aol.com/SupportRequest.FBL.php"){
				var sub_form = forms[x] ;
				// alert("Found the next button and stored it") ;
			}
			else{
				// alert("still searching") ;
			}
		}

		// alert(sub_form.action) ;
		GM_setValue("step", 4) ;
		// sub_form.submit() ;
		document.getElementById("recaptcha_response_field").focus() ;

}

function step_four() {
	var total_domains = GM_getValue("dom_num", -1) ;
	var processed_domains = GM_getValue("dom_pro", -1) ;
	var processed_domains_display = GM_getValue("dom_pro_disp", -1) ;
	
	//var font_check = document.getElementsByTagName("font")[0] ;
	var font_check = document.getElementById("col-right");
	
	if(typeof(font_check) != "undefined" && font_check.innerHTML.indexOf("Captcha failed") > -1) {
		alert("You typed the captcha wrong.\nThe previous page will now be reloaded.\nIf you are prompted to resend information, click resend.") ;
		GM_setValue("step", 3) ;
		window.history.go(-1) ;
	}
	else {
	var new_number = processed_domains + 1 ;
	var new_disp_number = processed_domains_display + 1 ;
	GM_setValue("dom_pro", new_number) ;
	GM_setValue("dom_pro_disp", new_disp_number) ;
	
	document.title = "Finished Parsing " + processed_domains_display + " of " + total_domains ;
	GM_setValue("step", 1) ;
	document.location = "http://postmaster.aol.com/SupportRequest.FBL.php" ;
	}
}

function load_form() {
	if(window.location == 'http://postmaster.aol.com/SupportRequest.FBL.php'){
		
		//Forget AOL, we'll make our own form.
		var user_oLoginForm = document.createElement("form");
		user_oLoginForm.setAttribute('name', 'f1');
		user_oLoginForm.setAttribute('id', 'user_of1');
		//before_iUser0 = document.getElementsByTagName('center')[0];
		document.forms[0].style.display = 'none';
		before_iUser0 = document.forms[0];
		before_iUser0.parentNode.appendChild(user_oLoginForm);
		var nfid = document.getElementById("user_of1"); //Reset.

		//Domain - IP Text area.
		var user_oLoginField = document.createElement('textarea');
		user_oLoginField.setAttribute('id', 'dom_box');
		user_oLoginField.setAttribute('rows', '10');
		user_oLoginField.setAttribute('cols', '55');
		user_oLoginField.setAttribute('name', 'boxarea');
		user_oLoginField.value = "Paste in your Domains and Ip\'s. Remember to change the Name and Phone number. Format for the number is: 8015552222" ;
		nfid.appendChild(user_oLoginField); //Attach to form.

		//Name to use for registration
		var user_oLoginField = document.createElement('input');
		user_oLoginField.setAttribute('id', 'my_name');
		user_oLoginField.setAttribute('value', '<Marie Johnson>');
		user_oLoginField.setAttribute('type', 'text');
		nfid.appendChild(user_oLoginField); //Attach to form.

		//Phone Number to use for registration
		var user_oLoginField = document.createElement('input');
		user_oLoginField.setAttribute('id', 'my_phone');
		user_oLoginField.setAttribute('value', 'Phone number');
		user_oLoginField.setAttribute('type', 'text');
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
	document.location = "http://postmaster.aol.com/SupportRequest.FBL.php" ;
}

window.addEventListener("load", function(e) {
	// GM_setValue("form_saved", "NO") ; // Enable for debug mode
	GM_registerMenuCommand( "Load Form", load_form )  ;
	GM_registerMenuCommand( "Reset Variables", reset_form )  ;
	
	var check_step = GM_getValue("step", -1) ;
	var check_for_form = GM_getValue("form_saved", -1) ;
		//alert("Form check returned: " + check_for_form) ;

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
		}
	}
	else{
		load_form() ;
	}


}, false);
