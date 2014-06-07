// ==UserScript==
// @name        Facebook Dignifier
// @namespace   furbysarbitarynamespace.com/lol
// @description To stop you posting embarrasing Facebook statuses
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @version     0.1
// @grant none
// ==/UserScript==



var ele1 = document.getElementById('pagelet_composer');
var alerted = 0;
ele1.onclick = function(){
  if (alerted == 0){
    var num = 5 * Math.random();

    var rounded = Math.floor(num);
    var str;
    switch (rounded){
      case 0:
	str = "Do you REALLY have to post this?";
	break;
      case 1:
	str = "Is this going to make you look silly?";
	break;
      case 2:
	str = "Does anyone care about this?";
	break;
      case 3:
	str = "Is this post REALLY necessary?";
	break;
      case 4:
	str = "Stop and think before you post...";
	break;
      default:
	str = "Do you really have to post this?";
    }
    alert(str);
  }
  alerted = 1;
}

var buttons = document.getElementsByClassName('_42ft');
for (i=0;i<buttons.length;i++){
  if (buttons[i].innerHTML == "Post"){
    
    
    //find form element
    var childElement = buttons[i];
    for (j=0;j < 20;j++){
      var parentElement = childElement.parentNode;
      if (parentElement.tagName == "FORM"){
	var formElement = parentElement;
	break;
      }
      else{
	var childElement = parentElement;
      }
    }

    formElement.onsubmit = function(){return confirm("Last chance- are you SURE you want to post this?");}

    
  }
}