// ==UserScript==
// @name           Can not alter the FitNesse server
// @description    
// @author         Dan Dudley
// @include        https://*fitnesse.studentloan.org*
// @version        1.0
// @require        http://code.jquery.com/jquery-1.5.min.js
// ==/UserScript==

$(document).ready(function() {

  // remove global navigation
  $("a[href$='?edit']").remove();
  $("a[href$='?properties']").remove();
  $("a[href$='?refactor']").remove();
  $("a[href$='?test']").remove();
  $("a[href$='?suite']").remove();
  
  // remove the '[add child]' link, not in all FitNesse versions
  $('a[onclick^="popup("]').remove()

  // remove the save button from the create a new page screen
  $("input[name='save']").remove();

  // add a link to the navigation bar that will help alert people they are on the fitnesse server and not local
  $(".actions").append('<a href="javascript:void(0);" style="background-color:red;color:white;border:1px solid black;">FitNesse Server</a>');
});