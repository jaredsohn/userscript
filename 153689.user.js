// ==UserScript== 
// @name        Tynt Disabler
// @author      Will Hipschman
// @namespace   http://whips.ch/us
// @description Kindly tells Tynt to disable itself to prevent garbage being appended to the clipboard when copying text from sites that utilize it.
// @include     *
// ==/UserScript==


// from Tynt's tracer script
var get_tracer_script_uri = function() {
  var scripts = document.getElementsByTagName("script"); 
  for (var i = 0; i < scripts.length; i++) {
    if (/\/tracer.*\?/i.test(scripts[i].src)) {
      return scripts[i].src;
    }
  }
  
  return null;
};

/**
 * Before doing anything, Tynt executes a function that checks if it should be disabled.
 *
 * The function does the following:
 * - Searches window.location.href for /disableTracer=/
 *   > If present and the value of the disableTracer parameter equals 'on',
 *     it sets a cookie with the value: disableTracer=y;expires=<current date + 1 year>
 *     and displays a (quite large and obnoxious) message box informing the user that Tynt
 *     has been turned off.  The function will then exit indicating that Tynt is blocked.
 * - Checks document.cookie for disableTracer=y.  If found, the function exits indicating
 *   that Tynt is blocked.
 *
 * If neither of the checks indicate that Tynt should be blocked, then Tynt will go on as normal,
 * attaching various event listeners and allowing the site owner to add a bunch of crap to your
 * clipboard if you want to copy and paste some text somewhere.  It's worth mentioning that Tynt
 * will send a log of your text copying adventures to their servers.
 *
 * Nope.
 */

var uri = get_tracer_script_uri();
if (uri) {
  var exp = new Date();
  exp.setTime(exp.getTime() + (365 * 24 * 60 * 60 * 1000)); // blah
  
  document.cookie = "disableTracer=y; path=/; expires=" + exp.toUTCString();
}
