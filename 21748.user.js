// Gmail Signature Float
// version 0.9 BETA!
// 2007-10-21
// Copyright (c) 2006-2007, Tim Jarrett 
// Contact: tim |at| tim-jarrett |dot| com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF GMAIL SIGNATURE
// FLOAT, go to Tools/Manage User Scripts and manually uninstall the
// previous version before installing this one.  Sorry, this is a
// limitation of Greasemonkey.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Gmail Signature Float", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// mail.google.com (Gmail):
// - Adds your signature above the quoted text, rather than below it
// - Updates the Settings page text to reflect this change in
//   functionality
//
// --------------------------------------------------------------------
//
// PROPS TO:
//
//	Robson Braga Araujo (http://www.userscripts.org/people/868) and
//  his "Gmail: Random Signature" script.  I lifted his method for
//  searching through Gmail's functions.  I'm not sure if it helped...
//  but it is being used in this update.
//
// --------------------------------------------------------------------
//
// CHANGELOG:
// 0.9.2
//    - The options "Allow Html", "Remove Dashes", "Exclude from Replies/Forwards" and "Signature //      Above Quoted Messages" are functional again
//
// 0.9.1 
//    - Workaround to make it compatible with new GraseMonkey
//
// 0.9
//	  - Added option to not include signatures on replies
//    - Added option to not include signatures on forwards
//
// 0.8.2
//    - Fixed script so that pressing the "Compose" button from the contact list pages
//      appropriately allows HTML and clears dashes (thanks for the bug report Raymon)
//
// 0.8.1
//	  - Fixed 'Settings' to work for other languages
//    - Slightly changed way that settings are injected into the DOM to be a bit
//		more friendly
//
// 0.8
//	  - Added ability to turn of Signature Floating
//    - Added a link to the UserScripts page for this script for update checking
//
// 0.7.1
//	  - Fixed bug in function body extracting causing GSF not to work sometimes -
//       GSF should now work on Gmail and Gmail Domains
//
// 0.7
//	  - Did some house cleaning on function names to try to keep them consistent
//    - Added option to use HTML in the signature
//
// --------------------------------------------------------------------

/* Gmail Signature Float
   Copyright 2006 Tim Jarrett & Rafael Ruppel Ruiz
   See also: <http://www.tim-jarrett.com/greasemonkey/gmailsignaturefloat.user.js>

   This software is licensed under the CC-GNU LGPL:
   <http://creativecommons.org/licenses/LGPL/2.1/>
*/

