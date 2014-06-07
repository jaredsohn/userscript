// ==UserScript==
// @name           RedeemQuick Free (US/canada)
// @namespace      fab_74(Vali202) in associaton with k0st4s
// @description    Autofill and autologin ! (US/canada)
// @include        *ptzplace*
// @include			*redeem*
// ==/UserScript==

//Edit variables here. don't remove quotes !

var Email = "";
var Combination = ""; 

var FirstName = ""; 
var LastName = ""; 
var Address1 = "";
var Address2 = ""; 
var City = "";
var State = ""; 
var Country = ""; //If you live in the US, dno't write anything, if you live in canada, write "Canada".
var Zip = ""; 
var Phone1 = "";
var Phone2 = "";
var Phone3 = "";

//Don't touch anything below this line.

function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
		el[j++] = tags[i];
	}
	return el;
}  

function TestCountry()
{
	if(typeof(Country) == 'undefined')
	{
		return 2;
	}
	else if(Country == "Canada")
	{
		return 1;
	}
	else if (Country == null)
	{
		return 2;
	}
}
var Pays = TestCountry();

function getNbInput()
{
	var nbInput = document.getElementsByTagName("input").length;
	return nbInput;
}
function detectPage() 
{
	var nbInput = getNbInput();
	
	if ( nbInput < 4 ) 
	{
		var spanSearch = document.getElementsByTagName("span");
		var i=0;
		var homeNb=0;
		for(i=0;i<spanSearch.length;i++)
		{
			if ( spanSearch[i].firstChild != null ) enfant = spanSearch[i].firstChild;
			if ( enfant.nodeType == 3 ) 
			{
				if ( enfant.nodeValue == "REDEEM NOW" ) return 3;    //Page Prize Liste
				else if ( enfant.nodeValue == "Apple" ) return 3;
				else if ( enfant.nodeValue == "Nixon" ) return 3;
				else if ( enfant.nodeValue == "PayPal Cash Money" ) return 3;
				else if ( enfant.nodeValue == "BRANDS WE LOVE" ) homeNb=1;
				else if ( ( enfant.nodeValue == "ELECTRONICS" ) && ( homeNb == 1 ) ) homeNb=2;
				
				if ( homeNb > 1 ) return 2;   // Page Home
			}
		}
		
		var divSearch = document.getElementsByTagName("div");
		for(i=0;i<divSearch.length;i++) 
		{
			if ( divSearch[i].getAttribute("class") != null ) 
			{
				if ( divSearch[i].getAttribute("class") == "productDetails" ) 
				{
					return 4;   // Page PrizeDetails
				}
			}
		}
		
		// Page Login
		return 1;
	} else 
	{  //Page Redeem Form
		return 5;
	}
}

function getElementsByRegExpId(p_regexp, p_element, p_tagName) {
	p_element = p_element === undefined ? document : p_element;
	p_tagName = p_tagName === undefined ? '*' : p_tagName;
	var v_return = [];
	var v_inc = 0;
	for(var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) {
		if(p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) {
			v_return[v_inc] =p_element.getElementsByTagName(p_tagName).item(v_i);
			v_inc++;
		}
	}
	return v_return;
}

function AutoLogin()
{
	var Position = document.getElementsByTagName("input");
	Position[0].value = Email;
	Position[1].value = Combination;
	document.forms[0].submit();
}

