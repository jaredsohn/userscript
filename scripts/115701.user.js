// ==UserScript==
// @name			Form's Little Helper
// @namespace		http://technoblogia.net
// @description		Fill your details in web forms in a click
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// @include			*
// ==/UserScript==

// Dec 1st:
// - Avoid from displaying Form's Little Helper's icon in textareas.

var dialogFF;
var inputActive;

GM_addStyle(".dialogLine { height: 28px; }");
GM_addStyle(".dialogInput { width: 150px; }");
GM_addStyle("#dialogFLH { font-size: 9px; }");
GM_addStyle("#dialogOpener { display: none; font-size: 7px; position: absolute; z-index: 100; }");

$(document).ready(function() {
	// Add jQuery UI stylesheet:
	$("head").append('<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/base/jquery-ui.css" />')
	// Add dialog opener floating button:
	$("body").append('<div id="dialogOpener"><button id="btnOpenFLHDialog">Open Fill Forms Dialog</button></div>');
	// Add the dialog itself:
	$("body").append(
		'<div id="dialogFLH" title="Basic dialog">' + 
			'<div id="tabsFLH">' + 
				'<ul>' +
					'<li><a href="#tabs-1">Home</a></li>' +
					'<li><a href="#tabs-2">Work</a></li>' +
				'</ul>' + 
				'<div id="tabs-1">' +
					'<p style="color: Gray; font-size: 9px;">' + 
						'Click on a button to fill details:' + 				
					'</p>' + 
					'<div class="dialogLine"><button id="btnNameHome">Fill full name</button> <input class="dialogInput" id="txtNameHome" type="text" placeholder="Your full name..." /></div>' + 
					'<div class="dialogLine"><button id="btnUsernameHome">Fill username</button> <input class="dialogInput" id="txtUsernameHome" type="text" placeholder="Your username..." /></div>' + 
					'<div class="dialogLine"><button id="btnEmailHome">Fill email address</button> <input class="dialogInput" id="txtEmailHome" type="text" placeholder="Your email address..." /></div>' + 
					'<div class="dialogLine"><button id="btnAddressHome">Fill home address</button> <input class="dialogInput" id="txtAddressHome" type="text" placeholder="Your home address..." /></div>' + 
					'<div class="dialogLine"><button id="btnPhoneHome">Fill phone number</button> <input class="dialogInput" id="txtPhoneHome" type="text" placeholder="Your phone number..." /></div>' + 
					'<div class="dialogLine"><button id="btnCellPhoneHome">Fill cell phone number</button> <input class="dialogInput" id="txtCellHome" type="text" placeholder="Your cell phone number..." /></div>' + 
					'<div class="dialogLine"><button id="btnWebsiteHome">Fill website address</button> <input class="dialogInput" id="txtWebsiteHome" type="text" placeholder="Your website address..." /></div>' + 
				'</div>' + 
				'<div id="tabs-2">' +
					'<p style="color: Gray; font-size: 9px;">' + 
						'Click on a button to fill details:' + 				
					'</p>' + 
					'<div class="dialogLine"><button id="btnUsernameWork">Fill username</button> <input class="dialogInput" id="txtUsernameWork" type="text" placeholder="Your username..." /></div>' + 
					'<div class="dialogLine"><button id="btnEmailWork">Fill email address</button> <input class="dialogInput" id="txtEmailWork" type="text" placeholder="Your email address..." /></div>' + 
					'<div class="dialogLine"><button id="btnAddressWork">Fill work address</button> <input class="dialogInput" id="txtAddressWork" type="text" placeholder="Your work address..." /></div>' + 
					'<div class="dialogLine"><button id="btnPhoneWork">Fill phone number</button> <input class="dialogInput" id="txtPhoneWork" type="text" placeholder="Your phone number..." /></div>' + 
					'<div class="dialogLine"><button id="btnCellPhoneWork">Fill cell phone number</button> <input class="dialogInput" id="txtCellWork" type="text" placeholder="Your cell phone number..." /></div>' + 
					'<div class="dialogLine"><button id="btnWebsiteWork">Fill website address</button> <input class="dialogInput" id="txtWebsiteWork" type="text" placeholder="Your website address..." /></div>' + 
				'</div>' + 
			'</div>' + 			
		'</div>');
	
	// Initialize the dialog:
	dialogFLH = $("#dialogFLH").dialog({
		autoOpen: false,
		resizable: false,
		title: "Form's Little Helper",
		width: 240,
		close: function(event, ui) {
			saveFLHData();
		}
	});
	$("#tabsFLH").tabs();
	// Initialize dialog opener's button:
	$("#btnOpenFLHDialog").button({
		icons: {
			primary: "ui-icon-pencil"
		},
		text: false
	}).click(function() {
		var position = $(this).offset();
		
		loadFLHData();
		$(dialogFLH).dialog("option", "position", [position.left, position.top]);
		$(dialogFLH).dialog('open');
		$("#dialogOpener").hide();
	});
	// Initialize the buttons inside the dialog:
	$("button[id^=btnName]").button({
		icons: {
			primary: "ui-icon-person"
		},
		text: false
	});
	$("button[id^=btnUsername]").button({
		icons: {
			primary: "ui-icon-key"
		},
		text: false
	});
	$("button[id^=btnUsername]").button({
		icons: {
			primary: "ui-icon-key"
		},
		text: false
	});
	$("button[id^=btnEmail]").button({
		icons: {
			primary: "ui-icon-mail-closed"
		},
		text: false
	});
	$("button[id^=btnAddress]").button({
		icons: {
			primary: "ui-icon-home"
		},
		text: false
	});
	$("button[id^=btnPhone]").button({
		icons: {
			primary: "ui-icon-note"
		},
		text: false
	});
	$("button[id^=btnCellPhone]").button({
		icons: {
			primary: "ui-icon-note"
		},
		text: false
	});
	$("button[id^=btnWebsite]").button({
		icons: {
			primary: "ui-icon-link"
		},
		text: false
	});
	
	// Bind click event handler for all buttons inside the dialog:
	$(".dialogLine button").click(function() {
		$(inputActive).val($(this).next().val());		
		$(dialogFLH).dialog('close');
		$(inputActive).trigger('click');
	})
	// Bind hover event handler for the dialog opener button. It will cause the button to float right next to the input element:
	$(":text,input[type='search']").not(".dialogInput").hover(		
		function() {
			inputActive = $(this);
			
			$("#dialogOpener").show().position({
				my: "left top",
				at: "right bottom",
				of: inputActive
			});
		},
		function() {
			window.setTimeout('$("#dialogOpener").hide()', 2000);
		}
	);
});

// Load saved details to form.
function loadFLHData() {
	for each (var val in GM_listValues()) {
		$("#" + val).val(GM_getValue(val));
	}
}

// Save user details for future usage.
function saveFLHData() {	
	$("input:text.dialogInput").each(function(i) {
		GM_setValue($(this).attr("id"), $(this).val());
	});
}