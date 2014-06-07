// ==UserScript==
// @name       e-sim storage tes
// @namespace  dimonalek
// @version    1.3
// @description  Пышь пышЪ
// @include        http://suna.e-sim.org/militaryUnitStorage.html*
// @copyright  dimonalek
// ==/UserScript==


//---Начинаем удаление ненужных полей---
var ptt = document.getElementById('product');
var trash = ptt.nextSibling.nextSibling;
trash.parentNode.removeChild(trash);
trash = ptt.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
trash.parentNode.removeChild(trash);
trash = ptt.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
trash.parentNode.removeChild(trash);
trash = ptt.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
trash.parentNode.removeChild(trash);
//---Удалили---

var english = new Array('1-WEAPON', '2-WEAPON', '3-WEAPON', '4-WEAPON', '5-WEAPON', '1-FOOD', '2-FOOD', '3-FOOD', '4-FOOD', '5-FOOD', '1-GIFT', '2-GIFT', '3-GIFT', '4-GIFT', '5-GIFT', '1-TICKET', '2-TICKET', '3-TICKET', '4-TICKET', '5-TICKET', '1-HOUSE', '2-HOUSE', '3-HOUSE', '4-HOUSE', '5-HOUSE', '1-ESTATE', '2-ESTATE', '3-ESTATE', '4-ESTATE', '5-ESTATE', 'IRON', 'GRAIN', 'OIL', 'WOOD', 'STONE', 'DIAMOND');
var russian = new Array('Q1 Оружие', 'Q2 Оружие', 'Q3 Оружие', 'Q4 Оружие', 'Q5 Оружие', 'Q1 Еда', 'Q2 Еда', 'Q3 Еда', 'Q4 Еда', 'Q5 Еда', 'Q1 Подарок', 'Q2 Подарок', 'Q3 Подарок', 'Q4 Подарок', 'Q5 Подарок', 'Q1 Билет', 'Q2 Билет', 'Q3 Билет', 'Q4 Билет', 'Q5 Билет', 'Q1 Дом', 'Q2 Дом', 'Q3 Дом', 'Q4 Дом', 'Q5 Дом', 'Q1 Эстэйт', 'Q2 Эстэйт', 'Q3 Эстэйт', 'Q4 Эстэйт', 'Q5 Эстэйт', 'Железо', 'Зерно', 'Нефть', 'Дерево', 'Камень', 'Алмаз');

//Вставка кнопки "Добавить поля"
var submit = document.getElementById('donateProductForm').getElementsByTagName('input');
submit[submit.length-1].type = 'button';

addEvent(submit[submit.length-1], 'click', send);

var place = document.getElementById('tickAll');
var parent = place.parentNode;
var button = document.createElement('input');

button.type = 'button';
button.value = 'Добавить поля';

parent.insertBefore(button, place);

addEvent(button, 'click', addVals);



//Шаблон, добавление кнопки
tempButton = document.createElement('input');

tempButton.type = 'button';
tempButton.value = 'Сделать заебись!';

parent.insertBefore(tempButton, place);

addEvent(tempButton, 'click', tempSend);




function addEvent(elem, type, handler){
  if (elem.addEventListener){
    elem.addEventListener(type, handler, false)
  } else {
    elem.attachEvent('on' + type, handler)
  }
}

function addVals () {
	var list = document.getElementById('product');
	var options = list.getElementsByTagName('option');
	var count = document.getElementById('quantity');
	var selectAdd = document.createElement('select');
	selectAdd.name = 'product';
	selectAdd.className = 'required';
	list.parentNode.insertBefore(selectAdd, list);
	var lastSelect = document.getElementsByClassName('required');
	for (var i = 0; i < options.length; i++) {
		lastSelect[lastSelect.length-2].innerHTML += '<option value="' + options[i].value + '">' + options[i].innerHTML + '</option>';
	}
	var countAdd = document.createElement('input');
	countAdd.type = 'text';
	countAdd.name = 'quantity';
	countAdd.style.width = '40px';
	countAdd.className = 'digit';
	countAdd.value = 1;
	list.parentNode.insertBefore(countAdd, list);
	var brAdd = document.createElement('br');
	list.parentNode.insertBefore(brAdd, list);
}

function translate (arr) {
	if (arr instanceof Array) {
		var newArr = new Array(arr.length);
		for (var o = 0; o < arr.length; o++) {
			for (var i = 0; i < english.length; i++) {
				if (arr[o] == english[i])
					newArr.push(russian[i]);
			}
		}
		return newArr;
	} else {
		for (var i = 0; i < english.length; i++) {
			if (arr == english[i])
				return russian[i];
		}
	}
}

function tempSend () {
	var temp = new Array('1-WEAPON', '5-FOOD', '5-GIFT', '2-TICKET');
	var tempCount = new Array(150, 15, 15, 2);
	var logs = '';
	if (document.domain = 'suna.e-sim.org') {
			var dom = 'http://suna.e-sim.org/militaryUnitStorage.html'
			} else {
			var dom = 'http://secura.e-sim.org/militaryUnitStorage.html'
			};
			
	for (var v = 0; v < temp.length; v++) {
		logs += tempCount[v] + ' - ' + translate(temp[v]) + ', ';		
	}
	if (confirm('Ты хочешь отправить ' + logs + ' ?')) {
		var obj = '';
		for (var i = 0; i < temp.length; i++) {
			var myData = new FormData();
				myData.append("product", temp[i]);
				myData.append("quantity", tempCount[i]);
				myData.append("reason", 1);
				
			var clist = document.getElementsByClassName('receipments');
			var ccount = 0;
				for (var o = 0; o < clist.length; o++) {
					if (clist[o].checked) {
						ccount++;
						myData.append(clist[o].name, clist[o].value);
					}
				}
			
				
			GM_xmlhttpRequest({
			  method: "POST",
			  data: myData,
			  url: dom,
			  onload: function(res) {
				GM_log(res.responseText);
			  }
			});
			obj += ', ' + translate(temp[i]) + ' - ' + tempCount[i]*ccount;
		}
		alert('Успешно выдано ' + obj);
	}
}

	function send () {
	 var list = document.getElementsByClassName('required');
	 var obj = '';
	 if (document.domain = 'suna.e-sim.org') {
			var dom = 'http://suna.e-sim.org/militaryUnitStorage.html'
			} else {
			var dom = 'http://secura.e-sim.org/militaryUnitStorage.html'
			};	 
	 for (var i = 0; i < list.length; i++) {
	  var ObjSel = list[i].options[list[i].selectedIndex].value;
	  var Quantity = document.getElementsByClassName('digit')[i].value;
	  var myData = new FormData();
	   myData.append("product", ObjSel);
	   myData.append("quantity", Quantity);
	   myData.append("reason", 1);
	   
	  var clist = document.getElementsByClassName('receipments');
	  var ccount = 0;
	   for (var o = 0; o < clist.length; o++) {
		if (clist[o].checked) {
		 ccount++;
		 myData.append(clist[o].name, clist[o].value);
		}
	   }
	   
	  GM_xmlhttpRequest({
		method: "POST",
		data: myData,
		url: dom,
		onload: function(res) {
	   GM_log(res.responseText);
		}
	  });
	  obj += ', ' + ObjSel + ' - ' + Quantity*ccount;
	 }
	 alert('Успешно выдано ' + obj);
}