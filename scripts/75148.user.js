// ==UserScript==
// @name           UniMelb Blackboard Auto Login
// @namespace      http://nigelwong.com/
// @description    Auto-login to Blackboard for UniMelb, assuming Firefox is set to remember your password.  This is my first greasemonkey script, and is based on code from facebook autologin v2 and diveintogreasemonkey.org.
// @include        https://app.lms.unimelb.edu.au/webapps/portal/frameset.jsp
// @include        https://app.lms.unimelb.edu.au/webapps/portal/frameset.jsp*
// ==/UserScript==



// Change this to whatever your blackboard login url is for your school (copy the link address from the grey "Login" button)
var loginPageURL = 'https://app.lms.unimelb.edu.au/webapps/login/?new_loc=/webapps/portal/frameset.jsp';



var pwFocus = false;

function autoLogin(){
    if(pwFocus==false){
        if(document.forms[0].elements.namedItem("password").value.length>1){document.forms[0].submit();}
        else{setTimeout(autoLogin,75);}
    }
}

function focusEvent(){
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("password")){
    document.forms[0].elements.namedItem("password").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}

var images = document.getElementsByTagName('img');


if (images.length) {
    for (var i = 0; i < images.length; i++) {
      image = images[i];
        if (image.alt == 'Log In' && image.src == 'https://app.lms.unimelb.edu.au/images/ci/formbtns/login_off.gif'){
           // If we find an image on the page with an alt tag of "Login Here" then visit the login page
           window.location.href = loginPageURL;
        }
    }
}
