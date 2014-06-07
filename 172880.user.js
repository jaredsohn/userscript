// ==UserScript==
// @name        Hide AddToAnything
// @icon        http://cubeworldwiki.net/favicon.ico
// @namespace   net.lg188.hidea2a
// @description Hides a crappy box
// @include     http://cubeworldwiki.net/*
// @version     1
// @grant       none

// ==/UserScript==
(function(){



 'use strict';



 var digCounter = 0,

 numberOfDigTries = 3,

 bodyHeight = window.getComputedStyle(document.body).height;



 var scroll = function(){

 window.scrollBy(0, 10000);

 };



 var areWeLoading = function(){



 var loading = false;



 [].forEach.call(document.querySelectorAll(".loadingIndicator"), function(it){

 if(window.getComputedStyle(it).display !== "none"){

 loading = true;

 }

 });



 return loading;

 };



 var areWeIncreasingContent = function(){

 var retVal = false,

 currentBodyHeight = window.getComputedStyle(document.body).height;



 if(currentBodyHeight > bodyHeight){

 retVal = true;

 }



 return retVal;



 };



 var reportDigCompleted = function(){

 alert("Done!");

 };



 var expandComments = function(){



 [].forEach.call(document.querySelectorAll(".UFIPagerLink"), function(it){

 if( !it.querySelector(".ufiPagerLoading") ){

 it.click();

 }

 });



 if( document.querySelectorAll(".UFIPagerLink").length ){

 window.setTimeout(expandComments, 3000);

 }else{

 

[].forEach.call(document.querySelectorAll(".fbTimelineFeedbackComments a"), function(it){

it.click();

});



window.setTimeout(reportDigCompleted, 5000);

 }



 };



 var dig = function(){



 if(digCounter > numberOfDigTries){

 expandComments();

 return;

 }



 scroll();



 if( areWeIncreasingContent() || areWeLoading() ){

 digCounter = 0;

 window.setTimeout(dig, 1000);

 }else{

 digCounter;

 window.setTimeout(dig, 1000);

 }



 };



 dig();



}());