// ==UserScript==
// @name           sahana.mysore@gmail.com
// @namespace      smysore
// @version        1.0
// @description    Adds a section to the stanford page
// ==/UserScript==

if (window.location.href=='http://healthlibrary.stanford.edu/lectures/'){

  var newSection = document.createElement('div');
  var main = document.getElementById('mainheadline');
  newSection.innerHTML="<h3><a name='fitness' id='fitness'></a>Oncology Rehab and Fitness</h3><em>Presented by Stanford Health Library and Stanford Clinical Trials Office<em><br/><p>This course is designed to enhance the quality of life of patients who are suffering from the debilitating side effects of surgery, chemotherapy or radiation.  Cancer treatments can leave one’s body with less energy, muscle tone and a variety of complications. This course will address the following: </p><ul><li>The unique fitness needs of women</li><li>Eating right for life</li><li>Excercise basics</li><li>Wellness is a 'state of mind'</li></ul><p><strong>Wednesday, March 26<br>7:00 pm</strong><br/>Redwood City Public Library<br/>1044 Middlefield Road <br/>Redwood City<br/><strong>$99 fee.</strong>To register call (650) 498-7826<a href='http://stanfordhospitalsnclinicsdemo1234.force.com/W2L'><img src='../images/miscellaneous/register.jpg' width='85' height='26'/></a></p><hr/>";
  main.appendChild(newSection);
}