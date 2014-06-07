// ==UserScript==
// @name           Carroll Community College Blackboard Auto Login
// @namespace      http://snyderblogs.com
// @description    Auto-login to Blackboard for Carroll Community College (Westminster, MD), assuming Firefox is set to remember your password.  This is my first greasemonkey script, and is based on code from unh's auto login.
// @include        http://carrollcc.blackboard.com/*
// @include        https://carrollcc.blackboard.com/*
// ==/UserScript==



// Change this to whatever your blackboard login url is for your school (copy the link address from the grey "Login" button)
var loginPageURL = 'http://carrollcc.blackboard.com/webapps/login?action=relogin';



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
          if (image.alt == 'Log In' && image.src == 'https://carrollcc.blackboard.com/images/ci/formbtns/login_off.gif'){
           // If we find an image on the page with an alt tag of "Login Here" then visit the login page
           window.location.href = loginPageURL;
        }
    }
}
