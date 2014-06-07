// ==UserScript==
// @name           Spy active
// @namespace      ikariamLibrary
// @description    Add caculate ship amout to pillage all resource
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.03 (06/04/2009)
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
	{ b: 0, w: 0, m: 0, c: 0, s: 0 }, // 0
        { b: 580, w: 580, m: 580, c: 580, s: 580 }, // 1
        { b: 1060, w: 1060, m: 1060, c: 1060, s: 1060 }, // 2
        { b: 1540, w: 1540, m: 1540, c: 1540, s: 1540 }, // 3
        { b: 2020, w: 2020, m: 2020, c: 2020, s: 2020 }, // 4
        { b: 2500, w: 2500, m: 2500, c: 2500, s: 2500 }, // 5
        { b: 2980, w: 2980, m: 2980, c: 2980, s: 2980 }, // 6
        { b: 3460, w: 3460, m: 3460, c: 3460, s: 3460 }, // 7
        { b: 3940, w: 3940, m: 3940, c: 3940, s: 3940 }, // 8
        { b: 4420, w: 4420, m: 4420, c: 4420, s: 4420 }, // 9
        { b: 4900, w: 4900, m: 4900, c: 4900, s: 4900 }, // 10
        { b: 5380, w: 5380, m: 5380, c: 5380, s: 5380 }, // 11
        { b: 5860, w: 5860, m: 5860, c: 5860, s: 5860 }, // 12
        { b: 6340, w: 6340, m: 6340, c: 6340, s: 6340 }, // 13
        { b: 6820, w: 6820, m: 6820, c: 6820, s: 6820 }, // 14
        { b: 7300, w: 7300, m: 7300, c: 7300, s: 7300 }, // 15
        { b: 7780, w: 7780, m: 7780, c: 7780, s: 7780 }, // 16
        { b: 8260, w: 8260, m: 8260, c: 8260, s: 8260 }, // 17
        { b: 8740, w: 8740, m: 8740, c: 8740, s: 8740 }, // 18
        { b: 9220, w: 9220, m: 9220, c: 9220, s: 9220 }, // 19
        { b: 9700, w: 9700, m: 9700, c: 9700, s: 9700 }, // 20
        { b: 10180, w: 10180, m: 10180, c: 10180, s: 10180 }, // 21
        { b: 10660, w: 10660, m: 10660, c: 10660, s: 10660 }, // 22
        { b: 11040, w: 11040, m: 11040, c: 11040, s: 11040 }, // 23
        { b: 11520, w: 11520, m: 11520, c: 11520, s: 11520 }, // 24
        { b: 12000, w: 12000, m: 12000, c: 12000, s: 12000 }, // 25
        { b: 12480, w: 12480, m: 12480, c: 12480, s: 12480 }, // 26
        { b: 12960, w: 12960, m: 12960, c: 12960, s: 12960 }, // 27
        { b: 13440, w: 13440, m: 13440, c: 13440, s: 13440 }, // 28
        { b: 13920, w: 13920, m: 13920, c: 13920, s: 13920 }, // 29
        { b: 14400, w: 14400, m: 14400, c: 14400, s: 14400 }, // 30
        { b: 14980, w: 14980, m: 14980, c: 14980, s: 14980 }, // 31
		{ b: 15460, w: 15460, m: 15460, c: 15460, s: 15460 }, // 32
		{ b: 15940, w: 15940, m: 15940, c: 15940, s: 15940 }, // 33
		{ b: 16420, w: 16420, m: 16420, c: 16420, s: 16420 }, // 34
		{ b: 16900, w: 16900, m: 16900, c: 16900, s: 16900 }, // 35
		{ b: 17380, w: 17380, m: 17380, c: 17380, s: 17380 }, // 36
		{ b: 17860, w: 17860, m: 17860, c: 17860, s: 17860 }, // 37
		{ b: 18340, w: 18340, m: 18340, c: 18340, s: 18340 }, // 38
		{ b: 18820, w: 18820, m: 18820, c: 18820, s: 18820 }, // 39
		{ b: 19300, w: 19300, m: 19300, c: 19300, s: 19300 }, // 40
		{ b: 19780, w: 19780, m: 19780, c: 19780, s: 19780 }, // 41
		{ b: 20260, w: 20260, m: 20260, c: 20260, s: 20260 }, // 42
		{ b: 20740, w: 20740, m: 20740, c: 20740, s: 20740 }, // 43
		{ b: 21220, w: 21220, m: 21220, c: 21220, s: 21220 }, // 44
		{ b: 21700, w: 21700, m: 21700, c: 21700, s: 21700 } // 45
	]
};
	]
};

// alternat data calculation at 1%

