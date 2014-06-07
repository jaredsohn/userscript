// ==UserScript==
// @name           I can click as fast as my browser can.
// @namespace      http://ce.sharif.edu/~fjalili/
// @include        http://apps.facebook.com/swcetceqoossabnql/*
// ==/UserScript==

var button = document.getElementById("app160673943966310_btn");
var timerDiv = button.previousElementSibling;
var timerSource = timerDiv.innerHTML;
timerDiv.innerHTML = '<input type="text" class="inputtext textInput uiSearchInput" value="Enter desired number here..." style="width: 170px;" id="desired-record" onclick="this.value=\'\'">';
timerDiv.innerHTML += '<input type="button" class="uiButton" style="height: 24px; width: 100px;" value="click" onclick=" record = document.getElementById(\'desired_record\').value; for(i = 0; i &lt;= record; i++ ) { document.getElementById(\'app160673943966310_btn\').onmouseup({type:\'click\'});}">'; 
timerDiv.innerHTML += timerSource;