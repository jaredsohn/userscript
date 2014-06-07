// ==UserScript==
// @name           SpamTracker Email Address Generator for Gmail
// @namespace      http://pascal.vanhecke.info
// @description    A script to insert an email address like 
//                 'youraccount+currentdomain@gmail.com' so that you can easily
//				   filter your Gmail, track who's sending you spam, block 
//                 senders if necessary.  
//				   Gmail has the property that youraccount+whatever@gmail.com
//                 ends up at youraccount@gmail.com (the plus is really a "+")
//                 Press "F9" in a text box to insert the new Gmail address. 

//				   There is also a version of the script that works if you have
//                 your own domain and a catchall email setup 
//                 (generating mail addresses of the form 
//                 somedomain.com@yourdomain.com), search for 
//				   "SpamTracker Email Address Generator for your domain"

//                 Modified from the SpamTracker Email Address by Bill 
//                 Richardson, which was based on the Mailinator script by 
//                 Todd James.  Thanks Bill and Todd!

//                 When used for the first time, the script prompts you for 
//                 your Gmail account name (NOT your password ;-) !).
//                 Uninstall and reinstall to switch to another accunt.

//                 If you're on a www. url, the www. is omitted in the generated 
//                 email address.
// @include        *
// ==/UserScript==


(function() {
    var focusedElement = null;
	var myDomain ='';
	var websiteEmail = '';
	var hostName = '';

    function isMailinated(element) {
        if (element.getAttribute('mailinator') == 'true') {
            return true;
        }

        return false;
    }

    function isEmailInput(element) {
        if ((element.tagName.toLowerCase() == 'input') && (element.type.toLowerCase() == 'text')) {
            return true;
        }

        return false;
    }

    function keyHandler(e) {
        if ((e.keyCode == 120) && (isEmailInput(focusedElement) == true) && (isMailinated(focusedElement) == false)) {
			if ((!GM_getValue('gmailAccountName')) || (GM_getValue('gmailAccountName') == 'yourdomain.com')) 
			{
				gmailAccountName = prompt ("What is your Gmail account name? (example jeffsmith if Jef Smith has jefsmith@gmail.com)","accountname");
				GM_setValue("gmailAccountName", gmailAccountName);
			}
			else
			{
				gmailAccountName = GM_getValue('gmailAccountName');
			}
			hostName = document.location.hostname;
			if (hostName.substring(0,4) == "www."){
				hostName = hostName.substring(4, hostName.length);
			}				
			websiteEmail = gmailAccountName + "+" + hostName + '@gmail.com';
			focusedElement.value = websiteEmail;
        }
    }

    function gotFocus(e) {
        focusedElement = e.target;
    }

    document.addEventListener('focus', gotFocus, true);

    document.addEventListener('keydown', keyHandler, false);
})();

