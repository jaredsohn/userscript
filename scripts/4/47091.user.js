// ==UserScript==
// @name           Arrival Time Calculator
// @description    Displays troop arrival times for inter-island warfare, and arrival times for transport missions.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
//
// Version 1.1.3 (24/04/2009) 
// Created by God of Death
//=========================================================================


var view = document.URL;
var plunder = view.indexOf('?view=plunder');
var transport = view.indexOf('?view=transport');
var port = [15, 30, 60, 93, 129, 169, 213, 261, 315, 373, 437, 508, 586, 672, 766, 869, 983, 1108, 1246, 1398, 1565, 1748, 1950, 2172, 2416, 2685, 2980];
var totalhours;
var totalminutes;
var totalseconds;

 
function main(){

  if (plunder!=-1||transport!=-1){

  var textappend = document.getElementById("missionSummary");
  
  p = document.createElement("p");
  
  var portDiv = <>
  								Port Level: <input type="text" style="text-align: right;" size="8"  id="portLevelId" value="0"/>  
  							</>;
  p.innerHTML = portDiv;
  p.addEventListener("change",showWeight,false);
  
  textappend.appendChild(p);
  
  p = document.createElement("p");
  p.setAttribute("id","loadingtimecalc");
  p.innerHTML = " ";
  
  textappend.appendChild(p);
  
  p = document.createElement("p");
  p.setAttribute("id","totaltimecalc");
  p.innerHTML = " ";
  
  textappend.appendChild(p);
  
  p = document.createElement("p");
  p.setAttribute("id","impacttime");
  p.innerHTML = " ";
  
  textappend.appendChild(p);
  }
}


function validate(){

var portlevel = document.getElementById('portLevelId').value;

  if(isNaN(portlevel)){
  alert('Error: Please enter numbers only');
  return false;
  }

  if(portlevel >= port.length || portlevel <= 0){
  alert('Error: Please enter a port level from 1-26')
  return false;
  }
  
return true;
}


function showWeight(){

  if(validate()){

  if(transport!=-1){
  
    var wood = parseInt(document.getElementById('value_wood').textContent.replace(',',""));
    var wine = parseInt(document.getElementById('value_wine').textContent.replace(',',""));
    var sulphur = parseInt(document.getElementById('value_sulfur').textContent.replace(',',""));
    var crystal = parseInt(document.getElementById('value_crystal').textContent.replace(',',""));
    var marble = parseInt(document.getElementById('value_marble').textContent.replace(',',""));
    
    if (wood>0){ wood = parseInt(document.getElementById('textfield_wood').value); }
    if (wine>0){ wine = parseInt(document.getElementById('textfield_wine').value); }
    if (sulphur>0){ sulphur = parseInt(document.getElementById('textfield_sulfur').value); }
    if (crystal>0){ crystal = parseInt(document.getElementById('textfield_glass').value); }
    if (marble>0){ marble = parseInt(document.getElementById('textfield_marble').value); }

    var weight = wood+wine+sulphur+crystal+marble;
    var time = document.getElementsByClassName('journeyTime');

    time = time[0].textContent.substr(20);
  }

if(plunder!=-1){
    var weight = parseInt(document.getElementById('totalWeight').textContent);
    var time = document.getElementById('journeyTime').textContent;
  }
  
  if (weight > 0){
      
    loading = weight/port[parseInt(document.getElementById('portLevelId').value)];
        
    loadingminutes = parseInt(Math.floor(loading)); 
    loadingseconds = parseInt(Math.floor((loading - loadingminutes) * 60));
    loadinghours = parseInt(Math.floor(loadingminutes / 60));
    
      while (loadingminutes > 59){
      loadingminutes = loadingminutes - 60;
      }
        
    loadingtime = loadinghours+"h"+loadingminutes+"m"+loadingseconds+"s";
    
    time = time.replace(" ", "");
    
    hourindex = time.indexOf('h');
    minuteindex = time.indexOf('m');
    secondindex = time.indexOf('s');
    
    if (hourindex!=-1){
    travelhours = parseInt(time.substr(0,hourindex));
    }
    else{ travelhours = 0; }
    
    if (minuteindex!=-1&&hourindex!=-1){
    travelminutes = parseInt(time.substr(hourindex+1,minuteindex-hourindex+1));
    }
    else if (minuteindex!=-1){ 
    travelminutes = parseInt(time.substr(0,minuteindex)); 
    }
    else{ travelminutes = 0; }
    
    if (secondindex!=-1&&minuteindex!=-1){
    travelseconds = parseInt(time.substr(minuteindex+1,secondindex-minuteindex+1));
    }
    else if (secondindex!=-1&&hourindex!=-1){
    travelseconds = parseInt(time.substr(hourindex+1,secondindex-hourindex+1));
    }
    else{ travelseconds = 0; }
    
    totalhours = loadinghours+travelhours;
    totalminutes = loadingminutes+travelminutes;
    totalseconds = loadingseconds+travelseconds;
     
    while (totalseconds > 59){
    totalseconds = totalseconds - 60;
    totalminutes += 1;
    }
     
    while (totalminutes > 59){
    totalminutes = totalminutes - 60;
    totalhours += 1;
    }
    
    totaltime = totalhours +"h"+ totalminutes +"m" + totalseconds + "s";
    
    document.getElementById('loadingtimecalc').innerHTML = "Loading time: "+loadingtime;
    
    document.getElementById('totaltimecalc').innerHTML = "Total travel time: "+totaltime;
    
    impacttime = document.getElementById('impacttime');
    
    setInterval(updateServerTime,500);
    }
    else{
    alert('Error: You have no troops/resources selected or are attacking over land (same island)');
    }
  }
}


function updateServerTime() {
        
    var time = document.getElementById('servertime').textContent;
    
    time = time.substr(time.length-8);    
        
    var hours = parseInt(time.substr(0,time.length-time.indexOf(':')));
    var minutes = parseInt(time.substr(time.indexOf(':')+1, 2));
    var seconds = parseInt(time.substr(time.indexOf(':')+4,2));
    
    hours += totalhours;
    minutes += totalminutes;
    seconds += totalseconds;
    
    while (seconds > 59){
    seconds = seconds - 60;
    minutes +=1;
    }
    
    while (minutes > 59){
    minutes = minutes - 60;
    hours += 1;
    }
    
    while (hours > 24){
    hours = hours - 24;
    }
    
    if (hours <= 9){hours = "0"+hours;}
    if (minutes <= 9){minutes = "0"+minutes;}
    if (seconds <= 9){seconds = "0"+seconds;}
    
    impacttime.innerHTML = "Impact time: "+hours+":"+minutes+":"+seconds;

}


main();