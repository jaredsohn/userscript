// ==UserScript==
// @name           Gmail 2.0 Multiple HTML Signatures
// @description    Automatically inserts HTML signatures into your Gmail messages based on which address you are sending from.
// @namespace      http://blankcanvasweb.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
//
// version 1.03 - Last updated January 24, 2008
// Author: Jerome Dane - Blank Canvas
// License: http://blankcanvasweb.com/gmail2_html_sigs/license/
// Latest Information: http://blankcanvasweb.com/gmail2_html_sigs/
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var signatures = Array();		/////////////////////////////////////////////////////////////////////////////////
	var emails = Array();			/////////////////////////////////////////////////////////////////////////////////
	function add_sig(email, html) {	//////////////////////////// Do Not Modify //////////////////////////////////////
		signatures.push(html);		/////////////////////////////////////////////////////////////////////////////////
		emails.push(email);			/////////////////////////////////////////////////////////////////////////////////
	}								/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- Setup / Configuration ------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
//
// Syntax: add_sig(string [email address], string [html signature])
//
// Use the add_sig function to set up the html signatures for the various email addresses that you use to send 
// messages from. You can create one signature for each account you have set up under "Accounts" in the "Settings" tab.
//
// Tip: Make sure you include any CSS as an inline attribute. This will guarantee the best possible email client 
//      support.
// Tip: Don't forget to use the \ character at the end of each line if your signature goes over multiple lines.
//
// Use the following to get yourself started:

