// ==UserScript==
// @name	autohelp
// @namespace	http://userscripts.org/users/21452
// @description	automatically does jobs, boosts & more for the Mafia Wars Facebook app. 
// @include	http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true
// @version	97
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

<html>

<head>
<title>Refresh JavaScript Example</title>
<noscript>
<!--
    We have the "refresh" meta-tag in case the user's browser does
    not correctly support JavaScript or has JavaScript disabled.

    Notice that this is nested within a "noscript" block.
-->
<meta http-equiv="refresh" content="2">

</noscript>

<script language="JavaScript">
<!--

var sURL = unescape(window.location.pathname);

function doLoad()
{
    // the timeout value should be the same as in the "refresh" meta-tag
    setTimeout( "refresh()", 2*1000 );
}

function refresh()
{
Int(row[4].textContent)