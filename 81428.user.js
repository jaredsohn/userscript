// ==UserScript==
// @name           RedeemQuick Free (international)
// @namespace      fab_74 in association with k0st4s
// @description    Autofill and autologin ! (international)
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
var Country = "";
var Zip = ""; 
var Phone = "";

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
			if (spanSearch[i].firstChild != null) enfant = spanSearch[i].firstChild;
			if (enfant.nodeType == 3 ) 
			{
				if (enfant.nodeValue == "REDEEM NOW") return 3;
				else if (enfant.nodeValue == "Apple") return 3;
				else if (enfant.nodeValue == "Nixon") return 3;
				else if (enfant.nodeValue == "PayPal Cash Money") return 3;
				else if (enfant.nodeValue == "BRANDS WE LOVE") homeNb=1;
				else if (( enfant.nodeValue == "ELECTRONICS") && ( homeNb == 1 ) ) homeNb=2
				if (homeNb > 1) return 2;
			}
		}
		var divSearch = document.getElementsByTagName("div");
		for(i=0;i<divSearch.length;i++) 
		{
			if (divSearch[i].getAttribute("class") != null) 
			{
				if (divSearch[i].getAttribute("class") == "productDetails") 
				{
					return 4;
				}
			}
		}
		return 1;
	} else 
	{
		return 5;
	}
}

