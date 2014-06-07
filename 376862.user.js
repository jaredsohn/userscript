// ==UserScript==
// @name       Gantter tweaks
// @version    0.1
// @description  Some tweaks for Gantter
// @match      https://www.smartapp.com/gantterforgoogledrive*
// @copyright  2014, Ivo Jesus
// ==/UserScript==

$(document).ready(function(){
	$("body").append("<style> #top{height:5px!important} #ac{display:none} #logo{display:none}</style> ");
});