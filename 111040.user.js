// ==UserScript==
// @name           remaining
// @namespace      icaaq.com
// @include        https://redmine.creuna.se/*


// ==/UserScript==
(function(){
  
  var hours = document.getElementsByClassName('remaining_hours');
  var hoursLeft = document.getElementsByClassName('cf_4');
  var tbody = document.getElementsByClassName('list issues')[0].getElementsByTagName("tbody");
  var total = 0;
  var totalLeft = 0;
  for (var i=0; i < hours.length; i++) {
	if(hours[i].innerHTML !== ""){
  	  total = total + parseInt(hours[i].innerHTML);
    }
  };
  for (var i=0; i < hoursLeft.length; i++) {
	if(hoursLeft[i].innerHTML !== ""){
  	  totalLeft = totalLeft + parseInt(hoursLeft[i].innerHTML);
    }
  };
  var tr = document.createElement("TR");
  var tdCol = document.createElement("TD");
  var tdTotal = document.createElement("TD");
  var tdTotalLeft = document.createElement("TD");
  var colSpan = tbody[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length -1;
  if(hoursLeft.length > 0){
    colSpan = colSpan - 1;
    tdTotalLeft.innerHTML = hoursLeft;
  }
  tdTotal.innerHTML = total;
  tdTotalLeft.innerHTML = totalLeft;
  tdCol.colSpan = colSpan;
  tdTotalLeft.style.textAlign = "center";
  tdTotalLeft.style.fontWeight = "bold";
  tdTotal.style.textAlign = "center";
  tdTotal.style.fontWeight = "bold";
  tr.appendChild(tdCol);
  tr.appendChild(tdTotal);
  if(hoursLeft.length > 0){
    tr.appendChild(tdTotalLeft);
  }
  tbody[0].appendChild(tr);
}());