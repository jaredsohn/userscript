// ==UserScript==
// @name       hack email talkfusion
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter email to send video newsletter in talkfusion
// @match      http://app.talkfusion.com/fusion2/studioMailPrep.asp
// @copyright  2012+, You
// ==/UserScript==

(function(){
    var btn = $("#btnAddContact");
    var contactlist = $("#txtRecipients");
    // Remove previous event
    btn.unbind( "click" );
    // re Attach custom event
    btn.click(function(event) {
		event.preventDefault();
		var tEmail = $("#txtEmail").val();
        if (contactlist.find("option[value='"+tEmail+"']").length == 0) {
            // call function in original script
            addOption("txtRecipients", tEmail, tEmail);
        }
		addThisContact(tEmail);
		$("#txtEmail").val("");
		selectAllContact();
	});
    
    window.addThisContact = function addThisContact(xemail) {
		if (!zvalidate(xemail)) {
			var txt = "Invalid email address.";
			shwAlert(txt, 400);
		} else {
			$.ajax({
				url: "tools/x_checkContact.asp",
				data: "memberId=" + xid + "&userId=" + uid + "&searchfor=" + xemail,
				success: function(data) {
					if (data == "") {
	                       // hack, added no contact logic
						if (contactlist.find("option[value='"+xemail+"']").length == 0) {
	        				addOption("txtRecipients", xemail, xemail);
	   					}
					} else {
						/*shwAlert(data, 400);*/
					}
				}
			});
		}
	}
})()