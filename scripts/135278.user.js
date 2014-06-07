// ==UserScript==
// @name           Virtonomica: Средняя цена и качество по закупкам
// @namespace      virtonomica
// @description    Помощник по закупкам , русский реалм
// @include	   http://*virtonomic*.*/*/main/unit/view/*/supply
// @version        1.3
// ==/UserScript==

var run = function() 
{

	var midprice = [0,0,0,0,0];
	var midquant = [0,0,0,0,0];
	var tqual=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var NameIdElement;
	var tableElem;
	var howcontr;
	var allqual = [0,0,0,0,0,0,0,0,0,0,0,0];
	var allvalue = [0,0,0,0,0,0,0,0,0,0,0,0];
	var allquant = [0,0,0,0,0,0,0,0,0,0,0,0];
	var cells;
	var tcolor = "magenta";
	var IDprod =[0,0,0,0,0];
	var newprod = 1;
	var numprod = [0,0,0,0,0,0]
	var iprice = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
	var iquant = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
	var ifree = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
	var npos
	var npoz
	var nameprod = ["meat","steel"];

    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;

	var pattern=new RegExp("(склад)|(медицинский)|(магазин)|(ресторан)","i"); //ищем склад мед. центр и магазин
	if(pattern.test($('div.officePlace').text() ))return;   // если склад мед. центр или магазин, то выход 
	// отбор по русским названиям поэтому только для русского реалма хотя можно добавить и  др. языки	
	
	cells = document.getElementsByTagName('input')
	howcontr = (cells.length - 7)/5;// сколько поставщиков
	
	cells = mainContent.getElementsByClassName('list')   // считываем ВСЮ таблицу снабжения
	 
		name = $( cells[0] ).text()
		name = name.toLowerCase()


	for (var i=0; i<howcontr; i++) {			// находим ID-номер сырья, цену и качество закупок
		npos = name.indexOf("gamaterialproduct[")	// сделать через типовую функцию =>
		name = name.substr(npos+19)			//"поиск и обрезка"
		if (npos<0) break;
		npoz = name.indexOf("']")
		IDprod[i] = name.substring(0,npoz)*1 		// ID-номер сырья
		npos = name.indexOf("gamaterialproduct[")
		name = name.substr(npos+19)
		npos = name.indexOf("gamaterialproduct[")
		name = name.substr(npos+19)
		npos = name.indexOf("=")
		npoz = name.indexOf(";")
		numprod[i] = (name.substring(npos+1,npoz))*1 		// количество поставщиков текущего продукта
		for (var k = 0; k < numprod[i]; k++) {
		  npos = name.indexOf("цена")
		  name = name.substr(npos)
		  npos = name.indexOf("стоимость")
		  name = name.substr(npos+9)
		  npoz = name.indexOf("$")
		  iprice[i][k] = (name.substring(0,npoz)).replace( ' ', '' ).replace(' ', '')*1   //стоимость текущего продукта
		  npos = name.indexOf("качество")
		  name = name.substr(npos+8)
		  npoz = name.indexOf("закупка")
		  iquant[i][k] = (name.substring(0,npoz))*1	// качество текущего продукта
		}
		if (i>0 && IDprod[i-1]!=IDprod[i]) {	// количество видов сырья
		  newprod=newprod+1
		}
	  
	}

	for (var i=0; i<howcontr; i++) {		// считывание размера закупок по поставщикам и общего количества заказа
		for (var z=0; z < numprod[i]; z++) {
		  
		NameIdElement = 'quantityField_' + IDprod[i] + '_' + z;
		tableElem = document.getElementById(NameIdElement)
		cells = tableElem.getElementsByTagName('input')
		tqual[z] = cells[0].value*1; 				// количество
		allvalue[i] = allvalue[i] + iprice[i][z]  		// общяя стоимость i-го продукта
		allquant[i] = allquant[i] + iquant[i][z] * tqual[z] 	// общее качество i-го продукта
		allqual[i] = allqual[i] + tqual[z]*1; 			// общее количество i-го продукта 
		}
		midprice[i] = Math.round(allvalue[i]/allqual[i]*100)/100 // средняя цена i-го продукта 
		midquant[i] = Math.round(allquant[i]/allqual[i]*100)/100  // среднее качество i-го продукта 
	}
	var imgprod=["meat","steel"]
	var k=0;
	var tableElem = document.getElementById('mainContent');
        var elements = tableElem.getElementsByTagName('img');
	var howimg= elements.length
	for (var i=0; i<howimg; i++) 
	    {
	    var str = elements[i].getAttribute('src');
	    if( ~str.indexOf("products") ) {
	      npos = str.indexOf("products")+9;
	      npoz = str.indexOf(".gif");
	      imgprod[k]=str.substring(npos,npoz);
	      k=k+1;
	      }
	    }
	var i=0

	$('table.list>tbody>tr[class] tr:contains("Заказ")').each(function(){   //добавление средних значений в таблицу
	text1='<tr> <td nowrap="" style="color: '+tcolor+'">' +  'Ср. цена'+'</td>'+'<td align="right" nowrap="" style="color: '+tcolor+'">'+midprice[i].toFixed(2) +'$'+' </td></tr> '
	text2='<tr> <td nowrap="" style="color: '+tcolor+'">' +  'Ср. качество'+'</td>'+'<td align="right" nowrap="" style="color: '+tcolor+'">'+midquant[i].toFixed(2)+' </td></tr> '
	i=i+1
	$(text1+text2).insertBefore($(this));
 	})

}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
