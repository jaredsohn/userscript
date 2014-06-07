// ==UserScript==
// @name          Bankmanagergame - Bankenhandel
// @namespace     
// @description	  Erweitert die Berater und Beratungs Auswahlmöglichkeiten.
// @author        Stevo
// @include       http://bankmanagergame.de/index.php?section=bankenhandel*
// @include       http://www.bankmanagergame.de/index.php?section=bankenhandel*
// ==/UserScript==

document.getElementsByName('rate')[1].selectedIndex = 1;
document.getElementsByName('duration')[1].selectedIndex = 3;

var linkdiv = document.createElement('div');



link0 = document.createElement('div');

link0.style.cursor = 'pointer';
link0.innerHTML = '10.000';
link0.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '10000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link0);


link1 = document.createElement('div');

link1.style.cursor = 'pointer';
link1.innerHTML = '50.000';
link1.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '50000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link1);


link2 = document.createElement('div');

link2.style.cursor = 'pointer';
link2.innerHTML = '100.000';
link2.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '100000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link2);


link3 = document.createElement('div');

link3.style.cursor = 'pointer';
link3.innerHTML = '500.000';
link3.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '500000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link3);


link4 = document.createElement('div');

link4.style.cursor = 'pointer';
link4.innerHTML = '1 Mio';
link4.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '1000000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link4);


link5 = document.createElement('div');

link5.style.cursor = 'pointer';
link5.innerHTML = '1 Mio';
link5.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '1000000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link5);


link6 = document.createElement('div');

link6.style.cursor = 'pointer';
link6.innerHTML = '5 Mio';
link6.addEventListener("click", function(){ 
  document.getElementsByName('amount')[1].value = '5000000';
  document.forms[3].submit();
}, false);
 
linkdiv.appendChild(link6);


linkdiv.style.position = 'absolute';
linkdiv.style.top = '100px';
linkdiv.style.right= '80px';
linkdiv.style.width= '200px';


document.body.appendChild(linkdiv);
