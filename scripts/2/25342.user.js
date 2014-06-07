// ==UserScript==
// @name           Enable Linux on myUSF
// @namespace      zcarter.myweb.usf.edu
// @description    Lets you upload files while using Linux or anything else that isn't a "Mac" or Windows (to compensate for negligent Blackboard coding). This could proably work for other Blackboard portals with this issue. Just change the include URL.
// @include        https://my.usf.edu/*
// ==/UserScript==


if(typeof unsafeWindow.FilePickerValidator_check != 'undefined'){
  var oldFileCheck = unsafeWindow.FilePickerValidator_check;

  unsafeWindow.FilePickerValidator_check = function()
  {
    // if using mac or windows, do regular check
    if (navigator.userAgent.toLowerCase().indexOf( "mac" ) > -1 || navigator.userAgent.toLowerCase().indexOf( "windows" ) >-1 )
      return oldFileCheck();
    // if using unrecognized operating system, go on through
    else
      return true;
  };

  unsafeWindow.newFile.check = unsafeWindow.FilePickerValidator_check;
}