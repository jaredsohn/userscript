// ==UserScript==
// @name        CoiThienThaiPowerTool
// @namespace   Vcn
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js  
// @include     http://www.coithienthai.com/forum/showthread.php?*
// @version     1.1
// ==/UserScript==

$(document).ready(function() {
$("#mysitelogo").remove();
$("#bsb table:first").remove();
$("body").html($(".body_wrapper").html());
$(".above_body,.signature.restore,.postfoot,.postdetails_noavatar,.mudimPanel,#thread_controls").remove();
$("#breadcrumb").remove();
$("#notices").remove();
$("#hread_controls").remove();
});