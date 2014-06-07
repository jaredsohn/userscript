// ==UserScript==
// @name        escalate
// @namespace   escalate
// @include     https://research.relsci.com/LinkingAndStandardization/Linking/*
// @version     1
// ==/UserScript==

createElmt();


function createElmt(){
var escalateBtn = document.getElementById("escalate");

escalateBtn.addEventListener("click", function(){
    var radioBtn = document.getElementById("escalationLevel");
    var textArea = document.getElementById("_escalationText");
       textArea.value = "Non Influential";
       document.getElementById("_escalateSubmitBtn").disabled=false;
    });

}
  
  
