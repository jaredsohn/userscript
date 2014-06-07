// ==UserScript==
// @name          Show/Hide Hidden Text
// @namespace     http://lifein19x19.com
// @description   Shows and hides all text hidden in hide tags.
// @include       http://lifein19x19.com/*
// @include       http://www.lifein19x19.com/*
// ==/UserScript==



function addLink() {
  var allSpots;
  allSpots = document.evaluate(
    "id('pagecontent')/table[2]/tbody/tr/td/table/tbody/tr/td[2]/a[1]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  
    
    
  for (var i = 0; i < allSpots.snapshotLength; i++) {
    var format = document.createElement('a');
    format.setAttribute ('href', 'javascript:void(0);');
    format.addEventListener ('click', showhide, false);
    var text = document.createTextNode('Show/hide hidden text');
    format.appendChild(text);
    allSpots.snapshotItem(i).parentNode.insertBefore (format, allSpots.snapshotItem(i));
    var bar = document.createTextNode(' | ');
    allSpots.snapshotItem(i).parentNode.insertBefore (bar, allSpots.snapshotItem(i));
   
  }
  
  return void (0);
}

// Show/hide text within hide tags.
function showhide()
{
  var hidebuttons = document.getElementsByClassName('button2 btnlite');
  if (hidebuttons[0].parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display != '') {
    for (i=0; i < hidebuttons.length; i++){
      hidebuttons[i].parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = '';
      hidebuttons[i].innerText = '';
      hidebuttons[i].value = 'Hide';
    }
  }
  else {
    for (i=0; i < hidebuttons.length; i++){
      hidebuttons[i].parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = 'none';
      hidebuttons[i].innerText = '';
      hidebuttons[i].value = 'Show';
    }
  }
  return void (0);
}

window.addEventListener('load',addLink,true);