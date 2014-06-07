// MailtoComposeInGMail
// version 0.1.1
// 2005-03-28
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Modified by Gina Trapani (http://ginatrapani.org)
// To support Google Apps for your Domain

// Modified by Tim Richardson to handle iframes
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Mailto Compose In GMail", and click Uninstall.
//
// Aaron Boodman also has a similar script, at:
//      http://youngpup.net/userscripts/gmailto.user.js
// In his approach, the links are re-written at the time that you click 
//      on them. One benefit is that the link still looks like mailto:x 
//      when you hover over it.
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// After the page is loaded, look for "mailto:" links and hooks their onclick
//  event to go to GMail's compose page, passing all the usual parameters 
//  (to, cc, subject, body,...).
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Mailto Compose In GMail
// @namespace       http://blog.monstuff.com/archives/000238.html
// @description     Rewrites "mailto:" links to GMail compose links
// @include         *
// @exclude         http://mail.google.com/*
// ==/UserScript==

	
var yrDomain = '';

if (!GM_getValue("your_domain")) {
	GM_setValue("your_domain", yrDomain);
}

GM_registerMenuCommand('Set your Gmail mailto: custom domain', setYrDomain);

function setYrDomain(){
	yrDomain = prompt('Enter your domain (in use with Google Apps for Your Domain):', yrDomain);
    GM_setValue('your_domain', yrDomain );
	window.location.href = window.location.href; //refresh page
}

(function() {

    var processMailtoLinks = function() {
        var xpath = "//a[starts-with(@href,'mailto:')]";
        var res = document.evaluate(xpath, document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                    
        var linkIndex, mailtoLink;
        for (linkIndex = 0; linkIndex < res.snapshotLength; linkIndex++) { 
            mailtoLink = res.snapshotItem(linkIndex);
            //alert(mailtoLink.href);
            
            var m = mailtoLink.href;
            var matches = m.match(/^mailto:([^\?]+)(\?([^?]*))?/);
            var emailTo, params, emailCC, emailBCC, emailSubject, emailBody;
            
            emailTo = matches[1];
            //alert("Found to=" + emailTo);
            
            params = matches[3];
            if (params) {
                var splitQS = params.toLowerCase().split('&');
                var paramIndex, param;
            
                for (paramIndex = 0; paramIndex < splitQS.length; paramIndex++) {
                    param = splitQS[paramIndex];
                    nameValue = param.match(/([^=]+)=(.*)/);
                    if (nameValue && nameValue.length == 3) {                   
                        // depending on name, store value in a pre-defined location
                        switch(nameValue[1]) {
                            case "to":
                                emailTo = emailTo + "%2C%20" + nameValue[2];
                                break;
                            case "cc":
                                emailCC = nameValue[2];
                                //alert("Found CC=" + emailCC);
                                break;
                            case "subject":
                                emailSubject = nameValue[2];
                                //alert("Found subject=" + emailSubject);
                                break;
                            case "body":
                                emailBody = nameValue[2];
                                //alert("Found body=" + emailBody);
                                break;
                            case "bcc":
                                emailBCC = nameValue[2];
                                //alert("Found body=" + emailBody);
                                break;
                        }
                    }
                }
            }
            //BEGIN Gina Trapani modifications for Google Apps for your Domain 
//            mailtoLink.href = "https://mail.google.com/mail?view=cm&tf=0" + 
			if (GM_getValue('your_domain', '') == '')
			{
				mailtoLink.href = "https://mail.google.com/mail?view=cm&tf=0&ui=1";
			} else {
				mailtoLink.href = "https://mail.google.com/a/"+GM_getValue('your_domain')+"/?view=cm&tf=0&ui=1";
			}
		    //END Gina Trapani modifications for Google Apps for your Domain 
                mailtoLink.href += (emailTo ? ("&to=" + emailTo) : "") + 
                (emailCC ? ("&cc=" + emailCC) : "") +
                (emailBCC ? ("&bcc=" + emailBCC) : "") +
                (emailSubject ? ("&su=" + emailSubject) : "") +
                (emailBody ? ("&body=" + emailBody) : "");
                //BEGIN Tim Richardson
                mailtoLink.target = "_blank"; // solve problem of mailtos in framesets
                //END Tim Richardson
            // mailtoLink.onclick = function() { location.href = newUrl; return false; };
        }
    }
    
    window.addEventListener("load", processMailtoLinks, false);
    
})();
