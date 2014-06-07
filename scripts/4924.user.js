//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation; either version 2 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
// USA
// 
// Created on Jan 06, 2005
// copyright GnuRanch Inc.
//
// ==UserScript==
// @name            Helper Utilities
// @namespace       http://gnuranch.com
// @description     Helper methods in javascript
// @include         http://gnuranch.com:7070/webaccess/js/utils.js
// @version         1.0
// ==/UserScript==
// 

function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=" ;

    var begin = dc.indexOf("; " + prefix );
    if( begin == -1 )
    {
        begin = dc.indexOf(prefix );
        if( begin != 0 ) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf( ";", begin );

    if( end == -1 ) {
        end = dc.length;
    }

    return unescape( dc.substring(begin + prefix.length, end ));
}

function setCookie( name, value, expires, path, domain, secure )
{
    document.cookie = name + "=" + escape(value) +
                    ( (expires) ? "; expires=" + expires.toGMTString() : "") +
                    ( (path) ? "; path=" + path : "" ) +
                    ( (domain) ? "; domain=" + domain : "" ) +
                    ( (secure) ? "; secure" : "" );
}

function getBrowser()
{
    var browser = navigator.appName.toLowerCase();
    var version = navigator.appVersion.toLowerCase();

    /*alert( browser + " : " + version ); */

    if( browser.indexOf( "netscape") >= 0 )
        browser = "netscape";
    if( browser.indexOf( "microsoft") >= 0 )
        browser = "MSIE";

    return browser;
}

var browser = getBrowser();

function getKey(e)
{
    if( window.event )
        return window.event.keyCode;
    else if(e)
        return e.which;
    else
        return null;
}

function addEvent( obj, sType, fn )
{
    if( obj.addEventListener)
    {
        obj.addEventListener( sType, fn , false );
    }
    else if( obj.attachEvent )
    {
        var r = obj.attachEvent( "on"+sType, fn );
    }
    else
    {
        alert("Event Handler could not attached to : " + obj.toString() );
    }
}

function parseStrToHash( data )
{
    var hash = new Object;

    var dataArray = data.split(',');

    for( var i=0; i<dataArray.length ; i++ )
    {
        var a = dataArray[i];
        if( a.indexOf('=') > 0 )
        {
            var b = a.split('=');

            if( ( b.length == 2 ) && ( b[0] != null && b[1] != null ) )
            {
                key = new String(b[0].toString() );
                value = new String(b[1].toString() );

                key = key.replace(" ","");
                value = value.replace(/^\s+/, "");
                value = value.replace(/\s+$/, "");

                /* add to the 'quote' hash */
                hash[key] = value;
            }
        }
    }
    return hash;
}

