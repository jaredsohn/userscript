(function() {

// ==UserScript==
// @name          Muzodajnia+
// @namespace     http://localhost.localdomain
// @description   Ulepsza serwis Muzodajnia
// @copyright     2012+, Tomasz Smykowski, Polishwords
// @license       FREE FOR ALL
// @version       1.0.0
//
// @include   http://www1.plus.pl/*
//
// ==/UserScript==

  
  window.addEventListener("load", function(e) {
    addButton();
    
  }, false);
  
    
    

})();

function addButton(){
 var buttonElems = document.getElementById('navigation-panel-list');
 buttonElems.innerHTML = buttonElems.innerHTML + '<input id="greasemonkeyButton" type="button" value="Odtwórz" style="float: right; margin-right: 5px;" />';
 buttonElems.innerHTML = buttonElems.innerHTML + '<input id="greasemonkeyButton2" type="button" value="Zatrzymaj" style="float: right;" />';
  buttonElems.innerHTML = buttonElems.innerHTML + '<input id="greasemonkeyButton3" type="button" value="Od początku" style="float: right;" />';
 addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
  
  var button = document.getElementById("greasemonkeyButton2");
  button.addEventListener('click',doMonkey2,true);
  
  var button = document.getElementById("greasemonkeyButton3");
  button.addEventListener('click',doMonkey3,true);
}
 
function doMonkey(){
  allowPlay = true;
  runIt();
}

function doMonkey2(){
	stopIt();
}

function doMonkey3(){
	currentButton = -1;
}

var time = 1000 * 30 ;
var allowPlay = true;
var buttons = null;
var currentButton = -1;

function runIt()
{
    if (!allowPlay) { return; }
    buttons  = document.getElementsByClassName("listen");
    currentButton++;
    toogleButton();
    setTimeout(runIt, time );
}

function toogleButton()
{
    var obiekt = buttons[currentButton];
    obiekt.click();
}

function stopIt()
{
    allowPlay = false;
    toogleButton();
}
