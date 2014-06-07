// ==UserScript==
// @name	AutoLoginJ
// @description	Automatically submits login forms where Chrome has remembered the password.
// @match	http://172.168.0.1/*
// ==/UserScript==

function submitFirstPasswordForm()
{

  for (var form, i=0; form=document.forms[i]; ++i) {

    var numPasswordElements = 0;
    var submitButton = null;
    
    var formElement, j;
  
    for (j=0; formElement=form[j]; ++j)
      if (formElement.type == "password" && formElement.value && formElement.value.toLowerCase() != "password")
        ++numPasswordElements;
        
    if (numPasswordElements == 1) { // probably a login form (and not a change-password form or something like that)

      /*
       * The obvious way to submit a login form is form.submit().  However, this doesn't 
       * work with some forms, such as the Google AdWords login.  Instead, find a 
       * submit button and bonk it.
       */
       
      // look for a submit button
      for (j=0; formElement=form[j]; ++j)
        if (formElement.type == "submit") {
          submitButton = formElement;
          break; 
        }

      // also look for (and prefer) <input type=image>
      // why this extra loop? <input type=image> isn't form[j] for any j
      // (see bug 113197 or http://whatwg.org/specs/web-forms/current-work/#additions)
      for (j=0; formElement=form.getElementsByTagName("input")[j]; ++j)
        if (formElement.type == "image") {
          submitButton = formElement;
          break;
        }

      if (submitButton) {
        // Give a visual indication that we're submitting the login form automatically.
        submitButton.focus();
        submitButton.style.MozOutline = "2px solid purple";

        // Submit the form by calling click() on the submit button.
        submitButton.click();
  
        // Break out of both loops.
        return; 
      }
    }
  }

}

window.addEventListener(
  "load", 
  function() { 
    // Use a setTimeout so Firefox's password manager has a chance to fill in the password.
    setTimeout(submitFirstPasswordForm, 0); 
  }, 
  false
);

