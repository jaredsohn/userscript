// ==UserScript==
// @name            Total Cost
// @description     Take the manual work of adding costs of several tickets out.
// @author          Stepan Grigoryan
// @include         https://bloomspot.codebasehq.com/bloomspot/milestones/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==


(function(){
  pointsHash = {};
  $('h4').next().each(function(index, table){
    table = $(table);
    var points = 0;
    $(".summary", table).each(function(i, summary){
      var cost = summary.innerHTML && summary.innerHTML.match(/\(cost:\s*(\d)\)/i);
      if(cost){
        points = points + parseInt(cost[1]);
      }
    });
    pointsHash[index] = points;
  });
  $('h4').each(function(index, name){
    name.innerHTML = name.innerHTML + " <span class=\"priority-tag\"style=\"color:#1398d6;background-color:#cfeaf6;\">(Total Cost: "+pointsHash[index]+")</span>";
  }); 
})();