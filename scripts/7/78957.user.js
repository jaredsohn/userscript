// ==UserScript==
// @name           Помощник фармера
// @version        1.05
// @autor          Перевод на русский язык by Victor I (hakergtr@yandex.ru)
// @namespace      ikariamLibrary
// @description    Показывает кол-во сухогрузов, необходимых для полного разграбления города
// @homepage       http://ika-info.ucoz.ru
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://ika-info.ucoz.ru/scripts/Script_updater/script_updater.user.js
// @history        1.05 Обновление базы данных склада до версии 0.3.4 добавлена галочка для неактивных игроков, исправлено сохранение уровней складов в городе, если их больше 1(Любовь)
// @history        1.04 Обновление базы данных склада.
// @history        1.03 Введена поддержка нескольких складов. Используйте запятые, чтобы писать несколько складов.
// @history        1.02 Добавлена новая функция, которая позволяет помнить склад города, который вы посетили.
// @history        1.01 Многоязычная поддержка; Улучшение интерфейса; Оптимизация скрипта;
// ==/UserScript==

// --ScriptUpdater (added by ika-info.ucoz.ru)--
ScriptUpdater.check(51639, '1.05');
// --/ScriptUpdater--

var woodAmt = 0;
var wineAmt = 0;
var marbleAmt = 0;
var crystalAmt = 0;
var sulphurAmt = 0;
var totalAmt = 0;
var lootableAmt = 0;

//b= wood
//w=wines
//m=marble
//c=crystal
//s=sulphur
var data =480;
var dataI =80;

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};
String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
	while (i > -1) { c = c.replace(pcFrom, pcTo); i = c.indexOf(pcFrom); }
	return c;
};

getElementsByClass = function(inElement, className, findIn)
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++)
  {
    if (findIn == true)
    {
        if (all[e].className.indexOf(className) > 0)
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className)
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// get all attributes in object (for debug)
function objToString(obj, description){
	var str = '';
	if( typeof(description) != 'undefined' && description != '' ){
		str = '+++ [ ' + description + ' ] +++\n';
	}
	str += 'typeof - ' + typeof(obj) + '\n';
	if(typeof(obj) != 'undefined'){
		for(key in obj){
			str += key + ' - ' + obj[key] + '\n';
		}
	}
	return str;
}

// alert all attribute in object (for debug)
function describe(obj, description){
	alert(objToString(obj, description));
}

function getRequestParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function getUnFormatNumberBy3(num) {
    var z = num.replace(/(\,)/g, "");
    return z;
}

function getFormatNumberBy3(num, decpoint, sep, isFillFraction, fraction_len, zeroAllow) {
    // check for missing parameters and use defaults if so
    if (arguments.length < 2) {
        sep = ",";
        decpoint = ".";
    }
    if (arguments.length < 3) {
        sep = ",";
    }
    if (arguments.length < 4) {
        isFillFraction = false;
    }
    if (arguments.length < 5) {
        fraction_len = 0;
    }
    if (arguments.length < 6) {
        zeroAllow = false;
    }


    // need a string for operations
    num = num.toString();
    if (num.indexOf(".") < 0) {
        num = num + decpoint;
    }

    // separate the whole number and the fraction if possible
    var a = num.split(decpoint);
    // decimal
    var x = a[0];
    // fraction
    var y = a[1];
    if (isFillFraction) {
        var padLen = 0;
        if (y != null) {
            padLen = fraction_len - y.length;
        }
        for (var j = 0; j < padLen; j++) {
            y = y + '0';
        }
    }

    var rexNumeric = /[0-9]/i;
    var strSign = "";
    if (x.length > 0) {
        strSign = x.substring(0, 1);
        if (!rexNumeric.test(strSign)) {
            x = x.substring(1, x.length);
        } else {
            strSign = "";
        }
    }

    var z = "";
    var result = "";

    if (typeof(x) != "undefined") {
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i) != sep?x.charAt(i):'';

        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        result = "";
        for (i = z.length - 1; i >= 0; i--)
            result += z.charAt(i);
        if (typeof(y) != "undefined" && y.length > 0) {
            result = result + decpoint + y;
        }
    }
    if (result.charAt(0) == '.') {
        result = '0' + result;
    }
    if ((getUnFormatNumberBy3(result) * 1) == 0) {
        if (!zeroAllow) {
            result = '';
        }
    }
    result = strSign + result;
    return result;
}

