// ==UserScript==
// @name          Dreamrobot Transaction Interface
// @namespace
// @description   Dreamrobot FastTransaction Download
// @include       http://dreamrobot.de/waren.php*
// ==/UserScript==


/*######################################################################
# add different status' to PaymentStatus Array                         #
# Workaround: find Transaction according to its <tr>-BackgroundColor   #
######################################################################*/

//#CONFIG

//Interface
const	MAIN_CONTAINER_ID				= 'BF_DE_DOWNLOAD_INTERFACE';
const MAIN_CONTAINER_MENU_ID		= 'BF_DE_INTERFACE_TOGGLE_MENU';
const MAIN_TOGGLE_BUTTON			= 'BF_DE_TOGGLE_BUTTON';
const	MAIN_FORM_NAME					= 'BF_DE_DOWNLOAD_FORM';
const CHECKBOX_NAME					= 'checkbox_waren_nummern[]';
const SELECT_NODE_NAME				= 'zeilen_operation';
const SUBMIT_FORM_NAME				= 'form1';

//Menübutton
const INTERFACE_STATE_CLOSED		= 'closed';
const INTERFACE_STATE_OPEN			= 'open';
const VALUE_STATE_CLOSE				= 'Menue schliessen';
const VALUE_STATE_OPEN				= 'Menue oeffnen';

//Transaktions Stati
const TS_OPEN_TRANSACTION			= 'OpenTransaction';
const TS_CHECKOUT_DONE				= 'CheckoutDone';
const TS_PAID							= 'Paid';
const TS_SHIPPING_LABEL_PRINTED	= 'ShippingLabelPrinted';

//Sprache (de_DE|en_US)
const LOCALE							= 'de_DE';

//tr-backgroundColors für Transaktions Stati
var	PaymentStatus = new Array();
PaymentStatus[TS_OPEN_TRANSACTION]			= new Array( 'eeee00', 'aaaaaa', '2a98fe', 'DBE0E5' );
PaymentStatus[TS_CHECKOUT_DONE]				= new Array( 'AAB8E0', 'DBE0E5' );
PaymentStatus[TS_PAID]							= new Array( '55dd55', 'DBE0E5' );
PaymentStatus[TS_SHIPPING_LABEL_PRINTED]	= new Array( '44bb44', 'DBE0E5' );

//Interface Beschreibungen für Download
var	LocaleDescriptions	= new Array();
LocaleDescriptions[TS_OPEN_TRANSACTION]			= new Array();
LocaleDescriptions[TS_OPEN_TRANSACTION]['de_DE']			= 'Offene Transaktionen (Checkout noch nicht abgeschlossen)';
LocaleDescriptions[TS_OPEN_TRANSACTION]['en_US']			= 'Open Transactions (Checkout not yet done)';

LocaleDescriptions[TS_CHECKOUT_DONE]				= new Array();
LocaleDescriptions[TS_CHECKOUT_DONE]['de_DE']				= 'Abgeschlossene Transaktionen';
LocaleDescriptions[TS_CHECKOUT_DONE]['en_US']				= 'Checkout completed (not paid yet)';

LocaleDescriptions[TS_PAID]							= new Array();
LocaleDescriptions[TS_PAID]['de_DE']							= 'Bezahlte Transaktionen';
LocaleDescriptions[TS_PAID]['en_US']							= 'Paid Transactions';

LocaleDescriptions[TS_SHIPPING_LABEL_PRINTED]	= new Array();
LocaleDescriptions[TS_SHIPPING_LABEL_PRINTED]['de_DE']	= 'Versandaufkleber gedruckt';
LocaleDescriptions[TS_SHIPPING_LABEL_PRINTED]['en_US']	= 'Shippinglabel printed';

LocaleDescriptions['admin']							= new Array();
LocaleDescriptions['admin']['submit']				= new Array();
LocaleDescriptions['admin']['submit']['de_DE']			= 'CSV Download';
LocaleDescriptions['admin']['submit']['en_US']			= 'CSV Download';

