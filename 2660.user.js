// ==UserScript==
// @name		gsmls.com Usability 2
// @namespace	http://gsmlsusability.loc
// @description	Adds new functionality to the detailed search page. 
//				More sort options, better price selection, etc.
// @include		http://publicstage.gsmls.marketlinx.com/templates/search_form.asp*
// @include		http://new.gsmls.com/public/searchform.do*
// @date          2006-01-13
// @version       0.1.0
// @GM_version    0.6.4
// ==/UserScript==

var _defaultMinListPrice = 300000;
var _defaultMaxListPrice = 600000;
var _defaultBedrooms = 3;
var _defaultBaths = 2;

var _bookmarkThisSearchHTML;

var _minListPriceSelect = null;
var _minListPriceInputText = null;
var _maxListPriceSelect = null;
var _maxListPriceInputText = null;
var _switchToMinListPriceInputTextFunction = null;
var _switchToMinListPriceSelectFunction = null;
var _switchToMaxListPriceInputTextFunction = null;
var _switchToMaxListPriceSelectFunction = null;

(function() {
	document.forms.namedItem("form1").method = "get";
	

	addSwitchLink( "min", "ListPrice__min" );
	addSwitchLink( "max", "ListPrice__max" );

	switchToMinListPriceInputText( "ListPrice__min" );
	switchToMaxListPriceInputText( "ListPrice__max" );

	setDefaultBedrooms( "Beds__min" );
	setDefaultBaths( "BathsTotal__min" );


	if (document.getElementsByTagName)
	{
		var cells = document.getElementsByTagName("td");

		for (var i=0; i < cells.length; i++ )
		{
			if (cells[i].innerHTML.match("Lot Description:"))
			{
				addOrderBy(cells[i].parentNode);	
			}

			// Add bookmark button if we are in the table cell with submit buttons
//			if (cells[i].innerHTML.match("checkPriceSubmit()"))
//			{
//				var bookmarkThisSearchHTML = "<input id=\"bookmarkSearch\" type=\"button\" name=\"bookmark\" value=\"Create Bookmarkable Link\" onclick=\"bookmarkThisSearch();\"/>";
//				submitHTML = cells[i].innerHTML;
//				submitHTML = submitHTML + bookmarkThisSearchHTML;
//				cells[i].innerHTML = submitHTML;
//			}

		}
	}

}) ();

function setDefaultBedrooms( beds) {
	var defaultBedrooms = document.getElementsByName( beds ).item(0);
	defaultBedrooms.value = _defaultBedrooms;
}

function setDefaultBaths( baths ) {
	var defaultBedrooms = document.getElementsByName( baths ).item(0);
	defaultBedrooms.value = _defaultBaths;
}

function addSwitchLink( type, listPriceName) {

	var switchParent = document.getElementsByName( listPriceName ).item(0).parentNode;
	var switchDiv = document.createElement("SPAN");
	switchDiv.setAttribute ("id", type + "ListPriceSpan");
	switchDiv.setAttribute ("style","cursor: pointer");
	var switchDivText = document.createTextNode("Switch");
	switchDiv.appendChild( switchDivText );

	switchParent.appendChild( switchDiv );
}

function switchToMinListPriceInputText( minListPriceName ) {

	var minListPriceSelect = document.getElementsByName(minListPriceName).item(0);
	minListPriceSelect.id = minListPriceName;
	_minListPriceSelect = minListPriceSelect;
	var minListPriceRow = minListPriceSelect.parentNode;
	var minListPriceInputText = null;

	if (_minListPriceInputText == null)
	{
		minListPriceInputText = document.createElement("INPUT");
		minListPriceInputText.name = minListPriceName;
		minListPriceInputText.value = _defaultMinListPrice;
		minListPriceInputText.id = minListPriceName;
	} else {
		minListPriceInputText = _minListPriceInputText;
	}

	minListPriceRow.replaceChild(minListPriceInputText, minListPriceSelect);

	var minListPriceSwitchSpan = document.getElementById("minListPriceSpan");
	minListPriceSwitchSpan.removeEventListener("click",_switchToMinListPriceInputTextFunction,false);

	_switchToMinListPriceSelectFunction = function () {
		switchToMinListPriceSelect( minListPriceName );
	};

	addEvent(minListPriceSwitchSpan, "click", _switchToMinListPriceSelectFunction, false);
	return true;
}

