// ==UserScript==
// @name           WDW?DYGAEM?
// @namespace      wdw
// @description    Inserts "What doesn't work?  Do you get an error message?" into a Devnet post
// @include        http://forums.devnetwork.net/posting.php*
// @author         Jonah Dahlquist <jonah@nucleussystems.com>
// ==/UserScript==

var wdw_button = '<input type="button" class="button2" accesskey="/" name="addwdwq" value="WDW?" id="wdw" onclick="insert_text(\'What doesn\\\'t work?  Do you get an error message?\');" />';
document.getElementById('format-buttons').innerHTML += wdw_button;