//#STYLE_CONFIG
var	StyleArray	= new Array();
StyleArray['position']			= 'absolute';
StyleArray['width']				= '450px';
StyleArray['height']				= '200px';
StyleArray['right']				= '0%';
StyleArray['top']					= '25px';
StyleArray['border']				= '1px dotted black';
StyleArray['display']			= 'none';
StyleArray['backgroundColor']	= '#E4E4E4';
StyleArray['zIndex']				= 10000;

var	MenuStyleArray	= new Array();
StyleArray['position']			= 'absolute';
StyleArray['width']				= '450px';
StyleArray['height']				= '225px';
StyleArray['right']				= '0%';
StyleArray['top']					= '0%';
StyleArray['border']				= '1px dotted black';
StyleArray['backgroundColor']	= '#E4E4E4';
StyleArray['zIndex']				= 10000;



/*Initialisierung der Klasse DRDownloadInterface*/
function DRDownloadInterface(){
	//#this.DownloadParameter;
	this.PaymentParameter;
	this.LocaleDescriptions;
	this.InterfaceToggleStatus = null;
}

DRDownloadInterface.prototype.init = function(){
	this.PaymentParameter		= PaymentStatus;
	//#this.LocaleDescriptions		= LocaleDescriptions;
	this.initInterface(this.getToggleStatus());
}

DRDownloadInterface.prototype.initInterface = function( toggleStatus ){
	var MainContainer	= this.getMainContainer();
	var FormElement	= this.buildInterfaceContent();
	MainContainer.appendChild(FormElement);
}


DRDownloadInterface.prototype.getMainContainer = function(){
	var ret	= document.getElementById( MAIN_CONTAINER_ID );
	if( ret ){
		return ret;
	}else{
		this.initContainer();
		return this.getMainContainer();
	}
}
DRDownloadInterface.prototype.initContainer = function(){
	var toggleMenu	= document.createElement('div');
	toggleMenu.appendChild( this.createToggleButton() );
	var div	 		= document.createElement('div');
	div.id	 		= MAIN_CONTAINER_ID;
	//set styles
	for ( var key in StyleArray ){
		eval('div.style.'+ key +' = "'+ StyleArray[key] +'";');
	}
	for( var key in MenuStyleArray ){
		eval('toggleMenu.style.'+ key +' = "'+ MenuStyleArray[key] +'";');
	}
	toggleMenu.appendChild(div);
	//append to document
	var ret = document.getElementsByTagName( 'body' )[0].appendChild( toggleMenu );
	return ret;
}

DRDownloadInterface.prototype.getToggleStatus = function( ){
	var s = document.getElementById(MAIN_TOGGLE_BUTTON);
	if( s ){
		if( s.value == VALUE_STATE_OPEN ){
			return INTERFACE_STATE_CLOSED;
		}else{
			return INTERFACE_STATE_OPEN;
		}
	}else{
		return INTERFACE_STATE_OPEN;
	}
}

DRDownloadInterface.prototype.createToggleButton	= function( status ){
	var itb	= document.createElement('input');//InputTypeButton
	itb.type	= 'Button';
	itb.id	= MAIN_TOGGLE_BUTTON;

	//Button styles
	itb.style.position	= 'absolute';
	itb.style.top			= "0";
	itb.style.right		= "200";
	itb.style.zIndex		= 100001;

	switch( status ){
		case INTERFACE_STATE_OPEN:
		itb.value	= VALUE_STATE_CLOSE;
		break;
		case INTERFACE_STATE_CLOSED:
		itb.value	= VALUE_STATE_OPEN;
		break;
		default:
		return this.createToggleButton( INTERFACE_STATE_CLOSED );
	}

	// add onClick event
	itb.addEventListener(
	'click',
	function(e){
		DRDownloadInterface.toggleMenuButton( );
	},
	true
	);

	return itb;
}

/**
* show/hide the interface
**/
DRDownloadInterface.prototype.toggleMenuButton	= function( ){
	var toggleNow	= this.getToggleStatus();
	var button		= this.getToggleButton();
	if( button ){
		switch( toggleNow ){
			case INTERFACE_STATE_CLOSED:
			button.value	= VALUE_STATE_CLOSE;
			this.getMainContainer().style.display	= 'block';
			break;
			case INTERFACE_STATE_OPEN:
			button.value	= VALUE_STATE_OPEN;
			this.getMainContainer().style.display	= 'none';
			break;
		}
	}
}