function calculateTotalAmt()
{
var resourcesTable = document.getElementById('resources');

if(resourcesTable)
{
		var listElements = resourcesTable.getElementsByTagName('tr');

		for (var i = 1; i < listElements.length; i++)
		{
				//alert(listElements[i].innerHTML);
		if(listElements[i].innerHTML.indexOf('icon_wood.gif') > 0)
		{
				//alert('Wood');
				var res = getElementsByClass(listElements[i], "count", false);
				woodAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_wine.gif') > 0)
		{
				//alert('Wine');
				var res = getElementsByClass(listElements[i], "count", false);
				wineAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_marble.gif') > 0)
		{
				//alert('Marble');
				var res = getElementsByClass(listElements[i], "count", false);
				marbleAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_glass.gif') > 0)
		{
				//alert('Crystal Glass');
				var res = getElementsByClass(listElements[i], "count", false);
				crystalAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
		else if(listElements[i].innerHTML.indexOf('icon_sulfur.gif') > 0)
		{
				//alert('Sulphur');
				var res = getElementsByClass(listElements[i], "count", false);
				sulphurAmt = parseInt(res[0].innerHTML.replace(/,/g,''));
		}
}

totalAmt = woodAmt+wineAmt+marbleAmt+crystalAmt+sulphurAmt;

//alert('Woods:'+woodAmt);
//alert('Wine:'+wineAmt);
//alert('marble:'+marbleAmt);
//alert('crystal:'+crystalAmt);
//alert('sulphur:'+sulphurAmt);
//alert('total:'+totalAmt);
}
}

function isTargetPage()
{
	if(document.body.id == 'safehouseReports')
	{

		var resourcesTable = document.getElementById('resources');
		if(resourcesTable)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		return false;
	}
}

function showTotal()
{
		var tbodys = document.getElementsByTagName('tbody');

		// Total
		totalElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Всего ресурсов:';

		td2 = document.createElement("td");
		td2.innerHTML = getFormatNumberBy3(totalAmt, ".", ",", false, 0, true);

		totalElement.appendChild(td1);
		totalElement.appendChild(td2);

		//Warehouse Level
		levelElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Уровень склада:';

		td2 = document.createElement("td");
		 var wareDiv = <>
								<input type="text" style="text-align: right;" size="8"  id="warehouseLevelId" value="0"/>  Например 3 или 1,2,3 для нескольких складов.<br/><br/>
<input type="checkbox" style="text-align: right;" id="warehouseIlId" name="i"  value="1" /> отметить если игрок не активный<br/>
							</>;

		td2.innerHTML = wareDiv;
		td2.addEventListener("change",calculateShip,false);

		levelElement.appendChild(td1);
		levelElement.appendChild(td2);

		// Lootable Amount
		lootElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Ресурсы, которые можно разграбить:';

		td2 = document.createElement("td");
		td2.setAttribute("id","lootableId");
		td2.innerHTML = '0';

		lootElement.appendChild(td1);
		lootElement.appendChild(td2);

		// Ship Amount
		shipElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Кол-во нужных сухогрузов:';

		td2 = document.createElement("td");
		td2.setAttribute("id","shipId");
		td2.innerHTML = '0';

		shipElement.appendChild(td1);
		shipElement.appendChild(td2);

		//Back to hideout
		var backURL = document.getElementById("backTo").getElementsByTagName("a")[0].href.replaceAll("tab=reports","");
		backElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '';

		td2 = document.createElement("td");
		td2.innerHTML = <>
								<a
									href={backURL}
									title="Back to the hideout"> <img
									src="skin/buildings/y100/safehouse.gif"
									width="160" height="100" /> <span class="textLabel">&lt;&lt; Назад в Укрытие</span>
								</a>
								</>;

		backElement.appendChild(td1);
		backElement.appendChild(td2);

		// Enjoy!!
		enjoyElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '';

		td2 = document.createElement("td");
		td2.innerHTML = 'Наслаждайтесь!!  (Kabji Lambda Ikariam.org, перевод на Русский язык VitOS, hakergtr@yandex.ru). Адаптирован для  v.0.3.4';

		enjoyElement.appendChild(td1);
		enjoyElement.appendChild(td2);

		tbodys[0].appendChild(totalElement);
		tbodys[0].appendChild(levelElement);
		tbodys[0].appendChild(lootElement);
		tbodys[0].appendChild(shipElement);
		tbodys[0].appendChild(enjoyElement);
		tbodys[0].appendChild(backElement);
}

function validateInput()
{
	//validate input
		var level = document.getElementById('warehouseLevelId');
		var snp_LevelSplit = level.value.split(",");

		for (var i = 0; i < snp_LevelSplit.length; i++)
		{

			if(isNaN(snp_LevelSplit[i]))
			{
				alert('Please input only number');
				level.value='0';
				level.focus();
				return false;
			}else
			{
				if(parseInt(snp_LevelSplit[i]) > 42 || parseInt(snp_LevelSplit[i]) < 0)
				{
					alert('Please input only number(0-42)');
					level.value='0';
					level.focus();
					return false;
				}
			}
		}

		return true;
}

function calculateShip()
{
		if(!validateInput())
		{
			document.getElementById('warehouseLevelId').value = '0';
		}

		//find safe amt
			var level = document.getElementById('warehouseLevelId');

			var snp_LevelSplit = level.value.split(",");

			var snp_sum = 0;
						

			for (var i = 0; i < snp_LevelSplit.length; i++)
			{
				if ((document.getElementById('warehouseIlId').checked) && (typeof(dataI) != "undefined")) {
					var temp = dataI;
				}
				if ((!document.getElementById('warehouseIlId').checked) && (typeof(data) != "undefined")) {
 
					var temp = data;

				}

						var b = temp * snp_LevelSplit[i] + 100;
						snp_sum = snp_sum + b;
										
			}

			b = woodAmt - snp_sum;
			var w = wineAmt - snp_sum;
			var m = marbleAmt - snp_sum;
			var c = crystalAmt - snp_sum;
			var s = sulphurAmt - snp_sum;

			if(b < 0) b = 0;
			if(w < 0) w = 0;
			if(m < 0) m = 0;
			if(c < 0) c = 0;
			if(s < 0) s = 0;

			lootableAmt = b + w + m + c + s;

			document.getElementById('lootableId').innerHTML = getFormatNumberBy3(lootableAmt, ".", ",", false, 0, true);

		// cal ship
			document.getElementById('shipId').innerHTML = Math.ceil(lootableAmt / 500);

		// save value
		//alert(getRequestParam("reportId"));
		GM_setValue(getRequestParam("reportId"),level.value);

}


function checkCurrentViewEqual(name)
{
		if(getRequestParam("view") == name)
		{
			return true;
		}else
		{
			return false;
		}
}

function findAndSaveWarehouseLevel()
{
	var snp_ware = getElementsByClass(document, "warehouse", false);
	var snp_wlevels = '';
	var snp_wlevelsi = new Array();
	for (var i = 0; i < snp_ware.length; i++)
	{
		var snp_wLevel = parseInt(snp_ware[i].getElementsByTagName("a")[0].title.split(" ")[snp_ware[i].getElementsByTagName("a")[0].title.split(" ").length-1].trim());
		 snp_wlevelsi[i] = snp_wLevel;
		//alert(snp_wlevelsi[i]);

		//find city id and city name
		var snp_cityId = getRequestParam("id");
		//alert(snp_cityId);

		var snp_cityName = getElementsByClass(document, "city", false)[0].innerHTML;
		//alert(snp_cityName);

	}
		snp_wlevels = snp_wlevelsi.join(",");
		//alert(snp_wlevels);

		//save value
		GM_setValue(snp_cityId,snp_wlevels);
		GM_setValue(snp_cityName,snp_wlevels);


}

function snpInit()
{
	// Warehouse Report
	if(isTargetPage())
	{
		//Calculate Amount
		calculateTotalAmt();

		//Insert Result
		showTotal();

		//get warehose level saved value
		var snp_townName = getElementsByClass(document, "record", false)[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
		//alert(snp_townName);
		var snp_saveLevel = GM_getValue(snp_townName,'0');
		if(snp_saveLevel == '0')
		{
			snp_saveLevel = GM_getValue(getRequestParam("reportId"),'0');
		}
		document.getElementById('warehouseLevelId').value = snp_saveLevel;

		//Caculate Ship and lootable amt
		calculateShip();
	}

	if(checkCurrentViewEqual("city"))
	{
		findAndSaveWarehouseLevel();
	}

}

snpInit();