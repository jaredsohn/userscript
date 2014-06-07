// ==UserScript==
// @name          WebCT-AutoLogin
// @description	  Auto-Login for WebCT Vista @ UNSW
// @include       http://vista.elearning.unsw.edu.au/webct/entryPage.dowebct
// @include       https://vista.elearning.unsw.edu.au/webct/logonDisplay.dowebct
// ==/UserScript==
// IF YOU WANT THE THIRD PAGE TO SIGN IN MAKE SURE REMEMBER USERNAME AND PASSWORD IS ENABLED

if (document.title == "My eLearning Vista: Institution Listing"){

    unsafeWindow.submitIns(0); // goto 2nd page
    
} else if (document.title == "My eLearning Vista: Institution Login"){

    if (document.location.href == "https://vista.elearning.unsw.edu.au/webct/logonDisplay.dowebct"){

        unsafeWindow.submitLogon(); // login, finally!
        
    } else {

        unsafeWindow.submitLogin(); // goto 3rd page
    }

}
