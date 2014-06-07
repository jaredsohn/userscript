// ==UserScript==
// @name           AXCRM Rerate Robot
// @namespace      http://axcrm.airnex.com/*
// @description    Automate sum (exclude 1 and 2 minute calls) and make rerate for choosen destination from payment table. Instruction: First fill rate and after choose any row with rerated destination. With love from NextFocus RCC office :)
// @include        http://axcrm.airnex.com/airnex/cis.do?param=getCdr
// @include        http://axcrm.airnex.com:8080/airnex/cis.do?param=getCdr
// @include        http://axcrm.airnex.com/cis.do?param=getCdr
// @include        http://axcrm.airnex.com:8080/cis.do?param=getCdr
// ==/UserScript==

function processSum() {
var table1 = document.getElementsByClassName("body9");
  var ni = document.body;
  var newdiv = document.createElement('div');
  var divIdName = 'AmountConteiner';
  newdiv.setAttribute('id',divIdName);
  newdiv.innerHTML = '<table style="border:solid 1px;"><tr><td> Rerate <input type="text" size="2"  id="RerateValue" value="1.0"/></td><td><div id="DivDirection" style="float: none;">1</div></td><td>: </td><td><div id="AmountText" style="float: none;">none</div></td></tr>';
  ni.appendChild(newdiv);
  newdiv.style.zIndex = "99";
  newdiv.style.position= "fixed";
  newdiv.style.left = "10";
  newdiv.style.bottom = "10";
  newdiv.style.backgroundColor = "#ffffff";
  newdiv.style.border = "solid 2px";
  newdiv.style.cssFloat = "none";
  Sum = document.getElementById("AmountText");
  Direction = document.getElementById("DivDirection");
  RerateValue = document.getElementById("RerateValue");

	for(i = 1;i < table1[0].rows.length; i++){
		if (table1[0].rows[i].cells.length > 5) {
			table1[0].rows[i].addEventListener('mouseover', function(){
						cl1 = this.cells[4].style.backgroundColor;
						cl2 = this.cells[5].style.backgroundColor;
						this.style.backgroundColor = "#0000ff";	
						this.cells[4].style.backgroundColor = cl1;
						this.cells[5].style.backgroundColor = cl2;

						findStr = this.cells[4].innerHTML;
						this.cells[5].style.fontStyle = "bold 14px";		
					}, false);
			table1[0].rows[i].addEventListener('mouseout', function(){
						cl1 = this.cells[4].style.backgroundColor;
						cl2 = this.cells[5].style.backgroundColor;
						this.style.backgroundColor = "#ffffff";	
						this.cells[4].style.backgroundColor = cl1;
						this.cells[5].style.backgroundColor = cl2;
					}, false);

			table1[0].rows[i].addEventListener('click', function(){
						findStr = this.cells[4].innerHTML;
						amount = 0;
						for(j = 1;j < table1[0].rows.length; j++){
						   if (table1[0].rows[j].cells.length > 5)
							if (findStr == table1[0].rows[j].cells[4].innerHTML) {
								table1[0].rows[j].cells[4].style.backgroundColor = "#ffff00";
								table1[0].rows[j].cells[5].style.backgroundColor = "#0000ff";
								table1[0].rows[j].cells[5].style.color = "#ffffff";
								atom = parseFloat(table1[0].rows[j].cells[5].innerHTML);
								//table1[0].rows[j].cells[6].innerHTML = atom;
								if (atom > 2) {amount += atom;}
							} else {	
								table1[0].rows[j].cells[4].style.backgroundColor = "#ffffff";
								table1[0].rows[j].cells[5].style.backgroundColor = "#ffffff";
								table1[0].rows[j].cells[5].style.color = "#000000";
							}
						}
						  Sum.innerHTML = amount + ' min = ' + parseFloat(RerateValue.value)*amount  +'$';
						  Direction.innerHTML = findStr ;
					}, false);
		}
	}
}
processSum();

