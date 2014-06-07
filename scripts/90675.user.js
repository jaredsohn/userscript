// ==UserScript==
// @name           Teesside Blackboard Auto Login
// @namespace      http://userscripts.org/users/189070
// @include        http://eat.tees.ac.uk/*
// ==/UserScript==



// Change this to whatever your blackboard login url is for your school (copy the link address from the grey "Login" button)
var loginPageURL = 'https://eat.tees.ac.uk/webapps/login?action=relogin';



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
        if (image.alt == 'Login Here' && image.src == 'https://eat.tees.ac.uk/images/ci/formbtns/login_off.gif'){
           // If we find an image on the page with an alt tag of "Login Here" then visit the login page
           window.location.href = loginPageURL;
        }
    }
}