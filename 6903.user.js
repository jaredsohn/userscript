// ==UserScript==
// @name           UNH Blackboard Auto Login
// @namespace      http://caseyscrib.com/
// @description    Auto-login to Blackboard for UNH, assuming Firefox is set to remember your password.  This is my first greasemonkey script, and is based on code from facebook autologin v2 and diveintogreasemonkey.org.
// @include        http://blackboard.unh.edu/*
// @include        https://blackboard.unh.edu/*
// @include        https://idm.unh.edu/*
// ==/UserScript==



// Change this to whatever your blackboard login url is for your school (copy the link address from the grey "Login" button)
var loginPageURL = 'https://blackboard.unh.edu/webapps/login?action=relogin';



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
        if (image.alt == 'Login Here' && image.src == 'https://blackboard.unh.edu/images/ci/formbtns/login_off.gif'){
           // If we find an image on the page with an alt tag of "Login Here" then visit the login page
           window.location.href = loginPageURL;
        }
    }
}