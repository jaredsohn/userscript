//
//This program is free software; you can redistribute it and/or
//modify it under the terms of the GNU General Public License as
//published by the Free Software Foundation; either version 2 of the
//License, or (at your option) any later version.
//
//This program is distributed in the hope that it will be useful, but
//WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program; if not, write to the Free Software
//Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
//USA
//
//Created on Feb 05, 2006
//copyright GnuRanch Inc.
//
// ==UserScript==
// @name            Javascript DOM Parser Utilities
// @namespace       http://gnuranch.com
// @description     Helper methods in javascript
// @include         http://gnuranch.com:7070/webaccess/js/parser.js
// @version         1.0
// ==/UserScript==

function otp_parser()
{
    var doc = null;

    if( !( this instanceof otp_parser ) )
        return new otp_parser();


    function init(xml)
    {
        if( browser == "MSIE" )
        {
            doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = false;
            doc.loadXML(xml);
        }
        else
        {
            if( typeof(DOMParser) != "undefined" )
                doc = new DOMParser().parseFromString(xml, "text/xml");
        }
        return true;
    }
    this.init = init;

    function parseText( xml )
    {
        doc.loadXML( xml );
    }
    this.parseText = parseText;

    function getDocument()
    {
        return doc;
    }
    this.getDocument = getDocument;

    function setDomObj( xml )
    {
        doc = xml;
    }
    this.setDomObj = setDomObj;

    function getAttributeValue( element, attr )
    {
        var nodes = doc.getElementsByTagName(element);
        var value = nodes.item(0).getAttribute(attr);
        /*alert( element + " " + attr + "=" + value );*/

        return value;
    }
    this.getAttributeValue = getAttributeValue;

    return this;
}

function getAttributeValue( element, attr )
{
    return element.getAttribute(attr);
}
