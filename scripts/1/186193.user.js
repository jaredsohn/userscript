// ==UserScript==
// @name        Virtonomica_MyUnitView
// @author      Alexander Murmanskiy
// @description Добавление иконок: изменение названия юнита, иконки снабжения и сбыта, изменение размера в главном списке
// @include     http://virtonomic*.*/*/main/company/view/*/unit_list
// @include     http:/igra.aup.*/*/main/company/view/*/unit_list
// @version     1.14.01.07
// @grant       none
// ==/UserScript==

var mainfunction = function () {
    mainclass = $("td[class*='u-c i-']");
    var_pic_supply = "/img/supplier_add.gif";
    var_pic_sale = "/img/storageClear.gif";
    var_pic_edit = "/img/units/edit.gif";
    var_pic_upgrade = "/img/unit_indicator/unit_upgrade.gif";
    var_pic_upgrade_after1 = "/img/unit_indicator/unit_upgrade_soon.gif";
    for (i = 0; i < mainclass.length; i++) {
        type = mainclass.eq(i).prop('class');
	    var_add_supply = 1;
	    var_add_sale = 1;
		switch (type) {              		    
		    //Офис
		    case "u-c i-office":
		        var_add_supply = 0;
		        var_add_sale = 0;
		        break;
		    //Магазин
		    case "u-c i-shop":		        		        
		        var_add_sale = 2;
		        break;
		    //Сфера услуг 
		    case "u-c i-fitness":
		        var_add_supply = 0;
		        var_add_sale = 0;
		        break;
		    //Ресторан
		    case "u-c i-restaurant":		        
		        var_add_sale = 0;
		        break;		        
		    //Лаборатория 
		    case "u-c i-lab":
		        var_add_supply = 0;
		        var_add_sale = 0;
		        break;
		    //Медицинский центр 
		    case "u-c i-medicine":		        
		        var_add_sale = 0;		        
		        break;
		    //Шахта
		    case "u-c i-mine":
		        var_add_supply = 0;		        
		        break;
		    //Лесопилка
		    case "u-c i-sawmill":
		        var_add_supply = 0;
		        break;
		    //Земледельческая ферма
		    case "u-c i-farm":
		        var_add_supply = 0;
		        break;
		    //Плантация 
		    case "u-c i-orchard":
		        var_add_supply = 0;
		        break;
		    //Вилла/Региональный бизнес-центр
		    case "u-c i-villa":
		        var_add_supply = 0;
		        var_add_sale = 0;
		        break;
		    //Рыболовная база
			case "u-c i-fishingbase":
			    var_add_supply = 0;			    
			break;			
		}		
		if (var_add_supply == 1) {
		    mainclass.eq(i).next().append("<a href=" + $("a", mainclass.eq(i)).prop('href') + "/supply>" + "<img width=16 height=16 alt='Снабжение' src=" + var_pic_supply + "></a> ");
		}
		if (var_add_sale == 1) {
		    mainclass.eq(i).next().append("<a href=" + $("a", mainclass.eq(i)).prop('href') + "/sale>" + "<img width=16 height=16 alt='Сбыт' src=" + var_pic_sale + "></a> ");
		}
		else {
		    if (var_add_sale == 2) {
		        mainclass.eq(i).next().append("<a href=" + $("a", mainclass.eq(i)).prop('href') + "/trading_hall>" + "<img width=16 height=16 alt='Сбыт' src=" + var_pic_sale + "></a> ");
		    }
		}
		mainclass.eq(i).append("<a href=" + $("a", mainclass.eq(i)).prop('href').replace('view', 'changename').replace('main', 'window') + " onclick='return doWindow(this, 800, 320);'><img width=16 height=16 alt='Изменить имя' src=" + var_pic_edit + "></a>");
		if (mainclass.eq(i).next().next().next().find($("img[src*='" + var_pic_upgrade + "']")).length + mainclass.eq(i).next().next().next().find($("img[src*='" + var_pic_upgrade_after1 + "']")).length == 0)
		{
		    mainclass.eq(i).next().next().append(" &nbsp;<a class=\"popup\"; onclick=\"return doWindow(this, 1000, 550);\" href=" + $("a", mainclass.eq(i)).prop('href').replace('view', 'upgrade').replace('main', 'window') + ">Изменить размер</a> ");
		}
    }
}
if (window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + mainfunction.toString() + ')();';
    document.documentElement.appendChild(script);
}