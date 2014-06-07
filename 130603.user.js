// ==UserScript==
// @name Send to OmniFocus from Pivotal Tracker
// @version 0.1
// @description Adds a button to every Pivotal Tracker story, that opens the OmniFocus quick entry bar with the story title and URL filled in.
// @icon icon128.png
// @match https://www.pivotaltracker.com/projects/*
// @require http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

jQuery(function($) {
  var template = $('script#base_details_template').text();
  template = template.replace('<%= sectionA %>', '<div style="padding: 3px;margin: 5px 0"><a href="#" '+
    'style="font-size: 11px; font-weight: bold; font-family: Lucida Grande, sans-serif; background: #7c3eaa; text-decoration: none; padding: 3px; color: #fff;'+
           '-webkit-border-radius: 5px; -moz-border-radius: 5px; border: solid 2px #fff;" '+
    'onmousedown=\''+
    'var item=jQuery(this).closest(".item");'+
    'var id = item.find(".story_id_area input").val();'+
    'var title = item.find("textarea.story_name").val();'+
    'var projectName = jQuery(".projectName a").text();'+
    'jQuery(this).attr("href", "omnifocus:///add?name="+encodeURIComponent(projectName+" - "+title)+"&note="+encodeURIComponent("https://www.pivotaltracker.com/story/show/"+id));'+
    'return true;'+
    '\'>&#x2713; Send to OmniFocus</a></div><%= sectionA %>');
  $('script#base_details_template').text(template);
  Tracker.Template.cache.base_details_template = undefined;
});
