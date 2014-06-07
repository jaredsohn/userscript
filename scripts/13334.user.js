// ==UserScript==
// @name           Phpbb Postbox Settings
// @version		1.2
// @description    Change X/Y dimensions and font size/face for a posting/privmsg box
// @include        */posting.php?*
// @include        */posting.php
// @include        */privmsg.php?*
// @include        */privmsg.php
// ==/UserScript==

/* LIMIT?? @INCLUDE ADDRESS TO YOUR FAVOURITE V2(v3?) BOARDS */

/*
  DESCRIPTION
  Allows a user to set the input/s and textarea field width, height, fontSize, fontFace.
  
  Firefox & IE7 users can access the preference settings via right-clicking
    the IE7Pro/Greasemonkey icon and choosing a setting from "User Script Commands"
    
  ** Opera users have to edit the script to change preference settings. **
  
  Firefox users also have the option of changing preferences via...
    about:config
      width        - width of inputs and textarea content
      height       - height of textarea content
      font_size  - size of font in inputs and textarea content
      font_face  - font family in inputs and textarea content
*/

/** changelog
2007-10-27
  Fixed:
    *blush*  Missing the IE store setting for FONT_FACE - fixed!
    *blush**AGAIN!!* meant to move default vars to private - done.
  Tied myself in knots checking for valid returns - fixed (hey, I'm a js newbie!!)
  For inputs in "Post a new topic" only expand width of "Poll question"
  New:
  Added rudimentary error checking for menu prompts
2007-10-26
  New:
    Think it is now worthy of a version 1.0 release.
    as it's been expanded upon,
    and is now cross-browser - Firefox, Opera, IE7
2007-05-23
  New:
    script "phpBB Expand Posting Form" by Glenn Carr - userscripts.org
*/