function Autofiller()
{
	if(Pays == 1)
	{
		if (getElementsByRegExpId(/countryDetail/i, document, "input")[0] != null) 
		{
			getElementsByRegExpId(/countryDetail/i, document, "input")[0].value = Country;
		}
		if (getElementsByRegExpId(/countryClicker/i)[0] != null) 
		{
			getElementsByRegExpId(/countryClicker/i)[0].getElementsByTagName("SPAN")[0].innerHTML = Country;
		}
		window.location = "javascript:manipulateForm('CA');";
		window.location = "javascript:selectCountry('CA')";
	}
	if (getElementsByRegExpId(/lastname/i, document, "label")[0] != null) 
	{
		document.getElementById(getElementsByRegExpId(/lastname/i, document, "label")[0].getAttribute('for')).value = LastName;
	}
	if (getElementsByRegExpId(/firstname/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/firstname/i, document, "label")[0].getAttribute('for')).value = FirstName;
	}
	if (getElementsByRegExpId(/address1/i, document, "label")[0] != null)
	{	
		document.getElementById(getElementsByRegExpId(/address1/i, document, "label")[0].getAttribute('for')).value = Address1;
	}
	if (getElementsByRegExpId(/address2/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/address2/i, document, "label")[0].getAttribute('for')).value = Address2;
	}
	if (getElementsByRegExpId(/city/i, document, "label")[0] != null)
	{	
		document.getElementById(getElementsByRegExpId(/city/i, document, "label")[0].getAttribute('for')).value = City;
	}
	if (getElementsByRegExpId(/state/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/state/i, document, "label")[0].getAttribute('for')).value = State;
	}
	if (getElementsByRegExpId(/zip/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/zip/i, document, "label")[0].getAttribute('for')).value = Zip;
	}
	if (getElementsByRegExpId(/phoneone/i, document, "input")[0] != null) getElementsByRegExpId(/phoneone/i, document, "input")[0].value = Phone1;
	if (getElementsByRegExpId(/phonetwo/i, document, "input")[0] != null) getElementsByRegExpId(/phonetwo/i, document, "input")[0].value = Phone2;
	if (getElementsByRegExpId(/phonethree/i, document, "input")[0] != null) getElementsByRegExpId(/phonethree/i, document, "input")[0].value = Phone3;
	window.location = "javascript:selectState('"+State+"','document');";
	if(Pays == 2)
	{
		window.location = "javascript:manipulateForm('US')";
		window.location = "javascript: selectState('"+State+"')";
	}
}
function AutofillerAlt()
{
	var l = document.getElementsByTagName("label");
	var i = 0;
	var listeInput = document.getElementsByTagName("input");
	var nbInput = listeInput.length;
	if(Pays == 2)
	{
		window.location = "javascript:manipulateForm('US')";
	}
	window.location = "javascript: selectState('"+State+"')";
	if(Pays == 1)
	{
		window.location = "javascript: manipulateForm('CA');";
		if (getElementsByRegExpId(/country/i, document, "input")[0] != null) getElementsByRegExpId(/country/i, document, "input")[0].value = State;
		if (getElementsByRegExpId(/countryDetail/i, document, "input")[0] != null) getElementsByRegExpId(/countryDetail/i, document, "input")[0].value = Country;
		if (getElementsByRegExpId(/countryClicker/i)[0] != null) getElementsByRegExpId(/countryClicker/i)[0].getElementsByTagName("SPAN")[0].innerHTML = Country;
	}
	// ----> Declaration des regex
	var regFirstName =  /first(.*)name/i
	var regLastName = /last(.*)name/i;
	var regAddress1 = /address(.*)1/i;
	var regAddress2 = /address(.*)2/i;
	var regCity = /city/i;
	var regPhone = /phone/i;
	var regZip = /zip/i;
	var regState = /state/i;
	var regCountry = /country/i;
	// <---- Toutes les regex declarees
	for(i=0;i<l.length;i++) 
	{
		var chaine = l[i].innerHTML;
		if(regFirstName.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = FirstName;
		}
		if(regLastName.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = LastName;
		}
		if(regAddress1.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Address1;
		}
		if(regAddress2.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Address2;
		}
		if(regCity.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = City;
		}
		if(regPhone.test(chaine) == true)
		{
				document.getElementById(l[i].getAttribute('for')).value = Phone1;
				var Tel = l[i].getAttribute('for')
				for(z=0;z<nbInput;z++) 
				{
					if (listeInput[z].getAttribute("id") == Tel) 
					{
						position = z;
					}
				}
				position = position + 1;
				var inputPhone1 = listeInput[position]
				inputPhone1.setAttribute("value", Phone2);
				position++;
				var inputPhone2 = listeInput[position];
				inputPhone2.setAttribute("value", Phone3);
		}
		if(regZip.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Zip;
		}
		if(regState.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = State;
		}
		if(Pays == 1 && regCountry.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Country;
			window.location = "javascript:selectCountry('CA')";
		}
	}
}

function redeemUrgence()
{
	var t = document.getElementsByTagName("input");
	if(Pays == 1)
	{
		window.location = "javascript:manipulateForm('CA')";
		t[13].value = Country; 
		document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = Country;
		window.location = "javascript:selectState('"+State+"')";
		window.location = "javascript:selectCountry('CA')";
	}
	else
	{
		window.location = "javascript:selectCountry('US')";
		window.location = "javascript:manipulateForm('US')";
		window.location = "javascript:selectState('"+State+"')";
	}
	t[0].value = FirstName; //Prenom
	t[1].value = LastName; //NOM
	t[2].value = Address1; //Adress 1
	t[3].value = Address2;
	t[4].value = City;  //Ville
	t[5].value = State;
	t[6].value = Zip;
	t[7].value = Phone1; 
	t[8].value = Phone2;
	t[9].value = Phone3;	//TEL
	t[11].value = State;
}

function CaptchaFocus()
{
	getElementsByRegExpId(/response/i, document, "input")[0].focus();
	getElementsByRegExpId(/response/i, document, "input")[0].style.borderColor = "red";
	getElementsByRegExpId(/response/i, document, "input")[0].style.borderWidth = "5px";
}
function KeyCheck(e)
{
	if (e.keyCode == 13) 
	{
		window.location = "javascript:submitForm();";
		window.location.href = getElementsByClass('btnRedeem')[0].href;
	}
}
var choice = detectPage();
if (choice == 1) 
{
	AutoLogin();
}
else if (choice == 5)
{	
	redeemUrgence();
	Autofiller();
	AutofillerAlt();
	CaptchaFocus();
	window.addEventListener('keydown', KeyCheck, true);
}