var data2 = {
	"warehouse": [
		{ b: 0, w: 0, m: 0, c: 0, s: 0 },	// 0
		{ b: 180, w: 180, m: 180, c: 180, s: 180 },	// 1
		{ b: 260, w: 260, m: 260, c: 260, s: 260 },	// 2
		{ b: 340, w: 340, m: 340, c: 340, s: 340 },	// 3
		{ b: 420, w: 420, m: 420, c: 420, s: 420 },	// 4
		{ b: 500, w: 500, m: 500, c: 500, s: 500 },	// 5
		{ b: 580, w: 580, m: 580, c: 580, s: 580 },	// 6
		{ b: 660, w: 660, m: 660, c: 660, s: 660 },	// 7
		{ b: 740, w: 740, m: 740, c: 740, s: 740 },	// 8
		{ b: 820, w: 820, m: 820, c: 820, s: 820 },	// 9
		{ b: 900, w: 900, m: 900, c: 900, s: 900 },	// 10
		{ b: 980, w: 980, m: 980, c: 980, s: 980 },	// 11
		{ b: 1060, w: 1060, m: 1060, c: 1060, s: 1060 },	// 12
		{ b: 1140, w: 1140, m: 1140, c: 1140, s: 1140 },	// 13
		{ b: 1220, w: 1220, m: 1220, c: 1220, s: 1220 },	// 14
		{ b: 1300, w: 1300, m: 1300, c: 1300, s: 1300 },	// 15
		{ b: 1380, w: 1380, m: 1380, c: 1380, s: 1380 },	// 16
		{ b: 1460, w: 1460, m: 1460, c: 1460, s: 1460 },	// 17
		{ b: 1540, w: 1540, m: 1540, c: 1540, s: 1540 },	// 18
		{ b: 1620, w: 1620, m: 1620, c: 1620, s: 1620 },	// 19
		{ b: 1700, w: 1700, m: 1700, c: 1700, s: 1700 },	// 20
		{ b: 1780, w: 1780, m: 1780, c: 1780, s: 1780 },	// 21
		{ b: 1860, w: 1860, m: 1860, c: 1860, s: 1860 },	// 22
		{ b: 1940, w: 1940, m: 1940, c: 1940, s: 1940 },	// 23
		{ b: 2020, w: 2020, m: 2020, c: 2020, s: 2020 },	// 24
		{ b: 2100, w: 2100, m: 2100, c: 2100, s: 2100 },	// 25
		{ b: 2180, w: 2180, m: 2180, c: 2180, s: 2180 },	// 26
		{ b: 2260, w: 2260, m: 2260, c: 2260, s: 2260 },	// 27
		{ b: 2340, w: 2340, m: 2340, c: 2340, s: 2340 },	// 28
		{ b: 2420, w: 2420, m: 2420, c: 2420, s: 2420 },	// 29
		{ b: 2500, w: 2500, m: 2500, c: 2500, s: 2500 },	// 30
		{ b: 2580, w: 2580, m: 2580, c: 2580, s: 2580 },	// 31
		{ b: 2660, w: 2660, m: 2660, c: 2660, s: 2660 },	// 32
		{ b: 2740, w: 2740, m: 2740, c: 2740, s: 2740 },	// 33
		{ b: 2820, w: 2820, m: 2820, c: 2820, s: 2820 },	// 34
		{ b: 2900, w: 2900, m: 2900, c: 2900, s: 2900 },	// 35
		{ b: 2980, w: 2980, m: 2980, c: 2980, s: 2980 },	// 36
		{ b: 3060, w: 3060, m: 3060, c: 3060, s: 3060 },	// 37
		{ b: 3140, w: 3140, m: 3140, c: 3140, s: 3140 },	// 38
		{ b: 3220, w: 3220, m: 3220, c: 3220, s: 3220 },	// 39
		{ b: 3300, w: 3300, m: 3300, c: 3300, s: 3300 },    // 40
		{ b: 3380, w: 3380, m: 3380, c: 3380, s: 3380 },    // 41
		{ b: 3460, w: 3460, m: 3460, c: 3460, s: 3460 },    // 42
		{ b: 3540, w: 3540, m: 3540, c: 3540, s: 3540 },    // 43
		{ b: 3620, w: 3620, m: 3620, c: 3620, s: 3620 },    // 44
		{ b: 3700, w: 3700, m: 3700, c: 3700, s: 3700 }	    // 45


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
  var c = all.length;
  for (var e = 0; e < c; e++)
  {
    if (findIn)
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
		var c = listElements.length;

		for (var i = 1; i < c; i++)
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
								<input type="checkbox" ID="InactiveFieldCheckBox" name="Inactive" />Check if Inactive
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
		var c = snp_LevelSplit.length;

		for (var i = 0; i < c; i++)
		{

			if(isNaN(snp_LevelSplit[i]))
			{
				alert('Please input only number');
				level.value='0';
				level.focus();
				return false;
			}else
			{
				if(parseInt(snp_LevelSplit[i]) > 45 || parseInt(snp_LevelSplit[i]) < 0)
				{
					alert('Please input only number(0-45)');
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
			var c = snp_LevelSplit.length;

			var snp_sumB = 0;
			var snp_sumW = 0;
			var snp_sumM = 0;
			var snp_sumC = 0;
			var snp_sumS = 0;
			
			for (var i = 0; i < c; i++)
			{
				
				if(document.getElementById("ActiveFieldCheckBox").checked)
				{
					
					//alert("active");
					
					if (typeof(data2['warehouse'][snp_LevelSplit[i]]) != "undefined") {
							var b = data2['warehouse'][snp_LevelSplit[i]].b;
							var w = data2['warehouse'][snp_LevelSplit[i]].w;
							var m = data2['warehouse'][snp_LevelSplit[i]].m;
							var c = data2['warehouse'][snp_LevelSplit[i]].c;
							var s = data2['warehouse'][snp_LevelSplit[i]].s;
							
							snp_sumB = snp_sumB + b;
							snp_sumW = snp_sumW + w;
							snp_sumM = snp_sumM + m;
							snp_sumC = snp_sumC + c;
							snp_sumS = snp_sumS + s;
					}
				}
				
				else
				{
					//alert("inactive");
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
							//alert ( "Inactive snp_sumB: " + snp_sumB +" snp_sumW: " + snp_sumW + " snp_sumM: " + snp_sumM + " snp_sumC: " + snp_sumC + " snp_sumS: " + snp_sumS );
					}


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
			
			//alert("lootable: " + lootableAmt );

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
	var c = snp_ware.length;

	for (var i = 0; i < c; i++)
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