function getElementsByRegExpId(p_regexp, p_element, p_tagName)
{
	p_element = p_element === undefined ? document : p_element;
	p_tagName = p_tagName === undefined ? '*' : p_tagName;
	var v_return = [];
	var v_inc = 0;
	for(var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) 
	{
		if(p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) 
		{
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
function AutofillerAlt() //La ca devient interessant... :D
{
	var l = document.getElementsByTagName("label");
	var i = 0;
	var listeInput = document.getElementsByTagName("input");
	var nbInput = listeInput.length;
	
	window.location = "javascript: manipulateForm('"+State+"')"; //Ne jamais oublier ce petit manipulateForm. Il permet de changer le format du telephone.
	if (getElementsByRegExpId(/country/i, document, "input")[0] != null) getElementsByRegExpId(/country/i, document, "input")[0].value = State;
	if (getElementsByRegExpId(/countryDetail/i, document, "input")[0] != null) getElementsByRegExpId(/countryDetail/i, document, "input")[0].value = Country;
	if (getElementsByRegExpId(/countryClicker/i)[0] != null) getElementsByRegExpId(/countryClicker/i)[0].getElementsByTagName("SPAN")[0].innerHTML = Country;
	var regFirstName =  /first(.*)name/i
	var regLastName = /last(.*)name/i;
	var regAddress1 = /address(.*)1/i;
	var regAddress2 = /address(.*)2/i;
	var regCity = /city/i;
	var regPhone = /phone/i;
	var regZip = /zip/i;
	var regState = /state/i;
	var regCountry = /country/i;
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
					var Tel = l[i].getAttribute('for')
					for(z=0;z<nbInput;z++) 
					{
						if (listeInput[z].getAttribute("id") == Tel) 
						{
							position = z;
							z = 9999;
						}
					}
					position = position + 3;
					var ph = listeInput[position]
					ph.value = Phone;		
				}
		if(regZip.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Zip;
		}
		if(regState.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = State;
		}
		if(regCountry.test(chaine) == true)
		{
			document.getElementById(l[i].getAttribute('for')).value = Country;
		}
	}
}		
function AutofillerRedeem()
{
	var PositionInput = document.getElementsByTagName("input");
	window.location = "javascript:manipulateForm('"+State+"')";
	if (getElementsByRegExpId(/country/i, document, "input")[0] != null) 
	{
		getElementsByRegExpId(/country/i, document, "input")[0].value = State;
	}
	else
	{
		PositionInput[11].setAttribute("value", State);
	}
	if (getElementsByRegExpId(/countryDetail/i, document, "input")[0] != null) 
	{
		getElementsByRegExpId(/countryDetail/i, document, "input")[0].value = Country;
	}
	else
	{
		PositionInput[13].setAttribute("value", Country)
	}
	if (getElementsByRegExpId(/countryClicker/i)[0] != null) 
	{
		getElementsByRegExpId(/countryClicker/i)[0].getElementsByTagName("SPAN")[0].innerHTML = Country;
	}
	if (getElementsByRegExpId(/lastname/i, document, "label")[0] != null) 
	{
		document.getElementById(getElementsByRegExpId(/lastname/i, document, "label")[0].getAttribute('for')).value = LastName;
	}
	else
	{
		PositionInput[1].setAttribute("value", LastName);
	}
	if (getElementsByRegExpId(/firstname/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/firstname/i, document, "label")[0].getAttribute('for')).value = FirstName;
	}
	else
	{
		PositionInput[0].setAttribute("value", FirstName); 
	}
	if (getElementsByRegExpId(/address1/i, document, "label")[0] != null)
	{	
		document.getElementById(getElementsByRegExpId(/address1/i, document, "label")[0].getAttribute('for')).value = Address1;
	}
	else 
	{
		PositionInput[2].setAttribute("value", Address1);
	}
	if (getElementsByRegExpId(/address2/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/address2/i, document, "label")[0].getAttribute('for')).value = Address2;
	}
	else
	{
		PositionInput[3].setAttribute("value", Address2);
	}
	if (getElementsByRegExpId(/city/i, document, "label")[0] != null)
	{	
		document.getElementById(getElementsByRegExpId(/city/i, document, "label")[0].getAttribute('for')).value = City;
	}
	else
	{
		PositionInput[4].setAttribute("value", City); 
	}
	if (getElementsByRegExpId(/state/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/state/i, document, "label")[0].getAttribute('for')).value = State;
	}
	else
	{
		PositionInput[5].setAttribute("value", State);
	}
	if (getElementsByRegExpId(/zip/i, document, "label")[0] != null) 
	{	
		document.getElementById(getElementsByRegExpId(/zip/i, document, "label")[0].getAttribute('for')).value = Zip;
	}
	else
	{
		PositionInput[6].setAttribute("value", Zip);
	}
	if (getElementsByRegExpId(/country/i, document, "label")[0] != null)
	{	
		document.getElementById(getElementsByRegExpId(/country/i, document, "label")[0].getAttribute('for')).value = Country;
	}
	else
	{
		PositionInput[13].setAttribute("value", Country);
	}
	if (getElementsByRegExpId(/phonew/i, document, "input")[0] != null)
	{	
		getElementsByRegExpId(/phonew/i, document, "input")[0].value = Phone;
	}
	else
	{
		PositionInput[10].setAttribute("value", Phone); 
	}
}
function CaptchaFocus() 
{		
	getElementsByRegExpId(/response/i, document, "input")[0].focus();
	getElementsByRegExpId(/response/i, document, "input")[0].style.borderColor = "red";
	getElementsByRegExpId(/response/i, document, "input")[0].style.borderWidth = "5px";
}
function FreshOut()
{
	var FreshOut = getElementsByClass("productFrame pfs freshout");
	for(o=0;o<=FreshOut.length;o++)
	{
		FreshOut[o].style.display='none';
	}
}
function KeyCheck(e)
{
	if (e.keyCode == 13) 
	{
		window.location = "javascript: submitForm();";
		window.location.href = getElementsByClass('btnRedeem')[0].href;
	}
}
var choice = detectPage();
if (choice == 1)
{
	AutoLogin();
}
else if (choice == 3)
{
	FreshOut();
}
else if (choice == 5)
{
	AutofillerRedeem();
	AutofillerAlt();
	CaptchaFocus();
	window.addEventListener('keydown', KeyCheck, true);
}