add_sig('singh.prahlad@gmail.com', '<div style="font-size:12px;"><p class="MsoNormal" style="margin: 0in 0in 0pt;"><strong><span
 style="font-size: 10pt; color: navy; font-family: Magneto;">Prahlad
Singh</span></strong></p>
<p class="MsoNormal" style="margin: 0in 0in 0pt;"><em><span
 style="font-size: 7.5pt; color: navy; font-family: Arial;">Systems
Executive&nbsp;- Software Development</span></em><span
 style="color: navy;"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin: 0in 0in 0pt;"><em><span
 style="font-size: 7.5pt; color: navy; font-family: Arial;">Scicom
Technologies Pvt. Ltd(An SAIC Company)</span></em></p>
<p class="MsoNormal" style="margin: 0in 0in 0pt;"><em><span
 style="font-size: 7.5pt; color: navy; font-family: Arial;">A-67,
Sector-57</span></em></p>
<p class="MsoNormal" style="margin: 0in 0in 0pt;"><em><span
 style="font-size: 7.5pt; color: navy; font-family: Arial;">Noida,&nbsp;UP
210310</span></em></p>
<p class="MsoNormal" style="margin: 0in 0in 0pt;"><em><span
 style="font-size: 7.5pt; color: navy; font-family: Arial;">Office
Phone: (120) 4343700 Ex:129</span></em></p>
<p class="MsoNormal" style="margin: 0in 0in 0pt;"><em><span
 style="font-size: 7.5pt; color: navy; font-family: Arial;">Cell
Number: 9899677606</span></em></p>

<br />Web User Extraordinaire</div>');



// --------------------------------------------------------------------------------------
// ---------- Do not edit below this line unless you really know what you are doing -----
// --------------------------------------------------------------------------------------
var gmail = null;
window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {							 
		unsafeWindow.gmonkey.load('1.0', function(gmail) {
			var select_from = null;
			var msg_box = null;
			var module = null;
			var navbox = null;
			var target_email = null;
			var no_sig_warning = false;
		   	function setViewType() {
              	var str = '';
              	switch (gmail.getActiveViewType()) {
					case 'tl': str = 'Threadlist'; break;
					case 'cv': str = 'Conversation'; break;
					case 'co': str = 'Compose'; break;
					case 'ct': str = 'Contacts'; break;
					case 's': str = 'Settings'; break;
                	default: str = 'Unknown';
              	}
				// set up from onchange function
				if(str == 'Compose') {
					compose_context();
				} else if(str == 'Conversation') {
					reply_context();
				}
           	}
			function sig_insert(location) {
				var sig = '';
				for(x in emails) {
					if(emails[x] == target_email) {
						sig = signatures[x];
					}
				}
				if(msg_box) {
					var signature = '<!--START_SIG-->' + sig + '<!--END_SIG-->';
					// strip any existing sigs	
					if(msg_box.contentDocument.body.innerHTML.match(/<!--START_SIG-->(.)*<!--END_SIG-->/)) {
						//msg_box.contentDocument.body.innerHTML = signature + msg_box.contentDocument.body.innerHTML;	// new signature
						msg_box.contentDocument.body.innerHTML = msg_box.contentDocument.body.innerHTML.replace(/<!--START_SIG-->(.)*<!--END_SIG-->/, signature);
					} else {
						msg_box.contentDocument.body.innerHTML = '<br><br>' + signature + msg_box.contentDocument.body.innerHTML;	// new signature
					}
				}
				if(!sig) {
					no_sig_warning.innerHTML = 'No signature found (click)';	
				} else {
					no_sig_warning.innerHTML = '';
				}
			}
			function create_no_sig_warning() {
				try { 
					no_sig_warning.removeNode(true)
				} catch(e) {}
				if(!no_sig_warning) {
					no_sig_warning = unsafeWindow.document.createElement('span');
					no_sig_warning.style.cursor = 'pointer';
					no_sig_warning.style.margin = '0 0 0 1em;';
					no_sig_warning.style.color = '#FF0000';
					no_sig_warning.style.fontWeight = 'bold';
					no_sig_warning.style.fontSize = '11px';
					no_sig_warning.onclick = function() {
						alert('Please edit the Gmail 2.0 Multiple HTML Signatures \nsource code to set up a signature for this email address');
					}
					select_from.parentNode.appendChild(no_sig_warning);
				}
			}
			function click_compose() {
				var elems = gmail.getNavPaneElement().getElementsByTagName('span');
				for(x in elems) {
					if(elems[x].innerHTML.match(/Compose Mail/)) {
						simulateClick(elems[x], 'click');
					}
				}
			}
			function select_from_listener() {
				try { 
					var elems  = gmail.getActiveViewElement().getElementsByTagName('select'); 
				} catch(e) {
					var elems = Array();	
				}
				// look for select from
				if(elems.length > 0) {
					for(x in elems) {
						if(elems[x].name == 'from') {
							select_from = elems[x];
							target_email = elems[x].value;
							select_from.onchange = compose_context;
						}
					}
				} else {
					//setTimeout(select_from_listener, 500);	
				}
			}
			function reply_context() {
				setTimeout(select_from_listener, 100);	
				// look for message box
				var elems = gmail.getActiveViewElement().getElementsByTagName('iframe');
				if(elems.length > 0) {
					msg_box = elems[0];
					// get target email					
					var elems = gmail.getActiveViewElement().getElementsByTagName('input');
					if(elems.length > 0) {
						target_email = elems[0].value;	
					}					
					if(!msg_box.contentDocument.body.innerHTML.match(/<!--START_SIG-->(.)*<!--END_SIG-->/)) {
						sig_insert();
					}
				}
				setTimeout(reply_context, 100);	
			}
			function compose_context() {			
				try { 
					var elems  = gmail.getActiveViewElement().getElementsByTagName('select'); 
				} catch(e) {
					var elems = Array();	
				}
				if(elems.length > 0) {
					for(x in elems) {
						if(elems[x].name == 'from') {
							select_from = elems[x];
							target_email = elems[x].value;
							select_from.onchange = compose_context;
							create_no_sig_warning();
							var elems = gmail.getActiveViewElement().getElementsByTagName('iframe');
							if(elems.length > 0) {
								msg_box = elems[0];
								
								sig_insert();
							} else {
								setTimeout(compose_context);	
							}
						}
					}
				} else {
					setTimeout(click_compose, 100);
				}
			}
			function simulateClick(node, eventType) {
			 // pausecomp(2000);
			  var event = node.ownerDocument.createEvent("MouseEvents");
			  event.initMouseEvent(eventType,
								   true, // can bubble
								   true, // cancellable
								   node.ownerDocument.defaultView,
								   1, // clicks
								   50, 50, // screen coordinates
								   50, 50, // client coordinates
								   false, false, false, false, // control/alt/shift/meta
								   0, // button,
								   node);
			
			  node.dispatchEvent(event);
			}

			function set_up_module() {				
				
			}
			
            gmail.registerViewChangeCallback(setViewType);
        	setViewType();
    	});
	}
}, true);