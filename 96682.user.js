// ==UserScript==
// @name           Meaningful stockrooms
// @namespace      bricklink
// @version        1.4
// @description    Name stockrooms whatever you like, display each stockroom name in a different color.  Go to Sell | My Store Settings to configure names and colors.
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// Modified page: (for now, more can follow)
// @include        http://www.bricklink.com/inventory_add.asp*
// @include        http://www.bricklink.com//inventory_add.asp*
// @include        http://www.bricklink.com/inventory_detail.asp*
// @include        http://www.bricklink.com//inventory_detail.asp*
// @include        http://www.bricklink.com/retractOrderCancelEdit.asp*
// @include        http://www.bricklink.com//retractOrderCancelEdit.asp*
// @include        http://www.bricklink.com/invSetEdit.asp*
// @include        http://www.bricklink.com//invSetEdit.asp*
// @match          http://www.bricklink.com/inventory_add.asp*
// @match          http://www.bricklink.com//inventory_add.asp*
// @match          http://www.bricklink.com/inventory_detail.asp*
// @match          http://www.bricklink.com//inventory_detail.asp*
// @match          http://www.bricklink.com/retractOrderCancelEdit.asp*
// @match          http://www.bricklink.com//retractOrderCancelEdit.asp*
// @match          http://www.bricklink.com/invSetEdit.asp*
// @match          http://www.bricklink.com//invSetEdit.asp*
// Configuration page:
// @include        http://www.bricklink.com/pref_seller.asp
// @include        http://www.bricklink.com//pref_seller.asp
// @match          http://www.bricklink.com/pref_seller.asp
// @match          http://www.bricklink.com//pref_seller.asp
// ==/UserScript==

function StockroomChange()
// React to changing the stockroom a lot is in
{
	// match style
	this.style.color=this.options[this.selectedIndex].style.color;
	// locate the input elements
	if ((document.URL.indexOf('retractOrderCancelEdit')==-1) &&
	    (document.URL.indexOf('invID=')==-1) &&
	    (document.URL.indexOf('inventory_add')==-1))
	  var stockform_index = 2; else var stockform_index = 1;
	var stockform = document.forms[stockform_index];
	var chkbox_name=this.getAttribute('chkbox_name');
GM_log(chkbox_name);
	var chkbox = stockform.elements.namedItem(chkbox_name);
	var stockroom_name=this.getAttribute('stockroom_name');
GM_log(stockroom_name);
GM_log(this.value);
	var stockroom = stockform.elements.namedItem(stockroom_name);
	// change the underlying input elements to reflect the select-option
	chkbox.checked=(this.value!=''); 
	if (chkbox.checked) stockroom.value=this.value;
}

function GetStockroomSetting(varname, mydefault)
// Retrieve from persistent storage a key:value pair
{
	var value;
	if(typeof(Storage)!=="undefined")
	{
		// localStorage support
		value = localStorage.getItem(varname);
	}
	else
	{
		// No web storage support
		value = GM_getValue(varname);
	}
	if (value==null) value=mydefault;
	return value;
}

function SetStockroomSetting(varname, value)
// Retrieve from persistent storage a key:value pair
{
	if(typeof(Storage)!=="undefined")
	{
		// localStorage support
		localStorage.setItem(varname, value);
	}
	else
	{
		// No web storage support
		GM_setValue(varname, value);
	}
}

