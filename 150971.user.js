// ==UserScript==
// @include       https://confluence.playtech.corp/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
//
// @name          Better Confluence TaskList
// @description   Visually highlights "done" items in TaskList Confluence macro
// @version       1.1
// @author        Andriy Halyasovskyy aka TheBit
// @downloadURL   https://userscripts.org/scripts/show/150971
// @updateURL     https://userscripts.org/scripts/source/150971.user.js
// ==/UserScript==

//jQuery 1.4.2 already included within Confluence 3.3.3 so we have to make sure 
//we just use our jQuery version and make no conflicts
var jQ = jQuery.noConflict(true);

applyCustomStyles();

function applyCustomStyles() {
  //Clean usual task items
  jQ(".tasklist-container .task").css("background-color", "");
  
  jQ(".tasklist-container .task .rendered.taskname").
    css({"color":"", "text-decoration":""});
  
  //Highlight completed task items
  jQ(".tasklist-container .completed").css("background-color", "#EEEEEE");
  
  jQ(".tasklist-container .completed .rendered.taskname").
    css({"color":"silver", "text-decoration":"line-through"});
}

//This handler required because styles applied on page load doesn't gets reapplied 
//after user click the checkboxes. Alternative implementation may take a way of listening 
//on DOMAttrModified but it will influence performance.
jQ("input.complete").click(function() {
  //These delays required because "completed" class added only on ajax callback 
  setTimeout(applyCustomStyles, 100);
  setTimeout(applyCustomStyles, 1000);
  setTimeout(applyCustomStyles, 2000);
});

//Make task completed/uncompleted on double click
jQ('.tasklist-container .task').dblclick(function() {
  //jQuery 1.4.2 delegates click events really tricky (at least it is buggy on 
  //Confluence Task list) so need to use later jQuery
  jQ(this).find("input.complete").click();
});