function switchToMinListPriceSelect( minListPriceName ) {

	var minListPriceInputText = document.getElementsByName(minListPriceName).item(0);
	var minListPriceRow = minListPriceInputText.parentNode;

	var minListPriceSelect = _minListPriceSelect;

	minListPriceRow.replaceChild(minListPriceSelect, minListPriceInputText);

	var minListPriceSwitchSpan = document.getElementById("minListPriceSpan");
	minListPriceSwitchSpan.removeEventListener("click", _switchToMinListPriceSelectFunction, false);

	_switchToMinListPriceInputTextFunction = function () {
		switchToMinListPriceInputText( minListPriceName );
	};

	addEvent(minListPriceSwitchSpan, "click", _switchToMinListPriceInputTextFunction, false);
	return true;
}

function switchToMaxListPriceInputText( maxListPriceName ) {

	var maxListPriceSelect = document.getElementsByName(maxListPriceName).item(0);
	maxListPriceSelect.id = maxListPriceName;
	_maxListPriceSelect = maxListPriceSelect;

	var maxListPriceRow = maxListPriceSelect.parentNode;

	var maxListPriceInputText = null;

	if (_maxListPriceInputText == null)
	{
		maxListPriceInputText = document.createElement("INPUT");
		maxListPriceInputText.name = maxListPriceName;
		maxListPriceInputText.value = _defaultMaxListPrice;
		maxListPriceInputText.id = maxListPriceName;
	} else {
		maxListPriceInputText = _maxListPriceInputText;
	}

	maxListPriceRow.replaceChild(maxListPriceInputText, maxListPriceSelect);

	var maxListPriceSwitchSpan = document.getElementById("maxListPriceSpan");
	maxListPriceSwitchSpan.removeEventListener("click",_switchToMaxListPriceInputTextFunction,false);

	_switchToMaxListPriceSelectFunction = function () {
		switchToMaxListPriceSelect( maxListPriceName );
	};

	addEvent(maxListPriceSwitchSpan, "click", _switchToMaxListPriceSelectFunction, false);
	return true;
}