function InvDetail(stkrmName, stockroomPos)
// Do processing for the inventory_detail.asp page
{
	// Make title other than "Bricklink"
	if (document.title=="Bricklink") document.title="Inventory detail";

	// Load stockroom names and colors
	var Stockroom0Name = GetStockroomSetting('Stockroom0Name', 'Available');
	var Stockroom0Color = GetStockroomSetting('Stockroom0Color', 'black');
	var Stockroom1Name = GetStockroomSetting('Stockroom1Name', 'Stockroom A');
	var Stockroom1Color = GetStockroomSetting('Stockroom1Color', 'red');
	var Stockroom2Name = GetStockroomSetting('Stockroom2Name', 'Stockroom B');
	var Stockroom2Color = GetStockroomSetting('Stockroom2Color', 'blue');
	var Stockroom3Name = GetStockroomSetting('Stockroom3Name', 'Stockroom C');
	var Stockroom3Color = GetStockroomSetting('Stockroom3Color', 'green');

	// fetch each newInvStock* and newInvStockID* on the page
	var snapStkrm = document.evaluate("//*[starts-with(@name,'"+stkrmName+"')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapStkrm.snapshotLength - 1; i >=0; i--) {
		// Hide confusing UI elements
		var stockroom = snapStkrm.snapshotItem(i);
		var chkbox = stockroom.parentNode.parentNode.cells.item(stockroomPos-1).firstChild;
		chkbox.style.display="none";
		stockroom.style.display="none";
		// Hide 'stockroom' label - it's the 4th (or 5th?) TD in this TR
		chkbox.parentNode.parentNode.cells.item(stockroomPos).style.display="none";
		// Tidy up layout
		chkbox.parentNode.colSpan=2;
		// Create clearer input element
		var myselect = document.createElement("select");
		// Populate the select list with options
		option0 = document.createElement("option");
		option0text=document.createTextNode(Stockroom0Name);
		option0.style.color=Stockroom0Color;
		option0.value='';
		option0.selected=(option0.value==stockroom.value);
		option0.appendChild(option0text);
		myselect.add(option0,null);
		option1 = document.createElement("option");
		option1text=document.createTextNode(Stockroom1Name);
		option1.style.color=Stockroom1Color;
		option1.value="A";
		option1.selected=(option1.value==stockroom.value);
		option1.appendChild(option1text);
		myselect.add(option1,null);
		option2 = document.createElement("option");
		option2text=document.createTextNode(Stockroom2Name);
		option2.style.color=Stockroom2Color;
		option2.value="B";
		option2.selected=(option2.value==stockroom.value);
		option2.appendChild(option2text);
		myselect.add(option2,null);
		option3 = document.createElement("option");
		option3text=document.createTextNode(Stockroom3Name);
		option3.style.color=Stockroom3Color;
		option3.value="C";
		option3.selected=(option3.value==stockroom.value);
		option3.appendChild(option3text);
		myselect.add(option3,null);
		// Remember who's values we're proxying/wrapping
		myselect.setAttribute('chkbox_name',chkbox.name);
		myselect.setAttribute('stockroom_name',stockroom.name);
		// Inject new UI element into page
		myselect.addEventListener("change", StockroomChange, true);
		myselect.style.color=myselect.options[myselect.selectedIndex].style.color;
		chkbox.parentNode.appendChild(myselect);
	}
}//InvDetail()

function blurredName()
// store a change to the name of a stockroom
{
	SetStockroomSetting(this.id, this.value);
}
function blurredColor()
// store a change to the color of a stockroom
{
	this.style.color=this.value;
	SetStockroomSetting(this.id, this.value);
}
function SetColors(NameId,varName,defaultName,ColorId,varColor,defaultColor)
// Load stockroom name and color and populate our input controls to match
{
	varColor = GetStockroomSetting(ColorId,defaultColor);
	stkcolor = document.getElementById(ColorId);
	stkcolor.value=varColor;
	stkcolor.style.color=varColor;
	stkcolor.addEventListener("blur", blurredColor, true);
	varName = GetStockroomSetting(NameId,defaultName);
	stkname = document.getElementById(NameId);
	stkname.value=varName;
	stkname.addEventListener("blur", blurredName, true);
}
function EnableStockrooms()
// In response to enabling stockrooms, hide or show our controls
{
	var stkrmControls=document.getElementById('RenameStockrooms');
	stkrmControls.style.display=(this.checked?'table':'none');
}

