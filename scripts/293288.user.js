// ==UserScript==
// @name Auto-fill ACGME Case Log
// @namespace anonymous
// @version 1.1
// @description Autofills fields on the ACGME Case Log from URL parameters
// @match https://www.acgme.org/ads/CaseLogs/CaseEntry/Insert?*
// @copyright 2014, some nerdy surgeon
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function gup( name ){
name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
var regexS = "[\\?&]"+name+"=([^&#]*)";  
var regex = new RegExp( regexS );  
var results = regex.exec( window.location.href ); 
 if( results == null )    return "";  
else    return decodeURIComponent(results[1]);}

$("#ResidentRoles").val(gup("ResidentRoles"));
$("#Institutions").val(gup("Institutions"));
$("#Attendings").val(gup("Attendings"));
$("#Rotations").val(gup("Rotations"));
$("#PatientId").val(gup("PatientId"));
$("#ProcedureDate").val(gup("ProcedureDate"));
$("#Comments").val(gup("Comments"));
$("#CodeDescription").val(gup("CodeDescription"));
$("#CategoryCodeDescription").val(gup("CategoryCodeDescription"));
$("#Code").val(gup("Code"));

document.forms[0].action = document.forms[0].action.split("?")[0];