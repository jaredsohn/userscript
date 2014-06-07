// ==UserScript==
// @name           SpamTracker Email Address Generator for your domain
// @namespace      http://pascal.vanhecke.info
// @description    A script to insert an email address like 
//                 'cnn.com@mydomain.com' so that you can easily filter mail,
//                 track who's sending you spam, block accounts if necessary.  
//				   You must have a catchall address setup for your own domain 
//                 to use this.  
//                 Press "F9" in a text box to insert the email address. 

//				   There is also a version of the script that works for Gmail 
//                 accounts (generating mail addresses of the form 
//                 youraccount+currentdomain@gmail.com), search for 
//				   "SpamTracker Email Address Generator for Gmail"

//                 Modified from the SpamTracker Email Address by Bill 
//                 Richardson, which was based on the Mailinator script by 
//                 Todd James.  Thanks Bill and Todd!

//                 When used for the first time, the script prompts you for 
//                 your domain name.
//                 Uninstall and reinstall if you want to change your domain.

//                 If you're on a www. url, the www. is omitted in the generated 
//                 email address.
// @include        *
// ==/UserScript==


(function() {
    var focusedElement = null;
	var myDomain ='';
	var websiteEmail = '';

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
			if ((!GM_getValue('myDomain')) || (GM_getValue('myDomain') == 'yourdomain.com')) 
			{
				myDomain = prompt ("The domain name of your catchall email account?? (example yourdomain.com)","yourdomain.com");
				GM_setValue("myDomain", myDomain);
			}
			else
			{
				myDomain = GM_getValue('myDomain');
			}
			websiteEmail = document.location.hostname + '@' + myDomain;
			if (websiteEmail.substring(0,4) == "www."){
				websiteEmail = websiteEmail.substring(4, websiteEmail.length);
			}				
			focusedElement.value = websiteEmail;
        }
    }

    function gotFocus(e) {
        focusedElement = e.target;
    }

    document.addEventListener('focus', gotFocus, true);

    document.addEventListener('keydown', keyHandler, false);
})();

