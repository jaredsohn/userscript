// ==UserScript==
// @name           autowedgie
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/return-lost.php*
// ==/UserScript==
//
//ok, there is some issues with this... it is vitally important to enter a value not in excess of the number
//  of the item chosen in inventory, because any excess sends will be any other returnable item in inventory.
//obviously, one doesn't want to send Plaudits to someone to whom one is trying to give wedgies. so be careful.
var datum = document.getElementsByTagName('form');
var hormel = datum[0];
var advTable = document.createElement("table");
var advRow = document.createElement("tr");
var advCell = document.createElement("td");
var num = GM_getValue('castsLeft',0)-GM_getValue('buffs',0);
GM_setValue("running", GM_getValue('castsLeft',0)>0);
var spam = '<input type="button" id="spammer" value="Go">';
var dun = '<input type="button" id="stop" value="Stop">';
advCell.innerHTML= 		'Spam Computer : # of casts ' +
								'<input type="text" maxlength="3" id="casts" value="'+
								GM_getValue('castsLeft',5)+ 
								'">'+
								spam+
								dun;
if(GM_getValue("running", false)) advCell.innerHTML+= '<br>Casts remaining:' + num + '<br>';
advRow.insertBefore(advCell,null);
advTable.insertBefore(advRow,null);
hormel.parentNode.insertBefore(advTable, hormel);
if (GM_getValue("running", false)&&num>0){
	var temp = GM_getValue("buffs", 0);
	GM_setValue("buffs", temp+1);
	hormel.submit();}
document.getElementById("stop").addEventListener(
						"click", 
						function(){
							GM_setValue('castsLeft',0);
							GM_setValue("buffs", 666);
							GM_setValue("running", false);},
						true);
document.getElementById("spammer").addEventListener(
						"click", 
						function(){
							GM_setValue('castsLeft',document.getElementById("casts").value);
							GM_setValue("buffs", 1);
							GM_setValue("running", true);
							hormel.submit();},
						true);