/**
  main function
*/
(function() {

  // DEFAULT PREFERENCES
  var pbWIDTH = 600; // 0 == no change
  var pbHEIGHT = 400; // 0 == no change
  var pbFONT_SIZE = 0; // 0 == no change
  var pbFONT_FACE = ""; // "" == no change
  // END PREFERENCES

  var isIE = (document.attachEvent && !window.opera) ? true : false;
  var isOpera = (window.opera) ? true : false;

  /**
    event traps for menu commands
    prompt for input and save the setting
  */
  var menu_pbWidth = function () {
    var sp = "Enter a width for the inputs and textbox\n\n[0 = default]\t*Refresh required.";
    if (isIE)
      var v = PRO_prompt(sp, pbWIDTH);
    else
      var v = prompt(sp, pbWIDTH);
    if (v) {
      if (/[^\d]/.test(v)) {
        alert('Value must be an integer greater than zero');
        return;
      }
      v = parseInt(v);
      if (isIE)
        PRO_setValue("width", v);
      else
        GM_setValue("width", v);
      pbWIDTH = v;
    }
  };

  var menu_pbHeight = function() {
    var sp = "Enter a height for the textbox\n\n[0 = default]\t*Refresh required.";
    if (isIE)
      var v = PRO_prompt(sp, pbHEIGHT);
    else
      var v = prompt(sp, pbHEIGHT);
    if (v) {
      if (/[^\d]/.test(v)) {
        alert('Value must be an integer greater than zero');
        return;
      }
      v = parseInt(v);
      if (isIE)
        PRO_setValue("height", v);
      else
        GM_setValue("height", v);
      pbHEIGHT = v;
    }
  };

  var menu_pbFontSize = function() {
    var sp = "Enter a font-size\n\n[0 = default]\t*Refresh required.";
    if (isIE)
      var v = PRO_prompt(sp, pbFONT_SIZE);
    else
      var v = prompt(sp, pbFONT_SIZE);
    if (v) {
      if (/[^\d]/.test(v)) {
        alert('Value must be an integer greater than zero');
        return;
      }
      v = parseInt(v);
      if (isIE)
        PRO_setValue("font_size", v);
      else
        GM_setValue("font_size", v);
      pbFONT_SIZE = v;
    }
  };

  var menu_pbFontFace = function() {
    var sp = "Enter a font-family.\n\ni.e [Corbel || Comic Sans MS || Verdana || etc.]\n\n[blank = default]\t*Refresh required.";
    if (isIE)
      var v = PRO_prompt(sp, pbFONT_FACE);
    else
      var v = prompt(sp, pbFONT_FACE);
    if (v) {
      if (isIE)
        PRO_setValue("font_face", v);
      else
        GM_setValue("font_face", v);
      pbFONT_FACE = v;
    }
  };

  /**
    preference settings - get & store
    if a preference has been 'stored' then use it
    otherwise use script values from above
  */
  function prefs() {
    if (isOpera) {
  /*
      WIDTH = pbdefWidth;
      HEIGHT = pbdefHeight;
      FONT_SIZE = pbdefFsize;
  */
    }
    else if (isIE) {

      var v = PRO_getValue("width");
      if (v)
        pbWIDTH = v;

      v = PRO_getValue("height");
      if (v)
        pbHEIGHT = v;

      v = PRO_getValue("font_size");
      if (v)
        pbFONT_SIZE = v;

      v = PRO_getValue("font_face");
      if (v)
        pbFONT_FACE = v;

      PRO_setValue("width", pbWIDTH);
      PRO_setValue("height", pbHEIGHT);
      PRO_setValue("font_size", pbFONT_SIZE);
      PRO_setValue("font_face", pbFONT_FACE);
      
      PRO_registerMenuCommand("Set TextArea Height", menu_pbHeight);
      PRO_registerMenuCommand("Set Posting Width", menu_pbWidth);
      PRO_registerMenuCommand("Set Posting FontSize", menu_pbFontSize);
      PRO_registerMenuCommand("Set Posting FontFace", menu_pbFontFace);
    }
    else {

      pbWIDTH = GM_getValue("width", pbWIDTH);
      pbHEIGHT = GM_getValue("height", pbHEIGHT);
      pbFONT_SIZE = GM_getValue("font_size", pbFONT_SIZE);
      pbFONT_FACE = GM_getValue("font_face", pbFONT_FACE);
      
      GM_setValue("width", pbWIDTH);
      GM_setValue("height", pbHEIGHT);
      GM_setValue("font_size", pbFONT_SIZE);
      GM_setValue("font_face", pbFONT_FACE);
      
      GM_registerMenuCommand("Set TextArea Height", menu_pbHeight);
      GM_registerMenuCommand("Set Posting Width", menu_pbWidth);
      GM_registerMenuCommand("Set Posting FontSize", menu_pbFontSize);
      GM_registerMenuCommand("Set Posting FontFace", menu_pbFontFace);
    }
  };

  prefs();
  
  // find all inputs with class = 'post'
  var nodes = document.getElementsByTagName('input');
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].className=='post') {
      if (pbWIDTH > 0 && (/(subject|poll_title)/.test(nodes[i].getAttribute('name'))))
        nodes[i].style.width = pbWIDTH + 'px';
      if (pbFONT_SIZE > 0)
          nodes[i].style.fontSize = pbFONT_SIZE + 'px';
      if (pbFONT_FACE > '')
          nodes[i].style.fontFamily = pbFONT_FACE;
    }
  }

  // find all textarea with class = 'post' - should only ever be one of!!
  var nodes = document.getElementsByTagName('textarea');
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].className=='post') {
      if (pbWIDTH > 0)
        nodes[i].style.width = pbWIDTH + 'px';
      if (pbHEIGHT > 0)
        nodes[i].style.height = pbHEIGHT + 'px';
      if (pbFONT_SIZE > 0)
          nodes[i].style.fontSize = pbFONT_SIZE + 'px';
      if (pbFONT_FACE > '')
          nodes[i].style.fontFamily = pbFONT_FACE;
    }
  }
})();
