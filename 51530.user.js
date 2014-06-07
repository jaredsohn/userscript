// ==UserScript==
// @name            Hotfile Helper
// @namespace       http://userscripts.org/users/94156
// @description     Skip the nuisance delay (unfortunately, the hourly traffic limit remains)
// @include         http://hotfile.com/*
// @include         http://*.hotfile.com/*
// @version         2009-07-19
// ==/UserScript==

/*
Changelog:
* 2009-07-19: Replace the "ignorelimit" option with a re-activated download button in case the hourly traffic limit has been reached; you can use that button to get the download link immediately if you want to add it to a download manager for a scheduled download at a later time, as the link itself doesn't change
* 2009-07-06: Workaround for Hotfile's new, non-wellformed HTML ("<form> ... <table> ... </form> ... </table>" is certainly not allowed)
* 2009-06-22: In case the hourly traffic limit has been reached, do not skip the first page unless "ignorelimit" is on (default off)
* 2009-06-21: Now automatically skip the first page, plus minor tweaks and cleanup
* 2009-06-16: Minor tweaks and cleanup
* 2009-06-15: Initial release
*/

var w = window, d = w.document;
var $n = function(p, n) {return d.evaluate(p, n, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue};

var _tm = '1245072880', _tmhash = 'e5b845119f0055c5d8554ee5f2ffc7b2d5ef86d7',
  _wait = '30', _waithash = '3bf07c5d83f2e652ff22eeaee00a6f08d4d2409a';
var f = $n('//form[@name="f"]', d);
if (f) {
  $n('//input[@name="tm"]', d).value = _tm;
  $n('//input[@name="tmhash"]', d).value = _tmhash;
  $n('//input[@name="wait"]', d).value = _wait;
  $n('//input[@name="waithash"]', d).value = _waithash;
  b = $n('//span[@id="freebut"]/input[@type="button"][@class="disabled"]', d);
  if (b) {
    b.value = 'Get download link now';
    b.addEventListener('click', function () {f.submit()}, false);
    GM_addStyle('input.disabled {text-decoration: none}');
  } else {
    f.submit();
  }
};

var a = $n('//a[contains(@href,"/get/")]', d);
if (a) {
  a.textContent = a.href;
};
