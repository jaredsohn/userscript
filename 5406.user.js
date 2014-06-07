//
// Copyright 2007 and beyond Ajax Gaier. All Rights Reserved.
//
//    http://ajaxgaier.blogspot.com
// 

//
// This Greasemonkey script automatically inserts the configured
// email address and password into the Google Adsense login form
// and submits the form to automatically log into Google Adsense.
//
// The script also reloads the page every 5 minutes so you don't get
// logged out.
//
// Ajax Gaier, Sept. 2007
//

//
// Configuration for Google Adsense Auto Login
//
Email = "YOUR EMAIL";
Password = "YOUR PASSWORD";

//
// No changes below this line if you are not sure what you are doing ;-)
//


// ==UserScript==
// @name GoogleAdsense-Auto-Login
// @namespace https://www.google.com/adsense/
// @description Auto-Login to Google Adsense
// @include https://*.google.com/adsense/* 
// ==/UserScript==

unsafeWindow.ga_email = Email;
unsafeWindow.ga_pw = Password;
// fill in data after 2sec and submit form
timeout = 2000;
// reload ga every 5 minutes
unsafeWindow.ga_reload_timeout = 5 * 60* 1000;

unsafeWindow.ga_autologin = function() {
  var ifr = document.getElementById('awglogin');    
  if (ifr) {
    var ifr_doc = ifr.contentDocument;   
    var username =  ifr_doc.getElementById('Email');   
    var password = ifr_doc.getElementById('Passwd');   
    form=ifr_doc.forms[0]; // alert(form);
    if ( username && password ) {
      username.value = unsafeWindow.ga_email;      
      password.value = unsafeWindow.ga_pw ;      
      form.submit(); 
    } else { 
      // alert('could not find form'); 
    }
  }
}

unsafeWindow.ga_reload = function() {
  // alert("reload");
  window.location.href=window.location.href;
  window.setTimeout("window.ga_reload();", unsafeWindow.ga_reload_timeout);
}

window.setTimeout("window.ga_autologin();", timeout);
window.setTimeout("window.ga_reload();", unsafeWindow.ga_reload_timeout);

