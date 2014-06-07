// ==UserScript==
// @name           Growth Calculator
// @namespace      WTFack
// @description    Estimates time until city maximum space achieved
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==

if(document.getElementById('CityOverview')!=null) { 


var population_now = document.getElementById('CityOverview').getElementsByTagName('span')[1].innerHTML;
var max_population = document.getElementById('CityOverview').getElementsByTagName('span')[2].innerHTML;
var difference = max_population - population_now;
var happiness_global = document.getElementById('SatisfactionOverview').getElementsByTagName('div');

for (i=0; i<happiness_global.length; i++) { 
 
 if (happiness_global[i].className=='happiness happiness_happy' || happiness_global[i].className=='happiness happiness_neutral' || happiness_global[i].className=='happiness happiness_sad' || happiness_global[i].className=='happiness happiness_outraged' || happiness_global[i].className=='happiness happiness_ecstatic') { 

 var happy = happiness_global[i].getElementsByTagName('div')[0].innerHTML; 
 } 
 } 
 
var no_max = 0;
 var happy_max = parseInt(happy) + parseInt(population_now);
 if(max_population>=happy_max && population_now>=happy_max) { var logarithm = 1/(population_now-happy_max); var text = parseInt(parseInt(happy_max))+ ' hab en'; var no_max = 1;}
 else if(max_population>=happy_max && population_now<=happy_max) {  var logarithm = 1/(happy_max-population_now); var text = parseInt(parseInt(happy_max))+ ' hab en'; var no_max = 1;} 
 else {
 var logarithm = (happy_max-max_population)/(happy_max-population_now); var text = 'Lleno en';}
 
 if(logarithm>0) {
	 
	 if(no_max==1) { var time = 50;} else {
 var time = -50* Math.log(logarithm); }
 var hours = Math.floor(time);
 var time_mins = 60*(time-hours);
 var mins = Math.floor(time_mins);
 var seconds = Math.floor(60*(time_mins-mins));
 if(time==0) { total_time = "Límite alcanzado"; } else {
 var total_time = hours+"h "+mins+"m "+seconds+"s"; }
 
 var change = document.getElementById('CityOverview').getElementsByTagName('ul');

for (i=0; i<change.length; i++) { 
 
 if (change[i].className=='stats') { 

 var change_inner = change[i].innerHTML;

 change_inner = change_inner.replace(/<li class="actions">/, '<li style="position:absolute; left:100px; top:75px; vertical-align:middle; background-image:url(skin/resources/icon_time.gif)"><span class="textLabel" style="vertical-align:top;">'+ text +': </span><span class="value" style="vertical-align:top;">'+ total_time +'</span></li><li class="actions">');

 change[i].innerHTML = change_inner;
 
 } 
 } 
 
 
 }
}