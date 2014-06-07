// ==UserScript==
// @name           Asmandez Resource Bar Timer
// @namespace      1234
// @include        http://*.asmandez.ir/*
// @include		   http://s7.asmandez.ir/planet/
// @exclude        http://s7.asmandez.ir/login/

// ==/UserScript==

//---------------اطلاعات مربوط به خودم
  demongox = document.createElement('div');
  demongox.style.position = 'absolute';
  //demongox.style.align = 'right';
  demongox.style.top = '10px';
  demongox.style.left = '10px';
  demongox.style.padding = '2px';
  demongox.style.color = '#000';
  demongox.style.backgroundColor = '#fff';
  demongox.innerHTML = 'Powered by demongox';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(demongox);
  //------------------
  
  //--------------
  demongox = document.createElement('div');
  demongox.style.position = 'absolute';
  demongox.style.top = '150px';
  demongox.style.left = '10px';
  demongox.style.padding = '2px';
  demongox.style.color = '#000';
  demongox.style.backgroundColor = '#fff';
  demongox.innerHTML = 'A.R.B.T enabled';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(demongox);
  //------------------

var TitaniumRate 	= document.getElementById('rate_1').value;//Math.round(document.getElementById('rate_1').value*3600);
var TritiumRate  	= document.getElementById('rate_2').value;
var FoodRate     	= document.getElementById('rate_3').value;
var MaxStorage		= document.getElementById('max_1').value;

//تابع برای شمردن معکوس عددی است که به صورت ثانیه به آن داده میشود
//تیتانیوم
function display_titanium(titanium_start,ResourceID){
window.titanium_start = parseFloat(titanium_start);
var titanium_end = 0 // change this to stop the counter at a higher value
var refresh=1000; // Refresh rate in milli seconds
if(window.titanium_start >= titanium_end ){
titanium_time=setTimeout(function display_ctitanium() {

// Calculate the number of titanium_days left
var titanium_days=Math.floor(window.titanium_start / 86400);
// After deducting the titanium_days calculate the number of titanium_hours left
var titanium_hours = Math.floor((window.titanium_start - (titanium_days * 86400 ))/3600)
// After titanium_days and titanium_hours , how many titanium_minutes are left
var titanium_minutes = Math.floor((window.titanium_start - (titanium_days * 86400 ) - (titanium_hours *3600 ))/60)
// Finally how many seconds left after removing titanium_days, titanium_hours and titanium_minutes.
var titanium_secs = Math.floor((window.titanium_start - (titanium_days * 86400 ) - (titanium_hours *3600 ) - (titanium_minutes*60)))

var x = "(" + titanium_days + ":" + titanium_hours + ":" + titanium_minutes + ":" + titanium_secs +")";


document.getElementById(ResourceID).innerHTML = x;

window.titanium_start= window.titanium_start- 1;

tt=display_titanium(window.titanium_start,ResourceID);
},refresh)
}
else {document.getElementById(ResourceID).innerHTML = "(00:00:00:00)"}
}
//-----------------
//تریتیوم
function display_tritium(tritium_start,ResourceID){
window.tritium_start = parseFloat(tritium_start);
var tritum_end = 0 // change this to stop the counter at a higher value
var refresh=1000; // Refresh rate in milli seconds
if(window.tritium_start >= tritum_end ){
tritum_time=setTimeout(function display_cfood() {

// Calculate the number of tritium_days left
var tritium_days=Math.floor(window.tritium_start / 86400);
// After deducting the tritium_days calculate the number of tritium_hours left
var tritium_hours = Math.floor((window.tritium_start - (tritium_days * 86400 ))/3600)
// After tritium_days and tritium_hours , how many tritium_minutes are left
var tritium_minutes = Math.floor((window.tritium_start - (tritium_days * 86400 ) - (tritium_hours *3600 ))/60)
// Finally how many seconds left after removing tritium_days, tritium_hours and tritium_minutes.
var tritium_secs = Math.floor((window.tritium_start - (tritium_days * 86400 ) - (tritium_hours *3600 ) - (tritium_minutes*60)))

var x2 = "(" + tritium_days + ":" + tritium_hours + ":" + tritium_minutes + ":" + tritium_secs +")";


document.getElementById(ResourceID).innerHTML = x2;

window.tritium_start= window.tritium_start- 1;

tt=display_tritium(window.tritium_start,ResourceID);
},refresh)
}
else {document.getElementById(ResourceID).innerHTML = "(00:00:00:00)"}
}
//------------------
//غذا
function display_food(food_start,ResourceID){
window.food_start = parseFloat(food_start);
var end = 0 // change this to stop the counter at a higher value
var refresh=1000; // Refresh rate in milli seconds
if(window.food_start >= end ){
food_time=setTimeout(function display_cfood() {

// Calculate the number of food_days left
var food_days=Math.floor(window.food_start / 86400);
// After deducting the food_days calculate the number of food_hours left
var food_hours = Math.floor((window.food_start - (food_days * 86400 ))/3600)
// After food_days and food_hours , how many food_minutes are left
var food_minutes = Math.floor((window.food_start - (food_days * 86400 ) - (food_hours *3600 ))/60)
// Finally how many seconds left after removing food_days, food_hours and food_minutes.
var food_secs = Math.floor((window.food_start - (food_days * 86400 ) - (food_hours *3600 ) - (food_minutes*60)))

var x2 = "(" + food_days + ":" + food_hours + ":" + food_minutes + ":" + food_secs +")";


document.getElementById(ResourceID).innerHTML = x2;

window.food_start= window.food_start- 1;

tt=display_food(window.food_start,ResourceID);
},refresh)
}
else {document.getElementById(ResourceID).innerHTML = "(00:00:00:00)"}
}
//------------------


function createSpan(id,ResourceName)
    {
        var spanTag = document.createElement("span");
        spanTag.style.color = '#088A85';
        spanTag.id = id;
		
		ResourceName.appendChild(spanTag);
		
    }

//get current resource 
var test = document.getElementsByClassName('ratioValue');  
var getResource = Array.filter( test, function(elem){  
  return (document.getElementsByClassName('cur'));  
}); 
////Current Titanium 
 var Titanium = getResource[0].innerHTML; 
 Titanium = Titanium.substring(30,38);
 Titanium = Titanium.replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
 //Current Tritium
  var Tritium = getResource[1].innerHTML; 
 Tritium = Tritium.substring(30,38);
 Tritium = Tritium.replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
 //Current Food
  var Food = getResource[2].innerHTML; 
 Food = Food.substring(30,38);
 Food = Food.replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
//// compute rich max Storage time
 Titanium = Math.round((MaxStorage - Titanium)/TitaniumRate);
 Tritium  = Math.round((MaxStorage - Tritium)/TritiumRate);
 Food     = Math.round((MaxStorage - Food)/FoodRate);
////----------------------------	

createSpan('span1',getResource[0]);//تیتانیوم
createSpan('span2',getResource[1]);//تریتیوم
createSpan('span3',getResource[2]);//غذا

display_titanium(Titanium,'span1');
display_tritium(Tritium,'span2');
display_food(Food,'span3');

//var elmDeleted = document.getElementById('myUserName');	elmDeleted.parentNode.removeChild(elmDeleted);




