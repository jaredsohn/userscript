// ==UserScript==
// @name            Account Age
// @author          Luke Bonaccorsi AKA SpeedySurfer
// @namespace       http://gears.speedysurfer.co.uk
// @description     This script works out how old your account is in days.
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         http://*bungie.net/Account/Profile.aspx*
// @released        2008-08-12
// @compatible      Greasemonkey
// ==/UserScript==
 
/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
 
var membersince=document.getElementById('ctl00_mainContent_lblMemberSince')
datejoined=document.getElementById('ctl00_mainContent_lblMemberSince').lastChild.data;
var date1 = new Date(document.getElementById('ctl00_mainContent_lblMemberSince').lastChild.data);
  var date2 = new Date();
  date2day=date2.getDate();
  date2month=date2.getMonth()+1;
  date2year=date2.getFullYear();
  date2= new Date(date2month + "/" + date2day + "/" + date2year);
  var daysApart = Math.abs(Math.round((date2-date1)/86400000));
  document.getElementById('ctl00_mainContent_lblMemberSince').innerHTML = datejoined+"<br>Account age: "+daysApart+" days";


