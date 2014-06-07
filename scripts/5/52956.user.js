// ==UserScript==
// @name           Invelos Login Checkbox
// @namespace      muckl.com
// @description    Checks "Keep me signed in" checkbox by default. Invelos hosts and develops DVD Profiler.
// @include        http*://*invelos.com/LogIn.aspx
// @copyright      2009-2010, Muckl (http://userscripts.org/users/Muckl)
// @license        (CC) Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        0.0.1
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.1 (initial release) [2009-07-03]

   DevLog          [...] ...

**/

// check box
document.getElementById('ctl00_cphMain_cbxKeepSignedIn').checked = 'checked';