function PrefSeller()
// Do processing for the inventory_detail.asp page
{
	// Work from this hidden input box
	chkbox = document.getElementsByName('oldSellerOptionStock')[0];
	// Inject our controls
	var target_td = chkbox.nextSibling.parentNode.cells.item(3);
	target_td.innerHTML = target_td.innerHTML + '<table class="fv" id="RenameStockrooms">'+
		'<tr><td>Stockroom</td><td>Name</td><td>Color (HTML)</td></tr>'+
		'<tr><td></td><td><input id="Stockroom0Name" type="text" width="50" /></td><td><input id="Stockroom0Color" type="text" width="8" /></td></tr>'+
		'<tr><td>A</td><td><input id="Stockroom1Name" type="text" width="50" /></td><td><input id="Stockroom1Color" type="text" width="8" /></td></tr>'+
		'<tr><td>B</td><td><input id="Stockroom2Name" type="text" width="50" /></td><td><input id="Stockroom2Color" type="text" width="8" /></td></tr>'+
		'<tr><td>C</td><td><input id="Stockroom3Name" type="text" width="50" /></td><td><input id="Stockroom3Color" type="text" width="8" /></td></tr>'+
	'</table>';
	// Set initial values
	var Stockroom0Name;
	var Stockroom0Color;
	var Stockroom1Name;
	var Stockroom1Color;
	var Stockroom2Name;
	var Stockroom2Color;
	var Stockroom3Name;
	var Stockroom3Color;
	SetColors('Stockroom0Name',Stockroom0Name,'Available','Stockroom0Color',Stockroom0Color,'black');
	SetColors('Stockroom1Name',Stockroom1Name,'Stockroom A','Stockroom1Color',Stockroom1Color,'red');
	SetColors('Stockroom2Name',Stockroom2Name,'Stockroom B','Stockroom2Color',Stockroom2Color,'blue');
	SetColors('Stockroom3Name',Stockroom3Name,'Stockroom C','Stockroom3Color',Stockroom3Color,'green');
	// Tidy up the layout
	var help_td = chkbox.nextSibling.parentNode.cells.item(0);
	help_td.style.verticalAlign='top';
	var check_td = chkbox.nextSibling.parentNode.cells.item(2);
	check_td.style.verticalAlign='top';
	// Set visibility of controls - hide them if stockrooms aren't enabled
	check_td.firstChild.addEventListener("change", EnableStockrooms, true);
	var stkrmControls=document.getElementById('RenameStockrooms');
	stkrmControls.style.display=(check_td.firstChild.checked?'table':'none');
}

// These two pages need to be combined into a single script to allow common access to GM_getValue
if (document.URL.indexOf('bindID=')!=-1) InvDetail('newBindStockID',1); else
if (document.URL.indexOf('bricklink.com/inventory_add.asp')!=-1) InvDetail('stockType',2); else
if (document.URL.indexOf('bricklink.com//inventory_add.asp')!=-1) InvDetail('stockType',2); else
if (document.URL.indexOf('bricklink.com/inventory_detail.asp')!=-1) InvDetail('newInvStockID',4); else
if (document.URL.indexOf('bricklink.com//inventory_detail.asp')!=-1) InvDetail('newInvStockID',4); else
if (document.URL.indexOf('bricklink.com/retractOrderCancelEdit.asp')!=-1) InvDetail('nG',4); else
if (document.URL.indexOf('bricklink.com//retractOrderCancelEdit.asp')!=-1) InvDetail('nG',4); else
if (document.URL.indexOf('bricklink.com/invSetEdit.asp')!=-1) InvDetail('nG',4); else
if (document.URL.indexOf('bricklink.com//invSetEdit.asp')!=-1) InvDetail('nG',4); else
if (document.URL.indexOf('bricklink.com/pref_seller.asp')!=-1) PrefSeller(); else
if (document.URL.indexOf('bricklink.com//pref_seller.asp')!=-1) PrefSeller(); else
GM_log('Active against unexpected URL');
