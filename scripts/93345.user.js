// ==UserScript==
// @name           supply without 0
// @namespace      http://virtonomic*.*/*/window/unit/supply/create/*/step2
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// @description    Работает в таблице выбора товара
// @description		1. Убирает сточки где "Свободно"=0, кроме своих товаров (задается в pattern) 
// @description		1.1 Свои товары в самом верху.		
// @description 	2. Вместо картинок в 3 столбце показывает цену за 1качество товара
// @description 	2.1 Товар с минимальной ценой за 1 качество следует сразу после своих товаров. У него в 3 столбце цифры выделены синим.
// @description		2.2 Товар не отсортирован по цене за 1 качество, но если товар имеет цену за 1 качество меньше расположенного выше, то у этого товара в 3 столбце цифры выделены зеленым.
// @description		3. В снабжении магазанина на верху по "Средние значения магазинов города" высчитывает среднию цену за 1 качество товара
// @description		3.1 Если есть товар у которого цена за 1 качество меньше  цены на 1 качества по магу, то у этого товара в столбце "качество" цифр синии
// @version        1.1
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;
	var pattern=/(3256042)|(3385652)/;//замените мои id на свои(на каждый реалм по числу)
	var tbod=document.getElementById("mainTable");
	var my_units=document.createDocumentFragment();
	var temp_e=document.createDocumentFragment();
	var temp_aaa=document.createDocumentFragment();
	var minnim=100000.1;
	var price=0.1;
	var qual =0.1;
	var qp=1.3;
	var qpo=1.3;
	
	$("table.right_corner").each(function() { 
		var sels=$('td', this)
		if ($(sels[1]).text()=='Средние значения магазинов города') 
			{
				var price = parseFloat($(sels[2]).text().substr(6).replace(' ', ''));
				var qual = parseFloat($(sels[3]).text().substr(10).replace(' ', ''));	
				qpo = (price / qual);
				this.innerHTML = this.innerHTML+'<font color=green>' +qpo.toFixed(4) + '</font>';
			}
})

	$('script',tbod).each(function(){
		var aaa=this.nextSibling.nextSibling;
		if(!(/(Независимый)|(Морской)/.test(aaa.getElementsByTagName('td')[1].getElementsByTagName('span')[0].textContent))&&pattern.test(aaa.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href))
			{var temp=document.createDocumentFragment();
			price = parseFloat(aaa.getElementsByTagName('td')[8].textContent.replace(' ', ''));
			qual = parseFloat(aaa.getElementsByTagName('td')[9].textContent.replace(' ', ''));
			if (isNaN(price) || isNaN(qual)) { return; }
			qp = (price / qual);
			aaa.getElementsByTagName('td')[2].textContent=(qp.toFixed(4) );
			temp.appendChild(aaa);
			if(aaa.tagname=='tr') temp.appendChild(aaa);
			my_units.appendChild(this);
			my_units.appendChild(temp);
			}
		}
	)
	$('script',tbod).each(function(){
		var aaa_q=this.nextSibling.nextSibling;
		if((aaa_q.getElementsByTagName('td')[4].textContent==0)&&(!(pattern.test(aaa_q.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href))))
		{
			tbod.removeChild(aaa_q);
			tbod.removeChild(this);
		}
		else //if (!(pattern.test(aaa.getElementsByTagName('td')[1].getElementsByTagName('a')[0].href)))
		{
			price = parseFloat(aaa_q.getElementsByTagName('td')[8].textContent.replace(' ', ''));
			qual = parseFloat(aaa_q.getElementsByTagName('td')[9].textContent.replace(' ', ''));
			if (isNaN(price) || isNaN(qual)) { return; }
			qp = (price / qual);
			aaa_q.getElementsByTagName('td')[2].textContent=(qp.toFixed(4) );
			if (qpo>qp) {$(aaa_q.getElementsByTagName('td')[9]).html('<font color=blue><b>' +aaa_q.getElementsByTagName('td')[9].textContent + '</b></font>');}
							
			if (minnim-qp>0) 
				{				
					minnim=qp;
					$(aaa_q.getElementsByTagName('td')[2]).html('<br><font color=green><b>'+ qp.toFixed(4) +'</b></font>');					
					temp_aaa=aaa_q;
				} 
		}
		
	}
	)
		
         if ('getElementsByTagName' in temp_aaa)  $(temp_aaa.getElementsByTagName('td')[2]).html('<br><font color=blue><b>'+ temp_aaa.getElementsByTagName('td')[2].textContent +'</b></font>');	
	my_units.appendChild(temp_aaa);
	/*my_units.appendChild(temp_e);*/	
	tbod.insertBefore(my_units,tbod.firstChild);
}
// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);

