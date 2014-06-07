// ==UserScript==
// @name          WebCT-AutoLogin (Macon State College)
// @description	  Auto-Login for WebCT Vista @ Macon State College
// @include       http://maconstate.view.usg.edu/webct/entryPage.dowebct
// @include       https://maconstate.view.usg.edu/webct/logonDisplay.dowebct
// ==/UserScript==
// IF YOU WANT THE THIRD PAGE TO SIGN IN MAKE SURE REMEMBER USERNAME AND PASSWORD IS ENABLED

if (document.title == "My eLearning Vista: Institution Listing"){

    unsafeWindow.submitIns(0); // goto 2nd page
    
} else if (document.title == "My eLearning Vista: Institution Login"){

    if (document.location.href == "https://maconstate.view.usg.edu/webct/logonDisplay.dowebct"){

        unsafeWindow.submitLogon(); // login, finally!
        
    } else {

        unsafeWindow.submitLogin(); // goto 3rd page
    }

}