// MailtoComposeInGMail
// version 0.1
// 2005-03-28
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Modified by Luca Cignoni
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
//
// MODIFIER NOTE:
// I modified script to add a gmail icon near every "mailto" links. So
// the user has a choice to send an email by local email client or by
// the gmail email compose form. (It's usefull, for example, where you're
// at work, and you can select if send my for yours personal interests!)
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// After the page is loaded, look for "mailto:" links and hooks their onclick
//  event to go to GMail's compose page, passing all the usual parameters
//  (to, cc, subject, body,...).
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Mailto Compose In GMail (with choice)
// @namespace       http://blog.monstuff.com/archives/000238.html
// @description     Add GMail compose links near every "mailto" links in web page
// @include         *
// @exclude         http://gmail.google.com
// @version					1.1
// ==/UserScript==

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
        var emailTo, params, emailCC, emailSubject, emailBody;

        emailTo = matches[1];
        //alert("Found to=" + emailTo);

        params = matches[3];
        if (params) {
            var splitQS = params.split('&');
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
                    }
                }
            }
        }

				var emailUrlVarName = "sendEmailUrl" + linkIndex;

        eval("var " + emailUrlVarName + " = 'https://mail.google.com/mail?view=cm&tf=0" + (emailTo ? ("&to=" + emailTo) : "") + (emailCC ? ("&cc=" + emailCC) : "") + (emailSubject ? ("&su=" + emailSubject) : "") + (emailBody ? ("&body=" + emailBody) : "") + "';");

				//var gmailIcon = document.createElement('span');
				var gmailIcon = document.createElement('img');

				//gmailIcon.innerHTML = " G ";
				//gmailIcon.style.border = "1px solid gray";
				gmailIcon.src = "data:image/bmp;base64,Qk1GAgAAAAAAADYAAAAoAAAAEAAAAAsAAAABABgAAAAAABACAADEDgAAxA4AAAAAAAAAAAAAODjaODjap6f5p6f5p6f5p6f5p6f5p6f5p6f5p6f5p6f5p6f5p6f5p6f5ODjaODjaODjaODja4uL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uL%2FODjaODjaODjaODjap6f54uL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uL%2Fp6f5ODjaODjaODjaODja4uL%2Fp6f54uL%2F%2F%2F%2F%2F%2F%2F%2F%2FgYHygYHy%2F%2F%2F%2F%2F%2F%2F%2F4uL%2Fp6f54uL%2FODjaODjaODjaODja%2F%2F%2F%2F4uL%2Fp6f5trb%2FgYHyWlrpWlrpgYHytrb%2Fp6f54uL%2F%2F%2F%2F%2FODjaODjaODjaODja%2F%2F%2F%2F%2F%2F%2F%2Ftrb%2FgYHyWlrpODjaODjaWlrpgYHytrb%2F%2F%2F%2F%2F%2F%2F%2F%2FODjaODjaODjaODja%2F%2F%2F%2F%2F%2F%2F%2FgYHyWlrpODjatrb%2Ftrb%2FODjaWlrpgYHy%2F%2F%2F%2F%2F%2F%2F%2FODjaODjaODjaODja%2F%2F%2F%2FgYHyWlrpODjatrb%2F%2F%2F%2F%2F%2F%2F%2F%2Ftrb%2FODjaWlrpgYHy%2F%2F%2F%2FODjaODjaODjaODjagYHyWlrpODjatrb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Ftrb%2FODjaWlrpgYHyODjaODjaODjaODjaODjaODjatrb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Ftrb%2FODjaODjaODjaODjaODjaODjaODjagYHyp6f5p6f5p6f5p6f5p6f5p6f5p6f5p6f5gYHyODjaODjaODja";
				gmailIcon.title = "send email to " + emailTo + " via gmail"
				gmailIcon.style.border = "none";

				gmailIcon.style.cursor = "pointer";
				eval("gmailIcon.addEventListener('click', function() { GM_openInTab(" + emailUrlVarName + "); return false; }, true);");

        mailtoLink.parentNode.insertBefore(gmailIcon, mailtoLink);

        /* MODIFIER NOTE: this was the original script code that modify links
        mailtoLink.href = "https://mail.google.com/mail?view=cm&tf=0" +
            (emailTo ? ("&to=" + emailTo) : "") +
            (emailCC ? ("&cc=" + emailCC) : "") +
            (emailSubject ? ("&su=" + emailSubject) : "") +
            (emailBody ? ("&body=" + emailBody) : "");
        */
        // mailtoLink.onclick = function() { location.href = newUrl; return false; };
    }
}
processMailtoLinks();