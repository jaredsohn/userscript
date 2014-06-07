// hashmask.user.js
// version 0.2.0 - Improvements
// 2009-11-12
//   Add require to usotools to update the UserScript
//   Better use of jQuery
//   Remove dead and commented code
//
// version 0.1.1 - Small modifications
// 2009-11-03
//   Remove border color
//   Remove width expansion
//   Changing the source for hashmask.js to adjust positioning and interval
//
// version 0.1.0 - Initial Version
// 2009-10-30
// Copyright (c) 2009-2009, Bruno Caimar
// Released under the BSD license
// http://www.opensource.org/licenses/bsd-license.php
//
// * REQUIRES:
// * jquery.js
// * jquery.sha1.js
// * jquery.sparkline.js
// * jquery.hashmask.js
//
// --------------------------------------------------------------------
// ==UserScript==
// @name            HashMask Password Fields
// @author          Bruno Caimar <bruno.caimarATgmail.com/>
// @namespace
// @description     Put a HashMask in Password Fields (Info about it: http://lab.arc90.com/2009/07/09/hashmask-another-more-secure-experiment-in-password-masking/)
// @include         http://*
// @include         https://*
// @require         http://updater.usotools.co.cc/61346.js
// @license         http://www.opensource.org/licenses/bsd-license.php

// ==/UserScript==
(function () {
  try {
    var jQueryUrl = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js';
    var sha1Url = "http://hashmask.googlecode.com/svn/trunk/jquery.sha1.js";
    var sparklineUrl = "http://hashmask.googlecode.com/svn/trunk/jquery.sparkline.js";
    var hashmaskUrl = "http://brunocaimar.com/hashmask/jquery.hashmask.js";
    var passwordFields = [];
    var loopControl = 0;

    function LoadExternalScript(srcUrl) {
      var GM_SRC = document.createElement('script');
      GM_SRC.src = srcUrl;
      GM_SRC.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(GM_SRC);
    }
    function DoHashMask() {
      $(passwordFields).each(function (idx, el) 
                             {
                                $(el).hashmask(); 
                              } 
                            );
    }    
    function Wait4HashMask() {
      if (($.sha1) && ($.fn.sparkline) && ($.fn.hashmask)) {
        DoHashMask();
      } else {
        loopControl++; // To avoid an infinite loop...
        if (loopControl < 100) { 
          window.setTimeout(Wait4HashMask, 100); 
        }
      }
    }
    function jQueryLoaded() {
      LoadExternalScript(sha1Url);
      LoadExternalScript(sparklineUrl);
      LoadExternalScript(hashmaskUrl);
      Wait4HashMask();
    }
    function Wait4jQuery() {
      if (typeof unsafeWindow.jQuery === 'undefined') {
        window.setTimeout(Wait4jQuery, 100);
      } else {
        $ = unsafeWindow.jQuery;
        jQueryLoaded();
      }
    }
    function LoadjQuery() {
      if (typeof unsafeWindow.jQuery === 'undefined') {
        LoadExternalScript(jQueryUrl);
      }
    }
    function LookForPasswordFields() {
      var inputs = document.getElementsByTagName("input");
      if (inputs.length > 0) {
        for (var input = 0; input < inputs.length; input++) {
          if (inputs[input].type === "password") {
            passwordFields.push(inputs[input]);
          }
        }
        if (passwordFields.length > 0) {
          LoadjQuery();
          Wait4jQuery();
        }
      }
    }
    LookForPasswordFields();
  } catch (err) 
  { // some error ocurred...
    GM_log("Some error ocurred..." + err.description);
    GM_log(err);
  }
})();