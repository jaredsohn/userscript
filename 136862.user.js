// ==UserScript==
// @name        Facebook - Remove commercial messages in news feed
// @namespace   eelcodevlieger
// @description Removes commercial messages in news feed in the form of 'Person X likes Y: message'
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://*channel.facebook.com/*
// @include     https://*channel.facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @author         Eelco de Vlieger
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     2
// 
// v1 Only works for initial page load, still needs to be added for further dynamic page updates.
// 
// v2 Now periodically executed using setInterval(), so it also works when new messages get added to the page.
// 
// ==/UserScript==


var likesRegex = /<a.*?<\/a>\s?likes\s?<a.*?<\/a>\./ig;
var intervalDelayMs = 5000;

function replaceCommercialMessages(){
  $("li .storyInnerContent .mainWrapper h6").each(function(index, em){
    if( em.innerHTML.match(likesRegex) !== null ){
      $(this).parent("li .uiStreamStory").html("hidden commercial message: " + em.innerHTML);
    }
  });
}

//replaceCommercialMessages();
setInterval( function(){ replaceCommercialMessages(); }, intervalDelayMs);