// ==UserScript==
// @name           SnP helper v3.4
// @namespace      ikariamLibrary
// @description    Add caculate ship amout to pillage all resource
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.04 (06/06/2009)
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


	// Header
	InactiveElement = document.createElement("tr");		//JoanRQ
	td1 = document.createElement("td");				//JoanRQ
	td1.setAttribute("class","job");				//JoanRQ
	td1.innerHTML = 'Inactive:';  				//JoanRQ

	td2 = document.createElement("td");				//JoanRQ
	 var InactiveDiv = <>
		<input type="checkbox" style="text-align: right;" size="8"  id="InactivecityId" value="0"/>  Check if inactive.
         	</>;
	td2.innerHTML = InactiveDiv;
	td2.addEventListener("change",calculateShip,false);

	InactiveElement.appendChild(td1);					//JoanRQ
	InactiveElement.appendChild(td2);					//JoanRQ




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
					<a href={backURL} title="Back to the hideout"> <img src="skin/buildings/y100/safehouse.gif" width="160" height="100" /> <span class="textLabel">&lt;&lt; Back to the Hideout(Hideout Tab)</span> </a>
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
	tbodys[0].appendChild(InactiveElement);
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
			if(parseInt(snp_LevelSplit[i]) > 40 || parseInt(snp_LevelSplit[i]) < 0)
        		{
				alert('Please input only number(0-40)');
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

	var Inactiva =document.getElementById('InactivecityId');

	var Safe_by_level = 480	 // JoanRQ safe amt by level if active 
       	if (Inactiva.checked) Safe_by_level = 80; // JoanRQ if NOT active

	var level = document.getElementById('warehouseLevelId');
	var snp_LevelSplit = level.value.split(",");

	var snp_sumB = 0;
	var snp_sumW = 0;
	var snp_sumM = 0;
	var snp_sumC = 0;
	var snp_sumS = 0;

        var Extra_safe = 100;	// JoanRQ extra safe amount
       	if (Inactiva.checked) Extra_safe = 0; // JoanRQ if NOT active
			
	for (var i = 0; i < snp_LevelSplit.length; i++)
	{
		var b = snp_LevelSplit[i] * Safe_by_level ; //JoanRQ
		var w = snp_LevelSplit[i] * Safe_by_level ;       // JoanRQ
		var m = snp_LevelSplit[i] * Safe_by_level ;       // JoanRQ
		var c = snp_LevelSplit[i] * Safe_by_level ;       // JoanRQ
		var s = snp_LevelSplit[i] * Safe_by_level ;       // JoanRQ
			
		snp_sumB = snp_sumB + b;
		snp_sumW = snp_sumW + w;
		snp_sumM = snp_sumM + m;
		snp_sumC = snp_sumC + c;
		snp_sumS = snp_sumS + s;
	}

	b = woodAmt - snp_sumB - Extra_safe;	// JoanRQ
	w = wineAmt - snp_sumW - Extra_safe;	// JoanRQ
	m = marbleAmt - snp_sumM - Extra_safe;	// JoanRQ
	c = crystalAmt - snp_sumC - Extra_safe;	// JoanRQ
	s = sulphurAmt - snp_sumS - Extra_safe;	// JoanRQ

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
//		alert(snp_cityName);

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