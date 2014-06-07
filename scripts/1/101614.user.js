// ==UserScript==
// @name           SmugMug Keyword Multi-Select
// @namespace      photosByNimai.com
// @include        http://*/photos/tools.mg?*tool=bulkcaption*
// ==/UserScript==
window.multiselect = false;
window.lastSelected = 1;

document.onkeydown = function ( event ) {
  event = event || window.event;
//console.log(event.keyCode);
  if (event.keyCode == 16 || event.keyCode == 17) {
    window.multiselect = true;
  }
}

document.onkeyup = function ( event ) {
  event = event || window.event;
//console.log(event.keyCode);
  if (event.keyCode == 16 || event.keyCode == 17) {
    window.multiselect = false;
  }
}

var script = document.createElement('script');    // create the script element
script.innerHTML =
'  function select(count) {'+
'     count = parseInt(count);'+
'     var start = window.multiselect ? window.lastSelected : count;'+
'     window.lastSelected = count;'+
'     var end = count+1;'+
'     for (count = start; count<end; ++count) {;'+
'       if(selectedArray[count] == false) {'+
'        document.getElementById("image"+count).className = "thumbselected";'+
'        selectedArray[count] = true;'+
'        totalSelected++;'+
'        document.getElementById("position").innerHTML = totalSelected;'+
'      }'+
'      else {'+
'        document.getElementById("image"+count).className = "thumbs";'+
'        selectedArray[count] = false;'+
'        totalSelected--;'+
'        document.getElementById("position").innerHTML = totalSelected;'+
'      }'+
'    }'+
'  }';

document.getElementsByTagName('head')[0].appendChild(script); 
