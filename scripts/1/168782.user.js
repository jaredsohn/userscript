// ==UserScript==
// @name        Runtastic_fixed_calory_count
// @namespace   Runtastic_fixed_calory_count
// @description Fixed calory count for running app in runtastic.
// @include     /^http://www\.runtastic\.com/en/users/[0-9a-z\-]+/sport-sessions/\d+$/
// @grant       none
// @version     1
// ==/UserScript==

// if we are displaying a run session report, update the calory count
if($('#run_session').length){  
  // check for this lines
  //  <span class='value calories'>286 <span>kcal</span></span>
  //  <span class='value duration'>00:23:11</span>
  //  <span class='value heart_rate'>174 <span>bpm</span></span>
  // and change the code for the proper one

  // enter here your birth date, weight and gender (0: Male, 1:Female)
  var birthdate = "January 01, 1980"
  var weight = 77.3
  var gender = 0
  
  // get all the elements related to class "value calories"
  var elements_cal=document.getElementsByClassName("value calories");

  // get all elements related to class "value duration" 
  var elements_dur=document.getElementsByClassName("value duration");

  // get all elements related to class "value duration"
  var elements_HR=document.getElementsByClassName("value heart_rate");

  // get the first and single element of this classes
  var duration_raw = elements_dur[0].innerHTML.split(':');
  // transform the string hh:mm:ss in just minutes
  var duration_count = (+duration_raw[0]) * 60 + (+duration_raw[1]) + (+duration_raw[2])/60;

  // get the bpm value
  var value_heart = elements_HR[0].innerHTML.match(/^\d+/);

  // get the date of the training
  var elements_date=document.getElementsByClassName("date");
  var value_date = new Date(elements_date[0].innerHTML.match(/[a-zA-Z]+ \d+, \d{4}/));

  // get birth date, and compute the age at the moment of the workout
  var birth = new Date(birthdate);
  var age = Math.round((value_date.getTime() - birth.getTime())/(1000*3600*24*365));

  // if duration is bigger than 3 minutes, update the calories count
  if (duration_count>3)
  {
    // compute the calories from the hear rate and the time
    if (gender == 0)      // male situation
      var calories = -55.0969 + (0.6309*value_heart) + (0.1988*weight) + (0.2017*age);
    else                       // female situation
      var calories = -20.4022 + (0.4472*value_heart) - (0.1263*weight) + (0.074*age);
    
    calories *= duration_count / 4.184;

    // update the webpage
    elements_cal[0].innerHTML = Math.round(calories);
  }
}