// ==UserScript==
// @name          Gmail Signature Float
// @namespace     http://www.ruppel.eng.br
// @description   Moves your signature in Gmail to the top of the message rather than the bottom
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include	 https://mail.google.com/hosted*
// ==/UserScript==
	  
  (function()
  {
  
  var VERSION_NUMBER = "0.8.2";
  var arr_other_funcs = new Array();
  
  //If loading a javascript page
  if ( window.location.href.match(/name=js/) ) {
  	//It's a JS document - lets see if we can find our signature creation function
  	var sig_func_name = "";
  
  	var js = unsafeWindow.top.document.getElementsByName('js')[0].contentWindow;
  	if (js.wrappedJSObject) js = js.wrappedJSObject;
  
  	for ( propName in js ) {
  		var propValue = js[propName];
  
  		if ( typeof propValue != "function" ) {
  			continue;
  
  		}
  
  		var functionBody = propValue.toString();
  
  		if ( functionBody.indexOf('<br clear=all><br>-- <br>') != -1 ) {
  			sig_func_name = propName;
  			GM_log("Found " + propName + " main functions.");
  
  		} else {
  			arr_other_funcs[propName] = functionBody;
  
  		}
  
  	}//for
  
  	//If we got the right file and we found the right function!!
  	if ( sig_func_name != '' ) {
  		//alert("Now hunting for complimentary functions");
  		var regex_reply = "\\+\\s*" + escapeRegExChars(sig_func_name) + "\\s*\\(";
  		var regex_comp  = "\\+\\=\\s*" + escapeRegExChars(sig_func_name) + "\\s*\\(";
  		var regex_comp_to = "\\]\\s*\\=\\s*" + escapeRegExChars(sig_func_name) + "\\s*\\(";
  
  		var func_reply  = "";
  		var func_compose = "";
  		var func_compose_to = "";
  
  		for ( propName in arr_other_funcs ) {
  			if ( func_reply != "" && func_compose != "" && func_compose_to != "" ) {
  				break;
  			}
  			//GM_log("Analyzing reply function: " + propName);
  			functionBody = arr_other_funcs[propName];
  			if ( functionBody.search(regex_reply) != -1 ) {
  				func_reply = propName;
  				GM_log("Found reply function: " + propName);
  
  			} else if ( functionBody.search(regex_comp) != -1 ) {
  				func_compose = propName;
  				GM_log("Found compose function: " + propName);
  
  			} else if ( functionBody.search(regex_comp_to) != -1 ) {
  				func_compose_to = propName;
  				GM_log("Found compose to function: " + propName);
  
  			}
  
  		}//for
  
  		if ( func_reply != "" && func_compose != "" && func_compose_to != "" ) {
  			var gsf_temp_window = js;
  
  			js[func_reply] = update_func_reply(func_reply);
  			js[func_compose] = update_func_compose(func_compose);
  			js[func_compose_to] = update_func_compose_to(func_compose_to);
  
  		} else {
  			GM_log("GSF could not initialize.", 2);
  			//alert("GSF could not initialize.");
  		}
  
  	}
  
  }
  
  /**
   * Handles the onclick event for the input that indicates whether the signature should be "floated" above quoted response
   */
  function update_sig_above_quote(event)
  {
  	var elem = event ? event.target : this;
  	window.setTimeout(GM_setValue, 0, 'sig_above_quote', elem.checked);
  	update_signature_byline();
  
  }//end update_sig_above_quote
  
  function update_exclude_replies(event)
  {
  	var elem = event ? event.target : this;
  	window.setTimeout(GM_setValue, 0, 'exclude_from_replies', elem.checked);
  	update_signature_byline();
  	
  	
  }//end update_exclude_replies
  
  /**
   * Handles the onclick event for the input that indicates whether dash removing should be used
   */
  function update_remove_dashes(event)
  {
  	var elem = event ? event.target : this;
  	window.setTimeout(GM_setValue, 0, 'clear_dashes', elem.checked);
  	update_signature_byline();
  
  }//end update_remove_dashes
  
  /**
   * Handles the onclick even for the input that indicates whether dash removing should be sued
   */
  function update_allow_html(event)
  {
  	var elem = event ? event.target : this;
  	window.setTimeout(GM_setValue, 0, 'allow_html', elem.checked);
  	update_signature_byline();
  
  }//end update_allow_html
  
  /**
   * Updates the text under "Signature" on the settings page
   */
  function update_signature_byline()
  {
  	gsf_elem_span.style.display = "block";
  	gsf_elem_span.innerHTML = "<a href='http://userscripts.org/scripts/show/3067' target='_blank'>Gmail Signature Float " + VERSION_NUMBER + "</a>";
  	gsf_elem_span.innerHTML += "<ul style='padding-top: 0; margin-top: 0;'>";
  	gsf_elem_span.innerHTML += "<li style='margin-left: 5px; list-style-position: outside;'>" + 
  									(( GM_getValue('sig_above_quote', true) ) ? 
  									"inserted before quoted messages" : 
  									" appended at the end of outgoing messages" ) + "</li>";
  
  	if ( GM_getValue('exclude_from_replies', false) ) {
  		gsf_elem_span.innerHTML += '<li style="margin-left: 5px; list-style-position: outside;">excluding signature from replies &amp; forwards</li>';
  		
  	}
  									
  	if ( GM_getValue('clear_dashes', false) ) {
  		gsf_elem_span.innerHTML += "<li style='margin-left: 5px; list-style-position: outside;'>clearing sig dashes from before signature</li>";
  	}
  
  	if ( GM_getValue('allow_html', false) ) {
  		gsf_elem_span.innerHTML += "<li style='margin-left: 5px; list-style-position: outside;'>allowing HTML in signature</li>";
  	}
  
  	gsf_elem_span.innerHTML += "</ul>";
  
  
  }//end update_signature_byline
  
  //Need to update the mail settings page, I don't see a clear "name=??" for it
  //so sniff for the radio button with id "sx_sg_1"
  if ( window.document.getElementById("sx_sg_1") ) {
  	//This sucks...but find sx_sg_1, go up the DOM tree to the main TR
  	//Then comes down the DOM tree to find the appropriate TD and SPAN that we need to modify...so fragile!
  	var shared_parent = window.document.getElementById("sx_sg_1").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  	var arr_spans = shared_parent.cells[0].getElementsByTagName('SPAN');
  	var gsf_elem_span = arr_spans[0];
  
  	//Um...update the stuff beneath "Signature:"
  	update_signature_byline();
  
  	//Add in the "clear dashes from signature" option
  	var elem_ta = window.document.getElementById('sx_sg_1val');
  	var elem_tbody = elem_ta.parentNode.parentNode.parentNode;
  
  	//Add in the gsf_sig_above_quote options
  	var elem_tr = window.document.createElement('TR');
  	elem_tbody.appendChild(elem_tr);
  	elem_tr.innerHTML += '<td><input id="gsf_sig_above_quote" type="checkbox" /></td><td style="padding-top: 2px;"><label style="font-weight: bold" for="gsf_sig_above_quote">Place Signature Above Quoted Response</label></td>';
  	
  	//Add in the gsf_exclude_replies option
  	var elem_tr = window.document.createElement('TR');
  	elem_tbody.appendChild(elem_tr);
  	elem_tbody.innerHTML += '<td><input id="gsf_exclude_from_replies" type="checkbox" /></td><td style="padding-top: 2px;"><label style="font-weight: bold" for="gsf_exclude_from_replies">Exclude Signature From Replies &amp; Forwards</label></td>';
  
  	//Add in the gsf_clear_dashes option
  	var elem_tr = window.document.createElement('TR');
  	elem_tbody.appendChild(elem_tr);
  	elem_tbody.innerHTML += '<td><input id="gsf_clear_dashes" type="checkbox" /></td><td style="padding-top: 2px;"><label style="font-weight: bold" for="gsf_clear_dashes">Clear Sig Dashes From Signature (Not Recommended)</label></td>';
  
  	//Addin the gsf_allow_html option
  	var elem_tr = window.document.createElement('TR');
  	elem_tbody.appendChild(elem_tr);
  	elem_tbody.innerHTML += '<td><input id="gsf_allow_html" type="checkbox" /></td><td style="padding-top: 2px;"><label style="font-weight: bold" for="gsf_allow_html">Allow HTML in Signature</label></td>';
  
  	var elem_input = window.document.getElementById('gsf_sig_above_quote');
  	elem_input.checked = GM_getValue('sig_above_quote', true);
  	elem_input.addEventListener('click', update_sig_above_quote, true);	//see http://dunck.us/collab/GreaseMonkeyUserScripts
  	
  	var elem_input = window.document.getElementById('gsf_exclude_from_replies');
  	elem_input.checked = GM_getValue('exclude_from_replies', true);
  	elem_input.addEventListener('click', update_exclude_replies, true);	//see http://dunck.us/collab/GreaseMonkeyUserScripts
  
  	var elem_input = window.document.getElementById('gsf_clear_dashes');
  	elem_input.checked = GM_getValue('clear_dashes', false);
  	elem_input.addEventListener('click', update_remove_dashes, true);	//see http://dunck.us/collab/GreaseMonkeyUserScripts
  
  	//Add in the "allow html in signature" option
  	var elem_input = window.document.getElementById('gsf_allow_html');
  	elem_input.checked = GM_getValue('allow_html', false);
  	elem_input.addEventListener('click', update_allow_html, true);	//see http://dunck.us/collab/GreaseMonkeyUserScripts
  }
  
  /**
   * Rewrite the reply function
   */
  function update_func_reply(func_name)
  {
  	//Turn the function into a string
  	//Was having problems calling some original GMail functions from inside of my rewritten
  	//functions, so I store all gmail functions and call them locally - gsf_escape_functions redeclares all
  	//the necessary functions
  	var str_func      		= gsf_escape_functions(js[func_name].toString());
  
  	//Extract the function definition (ie function something(whatever, whatever))
  	var str_func_def   		= gsf_get_func_def(func_name, str_func);
  
  	//Extract the function body (everything between the first { after the definition and the last })
  	var str_func_body  		= gsf_get_func_body(str_func);
  
  	//make a copy of the body
  	var str_func_new_body 	= str_func_body;
  
  	//make a copy of the body
  	var str_func_new_body 	= str_func_body;
  
  	//We slice and dice this one...
  	var pos_sigcall 		= str_func_new_body.lastIndexOf('gsf_temp_window.' + sig_func_name);
  	var pos_lastsemi 		= str_func_new_body.lastIndexOf(';');
  	var pos_lastreturn 		= str_func_new_body.lastIndexOf('return ');
  	var pos_lastplus 		= str_func_new_body.lastIndexOf('+');
  
  	//Figure out the signature function call portion
  	var str_sigcall = str_func_new_body.substring(pos_sigcall, pos_lastsemi);
  	str_sigcall = selectMethod()+"(" + str_sigcall + ")";
  
  	//Add in the part we don't need to worry about
  	var new_reply_func_body = str_func_new_body.substring(0, pos_lastreturn);
  	
  	//Do any signature?

    var exclude =  getExclude();
  	new_reply_func_body += 'if ( !' + exclude + ' ) { ' + "\n";
  

 		 var sigAboveQuote = getSigAboveQuote();
  	//Put in the logic, directly into the function, to determine if we should float or not
  	new_reply_func_body += 'if ( ' + sigAboveQuote + ' ) return ' + str_sigcall + " + " + str_func_new_body.substring(pos_lastreturn+7, pos_sigcall-2) + ";\n";
  


  	//Otherwise, don't change the order, but still apply the signature filter
  	new_reply_func_body += 'else return ' + str_func_new_body.substring(pos_lastreturn+7, pos_sigcall-2) + "+ " + str_sigcall + ";\n";
  	
  	new_reply_func_body += '}//no signature in replies?' + "\n\n";
  
  	//Wrap the function definition around the body, assign it to a variable, change it from a string to an actual function and return it
  	var str_func_final = str_func_def + "\n " + new_reply_func_body + "}//end func \n var testme = " + func_name + ";";
  	eval(str_func_final);
  
  	return testme;
  
  }//end update_func_reply
  
 
 function getExclude(){
 if (GM_getValue("exclude_from_replies", false)){
 return 'true';
 }
 
 return 'false';
 }
 
 

 
 function getSigAboveQuote(){

 if (GM_getValue("sig_above_quote", true)){
 return 'true';
 }
 
 return 'false';

 }



  /**
   * Rewrite the compose function
   */
  function update_func_compose(func_name)
  {
  
  	//Turn the function into a string
  	//Was having problems calling some original GMail functions from inside of my rewritten
  	//functions, so I store all gmail functions and call them locally - gsf_escape_functions redeclares all
  	//the necessary functions
  	var str_func      		= gsf_escape_functions(js[func_name].toString());
  
  	//Extract the function definition (ie function something(whatever, whatever))
  	var str_func_def   		= gsf_get_func_def(func_name, str_func);
  
  	//Extract the function body (everything between the first { after the definition and the last })
  	var str_func_body  		= gsf_get_func_body(str_func);
  
  	//make a copy of the body
  	var str_func_new_body 	= str_func_body;
  
  	//The line we are interested looks like this: d += Xp(e);
  	//We do some fancy regular expressions this time around
  	var arr_match			= str_func_new_body.match(/[a-zA-Z]+\s*\+=/);		//arr_match[0] = d +=
  	var var_name			= arr_match[0].replace(/\s*\+=/, "");				//Strip out the +=, so var_name = d
  
  	//Find the line that handles the signature
  	var regexp				= new RegExp(escapeRegExChars(var_name) + "\\s*\\+=\\s*gsf_temp_window\\." + escapeRegExChars(sig_func_name) + "\\(.*\\);");
  	var arr_match			= str_func_new_body.match(regexp);
  	var sig_line			= arr_match[0];
  
  	//Figure out the parameters being passed into the signature function, only doing this to make sure we pass them in appropriately
  	var pos_open_paren		= sig_line.indexOf('(');
  	var pos_close_paren		= sig_line.indexOf(')');
  	var parameters			= sig_line.substring(pos_open_paren+1, pos_close_paren);
  
  	//Create the new sig line, with the call to GM_getValue to decide if we are doing the float or not
    var sigAboveQuote = getSigAboveQuote();
  	var new_sig_line 		= 'if ( '+ sigAboveQuote +' ) ' + var_name + " = "+ selectMethod()+ "(gsf_temp_window." + sig_func_name + "(" + parameters + ")) + " + var_name + ";\n";
  		new_sig_line 		+= ' else ' + var_name + " +=" + selectMethod()+" (gsf_temp_window." + sig_func_name + "(" + parameters + "))";
  
  	//Replace the old sig line with the new
  	str_func_new_body 		= str_func_new_body.replace(regexp, new_sig_line);
  
  	//Create the new function as a string
  	var str_func_final 		= str_func_def + "\n GM_log('compose'); " + str_func_new_body + "\n }" + "\n var testme = " + func_name + ";";
  
  	//Eval the string to an actual function with the varname "testme"
  	eval(str_func_final);
  
  	//Return the new function
  	return testme;
  
  }//end update_func_compose
  



  /**
   * Rewrite the compose to function from contact list
   */
  function update_func_compose_to(func_name)
  {
  
  	//Turn the function into a string
  	//Was having problems calling some original GMail functions from inside of my rewritten
  	//functions, so I store all gmail functions and call them locally - gsf_escape_functions redeclares all
  	//the necessary functions
  	var str_func      		= gsf_escape_functions(js[func_name].toString());
  
  	//Extract the function definition (ie function something(whatever, whatever))
  	var str_func_def   		= gsf_get_func_def(func_name, str_func);
  
  	//Extract the function body (everything between the first { after the definition and the last })
  	var str_func_body  		= gsf_get_func_body(str_func);
  
  	//make a copy of the body
  	var str_func_new_body 	= str_func_body;
  
  	//Find the part that calls the signature function
  	var regexp				= new RegExp("gsf_temp_window\\." + escapeRegExChars(sig_func_name) + "\\(.*\\)");
  	var arr_match			= str_func_new_body.match(regexp);
  	var sig_line				= arr_match[0];
  
  	//Wrap that part in signature_filter
  	var regexp				= new RegExp(escapeRegExChars(sig_line));
  	str_func_new_body		= str_func_new_body.replace(regexp, selectMethod() + "(" + sig_line + ")");
  
  	//Create the new function as a string
  	var str_func_final 		= str_func_def + "\n " + str_func_new_body + "\n }" + "\n var testme = " + func_name + ";";
  
  	//Eval the string to an actual function with the varname "testme"
  	eval(str_func_final);
  
  	//Return the new function
  	return testme;
  
  }//end update_func_compose
  
  /**
   * Using this function, we can apply different functions to the signature
   */

 
 function selectMethod(){
	 if ( GM_getValue('clear_dashes', false) && GM_getValue('allow_html', false)) {
	 	return 'bothModsSignature';
	 	}
	 else if( !GM_getValue('clear_dashes', false) && !GM_getValue('allow_html', false)  ) {
		return 'noneModsSignature';
	 }
	 else if( GM_getValue('clear_dashes', false) ){
		 return 'remove_dashes';
	 }
	 else{
		return 'htmlspecialchars_decode';
	 }
 }
 
 
   function signature_filter(signature)
   {
   	if ( GM_getValue('clear_dashes', false) ) {
   		signature = remove_dashes(signature);
   
   	}
   
   	if ( GM_getValue('allow_html', false) ) {
   		signature = htmlspecialchars_decode(signature);
   
   	}
   
   	return signature;
   
   }//end signature_filter


 function bothModsSignature(signature){
 signature = remove_dashes(signature);
 signature = htmlspecialchars_decode(signature);
 return signature;
 }


 function noneModsSignature(signature){
 return signature;
 }

   
   /**
    * Removes dashes from signature
    */
   function remove_dashes(signature)
   {
   	
   
   	var regexp_html = /^<br clear=all><br>-- <br>/;
   	var regexp_plain = /^\n\n-- \n/;
   	var has_html_signature = signature.search(regexp_html);
   	var has_plain_signature = signature.search(regexp_plain);
   
   	if ( has_html_signature != -1 ) {
   		return signature.replace(regexp_html, '<br clear=all><br>');
   
   	} else if ( has_plain_signature != -1 ) {
   		return signature.replace(regexp_plain, "\n\n");
   
   	} else {
   		return signature;
   
   	}
   
   }//end removeDashes
   
   function htmlspecialchars_decode(signature)
   {
   	signature = signature.replace(/&amp;/g, "&");
   
   	signature = signature.replace(/&quot;/g, '"');
   
   	signature = signature.replace(/&lt;/g, "<");
   
   	signature = signature.replace(/&gt;/g, ">");
   
   	return signature;
   
   
   }//end html_unentities
   
   /**
    * Returns the function definition portion of a function
    */
   function gsf_get_func_def(func_name, str_func)
   {
   	var regex = new RegExp("function " + escapeRegExChars(func_name) + "\\(.*\\)\\s*{", "ig");
   	var arr_match = str_func.match(regex);
   	return arr_match[0];
   
   }//end gsf_get_func_def

 /**
  * Returns the body portion of the function
  */
 function gsf_get_func_body(str_func)
 {
 	var firstpos = str_func.indexOf('{');
 	var lastpos  = str_func.lastIndexOf('}');
 	return str_func.substring(firstpos+1, lastpos);
 
 }//end gsf_get_func_body
 
 /**
  * Adds "gsf_temp_window." before all function calls in the function definition passed in
  *
  */
 function gsf_escape_functions(str_func)
 {
 	//Get params
 	var regexp = /\(.*\)/;
 	var params = str_func.match(regexp)[0];
 	params	= params.replace(/\(/g, '');
 	params	= params.replace(/\)/g, '');
 	params	= params.replace(/\s*/g, '');
 	arr_params = params.split(',');
 
 	//var regexp = /[\.]?[(a-zA-Z|0-9|\$)]+\(/g;
 	var regexp = /[\.\s\(]?[a-zA-Z0-9\$\_]+\(/g;
 	var arr = str_func.match(regexp);
 
 	if ( !arr || ( arr && arr.length == 1 ) ) {
 		//No external functions found
 		return str_func;
 	}
 
 	//Step through the results, starting with the second entry
 	for ( var i=1; i<arr.length; i++ ) {
 		//As long as it's not a method call
 		if ( arr[i].substring(0, 1) != "." ) {
 			//Check to make sure it's not a parameter
 			var call_name = arr[i].replace(/\s*/, '').replace(/\(/, '');
 
 			if ( !in_array(call_name, arr_params) ) {
 				//Escape any regexp characters
 				var regexp = new RegExp(escapeRegExChars(arr[i]));
 
 				//Check to see if we need to prefix with something
 				if ( arr[i].substr(0, 1) == " " || arr[i].substr(0, 1) == "(" ) {
 					var prefix = arr[i].substr(0, 1);
 					var function_name = arr[i].substr(1);
 
 				} else {
 					var prefix = "";
 					var function_name = arr[i];
 
 				}
 
 				str_func = str_func.replace(regexp, prefix + "gsf_temp_window." + function_name);
 
 			}
 
 		}
 
 	}//for
 
 	return str_func;
 
 }//end gsf_escape_functions
 
 /**
  * Check if needle is in haystack
  *
  * @param {Object} needle
  * @param Array haystack
  */
 function in_array(needle, haystack)
 {
 	for ( var i=0; i<haystack.length; i++ ) {
 		if ( haystack[i] == needle ) {
 			return true;
 
 		}
 
 	}//for i
 
 	return false;
 
 }//end in_array
 
 /**
  * Escapes common RegExp characters that also show up in code
  */
 function escapeRegExChars(str)
 {
 	//$
 	str = str.replace(/\$/g, "\\$");
 //	GM_log('escape $: ' + str);
 
 	//(
 	str = str.replace(/\(/g, "\\" + "(");
 //	GM_log('escape (: ' + str);
 
 	//)
 	str = str.replace(/\)/g, "\\)");
 //	GM_log('escape ): ' + str);
 
 	//whitespace
 	str = str.replace(/\s/g, " ");
 
 	return str;
 
 }//end escapeRegExChars
    
})();