// ==UserScript==
// @name          ScrollSpeed (auto-scroll)
// @description   Automatically scrolls page to end by a specified time
// @namespace     http://code.google.com/p/random-code/
// @version       0.3
// @include       *
// ==/UserScript==
//
// Copyright (c) 2010, Shreevatsa R.
// Released under the GNU GPL: http://www.gnu.org/copyleft/gpl.html
//
/*

  Purpose
  =======
  Imagine you're reading a long webpage (e.g. a novel!) that you don't
  care to read too carefully, but want to finish in, say, two hours.

  Usage
  =====
  Scroll down to the end of the page/region you want to read,
  and choose "Make_box" in the Greasemonkey User Script Commands.

  A text box should appear at the top right corner of the window.
  Enter a number of minutes in the box, and click on the 'min' button.

  Now scroll up. The page will scroll automatically at the proper rate
  (shown in button), to reach the end in the given time.

  The buttons indicate "scroll by X pixels every Y ms, and end at Z".

  You can enter another number in the box and click on the first button
  to change the end time (and also set position).

  If it has stopped scrolling for some reason, you can click on the
  last button to resume.

  To make it stop entirely, reload the page. You can also enter a very
  large number, e.g. 99999, to make the scrolling very slow.

  Notes
  =====
  * Because of rounding errors that accumulate, and other reasons,
  the scroll rate, instead of remaining constant, might increase.
  So set it to end slightly earlier than you need it to, just in case.

  * Only the vertical (y) position is scrolled. A previous version
  scrolled horizontally (x) as well, but I decided this was useless.

  * It does not work for files opened from disk. This is a Greasemonkey
  limitation; it does not run on local files.

  Changelog:

  2010-02-09 v0.3    Use variable intervals between scrolls
  2010-02-06 v0.2    Removed horizontal scroll
  2010-02-06 v0.1    First working version
  2010-01-15 v0.0    First version
*/

"use strict";
/*jslint browser: true, onevar: false, white:false, plusplus: false, undef: true, eqeqeq: true*/
/*global window, document, alert, GM_registerMenuCommand, GM_log */

if(window===window.top) {
  (function() {
    //JSLint thinks function names starting with uppercase are constructors
    var gm_log=GM_log, gm_registerMenuCommand=GM_registerMenuCommand;
    function assert(cond, str) { if (!cond) { throw new Error('Assertion failed: ' + str); } }

    function curTime() { return (new Date()).getTime(); }
    var endTime;

    var things_to_do = [];
    function pop_queue(func) {
      var wait = 1000; //The default time to wait, in milliseconds
      if(things_to_do.length>0) { wait = things_to_do.shift()(); }
      window.setTimeout(pop_queue, wait);
    }

    function sgn(x) {
      if(x>0) { return 1; }
      if(x<0) { return -1; }
      return 0;
    }

    function scrollSlightly(bx, by) {
      var T = endTime - curTime();
      if(T<0) { alert("Done scrolling; you should be done reading!"); return; }
      var tx = window.scrollX, ty = window.scrollY;
      var ret = Math.ceil(T*1.0/Math.abs(by-ty));
      var dy = sgn(by-ty);
      var factor = Math.ceil(100/ret);
      ret *= factor;
      dy  *= factor;
      var y = ty + dy;
      window.scrollTo(tx,y);
      document.getElementById('scrspbutton').value = '' + dy;
      document.getElementById('scrspinter').value = ret;
      things_to_do.push(function() { return scrollSlightly(bx, by); });
      //gm_log('Returning ' + ret);
      return ret;
    }

    function make_box() {
      gm_log('Making box');
      var d = document.createElement('div');
      d.innerHTML =
        '<input type="text"  id="scrspminutes" name="minutes" value="120" size="4" style="text-align:right">' +
        '<input type="submit" id="scrspbutton" name="bbutton" value="min">' +
        '<input type="submit" id="scrspinter" value="0">' +
        '<input type="submit" id="scrspendtime" value="">' +
        '';
      document.body.appendChild(d);
      d.style.position = 'fixed';
      d.style.right = "0px";
      d.style.top = "0px";

      function setAndScroll() {
        var t = document.getElementById('scrspminutes').value;
        var bx=window.scrollX;
        var by=window.scrollY;
        endTime = 1000*60*t + curTime();
        document.getElementById('scrspendtime').value = (new Date(endTime)).toLocaleTimeString();
        gm_log('Got ' + t + ', so End position is (' + bx + ',' + by + ') at ' + (new Date(endTime)).toLocaleString());
        things_to_do = [ function() { scrollSlightly(bx, by);} ];
        pop_queue();
        return false;
      }
      document.getElementById('scrspbutton').addEventListener('click', setAndScroll, true);
      document.getElementById('scrspendtime').addEventListener('click', pop_queue, true);
      pop_queue();
    }

    gm_registerMenuCommand('Make_box', make_box, 'b', 'control alt');

  })();

 }