function switchToMaxListPriceSelect( maxListPriceName ) {

	var maxListPriceInputText = document.getElementsByName(maxListPriceName).item(0);
	var maxListPriceRow = maxListPriceInputText.parentNode;

	var maxListPriceSelect = _maxListPriceSelect;

	maxListPriceRow.replaceChild(maxListPriceSelect, maxListPriceInputText);

	var maxListPriceSwitchSpan = document.getElementById("maxListPriceSpan");
	maxListPriceSwitchSpan.removeEventListener("click", _switchToMaxListPriceSelectFunction, false);

	_switchToMaxListPriceInputTextFunction = function () {
		switchToMaxListPriceInputText( maxListPriceName );
	};

	addEvent(maxListPriceSwitchSpan, "click", _switchToMaxListPriceInputTextFunction, false);
	return true;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

function addEvent(elm, evType, fn, useCapture) {
	if (elm.addEventListener) {
		elm.addEventListener(evType, fn, useCapture);
		return true;
	}
	else if (elm.attachEvent) {
		var r = elm.attachEvent('on' + evType, fn);
		return r;
	}
	else {
		elm['on' + evType] = fn;
	}
}

function addOrderBy (htmlNode) {
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var tr = document.createElement("tr");
	var p = document.createElement("p");
	var select = document.createElement("select");
	var option1 = document.createElement("option");
	var option2 = document.createElement("option");
	var option3 = document.createElement("option");
	var option4 = document.createElement("option");
	var option5 = document.createElement("option");

	td1.setAttribute("vAlign","center");
	td1.setAttribute("class","table_cell");
	td1.setAttribute("width","30%");
	p.appendChild(document.createTextNode("Order Results Using:"));
	p.setAttribute("class","field_label");

	td1.appendChild(p);

	td2.setAttribute("vAlign","center");
	td2.setAttribute("class","table_cell");
	td2.setAttribute("width","70%");
	td2.setAttribute("colspan","2");
	td2.style.paddingLeft = "26px";

	select.setAttribute("size","1");
	select.setAttribute("name","sort");

	var orderByNode = document.getElementsByName("sort").item(0);
	orderByNode.parentNode.removeChild(orderByNode);

	option1.setAttribute("value","MlsNum");
	option1.appendChild(document.createTextNode("MLS Number"));
	select.appendChild(option1);
	option2.setAttribute("value","listprice");
	option2.appendChild(document.createTextNode("List Price"));
	select.appendChild(option2);
	option3.setAttribute("value","Town");
	option3.appendChild(document.createTextNode("City/Town"));
	select.appendChild(option3);
	option4.setAttribute("value","beds");
	option4.appendChild(document.createTextNode("# of Bedrooms"));
	select.appendChild(option4);
	option5.setAttribute("value","style");
	option5.appendChild(document.createTextNode("House Style"));
	select.appendChild(option5);

	td2.appendChild(select);

	tr.appendChild(td1);
	tr.appendChild(td2);
		
	insertAfter(htmlNode.parentNode, tr, htmlNode);
}

function doForm(url,valary){ 

	if(document.getElementById && document.createElement){ 
		var form = document.createElement("form");
		document.getElementsByTagName("body")[0].appendChild(form);
		form.setAttribute("action", url);
		form.setAttribute("method", "GET");
		for(var i=0; i < valary.length; i++){ 
			var temp=document.createElement("input"); 
			form.appendChild(temp);
			temp.setAttribute("type", "hidden"); 
			temp.setAttribute("name", valary[i][0]); 
			temp.value = valary[i][1]; 
		} 
	}
} 
	
function doParse(url){ 
	var pairs = url.substring(url.indexOf('?')+1).split("&");
	url = url.substring(0,url.indexOf('?')); 
	var valary; 
	for (var i=0;i<pairs.length;i++) { 
		var pos = pairs[i].indexOf('=');
		if (pos >= 0) {
			var name = pairs[i].substring(0,pos); 
			var value = pairs[i].substring(pos+1);
			if(valary) 
				valary[valary.length]=[name,value]; 
			else valary = [[name, value]]; 
		} 
	} 
	return doForm(url,valary); 
}

function bookmarkThisSearch(htmlNode) {

	var getString = "?";

	for(var i=0; i < document.forms.form1.length; i++){
		var key = document.forms.form1[i].name;
		var value = document.forms.form1[i].value;

		if (getString != "?")
		{
			getString += "&";
		}
		getString += key + "=" + value; 
	}

	var htmlOutput = "";

	htmlOutput = "javascript: function doForm(url,valary){ if(document.getElementById && document.createElement){ var form = document.createElement(\"form\"); document.getElementsByTagName(\"body\")[0].appendChild(form); form.setAttribute(\"action\", url); form.setAttribute(\"method\", \"POST\"); for(var i=0; i < valary.length; i++){ var temp=document.createElement(\"input\"); form.appendChild(temp); temp.setAttribute(\"type\", \"hidden\"); temp.setAttribute(\"name\", valary[i][0]); temp.value = valary[i][1]; } } form.submit(); } function doParse(url){ var pairs = url.substring(url.indexOf('?')+1).split(\"&\"); url = url.substring(0,url.indexOf('?')); var valary; for (var i=0;i<pairs.length;i++) { var pos = pairs[i].indexOf('='); if (pos >= 0) { var name = pairs[i].substring(0,pos); var value = pairs[i].substring(pos+1); if(valary) valary[valary.length]=[name,value]; else valary = [[name, value]]; } } return doForm(url,valary); } doParse(\"http://publicstage.gsmls.marketlinx.com/Scripts/search_results.asp";
	
	htmlOutput += getString;
	htmlOutput += "\");";

	if (document.getElementById('bookmarkLink')) {
		var a = document.getElementById('bookmarkLink');

		a.setAttribute("href", htmlOutput);
	} else {
		var p = document.createElement('p');
		var a = document.createElement('a');

		a.appendChild(document.createTextNode("Bookmark this link"));
		a.setAttribute("href",htmlOutput);
		a.setAttribute("id","bookmarkLink");
		p.appendChild(a);
		
		bookmarkNode = document.getElementById('bookmarkSearch');
		bookmarkNode.parentNode.appendChild(p);
	
	}


}