// ==UserScript==
// @name            NewScientist Auto-Login
// @namespace       http://pix.test.at/
// @description     Auto-login to NewScientist if viewing a NS Full Access article,  assuming Firefox is set to remember your password.
// @include         http://newscientist.com/*
// @include         http://*.newscientist.com/*
// @include         http://*.newscientisttech.com/*
// ==/UserScript==
// To report bugs or suggestions, go to http://pix.test.at
// Based on the MySpace Auto-Login script from http://slashetc.net/code

var pwFocus = false;

var laForm = false;

function autoLogin(){
    if(pwFocus==false && laForm){
        if(laForm.elements.namedItem("loginAttempt.password").value.length>1){laForm.submit();}
        else{setTimeout(autoLogin,100);}
    }
}

function focusEvent(){
    pwFocus = true;
}

var action_re = new RegExp("/unpwlogin.ns(?:;JSESSIONID=(\\w*))?");

var forms = document.forms;

if (document.body.textContent.match(/article preview/i)) {

	// find the first form with a valid action
	for (var i=0;i<forms.length;i++)
	{
		action_match = action_re.exec(forms[i].action)
		if(action_match && forms[i].elements.namedItem("loginAttempt.password"))
		{
			laForm = forms[i];
			laForm.elements.namedItem("loginAttempt.password").addEventListener("keypress", focusEvent, false);
			window.addEventListener("load", autoLogin(), false);
			break;
		}
	}
}
