// ==UserScript==
// @name           Facebook AutoLogin
// @namespace      daisukebe
// @description    Autologin to Facebook
// @include        http://www.facebook.com/*
// ==/UserScript==
// inspired by negipo
// http://userscripts.org/scripts/show/23772
//

(function(){
     var $ = function(id){ return document.getElementById(id);};

     var submit = $('submit');
     var email = $('email');
     var pass = $('pass');
     
     if(email != null || pass != null){
	 email.value = "your email address";
	 pass.value = "your facebook password";
	 //$('persistent').click();
	 var submit = "/html/body/div[3]/div[2]/div/div/div/div/div/div/form/table/tbody/tr[2]/td[3]/label/input";
	 document.evaluate(submit, document, null, 7, null).snapshotItem(0).click();
     }
})();