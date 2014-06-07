// ==UserScript==
// @name        T4.2 Village List
// @namespace   t42
// @description Travian T4.2 Village List
// @include     http://*.travian.*
// @version     1
// ==/UserScript==

(function() {


dest = document.getElementById('enterVillageName');

if(dest) {
  par = dest.parentNode.parentNode.parentNode;
  

  row = par.insertRow(-1);

  cell1 = row.insertCell(0);
  cell1.innerHTML = '&nbsp';
  cell2 = row.insertCell(1);

  v_list = document.getElementById('sidebarBoxVillagelist');

  v_names = v_list.getElementsByClassName('name');
  v_coords = v_list.getElementsByClassName('coordinatesWrapper');

  // build select list 

  v_select = '<select class="village" style="width : 100%">';
  for(i=0;i<v_names.length;i++){
	cc = v_coords[i].textContent.match(/\((-?\d{1,3})\|(-?\d{1,3})\)/);
	v_select+= "<option onClick='document.snd.x.value="+cc[1]+";document.snd.y.value="+cc[2]+";'> " + v_names[i].textContent +" "+ cc[0] + "</option>";
  }
  
  v_select+= '</select>';
  cell2.className = 'compactInput';
  
  cell2.innerHTML = v_select;

}

})();