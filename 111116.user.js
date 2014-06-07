// ==UserScript==
// @name           SiteStyler
// @description    Provides a flexible way to apply common styles to many different websites at once.
// @namespace      http://userscripts.org/users/124130
// ==/UserScript==

var patterns = new MagicList();
var globalElements = new MagicList();
var globalProperties = [];
var sGlobalCSSProperties = "";

/*	
=======================================================================================================================
Define your rules here (see below for documentation)
=======================================================================================================================
*/

// Sample rule: Attempts to expand fixed-width layouts to fill the entire width of the page
_Pattern(".");
  _Elements("body, #wrapper, #content, #container");
    _Property("width", "100%");
	_Property("margin", "0px auto");

/*
=======================================================================================================================
Documentation
=======================================================================================================================

Rule data is arranged hierarchically, like so:
	
Pattern
   \_ Elements
         \_ Properties

Pattern:
  A regualar expression specifying which URLs to apply the styles to.
  Syntax: _Pattern([string: regex]);

Element:
  Any CSS element, such as "body", "form.details", "#wrapper", etc.
  Syntax: _Element([string: identifiers]);

Property:
  Any CSS property (both name and value), such as "color: red", "width: 100%" etc.
  Syntax: _Property([string: name], [string: value]);
          _CSSProperties([string: properties]);


Rules may be defined like so:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_Pattern("google");                                << This rule will be applied to any URL that contains "google".
  _Elements("body, input");                        << The properties defined below will be applied to all the
                                                      body and input elements on the page.
    _Property("width", "75%");                     << All the properties defined here will be applied to the body
                                                      and input elements, until a new element is defined.
    _Property("margin", "0px auto");
    _CSSProperties("color: #ff0000 !important;");  << Properties can also be defined like this, if you prefer.
  _Elements(".blah");                              << New elements declaration. Any following properties will be
                                                      applied to elements of class "blah".
    _Property("font-weight", "bold");              << All "blah" elements will have bold text.

_Pattern("^http://(www.\)?userscripts.org");       << Start of a new rule
  _Elements("*");                                  << The following properties will be applied to everything on
	                                                  userscripts.org.
    _Property("font-size", "50px");                << Now all the text on userscripts.org will be massive.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also define "global" elements and properties, like so:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_Property("font-size", "50px");                    << This property was defined before any rules or elements, and
                                                      will be applied to any elements defined from now one.
_Elements("#wrapper");                             << This element was defined before any rules, so any rules
                                                      defined from now on will take the element into account.
  _Property("color", "blue");                      << This property is LOCAL to the global element defined above.

_Rule("^http://www.zombo.com");                    << If zombo.com contains any elements with the "wrapper" id,
                                                      any text inside the element will be 50px and blue.
  _Property("width", "75%);                        << This property is LOCAL to the rule, and GLOBAL to any
                                                      elements defined inside the rule.
  ...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The indentation in these examples is for clarity only.

===================================================================================================================
*/

function _Pattern(sRegex)
{
	var pattern = patterns.Push(new Pattern(sRegex));
	pattern.AddElements(globalElements.Data());
}
function _Elements(sName)
{
	var element;
	if(patterns.Current() == 0)
	{
		element = globalElements.Push(new Element(sName));
	}
	else
	{
		element = patterns.Last().AddElement(new Element(sName));
	}
	element.AddProperties(globalProperties);
	element.AddCSSProperties(sGlobalCSSProperties);
}
function _Property(sName, sValue)
{
	if(patterns.Current() == 0)
	{
		if(globalElements.Current() == 0) globalProperties.push(new Property(sName, sValue));
		else
		{
			globalElements.Last().AddProperty(new Property(sName, sValue));
		}
	}
	else patterns.Last().AddProperty(new Property(sName, sValue));
}
function _CSSProperties(sCSS)
{
	if(patterns.Current() == 0)
	{
		if(globalElements.Current() == 0) globalCSSProperties += " " + sCSS + " ";
		else globalElements.Last().AddCSSProperties(sCSS);
	}
	else
	{
		patterns.Last().AddCSSProperties(sCSS);
	}
}

function Property(sName, sValue)
{
	this.msName = sName;
	this.msValue = sValue;
	this.Name = function() { return this.msName; }
	this.Value = function() { return this.msValue; }
	this.GetCSS = function() { return this.msName + ": " + this.msValue + " !important; "; }
}
function Element(sName)
{
	this.msName = sName;
	this.mProperties = [];
	this.mCSSProperties = "";
	this.Name = function() { return this.msName; }
	this.AddProperty = function(property) { this.mProperties.push(property); }
	this.GetCSS = function()
	{
		var sCSS = this.msName + " { ";
		for(var i in this.mProperties) sCSS += this.mProperties[i].GetCSS();
		return sCSS + this.mCSSProperties + " } ";
	}
	this.AddProperties = function(properties)
	{
		for(var i in properties)
		{
			this.AddProperty(properties[i]);
		}
	}
	this.AddCSSProperties = function(sCSS)
	{
		this.mCSSProperties += " " + sCSS + " ";
	}
}

function Pattern(sRegex)
{
	this.msRegex = sRegex;
	this.mElements = new MagicList();
	this.mProperties = [];
	this.mCSSProperties = "";
	this.Regex = function() { return this.msRegex; }
	this.AddElement = function(element)
	{
		var element = this.mElements.Push(element);

		element.AddProperties(this.mProperties);
		element.AddCSSProperties(this.mCSSProperties);
		return element;
	}
	this.AddElements = function(elements)
	{
		for(var i in elements) this.AddElement(elements[i]);
	}
	this.AddProperty = function(property)
	{
		if(this.mElements.Current() == 0) this.mProperties.push(property);
		else this.mElements.Last().AddProperty(property);
	}
	this.AddCSSProperties = function(sCSS)
	{
		if(this.mElements.Current() == 0) this.mCSSProperties += " " + sCSS + " ";
		else this.mElements.Last().AddCSSProperties(sCSS);
	}
	this.GetCSS = function()
	{
		var sCSS = "";
		for(var i = 0; i < this.mElements.Length(); i++)
		{
			sCSS += this.mElements.At(i).GetCSS();
		}
		return sCSS;
	}
}
function MagicList()
{
	this.mnCurrent = 0;
	this.mItems = [];
	this.Current = function() { return this.mnCurrent; }
	this.Push = function(item)
	{
		this.mItems.push(item);
		this.mnCurrent++;
		return this.Last();
	}
	this.At = function(index)
	{
		return this.mItems[index];
	}
	this.Length = function() { return this.mItems.length; }
	this.Last = function() { return this.mItems[this.mnCurrent-1]; }
	this.Data = function() { return this.mItems; }
}

function ApplyStyles(sCSS)
{
	if (typeof GM_addStyle != "undefined")
		GM_addStyle(sCSS);
	else if (typeof PRO_addStyle != "undefined")
		PRO_addStyle(sCSS);
	else if (typeof addStyle != "undefined")
		addStyle(sCSS);
	else
	{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0)
		{
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(sCSS));
			heads[0].appendChild(node); 
		}
	}
}

const sURL = window.location.href;
var sCSS = "";
for(var i = 0; i < patterns.Length(); i++)
{
	if(sURL.match(patterns.At(i).Regex()) != null)
	{
		sCSS += patterns.At(i).GetCSS();
	}
}

ApplyStyles(sCSS);
