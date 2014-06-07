// ==UserScript==
// @name             Multibyte PHP warnings
// @namespace        http://www.outshine.com/
// @description      On php.net, this flags manual entries that are not mb safe.
// @include          *php.net/*
// ==/UserScript==

/*
Copyright (c) 2007 Yahoo! Inc.  All rights reserved.  The copyrights embodied
in the content of this file are licensed by Yahoo! Inc. under the BSD (revised)
open source license (http://www.opensource.org/licenses/bsd-license.php)

Script by Tony Boyd.
Authored on 2007-10-15.
Updated on 2008-04-29.
Version: 1.0.5

Version 1.0.5 is not yet comprehensive.  Please contact the author if you have
definitive information about the status of these functions:
  * str_replace()
  * str_ireplace()
  * substr_replace()
  * strtr()
*/

var tabooFunctions = new Object();
tabooFunctions.mail = 'Try <a href="/mb_send_mail">mb_send_mail</a> instead.';
tabooFunctions.strlen = 'Try <a href="/mb_strlen">mb_strlen</a> instead.';
tabooFunctions.strpos = 'Try <a href="/mb_strpos">mb_strpos</a> instead.';
tabooFunctions.strrpos = 'Try <a href="/mb_strrpos">mb_strrpos</a> instead.';
tabooFunctions.substr = 'Try <a href="/mb_substr">mb_substr</a> instead.';
tabooFunctions.strtolower = 'Try <a href="/mb_strtolower">mb_strtolower</a> instead.';
tabooFunctions.strtoupper = 'Try <a href="/mb_strtoupper">mb_strtoupper</a> instead.';
tabooFunctions.substr_count = 'Try <a href="/mb_substr_count">mb_substr_count</a> instead.';
tabooFunctions.ereg = 'Try <a href="/mb_ereg">mb_ereg</a> instead.';
tabooFunctions.eregi = 'Try <a href="/mb_eregi">mb_eregi</a> instead.';
tabooFunctions.ereg_replace = 'Try <a href="/mb_ereg_replace">mb_ereg_replace</a> instead.';
tabooFunctions.eregi_replace = 'Try <a href="/mb_eregi_replace">mb_eregi_replace</a> instead.';
tabooFunctions.preg_match = 'Please investigate the /u option, as that provides UTF-8 awareness.  The preg_* functions are contentious, because careful use can be safe.  If you are unsure what to do, see <a href="/mb_eregi">mb_eregi</a> as a possible replacement.  If you have suggestions for the author about best practices in this case, please <a href="http://www.outshine.com/about/contact/">get in touch</a>.';
tabooFunctions.preg_replace = 'Please investigate the /u option, as that provides UTF-8 awareness.  The preg_* functions are contentious, because careful use can be safe.  If you are unsure what to do, see <a href="/mb_ereg_replace">mb_ereg_replace</a> as a possible replacement.  If you have suggestions for the author about best practices in this case, please <a href="http://www.outshine.com/about/contact/">get in touch</a>.';
tabooFunctions.split = 'Try <a href="/mb_split">mb_split</a> instead.';
tabooFunctions.explode = 'Try <a href="/mb_split">mb_split</a> instead.';
tabooFunctions.stripos = 'Try <a href="/mb_stripos">mb_stripos</a> instead.';
tabooFunctions.stristr = 'Try <a href="/mb_stristr">mb_stristr</a> instead.';
tabooFunctions.strrchr = 'Try <a href="/mb_strrchr">mb_strrchr</a> instead.';
tabooFunctions.strripos = 'Try <a href="/mb_strripos">mb_strripos</a> instead.';
tabooFunctions.strstr = 'Try <a href="/mb_strstr">mb_strstr</a> instead.';
tabooFunctions.strrev = 'View comments for possible workarounds.';
tabooFunctions.wordwrap = 'View comments for possible workarounds.';
tabooFunctions.chunk_split = 'No known workarounds yet.';
tabooFunctions.ucfirst = 'View the comment posted on "11-Feb-2008 04:31" for a possible workaround.';
tabooFunctions.lcfirst = 'This function is flagged because its companion function (ucfirst) is not safe.  However, this function is untested.  Please <a href="http://www.outshine.com/about/contact/">contact the author</a> if you can confirm, deny, or otherwise help with this warning text.  Thanks!';
tabooFunctions.rtrim = 'It may be multi-byte safe if you use UTF-8 only (multi-byte UTF-8 characters contain no byte sequences that resemble white space).  Avoid UTF-16 & UTF-32, among others.';
tabooFunctions.ltrim = 'It may be multi-byte safe if you use UTF-8 only (multi-byte UTF-8 characters contain no byte sequences that resemble white space).  Avoid UTF-16 & UTF-32, among others.';
tabooFunctions.trim = 'It may be multi-byte safe if you use UTF-8 only (multi-byte UTF-8 characters contain no byte sequences that resemble white space).  Avoid UTF-16 & UTF-32, among others.';
tabooFunctions.strip_tags = 'It may be multi-byte safe if you use UTF-8 only (multi-byte UTF-8 characters contain no byte sequences that resemble less-than or greater-than symbols).  Avoid UTF-16 & UTF-32, among others.';
tabooFunctions.ucwords = 'Try this code instead:\n<br /><pre>$str = mb_convert_case($str, MB_CASE_TITLE, "UTF-8");</pre>';

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='refnamediv']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);
thisDiv = allDivs.snapshotItem(0);
myH1 = thisDiv.getElementsByTagName('h1')[0];
for (var tabooItem in tabooFunctions) {
  if (tabooItem == myH1.innerHTML) {
  	var newDiv = document.createElement("div");
  	newDiv.setAttribute('style', 'font-size: 15px; padding: 20px; margin: 10px; border: 2px solid red; background-color: #FFFF99;');
  	newDiv.innerHTML = 'WARNING: This function is NOT multi-byte compatible!  ' + tabooFunctions[tabooItem];
  	thisDiv.insertBefore(newDiv, myH1);
  }
}
