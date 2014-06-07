// ==UserScript==
// @name Hostloc Signature
// @id	hostloc_signature
// @namespace	  in.co.tossing.toolkit.google
// @description	Remove URL redirection from google products.
// @license	GPL v3 or later version
// @include        http://www.hostloc.com/forum*
// @include        http://www.hostloc.com/thread*
// @version	1.0
// @author	winder
// ==/UserScript==

document.getElementById("fastpostreturn").innerHTML ='<input type="checkbox" name="usesig" id="usesig" class="pc" value="1" checked="checked">启用签名';