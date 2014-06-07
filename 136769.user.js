// ==UserScript==
// @name       Hostloc Signature Script
// @namespace  http://www.hostloc.com/
// @version    V1.0.0
// @description   Hostloc Signature Script for Forum Reply
// @match      http://www.hostloc.com/thread*
// @match      http://www.hostloc.com/forum*
// @copyright  2012 (C) Hostloc.com
// ==/UserScript==

document.getElementById("fastpostreturn").innerHTML ='<input type="checkbox" name="usesig" id="usesig" class="pc" value="1" checked="checked">启用签名';