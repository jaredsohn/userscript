// ==UserScript==
// @name           Ikariam SnP helper
// @namespace      Dino.pl
// @version        1.05
// @description    Add caculate ship amout to pillage all resource
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.05 (06/01/2011)
// Credits (some function is copy or modify from other srcipt): Town Enhancer, Ikariam Inline Score

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
var data = {
	"warehouse": [
		{ b: 0, w: 0, m: 0, c: 0, s: 0 },	                // 0
		{ b: 580, w: 580, m: 580, c: 580, s: 580 },	        // 1
		{ b: 1060, w: 1060, m: 1060, c: 1060, s: 1060 },	// 2
		{ b: 1540, w: 1540, m: 1540, c: 1540, s: 1540 },	// 3
		{ b: 2020, w: 2020, m: 2020, c: 2020, s: 2020 },	// 4
		{ b: 2500, w: 2500, m: 2500, c: 2500, s: 2500 },	// 5
		{ b: 2980, w: 2980, m: 2980, c: 2980, s: 2980 },	// 6
		{ b: 3460, w: 3460, m: 3460, c: 3460, s: 3460 },	// 7
		{ b: 3940, w: 3940, m: 3940, c: 3940, s: 3940 },	// 8
		{ b: 4420, w: 4420, m: 4420, c: 4420, s: 4420 },	// 9
		{ b: 4900, w: 4900, m: 4900, c: 4900, s: 4900 },	// 10
		{ b: 5380, w: 5380, m: 5380, c: 5380, s: 5380 },	// 11
		{ b: 5860, w: 5860, m: 5860, c: 5860, s: 5860 },	// 12
		{ b: 6340, w: 6340, m: 6340, c: 6340, s: 6340 },	// 13
		{ b: 6820, w: 6820, m: 6820, c: 6820, s: 6820 },	// 14
		{ b: 7300, w: 7300, m: 7300, c: 7300, s: 7300 },	// 15
		{ b: 7780, w: 7780, m: 7780, c: 7780, s: 7780 },	// 16
		{ b: 8260, w: 8260, m: 8260, c: 8260, s: 8260 },	// 17
		{ b: 8740, w: 8740, m: 8740, c: 8740, s: 8740 },	// 18
		{ b: 9220, w: 9220, m: 9220, c: 9220, s: 9220 },	// 19
		{ b: 9700, w: 9700, m: 9700, c: 9700, s: 9700 },	// 20
		{ b: 10180, w: 10180, m: 10180, c: 10180, s: 10180 },	// 21
		{ b: 10660, w: 10660, m: 10660, c: 10660, s: 10660 },	// 22
		{ b: 11140, w: 11140, m: 11140, c: 11140, s: 11140 },	// 23
		{ b: 11620, w: 11620, m: 11620, c: 11620, s: 11620 },	// 24
		{ b: 12100, w: 12100, m: 12100, c: 12100, s: 12100 },	// 25
		{ b: 12580, w: 12580, m: 12580, c: 12580, s: 12580 },	// 26
		{ b: 13060, w: 13060, m: 13060, c: 13060, s: 13060 },	// 27
		{ b: 13540, w: 13540, m: 13540, c: 13540, s: 13540 },	// 28
		{ b: 14020, w: 14020, m: 14020, c: 14020, s: 14020 },	// 29
		{ b: 14500, w: 14500, m: 14500, c: 14500, s: 14500 },	// 30
		{ b: 14980, w: 14980, m: 14980, c: 14980, s: 14980 },	// 31
		{ b: 15460, w: 15460, m: 15460, c: 15460, s: 15460 },	// 32
		{ b: 15940, w: 15940, m: 15940, c: 15940, s: 15940 },	// 33
		{ b: 16420, w: 16420, m: 16420, c: 16420, s: 16420 },	// 34
		{ b: 16900, w: 16900, m: 16900, c: 16900, s: 16900 },	// 35
		{ b: 17380, w: 17380, m: 17380, c: 17380, s: 17380 },	// 36
		{ b: 17860, w: 17860, m: 17860, c: 17860, s: 17860 },	// 37
		{ b: 18340, w: 18340, m: 18340, c: 18340, s: 18340 },	// 38
		{ b: 18820, w: 18820, m: 18820, c: 18820, s: 18820 },	// 39
		{ b: 19300, w: 19300, m: 19300, c: 19300, s: 19300 },	// 40
		{ b: 19780, w: 19780, m: 19780, c: 19780, s: 19780 },	// 41
		{ b: 20260, w: 20260, m: 20260, c: 20260, s: 20260 },	// 42
		{ b: 20740, w: 20740, m: 20740, c: 20740, s: 20740 },	// 43
		{ b: 21220, w: 21220, m: 21220, c: 21220, s: 21220 },	// 44
		{ b: 21700, w: 21700, m: 21700, c: 21700, s: 21700 },	// 45
		{ b: 22180, w: 22180, m: 22180, c: 22180, s: 22180 },	// 46
		{ b: 22660, w: 22660, m: 22660, c: 22660, s: 22660 },	// 47
		{ b: 23140, w: 23140, m: 23140, c: 23140, s: 23140 },	// 48
		{ b: 23620, w: 23620, m: 23620, c: 23620, s: 23620 },	// 49
		{ b: 24100, w: 24100, m: 24100, c: 24100, s: 24100 },	// 50
		{ b: 24580, w: 24580, m: 24580, c: 24580, s: 24580 },	// 51
		{ b: 25060, w: 25060, m: 25060, c: 25060, s: 25060 },	// 52
		{ b: 25540, w: 25540, m: 25540, c: 25540, s: 25540 },	// 53
		{ b: 26020, w: 26020, m: 26020, c: 26020, s: 26020 },	// 54
		{ b: 26500, w: 26500, m: 26500, c: 26500, s: 26500 },	// 55
		{ b: 26980, w: 26980, m: 26980, c: 26980, s: 26980 },	// 56
		{ b: 27460, w: 27460, m: 27460, c: 27460, s: 27460 },	// 57
		{ b: 27940, w: 27940, m: 27940, c: 27940, s: 27940 },	// 58
		{ b: 28420, w: 28420, m: 28420, c: 28420, s: 28420 },	// 59
		{ b: 28900, w: 28900, m: 28900, c: 28900, s: 28900 },	// 60
		{ b: 29380, w: 29380, m: 29380, c: 29380, s: 29380 },	// 61
		{ b: 29860, w: 29860, m: 29860, c: 29860, s: 29860 },	// 62
		{ b: 30340, w: 30340, m: 30340, c: 30340, s: 30340 },	// 63
		{ b: 30820, w: 30820, m: 30820, c: 30820, s: 30820 },	// 64
		{ b: 31300, w: 31300, m: 31300, c: 31300, s: 31300 },	// 65
		{ b: 31780, w: 31780, m: 31780, c: 31780, s: 31780 },	// 66
		{ b: 32260, w: 32260, m: 32260, c: 32260, s: 32260 },	// 67
		{ b: 32740, w: 32740, m: 32740, c: 32740, s: 32740 },	// 68
		{ b: 33220, w: 33220, m: 33220, c: 33220, s: 33220 },	// 69
		{ b: 33700, w: 33700, m: 33700, c: 33700, s: 33700 },	// 70
		{ b: 34180, w: 34180, m: 34180, c: 34180, s: 34180 },	// 71
		{ b: 34660, w: 34660, m: 34660, c: 34660, s: 34660 },	// 72
		{ b: 35140, w: 35140, m: 35140, c: 35140, s: 35140 },	// 73
		{ b: 35620, w: 35620, m: 35620, c: 35620, s: 35620 },	// 74
		{ b: 36100, w: 36100, m: 36100, c: 36100, s: 36100 }	// 75		
	]
};

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
		td1.innerHTML = 'Total Amount:';

		td2 = document.createElement("td");
		td2.innerHTML = getFormatNumberBy3(totalAmt, ".", ",", false, 0, true);

		totalElement.appendChild(td1);
		totalElement.appendChild(td2);

		//Warehouse Level
		levelElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Warehouse Level:';

		td2 = document.createElement("td");
		 var wareDiv = <>
								<input type="text" style="text-align: right;" size="8"  id="warehouseLevelId" value="0"/>  Ex. 3 or 1,2,3 for multi warehouse.
							</>;
		td2.innerHTML = wareDiv;
		td2.addEventListener("change",calculateShip,false);

		levelElement.appendChild(td1);
		levelElement.appendChild(td2);

		// Lootable Amount
		lootElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Lootable Amount:';

		td2 = document.createElement("td");
		td2.setAttribute("id","lootableId");
		td2.innerHTML = '0';

		lootElement.appendChild(td1);
		lootElement.appendChild(td2);

		// Ship Amount
		shipElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = 'Ship Amount:';

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
									width="160" height="100" /> <span class="textLabel">&lt;&lt; Back to the Hideout(Hideout Tab)</span>
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
		td2.innerHTML = 'Enjoy!!  (Kabji Lambda Ikariam.org)';

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
				if(parseInt(snp_LevelSplit[i]) > 75 || parseInt(snp_LevelSplit[i]) < 0)
				{
					alert('Please input only number(0-75)');
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

			var snp_sumB = 0;
			var snp_sumW = 0;
			var snp_sumM = 0;
			var snp_sumC = 0;
			var snp_sumS = 0;
			
			for (var i = 0; i < snp_LevelSplit.length; i++)
			{
				if (typeof(data['warehouse'][snp_LevelSplit[i]]) != "undefined") {
						var b = data['warehouse'][snp_LevelSplit[i]].b;
						var w = data['warehouse'][snp_LevelSplit[i]].w;
						var m = data['warehouse'][snp_LevelSplit[i]].m;
						var c = data['warehouse'][snp_LevelSplit[i]].c;
						var s = data['warehouse'][snp_LevelSplit[i]].s;
						
						snp_sumB = snp_sumB + b;
						snp_sumW = snp_sumW + w;
						snp_sumM = snp_sumM + m;
						snp_sumC = snp_sumC + c;
						snp_sumS = snp_sumS + s;
				}
			}

			b = woodAmt - snp_sumB;
			w = wineAmt - snp_sumW;
			m = marbleAmt - snp_sumM;
			c = crystalAmt - snp_sumC;
			s = sulphurAmt - snp_sumS;

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

	for (var i = 0; i < snp_ware.length; i++)
	{
		var snp_wLevel = parseInt(snp_ware[i].getElementsByTagName("a")[0].title.split(" ")[snp_ware[i].getElementsByTagName("a")[0].title.split(" ").length-1].trim());
		//alert(buildingLevel);

		//find city id and city name
		var snp_cityId = getRequestParam("id");
		//alert(snp_cityId);

		var snp_cityName = getElementsByClass(document, "city", false)[0].innerHTML;
		//alert(snp_cityName);

		//save value
		GM_setValue(snp_cityId,snp_wLevel);
		GM_setValue(snp_cityName,snp_wLevel);
	}

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