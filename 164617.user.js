// ==UserScript==
// @name           SalesForce revised
// @namespace      http://userscripts.org/users/useridnumber
// @include        https://csone.my.salesforce.com/ui/support/servicedesk/ServiceDeskPage#*
// @include        https://csone--c.na7.visual.force.com/apex/casemonapp
// @grant          none
// ==/UserScript==
// Version 1.0

unsafeWindow.openPrimaryTab = function(path, isActive, TabLabel){
   var url = "https://" + SFDCHostName + "/ui/support/servicedesk/ServiceDeskPage#" + path + "?isdtp=vw&isWsVw=true";
   url = url.replace(/c\./,"");     
   url = url.replace(/visual\.force/,"salesforce");         
   window.location.href = url;   
}