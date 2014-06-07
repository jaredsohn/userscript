// ==UserScript==
// @name           YssyColorEdit
// @namespace      *
// @include        https://bbs.sjtu.edu.cn/bbsedit?*
// @include        https://bbs.sjtu.edu.cn/bbspst?*
// ==/UserScript==

var all_elements;

function appendElement(node,tag,id,class,htm) 
{
	if (node)
	{
		var ne = document.createElement(tag);
		if (id) 
			ne.id = id;
		if (class) 
			ne.className = class;
		if (htm) 
			ne.innerHTML = htm;
		else
			ne.innerHTML = '';
		node.appendChild(ne);
	}
}

function removeElement(node, id) 
{
	if (node)
	{
		var elt = document.getElementById(id);
		node.removeChild(elt);
	}
}

/*
expires	: date d'expiration du cookie. Ex : date=new Date; date.setDate(date.getDate()+2); (par defaut = date de fin de la session du navigateur)
path		: chemin d'acces au cookie (par defaut = chemin de la page courante)
domain	: domaine de validite (par defaut = celui de la page HTML qui l'ecrit)
secure	: positionne a la valeur true, le cookie n'est accessible que par une connexion securisee (HTTPS) (par defaut = false)
*/
function EcrireCookie(nom, valeur)
{
	var argv		= EcrireCookie.arguments;
	var argc		= EcrireCookie.arguments.length;
	
	var expires	= (argc > 2) ? argv[2] : null;
	var path		= (argc > 3) ? argv[3] : null;
	var domain	= (argc > 4) ? argv[4] : null;
	var secure	=(argc > 5) ? argv[5] : false;
	
	document.cookie = 
		nom + "=" + escape(valeur) +
		((expires==null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path==null) ? "" : ("; path=" + path)) +
		((domain==null) ? "" : ("; domain=" + domain)) +
		((secure==true) ? "; secure" : "");
}

function getCookieVal(offset)
{
	var endstr	= document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function LireCookie(nom)
{
	var arg	= nom + "=";
	var alen	= arg.length;
	var clen	= document.cookie.length;
	var i = 0;
	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal(j);
		i = document.cookie.indexOf(" ",i) + 1;
		if (i == 0)
			break;
	}
	return null;
}

function EffaceCookie(nom)
{
	var date = new Date;
	date.setFullYear(date.getFullYear() - 1);
	EcrireCookie(nom, null, date);
}

//Retourne un nombre entier entre min et max (inclus)
function Int_Random(val_min, val_max)
{
	return parseInt(val_min + (Math.random() * (val_max - val_min)));
	
}

//Retourne vrai si search_val est dans tab, faux sinon
function In_Array(search_val, tab)
{
	for (current_index_tab in tab)
		if (tab[current_index_tab] == search_val)
			return true;
	return false;
}

function Array_Keys(tab)
{
	var c_returns = [];
	for (current_index_tab in tab)
		c_returns[c_returns.length] = current_index_tab;
	return c_returns;
}

function First_Key(tab)
{
	for (current_index_tab in tab)
		return current_index_tab;
	return false;
}

function getElementByPropertyReg(c_property, c_element, reg)
{
	switch (c_property)
	{
		case 'name':
			return (c_element.name && typeof(c_element.name) == 'string' &&  c_element.name.match(reg));
			break;
		case 'id':
			return (c_element.id && typeof(c_element.id) == 'string' &&  c_element.id.match(reg));
			break;
		case 'value':
			return (c_element.value && typeof(c_element.value) == 'string' &&  c_element.value.match(reg));
			break;
		default:
			return false;
			break;
	}
}
function getElementsByPropertyReg(c_property, c_value, in_form, first_found)
{
	if (!c_value)
		return [];

	in_form = (in_form == null ? false : in_form);
	first_found = (first_found == null ? false : first_found);
	
	var car_to_escape = ['[', ']', '/'], car;
	for (index in car_to_escape)
	{
		car = car_to_escape[index];
		c_value = c_value.replace(car, '\\' + car);
	}
	var reg = new RegExp(c_value, "g");

	var c_element;
	var c_returns = [];
	if (in_form == true)
	{
		if (all_elements == null)
			all_elements = document.forms;

		for (var num_form = 0 ; num_form < all_elements.length ; num_form++)
		{
			var formu = all_elements[num_form];
			for (var num_element = 0 ; num_element < formu.length ; num_element++)
			{
				c_element = formu[num_element];
				
				if (getElementByPropertyReg(c_property, c_element, reg))
				{
					if (first_found == true)
						return c_element;
					else
						c_returns[c_returns.length] = c_element;
				}
			}
		}
	}
	else
	{
		if (all_elements == null)
			all_elements = document.getElementsByTagName("body")[0].getElementsByTagName("*");
		
		for (var num_element = 0 ; num_element < all_elements.length ; num_element++)
		{
			c_element = all_elements[num_element];
			
			if (getElementByPropertyReg(c_property, c_element, reg))
			{
				if (first_found == true)
					return c_element;
				else
					c_returns[c_returns.length] = c_element;
			}
		}
	}

	return c_returns;
}

function getElementByName(c_name, in_form)
{
	return getElementsByPropertyReg("name", c_name, in_form, true);
}

function getElementByIdent(c_id, in_form)
{
	return getElementsByPropertyReg("id", c_id, in_form, true);
}

function getElementByValue(c_value, in_form)
{
	return getElementsByPropertyReg("value", c_value, in_form, true);
}

function getElementsByNameReg(c_name, in_form)
{
	return getElementsByPropertyReg("name", c_name, in_form);
}
function getElementsByIdReg(c_id, in_form)
{
	return getElementsByPropertyReg("id", c_id, in_form);
}
function getElementsByValueReg(c_val, in_form)
{
	return getElementsByPropertyReg("value", c_val, in_form);
}

alert("hello");