// ==UserScript==
// @name        Dailymile Week Resolution
// @namespace   http://ritim.wordpress.com/dmweekres
// @description Resolves week mileage by sport in profile pages... by spinodal
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include     http://www.dailymile.com/people/*
// @grant    GM_getValue
// @grant    GM_setValue
// @version     1
// ==/UserScript==

var targetNodes      = $(".profile_gradient");
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var myObserver       = new MutationObserver (mutationHandler);
var obsConfig        = { childList: true, characterData: true, attributes: true, subtree: false, attributeOldValue: true  };

var currentWeek = 0;
var slideCount = 1;
var scrolled = false;
var loaded = false;
var direction = "previous";
var activities = {"Running" : 0, "Cycling" : 0, "Swimming" : 0, "Spinning" : 0, "Other" : 0};

$('#previous_training').on('mousedown',function(event){
  direction = "previous";
});

$('#next_training').on('mousedown',function(event){
  direction = "next"; 
});

targetNodes.each(function (){
  if(isRightPage()){
    myObserver.observe (this, obsConfig);
  }
});

function mutationHandler (mutationRecords) {
  mutationRecords.forEach(function (mutation){
    if(mutation.oldValue=="profile_gradient loading"){
      loaded = true;
    }
    if(mutation.oldValue=="profile_gradient scrolling"){
      scrolled = true;
      if(slideCount-1==currentWeek && direction=="next"){
        scrolled = false;
      }
      handleMutations();
    }
  });
}

function handleMutations(){
  if(loaded){
    currentWeek = currentWeek+4;
    slideCount = slideCount+4;
  }
  if(scrolled){
    if(direction=="previous"){
      currentWeek = currentWeek-1;
    }else{
      currentWeek = currentWeek+1;
    }
  }
  scrolled = false;
  loaded = false;
  addWeekDetailBar(currentWeek);
}

if(isRightPage()){
  addWeekDetailBar(currentWeek);
}

function isRightPage(){
  if($(".profile_gradient").length > 0){
    return true;
  }
  return false;
}

function addWeekDetailBar(index){
$('.aaa').remove();
clearActivities();
$($('.slide')[index]).find('#training_bars').children('li.active').each(function(index){
  $(this).find('#mileage_breakdown').each(function(index){
    $(this).find('.activity_name').each(function(index){
        var activityName = $(this).text();
        $(this).nextUntil('dt').each(function(index){
          var bdMiles = $(this).find('.breakdown_miles');
          if(bdMiles.length!=0){
            var mile = parseFloat(bdMiles.text());
          }
          else{
            var mile = parseFloat($(this).find('span.bold').text());
          }
          if(activities[activityName] != null){
            activities[activityName] = activities[activityName] + mile;
          }
          else{
            activities["Other"] = activities["Other"] + mile;
          }
      });
    });
  });
});
var newUl = 
'<ul id=\'profile_stats\' class=\'training_details light_grey_bezel aaa\'><li class=\'miles_stat first\'><strong class=\'stat\'>'+
activities["Running"].toFixed(2)+'</strong><span class=\'label\'> running</span></li><li class=\'miles_stat\'><strong class=\'stat\'>'+
activities["Cycling"].toFixed(2)+'</strong><span class=\'label\'> cycling</span></li><li class=\'miles_stat\'><strong class=\'stat\'>'+
activities["Swimming"].toFixed(2)+'</strong><span class=\'label\'> swimming</span></li><li class=\'miles_stat\'><strong class=\'stat\'>'+
activities["Spinning"].toFixed(2)+'</strong><span class=\'label\'> spinning</span></li><li class=\'miles_stat first\'><strong class=\'stat\'>'+
activities["Other"].toFixed(2)+'</strong><span class=\'label\'> other</span></li></ul>';
$('#profile_stats').after(newUl);
}

function clearActivities(){
  activities["Running"] = 0;
  activities["Cycling"] = 0;
  activities["Swimming"] = 0;
  activities["Spinning"] = 0;
  activities["Other"] = 0;
}