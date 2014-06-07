// ==UserScript==
// @name        Pandu Testing Script
// @namespace   mafiawars
// @description My Testring Script
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/prompt_feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://mwfb.zynga.com/mwfb/remote/html_server.php?*xw_controller=freegifts*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/remote/html_server.php?*xw_controller=freegifts*
// @version     1.1.39
// @build       408
// ==/UserScript==
//-----------------------------------------------------------------------------
// Global variables
//-----------------------------------------------------------------------------
var ehgAllTarget;                      // All targets that may be attacked
var ehgTarget;                         // Targets with a defense >= ehgMinDefense and <= ehgMaxDefense
var ehgMinDefense = 0;                 // Minimum defensive strength to display
var ehgMaxDefense = 99999;             // Maximum defensive strength to display
var ehgPerPage    = 20;                // Number of targets to display per page

//-----------------------------------------------------------------------------
// EHG War Ice Checker.  This adds a group of targets on the Mafia Wars
// screen that may be attacked.  Each target will have the MW name, level,
// defense, and an ice check displayed.  There are links to the target's
// Facebook page and the targets Mafia Wars page as well.
//-----------------------------------------------------------------------------
javascript:(function() {
   //--------------------------------------------------------------------------
   // Remove the IFRAME if it exists
   //--------------------------------------------------------------------------
   if (document.getElementsByName('mafiawars')[0]) {
      window.location.href=document.getElementsByName('mafiawars')[0].src;
      return;
   }
   else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
      window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
      return;
	}
   //--------------------------------------------------------------------------
   // The frame is already broken out.  Add a scrollbar and stop the window
   // from shrinking.
   //--------------------------------------------------------------------------
   else {
      document.body.parentNode.style.overflowY="scroll";
      document.body.style.overflowX="auto";
      document.body.style.overflowY="auto";
      try {
         document.evaluate('//div[@id="final_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
         if(typeof FB != 'undefined') {
            FB.CanvasClient.stopTimerToSizeToContent; 
            window.clearInterval(FB.CanvasClient._timer);
            FB.CanvasClient._timer=-1;
         }
         document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
      }
      catch (fberr) {}
   }

   //--------------------------------------------------------------------------
   // Ready to display the targets.  First, get all possible targets that
   // may be attacked.  Then filter the list to only include targets that
   // have a defensive strength in the range of ehgMinDefense and 
   // ehgMaxDefense.  Once the filtered list is generated, display that one.
   //--------------------------------------------------------------------------
   ehgDisplayTargets(1, 0);            // Start with no targets displayed
})(); // end of javascript


function ehgDisplayTargets(firstTarget, lastTarget) {

   var iceBox_div = document.createElement('div');
   iceBox_div.id = "IceBox";
   //-----------------------------------------------------------------------
   // Setup IceBox html
   //-----------------------------------------------------------------------
   var styles = '<style type="text/css">' +
      '.sexy_table1{font-family:"Berlin Sans FB"; font-size:1.0em;}' +
      '.sexy_table1 td {font-family:"Berlin Sans FB"; font-size:1.0em; border-style: none;}' +
      '.sexy_error_table{font-family:"Berlin Sans FB"; font-size:1em; color:red; padding-left:10px}' +
      '</style>';

   var error_window='';


   //-----------------------------------------------------------------------
   // Start of the main window
   //-----------------------------------------------------------------------
   var tab_html ='<div id="windowContainer" style="height:300px; overflow:auto;">\n' +
      '<div id="homeWindow" class="iceBox_window">' +

      '<table class="sexy_table1" width=100% border=1 bgcolor="black" id="icepackMenu">' +
      '<tr>' + 
      '<td width="22%">&nbsp;</td>' +
      '<td width="40%"><div align="center">MWJe War Targets  &nbsp;   &nbsp; </div></td>' +
      '<td width="35%"><form name="minDefense" action="" method="get">defense: <input type="text" name="minDef" value="mindef" maxlength="5" size="4"> - <input type="text" name="maxDef" value="maxdf" maxlength="5" size="4"> set</form><td>' +
      '<td width="3%"<div style="float:right;"><a href="javascript:toggle%28%27windowContainer%27%29%3B" border=0>close</a></div>' +
      '</tr>' +
      '</table>';


   iceBox_div.innerHTML = styles + error_window + tab_html;

 //  if(document.getElementById('IceBox') != null) {
   //   document.getElementById('IceBox').innerHTML = "";
   //}


   return false;
}