DRDownloadInterface.prototype.getToggleButton	= function( ){
	return document.getElementById( MAIN_TOGGLE_BUTTON );
}

DRDownloadInterface.prototype.buildInterfaceContent	= function( ){
	var ret	= document.createElement('form');
	ret.name	= MAIN_FORM_NAME;

	for( var i = 0; i<=3; i++ ){
		ret.appendChild(document.createElement('br'));
	}

	for ( var key in PaymentStatus ){
		var elem	 = document.createElement('input');
		elem.type ='button';
		elem.addEventListener(
		'click',
		function(e){
			eval(this.title);
		},
		true
		);

		//workaround, da addEventListener nicht funktioniert mit selbem Befehl
		elem.title	= 'DRDownloadInterface.sendRequest("'+key+'");';

		elem.value	= LocaleDescriptions[key][LOCALE];
		ret.appendChild(elem);
		ret.appendChild(document.createElement('br'));
	}
	ret.appendChild(document.createElement('br'));

	var submitButton		= document.createElement('input');
	submitButton.type		= 'button';
	submitButton.value	= LocaleDescriptions['admin']['submit'][LOCALE];
	submitButton.addEventListener(
	'click',
	function(e){
		DRDownloadInterface.submitRequest();
	},
	true
	)
	ret.appendChild( submitButton );

	return ret;
}

DRDownloadInterface.prototype.sendRequest	= function( ts_type ){
	if( ts_type ){
		var t					= PaymentStatus[ts_type];
		var invoiceList	= new Array();
		var possibleList	= document.getElementsByTagName('tr');
		if( t && possibleList.length > 0 ){
			for each( var bgColor in t ){
				for each( var trNode in possibleList ){
					var st	= trNode.style;
					if(st && this.HexToDec(bgColor) == st.backgroundColor){
						var box = this.findElem( trNode, 'input', CHECKBOX_NAME, 'name' );
						box.checked = box.checked ? false : true ;
					}
				}
			}
		}

	}else{
		return false;
	}
}

DRDownloadInterface.prototype.findElem	= function( rootNode, type, name, searchType ){
	if( rootNode && type && name ){
		var list		= rootNode.getElementsByTagName( type );
		var retVal	= false;
		for(var i = 0; i<=list.length-1; i++ ){
			eval('if(list[i].'+searchType+' == name){ retVal = list[i];}');
		}
		return retVal;
	}else{
		return false;
	}
}

DRDownloadInterface.prototype.GiveDec	= function(Hex)
{
	if(Hex == "A")
	Value = 10;
	else
	if(Hex == "B")
	Value = 11;
	else
	if(Hex == "C")
	Value = 12;
	else
	if(Hex == "D")
	Value = 13;
	else
	if(Hex == "E")
	Value = 14;
	else
	if(Hex == "F")
	Value = 15;
	else
	Value = eval(Hex);
	return Value;
}

DRDownloadInterface.prototype.HexToDec	= function(Input)
{
	Input = Input.toUpperCase();
	a = this.GiveDec(Input.substring(0, 1));
	b = this.GiveDec(Input.substring(1, 2));
	c = this.GiveDec(Input.substring(2, 3));
	d = this.GiveDec(Input.substring(3, 4));
	e = this.GiveDec(Input.substring(4, 5));
	f = this.GiveDec(Input.substring(5, 6));
	x = (a * 16) + b;
	y = (c * 16) + d;
	z = (e * 16) + f;
	return 'rgb('+x+', '+y+', '+z+')';
}

DRDownloadInterface.prototype.submitRequest	= function(){
	var rootNode	= document.getElementById( SELECT_NODE_NAME );
	var optgrp		= this.findElem( rootNode, 'option', 'exportieren', 'value' );
	optgrp.selected	= true;
	this.findElem( document.getElementsByTagName('body')[0], 'form', SUBMIT_FORM_NAME, 'name' ).submit();
}

/// Quelle:  http://www.w3schools.com/JS/js_cookies.asp
DRDownloadInterface.prototype.setCookie	= function(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

DRDownloadInterface.prototype.getCookie	= function(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

var DRDownloadInterface = new DRDownloadInterface;
DRDownloadInterface.init();