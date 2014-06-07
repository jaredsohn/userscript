// ==UserScript==
// @author Jakh Daven tuxcanfly@gmail.com
// @name feedback
// @description Random Feedback for PS2
// @include http://www.bits-pilani.ac.in:12365/ps2feedbackabhishek/Feedback.aspx
// @match http://www.google.com/*
// @exclude *
// ==/UserScript==

// try and try but dont cry
try {
  document.getElementById('RadioButton'+Math.floor(5 - Math.random()*5)).checked = true; 
  document.getElementById('Button1').click();
}
catch (err){
}