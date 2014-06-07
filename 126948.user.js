(function() {

// ==UserScript==
// @name          Hello, World
// @namespace     http://localhost.localdomain
// @description   JavaScript alert box saying Hello, world
// @copyright     2007+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.1
//
// @include   http://www1.plus.pl/*
// @include   http://www.example.com/*
// @include   http://www.example.net/*
// @include   http://www.example.org/*
//
// @exclude   https://example.com/*
// @exclude   https://example.net/*
// @exclude   https://example.org/*
//
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
 addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
  
  var button = document.getElementById("greasemonkeyButton2");
  button.addEventListener('click',doMonkey2,true);
}
 
function doMonkey(){
  allowPlay = true;
	runIt();
}

var allowPlay = true;
var lastPlay = "";

function doMonkey2(){
	allowPlay = false;
	document.getElementById(lastPlay).click();
}

function runTheButton(id)
{
    if (!allowPlay) { return; }
    document.getElementById(id).click();
}

    function runIt()
    {
        var a = document.getElementsByClassName("listen");
        var time = 1000 * 5 ;
        var czas = 0;
        for (i = 0; i< a.length; i++)
        {
          czas = i * time;
          var obiekt = a[i];
          var polecenie = "runTheButton(\"" + obiekt.id + "\");";
          lastPlay = obiekt.id;
          setTimeout(polecenie, czas);
        }
        czas = czas + time ;
        setTimeout("runIt();", czas);
    }